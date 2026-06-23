const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const backTop = document.querySelector('.back-to-top');
let reveals = document.querySelectorAll('.reveal');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 30);
  backTop.classList.toggle('show', window.scrollY > 700);

  const fromTop = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const active = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle('active', active);
  });
}

toggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Screenshot modal viewer
const modal = document.querySelector('.image-modal');
const modalImg = modal?.querySelector('img');
const modalTitle = modal?.querySelector('p');
const modalClose = modal?.querySelector('.modal-close');

document.querySelectorAll('.screenshot-card').forEach(card => {
  card.addEventListener('click', () => {
    if (!modal || !modalImg || !modalTitle) return;
    modalImg.src = card.dataset.img;
    modalImg.alt = card.dataset.title || 'Screenshot preview';
    modalTitle.textContent = card.dataset.title || 'Screenshot preview';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalImg) modalImg.src = '';
}

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

// Contact form -> thank you + WhatsApp prefilled message
const contactForm = document.querySelector('#contactForm');
const statusEl = document.querySelector('.form-status');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = (formData.get('name') || '').toString().trim();
  const email = (formData.get('email') || '').toString().trim();
  const message = (formData.get('message') || '').toString().trim();
  const whatsappText = `Hello Nabeel, I contacted you from your portfolio.%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
  if (statusEl) statusEl.textContent = 'Thank you! Your message is ready on WhatsApp. Please press send there.';
  contactForm.reset();
  window.open(`https://wa.me/971521077862?text=${whatsappText}`, '_blank', 'noopener');
});
