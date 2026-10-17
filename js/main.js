// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Custom cursor =====
const cursor = document.getElementById('cursor');
if (cursor && matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .compare').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

// ===== Nav hide on scroll down, show on scroll up =====
const nav = document.getElementById('nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 120) nav.classList.add('hide');
  else nav.classList.remove('hide');
  lastY = y;
}, { passive: true });

// mobile nav toggle (simple: scroll links already anchor; toggle just shows list as column overlay)
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const links = document.querySelector('.nav__links');
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.right = '24px';
    links.style.background = '#14161a';
    links.style.border = '1px solid rgba(245,242,234,0.12)';
    links.style.borderRadius = '14px';
    links.style.padding = '18px 24px';
    links.style.gap = '16px';
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach((el) => counterIO.observe(el));

// ===== Before/after compare slider =====
function initCompare(root) {
  const after = root.querySelector('.compare__after');
  const handle = root.querySelector('.compare__handle');
  let dragging = false;

  function setPos(clientX) {
    const rect = root.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  root.addEventListener('pointerdown', (e) => { dragging = true; setPos(e.clientX); });
  window.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
  window.addEventListener('pointerup', () => dragging = false);
  root.addEventListener('mousemove', (e) => { if (!dragging) setPos(e.clientX); });
}
document.querySelectorAll('.compare').forEach(initCompare);

// ===== "More Work" grid (My Design Lab) =====
const MORE_WORK = [
  'Rio Rancho Orthodontics Redesign',
  'Argyle Orthodontics Redesign',
  'Fairfield Beach Orthodontics Redesign',
  'Golden Orthodontics Redesign',
  'Oglo Lights Web Design',
  'Solar New York — Website Design & Build',
  'Winter Fashion E-Commerce Website',
];
const moreGrid = document.getElementById('moreGrid');
if (moreGrid) {
  MORE_WORK.forEach((name, i) => {
    const div = document.createElement('div');
    div.className = 'more-grid__item';
    div.innerHTML = `<span class="more-grid__item-num">0${i + 1}</span><span class="more-grid__item-name">${name}</span>`;
    moreGrid.appendChild(div);
  });
}
