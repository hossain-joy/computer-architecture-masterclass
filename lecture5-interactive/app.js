/* ==========================================================================
   Computer Architecture & Organization - Lecture 5: Processor Basics
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

  clockTick() {
    this.playTone(400, 'square', 0.06, 0.08);
  }

  pipeAdvance() {
    this.playTone(480, 'sine', 0.08, 0.12);
    setTimeout(() => this.playTone(720, 'triangle', 0.12, 0.12), 60);
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
    nav_operands: "0/1/2/3 Operands",
    nav_endian: "Endian Mode",
    nav_pipeline: "Pipelining",
    nav_addr: "Addressing Modes",
    nav_formats: "Instruction Formats",
    nav_quiz: "Exam Quiz",
    nav_take_test: "টেস্ট দাও",
    hero_badge: "লেকচার ৫ এর সম্পূর্ণ ইন্টারেক্টিভ গাইড",
    hero_title: 'প্রসেসর বেসিকস ও পাইপলাইনিং (Processor Basics)<br><span class="gradient-text">ইন্সট্রাকশন সেট, এন্ডিয়ান মোড ও ২-স্টেজ পাইপলাইন</span>',
    hero_subtitle: "০/১/২/৩ অপারেন্ড আর্কিটেকচার থেকে শুরু করে বিগ-এন্ডিয়ান বনাম লিটল-এন্ডিয়ান মেমরি ম্যাপিং এবং সিপিইউ-এর দ্বিগুণ গতি বাড়ানোর ২-স্টেজ ইন্সট্রাকশন পাইপলাইনিংয়ের লাইভ সিমুলেশন!",
    stat_operands: "স্ট্যাক বনাম অ্যাকুমুলেটর",
    stat_endian: "মেমরিতে বাইটের অনুক্রম",
    stat_pipeline: "Fetch & Execute ওভারল্যাপিং",
    stat_addr: "মেমরি ও রেজিস্টার অ্যাড্রেসিং",
    sec1_tag: "মডিউল ১ • স্লাইড ৭ ও ৮",
    sec1_title: "০, ১, ২ ও ৩-অপারেন্ড আর্কিটেকচার (Number of Operands)",
    sec1_desc: "একটি সমীকরণ z ⬅ x + y সম্পন্ন করতে ৪টি ভিন্ন আর্কিটেকচার কীভাবে কাজ করে তার লাইভ তুলনা দেখুন!",
    op_badge: "স্লাইড ৮ এর সুপারহিট টেবিল",
    op_title: "💻 ৪টি আর্কিটেকচারের কোড ও রেজিস্টার এক্সিকিউশন",
    op_desc: "নিচের যেকোনো আর্কিটেকচার সিলেক্ট করে কোড সিকোয়েন্স ও ডেটা ফ্লো পর্যবেক্ষণ করো:",
    btn_step_exec: "▶ পরবর্তী নির্দেশ এক্সিকিউট করো",
    op_hw_title: "LIFO স্ট্যাক সিমুলেটর",
    sec2_tag: "মডিউল ২ • স্লাইড ৯",
    sec2_title: "এন্ডিয়ান মোড: Big-Endian বনাম Little-Endian",
    sec2_desc: "কম্পিউটার মেমরির পরপর ৪টি অ্যাড্রেসে মাল্টি-বাইট ডেটা কোন ক্রমে (Sequence of Bytes) সাজিয়ে রাখা হবে, তাই হলো Endian Mode।",
    endian_input_label: "৩২-বিট হেক্সাডেসিমেল ডেটা:",
    endian_addr_label: "বেস অ্যাড্রেস: <code>ABCDE0H</code>",
    big_sub: "সবচেয়ে গুরুত্বপূর্ণ বাইট (MSB) সর্বনিম্ন ঠিকানায় থাকে",
    little_sub: "সর্বনিম্ন গুরুত্বপূর্ণ বাইট (LSB) সর্বনিম্ন ঠিকানায় থাকে",
    endian_exam_tip: "পরীক্ষার গোল্ডেন রুল:",
    endian_exam_body: "Big-Endian হলো মানুষের লেখার মতো (বাম থেকে ডানে স্বাভাবিক: 12 ➔ 34 ➔ 56 ➔ 78)। আর Little-Endian হলো উল্টো—ডানদিকের ছোট বাইট আগে বসে (78 ➔ 56 ➔ 34 ➔ 12)! Intel x86 প্রসেসর Little-Endian ব্যবহার করে।",
    sec3_tag: "মডিউল ৩ • স্লাইড ১৩, ১৪ ও ১৫",
    sec3_title: "২-স্টেজ ইন্সট্রাকশন পাইপলাইনিং (Instruction Pipelining)",
    sec3_desc: "প্রোগ্রাম কন্ট্রোল ইউনিট (Fetch) এবং ডেটা প্রসেসিং ইউনিট (Execute) একসাথে কাজ করে কীভাবে সিপিইউ-এর পারফরম্যান্স দ্বিগুণ করে!",
    pipe_badge: "স্লাইড ১৫ এর লাইভ ওভারল্যাপ চার্ট",
    pipe_title: "⚡ ক্লক সাইকেল বাই সাইকেল ওভারল্যাপিং অ্যানিমেশন (Fig 3.8)",
    pipe_desc: "যখন ১ম নির্দেশ Execute হচ্ছে, ঠিক তখনই ২য় নির্দেশ Fetch হচ্ছে! নিচে 'পরবর্তী ক্লক সাইকেল' বাটনে ক্লিক করে পাইপলাইনের জাদু দেখো:",
    btn_next_clock: "⏱️ পরবর্তী ক্লক সাইকেল (Next Clock)",
    btn_reset_pipe: "রিসেট করো",
    th_inst: "নির্দেশ (Instruction)",
    hazard_badge: "🚦 মিনি-গেম • পাইপলাইন হ্যাজার্ড সমাধান",
    hazard_score_label: "থ্রুপুট",
    hazard_cycles_label: "ক্লক সাইকেল",
    hazard_title: "পাইপলাইন ট্রাফিক কন্ট্রোলার: ব্রাঞ্চ হ্যাজার্ড সমাধান (Pipeline Hazard Buster)",
    hazard_desc: "একটি ৫-ইন্সট্রাকশন ব্যাচে ৩য় নির্দেশটি হলো একটি শর্তাধীন ব্রাঞ্চ (Conditional Jump)। সিপিইউ ফেচ করবে নাকি ব্রাঞ্চ প্রেডিকশন সক্রিয় করবে? সিদ্ধান্ত নিয়ে পাইপলাইন বাবল (Stall) এড়িয়ে ১০০% থ্রুপুট বজায় রাখো!",
    hazard_alert: "⚠️ ব্রাঞ্চ ডিটেক্টেড! পরবর্তী নির্দেশ I4 কি ফেচ করা ঠিক হবে?",
    btn_stall: "🛑 স্টল করো (২ সাইকেল বিরতি)",
    btn_predict: "⚡ স্পেকুলেটিভ ব্রাঞ্চ প্রেডিকশন",
    sec4_tag: "মডিউল ৪ • স্লাইড ১০",
    sec4_title: "অ্যাড্রেসিং মোডস (Addressing Modes)",
    sec4_desc: "সিপিইউ কীভাবে নির্দেশ থেকে অপারেন্ড বা ডেটার আসল অবস্থান (Location of Data) খুঁজে পায়:",
    addr_title_imm: "ডেটা সরাসরি নির্দেশে থাকে",
    addr_title_reg: "রেজিস্টারে ডেটা সংরক্ষিত",
    addr_title_dir: "সরাসরি মেমরি অ্যাড্রেস",
    addr_title_reg_ind: "রেজিস্টারে মেমরি ঠিকানা",
    addr_title_ind: "পয়েন্টারের পয়েন্টার",
    addr_title_indexed: "অফসেট যোগ করে ঠিকানা",
    addr_imm: "অপারেন্ড কোনো মেমরি বা রেজিস্টারে নয়, নির্দেশের ভেতরেই দেওয়া থাকে (যেমন: MOV R1, #25)।",
    addr_reg: "নির্দেশে একটি সিপিইউ রেজিস্টারের নাম দেওয়া থাকে যার মধ্যে আসল ডেটা থাকে (যেমন: ADD R1, R2)।",
    addr_dir: "নির্দেশে সরাসরি একটি মেমরি ঠিকানা উল্লেখ থাকে যেখানে ডেটা পাওয়া যাবে (যেমন: LDA 0x1000)।",
    addr_reg_ind: "রেজিস্টারের ভেতরে ডেটা থাকে না, বরং ডেটার মেমরি ঠিকানা রাখা থাকে (যেমন: MOV A, @R1)।",
    addr_ind: "নির্দেশের মেমরি ঠিকানায় আরেকটি মেমরি ঠিকানা থাকে, এবং সেই দ্বিতীয় ঠিকানায় আসল ডেটা পাওয়া যায়।",
    addr_indexed: "বেস বা ইনডেক্স রেজিস্টারের সাথে অফসেট অ্যাড্রেস যোগ করে আসল ঠিকানা বের করা হয়।",
    sec5_tag: "মডিউল ৫ • স্লাইড ৪, ৫, ৬ ও ১২",
    sec5_title: "ইন্সট্রাকশন ফরম্যাট: MIPS (Fixed) বনাম Intel 8080 (Variable)",
    sec5_desc: "ফিক্সড-লেংথ (সহজ ডিকোডিং ও প্রফেচিং) বনাম ভ্যারিয়েবল-লেংথ (মেমরি সাশ্রয়ী কিন্তু জটিল ডিকোডিং)।",
    mips_desc: "সমস্ত নির্দেশ ঠিক ৩২-বিট বিশিষ্ট। ফলে ডিকোডিং অতি দ্রুত হয় এবং প্রফেচিং সহজ।",
    intel_desc: "নির্দেশের আকার ১-বাইট, ২-বাইট অথবা ৩-বাইট হতে পারে। মেমরি অপচয় রোধ হলেও ডিকোডিং জটিল।",
    sec6_tag: "পরীক্ষা প্রস্তুতি • কুইজ জোন",
    sec6_title: "লেকচার ৫ এর স্ব-মূল্যায়ন টেস্ট (Lecture 5 Self Quiz)",
    sec6_desc: "লেকচার ৫ এর এন্ডিয়ান মোড, অপারেন্ড আর্কিটেকচার, পাইপলাইনিং এবং অ্যাড্রেসিং মোডস সম্পর্কে পরীক্ষা দিন!",
    quiz_score_prefix: "স্কোর:",
    btn_next_q: "পরবর্তী প্রশ্ন ➡️",
    cheat_title: "লেকচার ৫ এর ১০ মিনিটের কুইক রিভিশন সারাংশ (Exam Night Sheet)",
    cheat_l5_1: "<strong>Big vs Little Endian:</strong> Big-Endian এ MSB সর্বনিম্ন ঠিকানায় থাকে; Little-Endian এ LSB সর্বনিম্ন ঠিকানায় থাকে।",
    cheat_l5_2: "<strong>0, 1, 2, 3 Operands:</strong> 0-op = Stack (PUSH/POP) • 1-op = Accumulator (ACC) • 2-op = গন্তব্যই একটি ইনপুট • 3-op = পৃথক গন্তব্য ও ইনপুট।",
    cheat_l5_3: "<strong>2-Stage Pipeline:</strong> Fetch (PCU) এবং Execute (DPU) ওভারল্যাপ করে কাজ করে ➔ প্রতি ক্লকে ১টি নির্দেশ শেষ হয়।",
    cheat_l5_4: "<strong>Fixed vs Variable:</strong> MIPS হলো ফিক্সড ৩২-বিট (দ্রুত ডিকোডিং); Intel 8080 হলো ভ্যারিয়েবল ১/২/৩ বাইট (মেমরি সাশ্রয়ী)।",
    cheat_l5_5: "<strong>Addressing Modes:</strong> Immediate (নির্দেশেই ডেটা) • Direct (সরাসরি মেমরি M[addr]) • Indirect (পয়েন্টার M[M[addr]]) • Reg Indirect (রেজিস্টারে মেমরি ঠিকানা M[R1])।",
    cheat_l5_6: "<strong>এক্সিকিউশন চেইন:</strong> High-Level ভাষা ➔ Compiler ➔ Assembly কোড ➔ Assembler ➔ বাইনারি মেশিন কোড ➔ Loader ➔ CPU এক্সিকিউশন।",
    vault_badge: "🎯 এক্সাম মাস্টার ভল্ট • DIU CSE",
    l5_math_title: "পরীক্ষার গাণিতিক সমস্যা ও মডেল সমাধান (Exam Math & Model Answers)",
    l5_math_sub: "পাইপলাইন স্পিডআপ ($S_k$), বিগ-এন্ডিয়ান বনাম লিটল-এন্ডিয়ান মেমরি লেআউট ও অপারেন্ড ফরম্যাট:",
    l5_p1_tag: "ম্যাথ প্রবলেম ১ • ব্লুম'স লেভেল ৩ (Apply)",
    l5_p1_title: "ইনস্ট্রাকশন পাইপলাইনিং স্পিডআপ ($S_k$) ও ক্লক সাইকেল হিসাব",
    l5_p1_statement: "<strong>প্রশ্ন:</strong> একটি ২-স্টেজ ইনস্ট্রাকশন পাইপলাইনে ($k = 2$: Fetch ও Execute) $n = 1000$ টি নির্দেশের একটি প্রোগ্রাম এক্সিকিউট করা হচ্ছে। প্রতিটি স্টেজের সময় ১ ক্লক সাইকেল ($10\\text{ ns}$)।<br>(ক) নন-পাইপলাইন্ড এবং ২-স্টেজ পাইপলাইন্ড প্রসেসরে মোট প্রয়োজনীয় ক্লক সাইকেল ও এক্সিকিউশন সময় কত?<br>(খ) পাইপলাইনের স্পিডআপ ($S_2$) নির্ণয় করো এবং $n \\to \\infty$ হলে সর্বোচ্চ তাত্ত্বিক স্পিডআপ কত হবে?",
    l5_p1_solution: '<div class="step-line"><strong>(ক) মোট সাইকেল ও সময় নির্ণয়:</strong></div><div class="step-line">↳ নন-পাইপলাইন্ড সাইকেল: $T_{non-pipe} = n \\times k = 1000 \\times 2 = 2000$ সাইকেল।</div><div class="step-line">↳ নন-পাইপলাইন্ড সময়: $2000 \\times 10\\text{ ns} = 20,000\\text{ ns} = 20\\text{ }\\mu\\text{s}$।</div><div class="step-line">↳ পাইপলাইন্ড সাইকেল: $T_{pipe} = k + (n - 1) = 2 + (1000 - 1) = 1001$ সাইকেল।</div><div class="step-line">↳ পাইপলাইন্ড সময়: $1001 \\times 10\\text{ ns} = 10,010\\text{ ns} \\approx 10.01\\text{ }\\mu\\text{s}$।</div><div class="step-line"><strong>(খ) স্পিডআপ ($S_k$) নির্ণয়:</strong></div><div class="step-line">↳ $S_k = \\frac{T_{non-pipe}}{T_{pipe}} = \\frac{n \\cdot k}{k + n - 1} = \\frac{2000}{1001} \\approx 1.998$</div><div class="step-line">↳ $n \\to \\infty$ হলে সর্বোচ্চ গতি: $\\lim_{n \\to \\infty} S_k = k = 2$ গুণ (Theoretical Limit)।</div><div class="solution-highlight">✅ <strong>ফলাফল:</strong> পাইপলাইনে সময় লাগে ১০০১ সাইকেল ($10.01\\text{ }\\mu\\text{s}$); স্পিডআপ = <strong>১.৯৯৮ গুণ</strong> (প্রায় দ্বিগুণ দ্রুত)!</div>',
    l5_p2_tag: "ম্যাথ প্রবলেম ২ • ব্লুম'স লেভেল ৩ (Apply)",
    l5_p2_title: "মেমরি ম্যাপিং: Big-Endian বনাম Little-Endian বিন্যাস",
    l5_p2_statement: "<strong>প্রশ্ন:</strong> একটি ৩২-বিট হেক্সাডেসিমেল ডেটা <code>12345678H</code> মেমরি অ্যাড্রেস <code>ABCDE0H</code> থেকে শুরু করে সংরক্ষণ করতে হবে। Big-Endian এবং Little-Endian উভয় আর্কিটেকচারে বাইট-বাই-বাইট মেমরি বিন্যাস ছকসহ দেখাও।",
    l5_p2_solution: '<div class="step-line">৩২-বিট ডেটা <code>12345678H</code> এর ৪টি বাইট:</div><div class="step-line">↳ MSB (Most Significant Byte) = <code>12H</code>, Byte 2 = <code>34H</code>, Byte 1 = <code>56H</code>, LSB = <code>78H</code>।</div><div class="step-line"><strong>Big-Endian বিন্যাস (MSB সর্বনিম্ন ঠিকানায়):</strong></div><div class="step-line">↳ <code>ABCDE0H</code>: <code>12H</code> (MSB) | <code>ABCDE1H</code>: <code>34H</code> | <code>ABCDE2H</code>: <code>56H</code> | <code>ABCDE3H</code>: <code>78H</code> (LSB)</div><div class="step-line"><strong>Little-Endian বিন্যাস (LSB সর্বনিম্ন ঠিকানায়):</strong></div><div class="step-line">↳ <code>ABCDE0H</code>: <code>78H</code> (LSB) | <code>ABCDE1H</code>: <code>56H</code> | <code>ABCDE2H</code>: <code>34H</code> | <code>ABCDE3H</code>: <code>12H</code> (MSB)</div><div class="solution-highlight">✅ <strong>Exam Mnemonic:</strong> Big-Endian বড় মাথা (MSB) আগে রাখে; Little-Endian ছোট মাথা (LSB) আগে রাখে!</div>',
    l5_bp_title: "পরীক্ষার মডেল প্রশ্ন: 0, 1, 2, 3 Operand Instruction Sequence for $X = (A + B) \\times (C + D)$",
    l5_bp_tip: "💡 <strong>Exam Marking Key:</strong> পরীক্ষায় এই ৪টি ফরম্যাটের মধ্যে যেকোনো একটি দিয়ে রাশিমালা ($X$) সমাধান করতে প্রায়ই আসে। ১-অ্যাড্রেসে Accumulator এবং ০-অ্যাড্রেসে Stack শীর্ষের ডেটা ব্যবহৃত হয় তা ব্যাখ্যা করলেই পূর্ণ নম্বর নিশ্চিত!",
    l5_fact_badge: "রোমাঞ্চকর অজানা তথ্য • Did You Know?",
    l5_fact_title: "ডিম ভাঙার যুদ্ধ থেকে বিগ-এন্ডিয়ান ও লিটল-এন্ডিয়ান!",
    l5_fact_body: "কম্পিউটার বিজ্ঞানে 'Big-Endian' ও 'Little-Endian' শব্দের অদ্ভুত উৎপত্তি কোথায় জানো? ১৭২৬ সালে প্রকাশিত জোনাথন সুইফটের বিখ্যাত ব্যঙ্গাত্মক উপন্যাস <em>গালিভার্স ট্রাভেলস</em> (Gulliver's Travels)-এ লিলিপুট রাজ্যের সম্রাট আইন জারি করেছিলেন যে সেদ্ধ ডিম খাওয়ার সময় সবসময় ছোট মাথা (Little End) থেকে ভেঙে খেতে হবে! কিন্তু পুরোনো প্রথা অনুযায়ী বড় মাথা (Big End) থেকে ডিম ভাঙার পক্ষপাতী মানুষরা এর বিরুদ্ধে রক্তক্ষয়ী বিদ্রোহ ঘোষণা করে এবং ১১,০০০ মানুষ প্রাণ হারায়! ১৯৮০ সালে ইন্টারনেট পথিকৃৎ <strong>ড্যানি কোহেন</strong> তার একটি আইকনিক গবেষণাপত্রে তুলে ধরেন যে কম্পিউটার ইঞ্জিনিয়াররাও মেমরিতে MSB আগে রাখবে নাকি LSB আগে রাখবে তা নিয়ে ঠিক একই রকম পাগলামি ও রক্তক্ষয়ী তর্কে লিপ্ত! সেই ঐতিহাসিক পেপারের পর থেকেই প্রসেসর মেমরির দুই রীতির নাম স্থায়ীভাবে হয়ে যায় <strong>Big-Endian</strong> এবং <strong>Little-Endian</strong>!",
    footer_title: "কম্পিউটার আর্কিটেকচার অ্যান্ড অর্গানাইজেশন (CAO) — লেকচার ৫ মাস্টারক্লাস",
    footer_sub: "ডিজাইন করা হয়েছে স্পষ্টতা, গভীর বোধগম্যতা ও পরীক্ষার পূর্ণ প্রস্তুতির জন্য।"
  },
  en: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_operands: "0/1/2/3 Operands",
    nav_endian: "Endian Mode",
    nav_pipeline: "Pipelining",
    nav_addr: "Addressing Modes",
    nav_formats: "Instruction Formats",
    nav_quiz: "Exam Quiz",
    nav_take_test: "Take Quiz",
    hero_badge: "Comprehensive Lecture 5 Interactive Masterclass",
    hero_title: 'Processor Basics & Pipelining<br><span class="gradient-text">Instruction Sets, Endian Modes & Pipelining</span>',
    hero_subtitle: "From 0/1/2/3 operand machine architectures to Big-Endian vs Little-Endian byte ordering and 2-stage instruction pipelining—experience processor architecture in real-time simulators!",
    stat_operands: "Stack vs Accumulator",
    stat_endian: "Byte Order in Memory",
    stat_pipeline: "Fetch & Execute Overlap",
    stat_addr: "Operand Addressing Modes",
    sec1_tag: "MODULE 1 • SLIDES 7 & 8",
    sec1_title: "0, 1, 2, & 3-Operand Architectures",
    sec1_desc: "Observe how 4 distinct processor architectures evaluate the fundamental expression: z ⬅ x + y!",
    op_badge: "Slide 8 Master Table",
    op_title: "💻 Assembly Sequence & Register File Execution",
    op_desc: "Select any architecture to inspect its instruction sequence and register data flow:",
    btn_step_exec: "▶ Step Next Instruction",
    op_hw_title: "LIFO Stack Simulator",
    sec2_tag: "MODULE 2 • SLIDE 9",
    sec2_title: "Endian Mode: Big-Endian vs. Little-Endian",
    sec2_desc: "Endianness governs the exact memory address sequence in which multi-byte words are stored in silicon memory.",
    endian_input_label: "32-Bit Hexadecimal Data:",
    endian_addr_label: "Base Address: <code>ABCDE0H</code>",
    big_sub: "Most Significant Byte (MSB) stored at lowest memory address",
    little_sub: "Least Significant Byte (LSB) stored at lowest memory address",
    endian_exam_tip: "Exam Golden Rule:",
    endian_exam_body: "Big-Endian mirrors human reading order (left-to-right natural: 12 ➔ 34 ➔ 56 ➔ 78). Little-Endian inverts it—the smallest byte is placed first at the base address (78 ➔ 56 ➔ 34 ➔ 12)! Intel x86 architectures use Little-Endian.",
    sec3_tag: "MODULE 3 • SLIDES 13, 14 & 15",
    sec3_title: "2-Stage Instruction Pipelining",
    sec3_desc: "How overlapping instruction fetching (PCU) and instruction execution (DPU) doubles processor throughput!",
    pipe_badge: "Slide 15 Timing Chart",
    pipe_title: "⚡ Cycle-by-Cycle Overlapping Animation (Fig 3.8)",
    pipe_desc: "While instruction I₁ is executing, instruction I₂ is being fetched concurrently! Click 'Next Clock Cycle' to advance:",
    btn_next_clock: "⏱️ Next Clock Cycle",
    btn_reset_pipe: "Reset Pipeline",
    th_inst: "Instruction",
    hazard_badge: "🚦 Mini-Game • Pipeline Hazard Buster",
    hazard_score_label: "Throughput",
    hazard_cycles_label: "Cycles",
    hazard_title: "Pipeline Traffic Controller: Branch Hazard Buster",
    hazard_desc: "In a 5-instruction batch, the 3rd instruction is a conditional branch. Will the CPU stall or activate branch prediction? Decide quickly to eliminate pipeline bubbles (stalls) and maintain 100% throughput!",
    hazard_alert: "⚠️ Branch Detected! Should the CPU fetch next instruction I4 or stall?",
    btn_stall: "🛑 Stall (Wait 2 Cycles)",
    btn_predict: "⚡ Speculative Branch Prediction",
    sec4_tag: "MODULE 4 • SLIDE 10",
    sec4_title: "Operand Addressing Modes",
    sec4_desc: "How the CPU decodes an instruction to locate the effective operand data in registers or main memory:",
    addr_title_imm: "Operand in Instruction",
    addr_title_reg: "Operand in Register",
    addr_title_dir: "Direct Memory Address",
    addr_title_reg_ind: "Memory Pointer in Register",
    addr_title_ind: "Pointer to Pointer",
    addr_title_indexed: "Base Register + Displacement",
    addr_imm: "The constant operand is embedded directly inside the instruction bits (e.g., MOV R1, #25).",
    addr_reg: "The instruction specifies a CPU general-purpose register containing the operand (e.g., ADD R1, R2).",
    addr_dir: "The instruction contains the explicit, direct memory address of the operand (e.g., LDA 0x1000).",
    addr_reg_ind: "The specified register contains the pointer/memory address of the operand (e.g., MOV A, @R1).",
    addr_ind: "The memory address in the instruction holds another pointer address leading to the data.",
    addr_indexed: "The effective address is computed by adding an index or base register to an offset displacement.",
    sec5_tag: "MODULE 5 • SLIDES 4, 5, 6 & 12",
    sec5_title: "Instruction Formats: MIPS (Fixed) vs. Intel 8080 (Variable)",
    sec5_desc: "Fixed-length (simplified decoding & efficient prefetching) versus Variable-length (memory-efficient but complex decoding).",
    mips_desc: "All instructions are strictly 32-bits wide, enabling rapid, parallel hardware decoding and pipelined prefetching.",
    intel_desc: "Instruction lengths vary between 1, 2, or 3 bytes, conserving memory at the cost of variable decoding complexity.",
    sec6_tag: "EXAM MASTERY • QUIZ ZONE",
    sec6_title: "Lecture 5 Self-Assessment Quiz",
    sec6_desc: "Test your understanding of endian modes, operand architectures, pipelining, and addressing modes!",
    quiz_score_prefix: "Score:",
    btn_next_q: "Next Question ➡️",
    cheat_title: "Lecture 5: 10-Minute Exam Night Quick Revision Sheet",
    cheat_l5_1: "<strong>Big vs Little Endian:</strong> Big-Endian stores MSB at lowest address; Little-Endian stores LSB at lowest address.",
    cheat_l5_2: "<strong>0, 1, 2, 3 Operands:</strong> 0-op = Stack (PUSH/POP) • 1-op = Accumulator (ACC) • 2-op = Destination is one input • 3-op = Separate dest and sources.",
    cheat_l5_3: "<strong>2-Stage Pipeline:</strong> Overlaps PCU (Fetch) and DPU (Execute) ➔ Completes 1 instruction every clock cycle in steady state.",
    cheat_l5_4: "<strong>Fixed vs Variable:</strong> MIPS is fixed 32-bit (fast decode); Intel 8080 is variable 1/2/3 bytes (memory compact).",
    cheat_l5_5: "<strong>Addressing Modes:</strong> Immediate (data in inst) • Direct (M[addr]) • Indirect (M[M[addr]]) • Reg Indirect (M[R1]).",
    cheat_l5_6: "<strong>Execution Chain:</strong> High-Level ➔ Compiler ➔ Assembly ➔ Assembler ➔ Machine Code ➔ Loader ➔ CPU Execution.",
    vault_badge: "🎯 EXAM MASTER VAULT • DIU CSE",
    l5_math_title: "Exam Mathematical Problems & Model Answers",
    l5_math_sub: "Pipelining Speedup ($S_k$), Big-Endian vs Little-Endian Memory Mapping & Operand Formats:",
    l5_p1_tag: "Math Problem 1 • Bloom's Level 3 (Apply)",
    l5_p1_title: "Instruction Pipelining Speedup ($S_k$) & Clock Cycle Calculation",
    l5_p1_statement: "<strong>Question:</strong> In a 2-stage instruction pipeline ($k = 2$: Fetch and Execute), a program consisting of $n = 1000$ instructions is executed. Each stage takes 1 clock cycle ($10\\text{ ns}$).<br>(a) Find the total clock cycles and execution time required in non-pipelined vs 2-stage pipelined processors.<br>(b) Calculate pipeline speedup ($S_2$) and determine the maximum theoretical speedup as $n \\to \\infty$.",
    l5_p1_solution: '<div class="step-line"><strong>(a) Total Clock Cycles and Execution Time:</strong></div><div class="step-line">↳ Non-pipelined cycles: $T_{non-pipe} = n \\times k = 1000 \\times 2 = 2000$ cycles.</div><div class="step-line">↳ Non-pipelined time: $2000 \\times 10\\text{ ns} = 20,000\\text{ ns} = 20\\text{ }\\mu\\text{s}$.</div><div class="step-line">↳ Pipelined cycles: $T_{pipe} = k + (n - 1) = 2 + (1000 - 1) = 1001$ cycles.</div><div class="step-line">↳ Pipelined time: $1001 \\times 10\\text{ ns} = 10,010\\text{ ns} \\approx 10.01\\text{ }\\mu\\text{s}$.</div><div class="step-line"><strong>(b) Speedup ($S_k$) Calculation:</strong></div><div class="step-line">↳ $S_k = \\frac{T_{non-pipe}}{T_{pipe}} = \\frac{n \\cdot k}{k + n - 1} = \\frac{2000}{1001} \\approx 1.998$</div><div class="step-line">↳ Maximum theoretical speedup as $n \\to \\infty$: $\\lim_{n \\to \\infty} S_k = k = 2\\times$ (Theoretical Limit).</div><div class="solution-highlight">✅ <strong>Result:</strong> Pipelined execution requires 1001 cycles ($10.01\\text{ }\\mu\\text{s}$); Speedup = <strong>1.998×</strong> (virtually 2× faster)!</div>',
    l5_p2_tag: "Math Problem 2 • Bloom's Level 3 (Apply)",
    l5_p2_title: "Memory Mapping: Big-Endian vs. Little-Endian Byte Order",
    l5_p2_statement: "<strong>Question:</strong> A 32-bit hexadecimal value <code>12345678H</code> is to be stored starting at memory address <code>ABCDE0H</code>. Illustrate byte-by-byte memory layouts in both Big-Endian and Little-Endian architectures with address tables.",
    l5_p2_solution: '<div class="step-line">Four constituent bytes of 32-bit word <code>12345678H</code>:</div><div class="step-line">↳ MSB (Most Significant Byte) = <code>12H</code>, Byte 2 = <code>34H</code>, Byte 1 = <code>56H</code>, LSB = <code>78H</code>.</div><div class="step-line"><strong>Big-Endian Layout (MSB at Lowest Address):</strong></div><div class="step-line">↳ <code>ABCDE0H</code>: <code>12H</code> (MSB) | <code>ABCDE1H</code>: <code>34H</code> | <code>ABCDE2H</code>: <code>56H</code> | <code>ABCDE3H</code>: <code>78H</code> (LSB)</div><div class="step-line"><strong>Little-Endian Layout (LSB at Lowest Address):</strong></div><div class="step-line">↳ <code>ABCDE0H</code>: <code>78H</code> (LSB) | <code>ABCDE1H</code>: <code>56H</code> | <code>ABCDE2H</code>: <code>34H</code> | <code>ABCDE3H</code>: <code>12H</code> (MSB)</div><div class="solution-highlight">✅ <strong>Exam Mnemonic:</strong> Big-Endian puts the Big End (MSB) first; Little-Endian puts the Little End (LSB) first!</div>',
    l5_bp_title: "Exam Model Problem: 0, 1, 2, 3 Operand Instruction Sequence for $X = (A + B) \\times (C + D)$",
    l5_bp_tip: "💡 <strong>Exam Marking Key:</strong> Semester exams frequently ask to write instruction sequences in any of these 4 formats. Explaining how 1-address uses the Accumulator and 0-address uses Stack top guarantees full marks!",
    l5_fact_badge: "Engineering Marvel • Did You Know?",
    l5_fact_title: "From Gulliver's Egg Wars to Big-Endian and Little-Endian!",
    l5_fact_body: "Where did the terms 'Big-Endian' and 'Little-Endian' originate in computer science? In Jonathan Swift's 1726 satire <em>Gulliver's Travels</em>, the Emperor of Lilliput commanded all subjects to break boiled eggs at the Little End under penalty of law! Traditionalists who broke eggs at the Big End staged a civil rebellion resulting in 11,000 casualties! In 1980, Internet pioneer <strong>Danny Cohen</strong> published an iconic RFC showing computer engineers were engaged in an identical religious war over whether MSB or LSB belongs at the lowest memory address! Ever since, CPU byte orders have been known globally as <strong>Big-Endian</strong> and <strong>Little-Endian</strong>!",
    footer_title: "Computer Architecture and Organization (CAO) — Lecture 5 Masterclass",
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

  updateEndianVisuals();
  updateOperandDisplay();
  updatePipelineNarrator();

  if (window.renderMathInElement) {
    window.renderMathInElement(document.body);
  } else if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise();
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

// --- 3. 0, 1, 2, 3 Operands Architecture Simulator ---
let activeOperandArch = 0;
let operandStep = 0;

const operandData = {
  0: {
    title: { bn: "0-Operand Stack Architecture (LIFO)", en: "0-Operand Stack Architecture (LIFO)" },
    code: {
      bn: `PUSH Rx     ; Stack এ Rx (x) পুশ করো\nPUSH Ry     ; Stack এ Ry (y) পুশ করো\nADD         ; Stack থেকে x ও y পপ করে যোগ করো\nPOP  Rz     ; যোগফল স্ট্যাক থেকে পপ করে Rz এ রাখো`,
      en: `PUSH Rx     ; Push Rx (x) onto Stack\nPUSH Ry     ; Push Ry (y) onto Stack\nADD         ; Pop top 2 elements, Add, Push sum\nPOP  Rz     ; Pop sum from Stack into Rz`
    },
    note: {
      bn: "💡 <strong>0-অপারেন্ড আর্কিটেকচার:</strong> অপারেশনের জন্য কোনো রেজিস্টার নাম দিতে হয় না! এটি LIFO (Last-In-First-Out) স্ট্যাকের শীর্ষ থেকে স্বয়ংক্রিয়ভাবে দুটি মান নিয়ে যোগ করে ফলাফল স্ট্যাকে রেখে দেয়।",
      en: "💡 <strong>0-Operand Architecture:</strong> Arithmetic instructions carry no explicit operand addresses. Operations implicitly pop top elements from the LIFO stack and push the result."
    }
  },
  1: {
    title: { bn: "1-Operand Accumulator Architecture (ACC)", en: "1-Operand Accumulator Architecture (ACC)" },
    code: {
      bn: `MOVE ACC, Rx    ; Rx এর মান Accumulator এ নাও\nADD  Ry         ; ACC = ACC + Ry (Rx + Ry)\nMOVE Rz, ACC    ; ACC এর ফলাফল Rz এ সেভ করো`,
      en: `MOVE ACC, Rx    ; Load Rx value into Accumulator\nADD  Ry         ; ACC = ACC + Ry (Rx + Ry)\nMOVE Rz, ACC    ; Store ACC sum into destination Rz`
    },
    note: {
      bn: "💡 <strong>১-অপারেন্ড আর্কিটেকচার:</strong> এতে একটি বিশেষ রেজিস্টার থাকে যাকে <strong>Accumulator (ACC)</strong> বলা হয়। এটি সবসময় প্রথম ইনপুট এবং চূড়ান্ত গন্তব্য (Destination) হিসেবে কাজ করে।",
      en: "💡 <strong>1-Operand Architecture:</strong> Operates using an implicit <strong>Accumulator (ACC)</strong> register as both default source operand and result destination."
    }
  },
  2: {
    title: { bn: "2-Operand Register Architecture", en: "2-Operand Register Architecture" },
    code: {
      bn: `MOVE Rz, Rx     ; Rx এর মান Rz এ কপি করো\nADD  Rz, Ry     ; Rz = Rz + Ry (x + y)`,
      en: `MOVE Rz, Rx     ; Copy Rx into destination Rz\nADD  Rz, Ry     ; Rz = Rz + Ry (x + y)`
    },
    note: {
      bn: "💡 <strong>২-অপারেন্ড আর্কিটেকচার:</strong> এখানে প্রথম অপারেন্ডটি নিজেই গন্তব্য (Destination)। ফলে <code>ADD Rz, Ry</code> করার পর Rz-এর পূর্বের মান মুছে গিয়ে যোগফল বসে যায়।",
      en: "💡 <strong>2-Operand Architecture:</strong> One operand specifies both an input and the result destination. <code>ADD Rz, Ry</code> overwrites Rz with the sum."
    }
  },
  3: {
    title: { bn: "3-Operand Register Architecture", en: "3-Operand Register Architecture" },
    code: {
      bn: `ADD  Rz, Rx, Ry  ; Rz = Rx + Ry (গন্তব্য ও দুটি ইনপুট আলাদা)`,
      en: `ADD  Rz, Rx, Ry  ; Rz = Rx + Ry (Explicit dest & 2 sources)`
    },
    note: {
      bn: "💡 <strong>৩-অপারেন্ড আর্কিটেকচার:</strong> সবচেয়ে আধুনিক ও পরিষ্কার রূপ! মাত্র একটি নির্দেশেই গন্তব্য (Rz) এবং দুটি ইনপুট অপারেন্ড (Rx, Ry) আলাদাভাবে নির্দেশ করা যায়।",
      en: "💡 <strong>3-Operand Architecture:</strong> Modern RISC style! Specifies destination (Rz) and two source operands (Rx, Ry) in a single instruction without destroying source registers."
    }
  }
};

const opArchTitle = document.getElementById('opArchTitle');
const opAsmCode = document.getElementById('opAsmCode');
const opArchNote = document.getElementById('opArchNote');
const opCanvas = document.getElementById('opCanvas');
const btnStepOperand = document.getElementById('btnStepOperand');

function updateOperandDisplay() {
  const data = operandData[activeOperandArch];
  opArchTitle.textContent = data.title[currentLang];
  opAsmCode.textContent = typeof data.code === 'string' ? data.code : data.code[currentLang];
  opArchNote.innerHTML = data.note[currentLang];
  renderHardwareCanvas();
}

function renderHardwareCanvas() {
  if (activeOperandArch === 0) {
    opCanvas.innerHTML = `
      <div class="stack-container" id="visualStack">
        <div class="stack-item">Rx (Value x)</div>
        <div class="stack-item">Ry (Value y)</div>
      </div>
      <span style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem;">LIFO Stack (Top of Stack: Ry)</span>
    `;
  } else if (activeOperandArch === 1) {
    opCanvas.innerHTML = `
      <div class="acc-box">
        <span style="font-size: 0.75rem; color: #a5b4fc; display: block;">ACCUMULATOR (ACC)</span>
        <strong>ACC = [ x + y ]</strong>
      </div>
    `;
  } else if (activeOperandArch === 2) {
    opCanvas.innerHTML = `
      <div style="display: flex; gap: 1rem;">
        <div class="reg-box"><span style="font-size: 0.7rem; color: #67e8f9;">Dest / Src 1</span><br><strong>Rz (x+y)</strong></div>
        <div class="reg-box"><span style="font-size: 0.7rem; color: #94a3b8;">Src 2</span><br><strong>Ry (y)</strong></div>
      </div>
    `;
  } else {
    opCanvas.innerHTML = `
      <div style="display: flex; gap: 0.75rem;">
        <div class="reg-box" style="border-color: #34d399;"><span style="font-size: 0.7rem; color: #34d399;">Dest</span><br><strong>Rz</strong></div>
        <div class="reg-box"><span style="font-size: 0.7rem; color: #94a3b8;">Src 1</span><br><strong>Rx</strong></div>
        <div class="reg-box"><span style="font-size: 0.7rem; color: #94a3b8;">Src 2</span><br><strong>Ry</strong></div>
      </div>
    `;
  }
}

document.querySelectorAll('#operandToggleGroup .toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sounds.click();
    document.querySelectorAll('#operandToggleGroup .toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeOperandArch = parseInt(btn.dataset.op, 10);
    operandStep = 0;
    updateOperandDisplay();
  });
});

if (btnStepOperand) {
  btnStepOperand.addEventListener('click', () => {
    sounds.clockTick();
    operandStep++;
    renderHardwareCanvas();
  });
}

// --- 4. Big-Endian vs Little-Endian Simulator ---
const hexWordInput = document.getElementById('hexWordInput');
const bigMemoryStack = document.getElementById('bigMemoryStack');
const littleMemoryStack = document.getElementById('littleMemoryStack');

function parseHexBytes(hexStr) {
  let clean = hexStr.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
  clean = clean.padStart(8, '0').slice(-8);

  const b0 = clean.substring(0, 2); // MSB
  const b1 = clean.substring(2, 4);
  const b2 = clean.substring(4, 6);
  const b3 = clean.substring(6, 8); // LSB

  return { b0, b1, b2, b3 };
}

function updateEndianVisuals() {
  if (!hexWordInput) return;
  const { b0, b1, b2, b3 } = parseHexBytes(hexWordInput.value);

  // Big-Endian: lowest address gets MSB (b0, b1, b2, b3)
  bigMemoryStack.innerHTML = `
    <div class="mem-row"><span class="mem-addr">ABCDE0H (Base)</span><span class="mem-byte byte-msb">${b0}H &nbsp;(MSB)</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE1H</span><span class="mem-byte byte-mid1">${b1}H</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE2H</span><span class="mem-byte byte-mid2">${b2}H</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE3H (High)</span><span class="mem-byte byte-lsb">${b3}H &nbsp;(LSB)</span></div>
  `;

  // Little-Endian: lowest address gets LSB (b3, b2, b1, b0)
  littleMemoryStack.innerHTML = `
    <div class="mem-row"><span class="mem-addr">ABCDE0H (Base)</span><span class="mem-byte byte-lsb">${b3}H &nbsp;(LSB)</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE1H</span><span class="mem-byte byte-mid2">${b2}H</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE2H</span><span class="mem-byte byte-mid1">${b1}H</span></div>
    <div class="mem-row"><span class="mem-addr">ABCDE3H (High)</span><span class="mem-byte byte-msb">${b0}H &nbsp;(MSB)</span></div>
  `;
}

if (hexWordInput) {
  hexWordInput.addEventListener('input', () => {
    sounds.calcTick();
    updateEndianVisuals();
  });
}

document.querySelectorAll('.preset-pills .pill-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    sounds.click();
    document.querySelectorAll('.preset-pills .pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    hexWordInput.value = btn.dataset.hex;
    updateEndianVisuals();
  });
});

// --- 5. 2-Stage Instruction Pipelining Animator ---
let currentPipeClock = 1;
const clockCounter = document.getElementById('clockCounter');
const btnNextClock = document.getElementById('btnNextClock');
const btnResetPipe = document.getElementById('btnResetPipe');
const pipeNarrator = document.getElementById('pipeNarrator');

const pipeNarrations = {
  1: {
    bn: "💡 <strong>Clock 1:</strong> Instruction 1 (I₁) ফেচ (Fetch) করা হচ্ছে Program Control Unit (PCU) দ্বারা।",
    en: "💡 <strong>Clock 1:</strong> Program Control Unit (PCU) is fetching Instruction 1 (I₁) from memory."
  },
  2: {
    bn: "⚡ <strong>Clock 2 (Concurrency!):</strong> Instruction 1 (I₁) এক্সিকিউট (Execute) হচ্ছে DPU দ্বারা, আর ঠিক একই সময়ে Instruction 2 (I₂) ফেচ (Fetch) করছে PCU!",
    en: "⚡ <strong>Clock 2 (Pipelined Parallelism):</strong> Instruction 1 (I₁) is executing in DPU, while simultaneously Instruction 2 (I₂) is being fetched by PCU!"
  },
  3: {
    bn: "🚀 <strong>Clock 3 (Steady State):</strong> I₁ শেষ হয়ে গেছে! এখন I₂ এক্সিকিউট হচ্ছে, এবং একই সাথে I₃ ফেচ হচ্ছে!",
    en: "🚀 <strong>Clock 3 (Steady State):</strong> I₁ is complete! I₂ is executing in DPU while I₃ is being fetched by PCU!"
  },
  4: {
    bn: "🏁 <strong>Clock 4:</strong> I₂ শেষ হয়ে গেছে! পাইপলাইনের শেষ নির্দেশ I₃ এক্সিকিউট সম্পন্ন হচ্ছে।",
    en: "🏁 <strong>Clock 4:</strong> I₂ is complete! The final instruction I₃ finishes execution in DPU."
  }
};

function updatePipelineNarrator() {
  if (pipeNarrator) {
    pipeNarrator.innerHTML = pipeNarrations[currentPipeClock][currentLang];
  }
}

function updatePipelineHighlights() {
  if (clockCounter) clockCounter.textContent = currentPipeClock;

  // Clear clock th
  ['thC1', 'thC2', 'thC3', 'thC4'].forEach((thId, idx) => {
    const el = document.getElementById(thId);
    if (el) {
      if (idx + 1 === currentPipeClock) {
        el.classList.add('active-clock');
      } else {
        el.classList.remove('active-clock');
      }
    }
  });

  updatePipelineNarrator();
}

if (btnNextClock) {
  btnNextClock.addEventListener('click', () => {
    sounds.pipeAdvance();
    currentPipeClock = (currentPipeClock % 4) + 1;
    updatePipelineHighlights();
  });
}

if (btnResetPipe) {
  btnResetPipe.addEventListener('click', () => {
    sounds.click();
    currentPipeClock = 1;
    updatePipelineHighlights();
  });
}

// --- 6. Bilingual Quiz Engine (Lecture 5) ---
const quizData = {
  bn: [
    {
      question: "Big-Endian মোডে একটি ৩২-বিট ডেটার কোন বাইটটি সর্বনিম্ন মেমরি ঠিকানায় (Lowest Address) জমা থাকে?",
      options: [
        "সর্বনিম্ন গুরুত্বপূর্ণ বাইট (LSB)",
        "সবচেয়ে গুরুত্বপূর্ণ বাইট (Most Significant Byte - MSB)",
        "যেকোনো এলোমেলো বাইট",
        "সবসময় শূন্য (00H)"
      ],
      answer: 1,
      explanation: "স্লাইড ৯ অনুযায়ী: Big-Endian মোডে Most Significant Byte (MSB) সর্বনিম্ন ঠিকানায় (যেমন: ABCDE0H-এ 12H) জমা থাকে। Little-Endian-এ থাকে LSB।"
    },
    {
      question: "কোন কম্পিউটার আর্কিটেকচারে গাণিতিক অপারেশনের জন্য নির্দেশের ভেতরে কোনো রেজিস্টারের নাম উল্লেখ করতে হয় না?",
      options: [
        "৩-অপারেন্ড আর্কিটেকচার",
        "০-অপারেন্ড স্ট্যাক আর্কিটেকচার (0-Operand Stack Architecture)",
        "২-অপারেন্ড আর্কিটেকচার",
        "শুধুমাত্র কোয়ান্টাম কম্পিউটার"
      ],
      answer: 1,
      explanation: "স্লাইড ৭ ও ৮ অনুযায়ী: 0-Operand Architecture সরাসরি LIFO স্ট্যাক থেকে অপারেন্ড এক্সেস করে, তাই কোনো রেজিস্টার বা অ্যাড্রেস উল্লেখ করতে হয় না।"
    },
    {
      question: "একটি ২-স্টেজ ইন্সট্রাকশন পাইপলাইনে (Two-Stage Pipeline) কোন দুটি কাজ একই ক্লক সাইকেলে যুগপৎ (Simultaneously) সম্পন্ন হয়?",
      options: [
        "কম্পিউটার অন ও অফ করা",
        "একটি নির্দেশের Fetch এবং পূর্ববর্তী নির্দেশের Execute",
        "কীবোর্ড টাইপিং ও মনিটর বন্ধ থাকা",
        "শুধুমাত্র হার্ডডিস্ক ফরম্যাট করা"
      ],
      answer: 1,
      explanation: "স্লাইড ১৪ ও ১৫ অনুযায়ী: ২-স্টেজ পাইপলাইনে PCU যখন পরবর্তী নির্দেশ Fetch করে, DPU তখন বর্তমান নির্দেশ Execute করতে থাকে।"
    },
    {
      question: "MIPS প্রসেসরের ফিক্সড-লেংথ (Fixed-length 32-bit) ইন্সট্রাকশন ফরম্যাটের প্রধান সুবিধা কী?",
      options: [
        "এতে মেমরি অনেক বেশি নষ্ট হয়",
        "সহজ ও দ্রুতগতির ইন্সট্রাকশন ডিকোডিং এবং দ্রুত প্রিফেচিং (Prefetching)",
        "এটি শুধুমাত্র বাংলায় চলে",
        "এতে কোনো ক্লক পালস লাগে না"
      ],
      answer: 1,
      explanation: "স্লাইড ৪ অনুযায়ী: Fixed-length instruction format leads to simpler and faster instruction decoding and facilitates fast and effective prefetching of instructions।"
    },
    {
      question: "Register Indirect Addressing Mode (যেমন: M[R1])-এ আসল ডেটা বা অপারেন্ডটি কোথায় থাকে?",
      options: [
        "সরাসরি R1 রেজিস্টারের ভেতরেই",
        "R1 রেজিস্টারে থাকা মেমরি ঠিকানার ভেতর (In Memory at address held in R1)",
        "শুধুমাত্র কীবোর্ডের বাফারে",
        "প্রিন্টারের রিবনে"
      ],
      answer: 1,
      explanation: "স্লাইড ১০ অনুযায়ী: Register Indirect Addressing-এ ডেটার অবস্থান হলো M[R1], অর্থাৎ R1 রেজিস্টারে একটি মেমরি ঠিকানা থাকে যার ভেতর মূল ডেটা সংরক্ষিত।"
    }
  ],
  en: [
    {
      question: "In Big-Endian mode, which byte of a multi-byte word is stored at the lowest physical memory address?",
      options: [
        "Least Significant Byte (LSB)",
        "Most Significant Byte (MSB)",
        "Arbitrary parity byte",
        "Always null byte (00H)"
      ],
      answer: 1,
      explanation: "Slide 9 states: Big-Endian stores the Most Significant Byte (MSB) at the lowest memory address (e.g., 12H at ABCDE0H). Little-Endian stores the LSB first."
    },
    {
      question: "Which processor architecture requires NO explicit operand addresses/registers in arithmetic instructions?",
      options: [
        "3-Operand Architecture",
        "0-Operand Stack Architecture (LIFO Queue)",
        "2-Operand Architecture",
        "Accumulator Architecture"
      ],
      answer: 1,
      explanation: "Slides 7 & 8 specify: 0-Operand instructions access data implicitly from the LIFO stack via PUSH/POP, requiring no explicit register addresses."
    },
    {
      question: "In a 2-stage instruction pipeline, which two operations execute concurrently within the same clock cycle?",
      options: [
        "Powering off the chassis and writing firmware",
        "Fetching the next instruction (PCU) while executing the current instruction (DPU)",
        "Hard drive partitioning and keyboard scanning",
        "Cache flush and display blanking"
      ],
      answer: 1,
      explanation: "Slides 14 & 15 explain: Two instructions are processed simultaneously every clock cycle—one completing its fetch phase (PCU) and the other executing (DPU)."
    },
    {
      question: "What is the primary architectural advantage of Fixed-Length instruction formats like MIPS?",
      options: [
        "Consumes the absolute minimum memory bandwidth",
        "Simpler, faster instruction decoding and highly efficient prefetching",
        "Requires zero clock synchronization",
        "Operates without registers"
      ],
      answer: 1,
      explanation: "Slide 4 emphasizes: Fixed-length formats use the same number of bits for all instructions, enabling simpler and faster hardware decoding and efficient prefetching."
    },
    {
      question: "In Register Indirect Addressing Mode (e.g., M[R1]), where is the effective operand data located?",
      options: [
        "Directly inside register R1 itself",
        "In Main Memory at the address stored in register R1",
        "Embedded in the instruction opcode bits",
        "In the BIOS ROM chip"
      ],
      answer: 1,
      explanation: "Slide 10 designates: Register indirect addressing accesses data from M[R1], where register R1 serves as a memory address pointer."
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
      feedback = 'অসাধারণ! লেকচার ৫-এর এন্ডিয়ান মোড, অপারেন্ড আর্কিটেকচার ও পাইপলাইনিং তোমার সম্পূর্ণ আয়ত্তে চলে এসেছে!';
    } else if (percentage >= 60) {
      feedback = 'খুব ভালো! বিগ ও লিটল এন্ডিয়ান এবং পাইপলাইনিং ওভারল্যাপ টেবিলটি আরেকবার দেখে নিলে ১০০% পারফেক্ট!';
    } else {
      feedback = 'আরেকবার স্লাইড ও সিমুলেশনগুলো পর্যবেক্ষণ করো, তারপর আবার টেস্ট দাও!';
    }
  } else {
    if (percentage >= 80) {
      feedback = 'Brilliant! You have mastered Endianness, Operand Architectures, and 2-Stage Pipelining!';
    } else if (percentage >= 60) {
      feedback = 'Good job! A quick review of Big vs Little Endian memory layouts will cement your knowledge.';
    } else {
      feedback = 'Review the pipeline simulator and addressing modes, then retake the quiz!';
    }
  }

  const retryText = isBn ? '🔄 পুনরায় কুইজ দাও' : '🔄 Retake Quiz';

  cardContent.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
      <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">${heading}</h3>
      <div style="font-size: 2.5rem; font-family: var(--font-code); color: #c084fc; font-weight: 800; margin-bottom: 1rem;">
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

// --- 7. Mini-Game: Pipeline Traffic Controller & Hazard Buster ---
(function initPipelineHazard() {
  const btnStall = document.getElementById('btnStallBubble');
  const btnPredict = document.getElementById('btnPredictBranch');
  const throughputEl = document.getElementById('pipeThroughput');
  const gameClockEl = document.getElementById('gameClock');
  const feedbackEl = document.getElementById('hazardFeedback');
  const branchBadge = document.getElementById('instBranchBadge');

  if (!btnStall || !btnPredict) return;

  btnStall.addEventListener('click', (e) => {
    sounds.wrongBuzz();
    const isBn = currentLang === 'bn';

    if (throughputEl) throughputEl.textContent = '60%';
    if (gameClockEl) gameClockEl.textContent = '3 (2 Stalls)';

    if (branchBadge) {
      branchBadge.style.background = 'rgba(239, 68, 68, 0.3)';
      branchBadge.textContent = 'I3: STALL BUBBLE 🫧';
    }

    if (feedbackEl) {
      feedbackEl.style.color = '#f59e0b';
      feedbackEl.innerHTML = isBn
        ? '⚠️ <strong>পাইপলাইন স্টল:</strong> প্রসেসর ২ সাইকেল অপেক্ষা করেছে! ফলে পাইপলাইনের গতি কমে ৬০% হয়ে গেছে।'
        : '⚠️ <strong>Pipeline Stall:</strong> CPU waited 2 clock cycles! Pipeline throughput degraded to 60%.';
    }

    if (window.caoGame) {
      window.caoGame.addXP(15, 'Stall Analyzed', e);
    }
  });

  btnPredict.addEventListener('click', (e) => {
    sounds.correctChime();
    const isBn = currentLang === 'bn';

    if (throughputEl) throughputEl.textContent = '100% 🔥';
    if (gameClockEl) gameClockEl.textContent = '1';

    if (branchBadge) {
      branchBadge.style.background = 'rgba(16, 185, 129, 0.3)';
      branchBadge.style.borderColor = '#10b981';
      branchBadge.textContent = 'I3: PREDICTED ✓';
    }

    if (feedbackEl) {
      feedbackEl.style.color = '#34d399';
      feedbackEl.innerHTML = isBn
        ? '🎉 <strong>চমৎকার ব্রাঞ্চ প্রেডিকশন:</strong> কোনো বাবল ছাড়াই পাইপলাইন ১০০% গতিতে চলেছে! পাইপলাইন কমান্ডার ব্যাজ আনলকড!'
        : '🎉 <strong>Branch Prediction Hit:</strong> Zero bubbles! 100% full throughput sustained! Pipeline Commander unlocked!';
    }

    if (window.caoGame) {
      window.caoGame.addXP(50, 'Hazard Avoided', e);
      window.caoGame.unlockBadge('l5_pipeline');
    }
  });
})();

// Initial Run
applyLanguage(currentLang);
loadQuestion(0);
updateOperandDisplay();
updateEndianVisuals();
updatePipelineHighlights();

