// ═══════════════════════════════════════════════════════════════════
//  exercises/ch4.js
//  Chương 4: Thí nghiệm hiện trường (SPT – CPT – Bàn nén)
//  TS. Phạm Việt Anh – ĐHXD Hà Nội
//  Merge: bài cũ (SVG hố khoan, 3-câu MCQ) + bài mới (CPT, bàn nén)
// ═══════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────
//  BẢNG TRA DÙNG CHUNG (theo slide giảng dạy)
// ─────────────────────────────────────────────────────────────────

const BANG_SPT_2_COT = `
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:8px;">
  <div>
    <div style="font-size:.76rem;font-weight:700;color:#1565c0;margin-bottom:4px;">🏖️ ĐẤT RỜI (Cát) – theo N</div>
    <table style="width:100%;border-collapse:collapse;font-size:.79rem;">
      <thead><tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:4px 6px;">N</th>
        <th style="padding:4px 6px;">Trạng thái</th>
        <th style="padding:4px 6px;">φ (°)</th>
      </tr></thead>
      <tbody>
        <tr style="background:#f7faff;text-align:center;"><td>0÷4</td><td style="text-align:left;padding:4px 6px;">Rất rời</td><td>≈30</td></tr>
        <tr style="text-align:center;"><td>4÷10</td><td style="text-align:left;padding:4px 6px;">Rời</td><td>30÷35</td></tr>
        <tr style="background:#f7faff;text-align:center;"><td>10÷30</td><td style="text-align:left;padding:4px 6px;">Chặt vừa</td><td>35÷40</td></tr>
        <tr style="text-align:center;"><td>30÷50</td><td style="text-align:left;padding:4px 6px;">Chặt</td><td>40÷45</td></tr>
        <tr style="background:#f7faff;text-align:center;"><td>&gt;50</td><td style="text-align:left;padding:4px 6px;">Rất chặt</td><td>&gt;45</td></tr>
      </tbody>
    </table>
  </div>
  <div>
    <div style="font-size:.76rem;font-weight:700;color:#c62828;margin-bottom:4px;">🧱 ĐẤT DÍNH (Sét) – theo N</div>
    <table style="width:100%;border-collapse:collapse;font-size:.79rem;">
      <thead><tr style="background:#c62828;color:#fff;text-align:center;">
        <th style="padding:4px 6px;">N</th>
        <th style="padding:4px 6px;">Trạng thái</th>
        <th style="padding:4px 6px;">q<sub>u</sub> (kPa)</th>
      </tr></thead>
      <tbody>
        <tr style="background:#fff9f9;text-align:center;"><td>&lt;2</td><td style="text-align:left;padding:4px 6px;">Rất mềm</td><td>25</td></tr>
        <tr style="text-align:center;"><td>2÷4</td><td style="text-align:left;padding:4px 6px;">Mềm</td><td>25÷50</td></tr>
        <tr style="background:#fff9f9;text-align:center;"><td>4÷8</td><td style="text-align:left;padding:4px 6px;">Dẻo</td><td>50÷100</td></tr>
        <tr style="text-align:center;"><td>8÷15</td><td style="text-align:left;padding:4px 6px;">Dẻo cứng</td><td>100÷200</td></tr>
        <tr style="background:#fff9f9;text-align:center;"><td>15÷30</td><td style="text-align:left;padding:4px 6px;">Cứng</td><td>200÷400</td></tr>
        <tr style="text-align:center;"><td>&gt;30</td><td style="text-align:left;padding:4px 6px;">Rất cứng</td><td>&gt;400</td></tr>
      </tbody>
    </table>
    <div style="font-size:.74rem;margin-top:3px;color:#555;">c<sub>u</sub> = k·N (kN/m²), k = 3.5÷6.5 (tb: 4.4)</div>
  </div>
</div>`;

const BANG_CPT_CAT = `
<div style="margin-top:8px;">
  <div style="font-size:.76rem;font-weight:700;color:#1565c0;margin-bottom:4px;">📋 CPT – Đất CÁT (theo q<sub>c</sub>)</div>
  <table style="border-collapse:collapse;font-size:.78rem;width:100%;">
    <thead><tr style="background:#1565c0;color:#fff;text-align:center;">
      <th style="padding:4px 6px;">Loại cát</th>
      <th style="padding:4px 6px;">Chặt (MPa)</th>
      <th style="padding:4px 6px;">Chặt vừa (MPa)</th>
      <th style="padding:4px 6px;">Rời (MPa)</th>
    </tr></thead>
    <tbody>
      <tr style="background:#f7faff;"><td style="padding:3px 6px;">Cát thô/vừa</td><td style="text-align:center;">&gt;15</td><td style="text-align:center;">15÷5</td><td style="text-align:center;">&lt;5</td></tr>
      <tr><td style="padding:3px 6px;">Cát nhỏ</td><td style="text-align:center;">&gt;12</td><td style="text-align:center;">12÷4</td><td style="text-align:center;">&lt;4</td></tr>
      <tr style="background:#f7faff;"><td style="padding:3px 6px;">Cát bụi ẩm</td><td style="text-align:center;">&gt;10</td><td style="text-align:center;">10÷3</td><td style="text-align:center;">&lt;3</td></tr>
      <tr><td style="padding:3px 6px;">Cát bụi bão hòa</td><td style="text-align:center;">&gt;7</td><td style="text-align:center;">7÷2</td><td style="text-align:center;">&lt;2</td></tr>
    </tbody>
  </table>
</div>`;

const BANG_ALPHA_CPT = `
<div style="margin-top:8px;">
  <div style="font-size:.76rem;font-weight:700;color:#1565c0;margin-bottom:4px;">📋 E₀ = α·q<sub>c</sub> – Hệ số α theo loại đất</div>
  <table style="border-collapse:collapse;font-size:.78rem;width:100%;">
    <thead><tr style="background:#1565c0;color:#fff;text-align:center;">
      <th style="padding:4px 6px;">Loại đất</th>
      <th style="padding:4px 6px;">q<sub>c</sub> (kPa)</th>
      <th style="padding:4px 6px;">α</th>
    </tr></thead>
    <tbody>
      <tr style="background:#fff9f9;"><td style="padding:3px 6px;">Sét, sét pha dẻo cứng/cứng</td><td style="text-align:center;">&gt;1500</td><td style="text-align:center;">5÷8</td></tr>
      <tr><td style="padding:3px 6px;">Sét, sét pha dẻo cứng/cứng</td><td style="text-align:center;">&lt;1500</td><td style="text-align:center;">3÷6</td></tr>
      <tr style="background:#fff9f9;"><td style="padding:3px 6px;">Sét, sét pha dẻo mềm/chảy</td><td style="text-align:center;">&gt;700</td><td style="text-align:center;">4÷7</td></tr>
      <tr><td style="padding:3px 6px;">Bùn sét</td><td style="text-align:center;">&lt;700</td><td style="text-align:center;">3÷6</td></tr>
      <tr style="background:#fff9f9;"><td style="padding:3px 6px;">Bùn sét pha</td><td style="text-align:center;">&lt;700</td><td style="text-align:center;">2÷4</td></tr>
      <tr><td style="padding:3px 6px;">Cát pha</td><td style="text-align:center;">1000÷3500</td><td style="text-align:center;">3÷5</td></tr>
      <tr style="background:#fff9f9;"><td style="padding:3px 6px;">Cát</td><td style="text-align:center;">&gt;2000</td><td style="text-align:center;">1.5÷3</td></tr>
    </tbody>
  </table>
</div>`;

// ─────────────────────────────────────────────────────────────────
//  SVG DÙNG CHUNG
// ─────────────────────────────────────────────────────────────────

// SVG minh họa thí nghiệm SPT
const SVG_SPT_SETUP = `
<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:8px auto;">
  <defs>
    <marker id="spt-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#c62828"/>
    </marker>
  </defs>
  <!-- Cần khoan -->
  <rect x="148" y="10" width="24" height="80" fill="#90a4ae" stroke="#546e7a" stroke-width="1.5" rx="2"/>
  <text x="160" y="55" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">Cần</text>
  <!-- Búa 63.5 kg -->
  <rect x="135" y="5" width="50" height="20" fill="#455a64" stroke="#263238" stroke-width="1.5" rx="3"/>
  <text x="160" y="18" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">Búa 63.5kg</text>
  <!-- Rơi 76cm -->
  <line x1="200" y1="5" x2="200" y2="25" stroke="#e65100" stroke-width="1.5" stroke-dasharray="3,2"/>
  <text x="205" y="18" font-size="8" fill="#e65100" font-weight="bold">76cm</text>
  <!-- Mặt đất -->
  <line x1="20" y1="90" x2="300" y2="90" stroke="#5d4037" stroke-width="2"/>
  <text x="22" y="86" font-size="8" fill="#5d4037">Mặt đất</text>
  <!-- Đất -->
  <rect x="20" y="90" width="280" height="100" fill="#d7c89b"/>
  <!-- Ống mẫu 45cm -->
  <rect x="152" y="90" width="16" height="80" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <text x="160" y="140" text-anchor="middle" font-size="8" fill="#c62828" font-weight="bold">Ống mẫu</text>
  <text x="160" y="152" text-anchor="middle" font-size="8" fill="#c62828">45cm</text>
  <!-- Đoạn 15cm đầu (bỏ qua) -->
  <line x1="140" y1="105" x2="152" y2="105" stroke="#888" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="116" y="109" font-size="7" fill="#888">15cm (bỏ)</text>
  <!-- Đoạn 30cm đếm N -->
  <line x1="140" y1="115" x2="152" y2="115" stroke="#2e7d32" stroke-width="1.2"/>
  <line x1="140" y1="145" x2="152" y2="145" stroke="#2e7d32" stroke-width="1.2"/>
  <line x1="140" y1="115" x2="140" y2="145" stroke="#2e7d32" stroke-width="1.2"/>
  <text x="100" y="132" font-size="7.5" fill="#2e7d32" font-weight="bold">30cm → N</text>
  <!-- Chú thích -->
  <text x="22" y="185" font-size="8" fill="#1565c0" font-weight="bold">N = số nhát búa trong 30cm cuối</text>
  <text x="22" y="197" font-size="8" fill="#555">N₆₀ = N · C_E · C_N</text>
</svg>`;

// SVG minh họa CPT
const SVG_CPT_SETUP = `
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:8px auto;">
  <!-- Cần xuyên -->
  <rect x="143" y="10" width="14" height="100" fill="#78909c" stroke="#455a64" stroke-width="1.5"/>
  <text x="150" y="60" text-anchor="middle" font-size="8" fill="#fff" font-weight="bold">Cần</text>
  <!-- Mặt đất -->
  <line x1="20" y1="110" x2="280" y2="110" stroke="#5d4037" stroke-width="2"/>
  <text x="22" y="106" font-size="8" fill="#5d4037">Mặt đất</text>
  <!-- Đất -->
  <rect x="20" y="110" width="260" height="80" fill="#d7c89b"/>
  <!-- Cần trong đất -->
  <rect x="143" y="110" width="14" height="60" fill="#78909c" stroke="#455a64" stroke-width="1.5"/>
  <!-- Chuỳ côn -->
  <polygon points="143,170 157,170 150,188" fill="#ef9a9a" stroke="#c62828" stroke-width="1.5"/>
  <!-- Mặt côn fs -->
  <rect x="143" y="155" width="14" height="15" fill="#ffb74d" stroke="#e65100" stroke-width="1"/>
  <!-- Nhãn -->
  <text x="168" y="165" font-size="8" fill="#e65100" font-weight="bold">f_s (bên)</text>
  <text x="168" y="183" font-size="8" fill="#c62828" font-weight="bold">q_c (mũi)</text>
  <!-- Mũi tên lực ấn -->
  <line x1="150" y1="10" x2="150" y2="5" stroke="#1565c0" stroke-width="2" marker-end="url(#cpt-dn)"/>
  <text x="155" y="9" font-size="8" fill="#1565c0" font-weight="bold">F</text>
  <defs>
    <marker id="cpt-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="0" orient="auto">
      <path d="M2.5,5 L0,0 L5,0 z" fill="#1565c0"/>
    </marker>
  </defs>
  <!-- Thông số -->
  <text x="22" y="200" font-size="8" fill="#1565c0" font-weight="bold">Góc đỉnh 60°, d=35.7mm, F=10cm²</text>
</svg>`;

// SVG bàn nén hiện trường
const SVG_BAN_NEN = `
<svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:8px auto;">
  <defs>
    <marker id="bn-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#e53935"/>
    </marker>
  </defs>
  <!-- Tải trọng P -->
  <line x1="170" y1="10" x2="170" y2="35" stroke="#e53935" stroke-width="3" marker-end="url(#bn-dn)"/>
  <text x="178" y="25" font-size="11" fill="#e53935" font-weight="bold">P</text>
  <!-- Bàn nén -->
  <rect x="120" y="38" width="100" height="14" fill="#90a4ae" stroke="#455a64" stroke-width="2" rx="2"/>
  <text x="170" y="49" text-anchor="middle" font-size="9" fill="#1a237e" font-weight="bold">Bàn nén (b)</text>
  <!-- Mặt đất -->
  <line x1="40" y1="52" x2="300" y2="52" stroke="#555" stroke-width="1" stroke-dasharray="5,3"/>
  <!-- Đất -->
  <rect x="40" y="52" width="260" height="100" fill="#fff9c4" stroke="#f9a825" stroke-width="1"/>
  <line x1="40" y1="65" x2="75" y2="52" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="40" y1="82" x2="95" y2="52" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="40" y1="99" x2="115" y2="52" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="50" y1="118" x2="120" y2="68" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="200" y1="52" x2="235" y2="70" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="220" y1="52" x2="268" y2="80" stroke="#8d6e63" stroke-width="0.6"/>
  <line x1="240" y1="52" x2="290" y2="85" stroke="#8d6e63" stroke-width="0.6"/>
  <text x="170" y="100" text-anchor="middle" font-size="10" fill="#1b5e20" font-weight="bold">ĐẤT NỀN (γ, φ, c, μ₀)</text>
  <!-- S lún -->
  <line x1="230" y1="52" x2="230" y2="75" stroke="#1565c0" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="234" y="67" font-size="10" fill="#1565c0" font-weight="bold">S</text>
  <!-- Công thức -->
  <text x="28" y="162" font-size="9.5" fill="#1565c0" font-weight="bold">E₀ = p·b·ω·(1−μ₀²)/S</text>
  <text x="28" y="175" font-size="8.5" fill="#555">ω=0.79 (tròn) | ω=0.88 (vuông)</text>
</svg>`;


// ═══════════════════════════════════════════════════════════════════
//  PHẦN 1 – THÍ NGHIỆM SPT
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_SPT = `
<div class="theory-block">
  <div class="theory-label">📖 THÍ NGHIỆM XUYÊN TIÊU CHUẨN SPT – Diễn giải kết quả</div>
  <div style="display:grid;grid-template-columns:1fr 240px;gap:12px;align-items:start;margin-top:6px;">
    <div style="font-size:.84rem;line-height:1.8;">
      Từ giá trị N đo được → diễn giải:<br>
      ① Phân biệt ranh giới lớp đất<br>
      ② Trạng thái đất (cát / dính)<br>
      ③ φ (đất cát), c<sub>u</sub> = k·N (đất dính)<br>
      ④ E₀ = k·N₆₀ (cát và sét)<br>
      <div style="margin-top:6px;font-size:.82rem;color:#555;">
        <b>Hiệu chỉnh N → N₆₀:</b><br>
        N₆₀ = N · C<sub>E</sub> · C<sub>N</sub><br>
        C<sub>N</sub> = √(95.76/σ'<sub>v</sub>) ≤ 2.0
      </div>
    </div>
    ${SVG_SPT_SETUP}
  </div>
  ${BANG_SPT_2_COT}
</div>`;

// ── 4.1a – Tra bảng trạng thái: 3 mẫu (cát + sét) cùng lúc ──────
EXERCISES['ch4_b1a'] = {
  chapterId: 'ch4',
  title: '4.1a – Xác định trạng thái đất theo N-SPT (đất cát và đất dính)',
  type: 'guided',
  theoryHTML: LY_THUYET_SPT,
  hint: `
    <div class="hint-title">💡 Cách tra bảng</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Đất cát → tra bảng bên trái (xanh dương).<br>
      Đất dính → tra bảng bên phải (đỏ).<br>
      N càng lớn → đất càng tốt.
    </div>`,
  genData(rng) {
    const soils = [
      {name:'cát mịn',    type:'cat'}, {name:'cát thô',    type:'cat'},
      {name:'cát lẫn bụi',type:'cat'}, {name:'sét pha',    type:'set'},
      {name:'bùn sét',    type:'set'}, {name:'sét cứng',   type:'set'},
    ];
    const picks = []; const usedN = new Set();
    while (picks.length < 3) {
      const s = soils[Math.floor(rng() * soils.length)];
      const N = 1 + Math.floor(rng() * 40);
      if (usedN.has(N)) continue;
      usedN.add(N);
      let state, idx, opts;
      if (s.type === 'cat') {
        if      (N <= 4)  { state='Rất rời';  idx=0; }
        else if (N <= 10) { state='Rời';       idx=1; }
        else if (N <= 30) { state='Chặt vừa'; idx=2; }
        else if (N <= 50) { state='Chặt';      idx=3; }
        else              { state='Rất chặt';  idx=4; }
        opts = ['A. Rất rời','B. Rời','C. Chặt vừa','D. Chặt','E. Rất chặt'];
      } else {
        if      (N < 2)  { state='Rất mềm';  idx=0; }
        else if (N <= 4)  { state='Mềm';      idx=1; }
        else if (N <= 8)  { state='Dẻo';      idx=2; }
        else if (N <= 15) { state='Dẻo cứng'; idx=3; }
        else if (N <= 30) { state='Cứng';     idx=4; }
        else              { state='Rất cứng'; idx=5; }
        opts = ['A. Rất mềm','B. Mềm','C. Dẻo','D. Dẻo cứng','E. Cứng','F. Rất cứng'];
      }
      picks.push({...s, N, state, idx, opts});
    }
    return { picks };
  },
  statement(d) {
    return `Xác định trạng thái của 3 mẫu đất sau (tra bảng):<br><br>
    <strong>(a)</strong> Mẫu <strong>${d.picks[0].name}</strong>, N-SPT = <strong>${d.picks[0].N}</strong><br>
    <strong>(b)</strong> Mẫu <strong>${d.picks[1].name}</strong>, N-SPT = <strong>${d.picks[1].N}</strong><br>
    <strong>(c)</strong> Mẫu <strong>${d.picks[2].name}</strong>, N-SPT = <strong>${d.picks[2].N}</strong>`;
  },
  questions: [
    { id:'qa', type:'mcq', label:'(a) Trạng thái:',
      choices: d => d.picks[0].opts, correctIndex: d => d.picks[0].idx },
    { id:'qb', type:'mcq', label:'(b) Trạng thái:',
      choices: d => d.picks[1].opts, correctIndex: d => d.picks[1].idx },
    { id:'qc', type:'mcq', label:'(c) Trạng thái:',
      choices: d => d.picks[2].opts, correctIndex: d => d.picks[2].idx },
  ]
};


// ── 4.1b – Tính φ (đất cát) + c_u (đất dính) cùng 1 bài ─────────
EXERCISES['ch4_b1b'] = {
  chapterId: 'ch4',
  title: '4.1b – Xác định φ (đất cát) và c_u (đất dính) từ SPT',
  type: 'guided',
  theoryHTML: LY_THUYET_SPT,
  hint: `
    <div class="hint-title">💡 Công thức</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Đất cát:</b> Tra bảng → khoảng φ<br>
      <b>Đất dính:</b> c<sub>u</sub> = k·N (kN/m²), k = 4.4 (trung bình)
    </div>`,
  genData(rng) {
    const Ncat = [3,7,15,25,38][Math.floor(rng()*5)];
    const phiMap = {3:'≈30°', 7:'30÷35°', 15:'35÷40°', 25:'35÷40°', 38:'40÷45°'};
    const phiIdx = {3:0, 7:1, 15:2, 25:2, 38:3};
    const Nset = 3 + Math.floor(rng() * 22);
    const k    = r2(3.5 + rng() * 3.0);
    const cu_k = r2(k * Nset);
    const cu_tb= r2(4.4 * Nset);
    return { Ncat, phi_str: phiMap[Ncat], phi_idx: phiIdx[Ncat], Nset, k, cu_k, cu_tb };
  },
  statement(d) {
    return `<strong>(a)</strong> Mẫu cát, N-SPT = <strong>${d.Ncat}</strong>. Xác định khoảng góc ma sát trong φ.<br><br>
    <strong>(b)</strong> Mẫu sét pha, N-SPT = <strong>${d.Nset}</strong>. Tính c<sub>u</sub> với k = ${d.k}.`;
  },
  questions: [
    { id:'qa', type:'mcq', label:'(a) Khoảng φ tra bảng:',
      choices: d => ['A. φ ≈ 30°', 'B. φ = 30÷35°', 'C. φ = 35÷40°', 'D. φ = 40÷45°'],
      correctIndex: d => d.phi_idx },
    { id:'qb', type:'fill', label:'(b) c_u = k·N =',
      unit:'kN/m²', answer: d => d.cu_k, tol: 1 },
    { id:'qc', type:'fill', label:'(b) Nếu k = 4.4 (tb): c_u =',
      unit:'kN/m²', answer: d => d.cu_tb, tol: 1 },
  ]
};


// ── 4.1c – Ứng suất hữu hiệu có MNN + tính N60 ───────────────────
EXERCISES['ch4_b1c'] = {
  chapterId: 'ch4',
  title: '4.1c – Ứng suất hữu hiệu (có MNN) và N₆₀ hiệu chỉnh',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Công thức tính theo độ sâu</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Trên MNN:</b> σ'<sub>v</sub> = γ·z<br>
      <b>Dưới MNN:</b> σ'<sub>v</sub> = γ·z<sub>MNN</sub> + γ'·(z − z<sub>MNN</sub>)<br>
      γ' = γ<sub>bh</sub> − 10 (kN/m³)<br><br>
      <b>N₆₀ = N · C<sub>E</sub> · C<sub>N</sub></b><br>
      C<sub>N</sub> = √(95.76/σ'<sub>v</sub>) ≤ 2.0
    </div>`,
  genData(rng) {
    const gamma   = r2(17.5 + rng() * 1.5);
    const gammaBH = r2(gamma + 1.0 + rng() * 0.5);
    const gammaP  = r2(gammaBH - 10);
    const zMNN    = r2(1.0 + rng() * 2.0);
    const z       = r2(zMNN + 1.5 + rng() * 4);
    const N       = 5 + Math.floor(rng() * 30);
    const CE      = 0.85;
    const sv      = r2(gamma * zMNN + gammaP * (z - zMNN));
    const CN      = r2(Math.min(Math.sqrt(95.76 / sv), 2.0));
    const N60     = r2(N * CE * CN);
    return { gamma, gammaBH, gammaP, zMNN, z, N, CE, sv, CN, N60 };
  },
  statement(d) {
    return `Thí nghiệm SPT tại độ sâu <strong>z = ${d.z} m</strong>. Đất phủ: γ = ${d.gamma} kN/m³, γ<sub>bh</sub> = ${d.gammaBH} kN/m³. Mực nước ngầm tại <strong>z<sub>MNN</sub> = ${d.zMNN} m</strong>. Kết quả đo N = <strong>${d.N}</strong>, C<sub>E</sub> = ${d.CE}.<br><br>
    Tính σ'<sub>v</sub>, C<sub>N</sub> và N₆₀.`;
  },
  questions: [
    { id:'q0', type:'fill', label:"γ' = γ_bh − 10 =",
      unit:'kN/m³', answer: d => d.gammaP, tol: 0.1 },
    { id:'q1', type:'fill', label:'σ\'_v tại z =',
      unit:'kPa', answer: d => d.sv, tol: 2 },
    { id:'q2', type:'fill', label:'C_N = √(95.76/σ\'_v) =',
      unit:'', answer: d => d.CN, tol: 0.03 },
    { id:'q3', type:'fill', label:'N₆₀ = N · C_E · C_N =',
      unit:'', answer: d => d.N60, tol: 0.5 },
  ]
};


// ── 4.1d – E₀ từ N60 (đất cát và đất dính, kết hợp cùng bài) ─────
EXERCISES['ch4_b1d'] = {
  chapterId: 'ch4',
  title: '4.1d – Mô đun biến dạng E₀ từ N₆₀ (cát và sét)',
  type: 'apply',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 TÍNH E₀ TỪ SPT</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:.83rem;margin-top:6px;">
    <div>
      <div style="font-weight:700;color:#1565c0;margin-bottom:4px;">Đất CÁT: E₀ = k·N₆₀</div>
      <table style="border-collapse:collapse;font-size:.79rem;width:100%;">
        <tr style="background:#e3f2fd;"><td style="padding:3px 6px;">Cát lẫn bụi, sét</td><td style="padding:3px 8px;font-weight:700;">k = 500</td></tr>
        <tr><td style="padding:3px 6px;">Cát sạch CK bình thường</td><td style="padding:3px 8px;font-weight:700;">k = 1000</td></tr>
        <tr style="background:#e3f2fd;"><td style="padding:3px 6px;">Cát sạch quá cố kết</td><td style="padding:3px 8px;font-weight:700;">k = 1500</td></tr>
      </table>
    </div>
    <div>
      <div style="font-weight:700;color:#c62828;margin-bottom:4px;">Đất DÍNH: E₀ = k·N₆₀</div>
      <table style="border-collapse:collapse;font-size:.79rem;width:100%;">
        <tr style="background:#fce4ec;"><td style="padding:3px 6px;">Tính dẻo cao (A ≥ 30)</td><td style="padding:3px 8px;font-weight:700;">k = 410</td></tr>
        <tr><td style="padding:3px 6px;">Tính dẻo thấp (A &lt; 30)</td><td style="padding:3px 8px;font-weight:700;">k = 860−15A</td></tr>
      </table>
    </div>
  </div>
</div>`,
  hint: `
    <div class="hint-title">💡 Tra k theo loại đất</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Cát → k cố định theo loại.<br>
      Sét: A ≥ 30 → k = 410; A &lt; 30 → k = 860 − 15A.
    </div>`,
  genData(rng) {
    const catTypes = [
      {label:'cát lẫn bụi, sét', k:500},
      {label:'cát sạch cố kết bình thường', k:1000},
      {label:'cát sạch quá cố kết', k:1500},
    ];
    const soil = catTypes[Math.floor(rng() * catTypes.length)];
    const N60  = Math.floor(8 + rng() * 28);
    const E0   = Math.round(soil.k * N60);
    // Đất dính
    const highA= rng() > 0.5;
    const A    = highA ? Math.floor(30 + rng()*35) : Math.floor(5 + rng()*24);
    const kb   = highA ? 410 : Math.round(860 - 15 * A);
    const N60b = Math.floor(6 + rng() * 22);
    const E0b  = Math.round(kb * N60b);
    return { soil, N60, E0, A, kb, N60b, E0b };
  },
  statement(d) {
    return `<strong>(a)</strong> Lớp <strong>${d.soil.label}</strong> có N₆₀ = <strong>${d.N60}</strong> (k = ${d.soil.k}). Tính E₀.<br><br>
    <strong>(b)</strong> Lớp <strong>sét pha</strong> chỉ số dẻo A = <strong>${d.A}%</strong>, N₆₀ = <strong>${d.N60b}</strong>. Tính k và E₀.`;
  },
  questions: [
    { id:'qa', type:'fill', label:'(a) E₀ = k·N₆₀ =',
      unit:'kN/m²', answer: d => d.E0, tol: 50 },
    { id:'qb', type:'fill', label:'(b) k =',
      unit:'', answer: d => d.kb, tol: 1 },
    { id:'qc', type:'fill', label:'(b) E₀ =',
      unit:'kN/m²', answer: d => d.E0b, tol: 50 },
  ]
};


// ── 4.1z – Tổng hợp hố khoan: SVG biểu đồ N-z + 10 câu ──────────
EXERCISES['ch4_b1z'] = {
  chapterId: 'ch4',
  title: '4.1z – Tổng hợp: Diễn dịch kết quả SPT hố khoan',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Quy trình đọc kết quả SPT</div>
    <div style="font-size:.83rem;line-height:1.8;">
      Ranh giới lớp = giữa 2 vị trí đo N thay đổi đột ngột<br>
      c<sub>u</sub> = 4.4·N | N₆₀ = N·C<sub>E</sub>·C<sub>N</sub><br>
      C<sub>N</sub> = √(95.76/σ'<sub>v</sub>) | E₀(cát) = 1000·N₆₀
    </div>
    ${BANG_SPT_2_COT}`,
  genData(rng) {
    const DEPTHS = [1.5,3,4.5,6,7.5,9,10.5,12,13.5,15,16.5,18];
    const n1 = 2 + Math.floor(rng()*2);
    const n2 = 3 + Math.floor(rng()*2);
    const n3 = DEPTHS.length - n1 - n2;
    const Nvals = [];
    for (let i=0;i<n1;i++) Nvals.push(1+Math.floor(rng()*4));
    for (let i=0;i<n2;i++) Nvals.push(5+Math.floor(rng()*10));
    for (let i=0;i<n3;i++) Nvals.push(18+Math.floor(rng()*25));
    const b12 = r2((DEPTHS[n1-1]+DEPTHS[n1])/2);
    const b23 = r2((DEPTHS[n1+n2-1]+DEPTHS[n1+n2])/2);
    const N1avg = r2(Nvals.slice(0,n1).reduce((a,b)=>a+b,0)/n1);
    const N2avg = r2(Nvals.slice(n1,n1+n2).reduce((a,b)=>a+b,0)/n2);
    const N3avg = r2(Nvals.slice(n1+n2).reduce((a,b)=>a+b,0)/n3);
    const g1=17.0, g2=18.2, g3=18.6;
    const zMNN = r2(1.0 + rng()*2.0);
    const h1 = DEPTHS[n1-1];
    const h2 = DEPTHS[n1+n2-1]-h1;
    const g1p=r2(g1-10), g2p=r2(g2-10), g3p=r2(g3-10);
    const sv1 = zMNN >= h1 ? r2(g1*h1) : r2(g1*zMNN + g1p*(h1-zMNN));
    const sv2 = r2(sv1 + (zMNN > h1 ? g2p : g2)*h2);
    const rep3 = n1+n2;
    const dep3 = DEPTHS[rep3];
    const sv3  = r2(sv2 + g3p*(dep3-DEPTHS[n1+n2-1]));
    const CN3  = r2(Math.min(Math.sqrt(95.76/Math.max(sv3,1)),2.0));
    const CE=0.85;
    const N60_3 = r2(Nvals[rep3]*CE*CN3);
    const E0_3  = Math.round(1000*N60_3);
    const cu1   = r2(4.4*N1avg);
    const stateIdx3 = N3avg<10?1:N3avg<30?2:N3avg<50?3:4;
    const states3=['Rất rời (N<4)','Rời (4÷10)','Chặt vừa (10÷30)','Chặt (30÷50)','Rất chặt (>50)'];
    // SVG biểu đồ N-z
    const PX_M=13, PX_N=3.8, OX=50, OY=16;
    const maxN=50, chartH=DEPTHS[DEPTHS.length-1]*PX_M;
    const yPx=m=>OY+m*PX_M, xPx=n=>OX+Math.min(n,maxN)*PX_N;
    const colors=['#81c784','#64b5f6','#ffb74d'];
    let bars='', pts='';
    DEPTHS.forEach((dep,i)=>{
      const li=i<n1?0:i<n1+n2?1:2;
      bars+=`<rect x="${OX}" y="${yPx(dep)-4}" width="${Math.min(Nvals[i],maxN)*PX_N}" height="8" fill="${colors[li]}" opacity=".5" rx="2"/>`;
      bars+=`<text x="${xPx(Nvals[i])+3}" y="${yPx(dep)+4}" font-size="8" fill="#333" font-family="monospace">${Nvals[i]}</text>`;
      pts+=`${xPx(Nvals[i])},${yPx(dep)} `;
    });
    let ticks='';
    DEPTHS.forEach(d=>{
      ticks+=`<line x1="${OX-3}" y1="${yPx(d)}" x2="${OX}" y2="${yPx(d)}" stroke="#666" stroke-width=".8"/>`;
      ticks+=`<text x="${OX-5}" y="${yPx(d)+3}" font-size="8" fill="#444" text-anchor="end">${d}</text>`;
    });
    let nGrid='';
    [0,10,20,30,40,50].forEach(n=>{
      nGrid+=`<line x1="${xPx(n)}" y1="${OY}" x2="${xPx(n)}" y2="${OY+chartH}" stroke="#e0e0e0" stroke-width=".7"/>`;
      nGrid+=`<text x="${xPx(n)}" y="${OY-4}" font-size="8" fill="#666" text-anchor="middle">${n}</text>`;
    });
    const svgW=OX+maxN*PX_N+30, svgH=OY+chartH+20;
    const svg=`<svg viewBox="0 0 ${svgW} ${svgH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:${svgW}px;display:block;margin:0 auto;">
      ${nGrid}${ticks}
      <line x1="${OX}" y1="${OY}" x2="${OX}" y2="${OY+chartH}" stroke="#333" stroke-width="1.5"/>
      <line x1="${OX}" y1="${OY}" x2="${OX+maxN*PX_N+5}" y2="${OY}" stroke="#333" stroke-width="1.2"/>
      ${bars}
      <polyline points="${pts}" fill="none" stroke="#1565c0" stroke-width="1.5"/>
      <line x1="${OX-12}" y1="${yPx(b12)}" x2="${OX+maxN*PX_N+5}" y2="${yPx(b12)}" stroke="#c62828" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="${OX-13}" y="${yPx(b12)-2}" font-size="7.5" fill="#c62828" text-anchor="end">L1/L2</text>
      <line x1="${OX-12}" y1="${yPx(b23)}" x2="${OX+maxN*PX_N+5}" y2="${yPx(b23)}" stroke="#c62828" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="${OX-13}" y="${yPx(b23)-2}" font-size="7.5" fill="#c62828" text-anchor="end">L2/L3</text>
      <text x="${OX+maxN*PX_N/2}" y="${OY-10}" font-size="9" fill="#333" text-anchor="middle" font-weight="600">N-SPT</text>
      <text x="8" y="${OY+chartH/2}" font-size="9" fill="#333" text-anchor="middle" font-weight="600" transform="rotate(-90,8,${OY+chartH/2})">Độ sâu (m)</text>
      ${colors.map((c,i)=>`<rect x="${OX+maxN*PX_N-55}" y="${OY+5+i*13}" width="10" height="8" fill="${c}" opacity=".6" rx="1"/><text x="${OX+maxN*PX_N-42}" y="${OY+12+i*13}" font-size="7.5" fill="#444">Lớp ${i+1}</text>`).join('')}
    </svg>`;
    const tableRows=DEPTHS.map((dep,i)=>`<tr style="${i%2?'':'background:#f7faff;'}">
      <td style="padding:5px 12px;text-align:center;font-family:monospace;font-weight:600;">${dep}</td>
      <td style="padding:5px 12px;text-align:center;font-family:monospace;font-size:.97rem;font-weight:700;color:#1565c0;">${Nvals[i]}</td>
    </tr>`).join('');
    return { DEPTHS,Nvals,n1,n2,n3,b12,b23,N1avg,N2avg,N3avg,
             g1,g2,g3,zMNN,sv1,sv2,sv3,CN3,N60_3,E0_3,
             cu1,stateIdx3,states3,_svg:svg,_tableRows:tableRows };
  },
  statement(d) {
    return `Hố khoan tại công trường cho kết quả SPT như bảng. Biết đất gồm: <strong>bùn sét</strong> (γ=17.0 kN/m³), <strong>sét pha</strong> (γ=18.2 kN/m³), <strong>cát sạch</strong> (γ=18.6 kN/m³). MNN tại <strong>z<sub>MNN</sub> = ${d.zMNN} m</strong>, C<sub>E</sub> = 0.85.
    <div style="display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;margin:12px 0;">
      <table style="border-collapse:collapse;border:1.5px solid #dce3ed;border-radius:8px;overflow:hidden;min-width:130px;">
        <thead><tr style="background:#1565c0;color:#fff;">
          <th style="padding:5px 14px;font-size:.79rem;">Độ sâu (m)</th>
          <th style="padding:5px 14px;font-size:.79rem;">N-SPT</th>
        </tr></thead>
        <tbody>${d._tableRows}</tbody>
      </table>
      ${d._svg}
    </div>`;
  },
  questions: [
    { id:'q1', type:'mcq', label:'1. Số lớp đất:',
      choices: d => ['A. 2 lớp','B. 3 lớp','C. 4 lớp','D. 5 lớp'],
      correctIndex: d => 1 },
    { id:'q2', type:'fill', label:'2. Ranh giới lớp 1/2 tại độ sâu =',
      unit:'m', answer: d=>d.b12, tol: 0.8 },
    { id:'q3', type:'fill', label:'3. Ranh giới lớp 2/3 tại độ sâu =',
      unit:'m', answer: d=>d.b23, tol: 0.8 },
    { id:'q4', type:'fill', label:'4. N trung bình lớp 1 =',
      unit:'', answer: d=>d.N1avg, tol: 0.6 },
    { id:'q5', type:'fill', label:'5. N trung bình lớp 2 =',
      unit:'', answer: d=>d.N2avg, tol: 0.6 },
    { id:'q6', type:'fill', label:'6. c_u lớp 1 (k=4.4) =',
      unit:'kPa', answer: d=>d.cu1, tol: 5 },
    { id:'q7', type:'mcq', label:'7. Trạng thái lớp 3 (cát):',
      choices: d => d.states3, correctIndex: d => d.stateIdx3 },
    { id:'q8', type:'fill', label:'8. σ\'_v tại đáy lớp 2 =',
      unit:'kPa', answer: d=>d.sv2, tol: 6 },
    { id:'q9', type:'fill', label:'9. N₆₀ tại điểm đầu lớp 3 =',
      unit:'', answer: d=>d.N60_3, tol: 0.6 },
    { id:'q10', type:'fill', label:'10. E₀ lớp 3 (cát sạch, k=1000) =',
      unit:'kN/m²', answer: d=>d.E0_3, tol: 500 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
//  PHẦN 2 – THÍ NGHIỆM CPT
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_CPT = `
<div class="theory-block">
  <div class="theory-label">📖 THÍ NGHIỆM XUYÊN TĨNH CPT – Diễn giải kết quả</div>
  <div style="display:grid;grid-template-columns:1fr 200px;gap:12px;align-items:start;margin-top:6px;">
    <div style="font-size:.84rem;line-height:1.8;">
      Từ q<sub>c</sub>, f<sub>s</sub> → diễn giải:<br>
      ① Phân biệt lớp đất (q<sub>c</sub> thay đổi đột ngột)<br>
      ② Trạng thái đất cát (theo q<sub>c</sub>)<br>
      ③ φ đất cát – Kulhawy & Mayne (1990)<br>
      ④ c<sub>u</sub> đất dính = q<sub>c</sub>/(10÷15) hoặc (q<sub>c</sub>−σ<sub>v</sub>)/N<sub>k</sub><br>
      ⑤ E₀ = α·q<sub>c</sub> (tra bảng α)
    </div>
    ${SVG_CPT_SETUP}
  </div>
  ${BANG_CPT_CAT}
</div>`;

// ── 4.2a – MCQ trạng thái đất cát theo qc ────────────────────────
EXERCISES['ch4_b2a'] = {
  chapterId: 'ch4',
  title: '4.2a – Trạng thái đất cát theo CPT (qc)',
  type: 'guided',
  theoryHTML: LY_THUYET_CPT,
  hint: `
    <div class="hint-title">💡 Tra bảng CPT đất cát</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Tìm loại cát → đối chiếu q<sub>c</sub> với 3 cột Chặt / Chặt vừa / Rời.
    </div>`,
  genData(rng) {
    const types = [
      {name:'cát thô',         chats:[15,5]},
      {name:'cát nhỏ',         chats:[12,4]},
      {name:'cát bụi ẩm',      chats:[10,3]},
      {name:'cát bụi bão hòa', chats:[7,2]},
    ];
    const ct = types[Math.floor(rng() * types.length)];
    const si = Math.floor(rng() * 3); // 0=Chặt, 1=Chặt vừa, 2=Rời
    let qc;
    if (si===0) qc = r2(ct.chats[0] + 1 + rng()*8);
    else if (si===1) qc = r2(ct.chats[1] + rng()*(ct.chats[0]-ct.chats[1]-0.5));
    else qc = r2(0.5 + rng()*(ct.chats[1]-0.6));
    return { cat_name: ct.name, qc, si };
  },
  statement(d) {
    return `Kết quả CPT trong lớp <strong>${d.cat_name}</strong> cho sức kháng mũi <strong>q<sub>c</sub> = ${d.qc} MPa</strong>.<br>
    Tra bảng xác định trạng thái của lớp cát.`;
  },
  questions: [
    { id:'q1', type:'mcq', label:'Trạng thái lớp cát:',
      choices: d => ['A. Chặt','B. Chặt vừa','C. Rời'],
      correctIndex: d => d.si }
  ]
};

// ── 4.2b – φ đất cát từ qc (Kulhawy & Mayne) ─────────────────────
EXERCISES['ch4_b2b'] = {
  chapterId: 'ch4',
  title: '4.2b – Góc ma sát trong φ từ CPT (Kulhawy & Mayne 1990)',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 TÍNH φ TỪ CPT</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#1565c0;">
      φ(°) = arctan[0.1 + 0.38·log(q<sub>c</sub>/σ'<sub>v</sub>)]
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:4px;color:#555;">σ'<sub>v</sub> và q<sub>c</sub> cùng đơn vị MPa</div>
  <table style="border-collapse:collapse;font-size:.79rem;width:100%;margin-top:8px;">
    <thead><tr style="background:#1565c0;color:#fff;text-align:center;">
      <th style="padding:4px 8px;">q<sub>c</sub> (MPa)</th>
      <th style="padding:4px 8px;">Độ sâu &lt;2m: φ°</th>
      <th style="padding:4px 8px;">Độ sâu &gt;5m: φ°</th>
    </tr></thead>
    <tbody>
      <tr style="text-align:center;background:#f7faff;"><td>≤1</td><td>28</td><td>26</td></tr>
      <tr style="text-align:center;"><td>2</td><td>30</td><td>28</td></tr>
      <tr style="text-align:center;background:#f7faff;"><td>4</td><td>32</td><td>30</td></tr>
      <tr style="text-align:center;"><td>7</td><td>34</td><td>32</td></tr>
      <tr style="text-align:center;background:#f7faff;"><td>12</td><td>36</td><td>34</td></tr>
      <tr style="text-align:center;"><td>20</td><td>38</td><td>36</td></tr>
      <tr style="text-align:center;background:#f7faff;"><td>&gt;30</td><td>40</td><td>38</td></tr>
    </tbody>
  </table>
</div>`,
  hint: `
    <div class="hint-title">💡 Các bước tính φ</div>
    <div style="font-size:.85rem;line-height:1.85;">
      B1. σ'<sub>v</sub> = γ·z (kPa) → đổi sang MPa (÷1000)<br>
      B2. Tỉ số q<sub>c</sub>/σ'<sub>v</sub><br>
      B3. φ = arctan[0.1 + 0.38·log(q<sub>c</sub>/σ'<sub>v</sub>)]
    </div>`,
  genData(rng) {
    const z = r2(2 + rng() * 8);
    const gamma = r2(17.5 + rng() * 2.0);
    const qc = r2(3 + rng() * 18);
    const sv_kPa = r2(gamma * z);
    const sv_MPa = r2(sv_kPa / 1000);
    const ratio  = r2(qc / sv_MPa);
    const phi    = r2(Math.atan(0.1 + 0.38 * Math.log10(ratio)) * 180 / Math.PI);
    return { z, gamma, qc, sv_kPa, sv_MPa, ratio, phi };
  },
  statement(d) {
    return `CPT tại độ sâu <strong>z = ${d.z} m</strong>. Đất phủ γ = ${d.gamma} kN/m³. Sức kháng mũi <strong>q<sub>c</sub> = ${d.qc} MPa</strong>.<br>
    Tính φ theo Kulhawy & Mayne (1990).`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ\'_v = γ·z =',
      unit:'kPa', answer: d => d.sv_kPa, tol: 1.0 },
    { id:'q2', type:'fill', label:'σ\'_v đổi sang MPa =',
      unit:'MPa', answer: d => d.sv_MPa, tol: 0.002 },
    { id:'q3', type:'fill', label:'Tỉ số q_c/σ\'_v =',
      unit:'', answer: d => d.ratio, tol: 1.0 },
    { id:'q4', type:'fill', label:'Góc ma sát trong φ =',
      unit:'°', answer: d => d.phi, tol: 0.5 },
  ]
};

// ── 4.2c – c_u đất dính từ qc ────────────────────────────────────
EXERCISES['ch4_b2c'] = {
  chapterId: 'ch4',
  title: '4.2c – Sức kháng cắt không thoát nước c_u từ CPT',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 c<sub>u</sub> ĐẤT DÍNH TỪ CPT</div>
  <div style="background:#fff;border:2px solid #c62828;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#c62828;">
      c<sub>u</sub> = q<sub>c</sub> / (10 ÷ 15)
    </span>
  </div>
  <div style="font-size:.84rem;margin-top:4px;">Công thức tổng quát (Mayne & Kemper 1988):</div>
  <div style="background:#fff;border:1px solid #ef9a9a;border-radius:8px;padding:8px 16px;margin:4px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.9rem;font-weight:700;color:#c62828;">
      c<sub>u</sub> = (q<sub>c</sub> − σ<sub>v</sub>) / N<sub>k</sub> &nbsp;&nbsp; N<sub>k</sub>=15 (xuyên điện), 20 (xuyên cơ)
    </span>
  </div>
</div>`,
  hint: `
    <div class="hint-title">💡 Hai cách tính</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Đơn giản: c<sub>u</sub> = q<sub>c</sub>/10 ÷ q<sub>c</sub>/15<br>
      Đầy đủ: c<sub>u</sub> = (q<sub>c</sub> − σ<sub>v</sub>) / N<sub>k</sub>
    </div>`,
  genData(rng) {
    const z = r2(2 + rng() * 8);
    const gamma = r2(16.5 + rng() * 2.0);
    const qc_kPa = Math.floor(500 + rng() * 2500);
    const sv  = r2(gamma * z);
    const Nk  = rng() > 0.5 ? 15 : 20;
    const cu_lo  = r2(qc_kPa / 15);
    const cu_hi  = r2(qc_kPa / 10);
    const cu_full= r2((qc_kPa - sv) / Nk);
    return { z, gamma, qc_kPa, sv, Nk, cu_lo, cu_hi, cu_full };
  },
  statement(d) {
    return `CPT trong lớp sét tại <strong>z = ${d.z} m</strong>. Đất phủ γ = ${d.gamma} kN/m³. Sức kháng mũi <strong>q<sub>c</sub> = ${d.qc_kPa} kPa</strong>. Thiết bị xuyên điện (N<sub>k</sub> = ${d.Nk}).<br>
    Tính c<sub>u</sub> theo công thức đơn giản và đầy đủ.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'c_u đơn giản (= q_c/15) =',
      unit:'kPa', answer: d => d.cu_lo, tol: 5 },
    { id:'q2', type:'fill', label:'c_u đơn giản (= q_c/10) =',
      unit:'kPa', answer: d => d.cu_hi, tol: 5 },
    { id:'q3', type:'fill', label:'σ_v = γ·z =',
      unit:'kPa', answer: d => d.sv, tol: 1 },
    { id:'q4', type:'fill', label:'c_u = (q_c − σ_v)/N_k =',
      unit:'kPa', answer: d => d.cu_full, tol: 3 },
  ]
};

// ── 4.2d – E₀ từ qc ──────────────────────────────────────────────
EXERCISES['ch4_b2d'] = {
  chapterId: 'ch4',
  title: '4.2d – Mô đun biến dạng E₀ từ CPT (E₀ = α·qc)',
  type: 'apply',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 E₀ TỪ CPT</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
      E₀ = α · q<sub>c</sub>
    </span>
  </div>
  ${BANG_ALPHA_CPT}
</div>`,
  hint: `
    <div class="hint-title">💡 Tra α theo loại đất và q_c</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Biết loại đất + q<sub>c</sub> → tra bảng khoảng α.<br>
      E₀<sub>min</sub> = α<sub>min</sub>·q<sub>c</sub>; E₀<sub>max</sub> = α<sub>max</sub>·q<sub>c</sub>
    </div>`,
  genData(rng) {
    const cases = [
      {soil:'sét cứng',     qc:r2(1600+rng()*2000), alow:5, ahi:8},
      {soil:'sét dẻo cứng', qc:r2(800+rng()*600),   alow:3, ahi:6},
      {soil:'sét dẻo mềm',  qc:r2(700+rng()*500),   alow:4, ahi:7},
      {soil:'cát pha',      qc:r2(1500+rng()*1500),  alow:3, ahi:5},
    ];
    const c = cases[Math.floor(rng() * cases.length)];
    const E0_lo = Math.round(c.alow * c.qc);
    const E0_hi = Math.round(c.ahi  * c.qc);
    return { soil: c.soil, qc: c.qc, alow: c.alow, ahi: c.ahi, E0_lo, E0_hi };
  },
  statement(d) {
    return `CPT trong lớp <strong>${d.soil}</strong> cho q<sub>c</sub> = <strong>${d.qc} kPa</strong>.<br>
    Tra bảng hệ số α và xác định khoảng E₀.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'α_min (thấp của khoảng) =',
      unit:'', answer: d => d.alow, tol: 0.1 },
    { id:'q2', type:'fill', label:'E₀_min = α_min · q_c =',
      unit:'kPa', answer: d => d.E0_lo, tol: 50 },
    { id:'q3', type:'fill', label:'E₀_max = α_max · q_c =',
      unit:'kPa', answer: d => d.E0_hi, tol: 50 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
//  PHẦN 3 – THÍ NGHIỆM BÀN NÉN
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_BAN_NEN = `
<div class="theory-block">
  <div class="theory-label">📖 THÍ NGHIỆM BÀN NÉN HIỆN TRƯỜNG</div>
  <div style="display:grid;grid-template-columns:1fr 240px;gap:12px;align-items:start;margin-top:6px;">
    <div>
      <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin-bottom:8px;display:inline-block;">
        <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
          E₀ = p · b · ω · (1 − μ₀²) / S
        </span>
      </div>
      <div style="font-size:.82rem;line-height:1.75;color:#444;">
        p = tải trọng dự kiến (kPa)<br>
        b = bề rộng/đường kính bàn nén (m)<br>
        ω = 0.79 (bàn tròn) | ω = 0.88 (bàn vuông)<br>
        μ₀ = hệ số Poisson<br>
        S = độ lún đo được (m) – chú ý đổi mm → m
      </div>
    </div>
    ${SVG_BAN_NEN}
  </div>
</div>`;

// ── 4.3a – Tính E₀ từ 1 cấp tải ─────────────────────────────────
EXERCISES['ch4_b3a'] = {
  chapterId: 'ch4',
  title: '4.3a – Mô đun biến dạng E₀ từ thí nghiệm bàn nén',
  type: 'guided',
  theoryHTML: LY_THUYET_BAN_NEN,
  hint: `
    <div class="hint-title">💡 Lưu ý đơn vị</div>
    <div style="font-size:.85rem;line-height:1.85;">
      S(mm) ÷ 1000 = S(m) trước khi tính.<br>
      <div class="hint-formula">E₀ = p · b · ω · (1−μ₀²) / S</div>
    </div>`,
  genData(rng) {
    const is_round = rng() > 0.5;
    const b   = r2(0.5 + rng() * 0.5);
    const om  = is_round ? 0.79 : 0.88;
    const mu0 = r2(0.25 + rng() * 0.15);
    const p   = Math.floor(25 + rng() * 75) * 5;
    const S_mm= r2(2 + rng() * 30);
    const S_m = Math.max(r3(S_mm / 1000), 0.001);  // tối thiểu 1mm, r3 giữ 3 chữ số
    const E0  = r2(p * b * om * (1 - mu0 * mu0) / S_m);
    return { is_round, b, om, mu0, p, S_mm, S_m, E0 };
  },
  statement(d) {
    return `Thí nghiệm bàn nén ${d.is_round ? 'tròn' : 'vuông'}, b = <strong>${d.b} m</strong>. Đất nền μ₀ = ${d.mu0}. Ở cấp tải <strong>p = ${d.p} kPa</strong>, đo được độ lún <strong>S = ${d.S_mm} mm</strong>.<br>
    Tính E₀ ứng với cấp tải này.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'ω =',
      unit:'', answer: d => d.om, tol: 0.01 },
    { id:'q2', type:'fill', label:'S đổi về m =',
      unit:'m', answer: d => d.S_m, tol: 0.0005 },
    { id:'q3', type:'fill', label:'E₀ = p·b·ω·(1−μ₀²)/S =',
      unit:'kPa', answer: d => d.E0, tol: 30 },
  ]
};

// ── 4.3b – Bảng số liệu, E₀ 3 cấp tải + nhận xét ────────────────
EXERCISES['ch4_b3b'] = {
  chapterId: 'ch4',
  title: '4.3b – Bàn nén: E₀ tại các cấp tải khác nhau',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Áp dụng cho từng cấp</div>
    <div style="font-size:.85rem;line-height:1.85;">
      E₀<sub>i</sub> = p<sub>i</sub> · b · ω · (1−μ₀²) / S<sub>i</sub>
    </div>`,
  genData(rng) {
    const b   = 0.707;
    const om  = 0.88;
    const mu0 = r2(0.28 + rng() * 0.1);
    const p1=25, p2=50, p3=100;
    const S1 = r2(3 + rng() * 3);
    const S2 = r2(S1 * 2.5 + rng() * 3);
    const S3 = r2(S2 * 3.0 + rng() * 10);
    const coeff = b * om * (1 - mu0 * mu0) * 1000;
    const E1 = r2(p1 * coeff / S1);
    const E2 = r2(p2 * coeff / S2);
    const E3 = r2(p3 * coeff / S3);
    return { b, om, mu0, p1,p2,p3, S1,S2,S3, E1,E2,E3 };
  },
  statement(d) {
    return `Thí nghiệm bàn nén vuông <strong>70.7×70.7 cm²</strong> (b = 0.707 m), μ₀ = ${d.mu0}. Kết quả:<br><br>
    <table style="border-collapse:collapse;font-size:.85rem;margin:6px auto;">
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:4px 10px;">Cấp p (kPa)</th>
        <th style="padding:4px 10px;">${d.p1}</th>
        <th style="padding:4px 10px;">${d.p2}</th>
        <th style="padding:4px 10px;">${d.p3}</th>
      </tr>
      <tr style="text-align:center;background:#f7faff;">
        <td style="padding:4px 10px;">S (mm)</td>
        <td>${d.S1}</td><td>${d.S2}</td><td>${d.S3}</td>
      </tr>
    </table><br>
    Tính E₀ ứng với từng cấp tải. Nhận xét.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'E₀ tại p₁ =',
      unit:'kPa', answer: d => d.E1, tol: 30 },
    { id:'q2', type:'fill', label:'E₀ tại p₂ =',
      unit:'kPa', answer: d => d.E2, tol: 30 },
    { id:'q3', type:'fill', label:'E₀ tại p₃ =',
      unit:'kPa', answer: d => d.E3, tol: 30 },
    { id:'q4', type:'mcq', label:'Xu hướng E₀ khi tải tăng:',
      choices: d => [
        'A. E₀ tăng (đất cứng hơn)',
        'B. E₀ giảm (phi tuyến – đất mềm hơn ở tải lớn)',
        'C. E₀ không đổi (tuyến tính)'
      ],
      correctIndex: d => 1 }
  ]
};


// ═══════════════════════════════════════════════════════════════════
//  TÓM TẮT CÔNG THỨC CUỐI CHƯƠNG 4
// ═══════════════════════════════════════════════════════════════════

EXERCISES['ch4_tomtat'] = {
  chapterId: 'ch4',
  title: '4.★ Tóm tắt công thức Chương 4',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📚 TÓM TẮT – CHƯƠNG 4: THÍ NGHIỆM HIỆN TRƯỜNG</div>

  <div style="margin-top:10px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ A. SPT</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#e3f2fd;"><td style="padding:5px 8px;width:32%;font-weight:700;">N₆₀</td>
      <td style="padding:5px 8px;font-family:monospace;">N₆₀ = N·C<sub>E</sub>·C<sub>N</sub>; C<sub>N</sub> = √(95.76/σ'<sub>v</sub>) ≤ 2.0</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">c<sub>u</sub> (Stroud 1974)</td>
      <td style="padding:5px 8px;font-family:monospace;">c<sub>u</sub> = k·N (kN/m²), k = 3.5÷6.5, tb 4.4</td></tr>
    <tr style="background:#e3f2fd;"><td style="padding:5px 8px;font-weight:700;">E₀ đất cát</td>
      <td style="padding:5px 8px;font-family:monospace;">E₀ = k·N₆₀; k=500/1000/1500 (kN/m²)</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">E₀ đất dính</td>
      <td style="padding:5px 8px;font-family:monospace;">E₀ = k·N₆₀; k=410 (A≥30) | k=860−15A (A&lt;30)</td></tr>
  </table>
  ${BANG_SPT_2_COT}

  <div style="margin-top:12px;font-weight:700;color:#1b5e20;font-size:.9rem;">▸ B. CPT</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#e8f5e9;"><td style="padding:5px 8px;width:32%;font-weight:700;">E₀</td>
      <td style="padding:5px 8px;font-family:monospace;">E₀ = α·q<sub>c</sub> (α tra bảng)</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">φ cát (K&M 1990)</td>
      <td style="padding:5px 8px;font-family:monospace;">φ = arctan[0.1 + 0.38·log(q<sub>c</sub>/σ'<sub>v</sub>)]</td></tr>
    <tr style="background:#e8f5e9;"><td style="padding:5px 8px;font-weight:700;">c<sub>u</sub> sét</td>
      <td style="padding:5px 8px;font-family:monospace;">c<sub>u</sub> = q<sub>c</sub>/(10÷15) hoặc (q<sub>c</sub>−σ<sub>v</sub>)/N<sub>k</sub></td></tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#c62828;font-size:.9rem;">▸ C. BÀN NÉN</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#fce4ec;"><td style="padding:5px 8px;width:32%;font-weight:700;">E₀</td>
      <td style="padding:5px 8px;font-family:monospace;">E₀ = p·b·ω·(1−μ₀²)/S; ω=0.79(tròn)|0.88(vuông)</td></tr>
  </table>
  <div style="margin-top:6px;font-size:.78rem;color:#555;">
    1 kPa = 0.1 T/m²; 1 T/m² = 10 kPa; đổi S(mm)→m trước khi tính.
  </div>
</div>`,
  hint: `<div class="hint-title">💡 Tóm tắt ôn tập.</div>`,
  hint: `<div class="hint-title">📌 Tóm tắt toàn bộ công thức chương 4 – không có câu hỏi tính toán.</div>`,
    genData(rng) { return {}; },
    statement(d) { return ''; },
    questions: []
};
