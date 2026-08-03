// --- Modal(Terms & Conditions) ---
document.addEventListener('DOMContentLoaded', () => {
    const tcModal = document.getElementById('tcModal');
    const acceptBtn = document.getElementById('acceptBtn');
    const declineBtn = document.getElementById('declineBtn');
    const closeModal = () => {
        tcModal.classList.add('hidden');
    };
    acceptBtn.addEventListener('click', closeModal);
    declineBtn.addEventListener('click', closeModal);
});
// --- Password Generator ---
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const passwordResult = document.getElementById('passwordResult');
const generatePasswordBtn = document.getElementById('generatePasswordBtn');
const copyBtn = document.getElementById('copyBtn');
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

// Generate Password logic 
generatePasswordBtn.addEventListener('click', () => {
    const length = parseInt(lengthSlider.value);
    const useUpper = document.getElementById('chkUpper').checked;
    const useLower = document.getElementById('chkLower').checked;
    const useNumbers = document.getElementById('chkNumbers').checked;
    const useSymbols = document.getElementById('chkSymbols').checked;
    let allowedChars = "";
    if (useUpper) allowedChars += upperChars;
    if (useLower) allowedChars += lowerChars;
    if (useNumbers) allowedChars += numberChars;
    if (useSymbols) allowedChars += symbolChars;
    if (allowedChars === "") {
        allowedChars = lowerChars + numberChars;
    }
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        generatedPassword += allowedChars[randomIndex];
    }
    passwordResult.value = generatedPassword;
});

// Copy to Clipboard
copyBtn.addEventListener('click', () => {
    if(passwordResult.value) {
        navigator.clipboard.writeText(passwordResult.value);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = "Copied!";
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }
});

// --- QR Code Generator ---
const qrInput = document.getElementById('qrInput');
const generateQrBtn = document.getElementById('generateQrBtn');
const qrImage = document.getElementById('qrImage');
const downloadPngBtn = document.getElementById('downloadPng');

generateQrBtn.addEventListener('click', () => {
    const url = qrInput.value.trim();
    if (url === "") {
        alert("Please enter a valid URL.");
        return;
    }
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    qrImage.src = apiUrl;
});

// Basic Image Download Handler
downloadPngBtn.addEventListener('click', async () => {
    const imgSrc = qrImage.src;
    try {
        const response = await fetch(imgSrc);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        alert("Failed to download image. The API might restrict direct downloads.");
    }
});
// --- Gallery  ---
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightboxBtn = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const imageSources = Array.from(galleryImages).map(img => img.src);
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentIndex = index;
        lightboxImg.src = imageSources[currentIndex];
        lightbox.classList.add('active');
    });
});
closeLightboxBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});
// Navigate Images
const updateImage = () => {
    lightboxImg.style.animation = 'none';
    lightboxImg.offsetHeight; 
    lightboxImg.style.animation = null; 
    lightboxImg.src = imageSources[currentIndex];
};
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? imageSources.length - 1 : currentIndex - 1;
    updateImage();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === imageSources.length - 1) ? 0 : currentIndex + 1;
    updateImage();
});