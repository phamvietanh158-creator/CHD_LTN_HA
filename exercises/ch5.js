// ═══════════════════════════════════════════════════════
//  exercises/ch5.js – Chương 5: Biến dạng & Lún
//  Trình tự: Phần 1 (Đàn hồi) → Phần 2 (Cộng lún)
// ═══════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════
//  SVG DÙNG CHUNG
// ══════════════════════════════════════════════════════════════

// SVG móng + tải + thông số đàn hồi
const SVG_ELASTIC_FULL = `
<svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;max-width:340px;display:block;margin:0 auto;">
  <defs>
    <marker id="e-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#c62828"/>
    </marker>
    <marker id="e-up" markerWidth="5" markerHeight="5" refX="2.5" refY="0" orient="auto">
      <path d="M2.5,0 L5,5 L0,5 z" fill="#2e7d32"/>
    </marker>
    <marker id="e-dn2" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#2e7d32"/>
    </marker>
  </defs>

  <!-- Mặt đất tự nhiên -->
  <line x1="10" y1="60" x2="330" y2="60" stroke="#5d4037" stroke-width="2"/>
  <text x="8" y="56" font-size="8" fill="#5d4037">Mặt đất</text>

  <!-- hm arrow -->
  <line x1="30" y1="60" x2="30" y2="104" stroke="#888" stroke-width="1.2"
        marker-start="url(#e-up)" marker-end="url(#e-dn2)"/>
  <text x="3" y="86" font-size="8" fill="#555" font-weight="bold">h_m</text>

  <!-- Móng -->
  <rect x="105" y="80" width="130" height="24" rx="2"
        fill="#90a4ae" stroke="#546e7a" stroke-width="1.5"/>
  <text x="170" y="96" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">
    Móng b × l
  </text>

  <!-- Đất phía trên móng (hatching) -->
  <rect x="10" y="60" width="95" height="44" fill="#d7c89b" opacity=".5"/>
  <rect x="235" y="60" width="95" height="44" fill="#d7c89b" opacity=".5"/>

  <!-- Nền đất dưới -->
  <rect x="10" y="104" width="320" height="86" fill="#d7c89b"/>
  <text x="30" y="120" font-size="8" fill="#795548">▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪</text>
  <text x="30" y="134" font-size="8" fill="#795548">▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪</text>
  <text x="30" y="148" font-size="8" fill="#795548">▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪</text>
  <text x="160" y="168" font-size="10" font-weight="bold" fill="#5d4037" text-anchor="middle">
    Nền đất: E₀, μ₀
  </text>

  <!-- Tải p_gl -->
  <text x="170" y="22" font-size="9" fill="#c62828" text-anchor="middle" font-weight="bold">
    p_tx (kPa)
  </text>
  <line x1="130" y1="26" x2="130" y2="80" stroke="#c62828" stroke-width="1.5" marker-end="url(#e-dn)"/>
  <line x1="170" y1="26" x2="170" y2="80" stroke="#c62828" stroke-width="1.5" marker-end="url(#e-dn)"/>
  <line x1="210" y1="26" x2="210" y2="80" stroke="#c62828" stroke-width="1.5" marker-end="url(#e-dn)"/>

  <!-- S lún -->
  <line x1="268" y1="104" x2="268" y2="130" stroke="#2e7d32" stroke-width="1.8"
        marker-start="url(#e-up)" marker-end="url(#e-dn2)"/>
  <text x="274" y="121" font-size="9" fill="#2e7d32" font-weight="bold">S</text>

  <!-- b arrow -->
  <line x1="105" y1="193" x2="235" y2="193" stroke="#1565c0" stroke-width="1.2"/>
  <line x1="105" y1="189" x2="105" y2="197" stroke="#1565c0" stroke-width="1.2"/>
  <line x1="235" y1="189" x2="235" y2="197" stroke="#1565c0" stroke-width="1.2"/>
  <text x="170" y="191" font-size="9" fill="#1565c0" text-anchor="middle" font-weight="bold">b</text>

  <!-- Công thức box -->
  <rect x="8" y="4" width="90" height="30" rx="5" fill="#e3f0fd" stroke="#1565c0" stroke-width="1"/>
  <text x="53" y="15" font-size="7.5" fill="#1565c0" text-anchor="middle" font-weight="bold">S = (1−μ₀²)·p_gl·b·ω</text>
  <line x1="20" y1="22" x2="86" y2="22" stroke="#1565c0" stroke-width="0.7"/>
  <text x="53" y="30" font-size="7.5" fill="#1565c0" text-anchor="middle">E₀</text>
</svg>`;

// SVG ứng suất trong nền + phân tố
const SVG_STRESS = `
<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;max-width:300px;display:block;margin:0 auto;">
  <defs>
    <marker id="s-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#c62828"/>
    </marker>
    <marker id="s-ax" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#333"/>
    </marker>
  </defs>

  <!-- Móng -->
  <rect x="90" y="10" width="120" height="20" fill="#90a4ae" stroke="#546e7a" stroke-width="1.5"/>
  <text x="150" y="24" font-size="9" font-weight="bold" fill="#fff" text-anchor="middle">Móng</text>
  <line x1="90" y1="8" x2="95" y2="8" stroke="#c62828" stroke-width="1.5" marker-end="url(#s-dn)"/>
  <line x1="150" y1="4" x2="150" y2="10" stroke="#c62828" stroke-width="1.5" marker-end="url(#s-dn)"/>
  <line x1="205" y1="8" x2="205" y2="8" stroke="#c62828" stroke-width="1.5"/>

  <!-- Mặt đất -->
  <line x1="15" y1="30" x2="285" y2="30" stroke="#5d4037" stroke-width="2"/>

  <!-- Phân tố 1 -->
  <rect x="90" y="30" width="120" height="40" fill="rgba(129,199,132,.3)"
        stroke="#2e7d32" stroke-width="1.2" stroke-dasharray="4,2"/>
  <text x="150" y="48" font-size="8" font-weight="bold" fill="#1b5e20" text-anchor="middle">Phân tố 1</text>
  <text x="150" y="60" font-size="7.5" fill="#1b5e20" text-anchor="middle">e₀₁, h₁ = 0.5m</text>

  <!-- Phân tố 2 -->
  <rect x="90" y="70" width="120" height="40" fill="rgba(100,181,246,.3)"
        stroke="#1565c0" stroke-width="1.2" stroke-dasharray="4,2"/>
  <text x="150" y="88" font-size="8" font-weight="bold" fill="#0d47a1" text-anchor="middle">Phân tố 2</text>
  <text x="150" y="100" font-size="7.5" fill="#0d47a1" text-anchor="middle">e₀₂, h₂ = 0.5m</text>

  <!-- Phân tố 3 -->
  <rect x="90" y="110" width="120" height="40" fill="rgba(255,213,79,.3)"
        stroke="#f9a825" stroke-width="1.2" stroke-dasharray="4,2"/>
  <text x="150" y="128" font-size="8" font-weight="bold" fill="#827717" text-anchor="middle">Phân tố 3</text>
  <text x="150" y="140" font-size="7.5" fill="#827717" text-anchor="middle">e₀₃, h₃ = 0.5m</text>

  <!-- Tắt lún -->
  <line x1="15" y1="150" x2="285" y2="150" stroke="#c62828" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="17" y="147" font-size="7.5" fill="#c62828" font-weight="bold">Tắt lún: Δσ ≤ 0.2·σ_bt</text>

  <!-- Trục z -->
  <line x1="22" y1="30" x2="22" y2="155" stroke="#555" stroke-width="1.2" marker-end="url(#s-ax)"/>
  <text x="14" y="98" font-size="9" fill="#555" font-weight="bold">z</text>

  <!-- Biểu đồ σ_bt (tam giác) -->
  <line x1="232" y1="30" x2="232" y2="155" stroke="#1565c0" stroke-width="1.2"/>
  <polygon points="232,30 270,155 232,155" fill="rgba(21,101,192,.15)" stroke="#1565c0" stroke-width="1"/>
  <text x="248" y="65" font-size="7.5" fill="#1565c0" font-weight="bold">σ_bt</text>

  <!-- Biểu đồ Δσ (đường cong giảm) -->
  <path d="M232,30 Q258,60 248,100 Q242,130 235,155"
        fill="rgba(198,40,40,.12)" stroke="#c62828" stroke-width="1.5"/>
  <text x="254" y="90" font-size="7.5" fill="#c62828" font-weight="bold">Δσ</text>

  <!-- Tổng S -->
  <text x="17" y="185" font-size="9" fill="#333" font-weight="bold">S = S₁ + S₂ + S₃</text>
  <text x="17" y="200" font-size="8" fill="#555">Sᵢ = (e₀ᵢ−e₁ᵢ)/(1+e₀ᵢ)·hᵢ</text>
  <text x="17" y="214" font-size="8" fill="#1565c0">σ_bt = Σγᵢhᵢ &nbsp;|&nbsp; Δσ = k₀·p_gl</text>
  <text x="17" y="228" font-size="8" fill="#c62828">e₁ tra từ biểu đồ e-p tại p₁ = σ_bt + Δσ</text>
</svg>`;

// SVG biểu đồ e-p (đơn giản, rõ ràng)
const SVG_EP = `
<svg viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;max-width:220px;display:block;margin:0 auto;">
  <defs>
    <marker id="ep-ax" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#333"/>
    </marker>
    <marker id="ep-ay" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
      <path d="M3,0 L6,6 L0,6 z" fill="#333"/>
    </marker>
  </defs>

  <!-- Axes -->
  <line x1="40" y1="140" x2="210" y2="140" stroke="#333" stroke-width="1.5" marker-end="url(#ep-ax)"/>
  <line x1="40" y1="140" x2="40"  y2="15"  stroke="#333" stroke-width="1.5" marker-end="url(#ep-ay)"/>
  <text x="212" y="144" font-size="10" fill="#333">p</text>
  <text x="30"  y="13"  font-size="10" fill="#333">e</text>

  <!-- Đường cong e-p -->
  <path d="M55,35 C80,38 110,60 145,85 C175,105 195,120 205,132"
        fill="none" stroke="#1565c0" stroke-width="2.2"/>

  <!-- p₀ dashed lines -->
  <line x1="90"  y1="140" x2="90"  y2="52" stroke="#1565c0" stroke-width="1" stroke-dasharray="4,2"/>
  <line x1="40"  y1="52"  x2="90"  y2="52" stroke="#1565c0" stroke-width="1" stroke-dasharray="4,2"/>
  <circle cx="90" cy="52" r="3.5" fill="#1565c0"/>
  <text x="84" y="152" font-size="9" fill="#1565c0" font-weight="bold">p₀</text>
  <text x="14" y="55"  font-size="9" fill="#1565c0" font-weight="bold">e₀</text>

  <!-- p₁ dashed lines -->
  <line x1="170" y1="140" x2="170" y2="108" stroke="#c62828" stroke-width="1" stroke-dasharray="4,2"/>
  <line x1="40"  y1="108" x2="170" y2="108" stroke="#c62828" stroke-width="1" stroke-dasharray="4,2"/>
  <circle cx="170" cy="108" r="3.5" fill="#c62828"/>
  <text x="162" y="152" font-size="9" fill="#c62828" font-weight="bold">p₁</text>
  <text x="14"  y="111" font-size="9" fill="#c62828" font-weight="bold">e₁</text>

  <!-- Δe arrow -->
  <line x1="28" y1="52"  x2="28" y2="108" stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="24" y1="52"  x2="32" y2="52"  stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="24" y1="108" x2="32" y2="108" stroke="#2e7d32" stroke-width="1.5"/>
  <text x="4"   y="84"  font-size="8" fill="#2e7d32" font-weight="bold">Δe</text>

  <!-- p₁ = p₀ + Δσ label -->
  <text x="110" y="158" font-size="7.5" fill="#555" text-anchor="middle">p₁ = p₀ + Δσ_gl</text>
</svg>`;

// Bảng tra ω dùng chung
const TABLE_OMEGA = `
<div style="margin-top:10px;">
  <div style="font-size:.78rem;font-weight:700;color:#1565c0;margin-bottom:5px;">
    Bảng hệ số hình dạng ω (móng cứng):
  </div>
  <table style="border-collapse:collapse;font-size:.8rem;width:100%;">
    <thead><tr style="background:#1565c0;color:#fff;">
      <th style="padding:4px 8px;">l/b</th>
      <th style="padding:4px 10px;text-align:center;">1</th>
      <th style="padding:4px 10px;text-align:center;">1.5</th>
      <th style="padding:4px 10px;text-align:center;">2</th>
      <th style="padding:4px 10px;text-align:center;">3</th>
      <th style="padding:4px 10px;text-align:center;">5</th>
      <th style="padding:4px 10px;text-align:center;">≥10</th>
    </tr></thead>
    <tbody><tr style="background:#f7faff;">
      <td style="padding:4px 8px;font-weight:700;">ω</td>
      <td style="padding:4px 10px;text-align:center;">0.88</td>
      <td style="padding:4px 10px;text-align:center;">1.08</td>
      <td style="padding:4px 10px;text-align:center;">1.22</td>
      <td style="padding:4px 10px;text-align:center;">1.44</td>
      <td style="padding:4px 10px;text-align:center;">1.68</td>
      <td style="padding:4px 10px;text-align:center;">2.12</td>
    </tr></tbody>
  </table>
</div>`;

// Theory đàn hồi dùng chung
const THEORY_ELASTIC = `
<div class="theory-block">
  <div class="theory-label">📖 Lún lý thuyết đàn hồi – Móng cứng</div>
  <div style="display:grid;grid-template-columns:1fr 220px;gap:16px;align-items:start;">
    <div>
      <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;
                  padding:10px 16px;margin-bottom:12px;display:inline-block;">
        <span style="font-family:'JetBrains Mono',monospace;font-size:1rem;
                     font-weight:700;color:#1565c0;">
          S = (1−μ₀²) · p_gl · b · ω / E₀
        </span>
      </div>
      <div style="font-size:.84rem;line-height:1.8;color:#444;">
        • <b>p_gl = p_tx − γ·h_m</b> : áp lực gây lún (kPa)<br>
        • <b>b</b> : bề rộng cạnh ngắn móng (m)<br>
        • <b>ω</b> : hệ số hình dạng (tra bảng theo l/b)<br>
        • <b>E₀</b> : mô đun biến dạng (kPa)<br>
        • <b>μ₀</b> : hệ số Poisson (thường 0.25÷0.35)<br>
        • <b>S</b> : tính bằng m → ×100 = cm
      </div>
      ${TABLE_OMEGA}
    </div>
    ${SVG_ELASTIC_FULL}
  </div>
</div>`;


// ══════════════════════════════════════════════════════════════
//  PHẦN 1: LÚN LÝ THUYẾT ĐÀN HỒI
// ══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// Bài 5.1a – Bài toán THUẬN: Tính S (cho đủ tham số)
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b1a'] = {
  chapterId: 'ch5',
  title: '5.1a – Tính độ lún đàn hồi S (bài toán thuận)',
  type: 'guided',
  theoryHTML: THEORY_ELASTIC,
  hint: `
    <div class="hint-title">💡 Các bước tính</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Bước 1:</b> p_gl = p_tx − γ·h_m<br>
      <b>Bước 2:</b> Tra bảng ω theo l/b<br>
      <b>Bước 3:</b> S = (1−μ₀²)·p_gl·b·ω / E₀ &nbsp;(đơn vị m)<br>
      <b>Bước 4:</b> Đổi S(m) × 100 = S(cm)
    </div>`,

  genData(rng) {
    const ratios  = [1, 1.5, 2, 3, 5];
    const omegas  = [0.88, 1.08, 1.22, 1.44, 1.68];
    const idx     = Math.floor(rng() * ratios.length);
    const lb      = ratios[idx];
    const omega   = omegas[idx];
    const b       = r2(1.0 + rng() * 1.5);
    const l       = r2(b * lb);
    const E0      = Math.round((6000 + rng() * 10000) / 500) * 500;
    const mu0     = r2(0.25 + rng() * 0.10);
    const ptx     = Math.round(150 + rng() * 150);
    const gamma   = r2(17.5 + rng() * 1.5);
    const hm      = r2(1.0 + rng() * 1.5);
    const pgl     = r2(ptx - gamma * hm);
    const coeff   = r3(1 - mu0 * mu0);
    const S_m     = parseFloat(((coeff * pgl * b * omega) / E0).toFixed(5));
    const S_cm    = r2(S_m * 100);
    return { b, l, lb, omega, E0, mu0, ptx, gamma, hm, pgl, coeff, S_m, S_cm };
  },

  statement(d) {
    return `Móng chữ nhật kích thước <strong>b = ${d.b} m, l = ${d.l} m</strong>
      đặt sâu <strong>h_m = ${d.hm} m</strong>.
      Áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>.
      Nền đất: γ = <strong>${d.gamma} kN/m³</strong>,
      E₀ = <strong>${d.E0} kPa</strong>, μ₀ = <strong>${d.mu0}</strong>.<br><br>
      Tra bảng với l/b = ${d.lb} → ω = <strong>${d.omega}</strong>.
      Tính độ lún đàn hồi S.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Áp lực gây lún p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'(1 − μ₀²) =', unit:'–',
      answer: d => d.coeff, tol: 0.01 },
    { id:'q3', type:'fill', label:'Độ lún S =', unit:'cm',
      answer: d => d.S_cm, tol: 0.3 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.1b – Bài toán NGHỊCH: Tính E₀ từ S đo được
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b1b'] = {
  chapterId: 'ch5',
  title: '5.1b – Tính ngược E₀ từ độ lún thực đo',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đảo công thức</div>
    <div class="hint-formula">E₀ = (1−μ₀²) · p_gl · b · ω / S</div>
    <div style="margin-top:6px;font-size:.84rem;">
      ⚠️ Đổi S về <b>mét</b> trước khi tính:<br>
      S(cm) ÷ 100 = S(m)
    </div>
    ${TABLE_OMEGA}`,

  genData(rng) {
    const ratios = [1, 1.5, 2, 3]; const omegas = [0.88, 1.08, 1.22, 1.44];
    const idx  = Math.floor(rng() * ratios.length);
    const lb   = ratios[idx]; const omega = omegas[idx];
    const b    = r2(1.0 + rng() * 2.0);
    const E0   = Math.round((5000 + rng() * 12000) / 500) * 500;
    const mu0  = r2(0.25 + rng() * 0.10);
    const ptx  = Math.round(150 + rng() * 150);
    const gamma= r2(17.5 + rng() * 1.5);
    const hm   = r2(1.0 + rng() * 1.5);
    const pgl  = r2(ptx - gamma * hm);
    const coeff= r3(1 - mu0 * mu0);
    const S_cm = r2(coeff * pgl * b * omega / E0 * 100);
    const E0_calc = Math.round(coeff * pgl * b * omega / (S_cm / 100));
    return { b, lb, omega, mu0, ptx, gamma, hm, pgl, coeff, S_cm, E0_calc };
  },

  statement(d) {
    return `Móng chữ nhật <strong>b = ${d.b} m</strong>, l/b = ${d.lb},
      chôn sâu <strong>h_m = ${d.hm} m</strong>.
      Áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>,
      γ = ${d.gamma} kN/m³, μ₀ = ${d.mu0}, ω = ${d.omega}.<br>
      Độ lún đo thực tế <strong>S = ${d.S_cm} cm</strong>.
      Xác định mô đun biến dạng E₀.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'E₀ =', unit:'kPa',
      answer: d => d.E0_calc, tol: 500 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.1c – Bài toán NGHỊCH: Tính p_gl từ S cho phép
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b1c'] = {
  chapterId: 'ch5',
  title: '5.1c – Tính áp lực cho phép từ độ lún giới hạn [S]',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đảo công thức tính p_gl</div>
    <div class="hint-formula">p_gl = S · E₀ / [(1−μ₀²) · b · ω]</div>
    <div style="margin-top:6px;font-size:.84rem;">
      Sau khi tính p_gl → tính p_tx cho phép:<br>
      <b>p_tx = p_gl + γ·h_m</b>
    </div>
    ${TABLE_OMEGA}`,

  genData(rng) {
    const ratios = [1, 1.5, 2, 3]; const omegas = [0.88, 1.08, 1.22, 1.44];
    const idx   = Math.floor(rng() * ratios.length);
    const lb    = ratios[idx]; const omega = omegas[idx];
    const b     = r2(1.0 + rng() * 2.0);
    const E0    = Math.round((6000 + rng() * 10000) / 500) * 500;
    const mu0   = r2(0.25 + rng() * 0.10);
    const gamma = r2(17.5 + rng() * 1.5);
    const hm    = r2(1.0 + rng() * 1.5);
    const S_gh  = [6, 8, 10][Math.floor(rng() * 3)]; // cm
    const coeff = r3(1 - mu0 * mu0);
    const pgl   = r2(S_gh / 100 * E0 / (coeff * b * omega));
    const ptx   = r2(pgl + gamma * hm);
    return { b, lb, omega, E0, mu0, gamma, hm, S_gh, coeff, pgl, ptx };
  },

  statement(d) {
    return `Móng chữ nhật <strong>b = ${d.b} m</strong>, l/b = ${d.lb} → ω = ${d.omega}.
      Chôn sâu <strong>h_m = ${d.hm} m</strong>.
      Nền đất: E₀ = <strong>${d.E0} kPa</strong>, μ₀ = ${d.mu0}, γ = ${d.gamma} kN/m³.<br>
      Độ lún giới hạn cho phép <strong>[S] = ${d.S_gh} cm</strong>.
      Tính áp lực gây lún p_gl tối đa và áp lực tiếp xúc p_tx tương ứng.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Áp lực gây lún tối đa p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 2 },
    { id:'q2', type:'fill', label:'Áp lực tiếp xúc p_tx cho phép =', unit:'kPa',
      answer: d => d.ptx, tol: 2 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.1d – Bài toán NGHỊCH: Tính b tối thiểu từ [S]
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b1d'] = {
  chapterId: 'ch5',
  title: '5.1d – Xác định kích thước móng từ độ lún cho phép',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đảo công thức tính b</div>
    <div class="hint-formula">b = S · E₀ / [(1−μ₀²) · p_gl · ω]</div>
    <div style="margin-top:6px;font-size:.84rem;">
      p_gl = p_tx − γ·h_m<br>
      ω tra bảng theo l/b đã biết trước (cho l/b = const)
    </div>
    ${TABLE_OMEGA}`,

  genData(rng) {
    const ratios = [1, 1.5, 2]; const omegas = [0.88, 1.08, 1.22];
    const idx   = Math.floor(rng() * ratios.length);
    const lb    = ratios[idx]; const omega = omegas[idx];
    const E0    = Math.round((6000 + rng() * 10000) / 500) * 500;
    const mu0   = r2(0.25 + rng() * 0.10);
    const ptx   = Math.round(160 + rng() * 120);
    const gamma = r2(17.5 + rng() * 1.5);
    const hm    = r2(1.0 + rng() * 1.5);
    const S_gh  = [6, 8, 10][Math.floor(rng() * 3)];
    const coeff = r3(1 - mu0 * mu0);
    const pgl   = r2(ptx - gamma * hm);
    const b     = r2(S_gh / 100 * E0 / (coeff * pgl * omega));
    const l     = r2(b * lb);
    return { lb, omega, E0, mu0, ptx, gamma, hm, S_gh, coeff, pgl, b, l };
  },

  statement(d) {
    return `Móng chữ nhật có tỉ lệ <strong>l/b = ${d.lb}</strong> (→ ω = ${d.omega}),
      chôn sâu <strong>h_m = ${d.hm} m</strong>.
      Áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>,
      γ = ${d.gamma} kN/m³, E₀ = ${d.E0} kPa, μ₀ = ${d.mu0}.<br>
      Độ lún cho phép <strong>[S] = ${d.S_gh} cm</strong>.
      Xác định kích thước tối thiểu b, l của móng.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'Bề rộng tối thiểu b =', unit:'m',
      answer: d => d.b, tol: 0.1 },
    { id:'q3', type:'fill', label:'Chiều dài tối thiểu l =', unit:'m',
      answer: d => d.l, tol: 0.15 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.1e – Bài 2 BƯỚC: Tính p_gl rồi tính S, kiểm tra [S]
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b1e'] = {
  chapterId: 'ch5',
  title: '5.1e – Tính S và kiểm tra điều kiện lún cho phép',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Quy trình 3 bước</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>1.</b> p_gl = p_tx − γ·h_m<br>
      <b>2.</b> S = (1−μ₀²)·p_gl·b·ω / E₀ → đổi ra cm<br>
      <b>3.</b> So sánh S với [S] → kết luận
    </div>
    ${TABLE_OMEGA}`,

  genData(rng) {
    const ratios = [1, 1.5, 2, 3]; const omegas = [0.88, 1.08, 1.22, 1.44];
    const idx   = Math.floor(rng() * ratios.length);
    const lb    = ratios[idx]; const omega = omegas[idx];
    const b     = r2(1.2 + rng() * 1.5);
    const E0    = Math.round((5000 + rng() * 10000) / 500) * 500;
    const mu0   = r2(0.25 + rng() * 0.10);
    const ptx   = Math.round(150 + rng() * 150);
    const gamma = r2(17.5 + rng() * 1.5);
    const hm    = r2(1.0 + rng() * 1.5);
    const S_gh  = 8; // [S] = 8cm tiêu chuẩn
    const coeff = r3(1 - mu0 * mu0);
    const pgl   = r2(ptx - gamma * hm);
    const S_cm  = r2(coeff * pgl * b * omega / E0 * 100);
    const ok    = S_cm <= S_gh;
    return { b, lb, omega, E0, mu0, ptx, gamma, hm, S_gh, coeff, pgl, S_cm, ok };
  },

  statement(d) {
    return `Móng đơn <strong>b = ${d.b} m</strong>, l/b = ${d.lb} → ω = ${d.omega}.
      Chiều sâu chôn móng <strong>h_m = ${d.hm} m</strong>.
      Áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>.
      Nền đất: γ = ${d.gamma} kN/m³, E₀ = ${d.E0} kPa, μ₀ = ${d.mu0}.<br>
      Độ lún cho phép <strong>[S] = ${d.S_gh} cm</strong>.
      Tính S và kiểm tra điều kiện lún.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'Độ lún S =', unit:'cm',
      answer: d => d.S_cm, tol: 0.3 },
    { id:'q3', type:'mcq',
      label:'Kết luận về độ lún (so sánh S vừa tính với [S]):',
      choices: d => [
        `A. Đạt yêu cầu – S ≤ [S] = ${d.S_gh} cm ✓`,
        `B. Không đạt – S > [S] = ${d.S_gh} cm ✗`,
      ],
      correctIndex: d => d.ok ? 0 : 1
    },
  ]
};


// ══════════════════════════════════════════════════════════════
//  PHẦN 2: PHƯƠNG PHÁP CỘNG LÚN TỪNG LỚP
// ══════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────
// Bài 5.2a – Lún 1 phân tố: cho e₀, e₁ → tính S_i
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2a'] = {
  chapterId: 'ch5',
  title: '5.2a – Tính lún 1 phân tố từ e₀ và e₁ (tra biểu đồ e-p)',
  type: 'guided',

  theoryHTML: `
    <div class="theory-block">
      <div class="theory-label">📖 Lún 1 phân tố đất – Biểu đồ e-p</div>
      <div style="display:grid;grid-template-columns:1fr 160px;gap:16px;align-items:start;">
        <div>
          <p style="font-size:.87rem;line-height:1.75;margin-bottom:10px;">
            Khi ứng suất tăng từ p₀ lên p₁ = p₀ + Δσ, hệ số rỗng giảm
            từ e₀ → e₁ (tra biểu đồ e-p). Độ lún phân tố:
          </p>
          <div style="background:#fff;border:2px solid #2e7d32;border-radius:8px;
                      padding:9px 14px;margin-bottom:10px;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:.95rem;
                        font-weight:700;color:#2e7d32;">
              S_i = (e₀ − e₁) / (1 + e₀) × h_i
            </div>
          </div>
          <div style="font-size:.83rem;line-height:1.75;color:#444;">
            • <b>p₀ = σ_bt</b> : ứng suất bản thân tại giữa lớp (kPa)<br>
            • <b>p₁ = p₀ + Δσ_gl</b> : ứng suất sau khi có tải<br>
            • <b>e₀, e₁</b> : hệ số rỗng tra từ biểu đồ e-p<br>
            • <b>h_i</b> : chiều dày phân tố (m)
          </div>
        </div>
        ${SVG_EP}
      </div>
    </div>`,

  hint: `
    <div class="hint-title">💡 Công thức</div>
    <div class="hint-formula">S_i = (e₀ − e₁) / (1 + e₀) × h_i</div>
    <div style="margin-top:6px;font-size:.84rem;">
      Kết quả S_i (m) × 100 = S_i (cm)
    </div>`,

  genData(rng) {
    const h   = r2(0.3 + rng() * 0.5);
    const e0  = r3(0.700 + rng() * 0.350);
    const de  = r3(0.020 + rng() * 0.060);
    const e1  = r3(e0 - de);
    const Si  = r2(de / (1 + e0) * h * 100);
    // Tính ngược Δσ (giả sử av cho sẵn)
    const av  = parseFloat((0.0003 + rng() * 0.0004).toFixed(5));
    const ds  = r2(de / av);
    return { h, e0, e1, de, Si, av, ds };
  },

  statement(d) {
    return `Một phân tố đất dày <strong>h = ${d.h} m</strong>.
      Tra biểu đồ e-p cho kết quả:
      hệ số rỗng ban đầu <strong>e₀ = ${d.e0}</strong>,
      hệ số rỗng sau khi chịu tải <strong>e₁ = ${d.e1}</strong>.<br>
      Tính độ lún phân tố S_i.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Hiệu số hệ số rỗng Δe = e₀ − e₁ =', unit:'–',
      answer: d => d.de, tol: 0.003 },
    { id:'q2', type:'fill', label:'Độ lún phân tố S_i =', unit:'cm',
      answer: d => d.Si, tol: 0.1 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2b – Lún 1 phân tố: tính qua a_v và m_v
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2b'] = {
  chapterId: 'ch5',
  title: '5.2b – Tính lún 1 phân tố qua a_v và m_v',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 3 cách tính lún phân tố</div>
    <div style="font-size:.84rem;line-height:1.85;">
      <div class="hint-formula">S_i = (Δe)/(1+e₀) × h</div>
      <div class="hint-formula" style="margin-top:6px;">S_i = a_v/(1+e₀) × Δσ × h = m_v × Δσ × h</div>
      <div style="margin-top:6px;">m_v = a_v / (1 + e₀) &nbsp;(hệ số nén thể tích)</div>
    </div>`,

  genData(rng) {
    const h   = r2(0.3 + rng() * 0.5);
    const e0  = r3(0.700 + rng() * 0.350);
    const av  = parseFloat((0.0003 + rng() * 0.0005).toFixed(5));
    const mv  = parseFloat((av / (1 + e0)).toFixed(6));
    const ds  = r2(40 + rng() * 80);
    const de  = r3(av * ds);
    const e1  = r3(e0 - de);
    const Si_e = r2(de / (1 + e0) * h * 100);
    const Si_m = r2(mv * ds * h * 100);
    const av_back = parseFloat((Si_e / 100 * (1 + e0) / (ds * h)).toFixed(5));
    return { h, e0, e1, de, av, mv, ds, Si_e, Si_m, av_back };
  },

  statement(d) {
    return `Phân tố đất dày <strong>h = ${d.h} m</strong>,
      hệ số rỗng ban đầu <strong>e₀ = ${d.e0}</strong>,
      hệ số nén lún <strong>a_v = ${d.av} m²/kN</strong>.<br>
      Ứng suất tăng thêm tại giữa phân tố <strong>Δσ = ${d.ds} kPa</strong>.<br><br>
      <strong>(a)</strong> Tính m_v và độ lún S_i qua m_v.<br>
      <strong>(b)</strong> Kiểm tra lại bằng cách tính e₁ rồi dùng công thức Δe/(1+e₀)·h.`;
  },

  questions: [
    { id:'qa', type:'fill', label:'(a) m_v = a_v/(1+e₀) =', unit:'m²/kN',
      answer: d => d.mv, tol: 0.00002 },
    { id:'qb', type:'fill', label:'(a) S_i theo m_v =', unit:'cm',
      answer: d => d.Si_m, tol: 0.15 },
    { id:'qc', type:'fill', label:'(b) e₁ = e₀ − a_v·Δσ =', unit:'–',
      answer: d => d.e1, tol: 0.003 },
    { id:'qd', type:'fill', label:'(b) S_i kiểm tra =', unit:'cm',
      answer: d => d.Si_e, tol: 0.15 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2c – Bài NGHỊCH: Cho S_i tìm Δσ hoặc h
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2c'] = {
  chapterId: 'ch5',
  title: '5.2c – Bài toán nghịch: Tìm Δσ hoặc chiều dày h từ S_i',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đảo công thức</div>
    <div class="hint-formula">Δσ = S_i / (m_v × h)</div>
    <div class="hint-formula" style="margin-top:5px;">h = S_i / (m_v × Δσ)</div>
    <div style="margin-top:6px;font-size:.83rem;">
      ⚠️ S_i phải đổi về <b>mét</b> trước khi tính
    </div>`,

  genData(rng) {
    const e0  = r3(0.700 + rng() * 0.350);
    const av  = parseFloat((0.0003 + rng() * 0.0005).toFixed(5));
    const mv  = parseFloat((av / (1 + e0)).toFixed(6));
    // Câu a: cho h, Si → tìm Δσ
    const h_a = r2(0.4 + rng() * 0.4);
    const Si_a = r2(0.5 + rng() * 2.0); // cm
    const ds_a = r2(Si_a / 100 / (mv * h_a));
    // Câu b: cho Δσ, Si → tìm h
    const ds_b = r2(40 + rng() * 60);
    const Si_b = r2(0.4 + rng() * 1.5);
    const h_b  = r2(Si_b / 100 / (mv * ds_b));
    return { e0, av, mv, h_a, Si_a, ds_a, ds_b, Si_b, h_b };
  },

  statement(d) {
    return `Phân tố đất có e₀ = ${d.e0},
      a_v = ${d.av} m²/kN → m_v = ${d.mv} m²/kN.<br><br>
      <strong>(a)</strong> Chiều dày phân tố <strong>h = ${d.h_a} m</strong>,
      độ lún đo được <strong>S_i = ${d.Si_a} cm</strong>.
      Tính ứng suất tăng thêm Δσ.<br><br>
      <strong>(b)</strong> Ứng suất tăng thêm <strong>Δσ = ${d.ds_b} kPa</strong>,
      độ lún cần đạt <strong>S_i = ${d.Si_b} cm</strong>.
      Chiều dày phân tố cần thiết h = ?`;
  },

  questions: [
    { id:'qa', type:'fill', label:'(a) Δσ =', unit:'kPa',
      answer: d => d.ds_a, tol: 2 },
    { id:'qb', type:'fill', label:'(b) Chiều dày phân tố h =', unit:'m',
      answer: d => d.h_b, tol: 0.05 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2d – Tính ứng suất bản thân σ_bt theo độ sâu
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2d'] = {
  chapterId: 'ch5',
  title: '5.2d – Tính ứng suất bản thân σ_bt theo độ sâu (có MNN)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Ứng suất bản thân</div>
    <div style="font-size:.84rem;line-height:1.85;">
      Trên MNN: σ_bt = γ·z<br>
      Dưới MNN: σ_bt = γ·z_MNN + γ'·(z − z_MNN)<br>
      <b>γ' = γ_bh − 10</b> (kN/m³) dung trọng đẩy nổi
    </div>`,

  genData(rng) {
    const g1    = r2(17.5 + rng() * 1.5);
    const g2bh  = r2(19.0 + rng() * 1.0);
    const g2p   = r2(g2bh - 10);
    const zMNN  = r2(1.5 + rng() * 2.0);
    const h2    = r2(2.0 + rng() * 2.0);
    const h3    = r2(2.0 + rng() * 2.0);
    // 4 điểm tính
    const z1 = r2(zMNN / 2);
    const sv1= r2(g1 * z1);
    const z2 = zMNN;
    const sv2= r2(g1 * z2);
    const z3 = r2(zMNN + h2 / 2);
    const sv3= r2(g1 * zMNN + g2p * (z3 - zMNN));
    const z4 = r2(zMNN + h2 + h3 / 2);
    const sv4= r2(g1 * zMNN + g2p * (z4 - zMNN));
    return { g1, g2bh, g2p, zMNN, h2, h3, z1, sv1, z2, sv2, z3, sv3, z4, sv4 };
  },

  statement(d) {
    return `Địa tầng gồm: Lớp trên cùng γ = <strong>${d.g1} kN/m³</strong>.
      Mực nước ngầm tại độ sâu <strong>z_MNN = ${d.zMNN} m</strong>.
      Bên dưới MNN: γ_bh = <strong>${d.g2bh} kN/m³</strong>.<br><br>
      Tính ứng suất bản thân tại các độ sâu sau:<br>
      (a) z = <strong>${d.z1} m</strong> &nbsp;
      (b) z = <strong>${d.z2} m</strong> (tại MNN) &nbsp;
      (c) z = <strong>${d.z3} m</strong> &nbsp;
      (d) z = <strong>${d.z4} m</strong>`;
  },

  questions: [
    { id:'q0', type:'fill', label:"γ' (dung trọng đẩy nổi) =", unit:'kN/m³',
      answer: d => d.g2p, tol: 0.1 },
    { id:'qa', type:'fill', label:'(a) σ_bt tại giữa lớp 1 =', unit:'kPa',
      answer: d => d.sv1, tol: 0.5 },
    { id:'qb', type:'fill', label:'(b) σ_bt tại MNN =', unit:'kPa',
      answer: d => d.sv2, tol: 0.5 },
    { id:'qc', type:'fill', label:'(c) σ_bt =', unit:'kPa',
      answer: d => d.sv3, tol: 1 },
    { id:'qd', type:'fill', label:'(d) σ_bt =', unit:'kPa',
      answer: d => d.sv4, tol: 1 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2e – Tính ứng suất gây lún Δσ và lún 1 phân tố hoàn chỉnh
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2e'] = {
  chapterId: 'ch5',
  title: '5.2e – Tính Δσ_gl và lún 1 phân tố (kết hợp σ_bt + Δσ)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Quy trình 1 phân tố</div>
    <div style="font-size:.84rem;line-height:1.85;">
      1. p_gl = p_tx − γ·h_m<br>
      2. σ_bt tại giữa phân tố<br>
      3. Δσ_gl = k₀ · p_gl (k₀ tra bảng theo z/b và l/b)<br>
      4. p₀ = σ_bt &nbsp;|&nbsp; p₁ = σ_bt + Δσ_gl<br>
      5. e₀, e₁ tra biểu đồ e-p<br>
      6. S_i = (e₀−e₁)/(1+e₀)·h_i
    </div>`,

  genData(rng) {
    const b    = r2(1.5 + rng() * 1.5);
    const hm   = r2(1.0 + rng() * 1.0);
    const ptx  = Math.round(160 + rng() * 120);
    const g1   = r2(17.5 + rng() * 1.5);
    const pgl  = r2(ptx - g1 * hm);
    const h    = 0.5; // phân tố dày 0.5m
    // Giữa phân tố 1: z = hm + h/2
    const z1   = r2(hm + h / 2);
    const sv1  = r2(g1 * z1);
    const k0   = r3(0.85 + rng() * 0.10);
    const ds1  = r2(k0 * pgl);
    const p0   = sv1;
    const p1   = r2(sv1 + ds1);
    // Cho e-p tuyến tính: e = e_ref - av*(p - p_ref)
    const e_ref= r3(0.850 + rng() * 0.150);
    const av   = parseFloat((0.0003 + rng() * 0.0004).toFixed(5));
    const e0   = r3(e_ref);
    const e1   = r3(e0 - av * ds1);
    const Si   = r2((e0 - e1) / (1 + e0) * h * 100);
    return { b, hm, ptx, g1, pgl, h, z1, sv1, k0, ds1, p0, p1, e0, e1, Si };
  },

  statement(d) {
    return `Móng đơn <strong>b = ${d.b} m</strong>, đặt sâu <strong>h_m = ${d.hm} m</strong>.
      Áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>, γ = ${d.g1} kN/m³.<br>
      Xét phân tố đất dày <strong>h = ${d.h} m</strong> ngay dưới đáy móng.
      Hệ số phân bố ứng suất <strong>k₀ = ${d.k0}</strong>.<br>
      Từ biểu đồ e-p: tại p₀ → e₀ = <strong>${d.e0}</strong>;
      tại p₁ → e₁ = <strong>${d.e1}</strong>.<br>
      Tính ứng suất gây lún và độ lún phân tố.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'σ_bt tại giữa phân tố =', unit:'kPa',
      answer: d => d.sv1, tol: 0.5 },
    { id:'q3', type:'fill', label:'Δσ_gl = k₀·p_gl =', unit:'kPa',
      answer: d => d.ds1, tol: 0.5 },
    { id:'q4', type:'fill', label:'p₁ = σ_bt + Δσ =', unit:'kPa',
      answer: d => d.p1, tol: 1 },
    { id:'q5', type:'fill', label:'Độ lún phân tố S_i =', unit:'cm',
      answer: d => d.Si, tol: 0.1 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2f – Điều kiện tắt lún
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2f'] = {
  chapterId: 'ch5',
  title: '5.2f – Xác định chiều sâu tắt lún',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Điều kiện tắt lún</div>
    <div class="hint-formula">Δσ_gl ≤ 0,2 · σ_bt</div>
    <div style="margin-top:6px;font-size:.84rem;">
      Dừng tính lún tại phân tố thỏa điều kiện này.<br>
      Các phân tố sâu hơn: <b>bỏ qua</b>, không tính vào S.
    </div>`,

  genData(rng) {
    const g    = r2(17.5 + rng() * 1.5);
    const hm   = r2(1.0 + rng() * 1.0);
    const ptx  = Math.round(160 + rng() * 120);
    const pgl  = r2(ptx - g * hm);
    const h    = 0.5;
    // 4 phân tố
    const ks   = [r3(0.90+rng()*.07), r3(0.65+rng()*.10), r3(0.35+rng()*.10), r3(0.15+rng()*.08)];
    const svs  = [], dss = [], ratios = [];
    let stopIdx = -1;
    for (let i = 0; i < 4; i++) {
      const z  = hm + h * (i + 0.5);
      const sv = r2(g * z);
      const ds = r2(ks[i] * pgl);
      svs.push(sv); dss.push(ds);
      ratios.push(r3(ds / sv));
      if (ds <= 0.2 * sv && stopIdx < 0) stopIdx = i;
    }
    return { g, hm, ptx, pgl, h, ks, svs, dss, ratios, stopIdx };
  },

  statement(d) {
    const rows = d.ks.map((k, i) =>
      `<tr style="${i%2?'background:#f7faff;':''}">
        <td style="padding:5px 10px;text-align:center;">${i+1}</td>
        <td style="padding:5px 10px;text-align:center;font-family:monospace;">${d.svs[i]}</td>
        <td style="padding:5px 10px;text-align:center;font-family:monospace;">${d.ks[i]}</td>
        <td style="padding:5px 10px;text-align:center;font-family:monospace;">${d.dss[i]}</td>
        <td style="padding:5px 10px;text-align:center;font-family:monospace;">${r2(0.2*d.svs[i])}</td>
      </tr>`
    ).join('');
    return `Móng đơn <strong>b = ? m</strong>, h_m = ${d.hm} m,
      p_gl = <strong>${d.pgl} kPa</strong>, γ = ${d.g} kN/m³.
      Chia phân tố dày <strong>h = ${d.h} m</strong>.<br><br>
      <table style="border-collapse:collapse;font-size:.85rem;width:100%;border:1px solid #dce3ed;border-radius:7px;overflow:hidden;">
        <thead><tr style="background:#1565c0;color:#fff;">
          <th style="padding:6px 10px;">Phân tố</th>
          <th style="padding:6px 10px;">σ_bt (kPa)</th>
          <th style="padding:6px 10px;">k₀</th>
          <th style="padding:6px 10px;">Δσ (kPa)</th>
          <th style="padding:6px 10px;">0,2·σ_bt</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table><br>
      Xác định phân tố đầu tiên thỏa điều kiện tắt lún (Δσ ≤ 0,2·σ_bt).`;
  },

  questions: [
    { id:'q1', type:'mcq',
      label:'Phân tố đầu tiên thỏa điều kiện tắt lún:',
      choices: d => ['A. Phân tố 1','B. Phân tố 2','C. Phân tố 3','D. Phân tố 4'],
      correctIndex: d => Math.min(d.stopIdx >= 0 ? d.stopIdx : 3, 3)
    },
    { id:'q2', type:'fill',
      label:'Tỉ số Δσ/σ_bt tại phân tố 1 =', unit:'–',
      answer: d => d.ratios[0], tol: 0.02
    },
    { id:'q3', type:'fill',
      label:'Tỉ số Δσ/σ_bt tại phân tố 2 =', unit:'–',
      answer: d => d.ratios[1], tol: 0.02
    },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.2z – TỔNG HỢP: Cộng lún toàn nền (3-4 phân tố)
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b2z'] = {
  chapterId: 'ch5',
  title: '5.2z – Tổng hợp: Tính lún nền theo phương pháp cộng lún',
  type: 'apply',

  theoryHTML: `
    <div class="theory-block">
      <div class="theory-label">📖 Phương pháp cộng lún – Trình tự</div>
      <div style="display:grid;grid-template-columns:1fr 220px;gap:16px;align-items:start;">
        <div style="font-size:.86rem;line-height:1.9;">
          <b>1.</b> p_gl = p_tx − γ·h_m<br>
          <b>2.</b> Chia nền thành phân tố h_i<br>
          <b>3.</b> Tính σ_bt(z) = Σγ·h tại giữa mỗi phân tố<br>
          <b>4.</b> Tính Δσ_gl = k₀·p_gl (k₀ cho sẵn)<br>
          <b>5.</b> Kiểm tra: Δσ ≤ 0,2·σ_bt → <b>dừng</b><br>
          <b>6.</b> Tra e-p: e₀ tại p₀=σ_bt; e₁ tại p₁=σ_bt+Δσ<br>
          <b>7.</b> S_i = (e₀ᵢ−e₁ᵢ)/(1+e₀ᵢ)·h_i<br>
          <b>8.</b> S = ΣS_i ≤ [S] = 8 cm
        </div>
        ${SVG_STRESS}
      </div>
    </div>`,

  hint: `
    <div class="hint-title">💡 Nhắc công thức</div>
    <div style="font-size:.83rem;line-height:1.75;">
      S_i = (e₀-e₁)/(1+e₀)·h_i &nbsp;hoặc&nbsp; S_i = m_v·Δσ·h_i<br>
      Δσ ≤ 0,2·σ_bt → tắt lún, dừng tính<br>
      S(cm) ≤ [S] = 8cm
    </div>`,

  genData(rng) {
    const g    = r2(17.5 + rng() * 1.5);
    const hm   = r2(1.0 + rng() * 1.0);
    const ptx  = Math.round(160 + rng() * 130);
    const pgl  = r2(ptx - g * hm);
    const h    = 0.5;
    const ks   = [r3(0.92+rng()*.06), r3(0.65+rng()*.10), r3(0.30+rng()*.12)];
    const e0s  = [r3(0.85+rng()*.15), r3(0.80+rng()*.15), r3(0.75+rng()*.10)];
    const avs  = [
      parseFloat((0.0004+rng()*.0003).toFixed(5)),
      parseFloat((0.0003+rng()*.0003).toFixed(5)),
      parseFloat((0.0002+rng()*.0002).toFixed(5)),
    ];
    const svs=[], dss=[], e1s=[], Sis=[];
    let Stot=0, stopIdx=-1;
    for (let i=0; i<3; i++) {
      const z  = r2(hm + h*(i+0.5));
      const sv = r2(g * z);
      const ds = r2(ks[i] * pgl);
      const de = r3(avs[i] * ds);
      const e1 = r3(e0s[i] - de);
      const Si = r2(de/(1+e0s[i])*h*100);
      svs.push(sv); dss.push(ds); e1s.push(e1); Sis.push(Si);
      if (ds <= 0.2*sv && stopIdx<0) stopIdx=i;
      if (stopIdx<0 || i<=stopIdx) Stot = r2(Stot+Si);
    }
    return { g, hm, ptx, pgl, h, ks, e0s, avs, svs, dss, e1s, Sis, Stot, stopIdx,
             sv1:svs[0], ds1:dss[0], e11:e1s[0], S1:Sis[0],
             sv2:svs[1], ds2:dss[1], e12:e1s[1], S2:Sis[1] };
  },

  statement(d) {
    return `Móng đơn đặt sâu <strong>h_m = ${d.hm} m</strong>,
      áp lực tiếp xúc <strong>p_tx = ${d.ptx} kPa</strong>,
      γ = ${d.g} kN/m³. Chia nền thành phân tố dày <strong>h = ${d.h} m</strong>.<br><br>
      Hệ số ứng suất k₀: phân tố 1 = <strong>${d.ks[0]}</strong>,
      phân tố 2 = <strong>${d.ks[1]}</strong>,
      phân tố 3 = <strong>${d.ks[2]}</strong>.<br>
      Hệ số rỗng e₀: ${d.e0s[0]}, ${d.e0s[1]}, ${d.e0s[2]}.<br>
      Hệ số nén lún a_v: ${d.avs[0]}, ${d.avs[1]}, ${d.avs[2]} m²/kN.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'p_gl =', unit:'kPa',
      answer: d => d.pgl, tol: 0.5 },
    { id:'q2', type:'fill', label:'σ_bt phân tố 1 =', unit:'kPa',
      answer: d => d.sv1, tol: 0.5 },
    { id:'q3', type:'fill', label:'Δσ_gl phân tố 1 =', unit:'kPa',
      answer: d => d.ds1, tol: 0.5 },
    { id:'q4', type:'fill', label:'e₁ phân tố 1 =', unit:'–',
      answer: d => d.e11, tol: 0.003 },
    { id:'q5', type:'fill', label:'S₁ phân tố 1 =', unit:'cm',
      answer: d => d.S1, tol: 0.1 },
    { id:'q6', type:'fill', label:'S₂ phân tố 2 =', unit:'cm',
      answer: d => d.S2, tol: 0.1 },
    { id:'q7', type:'mcq',
      label:'Phân tố nào đầu tiên tắt lún?',
      choices: d => ['A. Phân tố 1','B. Phân tố 2','C. Phân tố 3','D. Chưa tắt lún'],
      correctIndex: d => d.stopIdx >= 0 ? d.stopIdx : 3
    },
    { id:'q8', type:'fill', label:'Tổng độ lún S =', unit:'cm',
      answer: d => d.Stot, tol: 0.2 },
  ]
};


// ══════════════════════════════════════════════════════════════
//  PHẦN 3: LÚN CỐ KẾT THEO THỜI GIAN  S(t)
// ══════════════════════════════════════════════════════════════

// SVG lún cố kết theo thời gian
const SVG_CONSOLIDATION = `
<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;max-width:360px;display:block;margin:0 auto;">
  <defs>
    <marker id="cv-ax" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#333"/>
    </marker>
    <marker id="cv-ay" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
      <path d="M3,0 L6,6 L0,6 z" fill="#333"/>
    </marker>
  </defs>
  <!-- Axes -->
  <line x1="45" y1="160" x2="340" y2="160" stroke="#333" stroke-width="1.5" marker-end="url(#cv-ax)"/>
  <line x1="45" y1="160" x2="45"  y2="20"  stroke="#333" stroke-width="1.5" marker-end="url(#cv-ay)"/>
  <text x="344" y="165" font-size="10" fill="#333">t</text>
  <text x="35"  y="18"  font-size="10" fill="#333">S</text>

  <!-- S_∞ dashed line -->
  <line x1="45" y1="42" x2="335" y2="42" stroke="#c62828" stroke-width="1.2" stroke-dasharray="6,3"/>
  <text x="338" y="46" font-size="9" fill="#c62828" font-weight="bold">S∞</text>

  <!-- Đường cong S(t) -->
  <path d="M45,160 Q90,155 130,110 Q180,65 230,48 Q270,42 335,41"
        fill="none" stroke="#1565c0" stroke-width="2.5"/>

  <!-- Điểm S(t₁) -->
  <line x1="155" y1="160" x2="155" y2="90"  stroke="#2e7d32" stroke-width="1.2" stroke-dasharray="4,2"/>
  <line x1="45"  y1="90"  x2="155" y2="90"  stroke="#2e7d32" stroke-width="1.2" stroke-dasharray="4,2"/>
  <circle cx="155" cy="90" r="4" fill="#2e7d32"/>
  <text x="158" y="165" font-size="9"  fill="#2e7d32" font-weight="bold">t₁</text>
  <text x="4"   y="94"  font-size="9"  fill="#2e7d32" font-weight="bold">S(t₁)</text>

  <!-- U arrow -->
  <line x1="320" y1="42" x2="320" y2="90" stroke="#7b1fa2" stroke-width="1.5"/>
  <line x1="315" y1="42" x2="325" y2="42" stroke="#7b1fa2" stroke-width="1.5"/>
  <line x1="315" y1="90" x2="325" y2="90" stroke="#7b1fa2" stroke-width="1.5"/>
  <text x="327" y="70" font-size="9" fill="#7b1fa2" font-weight="bold">U%</text>

  <!-- Công thức box -->
  <rect x="47" y="4" width="185" height="28" rx="4" fill="#e3f0fd" stroke="#1565c0" stroke-width="1"/>
  <text x="55" y="14" font-size="7.5" fill="#1565c0" font-weight="bold">S(t) = S∞ · U(Tv)</text>
  <text x="55" y="26" font-size="7.5" fill="#555">Tv = Cv·t/h²  |  U = 1 − (8/π²)·e^(−π²Tv/4)</text>
</svg>`;

// SVG sơ đồ lớp sét thoát nước 2 mặt
const SVG_CLAY_LAYER = `
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;max-width:300px;display:block;margin:0 auto;">
  <defs>
    <marker id="cl-dn" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
      <path d="M0,0 L5,0 L2.5,5 z" fill="#c62828"/>
    </marker>
    <marker id="cl-up" markerWidth="5" markerHeight="5" refX="2.5" refY="0" orient="auto">
      <path d="M2.5,0 L5,5 L0,5 z" fill="#1565c0"/>
    </marker>
  </defs>
  <!-- Tải trọng p phủ kín -->
  <line x1="30" y1="22" x2="270" y2="22" stroke="#c62828" stroke-width="2"/>
  <line x1="50"  y1="10" x2="50"  y2="22" stroke="#c62828" stroke-width="1.5" marker-end="url(#cl-dn)"/>
  <line x1="100" y1="10" x2="100" y2="22" stroke="#c62828" stroke-width="1.5" marker-end="url(#cl-dn)"/>
  <line x1="150" y1="10" x2="150" y2="22" stroke="#c62828" stroke-width="1.5" marker-end="url(#cl-dn)"/>
  <line x1="200" y1="10" x2="200" y2="22" stroke="#c62828" stroke-width="1.5" marker-end="url(#cl-dn)"/>
  <line x1="250" y1="10" x2="250" y2="22" stroke="#c62828" stroke-width="1.5" marker-end="url(#cl-dn)"/>
  <text x="108" y="10" font-size="10" fill="#c62828" font-weight="bold">Δσ = p (phủ kín)</text>
  <!-- Cát thoát nước trên -->
  <rect x="30" y="22" width="240" height="22" fill="#fff9c4" stroke="#f9a825" stroke-width="1"/>
  <text x="150" y="37" font-size="9" fill="#e65100" text-anchor="middle" font-weight="bold">CÁT (thoát nước)</text>
  <!-- Lớp sét -->
  <rect x="30" y="44" width="240" height="90" fill="#e8f5e9" stroke="#388e3c" stroke-width="1.5"/>
  <text x="150" y="85" font-size="10" fill="#1b5e20" text-anchor="middle" font-weight="bold">SÉT BÃO HÒA</text>
  <text x="150" y="98" font-size="9" fill="#1b5e20" text-anchor="middle">e₀, m_v, C_v</text>
  <text x="150" y="111" font-size="9" fill="#1b5e20" text-anchor="middle">Thoát nước 2 mặt: H = h/2</text>
  <!-- Mũi tên thoát nước -->
  <line x1="150" y1="44"  x2="150" y2="30"  stroke="#1565c0" stroke-width="2" marker-end="url(#cl-up)"/>
  <line x1="150" y1="134" x2="150" y2="148" stroke="#c62828" stroke-width="2" marker-end="url(#cl-dn)"/>
  <!-- Cát thoát nước dưới -->
  <rect x="30" y="134" width="240" height="22" fill="#fff9c4" stroke="#f9a825" stroke-width="1"/>
  <text x="150" y="149" font-size="9" fill="#e65100" text-anchor="middle" font-weight="bold">CÁT (thoát nước)</text>
  <!-- h chiều dày -->
  <line x1="285" y1="44"  x2="285" y2="134" stroke="#7b1fa2" stroke-width="1.5"/>
  <line x1="280" y1="44"  x2="290" y2="44"  stroke="#7b1fa2" stroke-width="1.5"/>
  <line x1="280" y1="134" x2="290" y2="134" stroke="#7b1fa2" stroke-width="1.5"/>
  <text x="292" y="94"  font-size="10" fill="#7b1fa2" font-weight="bold">h</text>
  <!-- H = h/2 -->
  <text x="8"   y="94"  font-size="9"  fill="#555">H=h/2</text>
  <!-- S∞ -->
  <text x="35"  y="175" font-size="9"  fill="#1565c0" font-weight="bold">S∞ = m_v · Δσ · h</text>
  <text x="35"  y="188" font-size="9"  fill="#c62828" font-weight="bold">Tv = Cv·t/H²  (H = h/2 nếu thoát 2 mặt)</text>
</svg>`;

const THEORY_CONSOL = `
<div class="theory-block">
  <div class="theory-label">📖 Lún cố kết theo thời gian – Bài 4</div>
  <div style="display:grid;grid-template-columns:1fr 240px;gap:14px;align-items:start;">
    <div>
      <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;
                  padding:9px 14px;margin-bottom:8px;">
        <div style="font-family:monospace;font-size:.93rem;font-weight:700;color:#1565c0;">
          S(t) = S∞ · U(Tv)<br>
          U(Tv) = 1 − (8/π²)·e^(−π²Tv/4)
        </div>
      </div>
      <div style="font-size:.83rem;line-height:1.8;color:#444;">
        • <b>S∞ = m_v · Δσ · h</b> – lún cuối cùng<br>
        • <b>Tv = Cv·t / H²</b> – nhân tố thời gian<br>
        • <b>H</b> = h (thoát nước 1 mặt) hoặc h/2 (thoát nước 2 mặt)<br>
        • <b>Cv</b> – hệ số cố kết (m²/năm)<br>
        • <b>U</b> – độ cố kết (0–1)
      </div>
    </div>
    ${SVG_CONSOLIDATION}
  </div>
  ${SVG_CLAY_LAYER}
</div>`;


// ────────────────────────────────────────────────────────────
// Bài 5.3a – Cho t → tính Tv, U(Tv), S(t)
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b3a'] = {
  chapterId: 'ch5',
  title: '5.3a – Lún cố kết tại thời điểm t: tính Tv, U%, S(t)',
  type: 'guided',
  theoryHTML: THEORY_CONSOL,
  hint: `
    <div class="hint-title">💡 Trình tự 4 bước</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> S∞ = m_v · Δσ · h (lún cuối cùng)<br>
      <b>B2.</b> H = h/2 (thoát 2 mặt) hoặc H = h (thoát 1 mặt)<br>
      <b>B3.</b> Tv = Cv · t / H²<br>
      <b>B4.</b> U = 1 − (8/π²)·e^(−π²Tv/4)<br>
      <b>B5.</b> S(t) = S∞ · U
    </div>`,

  genData(rng) {
    const h     = r2(3 + rng() * 5);          // chiều dày lớp sét 3–8 m
    const two   = rng() > 0.4;                 // thoát nước 2 mặt hay 1 mặt
    const H     = two ? r2(h / 2) : h;
    const mv    = parseFloat((0.0006 + rng() * 0.0008).toFixed(5)); // m²/kN
    const ds    = Math.round(30 + rng() * 60); // Δσ kPa
    const Sinf  = r2(mv * ds * h * 100);       // cm
    const Cv    = r2(0.5 + rng() * 2.5);       // m²/năm
    const t     = Math.round(0.5 + rng() * 4); // năm
    const Tv    = r3(Cv * t / (H * H));
    const U     = r3(1 - (8 / (Math.PI * Math.PI)) * Math.exp(-Math.PI * Math.PI * Tv / 4));
    const U_pct = r2(U * 100);
    const St    = r2(Sinf * U);
    return { h, two, H, mv, ds, Sinf, Cv, t, Tv, U, U_pct, St };
  },

  statement(d) {
    return `Lớp sét bão hòa dày <strong>h = ${d.h} m</strong> nằm giữa 2 lớp cát (thoát nước <strong>${d.two ? '2 mặt' : '1 mặt'}</strong>). Tải trọng phủ kín bề mặt <strong>Δσ = ${d.ds} kPa</strong>.<br>
    Thông số lớp sét: hệ số nén thể tích <strong>m_v = ${d.mv} m²/kN</strong>, hệ số cố kết <strong>Cv = ${d.Cv} m²/năm</strong>.<br><br>
    Tính độ lún của lớp sét sau <strong>t = ${d.t} năm</strong>.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Lún cuối cùng S∞ = m_v·Δσ·h =', unit:'cm',
      answer: d => d.Sinf, tol: 0.3 },
    { id:'q2', type:'fill', label:'Chiều dài thoát nước H =', unit:'m',
      answer: d => d.H, tol: 0.05 },
    { id:'q3', type:'fill', label:'Nhân tố thời gian Tv = Cv·t/H² =', unit:'–',
      answer: d => d.Tv, tol: 0.005 },
    { id:'q4', type:'fill', label:'Độ cố kết U(Tv) =', unit:'–',
      answer: d => d.U, tol: 0.01 },
    { id:'q5', type:'fill', label:'Độ lún tại thời điểm t: S(t) = S∞·U =', unit:'cm',
      answer: d => d.St, tol: 0.3 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.3b – Cho U% (hoặc S(t)) → tìm thời gian t
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b3b'] = {
  chapterId: 'ch5',
  title: '5.3b – Tìm thời gian t để đạt độ cố kết U%',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đảo công thức Tv → t</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Từ U% → U = U%/100<br>
      U = 1 − (8/π²)·e^(−π²Tv/4)<br>
      Giải: e^(−π²Tv/4) = (1−U)·π²/8<br>
      → <b>Tv = −(4/π²)·ln[(1−U)·π²/8]</b><br>
      → <b>t = Tv·H²/Cv</b>
    </div>`,

  genData(rng) {
    const h    = r2(3 + rng() * 5);
    const two  = rng() > 0.4;
    const H    = two ? r2(h / 2) : h;
    const mv   = parseFloat((0.0006 + rng() * 0.0008).toFixed(5));
    const ds   = Math.round(30 + rng() * 60);
    const Sinf = r2(mv * ds * h * 100);
    const Cv   = r2(0.5 + rng() * 2.5);
    // Chọn U% mục tiêu
    const U_pct = [50, 60, 70, 80, 90][Math.floor(rng() * 5)];
    const U    = U_pct / 100;
    const Tv   = r3(-4 / (Math.PI * Math.PI) * Math.log((1 - U) * Math.PI * Math.PI / 8));
    const t    = r2(Tv * H * H / Cv);
    const St   = r2(Sinf * U);
    return { h, two, H, mv, ds, Sinf, Cv, U_pct, U, Tv, t, St };
  },

  statement(d) {
    return `Lớp sét dày <strong>h = ${d.h} m</strong> (thoát nước <strong>${d.two ? '2 mặt' : '1 mặt'}</strong>). Tải <strong>Δσ = ${d.ds} kPa</strong>, m_v = ${d.mv} m²/kN, Cv = ${d.Cv} m²/năm. Lún cuối cùng S∞ = ${d.Sinf} cm.<br><br>
    Xác định thời gian cần thiết để độ cố kết đạt <strong>U = ${d.U_pct}%</strong>, và độ lún tương ứng S(t).`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Nhân tố thời gian cần đạt Tv =', unit:'–',
      answer: d => d.Tv, tol: 0.005 },
    { id:'q2', type:'fill', label:'Thời gian t = Tv·H²/Cv =', unit:'năm',
      answer: d => d.t, tol: 0.1 },
    { id:'q3', type:'fill', label:'Độ lún tại thời điểm t: S(t) = S∞·U =', unit:'cm',
      answer: d => d.St, tol: 0.3 },
  ]
};


// ────────────────────────────────────────────────────────────
// Bài 5.3c – Cho S(t) đo được → tính U%, Tv, xác định Cv
// ────────────────────────────────────────────────────────────
EXERCISES['ch5_b3c'] = {
  chapterId: 'ch5',
  title: '5.3c – Tổng hợp: Cho S(t) đo được → tính U%, Cv',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Ngược từ S(t) về Cv</div>
    <div style="font-size:.85rem;line-height:1.85;">
      1. U = S(t)/S∞<br>
      2. Tv = −(4/π²)·ln[(1−U)·π²/8]<br>
      3. Cv = Tv·H²/t
    </div>`,

  genData(rng) {
    const h    = r2(4 + rng() * 4);
    const two  = true; // thoát 2 mặt cho đơn giản
    const H    = r2(h / 2);
    const mv   = parseFloat((0.0006 + rng() * 0.0010).toFixed(5));
    const ds   = Math.round(40 + rng() * 50);
    const Sinf = r2(mv * ds * h * 100);
    const Cv   = r2(0.8 + rng() * 2.0);
    const t    = Math.round(1 + rng() * 3);
    const Tv   = r3(Cv * t / (H * H));
    const U    = r3(1 - (8 / (Math.PI * Math.PI)) * Math.exp(-Math.PI * Math.PI * Tv / 4));
    const U_pct = r2(U * 100);
    const St   = r2(Sinf * U);
    // Từ St ngược về Cv
    const U_back = r3(St / Sinf);
    const Tv_back = r3(-4 / (Math.PI * Math.PI) * Math.log((1 - U_back) * Math.PI * Math.PI / 8));
    const Cv_back = r2(Tv_back * H * H / t);
    return { h, H, mv, ds, Sinf, t, St, U_pct, U, Tv, Cv, U_back, Tv_back, Cv_back };
  },

  statement(d) {
    return `Lớp sét bão hòa dày <strong>h = ${d.h} m</strong> nằm trên tầng đá cứng, phía trên là cát (thoát nước 2 mặt, H = ${d.H} m). Tải phủ kín <strong>Δσ = ${d.ds} kPa</strong>, m_v = ${d.mv} m²/kN. Lún cuối cùng S∞ = ${d.Sinf} cm.<br><br>
    Sau <strong>t = ${d.t} năm</strong>, đo được độ lún thực tế <strong>S(t) = ${d.St} cm</strong>.<br>
    Tính độ cố kết U%, nhân tố thời gian Tv và hệ số cố kết Cv.`;
  },

  questions: [
    { id:'q1', type:'fill', label:'Độ cố kết U = S(t)/S∞ =', unit:'–',
      answer: d => d.U_back, tol: 0.01 },
    { id:'q2', type:'fill', label:'U% =', unit:'%',
      answer: d => d.U_pct, tol: 0.5 },
    { id:'q3', type:'fill', label:'Nhân tố thời gian Tv =', unit:'–',
      answer: d => d.Tv_back, tol: 0.005 },
    { id:'q4', type:'fill', label:'Hệ số cố kết Cv = Tv·H²/t =', unit:'m²/năm',
      answer: d => d.Cv_back, tol: 0.05 },
  ]
};


// ══════════════════════════════════════════════════════════════
//  TÓM TẮT CÔNG THỨC CUỐI CHƯƠNG 5
// ══════════════════════════════════════════════════════════════

EXERCISES['ch5_tomtat'] = {
  chapterId: 'ch5',
  title: '5.★ Tóm tắt công thức Chương 5',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📚 TÓM TẮT – CHƯƠNG 5: ĐỘ LÚN NỀN ĐẤT</div>

  <div style="margin-top:10px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ A. LÚN LÝ THUYẾT ĐÀN HỒI</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;width:32%;font-weight:700;">Công thức cơ bản</td>
      <td style="padding:5px 8px;font-family:monospace;">S = (1−μ₀²)·p_gl·b·ω / E₀</td>
    </tr>
    <tr><td style="padding:5px 8px;font-weight:700;">Áp lực gây lún</td>
      <td style="padding:5px 8px;font-family:monospace;">p_gl = p_tx − γ·h_m</td></tr>
    <tr style="background:#e3f2fd;"><td style="padding:5px 8px;font-weight:700;">Hệ số ω</td>
      <td style="padding:5px 8px;">Tra bảng theo l/b: 1→0.88; 1.5→1.08; 2→1.22; 3→1.44; 5→1.68; ≥10→2.12</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">[S] TCVN 9362</td>
      <td style="padding:5px 8px;">8 cm (thông thường)</td></tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#2e7d32;font-size:.9rem;">▸ B. CỘNG LÚN TỪNG LỚP</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#e8f5e9;">
      <td style="padding:5px 8px;width:32%;font-weight:700;">Lún 1 phân tố</td>
      <td style="padding:5px 8px;font-family:monospace;">S_i = (e₀−e₁)/(1+e₀)·h_i = m_v·Δσ·h_i</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">Quan hệ a_v–m_v</td>
      <td style="padding:5px 8px;font-family:monospace;">m_v = a_v/(1+e₀)</td></tr>
    <tr style="background:#e8f5e9;"><td style="padding:5px 8px;font-weight:700;">Ứng suất bản thân</td>
      <td style="padding:5px 8px;font-family:monospace;">σ_bt = Σγᵢ·hᵢ &nbsp;(dưới MNN dùng γ' = γ_bh−10)</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">Điều kiện tắt lún</td>
      <td style="padding:5px 8px;font-family:monospace;">Đất tốt: Δσ ≤ 0.2·σ_bt &nbsp;|&nbsp; Đất yếu: Δσ ≤ 0.1·σ_bt</td></tr>
    <tr style="background:#e8f5e9;"><td style="padding:5px 8px;font-weight:700;">Tổng lún</td>
      <td style="padding:5px 8px;font-family:monospace;">S = ΣS_i ≤ [S] = 8 cm</td></tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#c62828;font-size:.9rem;">▸ C. LÚN CỐ KẾT THEO THỜI GIAN</div>
  <table style="border-collapse:collapse;font-size:.81rem;width:100%;margin-top:4px;">
    <tr style="background:#fce4ec;">
      <td style="padding:5px 8px;width:32%;font-weight:700;">Lún cuối cùng</td>
      <td style="padding:5px 8px;font-family:monospace;">S∞ = m_v · Δσ · h</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">Nhân tố thời gian</td>
      <td style="padding:5px 8px;font-family:monospace;">Tv = Cv·t/H² &nbsp;(H = h/2 thoát 2 mặt)</td></tr>
    <tr style="background:#fce4ec;"><td style="padding:5px 8px;font-weight:700;">Độ cố kết</td>
      <td style="padding:5px 8px;font-family:monospace;">U = 1 − (8/π²)·e^(−π²Tv/4)</td></tr>
    <tr><td style="padding:5px 8px;font-weight:700;">Lún tại thời điểm t</td>
      <td style="padding:5px 8px;font-family:monospace;">S(t) = S∞ · U(Tv)</td></tr>
    <tr style="background:#fce4ec;"><td style="padding:5px 8px;font-weight:700;">Nghịch tìm t</td>
      <td style="padding:5px 8px;font-family:monospace;">Tv = −(4/π²)·ln[(1−U)·π²/8] → t = Tv·H²/Cv</td></tr>
  </table>
</div>`,
  hint: `<div class="hint-title">📌 Tóm tắt toàn bộ công thức chương 5 – không có câu hỏi tính toán.</div>`,
  genData(rng) { return {}; },
  statement(d) { return ''; },
  questions: []
};
