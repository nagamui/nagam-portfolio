document.getElementById('year').textContent = new Date().getFullYear();

// ===== Custom cursor =====
const cursor = document.getElementById('cursor');
if (cursor && matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .compare, summary, input, select, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

// ===== Nav: hide on scroll down, show on scroll up =====
const nav = document.getElementById('nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 120) nav.classList.add('hide');
  else nav.classList.remove('hide');
  lastY = y;
}, { passive: true });

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ===== Sticky mobile CTA: show after hero, hide while the form is on screen =====
const mobileCta = document.getElementById('mobileCta');
const hero = document.getElementById('top');
const contact = document.getElementById('contact');
let heroVisible = true;
let contactVisible = false;
const syncCta = () => mobileCta.classList.toggle('show', !heroVisible && !contactVisible);
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; syncCta(); }, { threshold: 0.1 }).observe(hero);
new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; syncCta(); }, { threshold: 0.1 }).observe(contact);

// ===== Before/after compare slider =====
function initCompare(root) {
  const after = root.querySelector('.compare__after');
  const handle = root.querySelector('.compare__handle');
  let dragging = false;
  function setPos(clientX) {
    const rect = root.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }
  root.addEventListener('pointerdown', (e) => { dragging = true; setPos(e.clientX); });
  window.addEventListener('pointermove', (e) => { if (dragging) setPos(e.clientX); });
  window.addEventListener('pointerup', () => { dragging = false; });
  root.addEventListener('mousemove', (e) => { if (!dragging) setPos(e.clientX); });
}
document.querySelectorAll('.compare').forEach(initCompare);

// ===== "More websites" grid =====
const MORE_WORK = [
  'Rio Rancho Orthodontics Redesign',
  'Argyle Orthodontics Redesign',
  'Fairfield Beach Orthodontics Redesign',
  'Golden Orthodontics Redesign',
  'Oglo Lights Web Design',
  'Solar New York — Design & Build',
  'Winter Fashion E-Commerce',
];
const moreGrid = document.getElementById('moreGrid');
MORE_WORK.forEach((name, i) => {
  const div = document.createElement('div');
  div.className = 'more-grid__item';
  const num = document.createElement('span');
  num.className = 'more-grid__item-num';
  num.textContent = String(i + 1).padStart(2, '0');
  const title = document.createElement('span');
  title.className = 'more-grid__item-name';
  title.textContent = name;
  div.append(num, title);
  moreGrid.appendChild(div);
});

// ===== Quote form: AJAX submit with inline confirmation =====
const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  statusEl.className = 'form__status';
  statusEl.textContent = '';
  const data = new FormData(form);
  data.set('phone', `${data.get('phone_country')} ${data.get('phone_number')}`.trim());
  data.delete('phone_country');
  data.delete('phone_number');
  try {
    const res = await fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || res.status);
    form.reset();
    statusEl.classList.add('ok');
    statusEl.textContent = "Got it! Check your inbox for a confirmation. I'll contact you by email or WhatsApp to book your free call.";
    btn.textContent = 'Sent ✓';
  } catch {
    statusEl.classList.add('err');
    statusEl.innerHTML = 'Something went wrong. Please message me on <a href="https://wa.me/16088662937" style="color:var(--accent)">WhatsApp</a> or email <a href="mailto:info.nagamui@gmail.com" style="color:var(--accent)">info.nagamui@gmail.com</a>.';
    btn.disabled = false;
    btn.textContent = 'Send & book my free call →';
  }
});
