/**
 * ARCHITECT ACADEMY GAMIFICATION ENGINE
 * Shared across Lecture 1, 2, 3, 4, 5
 * Computer Architecture and Organization (CAO) - DIU CSE
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS ENGINE ---
  class RetroSoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('cao_sound_fx') !== 'false';
    }

    initCtx() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type, duration, gain = 0.1, delay = 0) {
      if (!this.enabled) return;
      this.initCtx();
      if (!this.ctx) return;

      setTimeout(() => {
        try {
          const osc = this.ctx.createOscillator();
          const gainNode = this.ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
          gainNode.gain.setValueAtTime(gain, this.ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
          osc.connect(gainNode);
          gainNode.connect(this.ctx.destination);
          osc.start();
          osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
          // Audio error ignored
        }
      }, delay);
    }

    coin() {
      this.playTone(987.77, 'sine', 0.08, 0.12, 0); // B5
      this.playTone(1318.51, 'sine', 0.28, 0.15, 60); // E6
    }

    clickPop() {
      this.playTone(400, 'sine', 0.04, 0.08, 0);
    }

    levelUp() {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'triangle', 0.18, 0.15, idx * 80);
      });
    }

    fanfare() {
      const melody = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 120 },
        { f: 783.99, d: 0.2, t: 240 },
        { f: 1046.50, d: 0.45, t: 400 }
      ];
      melody.forEach(m => this.playTone(m.f, 'triangle', m.d, 0.2, m.t));
    }

    buzzer() {
      this.playTone(180, 'sawtooth', 0.25, 0.15, 0);
    }
  }

  const retroAudio = new RetroSoundEngine();

  // --- BADGE CATALOG ---
  const BADGES = {
    l1_abacus: {
      name: 'Abacus Sorcerer',
      nameBn: 'অ্যাবাকাস জাদুকর',
      icon: '🧮',
      desc: 'Mastered the 2700 B.C. Soroban Abacus interactive simulator.',
      descBn: '২৭০০ খ্রিস্টপূর্বাব্দের সোরোবান অ্যাবাকাস সফলভাবে অপারেট করেছো।'
    },
    l1_duel: {
      name: 'Human vs CPU Victor',
      nameBn: 'মানুষ বনাম সিপিইউ বিজয়ী',
      icon: '⚔️',
      desc: 'Defeated the 1940s relay computer in the Mental Math duel.',
      descBn: 'মানসিক গণিত ডুয়েলে রিলে কম্পিউটারকে হারিয়ে দিয়েছো!'
    },
    l2_ias: {
      name: 'IAS Codebreaker',
      nameBn: 'আইএএস কোডব্রেকার',
      icon: '📜',
      desc: 'Decoded Princeton IAS 40-bit Stored-Program instruction words.',
      descBn: 'প্রিন্সটন আইএএস ৪০-বিট ইন্সট্রাকশন সফলভাবে ডিকোড করেছো।'
    },
    l2_generations: {
      name: 'Time Traveler',
      nameBn: 'টাইম ট্রাভেলার',
      icon: '⏳',
      desc: 'Journeyed through all 5 generations from vacuum tubes to ULSI.',
      descBn: 'ভ্যাকুয়াম টিউব থেকে শুরু করে আল্ট্রা লার্জ স্কেল চিপ পর্যন্ত এক্সপ্লোর করেছো।'
    },
    l3_adder: {
      name: 'Logic Alchemist',
      nameBn: 'লজিক অ্যালকেমিস্ট',
      icon: '⚡',
      desc: 'Wired up Full Adder truth table and universal logic gates.',
      descBn: 'ফুল অ্যাডার ট্রুথ টেবিল ও সার্বজনীন গেট সার্কিট টেস্ট করেছো।'
    },
    l3_cache: {
      name: 'Cache Speed Demon',
      nameBn: 'ক্যাশ স্পিড ডেমন',
      icon: '🏎️',
      desc: 'Clocked a 1ns Cache Hit vs 100ns DRAM Miss in the memory highway.',
      descBn: '১ ন্যানোসেকেন্ড ক্যাশ হিট বনাম ১০০ ন্যানোসেকেন্ড মেমরি মিস এক্সপেরিয়েন্স করেছো।'
    },
    l4_ninja: {
      name: 'Binary Ninja',
      nameBn: 'বাইনারি নিনজা',
      icon: '🥷',
      desc: 'Scored in the 30-Second 8-bit Binary Speed Run challenge.',
      descBn: '৩০ সেকেন্ডের বাইনারি নিনজা স্পিড রান চ্যালেঞ্জে স্কোর করেছো!'
    },
    l4_twos: {
      name: 'Complement Master',
      nameBn: 'কমপ্লিমেন্ট মাস্টার',
      icon: '🔄',
      desc: 'Computed negative numbers via 2s complement invert-and-add-1.',
      descBn: '২-এর পরিপূরক পদ্ধতিতে সাইনড বাইনারি সংখ্যার রূপান্তর শিখেছো।'
    },
    l5_endian: {
      name: 'Endian Navigator',
      nameBn: 'এন্ডিয়ান নেভিগেটর',
      icon: '🧭',
      desc: 'Solved Big-Endian vs Little-Endian byte addressing in RAM.',
      descBn: 'বিগ-এন্ডিয়ান ও লিটল-এন্ডিয়ান বাইট অ্যাড্রেসিং নির্ভুলভাবে ম্যাপ করেছো।'
    },
    l5_pipeline: {
      name: 'Pipeline Commander',
      nameBn: 'পাইপলাইন কমান্ডার',
      icon: '🚀',
      desc: 'Achieved 2x speedup by overlapping Fetch and Execute stages.',
      descBn: 'ফেচ ও এক্সিকিউট ওভারল্যাপ করে সিপিইউর দ্বিগুণ গতি অর্জন করেছো।'
    },
    quiz_scholar: {
      name: 'Academy Grand Scholar',
      nameBn: 'গ্র্যান্ড স্কলার',
      icon: '👑',
      desc: 'Scored a perfect 5/5 in a lecture assessment exam.',
      descBn: 'লেকচার পরীক্ষায় ৫/৫ স্কোর করে আর্কিটেক্ট পদের মর্যাদা পেয়েছো!'
    }
  };

  // --- RANKS ---
  const RANKS = [
    { minXp: 0, title: 'Silicon Rookie', titleBn: 'সিলিকন শিক্ষানবিস', level: 1 },
    { minXp: 200, title: 'Gate Tinker', titleBn: 'গেট টিংকারার', level: 2 },
    { minXp: 500, title: 'Pipeline Cadet', titleBn: 'পাইপলাইন ক্যাডেট', level: 3 },
    { minXp: 900, title: 'Cache Master', titleBn: 'ক্যাশ মাস্টার', level: 4 },
    { minXp: 1400, title: 'Computer Architect', titleBn: 'কম্পিউটার আর্কিটেক্ট', level: 5 }
  ];

  // --- PROFILE CLASS ---
  class AcademyProfile {
    constructor() {
      this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem('cao_gamer_profile');
        if (raw) {
          const parsed = JSON.parse(raw);
          this.xp = parsed.xp || 50;
          this.badges = parsed.badges || [];
          this.streak = parsed.streak || 1;
          this.lastVisit = parsed.lastVisit || Date.now();
        } else {
          this.xp = 50;
          this.badges = [];
          this.streak = 1;
          this.lastVisit = Date.now();
          this.save();
        }
      } catch (e) {
        this.xp = 50;
        this.badges = [];
        this.streak = 1;
        this.lastVisit = Date.now();
      }
      this.updateStreak();
    }

    save() {
      localStorage.setItem('cao_gamer_profile', JSON.stringify({
        xp: this.xp,
        badges: this.badges,
        streak: this.streak,
        lastVisit: this.lastVisit
      }));
    }

    updateStreak() {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - this.lastVisit > oneDay && now - this.lastVisit < oneDay * 2) {
        this.streak += 1;
      }
      this.lastVisit = now;
      this.save();
    }

    getRank() {
      let current = RANKS[0];
      for (let r of RANKS) {
        if (this.xp >= r.minXp) {
          current = r;
        } else {
          break;
        }
      }
      return current;
    }

    getNextRank() {
      const rank = this.getRank();
      const idx = RANKS.findIndex(r => r.level === rank.level);
      return idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
    }
  }

  const profile = new AcademyProfile();

  // --- CONFETTI PARTICLE SYSTEM ---
  class ConfettiEngine {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animId = null;
    }

    init() {
      this.canvas = document.getElementById('confettiCanvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'confettiCanvas';
        document.body.appendChild(this.canvas);
      }
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    }

    burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 80) {
      this.init();
      const colors = ['#38bdf8', '#818cf8', '#f59e0b', '#10b981', '#ec4899', '#f43f5e'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 7 + 4,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 15,
          alpha: 1,
          decay: Math.random() * 0.015 + 0.01
        });
      }
      if (!this.animId) {
        this.animate();
      }
    }

    animate() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.vx *= 0.98; // friction
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(() => this.animate());
      } else {
        this.animId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new ConfettiEngine();

  // --- UI CONTROLLER ---
  function buildGamerUI() {
    // 1. Reading Progress Bar
    if (!document.getElementById('readingProgressBar')) {
      const pBar = document.createElement('div');
      pBar.id = 'readingProgressBar';
      document.body.prepend(pBar);

      window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / (height || 1)) * 100;
        pBar.style.width = scrolled + '%';
      }, { passive: true });
    }

    // 2. Toast Container
    if (!document.getElementById('gameToastContainer')) {
      const tc = document.createElement('div');
      tc.id = 'gameToastContainer';
      tc.className = 'game-toast-container';
      document.body.appendChild(tc);
    }

    // 3. Gamer HUD Floating Element
    if (!document.getElementById('gamerHud')) {
      const hud = document.createElement('div');
      hud.id = 'gamerHud';
      hud.className = 'gamer-hud';
      hud.innerHTML = `
        <div class="hud-avatar" id="hudAvatarBtn" title="Architect Academy Passport">
          <span>🧠</span>
          <span class="hud-level-badge" id="hudLevelBadge">L1</span>
        </div>
        <div class="hud-info" id="hudInfoClick">
          <div class="hud-title-row">
            <span class="hud-rank" id="hudRankTitle">Silicon Rookie</span>
            <span class="hud-streak" id="hudStreak">🔥 <span id="hudStreakDays">1</span></span>
          </div>
          <div class="hud-xp-row">
            <div class="hud-xp-bar-bg">
              <div class="hud-xp-bar-fill" id="hudXpFill" style="width: 25%;"></div>
            </div>
            <span class="hud-xp-text" id="hudXpText">50 XP</span>
          </div>
        </div>
        <button class="hud-passport-btn" id="hudPassportBtn">
          <span>🏆</span>
          <span class="hud-btn-text">Passport</span>
        </button>
      `;
      document.body.appendChild(hud);

      document.getElementById('hudAvatarBtn').addEventListener('click', openPassport);
      document.getElementById('hudInfoClick').addEventListener('click', openPassport);
      document.getElementById('hudPassportBtn').addEventListener('click', openPassport);
    }

    // 4. Academy Passport Modal
    if (!document.getElementById('passportModal')) {
      const modal = document.createElement('div');
      modal.id = 'passportModal';
      modal.className = 'passport-overlay';
      modal.innerHTML = `
        <div class="passport-card">
          <button class="passport-close-btn" id="passportCloseBtn">&times;</button>
          <div class="passport-header">
            <div class="passport-avatar-lg" id="passportAvatar">🧠</div>
            <div class="passport-title-col">
              <h3 id="passportPlayerName">Computer Architect</h3>
              <div class="passport-rank-badge" id="passportRank">Level 1 • Silicon Rookie</div>
            </div>
          </div>

          <div class="passport-stats-grid">
            <div class="passport-stat-box">
              <div class="val" id="statTotalXp">50</div>
              <div class="lbl">Total XP</div>
            </div>
            <div class="passport-stat-box">
              <div class="val" id="statStreak">1 Day</div>
              <div class="lbl">Active Streak</div>
            </div>
            <div class="passport-stat-box">
              <div class="val" id="statBadgesCount">0 / 11</div>
              <div class="lbl">Badges Earned</div>
            </div>
          </div>

          <div class="passport-section-title">
            <span>🎖️</span> <span>Unlocked Achievements</span>
          </div>
          <div class="badges-grid" id="passportBadgesGrid"></div>

          <div class="passport-actions">
            <span style="font-size: 0.72rem; color: #64748b;">DIU CAO • Interactive Masterclass</span>
            <button class="passport-reset-btn" id="passportResetBtn">Reset Game Progress</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('passportCloseBtn').addEventListener('click', closePassport);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePassport();
      });

      document.getElementById('passportResetBtn').addEventListener('click', () => {
        if (confirm('Reset your Architect Academy XP and Badges? This cannot be undone.')) {
          localStorage.removeItem('cao_gamer_profile');
          profile.load();
          updateHudUI();
          renderBadges();
          showToast('Game progress reset to default.', false);
        }
      });
    }

    updateHudUI();
  }

  function updateHudUI() {
    const isBn = document.documentElement.lang === 'bn';
    const rank = profile.getRank();
    const nextRank = profile.getNextRank();

    const hudLevel = document.getElementById('hudLevelBadge');
    if (hudLevel) hudLevel.textContent = 'L' + rank.level;

    const hudRank = document.getElementById('hudRankTitle');
    if (hudRank) hudRank.textContent = isBn ? rank.titleBn : rank.title;

    const hudStreak = document.getElementById('hudStreakDays');
    if (hudStreak) hudStreak.textContent = profile.streak;

    const hudXp = document.getElementById('hudXpText');
    if (hudXp) hudXp.textContent = profile.xp + ' XP';

    const hudFill = document.getElementById('hudXpFill');
    if (hudFill) {
      if (!nextRank) {
        hudFill.style.width = '100%';
      } else {
        const range = nextRank.minXp - rank.minXp;
        const curr = profile.xp - rank.minXp;
        const pct = Math.min(100, Math.max(10, Math.round((curr / range) * 100)));
        hudFill.style.width = pct + '%';
      }
    }

    // Modal stats
    const statTotalXp = document.getElementById('statTotalXp');
    if (statTotalXp) statTotalXp.textContent = profile.xp;

    const statStreak = document.getElementById('statStreak');
    if (statStreak) statStreak.textContent = profile.streak + (isBn ? ' দিন' : ' Days');

    const statBadges = document.getElementById('statBadgesCount');
    if (statBadges) statBadges.textContent = profile.badges.length + ' / ' + Object.keys(BADGES).length;

    const passportRank = document.getElementById('passportRank');
    if (passportRank) passportRank.textContent = `Level ${rank.level} • ${isBn ? rank.titleBn : rank.title}`;
  }

  function renderBadges() {
    const grid = document.getElementById('passportBadgesGrid');
    if (!grid) return;
    const isBn = document.documentElement.lang === 'bn';

    grid.innerHTML = '';
    for (let [id, b] of Object.entries(BADGES)) {
      const isUnlocked = profile.badges.includes(id);
      const item = document.createElement('div');
      item.className = 'badge-item ' + (isUnlocked ? 'unlocked' : 'locked');
      item.innerHTML = `
        <div class="badge-icon">${b.icon}</div>
        <div class="badge-name">${isBn ? b.nameBn : b.name}</div>
        <div class="badge-desc">${isBn ? b.descBn : b.desc}</div>
      `;
      grid.appendChild(item);
    }
  }

  function openPassport() {
    updateHudUI();
    renderBadges();
    retroAudio.clickPop();
    const modal = document.getElementById('passportModal');
    if (modal) modal.classList.add('active');
  }

  function closePassport() {
    const modal = document.getElementById('passportModal');
    if (modal) modal.classList.remove('active');
  }

  function showToast(message, isAchievement = false) {
    const container = document.getElementById('gameToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'game-toast ' + (isAchievement ? 'achievement' : '');
    toast.innerHTML = `<span>${isAchievement ? '🏆' : '✨'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 4200);
  }

  function spawnFloatingXP(x, y, amount) {
    const el = document.createElement('div');
    el.className = 'floating-xp';
    el.textContent = `+${amount} XP`;
    el.style.left = (x || (window.innerWidth / 2) - 30) + 'px';
    el.style.top = (y || (window.innerHeight / 2) - 50) + 'px';
    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1200);
  }

  // --- PUBLIC API EXPOSED TO GLOBAL WINDOW ---
  window.caoGame = {
    audio: retroAudio,

    addXP: function (amount, reason = '', event = null) {
      const prevRank = profile.getRank();
      profile.xp += amount;
      profile.save();

      retroAudio.coin();

      let x = event && event.clientX ? event.clientX : window.innerWidth - 120;
      let y = event && event.clientY ? event.clientY : window.innerHeight - 80;
      spawnFloatingXP(x, y, amount);

      const isBn = document.documentElement.lang === 'bn';
      if (reason) {
        showToast(`+${amount} XP: ${reason}`, false);
      }

      updateHudUI();

      // Check level up
      const newRank = profile.getRank();
      if (newRank.level > prevRank.level) {
        retroAudio.levelUp();
        confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 90);
        showToast(
          isBn 
            ? `লেভেল আপ! অভিনন্দন, তুমি এখন ${newRank.titleBn} (Level ${newRank.level})!` 
            : `LEVEL UP! You are now a ${newRank.title} (Level ${newRank.level})!`,
          true
        );
      }
    },

    unlockBadge: function (badgeId) {
      if (!BADGES[badgeId]) return;
      if (profile.badges.includes(badgeId)) return; // already unlocked

      profile.badges.push(badgeId);
      profile.save();

      retroAudio.fanfare();
      confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 100);

      const b = BADGES[badgeId];
      const isBn = document.documentElement.lang === 'bn';
      const badgeTitle = isBn ? b.nameBn : b.name;

      showToast(
        isBn ? `অর্জন আনলক: ${b.icon} ${badgeTitle}!` : `Achievement Unlocked: ${b.icon} ${badgeTitle}!`,
        true
      );

      this.addXP(100, isBn ? `${badgeTitle} ব্যাজ অর্জন` : `${badgeTitle} Badge`);
      updateHudUI();
    },

    shootConfetti: function (x, y) {
      retroAudio.fanfare();
      confetti.burst(x || window.innerWidth / 2, y || window.innerHeight / 2, 80);
    },

    playClick: function () {
      retroAudio.clickPop();
    },

    openPassport: openPassport,
    closePassport: closePassport
  };

  // --- SCROLL REVEAL OBSERVER (Smooth Page Entrance) ---
  function initScrollReveals() {
    if (!('IntersectionObserver' in window)) return;
    const selector = '.math-card, .diagram-blueprint-card, .fun-fact-card, .exam-cheat-sheet, ' +
                     '.concept-card, .quiz-container-card, .stat-card, .mode-card, .level-card, ' +
                     '.timeline-step, .arch-card, .table-container-card';
    const targets = document.querySelectorAll(selector);

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      const stagger = (index % 4) + 1;
      el.classList.add(`stagger-${stagger}`);
      observer.observe(el);
    });
  }

  // --- CLICK RADIAL RIPPLE INTERACTION ---
  function initClickRipples() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.action-btn, .hud-passport-btn, .quiz-option-btn, .mini-btn, .toggle-btn');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('cao-click-ripple');

      const existing = btn.querySelector('.cao-click-ripple');
      if (existing) existing.remove();

      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  }

  // --- FLUID RESPONSIVE NAVIGATION ENGINE ---
  function initResponsiveNavigation() {
    const navToggleBtn = document.getElementById('navToggleBtn');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
    const lectureDropdown = document.getElementById('lectureDropdown');
    const lectureDropdownBtn = document.getElementById('lectureDropdownBtn');

    // 1. Mobile Menu Drawer Toggle
    if (navToggleBtn && navLinks) {
      navToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('active');
        navToggleBtn.classList.toggle('active', isOpen);
        navToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (retroAudio) retroAudio.clickPop();
      });

      // Close mobile menu when clicking any nav link
      navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          navToggleBtn.classList.remove('active');
          navToggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // 2. Lecture Switcher Dropdown
    if (lectureDropdown && lectureDropdownBtn) {
      lectureDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = lectureDropdown.classList.toggle('open');
        lectureDropdownBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (retroAudio) retroAudio.clickPop();
      });
    }

    // Global Click-Outside & Escape Listener
    document.addEventListener('click', (e) => {
      // Close dropdown if clicked outside
      if (lectureDropdown && !lectureDropdown.contains(e.target)) {
        lectureDropdown.classList.remove('open');
        if (lectureDropdownBtn) lectureDropdownBtn.setAttribute('aria-expanded', 'false');
      }
      // Close mobile menu if clicked outside
      if (navLinks && navToggleBtn && !navLinks.contains(e.target) && !navToggleBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (lectureDropdown) {
          lectureDropdown.classList.remove('open');
          if (lectureDropdownBtn) lectureDropdownBtn.setAttribute('aria-expanded', 'false');
        }
        if (navLinks && navToggleBtn) {
          navLinks.classList.remove('active');
          navToggleBtn.classList.remove('active');
          navToggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1150 && navLinks && navToggleBtn) {
        navLinks.classList.remove('active');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // 3. ScrollSpy: Highlight current active section in navbar
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    if (navAnchors.length > 0) {
      const sectionTargets = [];
      navAnchors.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) sectionTargets.push({ anchor: a, section });
      });

      let ticking = false;
      function updateActiveNav() {
        const scrollPos = window.scrollY + 120; // Offset for sticky navbar
        let current = null;

        for (let i = 0; i < sectionTargets.length; i++) {
          const { anchor, section } = sectionTargets[i];
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = anchor;
            break;
          }
        }

        // If at the very bottom of the page, activate the last link
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
          if (sectionTargets.length > 0) {
            current = sectionTargets[sectionTargets.length - 1].anchor;
          }
        }

        navAnchors.forEach(a => a.classList.toggle('active', a === current));
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateActiveNav);
          ticking = true;
        }
      }, { passive: true });

      // Initial call
      updateActiveNav();
    }
  }

  // Auto-init on DOM loaded
  function initAll() {
    buildGamerUI();
    initScrollReveals();
    initClickRipples();
    initResponsiveNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Hook into language change events
  window.addEventListener('caoLanguageChanged', () => {
    updateHudUI();
    renderBadges();
  });
})();

