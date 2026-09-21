#!/bin/bash
# Fresh download of ALL sysinfra.in media assets
# Run from: /Users/adityaprakash/Sites/sysinfra

BASE_URL="https://sysinfra.in"
OUT="public/img"

echo "=== Downloading sysinfra.in media assets ==="

# Helper: download and only keep if it's a real image (not HTML error page)
download_img() {
    local url="$1"
    local dest="$2"
    mkdir -p "$(dirname "$dest")"
    http_code=$(curl -s -o "$dest" -w "%{http_code}" "$url")
    # Check if downloaded file is HTML (error page) or too small
    if [ "$http_code" != "200" ] || file "$dest" | grep -q "HTML"; then
        rm -f "$dest"
        echo "  SKIP $url (HTTP $http_code or HTML response)"
    else
        sz=$(wc -c < "$dest")
        echo "  OK   $url → $dest ($sz bytes)"
    fi
}

# === LOGOS ===
download_img "$BASE_URL/img/logo.png"         "$OUT/logo.png"
download_img "$BASE_URL/img/logo-footer.png"  "$OUT/logo-footer.png"
download_img "$BASE_URL/img/mobile-logo.png"  "$OUT/mobile-logo.png"
download_img "$BASE_URL/img/motorola-solutions.png" "$OUT/motorola-solutions.png"

# === HERO SLIDERS ===
for i in 1 2 3; do
    download_img "$BASE_URL/img/slider/1-$i.jpg" "$OUT/slider/1-$i.jpg"
done
download_img "$BASE_URL/img/slider/1-4.jpg" "$OUT/slider/1-4.jpg"

# === BRAND / CLIENT LOGOS ===
for i in $(seq 1 31); do
    download_img "$BASE_URL/img/brand/$i.jpg" "$OUT/brand/$i.jpg"
done

# === PRODUCT ICON IMAGES ===
declare -a PRODUCT_ICONS=(
    "Amf pannel(Indoor).png"
    "Amf pannel(Outdoor).png"
    "RetrofitController.png"
    "UniversalACcontroller.png"
    "alrmCard1.png"
    "applyNow.png"
    "canbusConverter.png"
    "certification.png"
    "dcenergymeter.png"
    "dualDGcontroller.png"
    "energyController.png"
    "energyMgtImg.png"
    "gprsCard.png"
    "gprsModem.png"
    "history&milestone.png"
    "i-protect.png"
    "i2pmsSubsitute.png"
    "jobOpening.png"
    "lifeatSysinfra.png"
    "lvdController.png"
    "manufacturingFacility.png"
    "moduleRecondition.png"
    "nanoMac.png"
    "nocSolutions.png"
    "o&mSupport.png"
    "offeringImg.png"
    "ourServices.png"
    "overview.png"
    "plutoAlternate.png"
    "research&Development.png"
    "rms.png"
    "security.png"
    "sis-axs.png"
    "siteMaintanance.png"
    "smartBoxIcon.png"
    "strategicProducts.png"
    "svrCard.png"
    "voicemessageServices.png"
    "z-brainer.png"
)
for icon in "${PRODUCT_ICONS[@]}"; do
    encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$icon'))")
    download_img "$BASE_URL/img/productIconImg/$encoded" "$OUT/productIconImg/$icon"
done

# === SYS PRODUCTS ===
for i in 2 5 6 7 8 9; do
    download_img "$BASE_URL/img/sys-products/$i.jpg" "$OUT/sys-products/$i.jpg"
done

# === I-PROTECT IMAGES ===
for i in $(seq 1 11); do
    download_img "$BASE_URL/img/iprotect-Img/Image$i.jpg" "$OUT/iprotect-Img/Image$i.jpg"
done

# === TEAM PHOTOS ===
# jpg variants
for i in 2 8 11; do
    download_img "$BASE_URL/img/team/$i.jpg" "$OUT/team/$i.jpg"
done
# png variants
for i in 9 19 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44; do
    download_img "$BASE_URL/img/team/$i.png" "$OUT/team/$i.png"
done

# === COURSE / CATEGORY ICONS ===
for i in $(seq 1 6); do
    download_img "$BASE_URL/img/course/$i.png" "$OUT/course/$i.png"
done

# === SYSINFRA PHASE IMAGES ===
for i in $(seq 1 5); do
    download_img "$BASE_URL/img/sysinfraPhase/$i.jpg" "$OUT/sysinfraPhase/$i.jpg" 2>/dev/null || true
done

# === CERTIFICATES ===
for ext in jpg png jpeg; do
    for i in $(seq 1 5); do
        download_img "$BASE_URL/img/Certificate/$i.$ext" "$OUT/Certificate/$i.$ext" 2>/dev/null || true
    done
done

# === DEFENCE / TACTICAL / OTHER PRODUCT DIRS ===
for i in $(seq 1 5); do
    download_img "$BASE_URL/img/defenceRepair/$i.jpg" "$OUT/defenceRepair/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/tacticalComm/$i.jpg" "$OUT/tacticalComm/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/virtualTerrain/$i.jpg" "$OUT/virtualTerrain/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/gpsTracker/$i.jpg" "$OUT/gpsTracker/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/smartCard/$i.jpg" "$OUT/smartCard/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/powerSupply/$i.jpg" "$OUT/powerSupply/$i.jpg" 2>/dev/null || true
    download_img "$BASE_URL/img/weatherStation/$i.jpg" "$OUT/weatherStation/$i.jpg" 2>/dev/null || true
done

echo ""
echo "=== Done! Counting downloaded images ==="
find "$OUT" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | wc -l
echo "images total"
