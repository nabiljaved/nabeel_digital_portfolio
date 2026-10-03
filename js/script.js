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
    image: 'img/project-property-management.png',
    tech: 'Laravel • MySQL • Bootstrap',
    description: 'A complete property management platform for leases, tenants, payments, maintenance, documents, buildings, units, reporting, and daily operations workflows.',
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
    image: 'img/project-budget-management.png',
    tech: 'Laravel • MySQL • Bootstrap • Accounting Logic',
    description: 'A budgeting and fund management system for projects, approvals, salaries, facilities, payment orders, reserves, reporting, and financial control.',
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
    image: 'img/project-pos.png',
    tech: 'React • Node.js • MySQL • Express',
    description: 'A restaurant and retail POS platform for menus, billing, inventory, orders, payments, cashier shifts, receipts, and sales reporting.',
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
  },
  {
    badge: 'Operations • Fleet System',
    title: 'Fleet Management System',
    image: 'img/project-fleet-management.png',
    tech: 'Laravel • React • MySQL',
    description: 'A centralized fleet management platform for vehicles, drivers, maintenance, fuel, inspections, assignments, expenses, tracking, and operational reporting control.',
    features: [],
    buttons: ['View Details', 'Case Study']
  },
  {
    badge: 'Education • Learning Platform',
    title: 'XeLearning Platform',
    image: 'img/project-xelearning.png',
    tech: 'Laravel • React • MySQL',
    description: 'An interactive e-learning platform for courses, lessons, assessments, learners, instructors, progress tracking, certificates, content delivery, and performance insights.',
    features: [],
    buttons: ['View Details', 'Case Study']
  },
  {
    badge: 'Construction • Document System',
    title: 'CDE &mdash; Construction Engineering Document Management',
    image: 'img/project-cde-document-management.png',
    tech: 'Laravel • React • MySQL',
    description: 'A construction document management platform for drawings, submittals, approvals, revisions, contracts, transmittals, collaboration, site records, and project compliance.',
    features: [],
    buttons: ['View Details', 'Case Study']
  },
  {
    badge: 'Workflow • Approval System',
    title: 'Document Management &amp; Approval System',
    image: 'img/project-document-management-approval.png',
    tech: 'Laravel • React • MySQL',
    description: 'A centralized document workflow platform for uploads, approvals, revisions, permissions, comments, notifications, audit trails, and controlled business collaboration.',
    features: [],
    buttons: ['View Details', 'Case Study']
  },
  {
    badge: 'E-commerce • Sports Store',
    title: 'Apollo Sports',
    tech: 'Shopify • E-commerce • Online Store',
    description: 'A Shopify sports store for products, collections, customer shopping, secure checkout, promotions, orders, inventory, and streamlined online retail operations.',
    features: [],
    buttons: ['Visit Website', 'View Project']
  },
  {
    badge: 'E-commerce • Appliances Store',
    title: 'Home Appliances',
    tech: 'WordPress • WooCommerce • E-commerce',
    description: 'A WordPress e-commerce store for home appliances, product discovery, categories, customer orders, payments, promotions, inventory, and online shopping.',
    features: [],
    buttons: ['Visit Website', 'View Project']
  },
  {
    badge: 'E-commerce • Gift Store',
    title: 'PK Gift Shop',
    tech: 'React • E-commerce • Online Store',
    description: 'A modern gift shopping platform for product browsing, categories, customer orders, secure checkout, promotions, inventory, and convenient online purchasing.',
    features: [],
    buttons: ['Visit Website', 'View Project']
  }
];

const defaultProjectImage = 'img/ai-application.png';
const websitePreviewImages = {
  'Apollo Sports': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fapollosports.pk%2F?w=1200&h=700',
  'Home Appliances': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fchoiceappliances.pk%2F?w=1200&h=700',
  'PK Gift Shop': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fpkgiftshop.com%2F?w=1200&h=700',
  'AI-Fatah': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Falfatah.pk%2F?w=1200&h=700',
  'Sindh Crafts': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsindhcrafts.com%2F?w=1200&h=700',
  'Trims': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftrims.pk%2F?w=1200&h=700',
  'Liberty Books': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.libertybooks.com%2F?w=1200&h=700',
  'My Vitamin Store': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.myvitaminstore.pk%2F?w=1200&h=700',
  'Cart PK': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.cartpk.com%2F?w=1200&h=700',
  'Raaz Life': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fraazlife.com%2F?w=1200&h=700',
  'XAD Technologies': 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.xadtechnologies.com%2F?w=1200&h=700',
  'XAD Contracting': 'https://xadcontracting.com/assets/logo/XGC.png',
  'Mobile Payment App': 'https://play-lh.googleusercontent.com/LSLyty4ZnmPDqYTb12h-cxZdSICHPPkorrlyqdaa7xFvmzUm-KwDdohkOxMeb7tdZVU=w526-h296',
  'Studently Mobile Application': 'https://img.youtube.com/vi/ApIrGMwoJ2Y/hqdefault.jpg',
  'German-Based Courier Finder App': 'https://img.youtube.com/vi/nei0rnpbjg4/hqdefault.jpg',
  'Bilkul Fresh Grocery App': 'https://img.youtube.com/vi/DaON2ALg42o/hqdefault.jpg',
  'IELTS Desktop App': 'https://img.youtube.com/vi/1srQ99B2FIw/maxresdefault.jpg'
};
const projectLinks = {
  'Apollo Sports': 'https://apollosports.pk/',
  'Home Appliances': 'https://choiceappliances.pk/',
  'PK Gift Shop': 'https://pkgiftshop.com/',
  'AI-Fatah': 'https://alfatah.pk/',
  'Sindh Crafts': 'https://sindhcrafts.com/',
  'Trims': 'https://trims.pk/',
  'Liberty Books': 'https://www.libertybooks.com/',
  'My Vitamin Store': 'https://www.myvitaminstore.pk/',
  'Cart PK': 'https://www.cartpk.com/',
  'Raaz Life': 'https://raazlife.com/',
  'XAD Technologies': 'https://www.xadtechnologies.com/',
  'XAD Contracting': 'https://xadcontracting.com/',
  'Mobile Payment App': 'https://play.google.com/store/apps/details?id=com.mightywarners.mpay&hl=en',
  'Studently Mobile Application': 'https://youtu.be/ApIrGMwoJ2Y',
  'German-Based Courier Finder App': 'https://www.youtube.com/shorts/nei0rnpbjg4',
  'Bilkul Fresh Grocery App': 'https://youtube.com/shorts/DaON2ALg42o',
  'IELTS Desktop App': 'https://youtu.be/1srQ99B2FIw'
};

featuredProjects.push(
  ...[
    ['AI-Fatah', 'WordPress • E-commerce', 'A WordPress e-commerce platform for product browsing, online orders, customer shopping, promotions, inventory, and reliable retail operations.'],
    ['Sindh Crafts', 'WordPress • E-commerce', 'A cultural e-commerce store for handcrafted products, collections, customer orders, secure checkout, promotions, and online shopping experiences.'],
    ['Trims', 'WordPress • E-commerce', 'A WordPress retail platform for product discovery, categories, customer shopping, orders, promotions, inventory, and streamlined online sales.'],
    ['Liberty Books', 'Node.js • E-commerce', 'An online bookstore platform for book discovery, categories, customer orders, secure checkout, inventory, promotions, and convenient digital shopping.'],
    ['My Vitamin Store', 'Angular • E-commerce', 'An Angular health and wellness store for product browsing, categories, customer orders, secure checkout, promotions, inventory, and online purchasing.'],
    ['Cart PK', 'Magento • E-commerce', 'A Magento e-commerce platform for product catalogs, customer shopping, orders, payments, promotions, inventory, and scalable online retail operations.'],
    ['Raaz Life', 'WordPress • E-commerce', 'A WordPress lifestyle store for product discovery, categories, customer orders, secure checkout, promotions, inventory, and convenient online shopping.'],
    ['XAD Technologies', 'Laravel • Business Platform', 'A Laravel business platform supporting service operations, project workflows, customer management, reporting, approvals, and organized company administration.'],
    ['XAD Contracting', 'Laravel • Business Platform', 'A Laravel contracting platform for project coordination, service workflows, documentation, reporting, approvals, and structured business operations management.'],
    ['Mobile Payment App', 'Google Play • Mobile App', 'A mobile payment application for digital transactions, account access, payment tracking, secure transfers, notifications, and convenient everyday financial management.'],
    ['Studently Mobile Application', 'YouTube • Mobile App', 'A student-focused mobile application supporting learning access, user engagement, educational content, progress tracking, and convenient digital experiences.'],
    ['German-Based Courier Finder App', 'Flutter • Google Maps • Mobile App', 'A German-based courier finder app allowing users to choose pickup and delivery locations on Google Maps and manage courier requests.'],
    ['Bilkul Fresh Grocery App', 'Flutter • E-commerce • Mobile App', 'A Flutter grocery shopping app for fresh products, categories, cart management, online orders, customer checkout, delivery details, and convenient mobile shopping.'],
    ['IELTS Desktop App', 'Electron JS • Desktop App', 'An Electron desktop application for IELTS preparation, learning content, practice activities, progress tracking, assessments, and focused student productivity.'],
  ].map(([title, tech, description]) => ({
    badge: 'Portfolio • Selected Project',
    title,
    image: websitePreviewImages[title],
    url: projectLinks[title],
    tech,
    description,
    features: [],
    buttons: ['View Details', 'Case Study']
  }))
);

featuredProjects.forEach(project => {
  if (!project.image && websitePreviewImages[project.title]) {
    project.image = websitePreviewImages[project.title];
  }
  if (!project.url && projectLinks[project.title]) {
    project.url = projectLinks[project.title];
  }
});

function renderFeaturedProjects() {
  const track = document.querySelector('#featuredProjectsTrack');
  if (!track) return;

  track.innerHTML = featuredProjects.map(project => `
    <article class="featured-project-card reveal visible">
      <div class="project-visual"><img src="${project.image || defaultProjectImage}" alt="${project.title} screenshot" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${defaultProjectImage}'"><span class="project-preview-fallback"><i data-lucide="layout-dashboard"></i>Project preview</span></div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">${project.tech.split(' • ').slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}</div>
      ${project.url && /youtube\.com|youtu\.be/.test(project.url) ? `<code class="project-url" title="Copy this URL">${project.url}</code>` : ''}
      <div class="project-card-actions">
        <a class="project-link-button" href="${project.url || '#contact'}" ${project.url ? 'target="_blank" rel="noopener"' : ''} aria-label="Open ${project.title}"><span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join('');

  if (window.lucide) lucide.createIcons();
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
