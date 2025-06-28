const highlightImages = [
    "image/Highlight.png",
    "image/Highlight2.png",
    "image/Highlight3.png",
    "image/Highlight4.png"
    // Add more image paths if needed
];

let currentImage = 0;
const highlightImgElement = document.getElementById('Highlight-image');
let autoSlide = setInterval(nextImage, 3000);

function nextImage() {
    currentImage = (currentImage + 1) % highlightImages.length;
    highlightImgElement.src = highlightImages[currentImage];
}

function prevImage() {
    currentImage = (currentImage - 1 + highlightImages.length) % highlightImages.length;
    highlightImgElement.src = highlightImages[currentImage];
}

// Tombol Next
document.getElementById('nextHighlight').addEventListener('click', () => {
    nextImage();
    resetAutoSlide();
});

// Tombol Prev
document.getElementById('prevHighlight').addEventListener('click', () => {
    prevImage();
    resetAutoSlide();
});

// Reset interval saat user klik tombol
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextImage, 3000);
}
