// Scroll-morph engine. Reads each .member's --t-* theme variables and blends
// between neighbours as you scroll. Nobody needs to edit this file.
(() => {
  const members = [...document.querySelectorAll('.member')];
  const keys = ['bg', 'fg', 'accent', 'muted', 'card'];
  const root = document.documentElement;
  const ctx = document.createElement('canvas').getContext('2d');
  const rgb = c => { ctx.fillStyle = '#888'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
  const themes = members.map(m => {
    const s = getComputedStyle(m);
    return Object.fromEntries(keys.map(k => [k, rgb(s.getPropertyValue('--t-' + k).trim())]));
  });
  const [b1, b2] = document.querySelectorAll('.blob');
  const nav = document.querySelector('.dots');
  const dots = members.map((m, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to teammate ' + (i + 1));
    b.onclick = () => m.scrollIntoView({ behavior: 'smooth' });
    nav.appendChild(b);
    return b;
  });
  const smooth = x => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
  let queued = false;

  function update() {
    queued = false;
    const vh = innerHeight, c = scrollY + vh / 2, z = vh * 0.6;
    let p = 0; // 0..n-1: which theme we're on, plus fraction toward the next
    for (let k = 0; k < members.length - 1; k++)
      p += smooth((c - (members[k + 1].offsetTop - z)) / (2 * z));
    const i = Math.min(Math.floor(p), members.length - 1);
    const j = Math.min(i + 1, members.length - 1), t = p - i;
    keys.forEach(k => {
      const v = themes[i][k].map((a, n) => Math.round(a + (themes[j][k][n] - a) * t));
      root.style.setProperty('--' + k, `rgb(${v})`);
    });
    const m = Math.sin(Math.PI * t); // 0 at rest, 1 mid-morph
    b1.style.transform = `translate(${p * 6}vw,${p * 10}vh) rotate(${p * 120}deg) scale(${1 + m * 0.5})`;
    b2.style.transform = `translate(${-p * 6}vw,${-p * 8}vh) rotate(${-p * 90}deg) scale(${1 + m * 0.7})`;
    dots.forEach((d, n) => d.classList.toggle('on', n === Math.round(p)));
  }
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  update();
})();
