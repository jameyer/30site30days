const messages = [
  'Fathers Day is coming up!',
  'Just wear Bobos.',
  "Don't miss our summer sale!",
  'Get 20% off on all products!',
];

const marquee = document.getElementById('marquee-text');
let currentMessage = 0;
let animationFrame;
const container = document.querySelector('.marquee-container');
const pauseDuration = 2000; // milliseconds to pause in center
const speed = 2; // pixels per frame

function showMessage(index) {
  marquee.textContent = messages[index];
}

function animateMarquee() {
  marquee.style.transition = 'none';
  marquee.style.left = container.offsetWidth + 'px';

  // Wait for browser to apply the change
  requestAnimationFrame(() => {
    const textWidth = marquee.offsetWidth;
    const containerWidth = container.offsetWidth;

    // Calculate center position
    const centerPos = (containerWidth - textWidth) / 2;

    // Move from right edge to center
    let left = containerWidth;
    function moveToCenter() {
      if (left > centerPos) {
        left -= speed;
        marquee.style.left = left + 'px';
        animationFrame = requestAnimationFrame(moveToCenter);
      } else {
        marquee.style.left = centerPos + 'px';
        setTimeout(() => {
          moveToLeft();
        }, pauseDuration);
      }
    }

    // Move from center to left edge (off screen)
    function moveToLeft() {
      if (left + textWidth > 0) {
        left -= speed;
        marquee.style.left = left + 'px';
        animationFrame = requestAnimationFrame(moveToLeft);
      } else {
        // Next message
        currentMessage = (currentMessage + 1) % messages.length;
        showMessage(currentMessage);
        animateMarquee();
      }
    }

    moveToCenter();
  });
}

// Start marquee
showMessage(currentMessage);
animateMarquee();
