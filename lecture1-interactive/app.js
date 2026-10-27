/* ==========================================================================
   Computer Architecture & Organization - Lecture 1 Interactive Engine
   Bilingual Support (English & বাংলা) + Simulators + Sound FX
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

  beadSlide(isUpper = false) {
    this.playTone(isUpper ? 520 : 750, 'sine', 0.06, 0.12);
  }

  clockPulse() {
    this.playTone(320, 'square', 0.12, 0.1);
  }

  correctChime() {
    this.playTone(587.33, 'triangle', 0.15, 0.12); // D5
    setTimeout(() => this.playTone(880, 'triangle', 0.3, 0.15), 100); // A5
  }

  wrongBuzz() {
    this.playTone(180, 'sawtooth', 0.2, 0.15);
  }
}

const sounds = new SoundEngine();

// --- 2. Comprehensive Bilingual Translations Dictionary ---
const translations = {
  bn: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_arch_org: "Architecture vs Org",
    nav_history: "Computing History",
    nav_brain_cpu: "Brain vs Computer",
    nav_elements: "Key Elements",
    nav_quiz: "Exam Quiz",
    nav_take_test: "টেস্ট দাও",
    hero_badge: "লেকচার ১ এর সম্পূর্ণ ভিজ্যুয়াল গাইড",
    hero_title: 'কম্পিউটার আর্কিটেকচার ও অর্গানাইজেশন<br><span class="gradient-text">সহজ ভাষায়, ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন সহ</span>',
    hero_subtitle: "বই বা স্লাইডের কাঠখোট্টা সংজ্ঞা মুখস্থ নয়! রিয়েল-টাইম সিমুলেটর, কাজ করা অ্যাবাকাস (Abacus), স্লাইড রুল ও ইন্টারেক্টিভ আর্কিটেকচার ল্যাব দিয়ে লেকচার ১ শিখে নাও মাত্র ২০ মিনিটে।",
    stat_arch: "কী করবে (What to do)",
    stat_org: "কীভাবে করবে (How to do)",
    stat_abacus: "অ্যাবাকাস থেকে শুরু",
    stat_brain: "মস্তিষ্ক ও কম্পিউটারের মিল",
    sec1_tag: "মডিউল ১ • স্লাইড ২ ও ৩",
    sec1_title: "Computer Architecture বনাম Computer Organization",
    sec1_desc: "অধিকাংশ স্টুডেন্ট এই দুইয়ের তফাত বুঝতে ভুল করে। নিচে সুইচ টগল করে দেখো প্রোগ্রামার কী দেখে আর হার্ডওয়্যার ইঞ্জিনিয়ার কী দেখে!",
    sec1_analogy_title: "বাস্তব জীবনের উদাহরণ: একটি স্বপ্নের বাড়ি",
    sec1_analogy_desc: "<strong>Architecture</strong> হলো বাড়ির ড্রয়িং বা প্ল্যান (কয়টা রুম থাকবে, বারান্দা কোন দিকে হবে, দরজা কোথায় বসবে)। এটি মালিক বা প্রোগ্রামারের চোখের ডিজাইন।<br><strong>Organization</strong> হলো কীভাবে বাড়িটি তৈরি হচ্ছে (কোন ব্র্যান্ডের রড, কোন মানের ইট-সিমেন্ট আর দেয়ালের ভেতর দিয়ে কীভাবে পাইপ ও তারের ওয়্যারিং নেওয়া হলো)।",
    sec1_lab_select: "ভিউ সিলেক্ট করো:",
    sec1_btn_arch: "🏛️ আর্কিটেকচার ভিউ (কম্পিউটার কী করে)",
    sec1_btn_org: "⚙️ অর্গানাইজেশন ভিউ (কীভাবে সম্পন্ন হয়)",
    sec1_arch_badge: "প্রোগ্রামার ভিউ (Programmer's Perspective)",
    sec1_arch_desc: "এটি হলো কম্পিউটারের সেই সমস্ত বৈশিষ্ট্য যা <strong>একজন প্রোগ্রামারের চোখে দৃশ্যমান</strong> (Visible to the programmer)। কম্পিউটার ফাংশনালি <em>কী কাজ করবে</em> তা আর্কিটেকচার ঠিক করে।",
    sec1_pill_isa: "📌 ইন্সট্রাকশন সেট (ISA)",
    sec1_pill_reg: "📌 সিপিইউ রেজিস্টার (R0, R1, PC)",
    sec1_pill_type: "📌 ডেটা টাইপ (Int, Float, Char)",
    sec1_pill_addr: "📌 অ্যাড্রেসিং মোড",
    sec1_code_head: "অ্যাসেম্বলি কোড (প্রোগ্রামার যা লেখে)",
    sec1_btn_runasm: "▶ রান করো",
    sec1_code_c1: "; R1 এ 5 রাখো",
    sec1_code_c2: "; R2 এ 3 রাখো",
    sec1_code_c3: "; R1 = R1 + R2 (ফলাফল 8)",
    sec1_box_log: "লজিক্যাল রেজিস্টার ভিউ",
    sec1_arch_note: "💡 প্রোগ্রামার শুধু দেখছে রেজিস্টারে ডেটা গেল এবং যোগ হয়ে ৮ হলো। ভেতরে তার দিয়ে কারেন্ট কীভাবে গেল তা প্রোগ্রামারের ভাবার দরকার নেই!",
    sec1_org_badge: "ইঞ্জিনিয়ার ভিউ (Hardware Engineer's Perspective)",
    sec1_org_desc: "আর্কিটেকচারের নির্দেশগুলো <strong>বাস্তবে কীভাবে হার্ডওয়্যার সার্কিটে কার্যকর হয়</strong> তাই হলো অর্গানাইজেশন। এটি কম্পিউটারের গাঠনিক সম্পর্ক (Structural Relationship) এবং ইন্টারনাল সিগন্যাল ডিল করে।",
    sec1_pill_signals: "⚡ কন্ট্রোল সিগন্যাল (Read/Write)",
    sec1_pill_bus: "🔌 ৩২-বিট বাস লাইন (Data/Address)",
    sec1_pill_clock: "⏱️ ক্লক ফ্রিকোয়েন্সি (যেমন ৩.২ GHz)",
    sec1_pill_circ: "🔬 সার্কিট ডিজাইন ও অ্যাডার ইউনিট",
    sec1_btn_pulse: "⚡ ক্লক পালস দাও",
    sec1_circuit_status: "ক্লক পালস দিলে সার্কিটে সিগন্যাল দৌড়াবে!",
    sec1_box_phys: "শারীরিক হার্ডওয়্যার সংযোগ (Physical Microarchitecture)",
    sec1_cu_sub: "অপকোড ডিকোড ও পালস পাঠায়",
    sec1_alu_sub: "ফুল অ্যাডার ও লজিক গেটস",
    sec1_org_note: "⚙️ এটি হলো পর্দার পেছনের কলকব্জা! একই Architecture (যেমন x86) কিন্তু Intel এবং AMD ভিন্ন ভিন্ন Organization দিয়ে বানিয়ে থাকে।",
    sec1_table_title: "📋 পরীক্ষার সুপারহিট টেবিল: Architecture vs Organization",
    sec1_table_sub: "এই টেবিলটি পরীক্ষায় সরাসরি ৩/৫ মার্কের প্রশ্ন হিসেবে আসে!",
    th_param: "প্যারামিটার",
    row1_title: "মূল কাজ (Core Focus)",
    row1_arch: "কম্পিউটার <strong>কী করবে</strong> তা বর্ণনা করে (Describes <em>what</em> the computer does).",
    row1_org: "কাজটি <strong>কীভাবে সম্পন্ন হবে</strong> তা নির্ধারণ করে (Describes <em>how</em> it is done).",
    row2_title: "আচরণ (Behavior)",
    row2_arch: "সিস্টেমের ফাংশনাল আচরণ (Functional behavior) নিয়ে কাজ করে।",
    row2_org: "উপাদানগুলোর অভ্যন্তরীণ গাঠনিক সম্পর্ক (Structural relationship) নিয়ে কাজ করে।",
    row3_title: "কার সাথে সংযোগ",
    row3_arch: "হার্ডওয়্যার ও সফটওয়্যারের মধ্যে সেতুবন্ধন রচনা করে।",
    row3_org: "সিস্টেমের ভেতরের যন্ত্রাংশ ও নেটওয়ার্কের সেগমেন্টগুলো নিয়ন্ত্রণ করে।",
    row4_title: "অন্তর্ভুক্ত উপাদান",
    row4_arch: "ইন্সট্রাকশন সেট, রেজিস্টার, ডেটা টাইপ, অ্যাড্রেসিং মোড।",
    row4_org: "সার্কিট ডিজাইন, পেরিফেরাল, অ্যাডার, কন্ট্রোল সিগন্যাল।",
    row5_title: "দৃশ্যমানতা (Visibility)",
    row5_arch: "প্রোগ্রামারদের জন্য দৃশ্যমান (Visible to programmer)।",
    row5_org: "প্রোগ্রামারদের কাছে অদৃশ্য, হার্ডওয়্যার ডিজাইনারের হাতে বাস্তবায়িত।",
    sec2_tag: "মডিউল ২ • স্লাইড ৪, ৫ ও ৬",
    sec2_title: "The Nature of Computing: গণনার আদি ইতিহাস",
    sec2_desc: "মানুষ প্রাচীনকাল থেকেই হিসাবের জন্য কোনো না কোনো সহায়ক মাধ্যম খুঁজেছে। নিচের ইন্টারেক্টিভ সিমুলেটরে নিজেই অ্যাবাকাস ও স্লাইড রুল চালিয়ে দেখো!",
    sec2_t1_title: "মানব মস্তিষ্ক ও আঙুল",
    sec2_t1_desc: "শুরুতে মানুষ নিজের আঙুল, নুড়িপাথর (pebbles), আর কাঠে বা হাড়ে দাগ কেটে (tally sticks) হিসাব রাখত।",
    sec2_t2_title: "অ্যাবাকাস (2700 B.C.)",
    sec2_t2_desc: "ফ্রেম ও তারের মধ্যে পুঁতি সাজিয়ে প্রথম মেকানিক্যাল গণনাকারী যন্ত্র আবিষ্কৃত হয় মেসোপটেমিয়ায়।",
    sec2_t3_title: "স্লাইড রুল (Slide Rule)",
    sec2_t3_desc: "লগারিদমের ওপর ভিত্তি করে স্কেল ঘষে বড় বড় গুণ-ভাগ করা হতো। ১৯৭২ সালে ক্যালকুলেটর আসার আগ পর্যন্ত জনপ্রিয় ছিল।",
    sec2_t4_title: "আধুনিক কম্পিউটার",
    sec2_t4_desc: "ইলেকট্রনিক চিপ, ট্রানজিস্টর ও ডিজিটাল বাইনারি লজিকের মাধ্যমে বিলিয়ন বিলিয়ন অপারেশন প্রতি সেকেন্ডে।",
    sec2_abacus_badge: "লাইভ সিমুলেটর • স্লাইড ৫",
    sec2_abacus_title: "🧮 আসল কাজ করা অ্যাবাকাস (Interactive Abacus)",
    sec2_abacus_desc: "পুঁতিগুলোতে ক্লিক করে উপরে-নিচে সরাও! দেখো কীভাবে ডানদিকের ১ম কলাম একক ($10^0$), ২য় কলাম দশক ($10^1$), ৩য় কলাম শতক ($10^2$) এবং ৪র্থ কলাম হাজার ($10^3$) প্রকাশ করে।",
    sec2_abacus_curr: "বর্তমান মান:",
    rod_1000: "হাজার ($10^3$)",
    rod_100: "শতক ($10^2$)",
    rod_10: "দশক ($10^1$)",
    rod_1: "একক ($10^0$)",
    btn_abacus_reset: "সব ক্লিয়ার করো (Reset)",
    btn_abacus_preset: "২০২৬ সেট করো",
    abacus_hint: "💡 উপরের পুঁতি বিমে নামালে ৫ যোগ হয়, নিচের পুঁতি বিমে উঠালে ১ যোগ হয়।",
    sec2_sr_badge: "স্লাইড রুল সিমুলেটর • স্লাইড ৬",
    sec2_sr_title: "📏 স্লাইড রুল (Slide Rule) ও লগারিদমের জাদু",
    sec2_sr_desc: "স্লাইড রুলে সংখ্যাগুলোকে সরাসরি স্কেলের দৈর্ঘ্যে রূপান্তর করা হয়। স্কেল দুটি পাশাপাশি যোগ করলেই <strong>log(a) + log(b) = log(a × b)</strong> নীতির কারণে গুণফল পাওয়া যায়!",
    sec2_sr_formula: "দৈর্ঘ্য যোগ c = a + b ⟹ গুণফল = X × Y",
    sr_label_a: "প্রথম সংখ্যা (A):",
    sr_label_b: "দ্বিতীয় সংখ্যা (B):",
    scale_d: "D স্কেল (Fixed)",
    scale_c: "C স্কেল (Sliding)",
    sr_insight_head: "স্লাইড রুল কেন ১৯৭২ পর্যন্ত রাজত্ব করেছে?",
    sr_insight_body: "কম্পিউটার বা ইলেকট্রনিক ক্যালকুলেটর আসার আগে নাসা (NASA)-এর অ্যাপোলো ১১ মিশনে চাঁদ অভিযানের মহাকাশচারীরাও কিন্তু পকেটে স্লাইড রুল নিয়ে গিয়েছিলেন!",
    sec3_tag: "মডিউল ৩ • স্লাইড ৭",
    sec3_title: "The Elements of Computers: মস্তিষ্ক বনাম কম্পিউটার",
    sec3_desc: "কম্পিউটার কি আসলেই মানুষের চেয়ে বুদ্ধিমান? স্লাইড ৭ অনুযায়ী মানুষের মস্তিষ্ক এবং কম্পিউটারের তুলনামূলক বিশ্লেষণ নিচে দেওয়া হলো।",
    brain_card_title: "Human Brain (মানুষের মস্তিষ্ক)",
    brain_role: "স্নায়ুতন্ত্রের মূল চালিকাশক্তি",
    brain_p1: "<strong>গুণগত বিশ্লেষণ (Qualitative Analysis):</strong> মানুষ যেকোনো নতুন পরিস্থিতি অতীতে ঘটা অভিজ্ঞতার সাথে মিলিয়ে মুহূর্তেই নতুন সমাধান বের করতে পারে।",
    brain_p2: "<strong>আবেগ ও অনুভূতি (Emotional Intelligence):</strong> ব্যঙ্গ বা রসিকতা বুঝতে পারে, মানুষের মুখের ভাব ও সুরের ওঠানামা বোঝে।",
    brain_p3: "<strong>জটিল সিদ্ধান্ত গ্রহণ:</strong> সীমিত তথ্যের ভিত্তিতে চমৎকার সিদ্ধান্ত নিতে পারে।",
    brain_p4: "<strong>সীমাবদ্ধতা:</strong> বড় বড় গাণিতিক হিসাব বা জটিল ডাটা মুখে মুখে করা খুব ধীরগতির এবং ভুল হতে পারে।",
    comp_card_title: "Computer (কম্পিউটার)",
    comp_role: "দ্রুতগতির গণনা যন্ত্র",
    comp_p1: "<strong>বিশাল গাণিতিক গতি (Quantitative Analysis):</strong> কোটি কোটি সংখ্যার গুণ, ভাগ বা ম্যাট্রিক্স অপারেশন চোখের পলকে নিখুঁতভাবে করতে পারে।",
    comp_p2: "<strong>ক্লান্তিহীন নির্ভুলতা:</strong> একই কাজ এক কোটি বার দিলেও কখনো ক্লান্ত হয় না বা ভুল করে না।",
    comp_p3: "<strong>স্মার্টনেস লিমিটেশন:</strong> হিসাব ভালো পারে মানেই কিন্তু কম্পিউটার মানুষের চেয়ে বেশি চালাক নয়! সে নির্দেশ ছাড়া নিজে কিছু ভাবতে পারে না।",
    comp_p4: "<strong>সহায়ক ভূমিকা:</strong> ক্যালকুলেটর বা কম্পিউটার মূলত মানুষের মস্তিষ্কের কাজের গতি বাড়ানোর এক বিশ্বস্ত সহকারী মাত্র।",
    sec3_dual_title: "মস্তিষ্কের ২টি মৌলিক কাজ ও কম্পিউটারের সাথে তাদের মিল (Slide 7 & 9)",
    sec3_dual_sub: "আমাদের মস্তিষ্ক যেভাবে কাজ ভাগ করে, কম্পিউটারও ঠিক সেই অনুকরণে নকশা করা হয়েছে:",
    f1_badge: "১. Control Function",
    f1_title: "নির্দেশ গ্রহণ ও সিকোয়েন্সিং",
    f1_desc: "কাজটি কী করতে হবে তার <strong>নির্দেশনা বোঝা (interpret)</strong> এবং কাজগুলো সঠিক ক্রমানুসারে (proper sequence) হচ্ছে কিনা তা তদারকি করা।",
    f1_match: "কম্পিউটারে এটি করে: <strong>CPU-এর Program Control Unit</strong>",
    f2_badge: "২. Executive Function",
    f2_title: "বাস্তবে কাজ সম্পাদন",
    f2_desc: "সুনির্দিষ্ট পদক্ষেপগুলো কার্যকর করা—যেমন: যোগ, বিয়োগ, গুণ ও ভাগ সম্পন্ন করা (Performing specific mathematical steps)।",
    f2_match: "কম্পিউটারে এটি করে: <strong>ALU (Arithmetic Logic Unit)</strong>",
    sec4_tag: "মডিউল ৪ • স্লাইড ৮ ও ৯",
    sec4_title: "The 4 Key Elements of Computers: প্রধান চারটি অংশ",
    sec4_desc: "মানুষ যখন হাতে-কলমে খাতা-কলম নিয়ে অংক করে, ঠিক সেই ধারণার ওপর ভিত্তি করেই কম্পিউটারের এই ৪টি মূল অঙ্গ গঠিত হয়েছে:",
    elem1_tag: "হাতে লেখার কাগজ",
    elem1_analog: "<strong>মানুষের সাথে তুলনা:</strong> মানুষ যেভাবে জটিল হিসাব করার সময় খাতায় বা রাফ কাগজে সংখ্যা লিখে রাখে, মেমরি হলো সেই খাতার পাতা!",
    elem1_desc: "<strong>উদ্দেশ্য:</strong> এটি প্রোগ্রামের সমস্ত নির্দেশাবলী (Instructions) এবং ডেটা (Data) ধারণ করে।",
    elem2_tag: "কম্পিউটারের মস্তিষ্ক",
    elem2_analog: "<strong>মানুষের সাথে তুলনা:</strong> মানুষের ব্রেইন। পুরো সিস্টেমের প্রধান অভিভাবক।",
    elem2_desc: "<strong>উদ্দেশ্য:</strong> এতে থাকে <em>Program Control Unit (Instruction Unit)</em>, যার কাজ মেমরি থেকে নির্দেশ আনা (Fetch) এবং তা বোঝা (Interpret)।",
    elem3_tag: "হিসাবকারী কারিগর",
    elem3_analog: "<strong>মানুষের সাথে তুলনা:</strong> মস্তিষ্কের ভেতরের গাণিতিক সেল বা পকেট ক্যালকুলেটর।",
    elem3_desc: "<strong>উদ্দেশ্য:</strong> এটি CPU-এর ডেটা প্রসেসিং ও এক্সিকিউশন ইউনিট। এটি নির্দেশ অনুযায়ী আসল যোগ, বিয়োগ ও লজিক্যাল গণনা সম্পন্ন করে।",
    elem4_tag: "চোখ-কান ও হাত-মুখ",
    elem4_analog: "<strong>মানুষের সাথে তুলনা:</strong> মানুষের পঞ্চ ইন্দ্রিয় (চোখ, কান দিয়ে গ্রহণ করা) এবং হাত-মুখ (কথা বলে বা লিখে ফলাফল প্রকাশ করা)।",
    elem4_desc: "<strong>উদ্দেশ্য:</strong> ব্যবহারকারীর কাছ থেকে ডেটা নেওয়া এবং প্রসেস করা ফলাফল প্রদর্শনের মাধ্যম।",
    sec4_pipe_badge: "ইন্টারেক্টিভ সিমুলেশন",
    sec4_pipe_title: "🔄 কম্পিউটার কীভাবে একটি কাজ সম্পন্ন করে? (The 4-Step Cycle)",
    sec4_pipe_desc: "নিচের স্টেপ বাটনগুলোতে ক্রমান্বয়ে ক্লিক করে দেখো কীভাবে মেমরি থেকে ALU পর্যন্ত ডেটা প্রবাহিত হয়!",
    btn_pipe_auto: "▶ অটো-প্লে করো",
    flow_sub1: "মেমরি থেকে নির্দেশ আনা",
    flow_sub2: "Control Unit ব্যাখ্যা করে",
    flow_sub3: "ALU যোগ/বিয়োগ করে",
    flow_sub4: "ফলাফল সংরক্ষণ ও প্রদর্শন",
    pipe_default_narrator: '"অটো-প্লে করো" অথবা যেকোনো স্টেপে ক্লিক করে পুরো কম্পিউটার চক্রটির লাইভ ট্র্যাকিং দেখো!',
    sec5_tag: "পরীক্ষা প্রস্তুতি • কুইজ জোন",
    sec5_title: "লেকচার ১ এর স্ব-মূল্যায়ন টেস্ট (Self Quiz)",
    sec5_desc: "লেকচার ১ কতটুকু বুঝতে পারলে তা এখনই এই ৫টি গুরুত্বপূর্ণ প্রশ্নের উত্তর দিয়ে যাচাই করে নাও!",
    quiz_score_prefix: "স্কোর:",
    btn_next_q: "পরবর্তী প্রশ্ন ➡️",
    cheat_title: "পরীক্ষার আগের রাতের ১০ মিনিটের কুইক রিভিশন সারাংশ",
    cheat_item1: "<strong>Architecture:</strong> কম্পিউটার কী করবে (What it does) • প্রোগ্রামারের চোখে দৃশ্যমান • ISA, রেজিস্টার, ডেটা টাইপ, অ্যাড্রেসিং মোড।",
    cheat_item2: "<strong>Organization:</strong> কীভাবে সম্পন্ন হবে (How it is done) • অভ্যন্তরীণ গাঠনিক রূপ • কন্ট্রোল সিগন্যাল, অ্যাডার সার্কিট, মেমরি প্রযুক্তি।",
    cheat_item3: "<strong>Abacus (2700 B.C.):</strong> ডানে $10^0$, তারপর $10^1$, $10^2$ কলামে দশমিক গণনা।",
    cheat_item4: "<strong>Slide Rule (used till 1972):</strong> লগারিদম ভিত্তিক দৈর্ঘ্য যোগ করে গুণ করার মেকানিক্যাল স্কেল।",
    cheat_item5: "<strong>Brain vs Computer:</strong> ব্রেন সেরা qualitative analysis-এ, কম্পিউটার সেরা quantitative calculations-এ।",
    cheat_item6: "<strong>4 Elements:</strong> Memory (কাগজের মতো), CPU (মস্তিষ্ক), ALU (হিসাবকারী), I/O (যোগাযোগ)।",
    duel_badge: "⚔️ মিনি-গেম • রিফ্লেক্স চ্যালেঞ্জ",
    duel_score_label: "ডুয়েল স্কোর:",
    duel_title: "মানুষ বনাম কম্পিউটার: দ্রুত গাণিতিক দ্বৈরথ (Mental Math Speed Duel)",
    duel_desc: "কম্পিউটার প্রতি সেকেন্ডে কোটি কোটি গণনা করে, কিন্তু মানুষ দ্রুত অনুমান ও প্যাটার্ন মেলাতে পারে। নিচের গণিত চ্যালেঞ্জে কম্পিউটার টাইমারের আগে সঠিক উত্তরে ক্লিক করো! ৩ রাউন্ড জিতলে বিশেষ ব্যাজ ও ১০০ এক্সপি আনলক হবে!",
    duel_round_initial: "রাউন্ড ১ / ৩",
    duel_cpu_label: "CPU গণনা করছে...",
    vault_badge: "🎯 এক্সাম মাস্টার ভল্ট • DIU CSE",
    l1_math_title: "পরীক্ষার গাণিতিক সমস্যা ও মডেল সমাধান (Exam Math & Model Answers)",
    l1_math_sub: "ডিআইইউ পরীক্ষার কমন ম্যাথ, ক্লক ফ্রিকোয়েন্সি ক্যালকুলেশন এবং চিত্রসহ মডেল প্রশ্ন-উত্তর:",
    l1_p1_tag: "ম্যাথ প্রবলেম ১ • ব্লুমস লেভেল ৩ (Apply)",
    l1_p1_title: "Clock Frequency থেকে Clock Period নির্ণয়",
    l1_p1_statement: "<strong>প্রশ্ন:</strong> একটি আধুনিক সিপিইউ <code>4.0 GHz</code> ক্লক ফ্রিকোয়েন্সিতে চলে। প্রতিটি ক্লক সাইকেলের পর্যায়কাল (Clock Period, $T$) ন্যানোসেকেন্ড (ns) ও পিকোসেকেন্ডে (ps) কত?",
    l1_p1_s1: "<strong>সূত্র:</strong> $T = \\frac{1}{f}$",
    l1_p1_s2: "যেখানে, $f = 4.0\\text{ GHz} = 4.0 \\times 10^9\\text{ Hz}$",
    l1_p1_s3: "$T = \\frac{1}{4.0 \\times 10^9\\text{ s}^{-1}} = 0.25 \\times 10^{-9}\\text{ s}$",
    l1_p1_res: "✅ <strong>ফলাফল:</strong> $T = 0.25\\text{ ns} = 250\\text{ ps}$ (পিকোসেকেন্ড)",
    l1_p2_tag: "ম্যাথ প্রবলেম ২ • ব্লুমস লেভেল ৩ (Apply)",
    l1_p2_title: "সিপিইউ বনাম মানুষের গণনার সময়ের অনুপাত",
    l1_p2_statement: "<strong>প্রশ্ন:</strong> একজন মানুষ প্রতি সেকেন্ডে ১টি গাণিতিক যোগ করতে পারে। একটি ৩ গিগাহার্টজ প্রসেসর প্রতি সেকেন্ডে ৩ বিলিয়ন অপারেশন করতে পারলে মানুষের ১ বছরের কাজের সমান হিসাব করতে সিপিইউর কত সময় লাগবে?",
    l1_p2_s1: "১ বছরে সেকেন্ড সংখ্যা = $365 \\times 24 \\times 3600 \\approx 31,536,000$ সেকেন্ড (মানুষের গণনা)।",
    l1_p2_s2: "সিপিইউ প্রতি সেকেন্ডে গণনা = $3 \\times 10^9$ অপারেশন।",
    l1_p2_s3: "সিপিইউর প্রয়োজনীয় সময় = $\\frac{31,536,000}{3 \\times 10^9} \\approx 0.0105\\text{ s}$",
    l1_p2_res: "✅ <strong>ফলাফল:</strong> মানুষের ১ বছরের অংক করতে সিপিইউর সময় লাগে মাত্র <strong>১০.৫ মিলিসেকেন্ড</strong>!",
    l1_bp_title: "পরীক্ষার খাতায় আঁকার জন্য ১০০% পারফেক্ট ডায়াগ্রাম: 4 Key Elements of Computers",
    l1_bp_tip: "💡 <strong>Exam Tip:</strong> খাতায় এই ডায়াগ্রাম আঁকলে শিক্ষক পূর্ণ নম্বর দেন। মেমরি থেকে কন্ট্রোল ইউনিটে নির্দেশ যায়, আর কন্ট্রোল ইউনিট ALU-কে নিয়ন্ত্রণ করে।",
    l1_fact_badge: "রোমাঞ্চকর অজানা তথ্য • Did You Know?",
    l1_fact_title: "অ্যাপোলো ১১ ও নাসার পকেট স্লাইড রুল!",
    l1_fact_body: "১৯৬৯ সালে নীল আর্মস্ট্রং ও বাজ অলড্রিন যখন চাঁদে অবতরণ করেন, তখন মহাকাশযানের অ্যাপোলো গাইডেন্স কম্পিউটার (AGC) ক্র্যাশ করলে তারা পকেট থেকে একটি অ্যালুমিনিয়াম <strong>Pickett Slide Rule</strong> বের করে জরুরি ম্যানুয়াল নেভিগেশন হিসাব করেছিলেন! ১৯৭২ সালে হিউলেট-প্যাকার্ড (HP-35) পকেট সায়েন্টিফিক ক্যালকুলেটর বাজারে আনার পরই শত শত বছর ধরে চলা স্লাইড রুল ইতিহাসের পাতায় চলে যায়।",
    footer_title: "কম্পিউটার আর্কিটেকচার অ্যান্ড অর্গানাইজেশন (CAO) — লেকচার ১ মাস্টারক্লাস",
    footer_sub: "ডিজাইন করা হয়েছে স্পষ্টতা, গভীর বোধগম্যতা ও পরীক্ষার পূর্ণ প্রস্তুতির জন্য।"
  },
  en: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_arch_org: "Architecture vs Org",
    nav_history: "Computing History",
    nav_brain_cpu: "Brain vs Computer",
    nav_elements: "Key Elements",
    nav_quiz: "Exam Quiz",
    nav_take_test: "Take Quiz",
    hero_badge: "Comprehensive Lecture 1 Visual Masterclass",
    hero_title: 'Computer Architecture & Organization<br><span class="gradient-text">Interactive Visual Masterclass & Lab</span>',
    hero_subtitle: "Stop memorizing dry definitions! Master CAO Lecture 1 in 20 minutes with our real-time architecture vs organization lab, working Abacus, Slide Rule simulator, and exam quiz.",
    stat_arch: "What it does",
    stat_org: "How it is done",
    stat_abacus: "Since 2700 B.C.",
    stat_brain: "Brain & CPU Synergy",
    sec1_tag: "MODULE 1 • SLIDES 2 & 3",
    sec1_title: "Computer Architecture vs. Computer Organization",
    sec1_desc: "Most students confuse these two core concepts. Toggle the view below to see what a programmer sees versus what a hardware designer sees!",
    sec1_analogy_title: "Real-World Analogy: Building a Dream House",
    sec1_analogy_desc: "<strong>Architecture</strong> is the architectural floor plan (how many rooms, where doors and balconies are located). It is the design visible to the owner/programmer.<br><strong>Organization</strong> is the actual engineering construction (concrete grades, rebar specs, electrical conduits, and plumbing inside the walls).",
    sec1_lab_select: "Select Perspective:",
    sec1_btn_arch: "🏛️ Architecture View (What it does)",
    sec1_btn_org: "⚙️ Organization View (How it is done)",
    sec1_arch_badge: "Programmer's Perspective",
    sec1_arch_desc: "These are the computer system attributes <strong>directly visible to the programmer</strong>. Architecture specifies <em>what</em> the computer does functionally.",
    sec1_pill_isa: "📌 Instruction Set (ISA)",
    sec1_pill_reg: "📌 CPU Registers (R0, R1, PC)",
    sec1_pill_type: "📌 Data Types (Int, Float, Char)",
    sec1_pill_addr: "📌 Addressing Modes",
    sec1_code_head: "Assembly Code (Programmer writes)",
    sec1_btn_runasm: "▶ Run Assembly",
    sec1_code_c1: "; Load 5 into R1",
    sec1_code_c2: "; Load 3 into R2",
    sec1_code_c3: "; R1 = R1 + R2 (Result: 8)",
    sec1_box_log: "Logical Registers View",
    sec1_arch_note: "💡 The programmer only observes that registers received values and 5+3 became 8. How electrical current traveled through microscopic wires is abstracted away!",
    sec1_org_badge: "Hardware Engineer's Perspective",
    sec1_org_desc: "Organization defines <strong>how the architecture is physically implemented in hardware circuits</strong>. It governs structural relationships and internal operational signals.",
    sec1_pill_signals: "⚡ Control Signals (Read/Write)",
    sec1_pill_bus: "🔌 32-bit Bus Lines (Data/Address)",
    sec1_pill_clock: "⏱️ Clock Frequency (e.g., 3.2 GHz)",
    sec1_pill_circ: "🔬 Circuit Design & Adder Units",
    sec1_btn_pulse: "⚡ Send Clock Pulse",
    sec1_circuit_status: "Clock pulse will propagate signals across circuits!",
    sec1_box_phys: "Physical Microarchitecture Interconnect",
    sec1_cu_sub: "Decodes opcode & pulses",
    sec1_alu_sub: "Full Adders & Logic Gates",
    sec1_org_note: "⚙️ This is under the hood! Intel and AMD share the exact same x86 Architecture, but have completely different internal Organizations.",
    sec1_table_title: "📋 High-Yield Exam Cheat Table: Architecture vs Organization",
    sec1_table_sub: "This exact comparison table is frequently tested for 3 to 5 marks in exams!",
    th_param: "Parameter",
    row1_title: "Core Focus",
    row1_arch: "Describes <strong>what</strong> the computer does.",
    row1_org: "Describes <strong>how</strong> it is done.",
    row2_title: "System Behavior",
    row2_arch: "Deals with the functional behavior of computer systems.",
    row2_org: "Deals with the structural relationship and performance.",
    row3_title: "Coordination",
    row3_arch: "Coordinates between hardware and software of the system.",
    row3_org: "Handles internal hardware units and network segments.",
    row4_title: "Key Elements",
    row4_arch: "Instruction sets, registers, data types, and addressing modes.",
    row4_org: "Circuit designs, peripherals, adders, and control signals.",
    row5_title: "Visibility",
    row5_arch: "Attributes visible to the programmer.",
    row5_org: "Invisible to programmer; implemented by hardware designers.",
    sec2_tag: "MODULE 2 • SLIDES 4, 5 & 6",
    sec2_title: "The Nature of Computing: Historical Computational Aids",
    sec2_desc: "Throughout history, humans sought computational aids to extend their mental abilities. Experience the Abacus and Slide Rule in the simulators below!",
    sec2_t1_title: "Human Brain & Counting",
    sec2_t1_desc: "Earliest humans used fingers, pebbles (stones), or notched tally sticks for counting purposes.",
    sec2_t2_title: "The Abacus (2700 B.C.)",
    sec2_t2_desc: "Mechanical calculating device using sliding beads on rods within a frame to represent positional decimal places.",
    sec2_t3_title: "The Slide Rule",
    sec2_t3_desc: "Logarithmic scale-based mechanical calculator used universally by engineers until 1972.",
    sec2_t4_title: "Modern Computers",
    sec2_t4_desc: "Silicon integrated circuits, transistors, and binary digital logic processing billions of instructions per second.",
    sec2_abacus_badge: "Live Simulator • Slide 5",
    sec2_abacus_title: "🧮 Interactive Working Abacus (Soroban)",
    sec2_abacus_desc: "Click the beads to slide them towards the reckoning beam! Notice how the rightmost rod is units ($10^0$), followed by tens ($10^1$), hundreds ($10^2$), and thousands ($10^3$).",
    sec2_abacus_curr: "Current Value:",
    rod_1000: "Thousands ($10^3$)",
    rod_100: "Hundreds ($10^2$)",
    rod_10: "Tens ($10^1$)",
    rod_1: "Units ($10^0$)",
    btn_abacus_reset: "Reset All",
    btn_abacus_preset: "Preset 2026",
    abacus_hint: "💡 Moving an upper bead down to the beam adds 5. Moving a lower bead up to the beam adds 1.",
    sec2_sr_badge: "Slide Rule Simulator • Slide 6",
    sec2_sr_title: "📏 The Slide Rule & The Magic of Logarithms",
    sec2_sr_desc: "Numbers are represented by proportional lengths on logarithmic scales. Because <strong>log(a) + log(b) = log(a × b)</strong>, adding two physical lengths multiplies two numbers!",
    sec2_sr_formula: "Length addition: c = a + b ⟹ Multiplication: X × Y",
    sr_label_a: "First Value (A):",
    sr_label_b: "Second Value (B):",
    scale_d: "D Scale (Fixed)",
    scale_c: "C Scale (Sliding)",
    sr_insight_head: "Why did the Slide Rule reign until 1972?",
    sr_insight_body: "Before portable electronic calculators like the HP-35 arrived in 1972, Apollo 11 astronauts and engineers carried slide rules to the Moon!",
    sec3_tag: "MODULE 3 • SLIDE 7",
    sec3_title: "The Elements of Computers: Brain versus Computer",
    sec3_desc: "Are computers truly smarter than humans? Slide 7 explores the qualitative vs. quantitative duel between biological brains and silicon chips.",
    brain_card_title: "Human Brain (Biological)",
    brain_role: "Nervous System Command Center",
    brain_p1: "<strong>Qualitative Analysis:</strong> Excels at evaluating new situations by recalling past experiences and making inferences.",
    brain_p2: "<strong>Emotional Intelligence:</strong> Interprets tone, facial nuances, context, humor, and sarcasm intuitively.",
    brain_p3: "<strong>Adaptive Decisions:</strong> Makes brilliant executive choices even with ambiguous or incomplete data.",
    brain_p4: "<strong>Limitation:</strong> Manual multi-digit calculations are slow and prone to fatigue/error.",
    comp_card_title: "Digital Computer (Silicon)",
    comp_role: "High-Speed Deterministic Engine",
    comp_p1: "<strong>Quantitative Analysis:</strong> Crushes billions of mathematical equations and matrix calculations in fractions of a millisecond.",
    comp_p2: "<strong>Tireless Precision:</strong> Repeats repetitive instructions billions of times without fatigue or deviation.",
    comp_p3: "<strong>Smartness Reality:</strong> High speed does not mean higher overall intelligence; it cannot think outside its programmed instructions.",
    comp_p4: "<strong>Auxiliary Role:</strong> Pocket calculators and computers serve primarily as computational aids to the human brain.",
    sec3_dual_title: "Dual Brain Functions & Their Computer Equivalents (Slides 7 & 9)",
    sec3_dual_sub: "Computers are modeled after the two distinct cognitive functions of the human brain:",
    f1_badge: "1. Control Function",
    f1_title: "Instruction Interpretation & Sequencing",
    f1_desc: "Interprets instructions and ensures they are executed in the correct sequential order.",
    f1_match: "Implemented in computers by: <strong>CPU Program Control Unit</strong>",
    f2_badge: "2. Executive Function",
    f2_title: "Actual Operation Execution",
    f2_desc: "Executes the specific mathematical operations such as addition, subtraction, multiplication, and division.",
    f2_match: "Implemented in computers by: <strong>ALU (Arithmetic Logic Unit)</strong>",
    sec4_tag: "MODULE 4 • SLIDES 8 & 9",
    sec4_title: "The 4 Key Elements of Computers",
    sec4_desc: "Just as a person performs arithmetic with scratch paper, pencil, and eyes, a computer is constructed of 4 fundamental units:",
    elem1_tag: "Scratchpad / Paper",
    elem1_analog: "<strong>Human Analogy:</strong> Corresponds to the paper used in manual calculations to record numbers and steps.",
    elem1_desc: "<strong>Purpose:</strong> Stores both active program instructions and operand data.",
    elem2_tag: "Central Brain",
    elem2_analog: "<strong>Human Analogy:</strong> The brain. Master orchestrator of the entire system.",
    elem2_desc: "<strong>Purpose:</strong> Contains the <em>Program Control Unit</em> to fetch instructions from memory and interpret them.",
    elem3_tag: "Math Engine",
    elem3_analog: "<strong>Human Analogy:</strong> The pocket calculator or arithmetic processing region of the brain.",
    elem3_desc: "<strong>Purpose:</strong> Part of the CPU execution unit; carries out arithmetic and logical operations.",
    elem4_tag: "Senses & Interaction",
    elem4_analog: "<strong>Human Analogy:</strong> Senses (eyes/ears to receive data) and voice/hands (to output results).",
    elem4_desc: "<strong>Purpose:</strong> Transfers data between the computer and external users or peripheral devices.",
    sec4_pipe_badge: "Interactive Simulation",
    sec4_pipe_title: "🔄 How a Computer Executes Instructions (4-Step Cycle)",
    sec4_pipe_desc: "Click the step buttons below to trace the flow from Memory through the CPU to the ALU!",
    btn_pipe_auto: "▶ Auto Play",
    flow_sub1: "Fetch instruction from Memory",
    flow_sub2: "Control Unit decodes opcode",
    flow_sub3: "ALU executes arithmetic/logic",
    flow_sub4: "Store result & output",
    pipe_default_narrator: 'Click "Auto Play" or click any step above to trace instruction execution in real time!',
    sec5_tag: "EXAM MASTERY • QUIZ ZONE",
    sec5_title: "Lecture 1 Self-Assessment Quiz",
    sec5_desc: "Test your mastery of Lecture 1 key concepts with these 5 high-yield exam questions!",
    quiz_score_prefix: "Score:",
    btn_next_q: "Next Question ➡️",
    cheat_title: "10-Minute Exam Night Quick Revision Cheat Sheet",
    cheat_item1: "<strong>Architecture:</strong> What it does • Visible to programmer • ISA, Registers, Data types, Addressing modes.",
    cheat_item2: "<strong>Organization:</strong> How it is done • Structural relationship • Control signals, Adders, Circuit, Memory tech.",
    cheat_item3: "<strong>Abacus (2700 B.C.):</strong> Positional decimal columns: rightmost 10⁰, then 10¹, 10², 10³.",
    cheat_item4: "<strong>Slide Rule (used till 1972):</strong> Logarithmic mechanical scales where adding lengths multiplies numbers.",
    cheat_item5: "<strong>Brain vs Computer:</strong> Brain excels at qualitative analysis; computer dominates quantitative throughput.",
    cheat_item6: "<strong>4 Elements:</strong> Main Memory (Paper), CPU (Brain/Control), ALU (Execution), I/O (Senses).",
    duel_badge: "⚔️ Mini-Game • Reflex Challenge",
    duel_score_label: "Duel Score:",
    duel_title: "Human Brain vs Silicon CPU: Mental Math Speed Duel",
    duel_desc: "While computers crush billions of calculations per second, humans excel at instantaneous heuristic pattern matching. Beat the CPU timer in this rapid mental math duel! Win 3 rounds to unlock an exclusive badge and 100 XP!",
    duel_round_initial: "Round 1 / 3",
    duel_cpu_label: "CPU Calculating...",
    vault_badge: "🎯 EXAM MASTER VAULT • DIU CSE",
    l1_math_title: "Exam Mathematical Problems & Model Answers",
    l1_math_sub: "DIU Common Math, Clock Frequency Calculations & Model Architecture Blueprint:",
    l1_p1_tag: "Math Problem 1 • Bloom's Level 3 (Apply)",
    l1_p1_title: "Calculating Clock Period from Clock Frequency",
    l1_p1_statement: "<strong>Question:</strong> A modern CPU runs at a clock frequency of <code>4.0 GHz</code>. Determine the clock period ($T$) of each clock cycle in nanoseconds (ns) and picoseconds (ps).",
    l1_p1_s1: "<strong>Formula:</strong> $T = \\frac{1}{f}$",
    l1_p1_s2: "Where, $f = 4.0\\text{ GHz} = 4.0 \\times 10^9\\text{ Hz}$",
    l1_p1_s3: "$T = \\frac{1}{4.0 \\times 10^9\\text{ s}^{-1}} = 0.25 \\times 10^{-9}\\text{ s}$",
    l1_p1_res: "✅ <strong>Result:</strong> $T = 0.25\\text{ ns} = 250\\text{ ps}$ (picoseconds)",
    l1_p2_tag: "Math Problem 2 • Bloom's Level 3 (Apply)",
    l1_p2_title: "CPU vs. Human Computation Time Ratio",
    l1_p2_statement: "<strong>Question:</strong> A human can perform 1 mental addition per second. If a 3.0 GHz CPU executes 3 billion operations per second, how long will it take the CPU to complete what a human computes in 1 year of continuous work?",
    l1_p2_s1: "Total seconds in 1 year = $365 \\times 24 \\times 3600 \\approx 31,536,000$ seconds (human workload).",
    l1_p2_s2: "CPU operations per second = $3 \\times 10^9$ ops/s.",
    l1_p2_s3: "Required CPU time = $\\frac{31,536,000}{3 \\times 10^9} \\approx 0.0105\\text{ s}$",
    l1_p2_res: "✅ <strong>Result:</strong> What takes a human 1 whole year to calculate takes the CPU merely <strong>10.5 milliseconds</strong>!",
    l1_bp_title: "100% Exam-Perfect Blueprint: The 4 Key Elements of Computers",
    l1_bp_tip: "💡 <strong>Exam Tip:</strong> Drawing this structural diagram yields full marks in university exams. Instructions flow from Memory to Control Unit, which governs the ALU execution!",
    l1_fact_badge: "Fascinating History • Did You Know?",
    l1_fact_title: "Apollo 11 Astronauts & The Pocket Slide Rule!",
    l1_fact_body: "In 1969, when Neil Armstrong and Buzz Aldrin landed on the Moon, Apollo Guidance Computer (AGC) contingencies required astronauts to carry an aluminum <strong>Pickett Slide Rule</strong> in their spacesuit pockets for emergency manual orbital navigation! It was only in 1972, with Hewlett-Packard's HP-35 scientific calculator, that slide rules finally transitioned to history books.",
    footer_title: "Computer Architecture and Organization (CAO) — Lecture 1 Masterclass",
    footer_sub: "Engineered for intuitive comprehension, visual mastery, and top exam performance."
  }
};

let currentLang = localStorage.getItem('cao_lang') || 'bn';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('cao_lang', lang);
  document.documentElement.lang = lang;

  // Toggle button styling
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

  // Update all elements with data-i18n
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update Slide Rule Hairline tag
  const cursorTag = document.getElementById('cursorResultTag');
  const srA = document.getElementById('srMultiplicand');
  const srB = document.getElementById('srMultiplier');
  if (cursorTag && srA && srB) {
    const prod = (parseFloat(srA.value) * parseFloat(srB.value)).toFixed(1);
    cursorTag.textContent = (lang === 'bn' ? 'ফলাফল: ' : 'Result: ') + prod;
  }

  // Update dynamic quiz card if not finished
  if (typeof renderCurrentQuestion === 'function' && !quizFinished) {
    renderCurrentQuestion();
  }

  // Update pipeline narration text if active
  if (typeof updatePipelineNarrationLang === 'function') {
    updatePipelineNarrationLang();
  }

  // Notify shared gamification HUD & passport modal
  window.dispatchEvent(new CustomEvent('caoLanguageChanged', { detail: { lang } }));
}

// Bind language switcher buttons
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

// Sound toggle button
const soundToggleBtn = document.getElementById('soundToggleBtn');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    soundToggleBtn.querySelector('.icon').textContent = sounds.enabled ? '🔊' : '🔇';
    soundToggleBtn.style.opacity = sounds.enabled ? '1' : '0.6';
  });
}

// --- 3. Architecture vs Organization Switcher ---
const viewArchBtn = document.getElementById('viewArchBtn');
const viewOrgBtn = document.getElementById('viewOrgBtn');
const archViewPanel = document.getElementById('archViewPanel');
const orgViewPanel = document.getElementById('orgViewPanel');

if (viewArchBtn && viewOrgBtn) {
  viewArchBtn.addEventListener('click', () => {
    sounds.click();
    viewArchBtn.classList.add('active');
    viewOrgBtn.classList.remove('active');
    archViewPanel.classList.add('active');
    orgViewPanel.classList.remove('active');
  });

  viewOrgBtn.addEventListener('click', () => {
    sounds.click();
    viewOrgBtn.classList.add('active');
    viewArchBtn.classList.remove('active');
    orgViewPanel.classList.add('active');
    archViewPanel.classList.remove('active');
  });
}

// Assembly Simulation
const runAsmBtn = document.getElementById('runAsmBtn');
const valR1 = document.getElementById('valR1');
const valR2 = document.getElementById('valR2');
const valPC = document.getElementById('valPC');
const valFlags = document.getElementById('valFlags');
const regR1 = document.getElementById('regR1');

if (runAsmBtn) {
  let asmRunning = false;
  runAsmBtn.addEventListener('click', () => {
    if (asmRunning) return;
    asmRunning = true;
    sounds.click();

    valR1.textContent = '5';
    valR2.textContent = '3';
    valPC.textContent = '0x000';
    valFlags.textContent = 'Z=0, C=0';

    setTimeout(() => {
      sounds.beadSlide();
      valPC.textContent = '0x004';
      regR1.classList.add('highlight');
    }, 400);

    setTimeout(() => {
      sounds.clockPulse();
      valR1.textContent = '8 (5+3)';
      valPC.textContent = '0x008';
      valFlags.textContent = 'Z=0, C=0';
    }, 900);

    setTimeout(() => {
      regR1.classList.remove('highlight');
      asmRunning = false;
    }, 1600);
  });
}

// Clock Pulse Simulation
const triggerClockPulseBtn = document.getElementById('triggerClockPulseBtn');
const circCU = document.getElementById('circCU');
const circBus = document.getElementById('circBus');
const circALU = document.getElementById('circALU');
const circuitStatusText = document.getElementById('circuitStatusText');

if (triggerClockPulseBtn) {
  triggerClockPulseBtn.addEventListener('click', () => {
    sounds.clockPulse();
    const isBn = currentLang === 'bn';
    circuitStatusText.textContent = isBn 
      ? '⚡ ক্লক পালস সক্রিয়! Control Unit থেকে সিগন্যাল পাঠানো হচ্ছে...' 
      : '⚡ Clock pulse active! Control Unit emitting control signals...';
    circCU.classList.add('pulsing');
    circBus.classList.add('transmitting');

    setTimeout(() => {
      circuitStatusText.textContent = isBn
        ? '🔌 ডেটা ও কন্ট্রোল বাসের মাধ্যমে সিগন্যাল ALU ইউনিটে পৌঁছাল!'
        : '🔌 Signals routed via 32-bit bus to the ALU execution unit!';
      circALU.classList.add('pulsing');
    }, 600);

    setTimeout(() => {
      circuitStatusText.textContent = isBn
        ? '✅ Full Adder সার্কিটের মাধ্যমে বিট লেভেলে যোগ সম্পন্ন হলো!'
        : '✅ Full adder logic gate circuits finished bitwise addition!';
    }, 1200);

    setTimeout(() => {
      circCU.classList.remove('pulsing');
      circBus.classList.remove('transmitting');
      circALU.classList.remove('pulsing');
      circuitStatusText.textContent = isBn
        ? 'ক্লক পালস সমাপ্ত। সিস্টেম পরবর্তী ক্লক সাইকেলের জন্য প্রস্তুত।'
        : 'Pulse complete. System ready for next clock cycle.';
    }, 2200);
  });
}

// --- 4. Interactive Abacus Simulator ---
const abacusValueDisplay = document.getElementById('abacusValueDisplay');
const abacusFrame = document.getElementById('abacusFrame');
const resetAbacusBtn = document.getElementById('resetAbacusBtn');
const presetAbacusBtn = document.getElementById('presetAbacusBtn');

function calculateAbacus() {
  let total = 0;
  const rods = document.querySelectorAll('.abacus-rod');

  rods.forEach(rod => {
    const place = parseInt(rod.dataset.place, 10);
    const upperBead = rod.querySelector('.upper-bead');
    const isUpperActive = upperBead.getAttribute('data-active') === 'true';

    let rodSum = isUpperActive ? 5 : 0;

    const lowerBeads = rod.querySelectorAll('.lower-bead');
    lowerBeads.forEach(lb => {
      if (lb.getAttribute('data-active') === 'true') {
        rodSum += 1;
      }
    });

    total += rodSum * place;
  });

  if (abacusValueDisplay) {
    abacusValueDisplay.textContent = total.toLocaleString();
  }
}

if (abacusFrame) {
  abacusFrame.addEventListener('click', (e) => {
    const bead = e.target.closest('.bead');
    if (!bead) return;

    const isUpper = bead.classList.contains('upper-bead');
    const currentState = bead.getAttribute('data-active') === 'true';

    sounds.beadSlide(isUpper);
    bead.setAttribute('data-active', (!currentState).toString());

    calculateAbacus();

    if (window.caoGame) {
      window.caoGame.addXP(10, 'Abacus Bead Slide', e);
      window.caoGame.unlockBadge('l1_abacus');
    }
  });
}

if (resetAbacusBtn) {
  resetAbacusBtn.addEventListener('click', () => {
    sounds.click();
    document.querySelectorAll('.bead').forEach(b => b.setAttribute('data-active', 'false'));
    calculateAbacus();
  });
}

if (presetAbacusBtn) {
  presetAbacusBtn.addEventListener('click', () => {
    sounds.correctChime();
    document.querySelectorAll('.bead').forEach(b => b.setAttribute('data-active', 'false'));

    // Rod 1000s: 2
    const rod1000 = document.querySelector('.abacus-rod[data-place="1000"]');
    const rod1000Lower = rod1000.querySelectorAll('.lower-bead');
    rod1000Lower[0].setAttribute('data-active', 'true');
    rod1000Lower[1].setAttribute('data-active', 'true');

    // Rod 10s: 2
    const rod10 = document.querySelector('.abacus-rod[data-place="10"]');
    const rod10Lower = rod10.querySelectorAll('.lower-bead');
    rod10Lower[0].setAttribute('data-active', 'true');
    rod10Lower[1].setAttribute('data-active', 'true');

    // Rod 1s: 6 (5 + 1)
    const rod1 = document.querySelector('.abacus-rod[data-place="1"]');
    rod1.querySelector('.upper-bead').setAttribute('data-active', 'true');
    rod1.querySelectorAll('.lower-bead')[0].setAttribute('data-active', 'true');

    calculateAbacus();
  });
}

// --- 5. Interactive Slide Rule Simulator ---
const srMultiplicand = document.getElementById('srMultiplicand');
const srMultiplier = document.getElementById('srMultiplier');
const valA = document.getElementById('valA');
const valB = document.getElementById('valB');
const dScaleTrack = document.getElementById('dScaleTrack');
const cScaleTrack = document.getElementById('cScaleTrack');
const slidingScaleC = document.getElementById('slidingScaleC');
const hairlineIndicator = document.getElementById('hairlineIndicator');
const cursorResultTag = document.getElementById('cursorResultTag');

function renderLogScale(trackElement) {
  if (!trackElement) return;
  trackElement.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const pct = Math.log10(i) * 100;
    const tick = document.createElement('div');
    tick.className = 'tick-mark major';
    tick.style.left = `${pct}%`;

    const label = document.createElement('span');
    label.className = 'tick-num';
    label.textContent = i;
    tick.appendChild(label);

    trackElement.appendChild(tick);

    if (i < 10) {
      for (let sub = 1; sub <= 4; sub++) {
        const subVal = i + (sub * 0.2);
        if (subVal < i + 1) {
          const subPct = Math.log10(subVal) * 100;
          const subTick = document.createElement('div');
          subTick.className = sub === 2 ? 'tick-mark medium' : 'tick-mark minor';
          subTick.style.left = `${subPct}%`;
          trackElement.appendChild(subTick);
        }
      }
    }
  }
}

renderLogScale(dScaleTrack);
renderLogScale(cScaleTrack);

function updateSlideRule() {
  if (!srMultiplicand || !srMultiplier) return;
  const a = parseFloat(srMultiplicand.value);
  const b = parseFloat(srMultiplier.value);
  const result = (a * b).toFixed(2);

  valA.textContent = a.toFixed(1);
  valB.textContent = b.toFixed(1);

  const slidePct = Math.log10(a) * 100;
  if (slidingScaleC) {
    slidingScaleC.style.transform = `translateX(${slidePct}%)`;
  }

  const resultPct = Math.log10(a * b) * 100;
  if (hairlineIndicator) {
    hairlineIndicator.style.left = `${resultPct}%`;
  }

  if (cursorResultTag) {
    const prefix = currentLang === 'bn' ? 'ফলাফল' : 'Result';
    cursorResultTag.textContent = `${prefix}: ${result} (log ${a} + log ${b})`;
  }
}

if (srMultiplicand && srMultiplier) {
  srMultiplicand.addEventListener('input', () => {
    sounds.click();
    updateSlideRule();
  });
  srMultiplier.addEventListener('input', () => {
    sounds.click();
    updateSlideRule();
  });
  updateSlideRule();
}

// --- 6. Interactive 4-Step Cycle Simulator ---
const flowSteps = [
  document.getElementById('flowStep1'),
  document.getElementById('flowStep2'),
  document.getElementById('flowStep3'),
  document.getElementById('flowStep4')
];
const flowConns = [
  document.getElementById('flowConn1'),
  document.getElementById('flowConn2'),
  document.getElementById('flowConn3')
];
const narratorText = document.getElementById('narratorText');
const autoPlayPipelineBtn = document.getElementById('autoPlayPipelineBtn');

const stepNarrations = {
  bn: [
    "১. FETCH: CPU-এর প্রোগ্রাম কন্ট্রোল ইউনিট (PCU) মেমরি থেকে পরবর্তী নির্দেশ (Instruction) নিয়ে আসে।",
    "২. DECODE: Control Unit নির্দেশটি পড়ে ও ব্যাখ্যা করে (Interpret) যে কী কাজ করতে হবে।",
    "৩. EXECUTE: ALU (Arithmetic Logic Unit) নির্দেশনা অনুযায়ী আসল যোগ, বিয়োগ বা লজিক্যাল হিসাব সম্পন্ন করে।",
    "৪. STORE / I/O: প্রাপ্ত ফলাফল রেজিস্টার বা মেমরিতে সংরক্ষিত হয় এবং মনিটর/আউটপুটে পাঠানো হয়।"
  ],
  en: [
    "1. FETCH: The CPU Program Control Unit (PCU) fetches the next instruction from Main Memory.",
    "2. DECODE: The Control Unit decodes and interprets the instruction opcode and needed operands.",
    "3. EXECUTE: The ALU (Arithmetic Logic Unit) carries out the mathematical or logical computation.",
    "4. STORE / I/O: The result is written back to registers/memory and routed to output peripherals."
  ]
};

let currentPipelineStep = 0;

function activateStep(index) {
  sounds.clockPulse();
  currentPipelineStep = index;
  flowSteps.forEach((s, i) => {
    if (i <= index) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });

  flowConns.forEach((c, i) => {
    if (i < index) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });

  updatePipelineNarrationLang();
}

function updatePipelineNarrationLang() {
  if (narratorText) {
    narratorText.textContent = stepNarrations[currentLang][currentPipelineStep];
  }
}

flowSteps.forEach((step, idx) => {
  if (step) {
    step.addEventListener('click', () => activateStep(idx));
  }
});

let autoPlayTimer = null;
if (autoPlayPipelineBtn) {
  autoPlayPipelineBtn.addEventListener('click', () => {
    sounds.click();
    const isBn = currentLang === 'bn';
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
      autoPlayPipelineBtn.textContent = isBn ? '▶ অটো-প্লে করো' : '▶ Auto Play';
      return;
    }

    autoPlayPipelineBtn.textContent = isBn ? '⏸ পজ করো' : '⏸ Pause';
    activateStep(currentPipelineStep);

    autoPlayTimer = setInterval(() => {
      currentPipelineStep = (currentPipelineStep + 1) % 4;
      activateStep(currentPipelineStep);
    }, 1800);
  });
}

// --- 7. Interactive Quiz Zone (Bilingual) ---
const quizData = {
  bn: [
    {
      question: "নিচের কোনটি প্রধানত একজন প্রোগ্রামারের চোখে দৃশ্যমান (Visible to the programmer)?",
      options: [
        "কম্পিউটারের ভেতর ফুল অ্যাডারের সার্কিট ডিজাইন",
        "Instruction Set, Registers এবং Addressing Modes (Architecture)",
        "মেমরি চিপে ব্যবহৃত ট্রানজিস্টর ও সিগন্যাল তার",
        "CPU চিপের ক্লক ফ্রিকোয়েন্সি ও ভোল্টেজ রেগুলেশন"
      ],
      answer: 1,
      explanation: "Computer Architecture হলো সেই সমস্ত অ্যাট্রিবিউট যা প্রোগ্রামারের চোখে দৃশ্যমান—যেমন Instruction Set Architecture (ISA), Registers ও Data Types। বাকিগুলো Organization-এর অংশ।"
    },
    {
      question: "Computer Architecture এবং Organization-এর মূল পার্থক্য সংক্ষেপে কীভাবে প্রকাশ করা হয়?",
      options: [
        "Architecture হলো 'How it is done' এবং Organization হলো 'What it does'",
        "Architecture হলো 'What the computer does' এবং Organization হলো 'How it is done'",
        "Architecture সফটওয়্যার তৈরি করে আর Organization শুধু গেম চালায়",
        "দুটোই সম্পূর্ণ এক এবং এদের মধ্যে কোনো পার্থক্য নেই"
      ],
      answer: 1,
      explanation: "স্লাইড ৩ অনুযায়ী: Architecture describes 'WHAT' the computer does (ফাংশনাল আচরণ), আর Organization describes 'HOW' it is done (গাঠনিক বাস্তবায়ন)।"
    },
    {
      question: "স্লাইড রুল (Slide Rule) কোন গাণিতিক ধারণার ওপর ভিত্তি করে দুটি সংখ্যার গুণফল বের করত?",
      options: [
        "পাইথাগোরাসের উপপাদ্য (Pythagoras Theorem)",
        "ডিজিটাল বাইনারি লজিক গেট",
        "লগারিদম (Logarithms) — দৈর্ঘ্য যোগ করলেই গুণফল পাওয়া যায়",
        "নিউটনীয় বলবিদ্যা"
      ],
      answer: 2,
      explanation: "স্লাইড রুলের স্কেলগুলো ছিল লগারিদমিক। ফলে log(a) + log(b) স্কেল দুটো একসাথে যোগ করলেই গুণফল log(ab) সরাসরি পাওয়া যেত। এটি ১৯৭২ সাল পর্যন্ত ব্যবহৃত হয়েছে।"
    },
    {
      question: "মানুষের মস্তিষ্ক ও কম্পিউটারের কাজের ক্ষেত্রে Program Control Unit-এর কাজ মূলত কোনটি?",
      options: [
        "সরাসরি ১০ সংখ্যার গুণ-ভাগ শেষ করা",
        "নির্দেশ মেমরি থেকে আনা এবং তা ব্যাখ্যা করা (Fetch & Interpret)",
        "কম্পিউটার মনিটরে ছবি আঁকা",
        "হার্ডডিস্কের মেকানিক্যাল মোটর ঘোরানো"
      ],
      answer: 1,
      explanation: "CPU-এর Program Control Unit মস্তিষ্কের Control Function হিসেবে কাজ করে, যার মূল কাজ হলো মেমরি থেকে নির্দেশ আনা ও তা ব্যাখ্যা করা (Fetch and interpret instructions)।"
    },
    {
      question: "হাতে-কলমে হিসাব করার প্রক্রিয়ার সাথে তুলনা করলে কম্পিউটারের 'Main Memory' মূলত কার সাথে তুলনীয়?",
      options: [
        "পেন্সিল কাটার শার্পনার",
        "হাতে হিসাব লেখার কাগজ বা খাতার পাতা (Paper used in manual calculation)",
        "হিসাবকারীর গলার কণ্ঠস্বর",
        "ঘড়ির কাঁটা"
      ],
      answer: 1,
      explanation: "স্লাইড ৯-এ স্পষ্টভাবে বলা হয়েছে: Main memory corresponds to the paper used in manual calculation—এর কাজ হলো হিসাবের নির্দেশ ও সংখ্যা লিখে রাখা।"
    }
  ],
  en: [
    {
      question: "Which of the following attributes is directly visible to the programmer?",
      options: [
        "Internal circuit design of full adders and gates",
        "Instruction Sets, Registers, and Addressing Modes (Architecture)",
        "Memory chip transistor technology and bus routing",
        "CPU clock generator and voltage regulator modules"
      ],
      answer: 1,
      explanation: "Computer Architecture comprises attributes visible to the programmer—such as Instruction Set Architecture (ISA), registers, data types, and addressing modes. The physical implementation belongs to Organization."
    },
    {
      question: "How is the fundamental difference between Computer Architecture and Organization best summarized?",
      options: [
        "Architecture is 'How it is done' while Organization is 'What it does'",
        "Architecture describes 'What the computer does' while Organization describes 'How it is done'",
        "Architecture designs software while Organization only runs video games",
        "Both terms are identical synonyms with no distinction"
      ],
      answer: 1,
      explanation: "Slide 3 states: Architecture describes WHAT the computer does (functional behavior), whereas Organization describes HOW it is done (structural relationship and circuit implementation)."
    },
    {
      question: "On which mathematical principle did the mechanical Slide Rule multiply two numbers?",
      options: [
        "Pythagorean Theorem",
        "Binary Boolean logic gates",
        "Logarithms — adding two physical lengths results in multiplication: log(a) + log(b) = log(ab)",
        "Newtonian mechanics"
      ],
      answer: 2,
      explanation: "The slide rule's scales were logarithmic. By physically aligning and adding two logarithmic lengths, users effectively multiplied the two numbers. It was in active use until 1972."
    },
    {
      question: "In the analogy of human brain functions, what is the role of the CPU Program Control Unit?",
      options: [
        "Directly executing multi-digit division steps",
        "Fetching instructions from memory and interpreting them (Control Function)",
        "Rendering graphical 3D polygons on display",
        "Spinning magnetic mechanical hard disks"
      ],
      answer: 1,
      explanation: "The Program Control Unit performs the Control Function of the brain: its purpose is to fetch instructions from memory and interpret them in sequence."
    },
    {
      question: "When compared to manual human calculations, what does Main Memory correspond to?",
      options: [
        "The pencil sharpener",
        "The scratch paper / notebook used to record numbers and instructions",
        "The speaker's voice pitch",
        "The clock on the wall"
      ],
      answer: 1,
      explanation: "Slide 9 explicitly states: Main memory corresponds to the paper used in manual calculation—its purpose is to store instructions and operand data."
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
      feedback = 'অসাধারণ! লেকচার ১-এর মূল বিষয়গুলো তোমার সম্পূর্ণ আয়ত্তে চলে এসেছে। পরীক্ষায় তুমি চমৎকার ফলাফল করবে!';
    } else if (percentage >= 60) {
      feedback = 'খুব ভালো! আরেকবার রিভিশন টেবিলটি দেখে নিলে তুমি লেকচার ১-এ ১০০% প্রস্তুত হয়ে যাবে।';
    } else {
      feedback = 'আরেকবার স্লাইড ও সিমুলেশনগুলো খেয়াল করো, তারপর আবার টেস্ট দাও!';
    }
  } else {
    if (percentage >= 80) {
      feedback = 'Outstanding! You have thoroughly mastered all core concepts of Lecture 1. You are primed to excel in exams!';
    } else if (percentage >= 60) {
      feedback = 'Good job! A quick review of the comparison table will bring you to 100% mastery.';
    } else {
      feedback = 'Review the interactive simulators and summary cards, then take the test again!';
    }
  }

  const retryText = isBn ? '🔄 পুনরায় কুইজ দাও' : '🔄 Retake Quiz';

  cardContent.innerHTML = `
    <div style="text-align: center; padding: 2rem 1rem;">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
      <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 0.5rem;">${heading}</h3>
      <div style="font-size: 2.5rem; font-family: var(--font-code); color: var(--accent-cyan); font-weight: 800; margin-bottom: 1rem;">
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

// --- 8. Mini-Game: Mental Math Speed Duel ---
(function initSpeedDuel() {
  const duelPrompts = [
    { q: '19 + 28 = ?', ans: 47, options: [37, 47, 57] },
    { q: '14 × 4 = ?', ans: 56, options: [54, 56, 64] },
    { q: '9 × 7 + 12 = ?', ans: 75, options: [71, 75, 83] }
  ];

  let currentRound = 0;
  let userDuelScore = 0;
  let cpuTimer = null;
  let cpuProgress = 0;

  const promptEl = document.getElementById('duelMathPrompt');
  const optionsGrid = document.getElementById('duelOptionsGrid');
  const feedbackEl = document.getElementById('duelFeedback');
  const roundText = document.getElementById('duelRoundText');
  const scoreEl = document.getElementById('duelScore');
  const cpuBar = document.getElementById('cpuDuelBar');

  if (!promptEl || !optionsGrid) return;

  function startRound(rIdx) {
    if (rIdx >= duelPrompts.length) {
      finishDuel();
      return;
    }

    clearInterval(cpuTimer);
    cpuProgress = 0;
    if (cpuBar) cpuBar.style.width = '0%';

    const isBn = currentLang === 'bn';
    if (roundText) roundText.textContent = isBn ? `রাউন্ড ${rIdx + 1} / 3` : `Round ${rIdx + 1} / 3`;
    if (feedbackEl) feedbackEl.textContent = '';

    const roundData = duelPrompts[rIdx];
    promptEl.textContent = roundData.q;

    optionsGrid.innerHTML = '';
    roundData.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'duel-opt-btn';
      btn.textContent = opt;
      btn.addEventListener('click', (e) => handleAnswer(opt, roundData.ans, e));
      optionsGrid.appendChild(btn);
    });

    // Start CPU Timer (4 seconds)
    const intervalMs = 50;
    const totalMs = 4200;
    const step = (intervalMs / totalMs) * 100;

    cpuTimer = setInterval(() => {
      cpuProgress += step;
      if (cpuBar) cpuBar.style.width = Math.min(100, cpuProgress) + '%';

      if (cpuProgress >= 100) {
        clearInterval(cpuTimer);
        handleTimeout(roundData.ans);
      }
    }, intervalMs);
  }

  function handleAnswer(chosen, correct, e) {
    clearInterval(cpuTimer);
    const isBn = currentLang === 'bn';

    if (chosen === correct) {
      userDuelScore++;
      if (scoreEl) scoreEl.textContent = userDuelScore;
      sounds.correctChime();
      if (feedbackEl) {
        feedbackEl.style.color = '#34d399';
        feedbackEl.textContent = isBn ? '⚡ বিজয়ী! তুমি কম্পিউটারের চেয়েও দ্রুত হিসাব করেছো!' : '⚡ Winner! You beat the CPU in mental math!';
      }
      if (window.caoGame) {
        window.caoGame.addXP(30, 'Duel Round Won', e);
      }
    } else {
      sounds.wrongBuzz();
      if (feedbackEl) {
        feedbackEl.style.color = '#ef4444';
        feedbackEl.textContent = isBn ? `ভুল উত্তর! সঠিক ছিল ${correct}` : `Incorrect! Correct was ${correct}`;
      }
    }

    currentRound++;
    setTimeout(() => startRound(currentRound), 1500);
  }

  function handleTimeout(correct) {
    sounds.wrongBuzz();
    const isBn = currentLang === 'bn';
    if (feedbackEl) {
      feedbackEl.style.color = '#f59e0b';
      feedbackEl.textContent = isBn ? `সময় শেষ! সিপিইউ আগে উত্তর বের করেছে (সঠিক: ${correct})` : `Time up! CPU calculated first (Correct: ${correct})`;
    }
    currentRound++;
    setTimeout(() => startRound(currentRound), 1500);
  }

  function finishDuel() {
    clearInterval(cpuTimer);
    const isBn = currentLang === 'bn';
    promptEl.textContent = userDuelScore >= 2 ? '🏆 Victory!' : '⚔️ Duel Completed';

    optionsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center;">
        <button id="restartDuelBtn" class="action-btn primary-btn" style="margin: 0 auto; display: block;">
          ${isBn ? '🔄 পুনরায় ডুয়েল খেলো' : '🔄 Play Duel Again'}
        </button>
      </div>
    `;

    document.getElementById('restartDuelBtn').addEventListener('click', () => {
      currentRound = 0;
      userDuelScore = 0;
      if (scoreEl) scoreEl.textContent = '0';
      startRound(0);
    });

    if (userDuelScore >= 2) {
      if (feedbackEl) {
        feedbackEl.style.color = '#38bdf8';
        feedbackEl.textContent = isBn ? '🎉 সাবাশ! তুমি মানুষের সহজাত দ্রুত প্যাটার্ন চেনার ক্ষমতা প্রমাণ করেছো!' : '🎉 Splendid! You proved the power of human heuristic pattern matching!';
      }
      if (window.caoGame) {
        window.caoGame.unlockBadge('l1_duel');
      }
    }
  }

  startRound(0);
})();

// Initialize Language on Startup
applyLanguage(currentLang);
loadQuestion(0);

