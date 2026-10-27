/* ==========================================================================
   Computer Architecture & Organization - Lecture 3: Design Methodology
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

  bitToggle(isHigh = false) {
    this.playTone(isHigh ? 784 : 440, 'sine', 0.07, 0.12);
  }

  clockPulse() {
    this.playTone(320, 'square', 0.1, 0.1);
  }

  cacheHit() {
    this.playTone(659.25, 'triangle', 0.1, 0.15); // E5
    setTimeout(() => this.playTone(987.77, 'triangle', 0.18, 0.15), 80); // B5
  }

  cacheMiss() {
    this.playTone(350, 'sawtooth', 0.12, 0.12);
    setTimeout(() => this.playTone(520, 'triangle', 0.2, 0.15), 180);
  }

  interruptAlert() {
    this.playTone(400, 'square', 0.08, 0.15);
    setTimeout(() => this.playTone(300, 'square', 0.15, 0.15), 90);
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
    nav_design_process: "Design Process",
    nav_levels: "3 Design Levels",
    nav_gate: "Gate Level & Adder",
    nav_rtl: "Register Level (RTL)",
    nav_proc: "Processor & Cache",
    nav_bus: "Bus & Interrupts",
    nav_quiz: "Exam Quiz",
    nav_take_test: "টেস্ট দাও",
    hero_badge: "লেকচার ৩ এর সম্পূর্ণ ইন্টারেক্টিভ গাইড",
    hero_title: 'কম্পিউটার ডিজাইন মেথডোলজি (Design Methodology)<br><span class="gradient-text">গেট লেভেল, আরটিএল ও প্রসেসর লেভেলের স্থাপত্য</span>',
    hero_subtitle: "লজিক গেটের বিট থেকে শুরু করে ফুল অ্যাডার, ফ্লিপ-ফ্লপ, রেজিস্টার ও ক্যাশ মেমরির হাই-স্পিড ডেটা ফ্লো— একটি কম্পিউটার কীভাবে ধাপে ধাপে ডিজাইন করা হয় তা শিখে নাও রিয়েল-টাইম ইন্টারেক্টিভ সিমুলেটরে!",
    btn_watch_bangla_video: "বাংলা ভয়েসওভার অ্যানিমেটেড ক্লাস (1080p Bangla Video)",
    btn_watch_video: "ইন্টারঅ্যাক্টিভ ওয়াকথ্রু (Walkthrough Video)",
    stat_process: "সিস্টেম ডিজাইন প্রক্রিয়া",
    stat_levels: "৩টি মূল ডিজাইন লেভেল",
    stat_comb_seq: "কম্বিনেশনাল ও সিকোয়েন্সিয়াল",
    stat_cache: "ক্যাশ মেমরি ও ইন্টারাপ্টস",
    sec1_tag: "মডিউল ১ • স্লাইড ২ থেকে ৯",
    sec1_title: "সিস্টেম ডিজাইন ও প্রক্রিয়া (System Design Process)",
    sec1_desc: "কম্পিউটার হলো একাধিক কম্পোনেন্টের সমন্বয়ে গঠিত একটি সিস্টেম। নিচের ল্যাবে Analysis বনাম Synthesis-এর পার্থক্য দেখে নাও।",
    analysis_def: "একটি সিস্টেমের <strong>গঠন বা সার্কিট (Structure)</strong> জানা আছে, সেখান থেকে তার <strong>কাজ বা আচরণ (Behavior/Function)</strong> নির্ণয় করার প্রক্রিয়াকে Analysis বলা হয়।",
    synthesis_def: "চাহিদামতো <strong>আচরণ বা কাজ (Desired Behavior)</strong> দেওয়া আছে, তা বাস্তবায়নের জন্য প্রয়োজনীয় <strong>সার্কিট বা কাঠামো (Structure)</strong> তৈরি করার প্রক্রিয়াকে Synthesis বলে।",
    iter_badge: "ইন্টারেক্টিভ ফ্লোচার্ট • স্লাইড ৯",
    iter_title: "🔄 আইটারেটিভ ডিজাইন প্রক্রিয়া (Iterative Design Process)",
    iter_desc: "ইঞ্জিনিয়াররা কীভাবে খরচ (Cost) ও পারফরম্যান্স (Performance) বিবেচনা করে ধাপে ধাপে কম্পিউটার ডিজাইন করেন তা সিমুলেট করে দেখো!",
    fc_step1: "প্রাথমিক সার্কিট ডিজাইন তৈরি",
    fc_step2: "খরচ ও গতির মূল্যায়ন",
    fc_step3: "লক্ষ্য পূরণ হয়েছে কি?",
    fc_step4: "চূড়ান্ত অনুমোদন (End)",
    sec2_tag: "মডিউল ২ • স্লাইড ১০ ও ১১",
    sec2_title: "কম্পিউটার ডিজাইনের ৩টি স্তর (The 3 Design Levels)",
    sec2_desc: "জন পি. হেইজের এই ৩ স্তরের টেবিলটি পরীক্ষার জন্য সবচেয়ে গুরুত্বপূর্ণ ৩/৫ মার্কের প্রশ্ন!",
    levels_table_title: "📋 ৩টি ডিজাইন লেভেলের সম্পূর্ণ তুলনামূলক চার্ট (Slide 11)",
    levels_table_sub: "গেট লেভেল থেকে শুরু করে পুরো সিস্টেম লেভেল পর্যন্ত সমস্ত প্যারামিটার:",
    th_level: "ডিজাইন লেভেল (Design Level)",
    th_components: "মূল উপাদান (Components)",
    th_density: "আইসি ডেনসিটি (IC Density)",
    th_info_units: "তথ্যের একক (Information Units)",
    th_time_units: "সময়ের স্কেল (Time Units)",
    gate_comp: "লজিক গেটস (AND, OR, NOT, XOR), ফ্লিপ-ফ্লপ",
    gate_info: "Bits (0 ও 1)",
    reg_comp: "রেজিস্টার, কাউন্টার, মাল্টিপ্লেক্সার, ডিকোডার, অ্যাডার, এএলইউ",
    reg_info: "Words / Vectors (ওয়ার্ড/ভেক্টর)",
    proc_comp: "সিপিইউ, মেইন মেমরি, ক্যাশ, আই/ও ডিভাইস, সিস্টেম বাস",
    proc_info: "Blocks of Words (ব্লক অফ ওয়ার্ডস)",
    sec3_tag: "মডিউল ৩ • স্লাইড ১২ থেকে ১৯",
    sec3_title: "The Gate Level: লজিক গেট, ফুল অ্যাডার ও ফ্লিপ-ফ্লপ",
    sec3_desc: "কম্বিনেশনাল লজিক (স্মৃতিহীন) বনাম সিকোয়েন্সিয়াল লজিক (১-বিট মেমরি ফ্লিপ-ফ্লপ)।",
    fa_badge: "লাইভ বাইনারি ক্যালকুলেটর • স্লাইড ১৫",
    fa_title: "🧮 ফুল অ্যাডার লাইভ সিমুলেটর (Interactive Full Adder)",
    fa_desc: "A, B এবং Cin ইনপুটগুলোতে ক্লিক করে টগল করো! দেখো কীভাবে Sum (S) এবং Carry Out (C0) পরিবর্তিত হচ্ছে:",
    sop_pos_title: "📌 SOP ও POS সমীকরণ (স্লাইড ১৬):",
    comb_desc: "এদের <strong>কোনো মেমরি বা স্মৃতিশক্তি নেই</strong> (Memoryless)। বর্তমান আউটপুট শুধুমাত্র বর্তমান ইনপুটের ওপর নির্ভর করে।<br><strong>উপাদান:</strong> AND, OR, NOT, XOR গেটস, Full Adders।",
    seq_desc: "কম্বিনেশনাল লজিকের সাথে <strong>১-বিট মেমরি উপাদান (Flip-Flops)</strong> যুক্ত করলে তা সিকোয়েন্সিয়াল সার্কিট হয়। এর আউটপুট বর্তমান ইনপুট এবং <em>অতীত অবস্থার (Past state)</em> ওপর নির্ভর করে।",
    sec4_tag: "মডিউল ৪ • স্লাইড ২০ ও ২১",
    sec4_title: "The Register Level (RTL): ওয়ার্ড ও কম্পোনেন্টস",
    sec4_desc: "রেজিস্টার লেভেলে বিটগুলোকে গ্রুপ করে ওয়ার্ড (Words বা Vectors) হিসেবে প্রসেস ও ট্রান্সফার করা হয়।",
    mux_desc: "<strong>Data Routing:</strong> একাধিক ইনপুট লাইন থেকে একটি নির্দিষ্ট ডেটা লাইন সিলেক্ট করে আউটপুটে পাঠানোর সুইচ।",
    decoder_desc: "<strong>Code Checking & Conversion:</strong> বাইনারি কোডকে ডিকোড করে নির্দিষ্ট মেমরি লোকেশন বা ফাংশন সক্রিয় করা।",
    shift_reg_desc: "<strong>Information Storage & Conversion:</strong> ডেটা ওয়ার্ড সাময়িকভাবে ধারণ করা এবং সিরিয়াল থেকে প্যারালাল রূপান্তর করা।",
    counter_desc: "<strong>Control & Timing Signal:</strong> ক্লক পালসের ধারাবাহিকতা গুনে কন্ট্রোল সিগন্যাল তৈরি ও প্রোগ্রাম কাউন্টার (PC) বাড়ানো।",
    sec5_tag: "মডিউল ৫ • স্লাইড ২২ থেকে ২৮",
    sec5_title: "The Processor Level: CPU ও ক্যাশ মেমরি (Cache)",
    sec5_desc: "প্রসেসরের অভ্যন্তরীণ আর্কিটেকচার (I-Unit ও E-Unit) এবং মেমরি হায়ারার্কিতে ক্যাশ মেমরির ভূমিকা।",
    cpu_arch_badge: "স্লাইড ২৩ এর মূল ডায়াগ্রাম",
    cpu_arch_title: "🏛️ CPU-এর অভ্যন্তরীণ গঠন: I-Unit বনাম Datapath E-Unit",
    cpu_arch_desc: "সিপিইউ দুটি প্রধান ভাগে বিভক্ত: কন্ট্রোল পার্ট (I-Unit) এবং এক্সিকিউশন পার্ট (Datapath E-Unit)।",
    cache_badge: "লাইভ মেমরি সিমুলেশন • স্লাইড ২৮",
    cache_title: "⚡ ক্যাশ মেমরি সিমুলেটর (Cache Hit vs. Cache Miss)",
    cache_desc: "প্রসেসর যখনই কোনো মেমরি ওয়ার্ড পড়তে চায়, প্রথমে ক্যাশে চেক করে। নিচে 'Cache Hit' ও 'Cache Miss' বাটন ক্লিক করে পার্থক্য দেখো!",
    btn_cache_hit: "🎯 Cache Hit সিমুলেট করো",
    btn_cache_miss: "🔍 Cache Miss সিমুলেট করো",
    sec6_tag: "মডিউল ৬ • স্লাইড ২৯ থেকে ৩২",
    sec6_title: "সিস্টেম বাস ও ইন্টারাপ্টস (System Bus & Interrupts)",
    sec6_desc: "কম্পিউটারের অভ্যন্তরীণ ৩টি বাস লাইন এবং ৪ প্রকার জরুরি ইন্টারাপ্ট সিগন্যাল।",
    bus_title: "🚌 সিস্টেম বাসের ৩টি প্রধান ভাগ (The 3 System Bus Types)",
    bus_desc: "বাসের প্রস্থ (Bus Width) হলো সমান্তরাল তারের সংখ্যা:",
    cbus_desc: "কন্ট্রোল ও টাইমিং সিগন্যাল বহন করে (Read, Write, Clock, Interrupt)",
    abus_desc: "নির্দিষ্ট মেমরি সেল বা I/O ডিভাইসের ঠিকানা নির্দেশ করে (একমুখী - Unidirectional)",
    dbus_desc: "আসল ডেটা এবং নির্দেশাবলী আদান-প্রদান করে (দ্বিমুখী - Bidirectional)",
    int_badge: "স্লাইড ৩২ এর মূল কনসেপ্ট",
    int_title: "🚨 ইন্টারাপ্ট কী ও এর ৪টি প্রকার (The 4 Types of Interrupts)",
    int_desc: "ইন্টারাপ্ট হলো সিপিইউ-এর মনোযোগ আকর্ষণের জন্য কোনো ডিভাইস বা প্রোগ্রাম থেকে পাঠানো জরুরি সিগন্যাল। নিচে ক্লিক করে ইন্টারাপ্ট ট্রিগার করো:",
    int_prog_desc: "ভাগ করতে গিয়ে শূন্য দিয়ে ভাগ করা (Divide by zero), অ্যারিথমেটিক ওভারফ্লো বা অবৈধ অপকোড এক্সিকিউট করার চেষ্টা।",
    btn_trig_div0: "ট্রিগার করো (Div by 0)",
    int_timer_desc: "অপারেটিং সিস্টেমের প্রি-এম্পটিভ টাইম-স্লাইসিংয়ের জন্য হার্ডওয়্যার টাইমার নির্দিষ্ট সময় পর পর সিপিইউ-কে ইন্টারাপ্ট করে।",
    btn_trig_timer: "ট্রিগার করো (Timer Tick)",
    int_io_desc: "কীবোর্ডের বাটন চাপলে, মাউস নড়াচড়া করলে বা প্রিন্টারে প্রিন্ট শেষ হলে I/O কন্ট্রোলার থেকে সিগন্যাল আসে।",
    btn_trig_key: "ট্রিগার করো (Key Pressed)",
    int_hw_desc: "বিদ্যুৎ চলে যাওয়া (Power loss), পাওয়ার সাপ্লাই ফেইলিউর বা মেমরির প্যারিটি এরর দেখা দিলে জরুরি ইন্টারাপ্ট ঘটে।",
    btn_trig_power: "ট্রিগার করো (Power Glitch)",
    isr_log_title: "সিপিইউ রেসপন্স মনিটর:",
    isr_log_default: "সিপিইউ স্বাভাবিক নির্দেশ রান করছে... কোনো ইন্টারাপ্ট পেন্ডিং নেই।",
    sec7_tag: "পরীক্ষা প্রস্তুতি • কুইজ জোন",
    sec7_title: "লেকচার ৩ এর স্ব-মূল্যায়ন টেস্ট (Lecture 3 Self Quiz)",
    sec7_desc: "লেকচার ৩ এর ডিজাইন মেথডোলজি, ফুল অ্যাডার, ক্যাশ মেমরি ও ইন্টারাপ্ট সম্পর্কে নিজের দক্ষতা যাচাই করে নাও!",
    quiz_score_prefix: "স্কোর:",
    btn_next_q: "পরবর্তী প্রশ্ন ➡️",
    cheat_title: "লেকচার ৩ এর ১০ মিনিটের কুইক রিভিশন সারাংশ (Exam Night Sheet)",
    cheat_l3_1: "<strong>অ্যানালাইসিস বনাম সিন্থেসিস:</strong> কাঠামো (Structure) ➔ আচরণ (Behavior) = Analysis; আচরণ ➔ কাঠামো = Synthesis (Design)।",
    cheat_l3_2: "<strong>৩টি ডিজাইন লেভেল:</strong> Gate Level (লজিক গেট, ফ্লিপ-ফ্লপ, বিটস, ps/ns) • Register Level (RTL, ওয়ার্ডস, ns/µs) • Processor Level (সিপিইউ, মেমরি, বাস, ms/s)।",
    cheat_l3_3: "<strong>ফুল অ্যাডার লজিক:</strong> c₀s₀ = x₀ + y₀ + c₋₁ • Sum = x ⊕ y ⊕ c₋₁ • Carry = xy + xc₋₁ + yc₋₁।",
    cheat_l3_4: "<strong>Combinational vs Sequential:</strong> কম্বিনেশনালে কোনো মেমরি নেই; সিকোয়েন্সিয়ালে Flip-Flop থাকে তাই আউটপুট বর্তমান ইনপুট + পূর্ববর্তী অবস্থার ওপর নির্ভরশীল।",
    cheat_l3_5: "<strong>Cache Memory:</strong> সিপিইউ ও মেইন মেমরির মাঝে দ্রুতগতির বাফার • Hit হলে Word Transfer, Miss হলে Block Transfer।",
    cheat_l3_6: "<strong>4 Types of Interrupts:</strong> Program, Timer, I/O, এবং Hardware Failure।",
    race_badge: "🏎️ মিনি-গেম • ল্যাটেন্সি ড্র্যাগ রেস",
    race_status_label: "স্ট্যাটাস:",
    race_title: "মেমরি হায়ারার্কি স্পিড রেস (Memory Latency Drag Race)",
    race_desc: "রেজিস্টার (0.5 ns), ক্যাশ (1 ns), র‍্যাম (100 ns) এবং এসএসডি (10,000,000 ns)-এর মধ্যে বাস্তব সময়ের গতির তুলনা! সিপিইউর ডেটা খুঁজতে কত সময় লাগে তা দেখতে নিচে যেকোনো মেমরি লেভেল সিলেক্ট করো।",
    race_lane_reg: "সিপিইউ রেজিস্টার (CPU Register)",
    race_lane_cache: "L1 / L2 ক্যাশ মেমরি (SRAM)",
    race_lane_dram: "মেইন মেমরি (DRAM)",
    race_lane_disk: "এসএসডি / ডিস্ক (NVMe / Disk)",
    btn_race_start: "🏁 স্পিড রেস শুরু করো!",
    vault_badge: "🎯 এক্সাম মাস্টার ভল্ট • DIU CSE",
    l3_math_title: "পরীক্ষার গাণিতিক সমস্যা ও মডেল সমাধান (Exam Math & Model Answers)",
    l3_math_sub: "ক্যাশ মেমরি অ্যাক্সেস টাইম (AMAT), ফুল অ্যাডার প্রপাগেশন ডিলে ও আই-ইউনিট বনাম ই-ইউনিট আর্কিটেকচার:",
    l3_p1_tag: "ম্যাথ প্রবলেম ১ • ব্লুমস লেভেল ৩ (Apply)",
    l3_p1_title: "Average Memory Access Time (AMAT) ও ক্যাশ হিট রেটের প্রভাব",
    l3_p1_statement: "<strong>প্রশ্ন:</strong> একটি প্রসেসরের L1 ক্যাশ মেমরির অ্যাক্সেস টাইম $T_c = 1.5\\text{ ns}$ এবং মেইন মেমরি অ্যাক্সেস টাইম (Miss Penalty) $T_m = 60\\text{ ns}$।<br>(ক) ক্যাশ হিট রেট $H = 96\\%$ ($0.96$) হলে গড় মেমরি অ্যাক্সেস টাইম ($T_{avg}$) কত?<br>(খ) হিট রেট কমে $H = 85\\%$ ($0.85$) হলে $T_{avg}$ কত এবং মেমরি কত শতাংশ স্লো হবে?",
    l3_p1_s1: "<strong>সূত্র:</strong> $T_{avg} = T_c + (1 - H) \\times T_m$",
    l3_p1_s2: "<strong>(ক) $H = 96\\%$ ($0.96$) এর জন্য:</strong>",
    l3_p1_s3: "Miss Rate = $1 - 0.96 = 0.04$",
    l3_p1_s4: "$T_{avg} = 1.5\\text{ ns} + (0.04 \\times 60\\text{ ns}) = 1.5 + 2.4 = 3.9\\text{ ns}$",
    l3_p1_s5: "<strong>(খ) $H = 85\\%$ ($0.85$) এর জন্য:</strong>",
    l3_p1_s6: "Miss Rate = $1 - 0.85 = 0.15$",
    l3_p1_s7: "$T_{avg} = 1.5\\text{ ns} + (0.15 \\times 60\\text{ ns}) = 1.5 + 9.0 = 10.5\\text{ ns}$",
    l3_p1_s8: "<strong>গতির অবনতি:</strong> $\\frac{10.5 - 3.9}{3.9} \\times 100\\% = 169.2\\%$",
    l3_p1_res: "✅ <strong>পরীক্ষার টেক-অ্যাওয়ে:</strong> মাত্র ১১% হিট রেট কমে গেলে মেমরি প্রায় ২.৭ গুণ ধীরগতির হয়ে যায়! পরীক্ষায় সূত্র ও একক (ns) স্পষ্ট করে লিখবে।",
    l3_p2_tag: "ম্যাথ প্রবলেম ২ • ব্লুমস লেভেল ৪ (Analyze)",
    l3_p2_title: "ফুল অ্যাডার সার্কিটের ক্রিটিকাল পাথ ও প্রপাগেশন ডিলে নির্ণয়",
    l3_p2_statement: "<strong>প্রশ্ন:</strong> ২টি হাফ-অ্যাডার ও ১টি OR গেট দিয়ে গঠিত ১-বিট ফুল অ্যাডারে XOR গেটের ডিলে $4\\text{ ns}$, AND গেটের ডিলে $3\\text{ ns}$ এবং OR গেটের ডিলে $2\\text{ ns}$। Sum ($S$) এবং Carry-out ($C_{out}$)-এর সর্বোচ্চ প্রপাগেশন ডিলে কত?",
    l3_p2_s1: "<strong>Sum লজিক:</strong> $S = A \\oplus B \\oplus C_{in}$ (শ্রেণিবদ্ধ ২টি XOR গেট)",
    l3_p2_s2: "↳ $t_{delay}(Sum) = t_{XOR1} + t_{XOR2} = 4\\text{ ns} + 4\\text{ ns} = 8\\text{ ns}$",
    l3_p2_s3: "<strong>Carry-out লজিক:</strong> $C_{out} = (A \\cdot B) + ((A \\oplus B) \\cdot C_{in})$",
    l3_p2_s4: "↳ পাথ ১ (HA1): $t_{AND1} + t_{OR} = 3\\text{ ns} + 2\\text{ ns} = 5\\text{ ns}$",
    l3_p2_s5: "↳ পাথ ২ (HA2 ক্রিটিকাল পাথ): $t_{XOR1} + t_{AND2} + t_{OR} = 4 + 3 + 2 = 9\\text{ ns}$",
    l3_p2_res: "✅ <strong>ফলাফল:</strong> Sum ডিলে = $8\\text{ ns}$; সর্বোচ্চ ক্রিটিকাল পাথ ডিলে ($C_{out}$) = <strong>9 ns</strong>।",
    l3_bp_title: "পরীক্ষার খাতায় আঁকার জন্য ১০০% পারফেক্ট ডায়াগ্রাম: Full Adder Gate-Level & I-Unit/E-Unit",
    l3_bp_tip: "💡 <strong>Exam Marking Tip:</strong> ফুল অ্যাডারের ক্ষেত্রে অভ্যন্তরীণ সিগন্যাল $S_1, C_1, C_2$ মার্ক করে সমীকরণ $S_1 = A \\oplus B$, $C_1 = AB$, $C_2 = S_1 \\cdot C_{in}$ এবং $C_{out} = C_1 + C_2$ লিখে দিলে ফুল মার্কস নিশ্চিত!",
    l3_fact_badge: "রোমাঞ্চকর অজানা তথ্য • Did You Know?",
    l3_fact_title: "\"The Memory Wall\" সংকট ও প্রসেসরের ক্যাশ মেমরি বিপ্লব!",
    l3_fact_body: "কম্পিউটার প্রযুক্তির ইতিহাসে ১৯৮০ থেকে ২০০০ সাল পর্যন্ত সিপিইউর কাজের গতি প্রতি বছর <strong>৫০%</strong> করে বেড়েছে, কিন্তু প্রধান মেমরি (DRAM)-এর অ্যাক্সেস স্পিড উন্নত হয়েছে মাত্র <strong>৭%</strong> হারে! এই বিশাল বৈষম্যকে কম্পিউটার বিজ্ঞানে <strong>\"The Memory Wall\"</strong> বলা হয়। যদি আধুনিক প্রসেসরে L1, L2 ও L3 ক্যাশ মেমরি না থাকত, তবে একটি আধুনিক ৪ গিগাহার্টজ প্রসেসর তার মোট কর্মসময়ের <strong>৮০% সময়ই অলস বসে থাকত</strong> শুধু র‍্যাম থেকে ডেটা পৌঁছানোর অপেক্ষায়! এই কারণেই আজকের আধুনিক প্রসেসর চিপের ৬০%-এরও বেশি সিলিকন জুড়ে থাকে শুধু ক্যাশ মেমরি!",
    analysis_title: "Analysis (বিশ্লেষণ)",
    synthesis_title: "Synthesis বা Design (সংশ্লেষণ)",
    btn_run_design: "▶ ডিজাইন চক্র টেস্ট করো",
    fc_loop_default: "💡 যদি গোল পূরণ না হয়, তাহলে ডিজাইন পরিবর্তন (Modify design) করে আবার ধাপে ২-এ ফিরে যাওয়া হয়!",
    comb_title: "Combinational Logic (কম্বিনেশনাল লজিক)",
    seq_title: "Sequential Logic (সিকোয়েন্সিয়াল লজিক)",
    i_unit_title: "ইনস্ট্রাকশন কন্ট্রোল পার্ট",
    i_unit_pc: "<strong>Program Counter (PC):</strong> পরবর্তী নির্দেশের মেমরি অ্যাড্রেস রাখে।",
    i_unit_ir: "<strong>Instruction Register (IR):</strong> মেমরি থেকে আনা নির্দেশ জমা রাখে।",
    i_unit_id: "<strong>Instruction Decoder:</strong> নির্দেশ অপকোড ডিকোড করে কন্ট্রোল সিগন্যাল তৈরি করে।",
    i_unit_ag: "<strong>Address Generation:</strong> মেমরির অ্যাড্রেস জেনারেট করে।",
    e_unit_title: "এক্সিকিউশন ও ডেটা প্রসেসিং পার্ট",
    e_unit_alu: "<strong>Arithmetic Logic Unit (ALU):</strong> মূল যোগ, বিয়োগ, লজিক্যাল অপারেশন সম্পন্ন করে।",
    e_unit_rf: "<strong>Register File:</strong> মধ্যবর্তী ডেটা ও অপারেন্ড সংরক্ষণের দ্রুতগতির রেজিস্টার গ্রুপ।",
    e_unit_store: "কন্ট্রোল সিগন্যাল পাওয়ার সাথে সাথে ডেটা প্রসেস করে ফলাফল স্টোর করে।",
    cache_narrator_default: "💡 'Cache Hit' অথবা 'Cache Miss' বাটনে ক্লিক করে ডেটা চলাচলের অ্যানিমেশন পর্যবেক্ষণ করো।",
    l3_bp_ascii: `[ ডায়াগ্রাম ১: ২টি Half Adder ও ১টি OR গেট দিয়ে 1-Bit Full Adder ]

            ┌──────────────┐
  A ────────┤              ├─── S1 (A⊕B) ──────┬──────────────┐
            │ Half Adder 1 │                   │ Half Adder 2 ├──────► SUM (S = S1⊕Cin)
  B ────────┤  (XOR + AND) ├─── C1 ──┐  Cin ───┤  (XOR + AND) │
            └──────────────┘         │         └──────┬───────┘
                                     │                │ C2 (S1·Cin)
                                     └───►┌─────┐◄────┘
                                          │ OR  ├────────────────────► CARRY (Cout = C1+C2)
                                          └─────┘

─────────────────────────────────────────────────────────────────────────────
[ ডায়াগ্রাম ২: John P. Hayes প্রসেসর লেভেল আর্কিটেকচার (I-Unit বনাম E-Unit) ]

┌───────────────────────────────────────────────────────────────────────────┐
│                       CENTRAL PROCESSING UNIT (CPU)                       │
│                                                                           │
│   ┌────────────────────────────────┐   ┌──────────────────────────────┐   │
│   │   Instruction Unit (I-Unit)    │   │   Execution Unit (E-Unit)    │   │
│   │  ────────────────────────────  │   │  ──────────────────────────  │   │
│   │  • Program Counter (PC)        │   │  • Arithmetic Logic (ALU)    │   │
│   │  • Instruction Register (IR)   ├──►│  • Accumulator (AC)          │   │
│   │  • Instruction Decoder & Logic │   │  • General Purpose Regs      │   │
│   │  [কাজের নির্দেশ আনে ও নিয়ন্ত্রণ করে] │   │  [গাণিতিক ও যৌক্তিক কাজ করে] │   │
│   └────────────────▲───────────────┘   └──────────────▲───────────────┘   │
└────────────────────┼──────────────────────────────────┼───────────────────┘
                     │ Controls / Address               │ Data Words
             ┌───────┴──────────────────────────────────┴───────┐
             │       SYSTEM BUS (Address, Data, Control)        │
             └───────┬──────────────────────────────────┬───────┘
                     ▼                                  ▼
           ┌───────────────────┐              ┌───────────────────┐
           │   CACHE MEMORY    │              │    MAIN MEMORY    │
           │  (High-Speed SRAM)│◄────────────►│      (DRAM)       │
           └───────────────────┘              └───────────────────┘`,
    footer_title: "কম্পিউটার আর্কিটেকচার অ্যান্ড অর্গানাইজেশন (CAO) — লেকচার ৩ মাস্টারক্লাস",
    footer_sub: "ডিজাইন করা হয়েছে স্পষ্টতা, গভীর বোধগম্যতা ও পরীক্ষার পূর্ণ প্রস্তুতির জন্য।"
  },
  en: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_design_process: "Design Process",
    nav_levels: "3 Design Levels",
    nav_gate: "Gate Level & Adder",
    nav_rtl: "Register Level (RTL)",
    nav_proc: "Processor & Cache",
    nav_bus: "Bus & Interrupts",
    nav_quiz: "Exam Quiz",
    nav_take_test: "Take Quiz",
    hero_badge: "Comprehensive Lecture 3 Interactive Masterclass",
    hero_title: 'Computer Design Methodology<br><span class="gradient-text">Gate Level, RTL, & Processor Level Architecture</span>',
    hero_subtitle: "From elementary logic gates and binary adders to RTL word manipulation and ultra-fast cache hierarchies—explore the complete engineering methodology of designing modern computers in our interactive simulators!",
    btn_watch_bangla_video: "Watch Bengali Voiceover Animated Lecture (1080p)",
    btn_watch_video: "Interactive Walkthrough (Walkthrough Video)",
    stat_process: "System Design Process",
    stat_levels: "3 Core Design Levels",
    stat_comb_seq: "Combinational & Sequential",
    stat_cache: "Cache & Interrupts",
    sec1_tag: "MODULE 1 • SLIDES 2 TO 9",
    sec1_title: "System Design & Methodology",
    sec1_desc: "A computer is a complex system composed of interconnected functional components. Explore Analysis versus Synthesis below.",
    analysis_def: "Given a system's <strong>structure (physical circuit interconnection)</strong>, determining its resulting <strong>function or behavior</strong> is termed <strong>Analysis</strong>.",
    synthesis_def: "Given a specified <strong>target behavior or function</strong>, determining a system <strong>structure</strong> that realizes it is termed <strong>Design or Synthesis</strong>.",
    iter_badge: "Interactive Flowchart • Slide 9",
    iter_title: "🔄 The Iterative Design Process",
    iter_desc: "Simulate how computer architects iteratively refine and balance system cost and performance to achieve design goals!",
    fc_step1: "Construct Initial Design",
    fc_step2: "Evaluate Cost & Performance",
    fc_step3: "Are Design Goals Met?",
    fc_step4: "Final Production (End)",
    sec2_tag: "MODULE 2 • SLIDES 10 & 11",
    sec2_title: "The 3 Design Levels (John P. Hayes)",
    sec2_desc: "This fundamental 3-level design taxonomy is one of the highest-yield questions on DIU computer architecture examinations!",
    levels_table_title: "📋 Master Comparison Table of the 3 Design Levels (Slide 11)",
    levels_table_sub: "From silicon gates to system-level processor pipelines:",
    th_level: "Design Level",
    th_components: "Core Components",
    th_density: "IC Density",
    th_info_units: "Information Units",
    th_time_units: "Time Units",
    gate_comp: "Logic gates (AND, OR, NOT, XOR), Flip-Flops",
    gate_info: "Bits (0 & 1)",
    reg_comp: "Registers, Counters, Multiplexers, Decoders, Adders, ALUs",
    reg_info: "Words / Vectors",
    proc_comp: "CPUs, Main Memory, Cache, I/O Devices, System Buses",
    proc_info: "Blocks of Words",
    sec3_tag: "MODULE 3 • SLIDES 12 TO 19",
    sec3_title: "The Gate Level: Logic Gates, Full Adders & Flip-Flops",
    sec3_desc: "Memoryless Combinational Logic versus Clocked Sequential Flip-Flop Storage.",
    fa_badge: "Live Binary Calculator • Slide 15",
    fa_title: "🧮 Interactive Full Adder Simulator",
    fa_desc: "Click and toggle inputs A, B, and Cin to observe how the Sum (S) and Carry Out (C0) outputs update instantly according to binary arithmetic!",
    sop_pos_title: "📌 Sum-of-Products (SOP) & Product-of-Sums (POS) Equations (Slide 16):",
    comb_desc: "Combinational logic circuits are completely <strong>memoryless</strong>. The output depends strictly on the current input combination.<br><strong>Components:</strong> AND, OR, NOT, XOR, and Full Adders.",
    seq_desc: "Adding <strong>1-bit memory elements (Flip-Flops)</strong> to combinational logic yields a Sequential Circuit. The output depends on current inputs AND <em>past stored internal state</em>.",
    sec4_tag: "MODULE 4 • SLIDES 20 & 21",
    sec4_title: "The Register Level (RTL): Words & Functional Units",
    sec4_desc: "At the register-transfer level, related binary bits are aggregated into ordered sets called Words or Vectors.",
    mux_desc: "<strong>Data Routing:</strong> A selector switch routing one of several input data lines into a single output channel.",
    decoder_desc: "<strong>Code Checking & Conversion:</strong> Translates binary code words to activate memory locations or device lines.",
    shift_reg_desc: "<strong>Information Storage & Conversion:</strong> Temporarily holds data words and performs serial-to-parallel bit conversion.",
    counter_desc: "<strong>Control & Timing Generation:</strong> Counts clock pulse transitions to generate control signals and update the Program Counter (PC).",
    sec5_tag: "MODULE 5 • SLIDES 22 TO 28",
    sec5_title: "The Processor Level: CPU & Cache Memory",
    sec5_desc: "Internal organization of the CPU (I-Unit and E-Unit) and the speed buffering of Cache Memory hierarchies.",
    cpu_arch_badge: "Slide 23 Architecture Diagram",
    cpu_arch_title: "🏛️ CPU Internal Structure: I-Unit vs. Datapath E-Unit",
    cpu_arch_desc: "The CPU is split into instruction sequencing (I-Unit) and operational datapath (E-Unit).",
    cache_badge: "Live Memory Simulation • Slide 28",
    cache_title: "⚡ Cache Memory Simulator (Cache Hit vs. Cache Miss)",
    cache_desc: "When the processor requests a memory word, it queries the cache first. Click 'Cache Hit' and 'Cache Miss' to observe the difference in latency and transfer type!",
    btn_cache_hit: "🎯 Simulate Cache Hit",
    btn_cache_miss: "🔍 Simulate Cache Miss",
    sec6_tag: "MODULE 6 • SLIDES 29 TO 32",
    sec6_title: "System Bus & Interrupts",
    sec6_desc: "The 3 functional bus categories connecting components and the 4 critical interrupt classes.",
    bus_title: "🚌 The 3 Functional System Bus Lines (Slide 30 & 31)",
    bus_desc: "Bus Width defines the number of parallel communication wires:",
    cbus_desc: "Carries timing, synchronization, and control directives (Read, Write, Clock, Interrupt).",
    abus_desc: "Specifies source/destination memory or I/O address (Unidirectional from CPU).",
    dbus_desc: "Transfers instruction words and computational data operands (Bidirectional).",
    int_badge: "Slide 32 Core Architecture",
    int_title: "🚨 The 4 Types of Interrupts (Slide 32)",
    int_desc: "An interrupt is an urgent signal from a device or internal trap seeking immediate CPU attention. Trigger each interrupt class below:",
    int_prog_desc: "Triggered by arithmetic overflow, division by zero, or illegal instruction opcode execution.",
    btn_trig_div0: "Trigger (Div by 0)",
    int_timer_desc: "Generated periodically by internal hardware timers to enforce OS preemptive multitasking time slices.",
    btn_trig_timer: "Trigger (Timer Tick)",
    int_io_desc: "Signals from I/O controllers indicating keyboard keystrokes, mouse motion, or printer completion.",
    btn_trig_key: "Trigger (Key Pressed)",
    int_hw_desc: "Urgent alarm indicating catastrophic power supply failure or memory parity error.",
    btn_trig_power: "Trigger (Power Glitch)",
    isr_log_title: "CPU Interrupt Response Monitor:",
    isr_log_default: "CPU executing normal instructions... No interrupt pending.",
    sec7_tag: "EXAM MASTERY • QUIZ ZONE",
    sec7_title: "Lecture 3 Self-Assessment Quiz",
    sec7_desc: "Test your mastery of Lecture 3 design levels, full adders, cache hierarchies, and interrupts!",
    quiz_score_prefix: "Score:",
    btn_next_q: "Next Question ➡️",
    cheat_title: "Lecture 3: 10-Minute Exam Night Quick Revision Sheet",
    cheat_l3_1: "<strong>Analysis vs Synthesis:</strong> Structure ➔ Behavior = Analysis; Behavior ➔ Structure = Synthesis (Design).",
    cheat_l3_2: "<strong>3 Design Levels:</strong> Gate Level (Gates/Flip-flops, Bits, ps/ns) • Register Level (RTL, Words, ns/µs) • Processor Level (CPU/Memory/Bus, Blocks, ms/s).",
    cheat_l3_3: "<strong>Full Adder:</strong> c₀s₀ = x₀ + y₀ + c₋₁ • Sum = x ⊕ y ⊕ c₋₁ • Carry = xy + xc₋₁ + yc₋₁.",
    cheat_l3_4: "<strong>Combinational vs Sequential:</strong> Combinational is memoryless; Sequential incorporates Flip-Flops so output depends on present input + past internal state.",
    cheat_l3_5: "<strong>Cache Memory:</strong> High-speed buffer between CPU and Main Memory • Hit = Word Transfer (Fast); Miss = Block Transfer from M (Slower).",
    cheat_l3_6: "<strong>4 Types of Interrupts:</strong> Program, Timer, I/O, and Hardware Failure.",
    race_badge: "🏎️ MINI-GAME • LATENCY DRAG RACE",
    race_status_label: "Status:",
    race_title: "Memory Hierarchy Speed Race (Memory Latency Drag Race)",
    race_desc: "Real-time latency comparison across Register (0.5 ns), Cache (1 ns), RAM (100 ns), and NVMe SSD (10,000,000 ns)! Select any memory hierarchy tier below to visualize how long the CPU stalls waiting for data.",
    race_lane_reg: "CPU Register",
    race_lane_cache: "L1 / L2 Cache Memory (SRAM)",
    race_lane_dram: "Main Memory (DRAM)",
    race_lane_disk: "SSD / Storage Disk (NVMe)",
    btn_race_start: "🏁 Start Latency Race!",
    vault_badge: "🎯 EXAM MASTER VAULT • DIU CSE",
    l3_math_title: "Exam Mathematical Problems & Model Answers",
    l3_math_sub: "Average Memory Access Time (AMAT), Full Adder Propagation Delay & I-Unit/E-Unit Blueprint:",
    l3_p1_tag: "MATH PROBLEM 1 • BLOOM'S LEVEL 3 (Apply)",
    l3_p1_title: "Average Memory Access Time (AMAT) & Impact of Cache Hit Rate",
    l3_p1_statement: "<strong>Question:</strong> A processor has an L1 cache access latency $T_c = 1.5\\text{ ns}$ and main memory access latency (Miss Penalty) $T_m = 60\\text{ ns}$.<br>(a) If cache hit rate $H = 96\\%$ ($0.96$), calculate the Average Memory Access Time ($T_{avg}$).<br>(b) If hit rate drops to $H = 85\\%$ ($0.85$), calculate $T_{avg}$ and the percentage degradation in memory speed.",
    l3_p1_s1: "<strong>Formula:</strong> $T_{avg} = T_c + (1 - H) \\times T_m$",
    l3_p1_s2: "<strong>(a) For $H = 96\\%$ ($0.96$):</strong>",
    l3_p1_s3: "Miss Rate = $1 - 0.96 = 0.04$",
    l3_p1_s4: "$T_{avg} = 1.5\\text{ ns} + (0.04 \\times 60\\text{ ns}) = 1.5 + 2.4 = 3.9\\text{ ns}$",
    l3_p1_s5: "<strong>(b) For $H = 85\\%$ ($0.85$):</strong>",
    l3_p1_s6: "Miss Rate = $1 - 0.85 = 0.15$",
    l3_p1_s7: "$T_{avg} = 1.5\\text{ ns} + (0.15 \\times 60\\text{ ns}) = 1.5 + 9.0 = 10.5\\text{ ns}$",
    l3_p1_s8: "<strong>Speed Degradation:</strong> $\\frac{10.5 - 3.9}{3.9} \\times 100\\% = 169.2\\%$",
    l3_p1_res: "✅ <strong>Exam Takeaway:</strong> A mere 11% reduction in hit rate makes memory access ~2.7× slower! Clearly state formula and units (ns) in your answer.",
    l3_p2_tag: "MATH PROBLEM 2 • BLOOM'S LEVEL 4 (Analyze)",
    l3_p2_title: "Full Adder Circuit Critical Path & Propagation Delay Analysis",
    l3_p2_statement: "<strong>Question:</strong> In a 1-bit full adder constructed using 2 half-adders and 1 OR gate, the gate propagation delays are: XOR gate = $4\\text{ ns}$, AND gate = $3\\text{ ns}$, and OR gate = $2\\text{ ns}$. Determine the worst-case propagation delays for Sum ($S$) and Carry-out ($C_{out}$).",
    l3_p2_s1: "<strong>Sum Logic:</strong> $S = A \\oplus B \\oplus C_{in}$ (2 cascaded XOR gates)",
    l3_p2_s2: "↳ $t_{delay}(Sum) = t_{XOR1} + t_{XOR2} = 4\\text{ ns} + 4\\text{ ns} = 8\\text{ ns}$",
    l3_p2_s3: "<strong>Carry-out Logic:</strong> $C_{out} = (A \\cdot B) + ((A \\oplus B) \\cdot C_{in})$",
    l3_p2_s4: "↳ Path 1 (HA1): $t_{AND1} + t_{OR} = 3\\text{ ns} + 2\\text{ ns} = 5\\text{ ns}$",
    l3_p2_s5: "↳ Path 2 (HA2 Critical Path): $t_{XOR1} + t_{AND2} + t_{OR} = 4 + 3 + 2 = 9\\text{ ns}$",
    l3_p2_res: "✅ <strong>Result:</strong> Sum delay = $8\\text{ ns}$; Critical Path delay ($C_{out}$) = <strong>9 ns</strong>.",
    l3_bp_title: "100% Exam-Accurate Diagrams: Full Adder Gate-Level & I-Unit/E-Unit",
    l3_bp_tip: "💡 <strong>Exam Marking Tip:</strong> When drawing the full adder, always label internal nodes $S_1, C_1, C_2$ and write the equations $S_1 = A \\oplus B$, $C_1 = AB$, $C_2 = S_1 \\cdot C_{in}$, and $C_{out} = C_1 + C_2$ for full marks!",
    l3_fact_badge: "DID YOU KNOW? • HARDWARE REVELATION",
    l3_fact_title: "\"The Memory Wall\" Crisis & The CPU Cache Revolution!",
    l3_fact_body: "Between 1980 and 2000, CPU compute performance grew at an astounding <strong>50% per year</strong>, whereas main memory (DRAM) access speeds improved by only <strong>7% annually</strong>! This widening performance chasm is known in computer architecture as <strong>\"The Memory Wall\"</strong>. Without on-die L1, L2, and L3 SRAM caches, a modern 4 GHz processor would spend over <strong>80% of its execution cycles completely stalled</strong> waiting for RAM data. That is why over 60% of modern processor die silicon is dedicated entirely to cache memory!",
    analysis_title: "Analysis (Structural Inference)",
    synthesis_title: "Synthesis or Design (Target Realization)",
    btn_run_design: "▶ Test Iterative Design Cycle",
    fc_loop_default: "💡 If performance or cost goals are not met, engineers modify design parameters and repeat cycle from Step 2!",
    comb_title: "Combinational Logic (Memoryless)",
    seq_title: "Sequential Logic (Clocked / State-Preserving)",
    i_unit_title: "Instruction Sequencing & Control Unit",
    i_unit_pc: "<strong>Program Counter (PC):</strong> Holds the memory address of the next sequential instruction.",
    i_unit_ir: "<strong>Instruction Register (IR):</strong> Holds the operational opcode fetched from memory.",
    i_unit_id: "<strong>Instruction Decoder:</strong> Decodes machine opcodes into micro-control signals.",
    i_unit_ag: "<strong>Address Generation:</strong> Calculates effective operand addresses in memory.",
    e_unit_title: "Execution Datapath & Processing Unit",
    e_unit_alu: "<strong>Arithmetic Logic Unit (ALU):</strong> Performs core binary additions, subtractions, and logical ops.",
    e_unit_rf: "<strong>Register File:</strong> High-speed temporary scratchpad registers for intermediate operands.",
    e_unit_store: "Executes hardware operations and stores results upon receiving control strobes.",
    cache_narrator_default: "💡 Click 'Simulate Cache Hit' or 'Simulate Cache Miss' to observe real-time data bus flows.",
    l3_bp_ascii: `[ Diagram 1: 1-Bit Full Adder constructed using 2 Half Adders & 1 OR Gate ]

            ┌──────────────┐
  A ────────┤              ├─── S1 (A⊕B) ──────┬──────────────┐
            │ Half Adder 1 │                   │ Half Adder 2 ├──────► SUM (S = S1⊕Cin)
  B ────────┤  (XOR + AND) ├─── C1 ──┐  Cin ───┤  (XOR + AND) │
            └──────────────┘         │         └──────┬───────┘
                                     │                │ C2 (S1·Cin)
                                     └───►┌─────┐◄────┘
                                          │ OR  ├────────────────────► CARRY (Cout = C1+C2)
                                          └─────┘

─────────────────────────────────────────────────────────────────────────────
[ Diagram 2: John P. Hayes Processor-Level Architecture (I-Unit vs E-Unit) ]

┌───────────────────────────────────────────────────────────────────────────┐
│                       CENTRAL PROCESSING UNIT (CPU)                       │
│                                                                           │
│   ┌────────────────────────────────┐   ┌──────────────────────────────┐   │
│   │   Instruction Unit (I-Unit)    │   │   Execution Unit (E-Unit)    │   │
│   │  ────────────────────────────  │   │  ──────────────────────────  │   │
│   │  • Program Counter (PC)        │   │  • Arithmetic Logic (ALU)    │   │
│   │  • Instruction Register (IR)   ├──►│  • Accumulator (AC)          │   │
│   │  • Instruction Decoder & Logic │   │  • General Purpose Regs      │   │
│   │  [Fetches & Sequences Control] │   │  [Performs Data Computations]│   │
│   └────────────────▲───────────────┘   └──────────────▲───────────────┘   │
└────────────────────┼──────────────────────────────────┼───────────────────┘
                     │ Controls / Address               │ Data Words
             ┌───────┴──────────────────────────────────┴───────┐
             │       SYSTEM BUS (Address, Data, Control)        │
             └───────┬──────────────────────────────────┬───────┘
                     ▼                                  ▼
           ┌───────────────────┐              ┌───────────────────┐
           │   CACHE MEMORY    │              │    MAIN MEMORY    │
           │  (High-Speed SRAM)│◄────────────►│      (DRAM)       │
           └───────────────────┘              └───────────────────┘`,
    footer_title: "Computer Architecture and Organization (CAO) — Lecture 3 Masterclass",
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

// --- 3. Iterative Design Process Simulator ---
const btnRunDesignCycle = document.getElementById('btnRunDesignCycle');
const fcStep1 = document.getElementById('fcStep1');
const fcStep2 = document.getElementById('fcStep2');
const fcStep3 = document.getElementById('fcStep3');
const fcStep4 = document.getElementById('fcStep4');
const fcLoopNote = document.getElementById('fcLoopNote');

if (btnRunDesignCycle) {
  let isRunningCycle = false;
  btnRunDesignCycle.addEventListener('click', () => {
    if (isRunningCycle) return;
    isRunningCycle = true;
    sounds.clockPulse();

    const isBn = currentLang === 'bn';
    btnRunDesignCycle.disabled = true;

    // Reset steps
    [fcStep1, fcStep2, fcStep3, fcStep4].forEach(s => s.classList.remove('active'));

    // Step 1
    fcStep1.classList.add('active');
    fcLoopNote.textContent = isBn 
      ? "ধাপ ১: স্পেসিফিকেশন অনুযায়ী প্রাথমিক সার্কিট মডেল তৈরি করা হচ্ছে..." 
      : "Step 1: Constructing initial structural hardware architecture...";

    // Step 2
    setTimeout(() => {
      sounds.clockPulse();
      fcStep1.classList.remove('active');
      fcStep2.classList.add('active');
      fcLoopNote.textContent = isBn 
        ? "ধাপ ২: সার্কিটের খরচ (Cost) এবং অপারেশনাল স্পিড (Performance) সিমুলেশন চলছে..." 
        : "Step 2: Evaluating IC cost, power consumption, and clock cycle latency...";
    }, 900);

    // Step 3 (Loop iteration 1: Goals NOT met)
    setTimeout(() => {
      sounds.wrongBuzz();
      fcStep2.classList.remove('active');
      fcStep3.classList.add('active');
      fcLoopNote.textContent = isBn 
        ? "⚠️ লক্ষ্য পূরণ হয়নি! ক্লক লেটেন্সি বেশি। ডিজাইন মডিফাই করে আবার ধাপে ২-এ ফিরে যাওয়া হলো!" 
        : "⚠️ Design goals NOT met! Modifying architecture and returning to Step 2...";
    }, 1800);

    // Step 3 (Loop iteration 2: Goals MET)
    setTimeout(() => {
      sounds.clockPulse();
      fcLoopNote.textContent = isBn 
        ? "🔄 মডিফাইড ডিজাইন সফলভাবে লক্ষ্য পূরণ করেছে (Goals Met: YES)!" 
        : "🔄 Refined architecture successfully meets performance criteria (Goals Met: YES)!";
    }, 2800);

    // Step 4 (Production Approval)
    setTimeout(() => {
      sounds.correctChime();
      fcStep3.classList.remove('active');
      fcStep4.classList.add('active');
      fcLoopNote.textContent = isBn 
        ? "🎉 সফল সমাপ্তি (End): চিপটি সিলিকন ফ্যাব্রিকেশন ও উৎপাদনের জন্য অনুমোদিত!" 
        : "🎉 Success (End): Architecture validated for silicon fabrication and deployment!";
      btnRunDesignCycle.disabled = false;
      isRunningCycle = false;
    }, 3800);
  });
}

// --- 4. Interactive Full Adder Simulator ---
const btnInputA = document.getElementById('btnInputA');
const btnInputB = document.getElementById('btnInputB');
const btnInputCin = document.getElementById('btnInputCin');
const bitValA = document.getElementById('bitValA');
const bitValB = document.getElementById('bitValB');
const bitValCin = document.getElementById('bitValCin');
const outSum = document.getElementById('outSum');
const outCarry = document.getElementById('outCarry');
const sumBox = document.getElementById('sumBox');
const carryBox = document.getElementById('carryBox');

let inputA = 0;
let inputB = 0;
let inputCin = 0;

function updateFullAdder() {
  // Binary Full Adder Logic:
  // Sum = A XOR B XOR Cin
  // Carry = (A AND B) OR (Cin AND (A XOR B))
  const sum = inputA ^ inputB ^ inputCin;
  const carry = (inputA & inputB) | (inputCin & (inputA ^ inputB));

  outSum.textContent = sum;
  outCarry.textContent = carry;

  if (sum === 1) {
    sumBox.classList.add('bit-on');
  } else {
    sumBox.classList.remove('bit-on');
  }

  if (carry === 1) {
    carryBox.classList.add('bit-on');
  } else {
    carryBox.classList.remove('bit-on');
  }
}

function setupBitToggle(btn, bitValSpan, getVal, setVal) {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const newVal = getVal() === 0 ? 1 : 0;
    setVal(newVal);
    bitValSpan.textContent = newVal;
    btn.dataset.val = newVal;
    sounds.bitToggle(newVal === 1);

    if (newVal === 1) {
      btn.classList.add('bit-high');
    } else {
      btn.classList.remove('bit-high');
    }

    updateFullAdder();
  });
}

setupBitToggle(btnInputA, bitValA, () => inputA, v => inputA = v);
setupBitToggle(btnInputB, bitValB, () => inputB, v => inputB = v);
setupBitToggle(btnInputCin, bitValCin, () => inputCin, v => inputCin = v);

// --- 5. Interactive Cache Hit vs Miss Simulator ---
const btnCacheHit = document.getElementById('btnCacheHit');
const btnCacheMiss = document.getElementById('btnCacheMiss');
const nodeCPU = document.getElementById('nodeCPU');
const nodeCache = document.getElementById('nodeCache');
const nodeMain = document.getElementById('nodeMain');
const chanCache = document.getElementById('chanCache');
const chanMain = document.getElementById('chanMain');
const cacheNarrator = document.getElementById('cacheNarrator');

function clearCacheAnimation() {
  [nodeCPU, nodeCache, nodeMain].forEach(n => {
    n.classList.remove('active-hit', 'active-miss');
  });
  [chanCache, chanMain].forEach(c => c.classList.remove('channel-active'));
}

if (btnCacheHit) {
  btnCacheHit.addEventListener('click', () => {
    sounds.cacheHit();
    clearCacheAnimation();
    const isBn = currentLang === 'bn';

    nodeCPU.classList.add('active-hit');
    nodeCache.classList.add('active-hit');
    chanCache.classList.add('channel-active');

    cacheNarrator.innerHTML = isBn 
      ? "🎯 <strong>CACHE HIT:</strong> কাঙ্ক্ষিত ওয়ার্ডটি (Address 0x4A) ক্যাশ মেমরিতে পাওয়া গেছে! মেইন মেমরিতে না গিয়ে মাত্র <strong>১ ন্যানোসেকেন্ডে</strong> ওয়ার্ডটি সরাসরি CPU-তে চলে এলো।"
      : "🎯 <strong>CACHE HIT:</strong> Requested word (0x4A) found resident in Cache! Immediate Word Transfer completed in only <strong>1 ns</strong> with zero DRAM access delay.";
  });
}

if (btnCacheMiss) {
  btnCacheMiss.addEventListener('click', () => {
    sounds.cacheMiss();
    clearCacheAnimation();
    const isBn = currentLang === 'bn';

    nodeCPU.classList.add('active-miss');
    nodeCache.classList.add('active-miss');

    cacheNarrator.innerHTML = isBn
      ? "🔍 <strong>CACHE MISS:</strong> ক্যাশে ওয়ার্ডটি নেই! ক্যাশ কন্ট্রোলার Main Memory (M)-কে রিকোয়েস্ট পাঠাল..."
      : "🔍 <strong>CACHE MISS:</strong> Word not resident in Cache! Controller redirects fetch request to Main Memory (M)...";

    setTimeout(() => {
      nodeMain.classList.add('active-miss');
      chanMain.classList.add('channel-active');
      cacheNarrator.innerHTML = isBn
        ? "📦 মেইন মেমরি থেকে একগুচ্ছ ওয়ার্ড (Block Transfer - 50 ns) ক্যাশে কপি করে আনা হলো..."
        : "📦 DRAM completes a Block Transfer (50 ns) uploading the memory block into Cache...";
    }, 700);

    setTimeout(() => {
      chanCache.classList.add('channel-active');
      sounds.correctChime();
      cacheNarrator.innerHTML = isBn
        ? "✅ ক্যাশ আপডেট সম্পন্ন! এখন ক্যাশ থেকে কাঙ্ক্ষিত ওয়ার্ডটি অতি দ্রুত CPU-তে ডেলিভারি হলো।"
        : "✅ Cache updated! Requested word is now delivered into CPU register file from the newly loaded cache block.";
    }, 1500);
  });
}

// --- 6. Interrupts Simulator ---
const intTriggers = document.querySelectorAll('.int-trigger');
const intLogText = document.getElementById('intLogText');

const interruptResponses = {
  Program: {
    bn: "⚠️ [Program Interrupt Detected]: শূন্য দিয়ে ভাগ করার (Div by 0) চেষ্টা করা হয়েছে! CPU বর্তমান প্রসেস থামাল, ফ্ল্যাগ রেজিস্টার সেভ করল এবং এরর ট্র্যাপ রুটিনে জাম্প করল।",
    en: "⚠️ [Program Interrupt Detected]: Arithmetic Divide by Zero trap triggered! CPU halted user code, saved Program Counter (PC), and branched to the kernel trap handler."
  },
  Timer: {
    bn: "⏱️ [Timer Interrupt Fired]: অপারেটিং সিস্টেমের টাইম-স্লাইস শেষ! CPU বর্তমান টাস্কের স্টেট মেমরিতে সেভ করল এবং পরবর্তী প্রসেসকে সিপিইউ বরাদ্দ করল (Preemptive Scheduling)।",
    en: "⏱️ [Timer Interrupt Fired]: OS quantum expired! CPU preserved thread register context and invoked the kernel dispatcher for round-robin preemptive multitasking."
  },
  IO: {
    bn: "⌨️ [I/O Interrupt Received]: কীবোর্ড বাফার রেডি! CPU চলমান হিসাব সামান্য পজ করে বাফার থেকে ক্যারেক্টার পড়ল এবং কীবোর্ড কন্ট্রোলারকে ACK সিগন্যাল দিল।",
    en: "⌨️ [I/O Interrupt Received]: Keystroke event pending! CPU acknowledged interrupt controller, buffered ASCII scan-code, and resumed normal execution."
  },
  Hardware: {
    bn: "🔥 [CRITICAL Hardware Failure]: পাওয়ার ড্রপ / মেমরি প্যারিটি এরর! CPU অবিলম্বে ক্রিটিক্যাল ডাটা ক্যাশ থেকে NVRAM-এ ফ্ল্যাশ করে সেফ শাটডাউন মোডে গেল।",
    en: "🔥 [CRITICAL Hardware Failure]: Voltage drop / ECC parity failure! Non-maskable interrupt (NMI) triggered emergency register cache flush to non-volatile storage."
  }
};

intTriggers.forEach(btn => {
  btn.addEventListener('click', () => {
    sounds.interruptAlert();
    const type = btn.dataset.type;

    document.querySelectorAll('.int-card').forEach(c => c.classList.remove('triggered'));
    const parentCard = btn.closest('.int-card');
    if (parentCard) parentCard.classList.add('triggered');

    if (intLogText) {
      intLogText.textContent = interruptResponses[type][currentLang];
    }
  });
});

// --- 7. Bilingual Quiz Engine (Lecture 3) ---
const quizData = {
  bn: [
    {
      question: "সিস্টেমের 'কাঠামো বা সার্কিট' জানা থাকলে তার 'কাজ বা আচরণ' বের করার প্রক্রিয়াকে কী বলে?",
      options: [
        "Synthesis (সংশ্লেষণ)",
        "Analysis (বিশ্লেষণ)",
        "Compilation",
        "Modulation"
      ],
      answer: 1,
      explanation: "স্লাইড ৮ অনুযায়ী: Given a system's structure, determining its function or behavior is termed Analysis। আর তার উল্টোটা (Behavior থেকে Structure তৈরি) হলো Synthesis বা Design।"
    },
    {
      question: "জন পি. হেইজের ৩টি ডিজাইন লেভেলের মধ্যে 'Register Level (RTL)'-এ তথ্যের মূল একক (Information Unit) কোনটি?",
      options: [
        "Bits (শুধুমাত্র ০ এবং ১)",
        "Words বা Vectors",
        "Blocks of Words",
        "Gigabytes"
      ],
      answer: 1,
      explanation: "স্লাইড ১১-এর মাস্টার চার্ট অনুযায়ী: Gate Level-এ তথ্যের একক হলো Bits, Register Level-এ Words/Vectors, এবং Processor Level-এ Blocks of Words।"
    },
    {
      question: "একটি ১-বিট ফুল অ্যাডার (Full Adder) সার্কিটের মূল গাণিতিক কাজ কী?",
      options: [
        "একসাথে ১০টি ছবি প্রসেস করা",
        "৩টি ইনপুট বিটের যোগফল নির্ণয় করা (c₀s₀ = x₀ + y₀ + c₋₁)",
        "মেমরি থেকে গান বাজানো",
        "শুধুমাত্র গুণ ও ভাগ করা"
      ],
      answer: 1,
      explanation: "স্লাইড ১৪ ও ১৫ অনুযায়ী: Full Adder সার্কিট ৩টি বাইনারি বিটের (x₀, y₀ এবং পূর্ববর্তী carry c₋₁) গাণিতিক যোগ সম্পন্ন করে Sum (s₀) এবং Carry Out (c₀) প্রদান করে।"
    },
    {
      question: "ক্যাশ মেমরির ক্ষেত্রে 'Cache Miss' হলে প্রসেসর ও মেমরির মাঝে কোন ধরনের ডেটা ট্রান্সফার ঘটে?",
      options: [
        "ক্যাশ মেমরি বন্ধ হয়ে যায়",
        "মেইন মেমরি থেকে পুরো একগুচ্ছ ওয়ার্ড ক্যাশে আনা হয় (Block Transfer)",
        "কম্পিউটার তৎক্ষণাৎ রিস্টার্ট নেয়",
        "কীবোর্ড থেকে নতুন কোড লিখতে হয়"
      ],
      answer: 1,
      explanation: "স্লাইড ২৮ অনুযায়ী: Cache Miss হলে Main Memory থেকে নির্দিষ্ট সংখ্যক ওয়ার্ডের একটি পুরো ব্লক ক্যাশ মেমরিতে কপি করা হয় (Block Transfer), তারপর ক্যাশ থেকে কাঙ্ক্ষিত ওয়ার্ডটি সিপিইউ-তে যায়।"
    },
    {
      question: "নিচের কোনটি কম্পিউটারের ৪ প্রকার ইন্টারাপ্ট (Interrupts)-এর একটি নয়?",
      options: [
        "Program Interrupt (যেমন: শূন্য দিয়ে ভাগ করা)",
        "Timer Interrupt (টাইম-স্লাইসিং)",
        "Musical Rhythm Interrupt",
        "Hardware Failure Interrupt (পাওয়ার ফেইলিউর)"
      ],
      answer: 2,
      explanation: "স্লাইড ৩২ অনুযায়ী ৪ প্রকার ইন্টারাপ্ট হলো: ১. Program, ২. Timer, ৩. Input/Output, এবং ৪. Hardware failure। 'Musical Rhythm' কোনো ইন্টারাপ্ট নয়।"
    }
  ],
  en: [
    {
      question: "Given a system's physical structure, determining its resulting function or behavior is termed:",
      options: [
        "Synthesis (Design)",
        "Analysis",
        "Compilation",
        "Modulation"
      ],
      answer: 1,
      explanation: "Slide 8 defines: Given a system's structure, determining its function or behavior is termed Analysis. The converse problem (determining structure from behavior) is Synthesis/Design."
    },
    {
      question: "According to Hayes' 3 Design Levels taxonomy, what is the Information Unit processed at the Register Level (RTL)?",
      options: [
        "Bits (0 and 1)",
        "Words / Vectors",
        "Blocks of Words",
        "Gigabytes"
      ],
      answer: 1,
      explanation: "Slide 11 master table outlines: Gate Level processes Bits; Register Level (RTL) processes Words/Vectors; Processor Level processes Blocks of Words."
    },
    {
      question: "What mathematical operation is executed by a single-bit Full Adder logic circuit?",
      options: [
        "Encoding high-definition video frames",
        "Computing the arithmetic sum of three binary input bits: c₀s₀ = x₀ + y₀ + c₋₁",
        "Generating hardware clock pulses",
        "Matrix tensor multiplication"
      ],
      answer: 1,
      explanation: "Slides 14 & 15 state: A Full Adder computes the numerical sum of its three input bits (x₀, y₀, and carry-in c₋₁) using binary arithmetic to produce Sum (s₀) and Carry-out (c₀)."
    },
    {
      question: "When a 'Cache Miss' occurs in memory hierarchy access, what type of transfer is initiated?",
      options: [
        "The computer undergoes a cold hardware reboot",
        "A block of words is transferred from Main Memory into the Cache (Block Transfer)",
        "The cache memory shuts down permanently",
        "The CPU switches off its instruction decoder"
      ],
      answer: 1,
      explanation: "Slide 28 states: If the word is not in cache (Cache Miss), a block of main memory consisting of a fixed number of words is transferred into the cache (Block Transfer), followed by word delivery to the CPU."
    },
    {
      question: "Which of the following is NOT one of the 4 standard classes of Interrupts defined in computer systems?",
      options: [
        "Program Interrupt (e.g., Arithmetic overflow or divide by zero)",
        "Timer Interrupt (OS time-slice preemption)",
        "Acoustic Melody Interrupt",
        "Hardware Failure Interrupt (Power supply or parity error)"
      ],
      answer: 2,
      explanation: "Slide 32 specifies the 4 standard interrupt categories: 1. Program, 2. Timer, 3. Input/Output, and 4. Hardware failure."
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
      feedback = 'অসাধারণ! লেকচার ৩-এর ডিজাইন লেভেল, ফুল অ্যাডার এবং ক্যাশ মেমরি তোমার পুরোপুরি আয়ত্তে চলে এসেছে!';
    } else if (percentage >= 60) {
      feedback = 'খুব ভালো! স্লাইড ১১-এর ৩টি লেভেলের টেবিলটি আরেকবার দেখে নাও, তাহলে পরীক্ষায় ফুল মার্কস পাবে!';
    } else {
      feedback = 'আরেকবার ফুল অ্যাডার ও ক্যাশ মেমরির সিমুলেটরগুলো দেখো, তারপর আবার কুইজ দাও!';
    }
  } else {
    if (percentage >= 80) {
      feedback = 'Outstanding! You have mastered the 3 design levels, Full Adder equations, and Cache hierarchy!';
    } else if (percentage >= 60) {
      feedback = 'Great job! Revisit the Slide 11 Design Levels table to lock down 100% exam readiness.';
    } else {
      feedback = 'Review the Full Adder simulator and interrupt logs, then retry the quiz!';
    }
  }

  const retryText = isBn ? '🔄 পুনরায় কুইজ দাও' : '🔄 Retake Quiz';

  cardContent.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
      <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">${heading}</h3>
      <div style="font-size: 2.5rem; font-family: var(--font-code); color: var(--accent-emerald); font-weight: 800; margin-bottom: 1rem;">
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

// --- 8. Mini-Game: Memory Hierarchy Latency Drag Race ---
(function initMemoryDragRace() {
  const btnStart = document.getElementById('btnRaceStart');
  const dotReg = document.getElementById('dotReg');
  const dotCache = document.getElementById('dotCache');
  const dotDram = document.getElementById('dotDram');
  const dotDisk = document.getElementById('dotDisk');
  const raceInsight = document.getElementById('raceInsight');
  const raceStatus = document.getElementById('raceStatus');

  if (!btnStart || !dotReg) return;

  let racing = false;

  btnStart.addEventListener('click', (e) => {
    if (racing) return;
    racing = true;
    sounds.click();
    const isBn = currentLang === 'bn';

    if (raceStatus) raceStatus.textContent = isBn ? 'রেস চলছে...' : 'Racing...';
    if (raceInsight) raceInsight.textContent = isBn ? '🏁 রেস শুরু হয়েছে! প্রতিটি মেমরির রেসপন্স টাইম পর্যবেক্ষণ করো...' : '🏁 Race started! Watch the real-time latency difference...';

    // Reset positions
    [dotReg, dotCache, dotDram, dotDisk].forEach(d => { if (d) d.style.left = '4px'; });

    // 1. Register (0.5 ns) finishes almost instantly (180 ms in human scale)
    setTimeout(() => {
      if (dotReg) dotReg.style.left = 'calc(100% - 32px)';
      sounds.correctChime();
    }, 180);

    // 2. Cache (1 ns) finishes right after (350 ms)
    setTimeout(() => {
      if (dotCache) dotCache.style.left = 'calc(100% - 32px)';
      sounds.cacheHit();
    }, 380);

    // 3. DRAM (100 ns) takes ~2.2 seconds
    setTimeout(() => {
      if (dotDram) dotDram.style.left = 'calc(100% - 32px)';
      sounds.cacheMiss();
    }, 2200);

    // 4. SSD / Hard disk moves only 5% after 3 seconds
    setTimeout(() => {
      if (dotDisk) dotDisk.style.left = '5%';
      racing = false;
      if (raceStatus) raceStatus.textContent = isBn ? 'রেস সমাপ্ত 🏆' : 'Race Finished 🏆';
      if (raceInsight) {
        raceInsight.innerHTML = isBn
          ? "🎉 <strong>ফলাফল:</strong> ক্যাশ মেমরি মেইন মেমরির চেয়ে <strong>১০০ গুণ দ্রুত</strong> এবং ডিস্কের চেয়ে <strong>১০,০০০ গুণ দ্রুত</strong>! এজন্যই ক্যাশ মিস কমানো এত জরুরি!"
          : "🎉 <strong>Result:</strong> Cache is <strong>100x faster than DRAM</strong> and <strong>10,000x faster than Disk</strong>! This is why high Cache Hit rates are paramount!";
      }

      if (window.caoGame) {
        window.caoGame.addXP(40, 'Memory Race Completed', e);
        window.caoGame.unlockBadge('l3_cache');
      }
    }, 2800);
  });
})();

// Initial Run
applyLanguage(currentLang);
loadQuestion(0);
updateFullAdder();

