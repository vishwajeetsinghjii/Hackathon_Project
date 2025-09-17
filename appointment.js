const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const cards = document.querySelectorAll('.carousel-card');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 20; // width + gap
const visibleCards = Math.floor(document.querySelector('.carousel-container').offsetWidth / cardWidth);
const maxIndex = cards.length - visibleCards;

function updateCarousel() {
  track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});
