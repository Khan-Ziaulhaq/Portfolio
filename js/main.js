
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Sound engine (Web Audio API, fully synthesized — no audio files) ---------- */
const SoundFX = (() => {
    let ctx = null;
    let master = null;
    let musicOn = false;
    let musicTimer = null;
    let stepIndex = 0;
    // a moody minor-ish arpeggio, kept sparse so it sits behind the UI rather than fighting it
    const scale = [220.00, 261.63, 293.66, 329.63, 349.23, 440.00];

    function ensureCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            master = ctx.createGain();
            master.gain.value = 0.45;
            master.connect(ctx.destination);
        }
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function tone({ freq, type = 'square', start = 0, dur = 0.09, peak = 0.22, slideTo = null }) {
        const c = ensureCtx();
        const now = c.currentTime + start;
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, now + dur);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(peak, now + Math.min(0.012, dur / 3));
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        osc.connect(gain); gain.connect(master);
        osc.start(now); osc.stop(now + dur + 0.02);
    }

    // short, techy UI blip — pitch varies slightly by "weight" of the element clicked
    // always plays: click/hover feedback is independent of the background-music toggle
    function click(weight = 1) {
        const base = 720 + weight * 220;
        tone({ freq: base, slideTo: base * 0.55, type: 'square', dur: 0.08, peak: 0.18 });
        tone({ freq: base * 2, type: 'triangle', dur: 0.04, peak: 0.06 });
    }

    // even shorter, quieter tick for hover — a whisper of the click sound
    function hover() {
        tone({ freq: 1500, slideTo: 1900, type: 'sine', dur: 0.035, peak: 0.05 });
    }

    function scheduleStep() {
        if (!musicOn) return;
        const freq = scale[stepIndex % scale.length];
        tone({ freq, type: 'triangle', dur: 0.3, peak: 0.075 });
        if (stepIndex % 4 === 0) {
            tone({ freq: freq / 4, type: 'square', dur: 0.4, peak: 0.05 });
        }
        if (stepIndex % 8 === 6) {
            tone({ freq: freq * 2, type: 'sine', dur: 0.15, peak: 0.04 });
        }
        stepIndex++;
        musicTimer = setTimeout(scheduleStep, 230);
    }

    // toggles ONLY the background music loop — click/hover SFX are unaffected
    function toggleMusic() {
        ensureCtx();
        musicOn = !musicOn;
        if (musicOn) {
            tone({ freq: 500, slideTo: 1400, type: 'square', dur: 0.12, peak: 0.2 });
            stepIndex = 0;
            scheduleStep();
        } else {
            clearTimeout(musicTimer);
            tone({ freq: 900, slideTo: 300, type: 'square', dur: 0.12, peak: 0.2 });
        }
        return musicOn;
    }

    return { toggleMusic, click, hover, isMusicOn: () => musicOn };
})();

const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundToggleLabel');
soundToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // this button manages its own on/off tone below
    const on = SoundFX.toggleMusic();
    soundToggle.classList.toggle('is-on', on);
    soundToggle.setAttribute('aria-pressed', on);
    soundLabel.textContent = on ? 'Music on' : 'Music off';
});

// click sound fires anywhere on the page — button or not
document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button, .chip, .stamp');
    const heavy = el && el.matches('.btn-primary, .contact-cta, .nav-cta') ? 2
        : el && el.matches('.chip, .stamp') ? 0
            : 1;
    SoundFX.click(heavy);
});

// hover sound on every interactive element
const hoverTargets = document.querySelectorAll(
    'a, button, .chip, .stamp, .stat-card, .project-card, .cert-card, .fact-card, .mini-stat, .t-item'
);
hoverTargets.forEach(el => {
    if (el.id === 'soundToggle') return;
    el.addEventListener('mouseenter', () => SoundFX.hover());
});
