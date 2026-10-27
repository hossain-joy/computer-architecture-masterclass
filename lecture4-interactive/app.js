/* ==========================================================================
   Computer Architecture & Organization - Lecture 4: Data Representation
   Interactive Engine & Bilingual System (English & বাংলা)
   ========================================================================== */

// --- 1. Sound FX Engine (Web Audio API) ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    this.playTone(600, 'triangle', 0.04, 0.08);
  }

  calcTick() {
    this.playTone(520, 'sine', 0.05, 0.1);
  }

  correctChime() {
    this.playTone(587.33, 'triangle', 0.15, 0.12);
    setTimeout(() => this.playTone(880, 'triangle', 0.3, 0.15), 100);
  }

  wrongBuzz() {
    this.playTone(180, 'sawtooth', 0.2, 0.15);
  }
}

const sounds = new SoundEngine();

// Sound toggle button
const soundToggleBtn = document.getElementById('soundToggleBtn');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    soundToggleBtn.querySelector('.icon').textContent = sounds.enabled ? '🔊' : '🔇';
    soundToggleBtn.style.opacity = sounds.enabled ? '1' : '0.6';
  });
}

// --- 2. Bilingual Translations Dictionary ---
const translations = {
  bn: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_converter: "Base Converter",
    nav_twos: "2's Complement",
    nav_ascii: "ASCII & Text",
    nav_adders: "Decomposed Adder",
    nav_universal: "Universal Gates",
    nav_quiz: "Exam Quiz",
    nav_take_test: "টেস্ট দাও",
    hero_badge: "লেকচার ৪ এর সম্পূর্ণ ইন্টারেক্টিভ গাইড",
    hero_title: 'কম্পিউটারে ডেটা উপস্থাপন (Data Representation)<br><span class="gradient-text">সংখ্যা রূপান্তর, ২\'স কমপ্লিমেন্ট, আসকি ও ফুল অ্যাডার</span>',
    hero_subtitle: "দশমিক, বাইনারি, অক্টাল ও হেক্সাডেসিমেলের রূপান্তর থেকে শুরু করে ঋণাত্মক সংখ্যার ২'স কমপ্লিমেন্ট, আসকি কোড এবং ২টি হাফ অ্যাডার দিয়ে ফুল অ্যাডার তৈরির সম্পূর্ণ সমাধান দেখে নাও লাইভ সিমুলেটরে!",
    stat_binary: "বাইনারি সংখ্যা পদ্ধতি",
    stat_twos: "ঋণাত্মক সংখ্যার ৩ ধাপ",
    stat_ascii: "অক্ষর ও ক্যারেক্টার কোডিং",
    stat_adder: "ডিকম্পোজড ফুল অ্যাডার",
    sec1_tag: "মডিউল ১ • স্লাইড ৫ থেকে ১০",
    sec1_title: "নাম্বার সিস্টেম কনভার্টার ল্যাব (Base Conversion Lab)",
    sec1_desc: "যে কোনো সংখ্যা টাইপ করো অথবা স্লাইডের উদাহরণগুলো (যেমন: 13, 125, 150) এক ক্লিকে লোড করে স্টেপ-বাই-স্টেপ ভাগ ও রূপান্তর দেখো!",
    conv_label: "দশমিক সংখ্যা (Decimal):",
    conv_steps_title: "🔍 স্লাইড ৮ অনুযায়ী রূপান্তরের ভাগ প্রক্রিয়া:",
    sec2_tag: "মডিউল ২ • স্লাইড ১৯ ও ২০",
    sec2_title: "ঋণাত্মক সংখ্যা ও ২'স কমপ্লিমেন্ট (2's Complement)",
    sec2_desc: "কম্পিউটার কোনো বিয়োগের সার্কিট ছাড়াই ২'স কমপ্লিমেন্টের সাহায্যে যোগের মাধ্যমেই বিয়োগ করে ফেলে!",
    sm_desc: "সবচেয়ে বামের বিট (MSB) হলো চিহ্নের বিট (০ হলে ধনাত্মক, ১ হলে ঋণাত্মক) এবং বাকি বিটগুলো সংখ্যার পরম মান।",
    ones_desc: "ধনাত্মক বাইনারি সংখ্যার প্রতিটি ০-কে ১ এবং প্রতিটি ১-কে ০-এ উল্টে দিলে ১'স কমপ্লিমেন্ট পাওয়া যায়।",
    twos_desc: "১'স কমপ্লিমেন্টের সাথে ১ যোগ করলেই ২'স কমপ্লিমেন্ট তৈরি হয়। আধুনিক সব কম্পিউটার এটিই ব্যবহার করে।",
    twos_badge: "স্লাইড ৫ ও ২০ এর ৩-ধাপের নিয়ম",
    twos_title: "⚡ ঋণাত্মক সংখ্যার ২'স কমপ্লিমেন্ট লাইভ ক্যালকুলেটর",
    twos_desc_head: "যে কোনো ঋণাত্মক দশমিক সংখ্যা নির্বাচন করো (যেমন: -1, -4, -9):",
    twos_s1_title: "ধাপ ১: সমতুল্য ধনাত্মক বাইনারি মান নির্ণয়",
    twos_s2_title: "ধাপ ২: বিটগুলো উল্টে ১'স কমপ্লিমেন্ট করা (Invert all bits)",
    twos_s3_title: "ধাপ ৩: ১ যোগ করে ২'স কমপ্লিমেন্ট লাভ (+1)",
    sec3_tag: "মডিউল ৩ • স্লাইড ১১ ও ২১",
    sec3_title: "ASCII কোডিং ও ক্যারেক্টার এক্সপ্লোরার (Character Encoding)",
    sec3_desc: "কম্পিউটার কীভাবে কিবোর্ডের অক্ষরকে বাইনারিতে চেনে এবং পরীক্ষার বহুল জিজ্ঞাসিত প্রশ্নগুলোর সমাধান।",
    ascii_badge: "লাইভ ASCII ডিকোডার",
    ascii_title: "🔤 ক্যারেক্টার টু বাইনারি লাইভ লুকআপ",
    ascii_desc: "একটি অক্ষর লিখুন অথবা নিচের বাটনে ক্লিক করে এর ডেসিমেল ও ৭-বিট/৮-বিট কোড দেখুন:",
    sec4_tag: "মডিউল ৪ • স্লাইড ১২ থেকে ১৮",
    sec4_title: "ডিকম্পোজড ফুল অ্যাডার ও রিপল ক্যারি (Decomposed Full Adder)",
    sec4_desc: "কীভাবে ২টি হাফ অ্যাডার এবং ১টি অর গেট (2 HA + 1 OR) জুড়ে একটি পূর্ণাঙ্গ ফুল অ্যাডার গঠিত হয়!",
    decomp_badge: "স্লাইড ১৭ এর সুপারহিট ডায়াগ্রাম",
    decomp_title: "🧱 ২টি হাফ অ্যাডার দিয়ে ফুল অ্যাডার তৈরি (2 HA + 1 OR Gate)",
    decomp_desc: "Xi, Yi এবং Ci ইনপুট পরিবর্তন করে দেখো কীভাবে প্রথম হাফ অ্যাডার আংশিক যোগ করে এবং দ্বিতীয় হাফ অ্যাডার ও OR গেট চূড়ান্ত Sum (Si) ও Carry (Ci+1) তৈরি করে!",
    ripple_delay_title: "রিপল ক্যারি অ্যাডার ও সময়ের বিলম্ব (Slide 18):",
    ripple_delay_body: "একটি n-বিট রিপল ক্যারি অ্যাডারে প্রথম বিটের ক্যারি পরবর্তী বিটে গড়াতে গড়াতে যায় (Ripples through stages)। তাই ফাইনাল ক্যারি পেতে (n - 1) × Δt এবং সম্পূর্ণ যোগফল পেতে n × Δt সময় বিলম্ব ঘটে।",
    sec5_tag: "মডিউল ৫ • স্লাইড ২২ ও ২৩",
    sec5_title: "ইউনিভার্সাল গেট ও লজিক বাস্তবায়ন (Universal Gates)",
    sec5_desc: "কেন NAND এবং NOR-কে ইউনিভার্সাল গেট বলা হয়? যে কোনো ডিজিটাল সার্কিট শুধুমাত্র NAND গেট দিয়ে কীভাবে বানানো যায় তা দেখে নাও।",
    func_complete_desc: "যে গেটগুলোর সাহায্যে পৃথিবীর যেকোনো বুলিয়ান ফাংশন প্রকাশ করা যায়, তাদের Functionally Complete Set বলে:",
    univ_gate_desc: "NAND এবং NOR একাই যথেষ্ট! শুধুমাত্র NAND গেট জুড়েই NOT, AND এবং OR গেট তৈরি করা যায়:",
    sec6_tag: "পরীক্ষা প্রস্তুতি • কুইজ জোন",
    sec6_title: "লেকচার ৪ এর স্ব-মূল্যায়ন টেস্ট (Lecture 4 Self Quiz)",
    sec6_desc: "লেকচার ৪ এর বাইনারি রূপান্তর, ২'স কমপ্লিমেন্ট, আসকি কোড এবং ফুল অ্যাডার সম্পর্কে নিজের জ্ঞান যাচাই করে নাও!",
    quiz_score_prefix: "স্কোর:",
    btn_next_q: "পরবর্তী প্রশ্ন ➡️",
    cheat_title: "লেকচার ৪ এর ১০ মিনিটের কুইক রিভিশন সারাংশ (Exam Night Sheet)",
    cheat_l4_1: "<strong>2ⁿ Codes:</strong> n-বিট দিয়ে ২ⁿটি ভিন্ন কোড সম্ভব • ৭-বিট দিয়ে ১২৮টি (ASCII), ৮-বিট দিয়ে ২৫৬টি।",
    cheat_l4_2: "<strong>2's Complement:</strong> ঋণাত্মক বাইনারি বের করার নিয়ম = Positive binary ➔ Invert bits (1's comp) ➔ Add 1। উদাহরণ: -9 = 11110111।",
    cheat_l4_3: "<strong>Decomposed Full Adder:</strong> ১টি Full Adder তৈরি করতে ২টি Half Adder এবং ১টি OR গেট (2 HA + 1 OR) লাগে।",
    cheat_l4_4: "<strong>ASCII Calculation:</strong> 'B' = 66 হলে 'G' = 71 (01000111) এবং 'I' = 73 (01001001)।",
    cheat_l4_5: "<strong>অক্টাল থেকে হেক্সাডেসিমেল:</strong> অক্টাল (175)₈ = বাইনারি (001 111 101)₂ = হেক্স (7D)₁₆।",
    cheat_l4_6: "<strong>Universal Gates:</strong> NAND এবং NOR হলো ইউনিভার্সাল গেট কারণ এদের দিয়ে যেকোনো লজিক গেট তৈরি সম্ভব।",
    ninja_badge: "🥷 মিনি-গেম • বাইনারি নিনজা",
    ninja_time_label: "সময়:",
    ninja_score_label: "স্কোর:",
    ninja_title: "বাইনারি নিনজা: ৩০ সেকেন্ড স্পিড রান (Binary Ninja Speed Run)",
    ninja_desc: "লক্ষ্য ডেসিমেল সংখ্যার সাথে মেলাতে নিচের ৮টি বিট সুইচ ($128, 64, 32, 16, 8, 4, 2, 1$) ক্লিক করে ON/OFF করো! সময় শেষ হওয়ার আগে যত বেশি পারো রূপান্তর সম্পন্ন করো! ৩টি সঠিকভাবে মেলালে <strong>Binary Ninja</strong> ব্যাজ আনলক হবে!",
    ninja_target_label: "টার্গেট ডেসিমেল",
    ninja_current_label: "তোমার বাইনারি যোগফল",
    btn_ninja_start: "🥷 স্পিড রান শুরু করো!",
    twos_method_title: "2's Complement (আদর্শ পদ্ধতি)",
    ascii_label: "অক্ষর:",
    ep_badge: "পরীক্ষার প্রশ্ন সমাধান (Slide 11, Question 2)",
    sol_g: "<strong>অক্ষর 'G':</strong><br>'B'-এর পর 'G' হলো ৫ম অক্ষর (C, D, E, F, G ➔ +5)।<br>Decimal = <code>66 + 5 = 71</code><br>Binary = <code>01000111</code>",
    sol_i: "<strong>অক্ষর 'I':</strong><br>'B'-এর পর 'I' হলো ৭ম অক্ষর (H, I ➔ +7)।<br>Decimal = <code>66 + 7 = 73</code><br>Binary = <code>01001001</code>",
    vault_badge: "🎯 এক্সাম মাস্টার ভল্ট • DIU CSE",
    l4_math_title: "পরীক্ষার গাণিতিক সমস্যা ও মডেল সমাধান (Exam Math & Model Answers)",
    l4_math_sub: "২'স কমপ্লিমেন্ট যোগের মাধ্যমে বিয়োগ, ASCII কোড গাণিতিক বিস্তার এবং ডিকম্পোজড ফুল অ্যাডার:",
    l4_p1_tag: "ম্যাথ প্রবলেম ১ • ব্লুমস লেভেল ৩ (Apply)",
    l4_p1_title: "২'স কমপ্লিমেন্ট যোগের মাধ্যমে বিয়োগ ($7 - 4 = +3$)",
    l4_p1_statement: "<strong>প্রশ্ন:</strong> ৮-বিট সাইনড বাইনারি রেজিস্টার ব্যবহার করে ২'স কমপ্লিমেন্ট যোগের মাধ্যমে $7 - 4$ এর মান নির্ণয় করো। কেরি বিটের কী হবে এবং ওভারফ্লো ঘটেছে কি না ব্যাখ্যা করো।",
    l4_p1_s1: "<strong>ধাপ ১:</strong> $+7$ এর ৮-বিট বাইনারি = <code>00000111</code>",
    l4_p1_s2: "<strong>ধাপ ২:</strong> $+4$ এর ৮-বিট বাইনারি = <code>00000100</code>",
    l4_p1_s3: "<strong>ধাপ ৩:</strong> $-4$ নির্ণয় (২'স কমপ্লিমেন্ট):",
    l4_p1_s4: "↳ ১'স কমপ্লিমেন্ট (বিট উল্টে): <code>11111011</code>",
    l4_p1_s5: "↳ ১ যোগ করে: <code>11111011 + 1 = 11111100</code> ($-4_{10}$)",
    l4_p1_s6: "<strong>ধাপ ৪:</strong> যোগফল নির্ণয় ($+7 + (-4)$):",
    l4_p1_s7: "<strong>ধাপ ৫: এন্ড-অ্যারাউন্ড ক্যারি (End-around Carry):</strong> ৯ম বিটের ক্যারি <code>1</code> টিকে ২'স কমপ্লিমেন্ট পদ্ধতিতে <strong>বাতিল (Discarded)</strong> করা হয়।",
    l4_p1_res: "✅ <strong>ফলাফল:</strong> অবশিষ্ট ৮-বিট = <code>00000011</code> ($+3_{10}$)। বিপরীত সাইনের সংখ্যা যোগ করায় ওভারফ্লো ঘটার সম্ভাবনা নেই (No Overflow)।",
    l4_p2_tag: "ম্যাথ প্রবলেম ২ • ব্লুমস লেভেল ৩ (Apply)",
    l4_p2_title: "ASCII কোডের ভিত্তিতে অফসেট ও ক্যারেক্টার বিট ম্যাথমেটিক্স",
    l4_p2_statement: "<strong>প্রশ্ন:</strong> পরীক্ষায় দেওয়া আছে ASCII টেবিলে অক্ষর <code>'B'</code> এর মান ডেসিমেল <code>66</code> ($01000010_2$)। কোনো টেবিল না দেখে অফসেট হিসাব করে <code>'G'</code> এবং <code>'I'</code>-এর ৭-বিট বাইনারি ও হেক্সাডেসিমেল কোড বের করো। ছোট হাতের <code>'b'</code>-এর মান কত এবং বড় ও ছোট হাতের অক্ষরের বিট রিলেশনশিপ কী?",
    l4_p2_s1: "<strong>(ক) 'G' এর কোড নির্ণয়:</strong> ↳ বর্ণমালার দূরত্ব: $'G' - 'B' = 7 - 2 = 5$ ধাপ ➔ ডেসিমেল = $66 + 5 = 71_{10}$ ➔ ৭-বিট বাইনারি: <code>1000111</code> (৮-বিট: <code>01000111</code>, হেক্স: <code>47H</code>)।",
    l4_p2_s2: "<strong>(খ) 'I' এর কোড নির্ণয়:</strong> ↳ বর্ণমালার দূরত্ব: $'I' - 'B' = 9 - 2 = 7$ ধাপ ➔ ডেসিমেল = $66 + 7 = 73_{10}$ ➔ ৭-বিট বাইনারি: <code>1001001</code> (৮-বিট: <code>01001001</code>, হেক্স: <code>49H</code>)।",
    l4_p2_s3: "<strong>(গ) ছোট হাতের 'b' ও বিট রিলেশন:</strong> ↳ $'b' = 'B' + 32 = 66 + 32 = 98_{10} = 01100010_2 = 62\\text{H}$।",
    l4_p2_res: "✅ <strong>Exam Secret:</strong> বড় হাতের অক্ষরকে ছোট হাতে রূপান্তর করতে শুধু <strong>বিট ৫ (Bit 5)</strong>-কে <code>0</code> থেকে <code>1</code> করতে হয় ($+32$)!",
    l4_bp_title: "পরীক্ষার খাতায় আঁকার জন্য ১০০% পারফেক্ট ডায়াগ্রাম: Decomposed Full Adder & Ripple Carry",
    l4_bp_ascii: `[ ডায়াগ্রাম ১: ২ টি Half Adder ও ১ টি OR গেট দিয়ে Full Adder (Slide 17) ]

            ┌──────────────┐
  Xi ───────┤              ├─── Si' (Xi⊕Yi) ───┬──────────────┐
            │ Half Adder 1 │                   │ Half Adder 2 ├──────► SUM (Si = Si'⊕Ci)
  Yi ───────┤  (XOR + AND) ├─── Ci' ──┐  Ci ───┤  (XOR + AND) │
            └──────────────┘          │        └──────┬───────┘
                                      │               │ Ci'' (Si'·Ci)
                                      └───►┌─────┐◄───┘
                                           │ OR  ├───────────────────► CARRY (Ci+1 = Ci'+Ci'')
                                           └─────┘

─────────────────────────────────────────────────────────────────────────────
[ ডায়াগ্রাম ২: ৪-বিট রিপল ক্যারি অ্যাডার ক্যাসকেডিং ও প্রপাগেশন বিলম্ব (Slide 18) ]

          A3 B3              A2 B2              A1 B1              A0 B0
           │  │               │  │               │  │               │  │
           ▼  ▼               ▼  ▼               ▼  ▼               ▼  ▼
        ┌────────┐ C3      ┌────────┐ C2      ┌────────┐ C1      ┌────────┐
C4 ◄────┤ FA 3   │◄────────┤ FA 2   │◄────────┤ FA 1   │◄────────┤ FA 0   │◄──── C0 (Initial Carry)
        └───┬────┘         └───┬────┘         └───┬────┘         └───┬────┘
            │                  │                  │                  │
            ▼ S3               ▼ S2               ▼ S1               ▼ S0
       [Ready at 4Δt]     [Ready at 3Δt]     [Ready at 2Δt]     [Ready at 1Δt]`,
    l4_bp_tip: "💡 <strong>Exam Marking Key:</strong> রিপল ক্যারি অ্যাডারে প্রথম স্টেজ (FA0) থেকে শেষ স্টেজ (FA3) পর্যন্ত ক্যারি ছড়িয়ে পড়ার সমীকরণ $T_{carry} = (n - 1) \\times \\Delta t$ এবং মোট যোগফল সম্পন্ন হওয়ার সময় $T_{sum} = n \\times \\Delta t$ উল্লেখ করতে ভুলবে না!",
    l4_fact_badge: "রোমাঞ্চকর অজানা তথ্য • Did You Know?",
    l4_fact_title: "গাড়ির ওডোমিটার (Odometer) আর ২'স কমপ্লিমেন্টের অদ্ভুত মিল!",
    l4_fact_body: "কম্পিউটারে কেন বিয়োগের জন্য আলাদা কোনো সার্কিট থাকে না? উত্তর লুকিয়ে আছে যান্ত্রিক গাড়ির মাইলেজ মিটারে (Odometer)! একটি গাড়ির মিটারে যখন <code>000000</code> কিমি থাকে, গাড়ি যদি ১ কিমি পেছনে যায় তবে মিটার উল্টো ঘুরে হয়ে যায় <code>999999</code>! ঠিক একই ঘটনা ঘটে ৮-বিটের বাইনারিতে: <code>00000000</code> থেকে ১ বিয়োগ করলে মান দাঁড়িয়ে যায় <code>11111111</code> (যা সাইনড সিস্টেমে -১)। জন ভন নিউম্যান ও কম্পিউটার আর্কিটেক্টরা উপলব্ধি করেন যে এই সার্কুলার রোলওভারকে কাজে লাগালে <strong>শুধু যোগের সার্কিট দিয়েই পৃথিবীর যেকোনো বিয়োগের কাজ নিখুঁতভাবে সম্পন্ন করা সম্ভব</strong>—যা প্রসেসরের লক্ষ লক্ষ ট্রানজিস্টর বাঁচিয়ে দিয়েছিল!",
    footer_title: "কম্পিউটার আর্কিটেকচার অ্যান্ড অর্গানাইজেশন (CAO) — লেকচার ৪ মাস্টারক্লাস",
    footer_sub: "ডিজাইন করা হয়েছে স্পষ্টতা, গভীর বোধগম্যতা ও পরীক্ষার পূর্ণ প্রস্তুতির জন্য।"
  },
  en: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_converter: "Base Converter",
    nav_twos: "2's Complement",
    nav_ascii: "ASCII & Text",
    nav_adders: "Decomposed Adder",
    nav_universal: "Universal Gates",
    nav_quiz: "Exam Quiz",
    nav_take_test: "Take Quiz",
    hero_badge: "Comprehensive Lecture 4 Interactive Masterclass",
    hero_title: 'Computer Data Representation<br><span class="gradient-text">Number Systems, 2\'s Complement, ASCII & Adders</span>',
    hero_subtitle: "From decimal, binary, octal, and hexadecimal conversions to negative integer 2's complement, ASCII character mapping, and decomposed Full Adders built from Half Adders—explore it all in real-time simulators!",
    stat_binary: "Binary Number System",
    stat_twos: "3-Step 2's Complement",
    stat_ascii: "Character Encoding",
    stat_adder: "Decomposed Full Adder",
    sec1_tag: "MODULE 1 • SLIDES 5 TO 10",
    sec1_title: "Number Base Conversion Lab",
    sec1_desc: "Type any number or click presets (e.g., 13, 125, 150) to observe instantaneous conversion and mathematical division steps!",
    conv_label: "Decimal Number:",
    conv_steps_title: "🔍 Step-by-Step Division Process (Slide 8):",
    sec2_tag: "MODULE 2 • SLIDES 19 & 20",
    sec2_title: "Negative Numbers & 2's Complement",
    sec2_desc: "Modern digital computers execute subtraction purely via addition using the elegant 2's complement representation!",
    sm_desc: "The leftmost bit (MSB) indicates the algebraic sign (0 = positive, 1 = negative); the remaining bits denote magnitude.",
    ones_desc: "Bitwise inversion of positive binary (flipping every 0 to 1 and 1 to 0) yields the 1's complement.",
    twos_desc: "Formed by adding 1 to the 1's complement. This standard representation eliminates negative zero (-0) and simplifies ALUs.",
    twos_badge: "Slides 5 & 20 3-Step Method",
    twos_title: "⚡ Interactive 2's Complement Calculator",
    twos_desc_head: "Select a negative integer to calculate step-by-step (e.g., -1, -4, -9):",
    twos_s1_title: "Step 1: Equivalent Positive Binary Representation",
    twos_s2_title: "Step 2: Bitwise Inversion (1's Complement)",
    twos_s3_title: "Step 3: Add 1 to Obtain 2's Complement Result",
    sec3_tag: "MODULE 3 • SLIDES 11 & 21",
    sec3_title: "ASCII Coding & Character Explorer",
    sec3_desc: "Discover how computers encode textual characters into standardized binary codes, with full solutions to exam problems.",
    ascii_badge: "Live ASCII Decoder",
    ascii_title: "🔤 Real-Time Character to Binary Lookup",
    ascii_desc: "Type any character to inspect its decimal and 7-bit/8-bit binary codes:",
    sec4_tag: "MODULE 4 • SLIDES 12 TO 18",
    sec4_title: "Decomposed Full Adder & Ripple Carry",
    sec4_desc: "How a complete 3-input Full Adder is constructed from Two Half Adders and One OR Gate (2 HA + 1 OR)!",
    decomp_badge: "Slide 17 Core Architecture",
    decomp_title: "🧱 Building a Full Adder with 2 Half Adders + 1 OR Gate",
    decomp_desc: "Observe how the first Half Adder computes intermediate sum and carry, and the second Half Adder plus OR gate yield the final Sum (Si) and Carry (Ci+1)!",
    ripple_delay_title: "Ripple Carry Adder Propagation Latency (Slide 18):",
    ripple_delay_body: "In an n-bit ripple carry adder, the carry ripples sequentially through each stage. The final carry is available after (n - 1) × Δt, and the final sum is ready after n × Δt delay.",
    sec5_tag: "MODULE 5 • SLIDES 22 & 23",
    sec5_title: "Universal Gates & Logic Implementation",
    sec5_desc: "Why NAND and NOR are Universal Gates capable of implementing any arbitrary Boolean logic circuit.",
    func_complete_desc: "A set of gates capable of expressing every possible Boolean logic function is termed a Functionally Complete Set:",
    univ_gate_desc: "NAND and NOR gates are universal! Every elementary gate (NOT, AND, OR) can be constructed exclusively using NAND gates:",
    sec6_tag: "EXAM MASTERY • QUIZ ZONE",
    sec6_title: "Lecture 4 Self-Assessment Quiz",
    sec6_desc: "Test your mastery of number system conversions, 2's complement, ASCII, and adders!",
    quiz_score_prefix: "Score:",
    btn_next_q: "Next Question ➡️",
    cheat_title: "Lecture 4: 10-Minute Exam Night Quick Revision Sheet",
    cheat_l4_1: "<strong>2ⁿ Codes:</strong> n bits permit 2ⁿ distinct binary combinations • 7 bits = 128 codes (ASCII), 8 bits = 256 codes.",
    cheat_l4_2: "<strong>2's Complement:</strong> 3-Step rule: Positive binary ➔ Invert bits (1's comp) ➔ Add 1. E.g., -9 = 11110111.",
    cheat_l4_3: "<strong>Decomposed Full Adder:</strong> Constructed using exactly 2 Half Adders and 1 OR Gate (2 HA + 1 OR).",
    cheat_l4_4: "<strong>ASCII Calculation:</strong> If 'B' = 66, then 'G' = 71 (01000111) and 'I' = 73 (01001001).",
    cheat_l4_5: "<strong>Octal to Hex:</strong> Octal (175)₈ = Binary (001 111 101)₂ = Hex (7D)₁₆.",
    cheat_l4_6: "<strong>Universal Gates:</strong> NAND and NOR are universal gates because all Boolean logic can be realized using them alone.",
    ninja_badge: "🥷 Mini-Game • Binary Ninja",
    ninja_time_label: "Time:",
    ninja_score_label: "Score:",
    ninja_title: "Binary Ninja: 30-Second Speed Run",
    ninja_desc: "Click the 8 bit switches ($128, 64, 32, 16, 8, 4, 2, 1$) ON/OFF to match the target decimal integer! Clear as many numbers as possible before the timer expires. Match 3 targets correctly to unlock the <strong>Binary Ninja</strong> badge!",
    ninja_target_label: "TARGET DECIMAL",
    ninja_current_label: "YOUR BINARY SUM",
    btn_ninja_start: "🥷 Start Speed Run!",
    twos_method_title: "2's Complement (Standard System)",
    ascii_label: "Character:",
    ep_badge: "Solved Exam Problem (Slide 11, Question 2)",
    sol_g: "<strong>Character 'G':</strong><br>'G' is the 5th character after 'B' (C, D, E, F, G ➔ +5).<br>Decimal = <code>66 + 5 = 71</code><br>Binary = <code>01000111</code>",
    sol_i: "<strong>Character 'I':</strong><br>'I' is the 7th character after 'B' (H, I ➔ +7).<br>Decimal = <code>66 + 7 = 73</code><br>Binary = <code>01001001</code>",
    vault_badge: "🎯 EXAM MASTER VAULT • DIU CSE",
    l4_math_title: "Exam Mathematical Problems & Model Answers",
    l4_math_sub: "2's Complement Subtraction via Addition, ASCII Arithmetic & Decomposed Full Adder:",
    l4_p1_tag: "Math Problem 1 • Bloom's Level 3 (Apply)",
    l4_p1_title: "2's Complement Subtraction via Addition ($7 - 4 = +3$)",
    l4_p1_statement: "<strong>Question:</strong> Using an 8-bit signed binary register, compute $7 - 4$ via 2's complement addition. Explain the fate of the carry bit and verify whether an overflow occurred.",
    l4_p1_s1: "<strong>Step 1:</strong> 8-bit binary representation of $+7$ = <code>00000111</code>",
    l4_p1_s2: "<strong>Step 2:</strong> 8-bit binary representation of $+4$ = <code>00000100</code>",
    l4_p1_s3: "<strong>Step 3:</strong> Compute $-4$ in 2's complement:",
    l4_p1_s4: "↳ 1's complement (invert bits): <code>11111011</code>",
    l4_p1_s5: "↳ Add 1: <code>11111011 + 1 = 11111100</code> ($-4_{10}$)",
    l4_p1_s6: "<strong>Step 4:</strong> Compute addition ($+7 + (-4)$):",
    l4_p1_s7: "<strong>Step 5: End-around Carry:</strong> The 9th-bit carry <code>1</code> is <strong>discarded</strong> in standard 2's complement arithmetic.",
    l4_p1_res: "✅ <strong>Result:</strong> Remaining 8-bit result = <code>00000011</code> ($+3_{10}$). Adding numbers of opposite signs guarantees No Overflow.",
    l4_p2_tag: "Math Problem 2 • Bloom's Level 3 (Apply)",
    l4_p2_title: "ASCII Character Offset & Bit Mathematics",
    l4_p2_statement: "<strong>Question:</strong> Given that the ASCII decimal value of 'B' is <code>66</code> ($01000010_2$), calculate without a table the 7-bit binary and hexadecimal codes for 'G' and 'I'. What is the value of lowercase 'b', and what is the exact bit relationship between uppercase and lowercase letters?",
    l4_p2_s1: "<strong>(a) Determine Code for 'G':</strong> ↳ Alphabetical distance: $'G' - 'B' = 7 - 2 = 5$ steps ➔ Decimal = $66 + 5 = 71_{10}$ ➔ 7-bit Binary: <code>1000111</code> (8-bit: <code>01000111</code>, Hex: <code>47H</code>).",
    l4_p2_s2: "<strong>(b) Determine Code for 'I':</strong> ↳ Alphabetical distance: $'I' - 'B' = 9 - 2 = 7$ steps ➔ Decimal = $66 + 7 = 73_{10}$ ➔ 7-bit Binary: <code>1001001</code> (8-bit: <code>01001001</code>, Hex: <code>49H</code>).",
    l4_p2_s3: "<strong>(c) Lowercase 'b' & Bit Relationship:</strong> ↳ $'b' = 'B' + 32 = 66 + 32 = 98_{10} = 01100010_2 = 62\\text{H}$.",
    l4_p2_res: "✅ <strong>Exam Secret:</strong> To convert uppercase ASCII to lowercase, simply set <strong>Bit 5</strong> from <code>0</code> to <code>1</code> ($+32$)!",
    l4_bp_title: "100% Exam-Accurate Diagrams: Decomposed Full Adder & Ripple Carry",
    l4_bp_ascii: `[ Diagram 1: Full Adder decomposed into 2 Half Adders & 1 OR Gate (Slide 17) ]

            ┌──────────────┐
  Xi ───────┤              ├─── Si' (Xi⊕Yi) ───┬──────────────┐
            │ Half Adder 1 │                   │ Half Adder 2 ├──────► SUM (Si = Si'⊕Ci)
  Yi ───────┤  (XOR + AND) ├─── Ci' ──┐  Ci ───┤  (XOR + AND) │
            └──────────────┘          │        └──────┬───────┘
                                      │               │ Ci'' (Si'·Ci)
                                      └───►┌─────┐◄───┘
                                           │ OR  ├───────────────────► CARRY (Ci+1 = Ci'+Ci'')
                                           └─────┘

─────────────────────────────────────────────────────────────────────────────
[ Diagram 2: 4-Bit Ripple Carry Adder Cascading & Propagation Delay (Slide 18) ]

          A3 B3              A2 B2              A1 B1              A0 B0
           │  │               │  │               │  │               │  │
           ▼  ▼               ▼  ▼               ▼  ▼               ▼  ▼
        ┌────────┐ C3      ┌────────┐ C2      ┌────────┐ C1      ┌────────┐
C4 ◄────┤ FA 3   │◄────────┤ FA 2   │◄────────┤ FA 1   │◄────────┤ FA 0   │◄──── C0 (Initial Carry)
        └───┬────┘         └───┬────┘         └───┬────┘         └───┬────┘
            │                  │                  │                  │
            ▼ S3               ▼ S2               ▼ S1               ▼ S0
       [Ready at 4Δt]     [Ready at 3Δt]     [Ready at 2Δt]     [Ready at 1Δt]`,
    l4_bp_tip: "💡 <strong>Exam Marking Key:</strong> Always write the ripple propagation delay formula: carry delay $T_{carry} = (n - 1) \\times \\Delta t$ and total sum completion time $T_{sum} = n \\times \\Delta t$!",
    l4_fact_badge: "ENGINEERING REVELATION • DID YOU KNOW?",
    l4_fact_title: "The Mechanical Car Odometer and 2's Complement!",
    l4_fact_body: "Why don't computers have dedicated subtraction circuits? The secret lies in mechanical car odometers! When a mileage meter reads <code>000000</code> km and rolls in reverse by 1 km, the physical wheels roll over to <code>999999</code>. The exact same circular rollover occurs in 8-bit binary: subtracting 1 from <code>00000000</code> rolls over to <code>11111111</code> (-1 in signed format). Von Neumann recognized that exploiting this circular rollover allows <strong>all subtractions to be performed entirely with adders</strong>—saving hundreds of thousands of transistors in every CPU!",
    footer_title: "Computer Architecture and Organization (CAO) — Lecture 4 Masterclass",
    footer_sub: "Engineered for intuitive comprehension, visual mastery, and top exam performance."
  }
};

let currentLang = localStorage.getItem('cao_lang') || 'bn';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cao_lang', lang);
  document.documentElement.lang = lang;

  const langBnBtn = document.getElementById('langBnBtn');
  const langEnBtn = document.getElementById('langEnBtn');
  if (langBnBtn && langEnBtn) {
    if (lang === 'bn') {
      langBnBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    } else {
      langEnBtn.classList.add('active');
      langBnBtn.classList.remove('active');
    }
  }

  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  if (typeof renderCurrentQuestion === 'function' && !quizFinished) {
    renderCurrentQuestion();
  }

  updateBaseConverter();
  if (typeof updateTwosComplement === 'function') {
    updateTwosComplement(currentTwosVal);
  }
  window.dispatchEvent(new CustomEvent('caoLanguageChanged', { detail: { lang } }));
}

// Bind language switcher
const langBnBtn = document.getElementById('langBnBtn');
const langEnBtn = document.getElementById('langEnBtn');
if (langBnBtn && langEnBtn) {
  langBnBtn.addEventListener('click', () => {
    sounds.click();
    applyLanguage('bn');
  });
  langEnBtn.addEventListener('click', () => {
    sounds.click();
    applyLanguage('en');
  });
}

// --- 3. Base Converter Logic ---
const decimalInput = document.getElementById('decimalInput');
const valDec = document.getElementById('valDec');
const valBin = document.getElementById('valBin');
const valOct = document.getElementById('valOct');
const valHex = document.getElementById('valHex');
const binBitGrouping = document.getElementById('binBitGrouping');
const octGrouping = document.getElementById('octGrouping');
const hexGrouping = document.getElementById('hexGrouping');
const octalSteps = document.getElementById('octalSteps');
const hexSteps = document.getElementById('hexSteps');

function updateBaseConverter() {
  if (!decimalInput) return;
  let num = parseInt(decimalInput.value, 10);
  if (isNaN(num) || num < 0) num = 0;

  sounds.calcTick();

  valDec.textContent = num;
  const binStr = num.toString(2).padStart(8, '0');
  valBin.textContent = binStr;
  valOct.textContent = num.toString(8);
  valHex.textContent = num.toString(16).toUpperCase();

  // 4-bit nibble formatting
  binBitGrouping.textContent = binStr.replace(/(\d{4})(?=\d)/g, '$1 ');
  octGrouping.textContent = `Octal: ${num.toString(8)}`;
  hexGrouping.textContent = `Hex: ${num.toString(16).toUpperCase()}`;

  // Generate dynamic division steps
  const isBn = currentLang === 'bn';

  // Octal division
  let tempOct = num;
  let octStepsHtml = `<strong>Decimal ${num} ➔ Octal (${isBn ? 'ভাগ ৮' : 'Divide by 8'}):</strong><div class="division-table">`;
  if (tempOct === 0) {
    octStepsHtml += `0 ÷ 8 = 0 (Remainder 0)<br>`;
  } else {
    while (tempOct > 0) {
      const q = Math.floor(tempOct / 8);
      const rem = tempOct % 8;
      octStepsHtml += `${tempOct} ÷ 8 = ${q} &nbsp; (${isBn ? 'ভাগশেষ' : 'Remainder'} ${rem})<br>`;
      tempOct = q;
    }
  }
  octStepsHtml += `<strong>${isBn ? 'ফলাফল' : 'Result'}: (${num.toString(8)})₈</strong></div>`;
  octalSteps.innerHTML = octStepsHtml;

  // Hexadecimal division
  let tempHex = num;
  let hexStepsHtml = `<strong>Decimal ${num} ➔ Hexadecimal (${isBn ? 'ভাগ ১৬' : 'Divide by 16'}):</strong><div class="division-table">`;
  const hexChars = "0123456789ABCDEF";
  if (tempHex === 0) {
    hexStepsHtml += `0 ÷ 16 = 0 (Remainder 0)<br>`;
  } else {
    while (tempHex > 0) {
      const q = Math.floor(tempHex / 16);
      const rem = tempHex % 16;
      const charRem = hexChars[rem];
      const extra = rem >= 10 ? ` = ${charRem}` : '';
      hexStepsHtml += `${tempHex} ÷ 16 = ${q} &nbsp; (${isBn ? 'ভাগশেষ' : 'Remainder'} ${rem}${extra})<br>`;
      tempHex = q;
    }
  }
  hexStepsHtml += `<strong>${isBn ? 'ফলাফল' : 'Result'}: (${num.toString(16).toUpperCase()})₁₆</strong></div>`;
  hexSteps.innerHTML = hexStepsHtml;
}

if (decimalInput) {
  decimalInput.addEventListener('input', updateBaseConverter);
}

document.querySelectorAll('.preset-pills .pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sounds.click();
    document.querySelectorAll('.preset-pills .pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    decimalInput.value = btn.dataset.val;
    updateBaseConverter();
  });
});

// --- 4. 2's Complement Walkthrough Logic ---
let currentTwosVal = -9;
const step1Bits = document.getElementById('step1Bits');
const step2Bits = document.getElementById('step2Bits');
const step3Bits = document.getElementById('step3Bits');

function updateTwosComplement(negVal) {
  currentTwosVal = negVal;
  sounds.calcTick();
  const absVal = Math.abs(negVal);

  // Step 1: Positive 8-bit
  const posBin = absVal.toString(2).padStart(8, '0');
  step1Bits.innerHTML = posBin.split('').map(b => `<span class="bit-cell">${b}</span>`).join('');

  // Step 2: Inverted (1's comp)
  const onesComp = posBin.split('').map(b => b === '0' ? '1' : '0').join('');
  step2Bits.innerHTML = onesComp.split('').map(b => `<span class="bit-cell">${b}</span>`).join('');

  // Step 3: 2's complement (+1)
  const twosInt = (parseInt(onesComp, 2) + 1) & 0xFF;
  const twosBin = twosInt.toString(2).padStart(8, '0');
  step3Bits.innerHTML = twosBin.split('').map((b, i) => {
    const isSign = i === 0 ? 'msb-sign' : '';
    return `<span class="bit-cell ${isSign}">${b}</span>`;
  }).join('');

  const twosStep1Sub = document.getElementById('twosStep1Sub');
  const twosStep3Sub = document.getElementById('twosStep3Sub');
  const isBn = currentLang === 'bn';
  if (twosStep1Sub) {
    twosStep1Sub.textContent = isBn
      ? `৮-বিট ফরম্যাটে +${absVal} = ${posBin}`
      : `8-bit format: +${absVal} = ${posBin}`;
  }
  if (twosStep3Sub) {
    twosStep3Sub.innerHTML = isBn
      ? `<strong>-${absVal} এর 2's Complement = ${twosBin}</strong>`
      : `<strong>2's Complement of -${absVal} = ${twosBin}</strong>`;
  }
}

document.querySelectorAll('.twos-presets .pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sounds.click();
    document.querySelectorAll('.twos-presets .pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const val = parseInt(btn.dataset.val, 10);
    updateTwosComplement(val);
  });
});

// --- 5. ASCII Decoder Logic ---
const charInput = document.getElementById('charInput');
const dispChar = document.getElementById('dispChar');
const dispDec = document.getElementById('dispDec');
const dispBin7 = document.getElementById('dispBin7');
const dispBin8 = document.getElementById('dispBin8');

function updateASCII() {
  if (!charInput) return;
  const ch = charInput.value.charAt(0) || 'B';
  const code = ch.charCodeAt(0);

  sounds.calcTick();

  dispChar.textContent = ch;
  dispDec.textContent = code;
  dispBin7.textContent = code.toString(2).padStart(7, '0');
  dispBin8.textContent = code.toString(2).padStart(8, '0');
}

if (charInput) {
  charInput.addEventListener('input', updateASCII);
}

// --- 6. Bilingual Quiz Engine (Lecture 4) ---
const quizData = {
  bn: [
    {
      question: "বাইনারি সংখ্যা পদ্ধতিতে n সংখ্যক বিট (n binary digits) দিয়ে সর্বোচ্চ কতগুলো ভিন্ন কোড তৈরি করা সম্ভব?",
      options: [
        "২n টি",
        "২ⁿ টি (যেমন: ৭ বিট দিয়ে ১২৮ এবং ৮ বিট দিয়ে ২৫৬)",
        "১০ⁿ টি",
        "n² টি"
      ],
      answer: 1,
      explanation: "স্লাইড ২ অনুযায়ী: n binary digits allows 2ⁿ codes। যেমন: ১ বিটে ২¹=২, ৭ বিটে ২⁷=১২৮ (ASCII), ৮ বিটে ২⁸=২৫৬ (EBCDIC/Extended ASCII)।"
    },
    {
      question: "৮-বিট পদ্ধতিতে দশমিক সংখ্যা -9 এর ২'স কমপ্লিমেন্ট (2's Complement) মান কোনটি?",
      options: [
        "10001001",
        "11110110",
        "11110111",
        "00001001"
      ],
      answer: 2,
      explanation: "স্লাইড ৫ ও ২০ অনুযায়ী: +9 = 00001001। বিট উল্টালে (1's comp) হয় 11110110। এর সাথে ১ যোগ করলে ২'স কমপ্লিমেন্ট হয় 11110111।"
    },
    {
      question: "একটি ১-বিট ফুল অ্যাডার (Full Adder) সার্কিট নিচের কোন উপাদানগুলো দিয়ে ডিকম্পোজ করে তৈরি করা যায়?",
      options: [
        "৪টি নট গেট",
        "২টি হাফ অ্যাডার এবং ১টি OR গেট (2 HA + 1 OR)",
        "শুধুমাত্র ৩টি অ্যান্ড গেট",
        "১টি হাফ অ্যাডার এবং ২টি নর গেট"
      ],
      answer: 1,
      explanation: "স্লাইড ১৭-এর ডিকম্পোজড ফুল অ্যাডার চিত্র অনুযায়ী: একটি Full Adder তৈরি করা হয় ২টি Half Adder (HA) এবং ১টি OR Gate জুড়ে।"
    },
    {
      question: "ASCII কোডে যদি 'B'-এর ডেসিমেল মান ৬৬ হয়, তবে 'G' এবং 'I'-এর ডেসিমেল মান কত হবে?",
      options: [
        "G = 71 এবং I = 73",
        "G = 67 এবং I = 68",
        "G = 80 এবং I = 90",
        "G = 100 এবং I = 105"
      ],
      answer: 0,
      explanation: "স্লাইড ১১ (Question 2) অনুযায়ী: 'B'=66। 'G' হলো ৫ম অক্ষর (66+5 = 71, বাইনারি 01000111) এবং 'I' হলো ৭ম অক্ষর (66+7 = 73, বাইনারি 01001001)।"
    },
    {
      question: "নিচের কোন গেটগুলোকে 'Universal Gate' বলা হয় কারণ এদের দিয়ে যেকোনো লজিক সার্কিট তৈরি করা সম্ভব?",
      options: [
        "AND এবং OR",
        "NAND এবং NOR",
        "XOR এবং XNOR",
        "NOT এবং BUFFER"
      ],
      answer: 1,
      explanation: "স্লাইড ২২ ও ২৩ অনুযায়ী: NAND এবং NOR হলো ইউনিভার্সাল গেট, কারণ শুধুমাত্র NAND বা শুধুমাত্র NOR গেট ব্যবহার করে NOT, AND, OR সহ যেকোনো বুলিয়ান সার্কিট তৈরি করা যায়।"
    }
  ],
  en: [
    {
      question: "In the computer numbering system, how many distinct binary codes can be represented using n binary digits?",
      options: [
        "2n codes",
        "2ⁿ codes (e.g., 7 bits = 128 codes, 8 bits = 256 codes)",
        "10ⁿ codes",
        "n² codes"
      ],
      answer: 1,
      explanation: "Slide 2 specifies: n binary digits allow 2ⁿ codes. For instance, 7 bits allow 2⁷ = 128 codes (ASCII), and 8 bits allow 2⁸ = 256 codes."
    },
    {
      question: "In standard 8-bit binary representation, what is the 2's complement of decimal number -9?",
      options: [
        "10001001",
        "11110110",
        "11110111",
        "00001001"
      ],
      answer: 2,
      explanation: "Slides 5 & 20 state: +9 = 00001001. Inverting bits yields the 1's complement (11110110). Adding 1 gives the 2's complement: 11110111."
    },
    {
      question: "A single-bit Full Adder can be structurally decomposed and synthesized using which set of components?",
      options: [
        "Four NOT inverters",
        "Two Half Adders and One OR Gate (2 HA + 1 OR)",
        "Exclusively three AND gates",
        "One Half Adder and two NOR gates"
      ],
      answer: 1,
      explanation: "Slide 17 illustrates the Decomposed Full Adder: It is constructed using two Half Adders (HA) and one OR gate."
    },
    {
      question: "If the decimal ASCII value of character 'B' is 66, what are the decimal values of 'G' and 'I'?",
      options: [
        "G = 71 and I = 73",
        "G = 67 and I = 68",
        "G = 80 and I = 90",
        "G = 100 and I = 105"
      ],
      answer: 0,
      explanation: "Slide 11 exam example: 'B' = 66. 'G' is 5 positions ahead (66 + 5 = 71, binary 01000111) and 'I' is 7 positions ahead (66 + 7 = 73, binary 01001001)."
    },
    {
      question: "Which gates are classified as 'Universal Gates' because any Boolean logic function can be constructed solely with them?",
      options: [
        "AND and OR",
        "NAND and NOR",
        "XOR and XNOR",
        "NOT and BUFFER"
      ],
      answer: 1,
      explanation: "Slides 22 & 23 highlight: NAND and NOR are Universal Gates because all elementary Boolean operations (NOT, AND, OR) can be synthesized using NAND or NOR gates alone."
    }
  ]
};

let currentQIdx = 0;
let userScore = 0;
let answered = false;
let quizFinished = false;

const questionNumberBadge = document.getElementById('questionNumberBadge');
const scoreBadge = document.getElementById('scoreBadge');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsList = document.getElementById('quizOptionsList');
const quizProgressFill = document.getElementById('quizProgressFill');
const quizExplanationBox = document.getElementById('quizExplanationBox');
const expTitle = document.getElementById('expTitle');
const expBody = document.getElementById('expBody');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

function renderCurrentQuestion() {
  const questions = quizData[currentLang];
  const q = questions[currentQIdx];

  const prefix = currentLang === 'bn' ? 'প্রশ্ন' : 'Question';
  if (questionNumberBadge) questionNumberBadge.textContent = `${prefix} ${currentQIdx + 1} / ${questions.length}`;
  if (scoreBadge) scoreBadge.textContent = userScore;
  if (quizProgressFill) quizProgressFill.style.width = `${((currentQIdx + 1) / questions.length) * 100}%`;
  if (quizQuestionText) quizQuestionText.textContent = q.question;

  if (nextQuestionBtn) {
    if (currentQIdx === questions.length - 1 && answered) {
      nextQuestionBtn.textContent = currentLang === 'bn' ? 'ফলাফল দেখো 🏆' : 'See Results 🏆';
    } else {
      nextQuestionBtn.textContent = currentLang === 'bn' ? 'পরবর্তী প্রশ্ন ➡️' : 'Next Question ➡️';
    }
  }

  if (quizOptionsList) {
    quizOptionsList.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="opt-bullet"><strong>${String.fromCharCode(65 + optIdx)}.</strong></span> <span>${optText}</span>`;
      btn.addEventListener('click', () => handleOptionClick(optIdx, btn));
      if (answered) btn.disabled = true;
      quizOptionsList.appendChild(btn);
    });
  }

  if (answered) {
    expBody.textContent = q.explanation;
  }
}

function loadQuestion(index) {
  answered = false;
  currentQIdx = index;
  if (quizExplanationBox) quizExplanationBox.classList.remove('show');
  if (nextQuestionBtn) nextQuestionBtn.disabled = true;
  renderCurrentQuestion();
}

function handleOptionClick(selectedIdx, btnElement) {
  if (answered) return;
  answered = true;

  const q = quizData[currentLang][currentQIdx];
  const allOptionBtns = quizOptionsList.querySelectorAll('.quiz-option-btn');
  allOptionBtns.forEach(b => b.disabled = true);

  const isBn = currentLang === 'bn';

  if (selectedIdx === q.answer) {
    sounds.correctChime();
    btnElement.classList.add('correct');
    userScore++;
    if (scoreBadge) scoreBadge.textContent = userScore;
    expTitle.textContent = isBn ? '🎉 সঠিক উত্তর!' : '🎉 Correct Answer!';
    expTitle.style.color = 'var(--accent-emerald)';
  } else {
    sounds.wrongBuzz();
    btnElement.classList.add('wrong');
    allOptionBtns[q.answer].classList.add('correct');
    expTitle.textContent = isBn ? '❌ ভুল উত্তর!' : '❌ Incorrect Answer!';
    expTitle.style.color = '#ef4444';
  }

  expBody.textContent = q.explanation;
  quizExplanationBox.classList.add('show');
  nextQuestionBtn.disabled = false;

  const totalQuestions = quizData[currentLang].length;
  if (currentQIdx === totalQuestions - 1) {
    nextQuestionBtn.textContent = isBn ? 'ফলাফল দেখো 🏆' : 'See Results 🏆';
  }
}

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener('click', () => {
    sounds.click();
    const totalQuestions = quizData[currentLang].length;
    if (currentQIdx < totalQuestions - 1) {
      currentQIdx++;
      loadQuestion(currentQIdx);
    } else {
      renderQuizFinished();
    }
  });
}

function renderQuizFinished() {
  quizFinished = true;
  sounds.correctChime();
  if (quizProgressFill) quizProgressFill.style.width = '100%';
  const cardContent = document.getElementById('quizCardContent');
  if (!cardContent) return;

  const totalQuestions = quizData[currentLang].length;
  const percentage = Math.round((userScore / totalQuestions) * 100);
  const isBn = currentLang === 'bn';

  let heading = isBn ? 'কুইজ সম্পন্ন হয়েছে!' : 'Quiz Completed!';
  let feedback = '';

  if (isBn) {
    if (percentage >= 80) {
      feedback = 'অসাধারণ! লেকচার ৪-এর ২\'স কমপ্লিমেন্ট, সংখ্যা রূপান্তর ও ফুল অ্যাডার তোমার সম্পূর্ণ আয়ত্তে এসেছে!';
    } else if (percentage >= 60) {
      feedback = 'খুব ভালো! ২\'স কমপ্লিমেন্টের ৩টি ধাপ ও ডিকম্পোজড ফুল অ্যাডার আরেকবার দেখে নাও, তাহলে ১০০% রেডি!';
    } else {
      feedback = 'আরেকবার স্লাইড ও সিমুলেটরগুলো দেখো, তারপর আবার টেস্ট দাও!';
    }
  } else {
    if (percentage >= 80) {
      feedback = 'Outstanding! You have mastered base conversions, 2\'s complement, ASCII, and decomposed adders!';
    } else if (percentage >= 60) {
      feedback = 'Great job! Revisit the 2\'s complement 3-step rule to ensure full exam readiness.';
    } else {
      feedback = 'Review the conversion division steps and Adder diagram, then retake the quiz!';
    }
  }

  const retryText = isBn ? '🔄 পুনরায় কুইজ দাও' : '🔄 Retake Quiz';

  cardContent.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
      <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">${heading}</h3>
      <div style="font-size: 2.5rem; font-family: var(--font-code); color: var(--accent-amber); font-weight: 800; margin-bottom: 1rem;">
        ${userScore} / ${totalQuestions} (${percentage}%)
      </div>
      <p style="font-size: 1.05rem; color: #cbd5e1; max-width: 500px; margin: 0 auto 1.75rem;">
        ${feedback}
      </p>
      <button id="retryQuizBtn" class="action-btn primary-btn" style="font-size: 1rem; padding: 0.75rem 1.75rem;">
        ${retryText}
      </button>
    </div>
  `;

  document.getElementById('retryQuizBtn').addEventListener('click', () => {
    currentQIdx = 0;
    userScore = 0;
    quizFinished = false;
    location.reload();
  });

  if (percentage === 100 && window.caoGame) {
    window.caoGame.unlockBadge('quiz_scholar');
  }

  if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
}

// --- 7. Mini-Game: Binary Ninja 30-Second Speed Run ---
(function initBinaryNinja() {
  const btnStart = document.getElementById('btnStartNinja');
  const targetNumEl = document.getElementById('ninjaTargetNum');
  const currentSumEl = document.getElementById('ninjaCurrentSum');
  const timerEl = document.getElementById('ninjaTimer');
  const scoreEl = document.getElementById('ninjaScore');
  const switchesGrid = document.getElementById('ninjaSwitchesGrid');
  const feedbackEl = document.getElementById('ninjaFeedback');

  if (!btnStart || !switchesGrid) return;

  const bitWeights = [128, 64, 32, 16, 8, 4, 2, 1];
  let bitStates = [0, 0, 0, 0, 0, 0, 0, 0];
  let currentTarget = 45;
  let score = 0;
  let timeLeft = 30;
  let gameInterval = null;
  let isPlaying = false;

  function renderSwitches() {
    switchesGrid.innerHTML = '';
    bitWeights.forEach((w, idx) => {
      const btn = document.createElement('button');
      btn.className = 'ninja-bit-btn ' + (bitStates[idx] ? 'active' : '');
      btn.innerHTML = `
        <span class="bit-val">${bitStates[idx]}</span>
        <span class="bit-weight">+${w}</span>
      `;
      btn.addEventListener('click', (e) => {
        if (!isPlaying) return;
        bitStates[idx] = bitStates[idx] === 1 ? 0 : 1;
        sounds.click();
        renderSwitches();
        checkSum(e);
      });
      switchesGrid.appendChild(btn);
    });

    const sum = bitStates.reduce((acc, val, i) => acc + (val * bitWeights[i]), 0);
    if (currentSumEl) currentSumEl.textContent = sum;
  }

  function checkSum(e) {
    const sum = bitStates.reduce((acc, val, i) => acc + (val * bitWeights[i]), 0);
    const isBn = currentLang === 'bn';

    if (sum === currentTarget) {
      score++;
      if (scoreEl) scoreEl.textContent = score;
      sounds.correctChime();

      if (feedbackEl) {
        feedbackEl.style.color = '#34d399';
        feedbackEl.textContent = isBn ? `⚡ স্ল্যাশ! (${sum}) নিখুঁতভাবে গঠিত হয়েছে! +৩৫ এক্সপি` : `⚡ SLASH! (${sum}) formed perfectly! +35 XP`;
      }

      if (window.caoGame) {
        window.caoGame.addXP(35, 'Binary Formed', e);
      }

      // Reset bits and pick new target
      bitStates = [0, 0, 0, 0, 0, 0, 0, 0];
      currentTarget = Math.floor(Math.random() * 150) + 10;
      if (targetNumEl) targetNumEl.textContent = currentTarget;
      renderSwitches();
    } else if (sum > currentTarget) {
      if (feedbackEl) {
        feedbackEl.style.color = '#ef4444';
        feedbackEl.textContent = isBn ? `যোগফল ${sum} টার্গেটের চেয়ে বড় হয়ে গেছে!` : `Sum ${sum} exceeded target!`;
      }
    }
  }

  btnStart.addEventListener('click', () => {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    timeLeft = 30;
    bitStates = [0, 0, 0, 0, 0, 0, 0, 0];
    currentTarget = Math.floor(Math.random() * 120) + 15;

    if (scoreEl) scoreEl.textContent = '0';
    if (timerEl) timerEl.textContent = '30';
    if (targetNumEl) targetNumEl.textContent = currentTarget;
    if (feedbackEl) feedbackEl.textContent = '';
    btnStart.disabled = true;

    renderSwitches();

    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      timeLeft--;
      if (timerEl) timerEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(gameInterval);
        isPlaying = false;
        btnStart.disabled = false;
        const isBn = currentLang === 'bn';

        if (score >= 3) {
          if (feedbackEl) {
            feedbackEl.style.color = '#38bdf8';
            feedbackEl.innerHTML = isBn 
              ? `🎉 দারুণ! তুমি ${score}টি বাইনারি সফলভাবে কেটে ফেলেছো! নিনজা ব্যাজ আনলকড!` 
              : `🎉 Awesome! You completed ${score} targets! Binary Ninja unlocked!`;
          }
          if (window.caoGame) {
            window.caoGame.unlockBadge('l4_ninja');
          }
        } else {
          if (feedbackEl) {
            feedbackEl.style.color = '#f59e0b';
            feedbackEl.textContent = isBn ? `খেলা শেষ! স্কোর: ${score}। ৩টি মেলাতে আবার চেষ্টা করো!` : `Game Over! Score: ${score}. Try again to hit 3+!`;
          }
        }
      }
    }, 1000);
  });

  renderSwitches();
})();

// Initial Run
applyLanguage(currentLang);
loadQuestion(0);
updateBaseConverter();
updateTwosComplement(-9);
updateASCII();

