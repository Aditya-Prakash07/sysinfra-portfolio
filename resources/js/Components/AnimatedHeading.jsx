import React, { useEffect, useRef, useState } from 'react';

/**
 * AnimatedHeading — Industry-Standard Kinetic Typography Reveal
 * 
 * Features:
 * - Dynamic Mode Detection: Very large text (h1, text-4xl/5xl/6xl/etc.) uses sequential
 *   letter-by-letter kinetic entrance ("in words, letters coming one after another")
 *   with 3D perspective tilt, spring-curve acceleration, and micro-blur dissolution.
 * - Standard headings retain smooth masked word-by-word reveal.
 * - Viewport-aware IntersectionObserver (triggers automatically on scroll) or immediate mount.
 * - Dynamic accent gradient with animated sheen sweep on key/highlighted words/letters.
 * - Semantic tag selection (h1, h2, h3, etc.) with preserved accessibility (aria-label).
 * - Zero layout shift & full responsive word wrapping (words never split across linebreaks).
 * - Native prefers-reduced-motion compliance.
 */
export default function AnimatedHeading({
    children,
    as: Tag = 'h2',
    className = '',
    highlight = 'last', // 'last' | 'none' | 'gradient' | string | array of strings
    highlightCount = 1, // how many words to highlight from the end when highlight='last'
    highlightPhrase = null, // explicit multi-word phrase to highlight
    delay = 0, // initial delay in ms
    stagger = 38, // ms between consecutive words (for word mode)
    letterStagger = 24, // ms between consecutive letters (for very large text letter mode)
    animateBy = 'auto', // 'auto' | 'letter' | 'word'
    immediate = false, // if true, animate immediately without waiting for intersection
    threshold = 0.15,
    gradientClass = 'bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-sky-400 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent animate-text-sheen',
    ...props
}) {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Viewport IntersectionObserver or Immediate Trigger
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Respect user accessibility preferences
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mediaQuery.matches) {
            setIsVisible(true);
            return;
        }

        if (immediate) {
            // Allow initial hidden frame to register in browser layout before triggering transition
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 20);
            return () => clearTimeout(timer);
        }

        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(el);
            }
        }, {
            threshold,
            rootMargin: '0px 0px -40px 0px'
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [immediate, threshold]);

    // Handle string extraction from children
    let plainText = '';
    if (typeof children === 'string') {
        plainText = children;
    } else if (Array.isArray(children)) {
        plainText = children.map(c => (typeof c === 'string' ? c : '')).join('');
    }

    // If children cannot be parsed into a plain string, fallback to container transition
    if (!plainText) {
        return (
            <Tag 
                ref={containerRef} 
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                    isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-[6px]'
                } ${className}`}
                {...props}
            >
                {children}
            </Tag>
        );
    }

    plainText = plainText.trim();
    const words = plainText.split(/\s+/);
    const totalWords = words.length;

    // Detect if this heading qualifies as "Very Large Text"
    const isLargeText = 
        animateBy === 'letter' || 
        (animateBy !== 'word' && (
            Tag === 'h1' || 
            /\btext-([4-9]xl|hero)\b/.test(className) ||
            className.includes('text-4xl') ||
            className.includes('text-5xl') ||
            className.includes('text-6xl') ||
            className.includes('text-7xl') ||
            className.includes('text-8xl')
        ));

    // Detect matched word indices for highlightPhrase or multi-word highlight string
    const targetPhrase = highlightPhrase || (typeof highlight === 'string' && highlight.includes(' ') && highlight !== 'last' && highlight !== 'none' ? highlight : null);
    const phraseMatchedIndices = new Set();
    if (targetPhrase) {
        const cleanWord = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, '');
        const phraseWords = targetPhrase.trim().split(/\s+/).map(cleanWord).filter(Boolean);
        const normWords = words.map(cleanWord);
        
        for (let i = 0; i <= normWords.length - phraseWords.length; i++) {
            let matches = true;
            for (let j = 0; j < phraseWords.length; j++) {
                if (normWords[i + j] !== phraseWords[j]) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                for (let j = 0; j < phraseWords.length; j++) {
                    phraseMatchedIndices.add(i + j);
                }
                break;
            }
        }
    }

    // Track cumulative character offset for letter-by-letter staggering
    let globalCharOffset = 0;

    return (
        <Tag 
            ref={containerRef} 
            className={`tracking-tight ${className}`}
            aria-label={plainText}
            {...props}
        >
            {words.map((word, wordIdx) => {
                // Determine whether this word should receive the gradient highlight
                let isHighlighted = false;
                if (phraseMatchedIndices.size > 0) {
                    isHighlighted = phraseMatchedIndices.has(wordIdx);
                } else if (highlight === 'last') {
                    isHighlighted = wordIdx >= totalWords - highlightCount;
                } else if (highlight === 'gradient' || highlight === 'all') {
                    isHighlighted = true;
                } else if (typeof highlight === 'string' && highlight !== 'none') {
                    isHighlighted = word.toLowerCase().includes(highlight.toLowerCase());
                } else if (Array.isArray(highlight)) {
                    isHighlighted = highlight.some(h => word.toLowerCase().includes(h.toLowerCase()));
                }

                if (isLargeText) {
                    const letters = word.split('');
                    const currentWordOffset = globalCharOffset;
                    globalCharOffset += letters.length;

                    return (
                        <span 
                            key={wordIdx} 
                            className="inline-block whitespace-nowrap overflow-hidden py-1 align-bottom mr-[0.28em] last:mr-0 leading-tight"
                            aria-hidden="true"
                        >
                            {letters.map((char, charIdx) => {
                                const charDelay = delay + (currentWordOffset + charIdx) * letterStagger + (wordIdx * 12);
                                const isCharAmp = char === '&';
                                return (
                                    <span 
                                        key={charIdx} 
                                        className={`inline-block will-change-transform ${
                                            isHighlighted ? gradientClass : ''
                                        } ${isCharAmp ? 'font-sans font-semibold' : ''}`}
                                        style={{
                                            transform: isVisible 
                                                ? 'none' 
                                                : 'translate3d(0, 18px, 0)',
                                            opacity: isVisible ? 1 : 0,
                                            transformOrigin: '50% 100%',
                                            transitionProperty: 'transform, opacity',
                                            transitionDuration: '380ms',
                                            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                                            transitionDelay: `${charDelay}ms`,
                                            ...(isCharAmp ? { fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' } : {})
                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                    );
                }

                // Standard Word-by-Word Mode for smaller/standard headings
                const isWordAmp = word.trim() === '&';
                return (
                    <span 
                        key={wordIdx} 
                        className="inline-block overflow-hidden py-1 align-bottom mr-[0.28em] last:mr-0 leading-tight"
                        aria-hidden="true"
                    >
                        <span 
                            className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                                isVisible 
                                    ? 'translate-y-0 opacity-100 blur-0' 
                                    : 'translate-y-[115%] opacity-0 blur-[6px]'
                            } ${isHighlighted ? gradientClass : ''} ${isWordAmp ? 'font-sans font-semibold' : ''}`}
                            style={{
                                transitionDelay: `${delay + wordIdx * stagger}ms`,
                                transitionProperty: 'transform, opacity, filter',
                                ...(isWordAmp ? { fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' } : {})
                            }}
                        >
                            {word}
                        </span>
                    </span>
                );
            })}
        </Tag>
    );
}
