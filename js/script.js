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

const featuredProjects = [
  {
    badge: 'Flagship • Personal Project',
    title: 'PropVera &mdash; Property Management System',
    tech: 'Laravel • MySQL • Bootstrap',
    description: 'Full-scale property management platform for UAE real estate businesses with multi-building access control, automated cheque workflows, tenant document tracking, and financial reporting.',
    features: [
      'Property & Unit Management',
      'Tenant & Document Management',
      'Lease Lifecycle & Renewals',
      'Rent Calendar & Installments',
      'Post-Dated Cheque Tracking',
      'Building Expenses & VAT',
      'Utility Billing & Split',
      'Deposit Settlement',
      'Maintenance & Inspections',
      'Lease Exit Management',
      'Role-Based Access Control',
      'Property & Owner Reports'
    ],
    buttons: ['Live Product', 'Product Page']
  },
  {
    badge: 'Enterprise • Finance System',
    title: 'Budget & Fund Management System',
    tech: 'Laravel • MySQL • Bootstrap • Accounting Logic',
    description: 'Enterprise-level budgeting and fund allocation system designed for project-based companies to manage budgets, payment orders, reserved funds, project ledgers, cash flow, bank balances, and financial approvals with clear operational visibility.',
    features: [
      'Project Budget Management',
      'Payment Orders Workflow',
      'Cash Flow Monitoring',
      'Bank Balance Tracking',
      'Project Ledger Summary',
      'Reserved Fund Allocation',
      'Central Reserved Funds',
      '30% Reserve / 70% Operations Split',
      'VAT, Leave & Gratuity Reserves',
      'Salary, Visa & Fuel Operations',
      'Remittance Transfer',
      'Management Approval Flow'
    ],
    buttons: ['View Details', 'Case Study']
  },
  {
    badge: 'Retail • POS System',
    title: 'RES POS &mdash; Restaurant & Retail POS System',
    tech: 'React • Node.js • MySQL • Express',
    description: 'Fast POS and retail operations platform for restaurants, shops and service counters with billing, inventory, receipts, customer handling, daily sales reporting and role-based cashier workflows.',
    features: [
      'Point of Sale Billing',
      'Restaurant Order Management',
      'Product & Category Setup',
      'Inventory Stock Control',
      'Customer Management',
      'Discounts & Tax Handling',
      'Receipt Printing',
      'Cashier Shift Control',
      'Daily Sales Reports',
      'Payment Method Tracking',
      'Role-Based Access',
      'Dashboard Analytics'
    ],
    buttons: ['View Details', 'POS Case Study']
  }
];

function renderFeaturedProjects() {
  const track = document.querySelector('#featuredProjectsTrack');
  if (!track) return;

  track.innerHTML = featuredProjects.map(project => `
    <article class="featured-project-card reveal visible">
      <div class="project-card-top">
        <span class="project-badge">${project.badge}</span>
        <span class="project-tech">${project.tech}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <ul class="project-feature-list">
        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      <div class="project-card-actions">
        <a class="btn primary" href="#contact">${project.buttons[0]}</a>
        <a class="btn ghost" href="#contact">${project.buttons[1]}</a>
      </div>
    </article>
  `).join('');

  track.addEventListener('wheel', event => {
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (!horizontalIntent && !event.shiftKey) return;
    event.preventDefault();
    track.scrollLeft += horizontalIntent ? event.deltaX : event.deltaY;
  }, { passive: false });

  const prev = document.querySelector('.project-prev');
  const next = document.querySelector('.project-next');
  const scrollAmount = () => track.clientWidth;
  prev?.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
}

renderFeaturedProjects();
reveals = document.querySelectorAll('.reveal');
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
