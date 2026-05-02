// Theme init
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.documentElement.classList.add('dark');
})();

function setThemeButton(){
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  btn.textContent = document.documentElement.classList.contains('dark') ? '☀️ Hell' : '🌙 Dunkel';
}

function toggleTheme(){
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeButton();
}

function makeDemoLetter({ occasion, childName, childAge, tone, inputText }){
  const name = childName?.trim() || 'du';
  const age = childAge?.trim() ? ` (${childAge.trim()} Jahre)` : '';

  const greet = occasion === 'weihnachten'
    ? 'Ho ho ho!'
    : (occasion === 'ostern' ? 'Hopp hopp!' : 'Hallo!');

  const from = occasion === 'weihnachten'
    ? 'Dein Weihnachtsmann'
    : (occasion === 'ostern' ? 'Dein Osterhase' : 'Dein magischer Freund');

  const mission = occasion === 'schulstart'
    ? 'Mission: Pack morgen deinen Rucksack wie ein Profi – Schritt für Schritt.'
    : (occasion === 'geburtstag'
      ? 'Mission: Sammle heute 3 „Glücksmomente“ und erzähle sie jemandem.'
      : 'Mission: Sag heute jemandem ein nettes Wort – und lächle dabei.');

  const toneLine = tone === 'lustig'
    ? 'Ich musste beim Lesen sogar ein bisschen kichern! '
    : (tone === 'motivierend'
      ? 'Du kannst richtig stolz auf dich sein. '
      : '');

  return `${greet}\n\nLiebe/r ${name}${age},\n\nIch habe deine Nachricht gelesen:\n„${(inputText || '').trim()}“\n\n${toneLine}Ich finde es wunderbar, wie du deine Wünsche und Gedanken formulierst.\n\n${mission}\n\nMit magischen Grüßen\n${from}`;
}

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeBtn');
  if (btn) btn.addEventListener('click', toggleTheme);
  setThemeButton();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Demo generator
  const form = document.getElementById('demoForm');
  const out = document.getElementById('demoResult');
  const status = document.getElementById('demoStatus');
  const copy = document.getElementById('copyBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';

      const payload = {
        occasion: document.getElementById('occasion').value,
        childName: document.getElementById('childName').value,
        childAge: document.getElementById('childAge').value,
        tone: document.getElementById('tone').value,
        inputText: document.getElementById('inputText').value
      };

      if (!payload.inputText.trim()) {
        status.textContent = 'Bitte Text/Wünsche eingeben.';
        return;
      }

      out.textContent = makeDemoLetter(payload);
      status.textContent = 'Fertig! (Demo – ohne AI)';
      copy.disabled = false;
    });
  }

  if (copy) {
    copy.addEventListener('click', async () => {
      await navigator.clipboard.writeText(out.textContent || '');
      status.textContent = 'Kopiert.';
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
});
