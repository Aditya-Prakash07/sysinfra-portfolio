import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import SocialBar from '@/Components/SocialBar';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-navy-dark text-slate-900 dark:text-paper transition-colors duration-300 selection:bg-beacon selection:text-navy-dark">
            <Navbar />
            <SocialBar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
