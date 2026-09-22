const preloader = document.getElementById('preloader');
const introVideo = document.querySelector('.hero-video');

function finishLoading() {
  preloader.classList.add('hide');
}

window.addEventListener('load', () => {
  setTimeout(finishLoading, 1000);

  if (introVideo) {
    introVideo.muted = true;
    introVideo.setAttribute('muted', '');
    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }
});

setTimeout(() => {
  if (!preloader.classList.contains('hide')) finishLoading();
}, 3000);

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealEls.forEach((el) => revealObserver.observe(el));
