/* OM MEDICAL STORE — main.js */

const navbar = document.getElementById('navbar');
const topFab  = document.getElementById('topFab');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  topFab.classList.toggle('show', window.scrollY > 400);
});

// Burger menu
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const s = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    s[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    s[1].style.opacity = '0';
    s[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    s.forEach(x => { x.style.transform=''; x.style.opacity=''; });
  }
});
document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.querySelectorAll('span').forEach(x => { x.style.transform=''; x.style.opacity=''; });
}));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 64, behavior: 'smooth' }); }
  });
});

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('show'), i * 60);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
document.querySelectorAll('.rv').forEach(el => ro.observe(el));

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  document.querySelectorAll('.nl').forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
  });
});

// Order WhatsApp button
const orderBtn = document.getElementById('orderBtn');
if (orderBtn) {
  orderBtn.addEventListener('click', () => {
    const name    = document.getElementById('ordName').value.trim();
    const phone   = document.getElementById('ordPhone').value.trim();
    const address = document.getElementById('ordAddress').value.trim();
    const type    = document.getElementById('ordType').value;
    const items   = document.getElementById('ordItems').value.trim();

    if (!name || !phone || !type) {
      ['ordName','ordPhone','ordType'].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          el.style.borderColor = '#dc2626';
          el.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)';
          setTimeout(() => { el.style.borderColor=''; el.style.boxShadow=''; }, 2500);
        }
      });
      return;
    }

    const msg =
`🏪 *Order Request — Om Medical Store*

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📍 *Delivery Address:* ${address || 'Will share on call'}
💊 *Category:* ${type}
📝 *Items Required:* ${items || 'Will share prescription separately'}

_Please confirm availability & delivery time. Thank you!_
_Om Medical Store, Jodhpur_`;

    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// Back to top
topFab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
