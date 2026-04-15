/* ============================================================
   carousel.js — image carousels w/ lightbox
   ============================================================ */

(function () {
  const imageSets = {
    kitchen: [
      'assets/images/bluereno1.jpeg',
      'assets/images/bluereno2.jpeg',
      'assets/images/bluereno3.jpeg',
      'assets/images/bluereno4.jpeg'
    ],
    office: [
      'assets/images/colorfulreno1.jpeg',
      'assets/images/colorfulreno2.jpeg'
    ],
    facade: [
      'assets/images/lightsreno1.jpeg',
      'assets/images/lightsreno2.jpeg',
      'assets/images/lightsreno3.jpeg',
      'assets/images/lightsreno4.jpeg'
    ],
    basement: [
      'assets/images/smallreno1.jpeg',
      'assets/images/smallreno2.jpeg',
      'assets/images/smallreno3.jpeg',
      'assets/images/smallreno4.jpeg'
    ],
    restaurant: [
      'assets/images/restaurant1.jpeg',
      'assets/images/restaurant2.jpeg',
      'assets/images/restaurant3.jpeg',
      'assets/images/restaurant4.jpeg',
      'assets/images/restaurant5.jpeg'      
    ]
  };

  document.querySelectorAll('.album').forEach(album => {
    const key      = album.dataset.album;
    const images   = imageSets[key];
    const carousel = album.querySelector('.carousel');
    const wrapper  = album.querySelector('.carousel-wrapper');
    const dotsBox  = album.querySelector('.carousel-dots');
    const prevBtn  = album.querySelector('.carousel-prev');
    const nextBtn  = album.querySelector('.carousel-next');

    if (!images || !images.length || !carousel) return;

    let index = 0;

    // Build slides
    const links = images.map((src, i) => {
      const a = document.createElement('a');
      a.href = src;
      a.className = 'glightbox';
      a.setAttribute('data-gallery', key);
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${key} project image ${i + 1}`;
      img.loading = 'lazy';
      a.appendChild(img);
      wrapper.appendChild(a);
      return a;
    });

    // Build dots
    const dots = images.map((_, i) => {
      const d = document.createElement('span');
      d.className = 'carousel-dot';
      d.addEventListener('click', () => { index = i; render(); });
      dotsBox.appendChild(d);
      return d;
    });

    function render() {
      links.forEach((a, i) => a.classList.toggle('active', i === index));
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      render();
    });
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      render();
    });

    render();
  });

  // Init lightbox after slides exist
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox' });
  }
})();
