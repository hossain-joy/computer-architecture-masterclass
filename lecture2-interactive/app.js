/* ==========================================================================
   Computer Architecture & Organization - Lecture 2: Evolution of Computers
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

  clockPulse() {
    this.playTone(320, 'square', 0.1, 0.1);
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

// --- 2. Comprehensive Bilingual Translations Dictionary ---
const translations = {
  bn: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_mech: "Mechanical Era",
    nav_gen: "5 Generations",
    nav_ias: "IAS Computer (40-bit)",
    nav_ibm: "IBM System/360",
    nav_vlsi: "VLSI & Categories",
    nav_quiz: "Exam Quiz",
    nav_take_test: "টেস্ট দাও",
    hero_badge: "লেকচার ২ এর সম্পূর্ণ ইন্টারেক্টিভ গাইড",
    hero_title: 'কম্পিউটারের বিবর্তন (Evolution of Computers)<br><span class="gradient-text">প্যাসকেলাইন ও ব্যাবেজ থেকে আধুনিক ভিএলএসআই</span>',
    hero_subtitle: "যান্ত্রিক চাকা আর গিয়ারের গতি সীমাবদ্ধতা থেকে কীভাবে ইলেকট্রনের আলোর গতিতে পৌঁছাল কম্পিউটার? আইএএস (IAS) মেশিনের ৪০-বিট আর্কিটেকচার এবং আইবিএম সিস্টেম/৩৬০-এর যুগান্তকারী বিপ্লব দেখে নাও লাইভ সিমুলেটরে!",
    stat_mech: "প্যাসকেল ও চার্লস ব্যাবেজ",
    stat_eniac: "ENIAC ও ১ম প্রজন্ম (30 টন)",
    stat_ias: "ভন নিউম্যানের IAS কম্পিউটার",
    stat_ibm: "সফটওয়্যার কমপ্যাটিবিলিটি",
    sec1_tag: "মডিউল ১ • স্লাইড ২, ৩ ও ৪",
    sec1_title: "যান্ত্রিক কম্পিউটারের যুগ (The Mechanical Computer Era)",
    sec1_desc: "ষোড়শ শতাব্দী থেকে শুরু করে চার্লস ব্যাবেজের অ্যানালিটিক্যাল ইঞ্জিন পর্যন্ত যান্ত্রিক গণনার ইতিহাস।",
    pascal_desc: "ফরাসি দার্শনিক ব্লেইজ প্যাসকেল প্রথম সফল মেকানিক্যাল ক্যালকুলেটর আবিষ্কার করেন যা গিয়ারের সাহায্যে সরাসরি দশমিক সংখ্যার <strong>যোগ ও বিয়োগ (Addition & Subtraction)</strong> করতে পারত।",
    pascal_pill: "⚙️ গিয়ার ও চাকার সাহায্যে গণনা",
    diff_engine_desc: "চার্লস ব্যাবেজ মানুষের কোনো হস্তক্ষেপ ছাড়াই স্বয়ংক্রিয়ভাবে গাণিতিক টেবিল হিসাব ও প্রিন্ট করার জন্য এটি ডিজাইন করেন। তবে এটি শুধুমাত্র একটি গাণিতিক কাজ করত: <strong>শুধুমাত্র যোগ (Addition)</strong>!",
    diff_pill: "➕ শুধুমাত্র যোগ দিয়ে টেবিল তৈরি",
    analytical_engine_desc: "ডিফারেন্স ইঞ্জিন চাহিদা পূরণ করতে না পারায় ব্যাবেজ প্রথম <strong>General Purpose Programmable Computer</strong> ডিজাইন করেন। এতে আধুনিক কম্পিউটারের প্রায় সব মূল উপাদান উপস্থিত ছিল!",
    analytical_pill: "🏆 প্রথম জেনারেল-পারপাস প্রোগ্রামেবল কম্পিউটার",
    babbage_lab_badge: "স্লাইড ৪ এর মূল আর্কিটেকচার",
    babbage_lab_title: "🏛️ ব্যাবেজের অ্যানালিটিক্যাল ইঞ্জিনের কাঠামো (Structure of Analytical Engine)",
    babbage_lab_desc: "ব্লকগুলোতে মাউস হোভার বা ক্লিক করে দেখো কীভাবে ১৮০০ শতকেই আধুনিক মেমরি ও প্রসেসরের ধারণা দিয়েছিলেন ব্যাবেজ!",
    babbage_mill_desc: "Arithmetic Logic Unit: যেখানে মূল গাণিতিক হিসাব সম্পন্ন হতো।",
    bus_data: "ডেটা ফ্লো",
    babbage_store_desc: "Main Memory: যেখানে ভ্যারিয়েবল ও সংখ্যাগুলো সাজিয়ে রাখা হতো।",
    bus_io: "আই/ও লিংক",
    babbage_io_desc: "Printer এবং Card Punch (পাঞ্চ কার্ডের মাধ্যমে ইনপুট-আউটপুট)।",
    pcu_op_card: "কোন অপারেশন (+, -, *, /) করতে হবে তা নির্দেশ করে",
    pcu_var_card: "কোন মেমরি লোকেশন (Store) থেকে মান নিতে হবে তা নির্দেশ করে",
    mech_drawback1: "<strong>গতির সীমাবদ্ধতা (Inertia of moving parts):</strong> মেকানিক্যাল গিয়ার, লেভার ও চাকার জড়তা বা ওজনের কারণে এদের গতি বাড়ানো অসম্ভব ছিল।",
    mech_drawback2: "<strong>অনির্ভরযোগ্যতা (Mechanical Unreliability):</strong> গিয়ার ক্ষয় হয়ে যাওয়া বা মেকানিক্যালি ডিজিটাল তথ্য প্রেরণে বারবার ভুল হতো।",
    elec_adv1: "<strong>ইলেকট্রন চলে আলোর গতিতে:</strong> এখানে কোনো নড়াচড়া করা গিয়ার নেই! চলমান উপাদান হলো ইলেকট্রন, যা প্রায় আলোর গতিতে ($300,000 \\text{ km/s}$) ছোটে!",
    elec_adv2: "<strong>ভ্যাকুয়াম টিউব ও সিলিকন:</strong> মেকানিক্যাল ডিভাইসের চেয়ে হাজার গুণ গতিতে ডেটা সিগন্যাল প্রসেস ও স্টোর করতে সক্ষম।",
    sec2_tag: "মডিউল ২ • স্লাইড ৬",
    sec2_title: "কম্পিউটারের ৫টি প্রজন্ম (The 5 Computer Generations)",
    sec2_desc: "নিচের টাইমলাইন বাটনগুলোতে ক্লিক করে প্রতিটি প্রজন্মের মূল হার্ডওয়্যার টেকনোলজি ও বৈপ্লবিক পরিবর্তনগুলো এক্সপ্লোর করো!",
    eniac_maker: "নির্মাতা",
    eniac_purpose: "উদ্দেশ্য",
    eniac_purpose_sub: "স্বয়ংক্রিয়ভাবে গোলন্দাজ বাহিনীর গণিতের ছক তৈরি",
    eniac_weight: "ওজন ও টিউব",
    eniac_weight_sub: "বিশাল রুম জুড়ে স্থাপন করা হয়েছিল",
    eniac_speed: "গতি তুলনা",
    eniac_speed_sub: "Harvard Mark I চেয়ে ১,০০০ গুণ দ্রুত!",
    sec3_tag: "মডিউল ৩ • স্লাইড ১০, ১১ ও ১২",
    sec3_title: "The IAS Computer: ভন নিউম্যানের ৪০-বিট আর্কিটেকচার",
    sec3_desc: "১৯৪৬ সালে প্রিন্সটনে জন ভন নিউম্যান (John von Neumann) তৈরি করেন বিখ্যাত IAS কম্পিউটার। এটি আধুনিক সব কম্পিউটারের আদি পিতা!",
    ias_badge: "সবচেয়ে জনপ্রিয় পরীক্ষার প্রশ্ন • স্লাইড ১১",
    ias_lab_title: "🔬 IAS কম্পিউটারের ৪০-বিট ওয়ার্ড এক্সপ্লোরার (40-bit Word Structure)",
    ias_lab_desc: "আইএএস মেমরির প্রতিটি সেল একটি ৪০-বিট ওয়ার্ড ধারণ করতে পারত। সুইচ করে দেখো সংখ্যা (Number Word) এবং নির্দেশ (Instruction Word) কীভাবে সাজানো হতো!",
    btn_word_num: "🔢 Number Word (সংখ্যা)",
    btn_word_inst: "📜 Instruction Word (নির্দেশ)",
    left_inst_label: "Left Instruction (২০ বিট)",
    right_inst_label: "Right Instruction (২০ বিট)",
    opcode_desc: "কী কাজ (ADD, SUB)",
    addr_desc: "মেমরি লোকেশন (0 to 999)",
    ias_limits_title: "⚠️ ১ম প্রজন্ম ও IAS কম্পিউটারের সীমাবদ্ধতা (Exam Favorite):",
    limit_1: "❌ <strong>কোনো Index Register ছিল না:</strong> যার কারণে মেমরি অ্যাড্রেস পরিবর্তন করা ভীষণ কঠিন ছিল।",
    limit_2: "❌ <strong>খুব অল্প রেজিস্টার ও নো ক্যাশ:</strong> CPU রেজিস্টারের সংখ্যা ছিল নগণ্য এবং কোনো Cache Memory ছিল না।",
    limit_3: "❌ <strong>টেক্সট প্রসেসিং ছিল অসম্ভব ধীর:</strong> ইন্সট্রাকশন সেট শুধুমাত্র সংখ্যা গণনার জন্য তৈরি ছিল, কোনো লেখা বা টেক্সট সহজে প্রসেস করা যেত না।",
    limit_4: "❌ <strong>I/O ছিল অবহেলিত:</strong> ইনপুট-আউটপুট নির্দেশাবলীকে অপ্রধান মনে করা হতো।",
    sec4_tag: "মডিউল ৪ • স্লাইড ১৪, ১৫ ও ১৬",
    sec4_title: "২য় প্রজন্ম: ট্রানজিস্টর ও হাই-লেভেল ল্যাঙ্গুয়েজ",
    sec4_desc: "ভ্যাকুয়াম টিউব বিলুপ্ত হয়ে ট্রানজিস্টরের আগমন এবং প্রোগ্রামিং ভাষার প্রথম বিপ্লব।",
    g2_transistor_desc: "ট্রানজিস্টর ভ্যাকুয়াম টিউবের চেয়ে আকারে ছোট, অনেক কম বিদ্যুৎ টানে, সস্তা এবং দ্রুতগতির ইলেকট্রনিক সুইচ। সেকেন্ডারি মেমরি হিসেবে এলো চৌম্বকীয় ডিস্ক।",
    g2_fortran_desc: "<strong>FORmula TRANslation:</strong> জন ব্যাকাস (John Backus)-এর নেতৃত্বে IBM-এর তৈরি প্রথম সফল হাই-লেভেল ভাষা। এটি শুধুমাত্র বৈজ্ঞানিক ও গাণিতিক হিসাবের জন্য ব্যবহৃত হতো।",
    g2_cobol_desc: "<strong>Common Business Oriented Language:</strong> ইউএস ডিফেন্স ডিপার্টমেন্টের পৃষ্ঠপোষকতায় তৈরি প্রথম ব্যবসায়িক প্রোগ্রামিং ভাষা। এটি সংখ্যা ও টেক্সট উভয় নিয়ে কাজ করতে পারত।",
    g2_batch_desc: "<strong>Batch Processing:</strong> অনেকগুলো কাজ ম্যাগনেটিক টেপে জমা রেখে মেমরিতে থাকা স্থায়ী <em>Batch Monitor</em> প্রোগ্রামের মাধ্যমে একনাগাড়ে রান করা হতো। এটিই আজকের Operating System (OS)-এর পূর্বপুরুষ!",
    sec5_tag: "মডিউল ৫ • স্লাইড ১৭ - ২১",
    sec5_title: "৩য় প্রজন্ম ও IBM System/360 এর মহাবিপ্লব",
    sec5_desc: "ইন্টিগ্রেটেড সার্কিট (IC) এবং আইবিএম ৩৬০-এর মাধ্যমে কম্পিউটিংয়ে এক অমর ইতিহাসের সূচনা।",
    ibm_title: "🖥️ Software Compatibility (সফটওয়্যার কমপ্যাটিবিলিটি)",
    ibm_desc: "আইবিএম ৩৬০ সিরিজের প্রতিটি মডেলের আর্কিটেকচার একই রাখা হয়েছিল। ছোট মডেলের জন্য লেখা কোড বড় মডেলেও অবিকল চলত!",
    compat_flow_tag: "একই সফটওয়্যার কোনো পরিবর্তন ছাড়াই রান হচ্ছে!",
    m30_desc: "ছোট মডেল • মডারেট স্পিড",
    m50_desc: "মাঝারি মডেল • দ্বিগুণ স্পিড",
    m75_desc: "মেইনফ্রেম জায়ান্ট • বিদ্যুত্ গতি",
    inno_1_desc: "৮ বিট মিলে ১ বাইট—ডাটা স্টোরেজ ও ট্রান্সমিশনের এই ক্ষুদ্রতম একক আইবিএম ৩৬০-ই বিশ্বজুড়ে প্রতিষ্ঠা করে।",
    inno_2_desc: "১৬টি অভিন্ন ৩২-বিট জেনারেল-পারপাস রেজিস্টার (16 × 32-bit registers) রাখা হয়েছিল।",
    inno_3_desc: "Fixed-point ALU, Floating-point ALU, এবং Decimal ALU আলাদা আলাদা বসানো হয়েছিল।",
    inno_4_desc: "সিপিইউ-এর দুটি অবস্থা ছিল: অপারেটিং সিস্টেমের জন্য Supervisor State এবং অ্যাপ্লিকেশনের জন্য User State।",
    inno_5_desc: "সিপিইউ-এর ব্যতিক্রমী অবস্থা ও এরর ট্র্যাক করার জন্য তৈরি হলো আধুনিক Status Register (SR)।",
    sec6_tag: "মডিউল ৬ • স্লাইড ২২, ২৩, ২৪ ও ২৫",
    sec6_title: "৪র্থ প্রজন্ম: VLSI ও কম্পিউটারের শ্রেণিবিভাগ",
    sec6_desc: "একটি সিঙ্গেল সিলিকন চিপে লাখ লাখ ট্রানজিস্টর বসিয়ে তৈরি হলো মাইক্রোপ্রসেসর ও আধুনিক কম্পিউটার।",
    density_title: "📊 আইসি ডেনসিটি স্কেল (IC Density Scale):",
    density_desc: "একটি চিপের ভেতর কতগুলো ট্রানজিস্টর থাকতে পারে তার ওপর ভিত্তি করে ক্লাসিফিকেশন:",
    dense_chips_body: "১. <strong>DRAM</strong> (Dynamic RAM - মূল মেমরির ভিত্তি) এবং ২. <strong>Single-chip CPU / Microprocessor</strong>।",
    cat_micro: "ব্যক্তিগত পিসি, ল্যাপটপ, ট্যাবলেট ও স্মার্টফোন। সিঙ্গেল চিপ মাইক্রোপ্রসেসরে চালিত।",
    cat_mini: "মাঝারি আকারের ব্যবসায় প্রতিষ্ঠান ও ল্যাবরেটরিতে নেটওয়ার্ক কন্ট্রোলের জন্য ব্যবহৃত।",
    cat_main: "ব্যাংক, এয়ারলাইন্স বুকিং ও বড় ডেটাবেজের হাজার হাজার ইউজারের নির্ভরযোগ্য সার্ভার (যেমন IBM 360)।",
    cat_super: "মহাকাশ গবেষণা, পারমাণবিক সিমুলেশন ও আবহাওয়া পূর্বাভাসে ব্যবহৃত পৃথিবীর সবচেয়ে শক্তিশালী কম্পিউটার।",
    sec7_tag: "পরীক্ষা প্রস্তুতি • কুইজ জোন",
    sec7_title: "লেকচার ২ এর স্ব-মূল্যায়ন টেস্ট (Lecture 2 Self Quiz)",
    sec7_desc: "লেকচার ২ এর মূল বিষয়গুলো কতটা রপ্ত করতে পারলে তা এখনই এই ৫টি গুরুত্বপূর্ণ প্রশ্নের উত্তর দিয়ে যাচাই করে নাও!",
    quiz_score_prefix: "স্কোর:",
    btn_next_q: "পরবর্তী প্রশ্ন ➡️",
    cheat_title: "লেকচার ২ এর ১০ মিনিটের কুইক রিভিশন সারাংশ (Exam Night Sheet)",
    cheat_l2_1: "<strong>Babbage Analytical Engine:</strong> ১ম জেনারেল-পারপাস কম্পিউটার • The Mill (ALU), The Store (Memory), Operation & Variable Punched Cards।",
    cheat_l2_2: "<strong>ENIAC (1946):</strong> Mauchly & Eckert • ১৮,০০০ ভ্যাকুয়াম টিউব • ৩০ টন • Harvard Mark I-এর ৩ সেকেন্ডের গুণ এটি ৩ মিলিসেকেন্ডে করত!",
    cheat_l2_3: "<strong>IAS Computer (40-bit word):</strong> ১টি ৪০-বিট সংখ্যা (১ সাইন বিট + ৩৯ বিট মান) অথবা ২টি ২০-বিট নির্দেশ (৮-বিট অপকোড + ১২-বিট অ্যাড্রেস)।",
    cheat_l2_4: "<strong>IBM System/360:</strong> সফটওয়্যার কমপ্যাটিবিলিটি • ৮-বিট বাইট স্ট্যান্ডার্ড • ১৬টি ৩২-বিট জেনারেল রেজিস্টার • Supervisor vs User State।",
    cheat_l2_5: "<strong>5 Generations:</strong> ১ম (ভ্যাকুয়াম টিউব) ➔ ২য় (ট্রানজিস্টর + FORTRAN/COBOL) ➔ ৩য় (IC + IBM 360) ➔ ৪র্থ (VLSI + মাইক্রোপ্রসেসর) ➔ ৫ম (AI)।",
    cheat_l2_6: "<strong>Densest Chips:</strong> DRAM এবং Single-chip CPU / Microprocessor।",
    ias_game_badge: "📜 মিনি-গেম • আইএএস কোডব্রেকার",
    ias_game_score_label: "ডিকোড হয়েছে:",
    ias_game_title: "প্রিন্সটন আইএএস কোডব্রেকার (Princeton IAS Codebreaker)",
    ias_game_desc: "১৯৫২ সালের জন ভন নিউম্যানের IAS কম্পিউটার কীভাবে মেমরি থেকে ইন্সট্রাকশন পড়ত? নিচে একটি আসল ২০-বিট আইএএস নির্দেশ দেওয়া হয়েছে। সঠিক অপারেশনটি ডিকোড করতে পারলে তুমি অর্জন করবে <strong>IAS Codebreaker</strong> ব্যাজ এবং ১০০ এক্সপি!",
    ias_mission_prompt: "এই ইন্সট্রাকশনটি রান করলে IAS কম্পিউটারের ভেতরে কী ঘটবে?",
    ibm_badge: "বিপ্লবী ধারণা • স্লাইড ১৮",
    btn_compat_run: "▶ রান টেস্ট করো",
    vault_badge: "🎯 এক্সাম মাস্টার ভল্ট • DIU CSE",
    l2_math_title: "পরীক্ষার গাণিতিক সমস্যা ও মডেল সমাধান (Exam Math & Model Answers)",
    l2_math_sub: "প্রিন্সটন IAS ৪০-বিট মেশিন কোড ডিকোডিং, অ্যাড্রেস স্পেস হিসাব এবং রেজিস্টার ডায়াগ্রাম:",
    l2_p1_tag: "ম্যাথ প্রবলেম ১ • ব্লুমস লেভেল ৩ (Apply)",
    l2_p1_title: "Princeton IAS ৪০-বিট হেক্সাডেসিমেল ওয়ার্ড ডিকোডিং",
    l2_p1_statement: "<strong>প্রশ্ন:</strong> IAS কম্পিউটারের মেমরি ১০০-এ <code>0102821042H</code> ওয়ার্ডটি জমা আছে। এটি একটি ইন্সট্রাকশন ওয়ার্ড হলে Left ও Right নির্দেশদ্বয়ের Opcode এবং Address আলাদা করে দেখাও এবং এদের কাজ ব্যাখ্যা করো।",
    l2_p1_s1: "IAS-এ প্রতিটি ওয়ার্ড = ৪০ বিট = ১০টি হেক্স ডিজিট।",
    l2_p1_s2: "<strong>Left Instruction (প্রথম ৫ ডিজিট = ২০ বিট):</strong> <code>01028H</code>",
    l2_p1_s3: "↳ Opcode = <code>01H</code> (৮ বিট), Address = <code>028H</code> (১২ বিট = $40_{10}$)",
    l2_p1_s4: "↳ অর্থ: মেমরি ৪০-এর মান Accumulator-এ লোড করো: <code>AC := M[40]</code>",
    l2_p1_s5: "<strong>Right Instruction (শেষ ৫ ডিজিট = ২০ বিট):</strong> <code>21042H</code>",
    l2_p1_s6: "↳ Opcode = <code>21H</code> (৮ বিট), Address = <code>042H</code> (১২ বিট = $66_{10}$)",
    l2_p1_s7: "↳ অর্থ: Accumulator-এর মান মেমরি ৬৬-তে রাখো: <code>M[66] := AC</code>",
    l2_p1_res: "✅ <strong>সারাংশ:</strong> এক ওয়ার্ডে ২টি নির্দেশ: মেমরি ৪০ থেকে এনে হিসাব শেষে ফলাফল মেমরি ৬৬-তে সংরক্ষণ!",
    l2_p2_tag: "ম্যাথ প্রবলেম ২ • ব্লুমস লেভেল ৩ (Apply)",
    l2_p2_title: "IAS কম্পিউটারের সর্বোচ্চ মেমরি ধারণক্ষমতা",
    l2_p2_statement: "<strong>প্রশ্ন:</strong> IAS কম্পিউটারের নির্দেশে অ্যাড্রেসের জন্য ১২ বিট বরাদ্দ। এই আর্কিটেকচারে সর্বোচ্চ কত ওয়ার্ড ও কত কিলোবাইট মেমরি অ্যাড্রেস করা সম্ভব?",
    l2_p2_s1: "বরাদ্দকৃত অ্যাড্রেস বিট = ১২ বিট।",
    l2_p2_s2: "সর্বোচ্চ ওয়ার্ড সংখ্যা = $2^{12} = 4096$ ওয়ার্ড।",
    l2_p2_s3: "প্রতিটি ওয়ার্ড = ৪০ বিট = ৫ বাইট ($40/8 = 5$ bytes)।",
    l2_p2_s4: "মোট মেমরি সাইজ = $4096 \\times 5\\text{ Bytes} = 20,480\\text{ Bytes} = 20\\text{ KB}$।",
    l2_p2_res: "✅ <strong>ফলাফল:</strong> সর্বোচ্চ ৪,০৯৬ ওয়ার্ড বা ২০ কিলোবাইট (বাস্তবে IAS-এ ছিল ১,০২৪ ওয়ার্ড বা ৫ KB)।",
    l2_bp_title: "পরীক্ষার খাতায় আঁকার জন্য ১০০% পারফেক্ট ডায়াগ্রাম: Princeton IAS CPU Structure",
    l2_bp_tip: "💡 <strong>Exam Secret:</strong> IAS মেমরি থেকে ৪০-বিট ওয়ার্ড একবারে রিড করে। Left নির্দেশটি সরাসরি IR-এ চলে যায় এক্সিকিউশনের জন্য, আর Right নির্দেশটি সাময়িকভাবে IBR (Instruction Buffer Register)-এ অপেক্ষা করে!",
    l2_fact_badge: "রোমাঞ্চকর অজানা তথ্য • Did You Know?",
    l2_fact_title: "কম্পিউটার 'বাগ' (Bug)-এর আসল জন্মকথা!",
    l2_fact_body: "১৯৪৭ সালের ৯ সেপ্টেম্বর হার্ভার্ড মার্ক ২ কম্পিউটারে কাজ করার সময় হঠাৎ হিসাব ভুল হতে থাকে। কিংবদন্তি নারী কম্পিউটার বিজ্ঞানী <strong>গ্রেস হপার (Grace Hopper)</strong> সার্কিট খুলে পরীক্ষা করতে গিয়ে রিলে নম্বর ৭০-এর ভেতর আটকে থাকা একটি আসল <strong>মৃত পোকা বা পতঙ্গ (Moth)</strong> খুঁজে পান! তিনি সেই পোকাটি চিমটা দিয়ে বের করে লগবুকে আঠা দিয়ে লাগিয়ে লিখেছিলেন: <em>\"First actual case of bug being found\"</em>। সেখান থেকেই কম্পিউটারের কোডে ত্রুটিকে 'Bug' এবং তা সমাধান করাকে 'Debugging' বলা শুরু হয়!",
    pascal_era: "১৬২৩ - ১৬৬২",
    pascal_title: "Blaise Pascal ও Pascaline",
    diff_era: "১৯শ শতাব্দী",
    diff_title: "ব্যাবাজের ডিফারেন্স ইঞ্জিন (Difference Engine)",
    analytical_badge: "প্রথম সাধারণ কম্পিউটার",
    analytical_title: "ব্যাবাজের অ্যানালাইটিক্যাল ইঞ্জিন (Analytical Engine)",
    mech_drawback_title: "যান্ত্রিক কম্পিউটারের ২টি মারাত্মক ত্রুটি (Drawbacks)",
    elec_adv_title: "ইলেকট্রনিক কম্পিউটারের যুগান্তকারী সুবিধা",
    eniac_badge: "প্রথম ইলেকট্রনিক সুপারস্টার",
    sign_bit_title: "Sign Bit (চিহ্ন)",
    bits_val_idx: "Bits 1 – 39 (৩৯ বিট)",
    bits_val_title: "Numerical Value (বাইনারি মান)",
    number_word_banner: "💡 <strong>উদাহরণ (Slide 10):</strong> <code>01101000000 0000000000 0000000000 0000000000 = +0.8125</code><br>প্রথম বিট <code>0</code> মানে ধনাত্মক (+), আর <code>1</code> হলে ঋণাত্মক (-)।",
    inst_word_banner: "⚡ <strong>জাদুটি লক্ষ্য করো:</strong> একটি ৪০-বিট মেমরি লোকেশনে সরাসরি <strong>২টি পূর্ণাঙ্গ ২০-বিট নির্দেশ</strong> (Left ও Right) জমা রাখা যায়!",
    g2_transistor_title: "ট্রানজিস্টর ও ম্যাগনেটিক ডিস্ক",
    g2_batch_title: "ব্যাচ প্রসেসিং ও ব্যাচ মনিটর",
    inno_1_title: "8-Bit Byte স্ট্যান্ডার্ড",
    inno_2_title: "জেনারেল-রেজিস্টার অর্গানাইজেশন",
    inno_3_title: "পৃথক ৪টি ALU",
    inno_4_title: "সুপারভাইজার বনাম ইউজার স্টেট",
    inno_5_title: "প্রোগ্রাম স্ট্যাটাস ওয়ার্ড (PSW)",
    dense_chips_head: "সবচেয়ে ঘন দুটি চিপ (The 2 Densest Chips - Slide 24):",
    footer_title: "কম্পিউটার আর্কিটেকচার অ্যান্ড অর্গানাইজেশন (CAO) — লেকচার ২ মাস্টারক্লাস",
    footer_sub: "ডিজাইন করা হয়েছে স্পষ্টতা, গভীর বোধগম্যতা ও পরীক্ষার পূর্ণ প্রস্তুতির জন্য।"
  },
  en: {
    nav_brand_sub: "DIU CSE • John P. Hayes",
    nav_mech: "Mechanical Era",
    nav_gen: "5 Generations",
    nav_ias: "IAS Computer (40-bit)",
    nav_ibm: "IBM System/360",
    nav_vlsi: "VLSI & Categories",
    nav_quiz: "Exam Quiz",
    nav_take_test: "Take Quiz",
    hero_badge: "Comprehensive Lecture 2 Interactive Masterclass",
    hero_title: 'Evolution of Computers<br><span class="gradient-text">From Pascal & Babbage to Modern VLSI</span>',
    hero_subtitle: "How did computing leap from the mechanical inertia of spinning gear trains to the speed-of-light flow of electrons? Explore Babbage's Analytical Engine, the famous 40-bit IAS architecture, and the IBM System/360 software compatibility revolution!",
    stat_mech: "Pascal & Charles Babbage",
    stat_eniac: "ENIAC & 1st Gen (30 Tons)",
    stat_ias: "Von Neumann IAS Architecture",
    stat_ibm: "Software Compatibility",
    sec1_tag: "MODULE 1 • SLIDES 2, 3 & 4",
    sec1_title: "The Mechanical Computer Era",
    sec1_desc: "Tracing the pioneering mechanical calculators from Blaise Pascal to Charles Babbage's General-Purpose Analytical Engine.",
    pascal_desc: "French philosopher Blaise Pascal invented an early, influential mechanical gear-driven calculator capable of adding and subtracting decimal numbers directly.",
    pascal_pill: "⚙️ Gear & Pinion Decimal Addition/Subtraction",
    diff_engine_desc: "Charles Babbage designed this 19th-century machine to automatically calculate and print mathematical tables without human intervention. Crucially, it performed only one operation: <strong>Addition</strong>!",
    diff_pill: "➕ Addition-Only Difference Tabulator",
    analytical_engine_desc: "When the Difference Engine proved insufficient, Babbage conceived a vastly more powerful machine: the Analytical Engine—widely considered the <strong>first general-purpose programmable computer ever designed</strong>.",
    analytical_pill: "🏆 First General-Purpose Programmable Computer",
    babbage_lab_badge: "Slide 4 Architecture Diagram",
    babbage_lab_title: "🏛️ Architecture of Babbage's Analytical Engine",
    babbage_lab_desc: "Hover or click through the architecture blocks to see how Babbage originated the concepts of CPU, Memory, Control, and I/O back in the 1830s!",
    babbage_mill_desc: "Arithmetic Logic Unit: The calculating engine where arithmetic operations occurred.",
    bus_data: "Data Flow",
    babbage_store_desc: "Main Memory: Where numbers and intermediate variables were held on stacked gears.",
    bus_io: "I/O Link",
    babbage_io_desc: "Printer & Card Punch equipment for program I/O.",
    pcu_op_card: "Specifies which operation (+, -, *, /) to perform",
    pcu_var_card: "Specifies which Store memory locations to read/write",
    mech_drawback1: "<strong>Inertia of moving parts:</strong> Heavy gears, levers, and ratchet wheels severely capped calculation speed due to mechanical mass.",
    mech_drawback2: "<strong>Mechanical Unreliability:</strong> Physical wear and gear slippage caused recurrent transmission errors.",
    elec_adv1: "<strong>Electrons Move at Near Light-Speed:</strong> No moving mechanical gears! The active particles are electrons travelling at near $300,000 \\text{ km/s}$!",
    elec_adv2: "<strong>Vacuum Tubes & Silicon:</strong> Capable of switching and storing digital pulses thousands of times faster than any mechanical apparatus.",
    sec2_tag: "MODULE 2 • SLIDE 6",
    sec2_title: "The 5 Computer Generations",
    sec2_desc: "Click the generation tabs below to explore the core switching technology, timeline, and defining architectural leaps of each era!",
    eniac_maker: "Inventors",
    eniac_purpose: "Purpose",
    eniac_purpose_sub: "Automatic artillery firing tables for the U.S. Army",
    eniac_weight: "Weight & Tubes",
    eniac_weight_sub: "Occupied an entire 30×50 ft room",
    eniac_speed: "Speed Comparison",
    eniac_speed_sub: "1,000 times faster than Harvard Mark I!",
    sec3_tag: "MODULE 3 • SLIDES 10, 11 & 12",
    sec3_title: "The IAS Computer: Von Neumann's 40-Bit Architecture",
    sec3_desc: "Designed in 1946 by John von Neumann at the Princeton Institute for Advanced Study, the IAS computer pioneered the stored-program architecture used by all modern computers.",
    ias_badge: "Top Exam Question • Slide 11",
    ias_lab_title: "🔬 IAS Computer 40-Bit Word Inspector",
    ias_lab_desc: "Each location in IAS memory stored a 40-bit word. Toggle between Number Word and Instruction Word to understand how data and dual-instruction pairs were structured!",
    btn_word_num: "🔢 Number Word (Data)",
    btn_word_inst: "📜 Instruction Word (Code)",
    left_inst_label: "Left Instruction (20 bits)",
    right_inst_label: "Right Instruction (20 bits)",
    opcode_desc: "Operation Code (ADD, SUB)",
    addr_desc: "Memory Address (0 to 999)",
    ias_limits_title: "⚠️ Limitations of First-Generation & IAS Computers:",
    limit_1: "❌ <strong>No Index Registers:</strong> Required tedious self-modifying code to alter memory operand addresses.",
    limit_2: "❌ <strong>Scarce Registers & No Cache:</strong> Only a handful of CPU accumulator registers and zero cache memory hierarchy.",
    limit_3: "❌ <strong>Numerical Bias:</strong> Hardwired strictly for mathematical computing; non-numerical text processing was painfully difficult.",
    limit_4: "❌ <strong>Neglected I/O:</strong> Input-Output operations were treated as minor afterthoughts.",
    sec4_tag: "MODULE 4 • SLIDES 14, 15 & 16",
    sec4_title: "2nd Generation: Transistors & High-Level Languages",
    sec4_desc: "Vacuum tubes gave way to solid-state transistors, magnetic storage, and the birth of modern programming languages.",
    g2_transistor_desc: "Transistors served as high-speed electronic switches that were smaller, far cheaper, and consumed vastly less power than vacuum tubes. Magnetic disks became principal secondary storage.",
    g2_fortran_desc: "<strong>FORmula TRANslation (1954–1957):</strong> Developed at IBM under John Backus; the first successful high-level language, engineered for scientific calculations.",
    g2_cobol_desc: "<strong>Common Business Oriented Language (1959):</strong> Sponsored by the U.S. DoD; tailored for business applications with both numeric and text processing.",
    g2_batch_desc: "<strong>Batch Processing:</strong> Programs were batched on magnetic tapes and managed in continuous sequence by a resident <em>Batch Monitor</em>—the direct precursor to modern Operating Systems.",
    sec5_tag: "MODULE 5 • SLIDES 17 – 21",
    sec5_title: "3rd Generation & The IBM System/360 Revolution",
    sec5_desc: "Integrated Circuits (IC) and IBM's unification of computing architectures under a single compatible instruction set.",
    ibm_title: "🖥️ Software Compatibility (The Defining Innovation)",
    ibm_desc: "All models across the IBM System/360 family shared a common instruction set architecture. Programs written for an entry-level model ran unmodified on high-end mainframe models!",
    compat_flow_tag: "Exact same binary running across models with zero code rewriting!",
    m30_desc: "Entry Model • Moderate Speed",
    m50_desc: "Mid-range Model • Double Speed",
    m75_desc: "High-end Giant • Blazing Speed",
    inno_1_desc: "Established the 8-bit byte worldwide as the fundamental unit of information transmission and storage.",
    inno_2_desc: "Introduced General-Register Organization with 16 identical, individually addressable 32-bit registers.",
    inno_3_desc: "Equipped separate specialized ALUs: Fixed-point ALU, Floating-point ALU, and Decimal ALU.",
    inno_4_desc: "Pioneered dual CPU operational states: Supervisor State (privileged OS mode) and User State (application mode).",
    inno_5_desc: "Created the Program Status Word (PSW) and Status Register (SR) to record CPU-detected error states.",
    sec6_tag: "MODULE 6 • SLIDES 22, 23, 24 & 25",
    sec6_title: "4th Generation: VLSI & Computer Classifications",
    sec6_desc: "Packing millions of transistors onto a single silicon chip birthed the single-chip CPU (Microprocessor) and modern computing.",
    density_title: "📊 Integrated Circuit (IC) Density Scale:",
    density_desc: "Classified by the number of active transistors integrated into a single semiconductor chip:",
    dense_chips_body: "1. <strong>DRAM</strong> (Dynamic RAM - core of main memory) and 2. <strong>Single-chip CPU / Microprocessor</strong>.",
    cat_micro: "Personal computers, laptops, tablets, and phones driven by single-chip microprocessors.",
    cat_mini: "Mid-sized multi-user systems historically used for departmental networking and industrial control.",
    cat_main: "High-throughput transaction servers powering banks, flight reservations, and massive databases (e.g., IBM 360/370).",
    cat_super: "Massively parallel number crunchers built for nuclear physics, aerospace, and weather forecasting.",
    sec7_tag: "EXAM MASTERY • QUIZ ZONE",
    sec7_title: "Lecture 2 Self-Assessment Quiz",
    sec7_desc: "Test your understanding of Lecture 2 concepts with these 5 high-yield exam questions!",
    quiz_score_prefix: "Score:",
    btn_next_q: "Next Question ➡️",
    cheat_title: "Lecture 2: 10-Minute Exam Night Quick Revision Sheet",
    cheat_l2_1: "<strong>Babbage Analytical Engine:</strong> 1st General-Purpose Programmable Computer • The Mill (ALU), The Store (Memory), Operation & Variable Cards.",
    cheat_l2_2: "<strong>ENIAC (1946):</strong> Mauchly & Eckert • 18,000 Vacuum Tubes • 30 Tons • 3 ms multiplication (1000x faster than Harvard Mark I).",
    cheat_l2_3: "<strong>IAS Computer (40-bit word):</strong> Holds 1 40-bit number OR 2 20-bit instructions (8-bit opcode + 12-bit memory address).",
    cheat_l2_4: "<strong>IBM System/360:</strong> Software Compatibility • 8-bit byte standard • 16 × 32-bit general registers • Supervisor vs User State.",
    cheat_l2_5: "<strong>5 Generations:</strong> 1st (Vacuum Tubes) ➔ 2nd (Transistors + FORTRAN) ➔ 3rd (IC + IBM 360) ➔ 4th (VLSI + Microprocessor) ➔ 5th (AI).",
    cheat_l2_6: "<strong>Densest Chips:</strong> DRAM and Single-chip CPU / Microprocessor.",
    ias_game_badge: "📜 Mini-Game • IAS Codebreaker",
    ias_game_score_label: "Cracked:",
    ias_game_title: "Princeton IAS Codebreaker Challenge",
    ias_game_desc: "How did John von Neumann's 1952 IAS computer interpret stored instructions? A real 20-bit Princeton IAS instruction is given below. Decode the correct internal CPU operation to earn the <strong>IAS Codebreaker</strong> badge and 100 XP!",
    ias_mission_prompt: "When this instruction executes, what happens inside the IAS CPU?",
    ibm_badge: "Revolutionary Concept • Slide 18",
    btn_compat_run: "▶ Run Compatibility Test",
    vault_badge: "🎯 EXAM MASTER VAULT • DIU CSE",
    l2_math_title: "Exam Mathematical Problems & Model Answers",
    l2_math_sub: "Princeton IAS 40-Bit Word Decoding, Addressable Memory Math & CPU Blueprint:",
    l2_p1_tag: "Math Problem 1 • Bloom's Level 3 (Apply)",
    l2_p1_title: "Princeton IAS 40-Bit Hex Word Decoding",
    l2_p1_statement: "<strong>Question:</strong> Memory location 100 of the Princeton IAS computer contains the word <code>0102821042H</code>. Assuming this is an instruction word, separate the Left and Right instructions into Opcode and Address fields, and describe their operations.",
    l2_p1_s1: "In IAS architecture, 1 word = 40 bits = 10 hexadecimal digits.",
    l2_p1_s2: "<strong>Left Instruction (First 5 digits = 20 bits):</strong> <code>01028H</code>",
    l2_p1_s3: "↳ Opcode = <code>01H</code> (8 bits), Address = <code>028H</code> (12 bits = $40_{10}$)",
    l2_p1_s4: "↳ Meaning: Load value of memory location 40 into Accumulator: <code>AC := M[40]</code>",
    l2_p1_s5: "<strong>Right Instruction (Last 5 digits = 20 bits):</strong> <code>21042H</code>",
    l2_p1_s6: "↳ Opcode = <code>21H</code> (8 bits), Address = <code>042H</code> (12 bits = $66_{10}$)",
    l2_p1_s7: "↳ Meaning: Store Accumulator value into memory location 66: <code>M[66] := AC</code>",
    l2_p1_res: "✅ <strong>Summary:</strong> Two instructions in one word: fetch from M[40], perform arithmetic, and write result to M[66]!",
    l2_p2_tag: "Math Problem 2 • Bloom's Level 3 (Apply)",
    l2_p2_title: "Princeton IAS Maximum Addressable Space",
    l2_p2_statement: "<strong>Question:</strong> The IAS instruction allocates 12 bits for memory address. What is the maximum number of words and kilobytes of memory that can be addressed by this architecture?",
    l2_p2_s1: "Allocated address bits = 12 bits.",
    l2_p2_s2: "Maximum words = $2^{12} = 4096$ words.",
    l2_p2_s3: "Each word = 40 bits = 5 bytes ($40/8 = 5$ bytes).",
    l2_p2_s4: "Total memory capacity = $4096 \\times 5\\text{ Bytes} = 20,480\\text{ Bytes} = 20\\text{ KB}$.",
    l2_p2_res: "✅ <strong>Result:</strong> Maximum 4,096 words or 20 Kilobytes (physically IAS was equipped with 1,024 words = 5 KB).",
    l2_bp_title: "100% Exam-Perfect Blueprint: Princeton IAS CPU Structure",
    l2_bp_tip: "💡 <strong>Exam Secret:</strong> IAS fetches a 40-bit word in a single read. The Left instruction moves directly into IR for immediate execution, while the Right instruction waits temporarily in IBR (Instruction Buffer Register)!",
    l2_fact_badge: "Fascinating History • Did You Know?",
    l2_fact_title: "The True Story Behind the Term 'Computer Bug'!",
    l2_fact_body: "On September 9, 1947, engineers on the Harvard Mark II computer observed computational errors. Legendary pioneer <strong>Grace Hopper</strong> opened the machine and discovered an actual <strong>moth trapped inside relay #70</strong>! Removing it with tweezers, she taped it into the logbook noting: <em>\"First actual case of bug being found\"</em>, permanently cementing 'bug' and 'debugging' in computer terminology.",
    pascal_era: "1623 – 1662",
    pascal_title: "Blaise Pascal & The Pascaline",
    diff_era: "19th Century",
    diff_title: "Babbage's Difference Engine",
    analytical_badge: "First General-Purpose Computer",
    analytical_title: "Babbage's Analytical Engine",
    mech_drawback_title: "The 2 Critical Drawbacks of Mechanical Computers",
    elec_adv_title: "Breakthrough Advantages of Electronic Computers",
    eniac_badge: "First Electronic Computing Superstar",
    sign_bit_title: "Sign Bit",
    bits_val_idx: "Bits 1 – 39 (39 Bits)",
    bits_val_title: "Numerical Value (Magnitude)",
    number_word_banner: "💡 <strong>Example (Slide 10):</strong> <code>01101000000 0000000000 0000000000 0000000000 = +0.8125</code><br>First bit <code>0</code> denotes positive (+), while <code>1</code> denotes negative (-).",
    inst_word_banner: "⚡ <strong>Notice the Innovation:</strong> A single 40-bit memory word stores <strong>two complete 20-bit instructions</strong> (Left and Right) simultaneously!",
    g2_transistor_title: "Transistors & Magnetic Disk Storage",
    g2_batch_title: "Batch Processing & The Batch Monitor",
    inno_1_title: "8-Bit Byte Standard",
    inno_2_title: "General-Register Organization",
    inno_3_title: "Dedicated Specialized ALUs",
    inno_4_title: "Supervisor vs. User States",
    inno_5_title: "Program Status Word (PSW)",
    dense_chips_head: "The 2 Densest Chips in Microelectronics (Slide 24):",
    footer_title: "Computer Architecture and Organization (CAO) — Lecture 2 Masterclass",
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

  // Re-render dynamic active generation tab
  renderActiveGeneration();

  // Re-render quiz question
  if (typeof renderCurrentQuestion === 'function' && !quizFinished) {
    renderCurrentQuestion();
  }

  // Notify shared gamification HUD & passport modal
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

// --- 3. 5 Generations Interactive Portal ---
const generationsData = {
  1: {
    title: { bn: "১ম প্রজন্ম (1944 – 1958): ভ্যাকুয়াম টিউবের যুগ", en: "1st Generation (1944 – 1958): Vacuum Tube Era" },
    tech: { bn: "ভ্যাকুয়াম টিউব (Vacuum Tubes)", en: "Vacuum Tubes / Thermionic Valves" },
    speed: { bn: "মিলিসেকেন্ড (Milliseconds - ms)", en: "Milliseconds (ms)" },
    memory: { bn: "ম্যাগনেটিক ড্রাম ও অ্যাকোস্টিক ডিলে লাইন", en: "Magnetic Drum & Delay Lines" },
    language: { bn: "মেশিন কোড (বাইনারি) এবং পরবর্তীতে প্রাথমিক অ্যাসেম্বলি ভাষা", en: "Machine Language (Binary) & Early Assembly" },
    notable: { bn: "ENIAC (১৮,০০০ টিউব, ৩০ টন), IAS Computer, EDVAC, UNIVAC I", en: "ENIAC (18k tubes, 30 tons), IAS, EDVAC, UNIVAC I" },
    pros: { bn: "মেকানিক্যাল ইঞ্জিনের চেয়ে ১০০০ গুণ বেশি দ্রুতগতি।", en: "1,000x faster than mechanical calculators." },
    cons: { bn: "প্রচুর তাপ উৎপন্ন হতো, ঘন ঘন টিউব ফিউজ হয়ে নষ্ট হতো, বিশাল আকার।", en: "Enormous heat, frequent tube blowouts, massive power draw." }
  },
  2: {
    title: { bn: "২য় প্রজন্ম (1959 – 1963): ট্রানজিস্টর ও প্রোগ্রামিং ভাষার বিপ্লব", en: "2nd Generation (1959 – 1963): The Transistor Revolution" },
    tech: { bn: "ট্রানজিস্টর (Transistors)", en: "Solid-State Transistors" },
    speed: { bn: "মাইক্রোসেকেন্ড (Microseconds - µs)", en: "Microseconds (µs)" },
    memory: { bn: "ম্যাগনেটিক কোর মেমরি এবং ম্যাগনেটিক ডিস্ক", en: "Magnetic Core Memory & Magnetic Disks" },
    language: { bn: "FORTRAN (John Backus, 1954-57), COBOL (1959), Batch Monitors", en: "FORTRAN (1954-57), COBOL (1959), Batch Monitors" },
    notable: { bn: "IBM 7090, IBM 1401, CDC 1604", en: "IBM 7090, IBM 1401, CDC 1604" },
    pros: { bn: "আকারে অনেক ছোট, কম বিদ্যুৎ খরচ, টেকসই এবং বেশি নির্ভরযোগ্য।", en: "Much smaller, vastly less power, highly reliable electronic switches." },
    cons: { bn: "হাতে তার দিয়ে সার্কিট জুড়তে হতো, বাণিজ্যিকভাবে এখনও বেশ ব্যয়বহুল।", en: "Manual circuit assembly still required, high manufacturing costs." }
  },
  3: {
    title: { bn: "৩য় প্রজন্ম (1964 – 1970): ইন্টিগ্রেটেড সার্কিট (IC)", en: "3rd Generation (1964 – 1970): Integrated Circuits (IC)" },
    tech: { bn: "ইন্টিগ্রেটেড সার্কিট (Small/Medium Scale ICs on Silicon)", en: "Integrated Circuits (SSI & MSI on Silicon)" },
    speed: { bn: "ন্যানোসেকেন্ড (Nanoseconds - ns)", en: "Nanoseconds (ns)" },
    memory: { bn: "উন্নত ম্যাগনেটিক কোর এবং প্রাথমিক সেমিকন্ডাক্টর মেমরি", en: "Core memory & early semiconductor chips" },
    language: { bn: "OS/360, টাইম-শেয়ারিং সিস্টেম, BASIC, Pascal, C-এর সূচনা", en: "OS/360, Multiprogramming, Time-sharing, BASIC" },
    notable: { bn: "IBM System/360 (সফটওয়্যার কমপ্যাটিবিলিটি), PDP-8 (Minicomputer)", en: "IBM System/360 (Compatible Family), DEC PDP-8" },
    pros: { bn: "একই চিপে শত শত ট্রানজিস্টর, ৮-বিট বাইট স্ট্যান্ডার্ড, সফটওয়্যার কমপ্যাটিবিলিটি।", en: "Hundreds of components per chip, 8-bit byte standardized, modular OS." },
    cons: { bn: "চিপ তৈরির জটিল ফেব্রিকেশন প্রযুক্তি প্রয়োজন হতো।", en: "Complex semiconductor manufacturing and lithography required." }
  },
  4: {
    title: { bn: "৪র্থ প্রজন্ম (1971 – বর্তমান): LSI, VLSI ও মাইক্রোপ্রসেসর", en: "4th Generation (1971 – Present): VLSI & Microprocessors" },
    tech: { bn: "VLSI / ULSI (এক চিপে লাখো থেকে কোটি ট্রানজিস্টর)", en: "VLSI / ULSI (Millions/Billions of transistors)" },
    speed: { bn: "পিকোসেকেন্ড ও গিগাহার্টজ (GHz Microprocessors)", en: "Gigahertz (GHz) clock cycles / Picoseconds" },
    memory: { bn: "DRAM, SRAM ক্যাশ, NVMe SSD, ফ্ল্যাশ মেমরি", en: "High-density DRAM chips & Solid State Drives (SSD)" },
    language: { bn: "C, C++, Java, Python, আধুনিক GUI অপারেটিং সিস্টেম (Windows, Linux, macOS)", en: "C++, Java, Python, Modern OS (Windows, Linux, iOS, Android)" },
    notable: { bn: "Intel 4004 (1st CPU), Intel x86, ARM চিপস, আধুনিক পিসি ও স্মার্টফোন", en: "Intel 4004 (1971), Intel x86, ARM, Apple Silicon, Smartphones" },
    pros: { bn: "অবিশ্বাস্য গতি, ঘরের টেবিলে পিসি, সুলভ মূল্য, ব্যাটারিচালিত পোর্টেবিলিটি।", en: "Extreme compute density, desktop computers, smartphones, low cost." },
    cons: { bn: "চিপের ট্রানজিস্টর এত ছোট যে তাপ ও কোয়ান্টাম লিকেজ নিয়ন্ত্রণ কঠিন হচ্ছে।", en: "Approaching atomic limits of silicon scaling (heat and leakage)." }
  },
  5: {
    title: { bn: "৫ম প্রজন্ম (বর্তমান ও ভবিষ্যৎ): কৃত্রিম বুদ্ধিমত্তা (AI) ও কোয়ান্টাম", en: "5th Generation (Present & Future): AI & Parallelism" },
    tech: { bn: "AI অ্যাক্সিলারেটর (GPU/TPU/NPU), প্যারালাল আর্কিটেকচার, কোয়ান্টাম কিউবিট", en: "AI Accelerators (GPU/TPU), Massive Parallelism, Quantum Computing" },
    speed: { bn: "টেরাফ্লপস ও এক্সাফ্লপস (TFLOPS / EXAFLOPS)", en: "TeraFLOPS / PetaFLOPS / ExaFLOPS" },
    memory: { bn: "HBM (High Bandwidth Memory), অপটিক্যাল ও ক্লাউড ডিস্ট্রিবিউটেড মেমরি", en: "High-Bandwidth 3D Stacked Memory (HBM) & Distributed Cloud" },
    language: { bn: "Natural Language Prompting, PyTorch, TensorFlow, কোয়ান্টাম অ্যালগরিদম", en: "Natural Language Interfaces, Neural Networks, Quantum Circuits" },
    notable: { bn: "Google TPU, NVIDIA H100, Frontier Supercomputer, ChatGPT / Gemini", en: "Google TPU, NVIDIA H100, Frontier Supercomputer, Gemini / LLMs" },
    pros: { bn: "স্বয়ংক্রিয় চিন্তাশক্তি, প্যাটার্ন রিকগনিশন, মানব ভাষার বোধগম্যতা।", en: "Contextual reasoning, pattern synthesis, human-language comprehension." },
    cons: { bn: "বিশাল বিদ্যুৎ ও ডেটাসেন্টার কুলিংয়ের প্রয়োজনীয়তা।", en: "Immense energy demands, cooling requirements, and safety alignment." }
  }
};

let activeGen = 1;

function renderActiveGeneration() {
  const data = generationsData[activeGen];
  const isBn = currentLang === 'bn';
  const container = document.getElementById('genCardInner');
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
      <h3 style="font-size: 1.4rem; color: #fff;">${data.title[currentLang]}</h3>
      <span class="badge-status highlight-cyan">${data.speed[currentLang]}</span>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">
          ${isBn ? 'মূল হার্ডওয়্যার টেকনোলজি' : 'Core Switching Technology'}
        </span>
        <h4 style="font-size: 1.05rem; color: #fff; margin-top: 0.3rem;">${data.tech[currentLang]}</h4>
      </div>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">
          ${isBn ? 'মেমরি প্রযুক্তি' : 'Memory Technology'}
        </span>
        <h4 style="font-size: 1.05rem; color: #fff; margin-top: 0.3rem;">${data.memory[currentLang]}</h4>
      </div>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">
          ${isBn ? 'প্রোগ্রামিং ল্যাঙ্গুয়েজ' : 'Programming Languages'}
        </span>
        <h4 style="font-size: 1.05rem; color: #fff; margin-top: 0.3rem;">${data.language[currentLang]}</h4>
      </div>

      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem;">
        <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">
          ${isBn ? 'উল্লেখযোগ্য কম্পিউটার' : 'Prominent Computers'}
        </span>
        <h4 style="font-size: 1.05rem; color: #fff; margin-top: 0.3rem;">${data.notable[currentLang]}</h4>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 0.85rem 1rem;">
        <strong style="color: #6ee7b7;">✓ ${isBn ? 'প্রধান সুবিধা' : 'Key Breakthroughs'}:</strong>
        <p style="font-size: 0.88rem; color: #cbd5e1; margin-top: 0.25rem;">${data.pros[currentLang]}</p>
      </div>

      <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 0.85rem 1rem;">
        <strong style="color: #fca5a5;">⚠️ ${isBn ? 'সীমাবদ্ধতা ও চ্যালেঞ্জ' : 'Limitations'}:</strong>
        <p style="font-size: 0.88rem; color: #cbd5e1; margin-top: 0.25rem;">${data.cons[currentLang]}</p>
      </div>
    </div>
  `;
}

const genTabs = document.querySelectorAll('.gen-tab');
genTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sounds.click();
    genTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeGen = parseInt(tab.dataset.gen, 10);
    renderActiveGeneration();
  });
});

// --- 4. IAS 40-Bit Word Toggle ---
const btnWordNumber = document.getElementById('btnWordNumber');
const btnWordInstruction = document.getElementById('btnWordInstruction');
const numberWordView = document.getElementById('numberWordView');
const instructionWordView = document.getElementById('instructionWordView');

if (btnWordNumber && btnWordInstruction) {
  btnWordNumber.addEventListener('click', () => {
    sounds.click();
    btnWordNumber.classList.add('active');
    btnWordInstruction.classList.remove('active');
    numberWordView.classList.add('active');
    instructionWordView.classList.remove('active');
  });

  btnWordInstruction.addEventListener('click', () => {
    sounds.click();
    btnWordInstruction.classList.add('active');
    btnWordNumber.classList.remove('active');
    instructionWordView.classList.add('active');
    numberWordView.classList.remove('active');
  });
}

// --- 5. IBM System/360 Compatibility Live Demo ---
const btnRunCompatDemo = document.getElementById('btnRunCompatDemo');
const model30 = document.getElementById('model30');
const model50 = document.getElementById('model50');
const model75 = document.getElementById('model75');
const statM30 = document.getElementById('statM30');
const statM50 = document.getElementById('statM50');
const statM75 = document.getElementById('statM75');

if (btnRunCompatDemo) {
  let isRunningCompat = false;
  btnRunCompatDemo.addEventListener('click', () => {
    if (isRunningCompat) return;
    isRunningCompat = true;
    sounds.clockPulse();

    const isBn = currentLang === 'bn';
    btnRunCompatDemo.disabled = true;

    // Reset all
    [statM30, statM50, statM75].forEach(s => {
      s.textContent = isBn ? 'লোডিং...' : 'LOADING...';
    });
    [model30, model50, model75].forEach(m => m.classList.add('running'));

    // Model 75 finishes first (highest clock/hardware power)
    setTimeout(() => {
      sounds.correctChime();
      statM75.textContent = isBn ? '✅ সম্পন্ন (0.3s)' : '✅ DONE (0.3s)';
      statM75.style.color = '#34d399';
    }, 500);

    // Model 50 finishes second
    setTimeout(() => {
      sounds.correctChime();
      statM50.textContent = isBn ? '✅ সম্পন্ন (0.7s)' : '✅ DONE (0.7s)';
      statM50.style.color = '#34d399';
    }, 1100);

    // Model 30 finishes third
    setTimeout(() => {
      sounds.correctChime();
      statM30.textContent = isBn ? '✅ সম্পন্ন (1.4s)' : '✅ DONE (1.4s)';
      statM30.style.color = '#34d399';
      btnRunCompatDemo.disabled = false;
      isRunningCompat = false;
    }, 1800);
  });
}

// --- 6. Bilingual Interactive Quiz Engine (Lecture 2) ---
const quizData = {
  bn: [
    {
      question: "চার্লস ব্যাবেজের 'ডিফারেন্স ইঞ্জিন' এবং 'অ্যানালিটিক্যাল ইঞ্জিন'-এর মধ্যে মৌলিক পার্থক্য কী ছিল?",
      options: [
        "ডিফারেন্স ইঞ্জিন ছিল ট্রানজিস্টরে তৈরি আর অ্যানালিটিক্যাল ইঞ্জিন ভ্যাকুয়াম টিউবে",
        "ডিফারেন্স ইঞ্জিন শুধু যোগ করতে পারত, কিন্তু অ্যানালিটিক্যাল ইঞ্জিন ছিল প্রথম প্রোগ্রামেবল জেনারেল-পারপাস কম্পিউটার",
        "দুটোই একই কাজের জন্য তৈরি এবং এদের মাঝে কোনো তফাত ছিল না",
        "অ্যানালিটিক্যাল ইঞ্জিন শুধু সিনেমা দেখার জন্য বানানো হয়েছিল"
      ],
      answer: 1,
      explanation: "স্লাইড ৩ ও ৪ অনুযায়ী: ব্যাবেজের Difference Engine শুধু 'Addition' (যোগ) করে গাণিতিক টেবিল তৈরি করত। আর Analytical Engine হলো পৃথিবীর সর্বপ্রথম general-purpose programmable computer ডিজাইন।"
    },
    {
      question: "যান্ত্রিক কম্পিউটারের তুলনায় ইলেকট্রনিক কম্পিউটারের প্রধান শ্রেষ্ঠত্ব কোনটি?",
      options: [
        "যান্ত্রিক কম্পিউটার অনেক কম শব্দ করে",
        "ইলেকট্রনিক কম্পিউটারের চলমান অংশ হলো ইলেকট্রন যা প্রায় আলোর গতিতে ($300,000 \\text{ km/s}$) চলাচল করে",
        "যান্ত্রিক কম্পিউটারে বিদ্যুৎ বেশি লাগে না",
        "ইলেকট্রনিক কম্পিউটার সবসময় কাঠের তৈরি ফ্রেমের ভেতর চলে"
      ],
      answer: 1,
      explanation: "স্লাইড ৫ অনুযায়ী: মেকানিক্যাল কম্পিউটারে গিয়ারের জড়তা (inertia) ও অনির্ভরযোগ্যতা ছিল। অন্যদিকে ইলেকট্রনিক কম্পিউটারের উপাদান হলো ইলেকট্রন, যা প্রায় আলোর গতিতে চলে।"
    },
    {
      question: "জন ভন নিউম্যানের IAS কম্পিউটারে একটি ৪০-বিট ওয়ার্ড (40-bit word) মেমরিতে কীভাবে তথ্য জমা রাখত?",
      options: [
        "১টি ৪০-বিট সংখ্যা অথবা ২টি ২০-বিট নির্দেশ (প্রতিটি নির্দেশে ৮-বিট অপকোড ও ১২-বিট অ্যাড্রেস)",
        "সবসময় একসাথে ৪টি আলাদা সিনেমা ফাইল",
        "শুধুমাত্র ১টি একক অক্ষর ছাড়া কিছুই রাখা যেত না",
        "৪০টি ভিন্ন ভিন্ন নির্দেশ একসাথে রান করত"
      ],
      answer: 0,
      explanation: "স্লাইড ১০ ও ১১ অনুযায়ী: প্রতিটি ৪০-বিট ওয়ার্ডে হয় ১টি সংখ্যা (১ সাইন বিট + ৩৯ বিট মান) অথবা ২টি ২০-বিট নির্দেশ (Left & Right; ৮-বিট Opcode + ১২-বিট Address) থাকত।"
    },
    {
      question: "IBM System/360-এর সবচেয়ে বৈপ্লবিক অবদান কোনটি ছিল?",
      options: [
        "এটি সম্পূর্ণ প্লাস্টিকের খেলনা ছিল",
        "সফটওয়্যার কমপ্যাটিবিলিটি — ছোট মডেলের জন্য লেখা প্রোগ্রাম বড় মডেলগুলোতেও হুবহু রান করত",
        "এতে কোনো অপারেটিং সিস্টেমের দরকার হতো না",
        "এটি শুধু ক্যালকুলেটরের মতো ব্যাটারিতে চলত"
      ],
      answer: 1,
      explanation: "স্লাইড ১৮ অনুযায়ী: Software Compatibility-র কারণে একই সিরিজের যেকোনো মডেলে লেখা কোড কোনো পরিবর্তন ছাড়াই অন্য মডেলে রান করত, যা গ্রাহকদের কোটি কোটি টাকার সফটওয়্যার খরচ বাঁচিয়ে দেয়।"
    },
    {
      question: "কম্পিউটারের প্রজন্মগুলোর সাথে তাদের মূল সুইচিং টেকনোলজির সঠিক জোড় কোনটি?",
      options: [
        "১ম: ট্রানজিস্টর, ২য়: ভ্যাকুয়াম টিউব, ৩য়: AI",
        "১ম: ভ্যাকুয়াম টিউব, ২য়: ট্রানজিস্টর, ৩য়: Integrated Circuit (IC), ৪র্থ: VLSI",
        "১ম: VLSI, ২য়: মাইক্রোচিপ, ৩য়: কাঁচের গিয়ার",
        "১ম: ইন্টেল i7, ২য়: পাইথন, ৩য়: অ্যাবাকাস"
      ],
      answer: 1,
      explanation: "স্লাইড ৬ অনুযায়ী: ১ম প্রজন্ম (1944-58) = Vacuum Tubes, ২য় (1959-63) = Transistor, ৩য় (1964-70) = IC, ৪র্থ (1971-Now) = LSI/VLSI, ৫ম = AI।"
    }
  ],
  en: [
    {
      question: "What was the fundamental distinction between Babbage's Difference Engine and Analytical Engine?",
      options: [
        "Difference Engine used transistors while Analytical Engine used vacuum tubes",
        "Difference Engine performed only addition, whereas Analytical Engine was the first general-purpose programmable computer",
        "Both machines had identical architecture with zero difference",
        "Analytical Engine was designed purely as an analog video display"
      ],
      answer: 1,
      explanation: "According to Slides 3 & 4: The Difference Engine only computed mathematical tables using addition. The Analytical Engine was conceived as the world's first general-purpose programmable computer."
    },
    {
      question: "What gives electronic computers their defining speed advantage over mechanical computers?",
      options: [
        "Mechanical computers make less acoustic noise",
        "Electronic computers use electrons as moving parts, propagating at speeds approaching light ($300,000 \\text{ km/s}$)",
        "Mechanical computers consume zero mechanical friction",
        "Electronic computers require mechanical wooden clockwork"
      ],
      answer: 1,
      explanation: "Slide 5 states: Mechanical computers were limited by the physical inertia of moving parts. In electronic computers, moving parts are electrons traveling near the speed of light."
    },
    {
      question: "How was information structured inside the 40-bit word of the Princeton IAS computer?",
      options: [
        "Either a single 40-bit number OR a pair of 20-bit instructions (each having an 8-bit opcode and 12-bit address)",
        "Four simultaneous high-definition video frames",
        "Only a single ASCII character per word",
        "Forty individual 1-bit arithmetic operations"
      ],
      answer: 0,
      explanation: "Slides 10 & 11 state: Each 40-bit memory word held either one 40-bit signed number or two 20-bit instructions (Left and Right), each consisting of an 8-bit opcode and a 12-bit address."
    },
    {
      question: "What was the landmark innovation introduced by the IBM System/360 series?",
      options: [
        "It was manufactured entirely out of plastic",
        "Software Compatibility — programs written for entry models ran unmodified on high-end mainframes",
        "It eliminated the need for any operating system software",
        "It ran strictly on disposable watch batteries"
      ],
      answer: 1,
      explanation: "Slide 18 highlights: All models in the IBM System/360 family shared a common instruction set architecture, enabling software compatibility so users could upgrade hardware without rewriting software."
    },
    {
      question: "Which of the following correctly pairs computer generations with their defining switching technologies?",
      options: [
        "1st: Transistor, 2nd: Vacuum Tube, 3rd: AI",
        "1st: Vacuum Tubes, 2nd: Transistors, 3rd: Integrated Circuits (IC), 4th: VLSI",
        "1st: VLSI, 2nd: Microprocessors, 3rd: Wooden Gears",
        "1st: Intel i7, 2nd: Python, 3rd: Abacus"
      ],
      answer: 1,
      explanation: "Slide 6 explicitly outlines: 1st Gen (1944-58) = Vacuum Tubes, 2nd Gen (1959-63) = Transistors, 3rd Gen (1964-70) = IC, 4th Gen (1971-Now) = LSI/VLSI, 5th Gen = Artificial Intelligence."
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
      feedback = 'অসাধারণ! লেকচার ২-এর বিবর্তনের ইতিহাস ও মূল আর্কিটেকচার তোমার সম্পূর্ণ আয়ত্তে চলে এসেছে।';
    } else if (percentage >= 60) {
      feedback = 'খুব ভালো! IAS ৪০-বিট ওয়ার্ড ও IBM ৩৬০ রিভিশন পয়েন্টগুলো আরেকবার দেখে নিলে তুমি ১০০% রেডি!';
    } else {
      feedback = 'আরেকবার স্লাইড ও সিমুলেশনগুলো খেয়াল করো, তারপর আবার টেস্ট দাও!';
    }
  } else {
    if (percentage >= 80) {
      feedback = 'Brilliant! You have thoroughly mastered computer evolution, IAS 40-bit structure, and IBM System/360!';
    } else if (percentage >= 60) {
      feedback = 'Great job! Re-checking the IAS 40-bit word and generation tabs will ensure total mastery.';
    } else {
      feedback = 'Review the historical diagrams and cheat cards, then retake the quiz!';
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

// --- 7. Mini-Game: Princeton IAS Codebreaker ---
(function initIasCodebreaker() {
  const iasMissions = [
    {
      opcodeBin: '00000001 (01H)',
      addrBin: '000000101000 (028H = 40)',
      promptBn: 'Opcode 01H এবং Addr 028H এক্সিকিউট করলে IAS কম্পিউটারে কী ঘটবে?',
      promptEn: 'What happens when Opcode 01H and Addr 028H are executed in IAS?',
      options: [
        { bn: 'মেমরি লোকেশন ৪০-এর মান সরাসরি Accumulator (AC) রেজিস্টারে লোড হবে [LOAD M(40)]', en: 'Load contents of Memory location 40 into Accumulator (AC) [LOAD M(40)]', correct: true },
        { bn: 'Accumulator-এর মান মুছে দিয়ে শূন্য হয়ে যাবে', en: 'Clear Accumulator to zero', correct: false },
        { bn: 'মেমরির ৪০ নম্বর লোকেশনে প্রিন্টার চালু হবে', en: 'Start printer at memory 40', correct: false }
      ],
      insightBn: 'সঠিক! 01H হলো IAS-এর অন্যতম প্রধান নির্দেশ LOAD M(X), যা মেমরি থেকে ডাটা এনে AC-তে রাখে।'
    },
    {
      opcodeBin: '00100001 (21H)',
      addrBin: '000001000010 (042H = 66)',
      promptBn: 'Opcode 21H এবং Addr 042H এক্সিকিউট করলে মেমরিতে কী প্রভাব পড়বে?',
      promptEn: 'What effect does Opcode 21H and Addr 042H have on memory?',
      options: [
        { bn: 'Accumulator (AC)-এর ফলাফল মেমরি লোকেশন ৬৬-তে জমা হবে [STOR M(66)]', en: 'Store contents of Accumulator (AC) into Memory location 66 [STOR M(66)]', correct: true },
        { bn: 'মেমরি ৬৬ মুছে ফেলা হবে', en: 'Delete memory location 66', correct: false },
        { bn: 'প্রোগ্রাম কাউন্টার ৬৬-তে লাফ দেবে', en: 'Jump PC to location 66', correct: false }
      ],
      insightBn: 'নির্ভুল! 21H হলো STOR M(X) নির্দেশ, যা হিসাব শেষে ফলাফল মেমরিতে সংরক্ষণ করে।'
    },
    {
      opcodeBin: '00000101 (05H)',
      addrBin: '000000010000 (010H = 16)',
      promptBn: 'Opcode 05H এবং Addr 010H দিয়ে ALU কী গাণিতিক অপারেশন করবে?',
      promptEn: 'What arithmetic operation will ALU perform with Opcode 05H and Addr 010H?',
      options: [
        { bn: 'মেমরি ১৬-এর মান AC-এর সাথে যোগ করে নতুন মান AC-তে রাখবে [ADD M(16)]', en: 'Add contents of Memory 16 to AC, storing result in AC [ADD M(16)]', correct: true },
        { bn: 'মেমরি ১৬-এর মান থেকে AC বিয়োগ করবে', en: 'Subtract AC from memory 16', correct: false },
        { bn: 'মেমরি ১৬ এবং ১৭ এর গুণফল বের করবে', en: 'Multiply memory 16 and 17', correct: false }
      ],
      insightBn: 'দুর্দান্ত! 05H হলো ADD M(X), যা এক ধাপে মেমরি ডাটা পড়ে ALU-তে যোগ সম্পন্ন করে।'
    }
  ];

  let currentMission = 0;
  let crackedCount = 0;

  const opcodeEl = document.getElementById('iasDisplayOpcode');
  const addrEl = document.getElementById('iasDisplayAddr');
  const promptEl = document.getElementById('iasMissionPrompt');
  const optionsGrid = document.getElementById('iasOptionsGrid');
  const feedbackEl = document.getElementById('iasFeedback');
  const scoreEl = document.getElementById('iasScore');

  if (!opcodeEl || !optionsGrid) return;

  function loadMission(idx) {
    if (idx >= iasMissions.length) {
      finishGame();
      return;
    }

    const m = iasMissions[idx];
    const isBn = currentLang === 'bn';

    opcodeEl.textContent = 'Opcode: ' + m.opcodeBin;
    addrEl.textContent = 'Address: ' + m.addrBin;
    promptEl.textContent = isBn ? m.promptBn : m.promptEn;
    if (feedbackEl) feedbackEl.textContent = '';

    optionsGrid.innerHTML = '';
    m.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'ias-opt-btn';
      btn.textContent = isBn ? opt.bn : opt.en;
      btn.addEventListener('click', (e) => {
        if (opt.correct) {
          crackedCount++;
          if (scoreEl) scoreEl.textContent = crackedCount;
          sounds.correctChime();
          if (feedbackEl) {
            feedbackEl.style.color = '#34d399';
            feedbackEl.textContent = isBn ? ('✓ ' + m.insightBn) : '✓ Correctly decoded instruction!';
          }
          if (window.caoGame) {
            window.caoGame.addXP(30, 'IAS Instruction Decoded', e);
          }
          currentMission++;
          setTimeout(() => loadMission(currentMission), 1800);
        } else {
          sounds.wrongBuzz();
          if (feedbackEl) {
            feedbackEl.style.color = '#ef4444';
            feedbackEl.textContent = isBn ? '❌ ভুল ডিকোডিং! আবার চেষ্টা করো।' : '❌ Incorrect decoding! Try again.';
          }
        }
      });
      optionsGrid.appendChild(btn);
    });
  }

  function finishGame() {
    const isBn = currentLang === 'bn';
    promptEl.textContent = isBn ? '🎉 সকল আইএএস মেশিন কোড সফলভাবে ডিকোড সম্পন্ন!' : '🎉 All IAS Machine Codes Decoded!';
    optionsGrid.innerHTML = `
      <div style="text-align: center;">
        <button id="retryIasBtn" class="action-btn primary-btn" style="margin: 0 auto; display: block;">
          ${isBn ? '🔄 পুনরায় খেলো' : '🔄 Play Again'}
        </button>
      </div>
    `;

    document.getElementById('retryIasBtn').addEventListener('click', () => {
      currentMission = 0;
      crackedCount = 0;
      if (scoreEl) scoreEl.textContent = '0';
      loadMission(0);
    });

    if (window.caoGame) {
      window.caoGame.unlockBadge('l2_ias');
    }
  }

  loadMission(0);
})();

// Track generation tabs exploration for badge
let exploredGens = new Set([1]);
document.querySelectorAll('.gen-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const gen = parseInt(btn.dataset.gen, 10);
    exploredGens.add(gen);
    if (window.caoGame) {
      window.caoGame.addXP(15, `Generation ${gen} Explored`);
      if (exploredGens.size >= 5) {
        window.caoGame.unlockBadge('l2_generations');
      }
    }
  });
});

// Startup
applyLanguage(currentLang);
loadQuestion(0);

