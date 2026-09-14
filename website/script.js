const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');


/* =========================================================
   HEADER / SCROLL
========================================================= */

function updateScrollUI() {
  const scrolled = window.scrollY > 20;

  if (header) {
    header.classList.toggle('scrolled', scrolled);
  }

  if (backTop) {
    backTop.classList.toggle('visible', window.scrollY > 500);
  }
}

window.addEventListener('scroll', updateScrollUI, {
  passive: true
});

updateScrollUI();


/* =========================================================
   BACK TO TOP
========================================================= */

if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (navToggle && navLinks) {

  navToggle.addEventListener('click', () => {

    const open = navLinks.classList.toggle('open');

    navToggle.setAttribute(
      'aria-expanded',
      String(open)
    );

  });


  navLinks.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      navLinks.classList.remove('open');

      navToggle.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add('visible');

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


revealItems.forEach((item, index) => {

  item.style.transitionDelay =
    `${Math.min(index * 35, 180)}ms`;

  revealObserver.observe(item);

});


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const lightbox =
  document.getElementById('imageLightbox');

const lightboxImage =
  document.getElementById('lightboxImage');


/* Open */

window.openLightbox = function (image) {

  if (!lightbox || !lightboxImage) {

    console.error(
      'Lightbox elements not found.'
    );

    return;
  }


  lightboxImage.src = image.src;

  lightboxImage.alt =
    image.alt || 'FocusTrack screenshot';


  lightbox.classList.add('active');

  lightbox.setAttribute(
    'aria-hidden',
    'false'
  );


  document.body.style.overflow = 'hidden';

};


/* Close */

window.closeLightbox = function () {

  if (!lightbox || !lightboxImage) {
    return;
  }


  lightbox.classList.remove('active');

  lightbox.setAttribute(
    'aria-hidden',
    'true'
  );


  document.body.style.overflow = '';


  setTimeout(() => {

    if (!lightbox.classList.contains('active')) {

      lightboxImage.src = '';

    }

  }, 250);

};


/* =========================================================
   CLOSE WHEN CLICKING BACKGROUND
========================================================= */

if (lightbox) {

  lightbox.addEventListener(
    'click',
    (event) => {

      if (event.target === lightbox) {

        closeLightbox();

      }

    }
  );

}


/* =========================================================
   CLOSE WITH ESCAPE
========================================================= */

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      lightbox &&
      lightbox.classList.contains('active')
    ) {

      closeLightbox();

    }

  }
);