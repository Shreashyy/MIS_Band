/* =====================================================================
   RESONANCE — School Band Website (Light Edition)
   Script: script.js
   ===================================================================== */

'use strict';

/* ─── HELPERS ────────────────────────────────────────────────────────── */
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
const lerp  = (a, b, t)     => a + (b - a) * t;
const $     = id => document.getElementById(id);
const $$    = sel => document.querySelectorAll(sel);

/* ─── DATA ───────────────────────────────────────────────────────────── */

/*
  MEMBER DATA
  ──────────────────────────────────────────────────────────────────
  Each member object supports:
    name        — full name
    role        — instrument / position
    section     — 'strings' | 'brass' | 'woodwind' | 'percussion'
    years       — years in band
    bio         — short biography
    fact1 / fact2 / fact3 — quick stat labels
    val1  / val2  / val3  — quick stat values
    email       — contact email (shown in modal)
    phone       — contact phone (shown in modal)   [optional]
    instagram   — Instagram handle without @        [optional]
    tags        — array of specialty strings

  PHOTO NOTE:
  ──────────────────────────────────────────────────────────────────
  Each member currently shows a generated SVG avatar.
  To use a real photo, add a `photo` key pointing to your image:
    photo: 'images/aria-chen.jpg'
  The modal will automatically display it instead of the SVG avatar.
  Recommended: square crop, min 300×300 px.
*/
const MEMBERS = [
  {
    name: 'Arav Garg',
    role: 'Drummer ·  Leader',
    section: 'drums', years: 4,
    bio: 'Arav GARG has led the school band for two consecutive seasons with remarkable poise. As a international champion, he brings both technical mastery and deep musical sensitivity to every performance.',
    fact1: 'Instrument', val1: 'Drums',
    fact2: 'Joined',     val2: '2023',
    fact3: 'Level',      val3: 'Grade 67',
    email: 'aravg2029@misp.org',
    phone: '+91 67676767676767',
    instagram: '@aravgarg1404',
    photo: 'Arav.jpg', 
    tags: ['Soloist', 'Section Leader', 'idk'],
  },
  {
    name: 'Krish Karandiker',
    role: 'keyboard',
    section: 'keyboard', years: 2,
    bio: 'Krish\'s rich, resonant tone anchors the keyboard section with effortless authority. He has performed in two national youth competitions and mentors junior members in sectional rehearsals.',
    fact1: 'Instrument', val1: 'Keyboard',
    fact2: 'Joined',     val2: '2026.02.28',
    fact3: 'Level',      val3: 'Grade 0.2',
    email: 'krish.krish@gmail.com',
    phone: '+91 000000000',
    photo: 'Krish.jpg', 
    instagram: 'KrishKarandiker',
    tags: ['Bihar village Competitor', 'bobby'],
  },
  {
    name: 'Kana Asai',
    role: 'keyboard',
    section: 'keyboard', years: 2,
    bio: 'A upcoming star with an extraordinary ear for intonation, Kana joined the band in 2023 and quickly established herself as one of its brightest young talents. Her natural musicality shines in chamber settings.',
    fact1: 'Instrument', val1: 'Violin',
    fact2: 'Joined',     val2: '2023',
    fact3: 'Level',      val3: 'Grade 6',
    email: 'kana.kana@gmail.com',
    photo: 'Kana.jpg', 
    instagram: 'sofia.r.violin',
    tags: ['Chamber Music', 'Rising Talent'],
  },
  {
    name: 'Chae Hyeong Park',
    role: 'Guitar',
    section: 'strings', years: 3,
    bio: 'The expressive voice between violin and cello, Chae brings warmth and colour to every piece he touches. He is deeply passionate about 20th-century repertoire and runs our chamber music workshop.',
    fact1: 'Instrument', val1: 'Gutiar',
    fact2: 'Joined',     val2: '2022',
    fact3: 'Speciality', val3: 'Modern',
    email: 'chae.park@gmail.com',
    phone: '+91 676767676767676',
    photo: 'Chae.jpg', 
    instagram: 'cae_bark',
    tags: ['Chamber Workshop', 'Modern Repertoire'],
  },
  {
    name: 'Hyeonil Kevin Won',
    role: 'Guitar',
    section: 'strings', years: 2,
    bio: 'Hyeonil provides the rhythmic and harmonic foundation of the orchestra. His steady pizzicato and expressive arco playing has become indispensable to both classical and jazz ensemble settings.',
    fact1: 'Instrument', val1: 'Guitar',
    fact2: 'Joined',     val2: '2023',
    fact3: 'Also Plays', val3: 'Guitar',
    email: 'hyeonil.hyeonil@gmail.com',
    instagram: 'h1.even',
    photo: 'Kevin.jpg', 
    tags: ['Fast tempo', 'Classy'],
  },
  {
    name: 'Anaya Atulkar',
    role: 'Singer',
    section: 'Singer', years: 4,
    bio: 'Anaya is the principal singer and one of the longest-serving members of the band. Known for her clean attacks, brilliant high register, and stage presence, he leads our brass section with confidence and flair.',
    fact1: 'Instrument', val1: 'Microphone',
    fact2: 'Joined',     val2: '2021',
    fact3: 'Level',      val3: 'Grade 6+7',
    email: 'anaya.atulkar@freaky.edu',
    phone: '+91 918357018357',
    instagram: 'dinoxdraws',
    photo: 'Kevin.jpg', 
    tags: ['Principal', '4-Year Veteran', ' Lead'],
  },
  {
    name: 'Ajay Carsan Rajeshwar',
    role: 'Guitar',
    section: 'Guitar', years: 3,
    bio: 'Ajay"s lyrical,  tone is the backbone of our  section. He has performed as a soloist at the district festival and leads our brass ensemble in collaborative arrangements.',
    fact1: 'Instrument', val1: 'French Horn',
    fact2: 'Joined',     val2: '2022',
    fact3: 'Honour',     val3: 'District Solo',
    email: 'Ajay.Ajay@gmail.com',
    instagram: 'mydoghaslice219048',
    photo: 'Ajay.jpg', 
    tags: ['Soloist', 'Brass Ensemble', 'District Award'],
  },
];

const PERFORMANCES = [
  {
    date: 'October 2025', name: 'Every breath you take',
    venue: 'MPH',
    desc: 'Our yearly winter concert, attended by over 300 guests.',
    tag: 'Concert',
  },
  {
    date: 'October 2025', name: 'Notion',
    venue: 'Basketball court',
    desc: 'An intimate evening of chamber music showcasing small ensemble work from our most advanced members, in a stunning Victorian setting.',
    tag: 'Chamber',
  },
  {
    date: 'November 2025', name: 'Tek it',
    venue: 'State Concert Hall',
    desc: 'For graduating MYP certificates',
    tag: 'Ceremony',
  },
  {
    date: 'January 2026', name: 'I want it that way',
    venue: 'MPH',
    desc: 'Invited to perform as the band for ISACI',
    tag: 'Sports Event',
  },
  {
    date: 'Jan 2026', name: 'Mary on a cross',
    venue: 'Westbrook Academy Grounds',
    desc: 'Invited to perform as the band for ISACI.',
    tag: 'Sports event',
  },
  {
    date: 'March 2024', name: 'Lush life',
    venue: 'MPH',
    desc: 'Gradion ceremony',
    tag: 'Ceremony',
  },
];
const GALLERY_ITEMS = [

  {
    label: 'Spring Gala – Full Orchestra',
    image: '20260402_080036.jpg',
    wide: true
  },

  {
    label: 'Violin Section Rehearsal',
    image: 'freak1.jpg'
  },

  {
    label: 'National Competition – Gold Moment',
    image: 'freak2.jpg',
    tall: true
  },

  {
    label: 'Backstage Before the Show',
    image: 'freak3.jpg'
  },


];

/* ─── SECTION COLOURS ────────────────────────────────────────────────── */
const sectionMeta = {
  strings:    { color: '#4a7fb5', colorPale: '#e8f0f8', label: 'Strings'    },
  brass:      { color: '#B8922A', colorPale: '#fdf5dc', label: 'Brass'      },
  woodwind:   { color: '#3a9a60', colorPale: '#e8f5ed', label: 'Woodwind'   },
  percussion: { color: '#b54040', colorPale: '#fde8e8', label: 'Percussion' },
};

/* ─── PRELOADER ──────────────────────────────────────────────────────── */
(function initPreloader() {
  const preloader = $('preloader');
  const fill      = $('preloader-fill');
  let progress = 0;
  document.body.style.overflow = 'hidden';

  const tick = setInterval(() => {
    progress += Math.random() * 16 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      fill.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.style.overflow = '';
      }, 450);
    }
    fill.style.width = clamp(progress, 0, 100) + '%';
  }, 75);
})();

/* ─── SCROLL PROGRESS BAR ────────────────────────────────────────────── */
(function initProgressBar() {
  const bar = $('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });
})();

/* ─── CUSTOM CURSOR ──────────────────────────────────────────────────── */
(function initCursor() {
  const cursor = $('cursor');
  const trail  = $('cursor-trail');
  if (!cursor || !trail) return;
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function loop() {
    tx = lerp(tx, mx, 0.14); ty = lerp(ty, my, 0.14);
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .gallery-item, .member-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); trail.classList.add('hovering'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); trail.classList.remove('hovering'); });
  });
})();

/* ─── NAVBAR ─────────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar     = $('navbar');
  const toggle     = $('nav-toggle');
  const links      = $('nav-links');
  const navAnchors = $$('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = open ? 'translateY(6px) rotate(45deg)'  : '';
    spans[1].style.opacity   = open ? '0' : '';
    spans[2].style.transform = open ? 'translateY(-6px) rotate(-45deg)' : '';
  });

  navAnchors.forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    $$('nav-toggle span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  $$('.section').forEach(s => observer.observe(s));
})();

/* ─── FLOATING MUSIC NOTES ───────────────────────────────────────────── */
(function initNotes() {
  const container = $('notes-container');
  if (!container) return;
  const symbols = ['♩','♪','♫','♬','𝄞','𝄢'];

  function spawn() {
    const note = document.createElement('span');
    note.className = 'music-note';
    note.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    note.style.left = (Math.random() * 88 + 6) + '%';
    note.style.bottom = (Math.random() * 30) + '%';
    note.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    note.style.animationDuration = (Math.random() * 4 + 5) + 's';
    container.appendChild(note);
    setTimeout(() => note.remove(), 9000);
  }

  setInterval(spawn, 1300);
  for (let i = 0; i < 4; i++) setTimeout(spawn, i * 350);
})();

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────────────── */
(function initScrollAnims() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.14 });
  $$('[data-animate]').forEach(t => obs.observe(t));
})();

/* ─── STAT COUNTERS ──────────────────────────────────────────────────── */
(function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = parseInt(el.dataset.target, 10);
      let cur = 0;
      const step = Math.ceil(target / 55);
      const tmr = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(tmr); }
        el.textContent = cur + (target > 99 ? '+' : '');
      }, 22);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.stat-number[data-target]').forEach(el => obs.observe(el));
})();

/* ─── GENERATE MEMBER AVATAR SVG ─────────────────────────────────────── */
/*
  buildAvatarSVG(member, idx) → returns an <svg>…</svg> HTML string.
  This is used both in the card grid AND in the modal.
  If member.photo is set, it is used instead (see renderModal).
*/
function buildAvatarSVG(member, idx, size = 200) {
  const meta  = sectionMeta[member.section] || sectionMeta.strings;
  const color = meta.color;
  const pale  = meta.colorPale;

  const instrumentPaths = {
    strings: `
      <path d="M${size*0.62} ${size*0.56} Q${size*0.72} ${size*0.5} ${size*0.75} ${size*0.6}
               Q${size*0.78} ${size*0.7} ${size*0.68} ${size*0.73}
               Q${size*0.58} ${size*0.76} ${size*0.54} ${size*0.66}
               Q${size*0.5} ${size*0.56} ${size*0.62} ${size*0.56}"
            stroke="${color}" stroke-width="2" fill="none" opacity="0.65"/>
      <line x1="${size*0.7}" y1="${size*0.65}" x2="${size*0.82}" y2="${size*0.8}"
            stroke="${color}" stroke-width="1.2" opacity="0.45"/>`,
    brass: `
      <path d="M${size*0.6} ${size*0.6} Q${size*0.75} ${size*0.55} ${size*0.78} ${size*0.64}
               Q${size*0.82} ${size*0.74} ${size*0.7} ${size*0.78}"
            stroke="${color}" stroke-width="2.5" fill="none" opacity="0.6" stroke-linecap="round"/>
      <circle cx="${size*0.78}" cy="${size*0.68}" r="${size*0.07}"
              stroke="${color}" stroke-width="1.5" fill="none" opacity="0.45"/>`,
    woodwind: `
      <rect x="${size*0.6}" y="${size*0.5}" width="${size*0.04}" height="${size*0.32}"
            rx="${size*0.015}" fill="${color}" opacity="0.55"/>
      <circle cx="${size*0.62}" cy="${size*0.58}" r="${size*0.018}" fill="${color}" opacity="0.45"/>
      <circle cx="${size*0.62}" cy="${size*0.65}" r="${size*0.018}" fill="${color}" opacity="0.45"/>
      <circle cx="${size*0.62}" cy="${size*0.72}" r="${size*0.018}" fill="${color}" opacity="0.45"/>`,
    percussion: `
      <ellipse cx="${size*0.68}" cy="${size*0.66}" rx="${size*0.1}" ry="${size*0.055}"
               stroke="${color}" stroke-width="2" fill="none" opacity="0.6"/>
      <line x1="${size*0.68}" y1="${size*0.605}" x2="${size*0.68}" y2="${size*0.5}"
            stroke="${color}" stroke-width="1" opacity="0.4"/>
      <line x1="${size*0.58}" y1="${size*0.5}" x2="${size*0.55}" y2="${size*0.42}"
            stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>`,
  };

  const ip = instrumentPaths[member.section] || instrumentPaths.strings;

  return `<svg viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="rg${idx}" cx="50%" cy="38%" r="60%">
        <stop offset="0%"   stop-color="${pale}"/>
        <stop offset="100%" stop-color="${pale}" stop-opacity="0.3"/>
      </radialGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#rg${idx})"/>
    <!-- Body -->
    <ellipse cx="${size*0.5}" cy="${size*0.36}" rx="${size*0.145}" ry="${size*0.145}"
             fill="#d4c8be" stroke="${color}" stroke-width="1.2" stroke-opacity="0.5"/>
    <!-- Torso -->
    <path d="M${size*0.3} ${size} Q${size*0.37} ${size*0.6} ${size*0.5} ${size*0.58}
             Q${size*0.63} ${size*0.6} ${size*0.7} ${size}"
          fill="#c8bdb2" stroke="${color}" stroke-width="0.5" stroke-opacity="0.3"/>
    <!-- Instrument -->
    ${ip}
    <!-- Chest glow -->
    <ellipse cx="${size*0.5}" cy="${size*0.36}" rx="${size*0.2}" ry="${size*0.2}"
             fill="${color}" opacity="0.06"/>
  </svg>`;
}

/* ─── RENDER MEMBER CARDS ────────────────────────────────────────────── */
(function renderMembers() {
  const grid = $('members-grid');
  if (!grid) return;

  function cardHTML(m, i) {
    return `
      <div class="member-card"
           data-section="${m.section}"
           data-member-idx="${i}"
           style="animation-delay:${i * 0.045}s"
           tabindex="0"
           role="button"
           aria-label="View ${m.name}'s profile">
        <div class="member-avatar">
          ${m.photo
            ? `<img src="${m.photo}" alt="${m.name}" style="width:100%;height:100%;object-fit:cover;"/>`
            : buildAvatarSVG(m, i)
          }
          <div class="member-avatar-overlay"></div>
          <span class="member-avatar-badge">${sectionMeta[m.section]?.label || m.section}</span>
        </div>
        <div class="member-info">
          <div class="member-name">${m.name}</div>
          <div class="member-role">${m.role.split('·')[0].trim()} · ${m.years}yr${m.years>1?'s':''}</div>
          <p class="member-bio">${m.bio.substring(0, 90)}…</p>
        </div>
      </div>`;
  }

  grid.innerHTML = MEMBERS.map((m, i) => cardHTML(m, i)).join('');

  // Filter
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      $$('.member-card').forEach((card, i) => {
        const show = filter === 'all' || card.dataset.section === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          // Re-trigger animation
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
          card.style.animationDelay = (i * 0.04) + 's';
        }
      });
    });
  });

  // Open modal on click or Enter key
  grid.addEventListener('click',   e => { const card = e.target.closest('.member-card'); if (card) openModal(parseInt(card.dataset.memberIdx, 10)); });
  grid.addEventListener('keydown', e => { if (e.key === 'Enter') { const card = e.target.closest('.member-card'); if (card) openModal(parseInt(card.dataset.memberIdx, 10)); } });
})();

/* ─── MEMBER MODAL ───────────────────────────────────────────────────── */
let currentModalIdx = null;

function openModal(idx) {
  const m        = MEMBERS[idx];
  const meta     = sectionMeta[m.section] || sectionMeta.strings;
  const backdrop = $('member-modal-backdrop');
  const body     = $('modal-body');

  currentModalIdx = idx;

  // Build avatar or photo
  const avatarHTML = m.photo
    ? `<img src="${m.photo}" alt="${m.name}"
           style="width:100%;height:100%;object-fit:cover;border-radius:50%;"/>`
    : buildAvatarSVG(m, idx + 100, 160);

  // Build contact rows
  const contactRows = [];
  if (m.email) {
    contactRows.push(`
      <div class="modal-contact-item">
        <div class="modal-contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <span class="modal-contact-value">
          <a href="mailto:${m.email}" style="color:inherit;">${m.email}</a>
        </span>
      </div>`);
  }
  if (m.phone) {
    contactRows.push(`
      <div class="modal-contact-item">
        <div class="modal-contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </div>
        <span class="modal-contact-value">${m.phone}</span>
      </div>`);
  }
  if (m.instagram) {
    contactRows.push(`
      <div class="modal-contact-item">
        <div class="modal-contact-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </div>
        <span class="modal-contact-value">
          <a href="https://instagram.com/${m.instagram}" target="_blank" rel="noopener" style="color:inherit;">@${m.instagram}</a>
        </span>
      </div>`);
  }

  // Build tags
  const tagsHTML = (m.tags || []).map(t => `<span class="modal-tag">${t}</span>`).join('');

  // Inject modal HTML
  body.innerHTML = `
    <!-- Left avatar column -->
    <div class="modal-avatar-col">
      <div class="modal-avatar-svg">${avatarHTML}</div>
      <div class="modal-badge" style="background:${meta.color};">${meta.label}</div>
      <div class="modal-years">${m.years}</div>
      <div class="modal-years-label">Year${m.years > 1 ? 's' : ''} in Band</div>
    </div>

    <!-- Right info column -->
    <div class="modal-info-col">
      <h2 class="modal-name">${m.name}</h2>
      <p class="modal-role" style="color:${meta.color};">${m.role}</p>
      <div class="modal-divider" style="background:${meta.color};opacity:0.25;"></div>

      <p class="modal-bio">${m.bio}</p>

      <!-- Quick facts -->
      <div class="modal-facts">
        <div class="modal-fact">
          <div class="modal-fact-label">${m.fact1}</div>
          <div class="modal-fact-value">${m.val1}</div>
        </div>
        <div class="modal-fact">
          <div class="modal-fact-label">${m.fact2}</div>
          <div class="modal-fact-value">${m.val2}</div>
        </div>
        <div class="modal-fact">
          <div class="modal-fact-label">${m.fact3}</div>
          <div class="modal-fact-value">${m.val3}</div>
        </div>
      </div>

      <!-- Contacts -->
      ${contactRows.length ? `
        <p class="modal-contact-title">Contact</p>
        <div class="modal-contacts">${contactRows.join('')}</div>
      ` : ''}

      <!-- Tags -->
      ${tagsHTML ? `<div class="modal-tags">${tagsHTML}</div>` : ''}
    </div>`;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('member-modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
  currentModalIdx = null;
}

// Close button
$('modal-close').addEventListener('click', closeModal);

// Backdrop click
$('member-modal-backdrop').addEventListener('click', e => {
  if (e.target === $('member-modal-backdrop')) closeModal();
});

// Keyboard: Escape to close, arrow keys to navigate
document.addEventListener('keydown', e => {
  const backdrop = $('member-modal-backdrop');
  if (!backdrop.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') openModal((currentModalIdx + 1) % MEMBERS.length);
  if (e.key === 'ArrowLeft')  openModal((currentModalIdx - 1 + MEMBERS.length) % MEMBERS.length);
});

/* ─── RENDER PERFORMANCES ────────────────────────────────────────────── */
(function renderPerformances() {
  const container = $('performances-timeline');
  if (!container) return;

  container.innerHTML = PERFORMANCES.map((p, i) => `
    <div class="perf-item" style="transition-delay:${i*0.08}s">
      ${i % 2 === 0
        ? `<div class="perf-card">
              <div class="perf-date">${p.date}</div>
              <div class="perf-name">${p.name}</div>
              <div class="perf-venue">📍 ${p.venue}</div>
              <p class="perf-desc">${p.desc}</p>
              <span class="perf-tag">${p.tag}</span>
           </div>
           <div class="perf-spacer"><div class="perf-dot"></div></div>
           <div class="perf-empty"></div>`
        : `<div class="perf-empty"></div>
           <div class="perf-spacer"><div class="perf-dot"></div></div>
           <div class="perf-card">
              <div class="perf-date">${p.date}</div>
              <div class="perf-name">${p.name}</div>
              <div class="perf-venue">📍 ${p.venue}</div>
              <p class="perf-desc">${p.desc}</p>
              <span class="perf-tag">${p.tag}</span>
           </div>`
      }
    </div>`
  ).join('');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animated'); obs.unobserve(e.target); } });
  }, { threshold: 0.18 });
  container.querySelectorAll('.perf-item').forEach(it => obs.observe(it));
})();

/* ─── RENDER GALLERY ─────────────────────────────────────────────────── */
(function renderGallery() {
  const grid = $('gallery-grid');
  if (!grid) return;

  /* Light-palette illustrated SVGs per slot */
  function gallerySVG(item, idx) {
    const { color: bg, accent, label } = item;
    const illustrations = [
      // 0 — Full orchestra (wide, warm ivory)
      `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="600" height="300" fill="${bg}"/>
        <ellipse cx="300" cy="340" rx="420" ry="130" fill="${accent}" opacity="0.07"/>
        <line x1="0" y1="270" x2="600" y2="270" stroke="${accent}" stroke-width="0.5" opacity="0.25"/>
        ${[80,160,240,320,400,480].map((x,i)=>`
          <ellipse cx="${x}" cy="${248-i*1.5}" rx="11" ry="11" fill="${accent}" opacity="0.35"/>
          <rect x="${x-9}" y="${259-i*1.5}" width="18" height="38" rx="2" fill="${accent}" opacity="0.25"/>
        `).join('')}
        <text x="300" y="145" text-anchor="middle" font-family="Cormorant Garamond"
              font-size="32" fill="${accent}" opacity="0.15" font-style="italic">Spring Gala</text>
        <text x="300" y="172" text-anchor="middle" font-family="DM Sans"
              font-size="11" fill="${accent}" opacity="0.3" letter-spacing="5">2025</text>
      </svg>`,

      // 1 — Violin close-up (blue)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        <path d="M135 85 Q165 63 178 96 Q192 128 170 152 Q148 175 126 155 Q104 134 106 108 Q108 82 135 85"
              stroke="${accent}" stroke-width="2.5" fill="${accent}" fill-opacity="0.06" opacity="0.7"/>
        <line x1="156" y1="150" x2="185" y2="238" stroke="${accent}" stroke-width="2.5" opacity="0.45"/>
        <path d="M88 168 Q205 162 215 174" stroke="${accent}" stroke-width="1.2" fill="none" opacity="0.3"/>
        <text x="150" y="268" text-anchor="middle" font-family="DM Sans" font-size="10"
              fill="${accent}" opacity="0.5" letter-spacing="4">STRINGS</text>
      </svg>`,

      // 2 — Gold award (tall)
      `<svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="500" fill="${bg}"/>
        <polygon points="150,60 172,124 240,124 185,162 207,226 150,188 93,226 115,162 60,124 128,124"
                 stroke="${accent}" stroke-width="2.5" fill="${accent}" fill-opacity="0.1" opacity="0.8"/>
        <text x="150" y="305" text-anchor="middle" font-family="Cormorant Garamond"
              font-size="52" fill="${accent}" opacity="0.16" font-style="italic">Gold</text>
        <text x="150" y="338" text-anchor="middle" font-family="DM Sans" font-size="9"
              fill="${accent}" opacity="0.4" letter-spacing="5">NATIONAL AWARD</text>
        <line x1="80" y1="360" x2="220" y2="360" stroke="${accent}" stroke-width="0.5" opacity="0.25"/>
      </svg>`,

      // 3 — Backstage (lavender)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        <rect x="0" y="210" width="300" height="90" fill="${accent}" opacity="0.06"/>
        <ellipse cx="100" cy="192" rx="16" ry="16" fill="${accent}" opacity="0.4"/>
        <rect x="85" y="208" width="30" height="60" rx="3" fill="${accent}" opacity="0.3"/>
        <ellipse cx="205" cy="186" rx="17" ry="17" fill="${accent}" opacity="0.35"/>
        <rect x="189" y="203" width="32" height="65" rx="3" fill="${accent}" opacity="0.25"/>
        <rect x="2" y="198" width="5" height="102" fill="${accent}" opacity="0.45"/>
        <rect x="293" y="198" width="5" height="102" fill="${accent}" opacity="0.45"/>
        <text x="150" y="160" text-anchor="middle" font-family="Cormorant Garamond" font-size="13"
              fill="${accent}" opacity="0.35" letter-spacing="6">BACKSTAGE</text>
      </svg>`,

      // 4 — Conductor (green teal)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        <circle cx="150" cy="150" r="85" stroke="${accent}" stroke-width="0.6" opacity="0.12"/>
        <circle cx="150" cy="150" r="52" stroke="${accent}" stroke-width="0.6" opacity="0.18"/>
        <line x1="150" y1="50" x2="222" y2="124" stroke="${accent}" stroke-width="3.5"
              stroke-linecap="round" opacity="0.7"/>
        <circle cx="222" cy="124" r="7" fill="${accent}" opacity="0.8"/>
        <line x1="150" y1="150" x2="78" y2="208" stroke="${accent}" stroke-width="2.5"
              stroke-linecap="round" opacity="0.4"/>
        <text x="150" y="265" text-anchor="middle" font-family="Cormorant Garamond" font-size="12"
              fill="${accent}" opacity="0.38" letter-spacing="5" font-style="italic">maestro</text>
      </svg>`,

      // 5 — Brass section (wide, warm red)
      `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="600" height="300" fill="${bg}"/>
        ${[100,200,300,400,500].map((x,i)=>`
          <ellipse cx="${x}" cy="${135+i*3}" rx="19" ry="19" fill="${accent}" opacity="0.3"/>
          <rect x="${x-13}" y="${154+i*3}" width="26" height="58" rx="3" fill="${accent}" opacity="0.2"/>
          <path d="M${x+13} ${160+i*3} Q${x+52} ${145+i*3} ${x+47} ${174+i*3}"
                stroke="${accent}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.18"/>
          <circle cx="${x+47}" cy="${174+i*3}" r="13" stroke="${accent}" stroke-width="1.5"
                  fill="none" opacity="0.5"/>
        `).join('')}
        <text x="300" y="268" text-anchor="middle" font-family="Cormorant Garamond" font-size="16"
              fill="${accent}" opacity="0.28" letter-spacing="10">BRASS</text>
      </svg>`,

      // 6 — Drummer (indigo)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        <ellipse cx="120" cy="205" rx="55" ry="22" stroke="${accent}" stroke-width="2.5"
                 fill="${accent}" fill-opacity="0.06" opacity="0.65"/>
        <ellipse cx="202" cy="190" rx="40" ry="16" stroke="${accent}" stroke-width="2"
                 fill="${accent}" fill-opacity="0.05" opacity="0.55"/>
        <ellipse cx="78" cy="168" rx="30" ry="12" stroke="${accent}" stroke-width="1.5"
                 fill="none" opacity="0.4"/>
        <ellipse cx="150" cy="132" rx="18" ry="18" fill="${accent}" opacity="0.35"/>
        <rect x="138" y="150" width="24" height="52" rx="3" fill="${accent}" opacity="0.25"/>
        <line x1="138" y1="160" x2="88" y2="147" stroke="${accent}" stroke-width="5"
              stroke-linecap="round" opacity="0.3"/>
        <line x1="162" y1="160" x2="202" y2="144" stroke="${accent}" stroke-width="5"
              stroke-linecap="round" opacity="0.3"/>
        <text x="150" y="272" text-anchor="middle" font-family="Cormorant Garamond" font-size="11"
              fill="${accent}" opacity="0.38" letter-spacing="5">PERCUSSION</text>
      </svg>`,

      // 7 — Celebration (amber)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        ${Array.from({length:18},(_,i)=>`
          <circle cx="${Math.cos(i*20*Math.PI/180)*95+150}" cy="${Math.sin(i*20*Math.PI/180)*95+150}"
                  r="${2+Math.random()*4}" fill="${accent}" opacity="${0.15+Math.random()*0.5}"/>
        `).join('')}
        <text x="150" y="162" text-anchor="middle" font-family="Cormorant Garamond"
              font-size="58" fill="${accent}" opacity="0.12">★</text>
        <text x="150" y="240" text-anchor="middle" font-family="Cormorant Garamond"
              font-size="15" fill="${accent}" opacity="0.32" letter-spacing="4" font-style="italic">Encore!</text>
      </svg>`,

      // 8 — Chamber hall (rose)
      `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="300" height="300" fill="${bg}"/>
        <rect x="22" y="32" width="256" height="184" rx="5" stroke="${accent}" stroke-width="0.6"
              fill="${accent}" fill-opacity="0.03" opacity="0.22"/>
        <rect x="42" y="52" width="216" height="144" rx="3" stroke="${accent}" stroke-width="0.5"
              fill="none" opacity="0.16"/>
        ${[82,150,218].map((x,i)=>`
          <ellipse cx="${x}" cy="${172-i*2}" rx="11" ry="11" fill="${accent}" opacity="0.3"/>
          <rect x="${x-8}" y="${183-i*2}" width="16" height="32" rx="2" fill="${accent}" opacity="0.22"/>
        `).join('')}
        <text x="150" y="258" text-anchor="middle" font-family="Cormorant Garamond" font-size="12"
              fill="${accent}" opacity="0.32" letter-spacing="4">CITY ARTS HALL</text>
      </svg>`,
    ];
    return illustrations[idx % illustrations.length];
  }

  grid.innerHTML = GALLERY_ITEMS.map((item, i) => `
    <div class="gallery-item${item.wide?' wide':''}${item.tall?' tall':''}"
         data-index="${i}" data-label="${item.label}">
      <div class="gallery-item-inner">${gallerySVG(item, i)}</div>
      <div class="gallery-overlay">
        <span class="gallery-caption">${item.label}</span>
      </div>
    </div>`
  ).join('');

  const items = grid.querySelectorAll('.gallery-item');
  const obs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('animated'), parseInt(e.target.dataset.index) * 65);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(it => obs.observe(it));

  // Lightbox
  initLightbox(items);
})();

/* ─── LIGHTBOX ───────────────────────────────────────────────────────── */
function initLightbox(galleryItems) {
  const lb      = $('lightbox');
  const content = $('lightbox-content');
  const caption = $('lightbox-caption');
  const close   = $('lightbox-close');
  const prev    = $('lightbox-prev');
  const next    = $('lightbox-next');
  if (!lb) return;

  const items = Array.from(galleryItems);
  let current = 0;

  function open(idx) {
    current = idx;
    const svg = items[idx].querySelector('svg');
    content.innerHTML = svg ? svg.outerHTML : '';
    caption.textContent = items[idx].dataset.label;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() { lb.classList.remove('open'); document.body.style.overflow = ''; }

  items.forEach((it, i) => it.addEventListener('click', () => open(i)));
  close.addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
  prev.addEventListener('click', () => open((current - 1 + items.length) % items.length));
  next.addEventListener('click', () => open((current + 1) % items.length));

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLB();
    if (e.key === 'ArrowLeft')   open((current - 1 + items.length) % items.length);
    if (e.key === 'ArrowRight')  open((current + 1) % items.length);
  });
}

/* ─── CONTACT FORM ───────────────────────────────────────────────────── */
(function initContactForm() {
  const form    = $('contact-form');
  const success = $('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderBottomColor = '#b54040';
        setTimeout(() => input.style.borderBottomColor = '', 2200);
      }
    });
    if (!valid) return;

    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Sending…';
    setTimeout(() => {
      form.querySelectorAll('.form-group').forEach(g => g.style.display = 'none');
      btn.style.display = 'none';
      success.classList.add('show');
    }, 1300);
  });

  form.querySelectorAll('.form-group').forEach(g => {
    const input = g.querySelector('input, textarea');
    const label = g.querySelector('label');
    if (!input || !label) return;
    input.addEventListener('focus', () => label.style.color = 'var(--gold)');
    input.addEventListener('blur',  () => label.style.color = '');
  });
})();

/* ─── SMOOTH SCROLL ──────────────────────────────────────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const el = document.getElementById(a.getAttribute('href').slice(1));
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
  });
});

/* ─── CARD TILT ──────────────────────────────────────────────────────── */
(function initTilt() {
  $$('.stat-card, .perf-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
})();

/* ─── CONSOLE EASTER EGG ─────────────────────────────────────────────── */
console.log('%c♪ Resonance ', 'font-size:2rem;font-family:serif;color:#B8922A;background:#FAF7F2;padding:10px 20px;border:1px solid #B8922A;');
console.log('%cWestbrook Academy School Band — Est. 2001', 'color:#8C7E72;font-family:sans-serif;');
console.log('%cTip: Press ← → arrow keys inside a member profile to navigate between members!', 'color:#B8922A;font-family:sans-serif;font-size:0.85em;');
