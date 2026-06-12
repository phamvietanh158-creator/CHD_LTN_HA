// ═══════════════════════════════════════════════════════
//  ch3.js – Chương 3: Tính chất cơ học của đất
//  Phần 1: Tính thấm | Phần 2: Biến dạng | Phần 3: Chống cắt
// ═══════════════════════════════════════════════════════

// ── SVG helpers ───────────────────────────────────────
function _svgThamCotNuocKhongDoi() {
  return `<svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="280" height="220" fill="#f8faff"/>
  <!-- Bình chứa trên -->
  <rect x="20" y="10" width="60" height="100" fill="#bce0fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="35" y="70" font-family="sans-serif" font-size="10" fill="#1565c0">Nước</text>
  <!-- Mẫu đất -->
  <rect x="100" y="60" width="80" height="60" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="115" y="93" font-family="sans-serif" font-size="11" fill="#5a3a1a">Mẫu đất</text>
  <!-- Lưới lọc -->
  <line x1="100" y1="120" x2="180" y2="120" stroke="#555" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="185" y="124" font-family="sans-serif" font-size="9" fill="#555">Lưới lọc</text>
  <!-- Ống dẫn A→B -->
  <line x1="80" y1="80" x2="100" y2="80" stroke="#1565c0" stroke-width="2"/>
  <line x1="180" y1="80" x2="240" y2="80" stroke="#1565c0" stroke-width="2"/>
  <!-- Bình thu -->
  <rect x="220" y="60" width="50" height="80" fill="#e3f0fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="225" y="102" font-family="sans-serif" font-size="9" fill="#1565c0">Thu Q</text>
  <!-- Nhãn h, L -->
  <line x1="25" y1="10" x2="25" y2="80" stroke="#e53935" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="1" y="50" font-family="sans-serif" font-size="10" fill="#e53935">h</text>
  <line x1="100" y1="145" x2="180" y2="145" stroke="#333" stroke-width="1"/>
  <text x="130" y="158" font-family="sans-serif" font-size="10" fill="#333">L</text>
  <!-- Nhãn A -->
  <text x="107" y="55" font-family="sans-serif" font-size="9" fill="#555">A (tiết diện)</text>
  <!-- Điểm áp kế -->
  <circle cx="130" cy="60" r="3" fill="#e53935"/>
  <text x="108" y="58" font-family="sans-serif" font-size="8" fill="#e53935">B</text>
  <circle cx="150" cy="120" r="3" fill="#e53935"/>
  <text x="152" y="124" font-family="sans-serif" font-size="8" fill="#e53935">A</text>
</svg>`;
}

function _svgThamCotNuocThayDoi() {
  return `<svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="260" height="220" fill="#f8faff"/>
  <!-- Ống đứng -->
  <rect x="80" y="10" width="25" height="130" fill="#bce0fd" stroke="#1565c0" stroke-width="1.5"/>
  <text x="55" y="40" font-family="sans-serif" font-size="9" fill="#1565c0">h₁</text>
  <text x="55" y="120" font-family="sans-serif" font-size="9" fill="#1565c0">h₂</text>
  <line x1="72" y1="15" x2="80" y2="15" stroke="#333" stroke-width="1"/>
  <line x1="72" y1="105" x2="80" y2="105" stroke="#333" stroke-width="1"/>
  <line x1="74" y1="15" x2="74" y2="105" stroke="#333" stroke-width="1" marker-end="url(#da)" marker-start="url(#da2)"/>
  <!-- Mẫu đất -->
  <rect x="70" y="140" width="80" height="50" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="85" y="168" font-family="sans-serif" font-size="11" fill="#5a3a1a">Mẫu đất</text>
  <text x="82" y="183" font-family="sans-serif" font-size="9" fill="#9c7a5a">tiết diện a</text>
  <!-- Tràn ra -->
  <line x1="150" y1="175" x2="210" y2="175" stroke="#1565c0" stroke-width="1.5"/>
  <text x="155" y="168" font-family="sans-serif" font-size="9" fill="#1565c0">Thoát Q</text>
  <!-- Nhãn L -->
  <line x1="155" y1="140" x2="155" y2="190" stroke="#555" stroke-width="1"/>
  <text x="158" y="168" font-family="sans-serif" font-size="9" fill="#555">L</text>
  <!-- Nhãn t -->
  <text x="30" y="75" font-family="sans-serif" font-size="10" fill="#e53935">Δh giảm</text>
  <text x="30" y="90" font-family="sans-serif" font-size="10" fill="#e53935">theo t</text>
  <defs>
    <marker id="da" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#333"/></marker>
    <marker id="da2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0,0 L6,3 L0,6 Z" fill="#333"/></marker>
  </defs>
</svg>`;
}

function _svgLopSongSong() {
  return `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="300" height="180" fill="#f8faff"/>
  <!-- Hướng thấm ngang -->
  <text x="10" y="25" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1565c0">→ Hướng thấm (song song)</text>
  <!-- Lớp 1 -->
  <rect x="40" y="35" width="220" height="50" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="100" y="62" font-family="sans-serif" font-size="11" fill="#5a3a1a">Lớp 1: h₁, k₁</text>
  <!-- Lớp 2 -->
  <rect x="40" y="85" width="220" height="60" fill="#c8dbb0" stroke="#5a8a3a" stroke-width="1.5"/>
  <text x="100" y="118" font-family="sans-serif" font-size="11" fill="#2a5a1a">Lớp 2: h₂, k₂</text>
  <!-- Mũi tên thấm -->
  <line x1="15" y1="60" x2="40" y2="60" stroke="#1565c0" stroke-width="2" marker-end="url(#ba3)"/>
  <line x1="15" y1="115" x2="40" y2="115" stroke="#2e7d32" stroke-width="2" marker-end="url(#ba4)"/>
  <!-- k_eq công thức -->
  <rect x="40" y="155" width="220" height="20" fill="#e3f0fd" rx="4"/>
  <text x="60" y="169" font-family="sans-serif" font-size="11" fill="#1565c0">k_h_eq = (k₁h₁ + k₂h₂)/(h₁+h₂)</text>
  <defs>
    <marker id="ba3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1565c0"/></marker>
    <marker id="ba4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2e7d32"/></marker>
  </defs>
</svg>`;
}

function _svgLopNoiTiep() {
  return `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="300" height="180" fill="#f8faff"/>
  <text x="10" y="25" font-family="sans-serif" font-size="11" font-weight="bold" fill="#1565c0">↓ Hướng thấm (nối tiếp)</text>
  <!-- Lớp 1 -->
  <rect x="60" y="35" width="180" height="45" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="110" y="60" font-family="sans-serif" font-size="11" fill="#5a3a1a">Lớp 1: h₁, k₁</text>
  <!-- Lớp 2 -->
  <rect x="60" y="80" width="180" height="55" fill="#b0c8e8" stroke="#4a7ab5" stroke-width="1.5"/>
  <text x="110" y="110" font-family="sans-serif" font-size="11" fill="#1a3a6c">Lớp 2: h₂, k₂</text>
  <!-- Mũi tên thấm đứng -->
  <line x1="150" y1="15" x2="150" y2="35" stroke="#1565c0" stroke-width="2" marker-end="url(#ba5)"/>
  <line x1="150" y1="135" x2="150" y2="155" stroke="#1565c0" stroke-width="2" marker-end="url(#ba5)"/>
  <!-- k_eq công thức -->
  <rect x="40" y="155" width="220" height="20" fill="#e3f0fd" rx="4"/>
  <text x="50" y="169" font-family="sans-serif" font-size="11" fill="#1565c0">k_v_eq = (h₁+h₂)/(h₁/k₁ + h₂/k₂)</text>
  <defs>
    <marker id="ba5" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1565c0"/></marker>
  </defs>
</svg>`;
}

function _svgOedometer() {
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="300" height="200" fill="#f8faff"/>
  <!-- Vỏ oedometer -->
  <rect x="60" y="30" width="180" height="100" fill="none" stroke="#546e7a" stroke-width="2"/>
  <!-- Đất trong hộp -->
  <rect x="62" y="32" width="176" height="70" fill="#d4b896" opacity="0.8"/>
  <text x="120" y="72" font-family="sans-serif" font-size="11" fill="#5a3a1a">Mẫu đất</text>
  <text x="108" y="88" font-family="sans-serif" font-size="10" fill="#9c7a5a">h₀, e₀ ban đầu</text>
  <!-- Tấm nén -->
  <rect x="62" y="25" width="176" height="7" fill="#78909c"/>
  <!-- Lực tác dụng -->
  <line x1="150" y1="5" x2="150" y2="25" stroke="#e53935" stroke-width="2.5" marker-end="url(#ra_oe)"/>
  <text x="158" y="18" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e53935">σ</text>
  <!-- Lưới lọc dưới -->
  <line x1="62" y1="102" x2="238" y2="102" stroke="#555" stroke-width="1.5" stroke-dasharray="4,2"/>
  <!-- Vành -->
  <rect x="60" y="130" width="180" height="12" fill="#90a4ae"/>
  <!-- Nhãn -->
  <text x="245" y="72" font-family="sans-serif" font-size="10" fill="#555">h</text>
  <line x1="238" y1="32" x2="248" y2="32" stroke="#555" stroke-width="1"/>
  <line x1="238" y1="102" x2="248" y2="102" stroke="#555" stroke-width="1"/>
  <line x1="243" y1="32" x2="243" y2="102" stroke="#555" stroke-width="1"/>
  <!-- Biểu đồ e-σ nhỏ -->
  <text x="10" y="160" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1565c0">Đường cong e-p:</text>
  <path d="M10,195 Q60,175 100,180 Q150,185 200,190" fill="none" stroke="#1565c0" stroke-width="2"/>
  <text x="205" y="193" font-family="sans-serif" font-size="9" fill="#1565c0">σ→</text>
  <line x1="10" y1="165" x2="10" y2="200" stroke="#555" stroke-width="1"/>
  <text x="1" y="172" font-family="sans-serif" font-size="8" fill="#555">e↑</text>
  <defs>
    <marker id="ra_oe" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
  </defs>
</svg>`;
}

function _svgCatPhang() {
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="300" height="200" fill="#f8faff"/>
  <!-- Tải đứng P -->
  <line x1="150" y1="5" x2="150" y2="30" stroke="#e53935" stroke-width="2.5" marker-end="url(#rcp)"/>
  <text x="158" y="20" font-family="sans-serif" font-size="12" font-weight="bold" fill="#e53935">P</text>
  <!-- Nắp nén -->
  <rect x="70" y="30" width="160" height="12" fill="#78909c"/>
  <text x="210" y="40" font-family="sans-serif" font-size="9" fill="#546e7a">Nắp nén</text>
  <!-- Hộp trên (mẫu đất trên) -->
  <rect x="70" y="42" width="160" height="45" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="120" y="68" font-family="sans-serif" font-size="11" fill="#5a3a1a">Mẫu đất</text>
  <!-- Mặt cắt -->
  <line x1="60" y1="87" x2="240" y2="87" stroke="#e53935" stroke-width="2.5" stroke-dasharray="6,3"/>
  <text x="245" y="91" font-family="sans-serif" font-size="10" fill="#e53935">Mặt cắt</text>
  <!-- Hộp dưới (cố định) -->
  <rect x="70" y="87" width="160" height="45" fill="#c8dbb0" stroke="#5a8a3a" stroke-width="1.5"/>
  <text x="100" y="113" font-family="sans-serif" font-size="11" fill="#2a5a1a">Hộp cắt dưới</text>
  <!-- Lực ngang T -->
  <line x1="230" y1="65" x2="260" y2="65" stroke="#1565c0" stroke-width="2.5" marker-end="url(#rct)"/>
  <text x="262" y="69" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1565c0">T</text>
  <!-- Bi trơn -->
  <circle cx="90" cy="143" r="5" fill="#aaa" stroke="#555" stroke-width="1"/>
  <circle cx="120" cy="143" r="5" fill="#aaa" stroke="#555" stroke-width="1"/>
  <circle cx="150" cy="143" r="5" fill="#aaa" stroke="#555" stroke-width="1"/>
  <circle cx="180" cy="143" r="5" fill="#aaa" stroke="#555" stroke-width="1"/>
  <circle cx="210" cy="143" r="5" fill="#aaa" stroke="#555" stroke-width="1"/>
  <!-- Biểu đồ τ-σ -->
  <text x="10" y="168" font-family="sans-serif" font-size="10" font-weight="bold" fill="#1565c0">Bao phá hoại: τ = c + σ tanφ</text>
  <line x1="10" y1="195" x2="280" y2="195" stroke="#555" stroke-width="1"/>
  <line x1="10" y1="170" x2="10" y2="198" stroke="#555" stroke-width="1"/>
  <line x1="30" y1="193" x2="250" y2="173" stroke="#e53935" stroke-width="2"/>
  <text x="252" y="175" font-family="sans-serif" font-size="9" fill="#e53935">τ↑</text>
  <text x="282" y="198" font-family="sans-serif" font-size="9" fill="#555">σ→</text>
  <defs>
    <marker id="rcp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
    <marker id="rct" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1565c0"/></marker>
  </defs>
</svg>`;
}

function _svgNen3Truc() {
  return `<svg viewBox="0 0 280 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;border-radius:8px;border:1px solid #dce3ed">
  <rect width="280" height="210" fill="#f8faff"/>
  <!-- Buồng nén -->
  <rect x="60" y="20" width="160" height="150" fill="#e3f0fd" stroke="#1565c0" stroke-width="2" rx="5"/>
  <text x="85" y="110" font-family="sans-serif" font-size="10" fill="#1565c0">σ₃ (áp lực buồng)</text>
  <!-- Mẫu đất trụ -->
  <rect x="105" y="35" width="70" height="120" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="112" y="98" font-family="sans-serif" font-size="11" fill="#5a3a1a">Mẫu</text>
  <text x="112" y="113" font-family="sans-serif" font-size="11" fill="#5a3a1a">đất</text>
  <!-- Lực dọc trục -->
  <line x1="140" y1="5" x2="140" y2="35" stroke="#e53935" stroke-width="2.5" marker-end="url(#rn3)"/>
  <text x="148" y="22" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e53935">σ₁−σ₃</text>
  <text x="95" y="18" font-family="sans-serif" font-size="10" fill="#e53935">(deviatoric)</text>
  <!-- Áp lực ngang -->
  <line x1="20" y1="95" x2="60" y2="95" stroke="#1565c0" stroke-width="2" marker-end="url(#rn4)"/>
  <text x="15" y="90" font-family="sans-serif" font-size="9" fill="#1565c0">σ₃</text>
  <line x1="260" y1="95" x2="220" y2="95" stroke="#1565c0" stroke-width="2" marker-end="url(#rn4)"/>
  <!-- Nhãn -->
  <text x="65" y="180" font-family="sans-serif" font-size="10" fill="#555">σ₁ = σ₃ + q_max</text>
  <text x="65" y="195" font-family="sans-serif" font-size="10" fill="#555">σ'₁ = σ₁ − u</text>
  <defs>
    <marker id="rn3" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
    <marker id="rn4" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1565c0"/></marker>
  </defs>
</svg>`;
}

// ═══════════════════════════════════════════════════════
//  PHẦN 1 – TÍNH THẤM
// ═══════════════════════════════════════════════════════

EXERCISES['ch3_t01'] = {
  chapterId: 'ch3',
  title: '3.1 – Lý thuyết: Định luật Darcy & Gradient thủy lực',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:8px">Định luật Darcy</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        v = k · i<br>
        Q = k · i · A<br><br>
        i = Δh / L  (gradient thủy lực)<br>
        k: hệ số thấm (m/s hoặc cm/s)<br>
        A: diện tích tiết diện (m²)<br>
        L: chiều dài đường thấm (m)
      </div>
      <div style="background:#fff3e0;border-radius:7px;padding:8px;margin-top:8px;font-size:.84rem">
        <b>Gradient tới hạn:</b> i_cr = (G_s − 1)/(1 + e) ≈ 1.0<br>
        Khi i &gt; i_cr → xói ngầm, "nước sôi"
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgThamCotNuocKhongDoi()}</div>
  </div>`,
  hint: 'Gradient i = Δh/L. Lưu lượng Q = k × i × A.',
  genData(rng) {
    // Dùng đơn vị cm/s để tránh r2() làm tròn về 0
    const k_cms = r3(0.001 + rng()*0.099);  // cm/s, range 0.001–0.1
    const k_ms  = r3(k_cms / 100);           // m/s để tính Q
    const A  = r2(0.05 + rng()*0.15);        // m²
    const L  = r2(0.3  + rng()*0.5);
    const dh = r2(0.2  + rng()*0.4);
    const i  = r3(dh/L);
    const v  = parseFloat((k_ms * i).toExponential(3));
    const Q  = parseFloat((k_ms * i * A).toExponential(3));
    return {k_cms, k_ms, A, L, dh, i, v, Q};
  },
  statement(d) {
    return `Một mẫu đất có hệ số thấm k = <b>${d.k_cms} cm/s</b>, diện tích tiết diện A = <b>${d.A} m²</b>, chiều dài mẫu L = <b>${d.L} m</b>.
    <br>Chênh lệch cột nước Δh = <b>${d.dh} m</b>.
    <br>Tính gradient thủy lực i, vận tốc thấm v và lưu lượng Q.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'i = Δh/L',           unit:'',      answer: d=>d.i,    tol:0.005 },
    { id:'q2', type:'fill', label:'v = k·i (m/s)',       unit:'m/s',   answer: d=>d.v,    tol:d=>Math.max(d.v*0.05, 1e-7) },
    { id:'q3', type:'fill', label:'Q = k·i·A (m³/s)',   unit:'m³/s',  answer: d=>d.Q,    tol:d=>Math.max(d.Q*0.05, 1e-8) },
  ]
};

EXERCISES['ch3_t02'] = {
  chapterId: 'ch3',
  title: '3.2 – TN cột nước không đổi: xác định k',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Thí nghiệm cột nước không đổi</p>
      <p style="font-size:.86rem;margin-bottom:8px">Dùng cho đất hạt thô (cát, sỏi). Duy trì cột nước không đổi Δh, đo lưu lượng Q.</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        Q = V/t  (lưu lượng m³/s hoặc cm³/s)<br>
        i = Δh/L<br>
        k = Q / (A · i) = Q · L / (A · Δh)
      </div>
      <p style="font-size:.83rem;color:#555">V: thể tích nước thu được (cm³ hoặc m³)<br>t: thời gian thu nước (s)</p>
    </div>
    <div style="flex:0 0 auto">${_svgThamCotNuocKhongDoi()}</div>
  </div>`,
  hint: 'q = V/t, i = Δh/L, k = q/(A×i). Chú ý đơn vị nhất quán.',
  genData(rng) {
    const d_mm = Math.round(60 + rng()*40);
    const L_mm = Math.round(80 + rng()*60);
    const dh_mm= Math.round(40 + rng()*30);
    const t_min= Math.round(8 + rng()*7);
    // k = 0.01..0.05 cm/s
    const k_cms= r3(0.005 + rng()*0.045);
    const A_cm2= r3(Math.PI * (d_mm/10/2)**2);
    const i    = r3((dh_mm/10) / (L_mm/10));
    const q_cms= r3(k_cms * i * A_cm2); // cm³/s
    const V_cm3= Math.round(q_cms * t_min * 60);
    // recalc k for answer
    const q_ans= r3(V_cm3 / (t_min*60));
    const k_ans= r3(q_ans * (L_mm/10) / (A_cm2 * (dh_mm/10)));
    return {d_mm, L_mm, dh_mm, t_min, V_cm3, A_cm2, i, q_ans, k_ans};
  },
  statement(d) {
    return `Thí nghiệm thấm cột nước không đổi trên mẫu đất có đường kính d = <b>${d.d_mm} mm</b>, chiều dài L = <b>${d.L_mm} mm</b>.
    <br>Trong <b>${d.t_min} phút</b>, qua mẫu đất thu được V = <b>${d.V_cm3} cm³</b> nước. Chênh lệch cột nước Δh = <b>${d.dh_mm} mm</b>.
    <br>Xác định <b>hệ số thấm k</b> của mẫu đất (cm/s).`;
  },
  questions: [
    { id:'q1', type:'fill', label:'A (cm²)',        unit:'cm²',  answer: d=>d.A_cm2, tol:0.5 },
    { id:'q2', type:'fill', label:'q = V/t (cm³/s)',unit:'cm³/s',answer: d=>d.q_ans, tol:d=>d.q_ans*0.05 },
    { id:'q3', type:'fill', label:'i = Δh/L',       unit:'',     answer: d=>d.i,     tol:0.01 },
    { id:'q4', type:'fill', label:'k (cm/s)',        unit:'cm/s', answer: d=>d.k_ans, tol:d=>d.k_ans*0.05 },
  ]
};

EXERCISES['ch3_t03'] = {
  chapterId: 'ch3',
  title: '3.3 – TN cột nước thay đổi: xác định k',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Thí nghiệm cột nước thay đổi</p>
      <p style="font-size:.86rem;margin-bottom:8px">Dùng cho đất hạt mịn (sét, bột). Cột nước giảm từ h₁ → h₂.</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        k = (a · L) / (A · t) · ln(h₁/h₂)<br><br>
        a: diện tích tiết diện ống đứng (cm²)<br>
        A: diện tích tiết diện mẫu (cm²)<br>
        L: chiều dài mẫu (cm)<br>
        t: thời gian thí nghiệm (s)<br>
        h₁, h₂: cột nước lúc đầu và lúc sau (cm)
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgThamCotNuocThayDoi()}</div>
  </div>`,
  hint: 'k = (a×L)/(A×t) × ln(h₁/h₂). Chú ý ln là logarit tự nhiên.',
  genData(rng) {
    const a_cm2 = r2(0.5 + rng()*1);
    const A_cm2 = r2(15  + rng()*15);
    const L_cm  = r2(8   + rng()*6);
    const h1_cm = r2(50  + rng()*30);
    const h2_cm = r2(10  + rng()*15);
    // k_cms đủ lớn để t_s không bị Infinity: đảm bảo t_s < 86400s (1 ngày)
    const ln_h  = Math.log(h1_cm / h2_cm);
    const t_max = 3600;  // giới hạn t tối đa 3600s (1 giờ)
    const k_min = r3(a_cm2 * L_cm * ln_h / (A_cm2 * t_max));
    const k_cms = r3(Math.max(k_min * 1.2, 1e-4) + rng() * 5e-3);
    const t_s   = Math.round(a_cm2 * L_cm * ln_h / (A_cm2 * k_cms));
    const k_ans = r3(a_cm2 * L_cm * ln_h / (A_cm2 * t_s));
    return {a_cm2, A_cm2, L_cm, h1_cm, h2_cm, t_s, k_ans};
  },
  statement(d) {
    return `Thí nghiệm thấm cột nước thay đổi: diện tích ống đứng a = <b>${d.a_cm2} cm²</b>, diện tích mẫu A = <b>${d.A_cm2} cm²</b>, chiều dài mẫu L = <b>${d.L_cm} cm</b>.
    <br>Cột nước giảm từ h₁ = <b>${d.h1_cm} cm</b> xuống h₂ = <b>${d.h2_cm} cm</b> trong t = <b>${d.t_s} s</b>.
    <br>Xác định <b>hệ số thấm k</b> (cm/s).`;
  },
  questions: [
    { id:'q1', type:'fill', label:'ln(h₁/h₂)',  unit:'',     answer: d=>r3(Math.log(d.h1_cm/d.h2_cm)), tol:0.01 },
    { id:'q2', type:'fill', label:'k (cm/s)',    unit:'cm/s', answer: d=>d.k_ans, tol:0.0001 },
  ]
};

EXERCISES['ch3_t04'] = {
  chapterId: 'ch3',
  title: '3.4 – Hệ số thấm tương đương: song song & nối tiếp',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Nền đất nhiều lớp</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        <b>Song song (thấm ngang):</b><br>
        k_h = Σ(kᵢhᵢ) / Σhᵢ<br><br>
        <b>Nối tiếp (thấm đứng):</b><br>
        k_v = Σhᵢ / Σ(hᵢ/kᵢ)
      </div>
      <p style="font-size:.83rem;color:#555">k_h &gt; k_v luôn đúng (thấm ngang lớn hơn thấm đứng)</p>
    </div>
    <div style="flex:0 0 auto;display:flex;flex-direction:column;gap:8px">
      ${_svgLopSongSong()}
      ${_svgLopNoiTiep()}
    </div>
  </div>`,
  hint: 'k_h (song song) = (k₁h₁+k₂h₂)/(h₁+h₂). k_v (nối tiếp) = (h₁+h₂)/(h₁/k₁+h₂/k₂).',
  genData(rng) {
    const h1 = r2(2 + rng()*3);
    const h2 = r2(3 + rng()*4);
    const k1 = parseFloat(((1 + rng()*9) * 1e-4).toExponential(3));
    const k2 = parseFloat(((1 + rng()*4) * 1e-5).toExponential(3));
    const kh = parseFloat(((k1*h1 + k2*h2)/(h1+h2)).toExponential(3));
    const kv = parseFloat(((h1+h2)/(h1/k1 + h2/k2)).toExponential(3));
    const ratio = r2(kh/kv) || 1;
    return {h1, h2, k1, k2, kh, kv, ratio};
  },
  statement(d) {
    return `Nền đất gồm 2 lớp:
    <br>Lớp 1: dày h₁ = <b>${d.h1} m</b>, k₁ = <b>${d.k1.toExponential(2)} m/s</b>
    <br>Lớp 2: dày h₂ = <b>${d.h2} m</b>, k₂ = <b>${d.k2.toExponential(2)} m/s</b>
    <br>Xác định hệ số thấm tương đương theo phương ngang (song song) k_h và phương đứng (nối tiếp) k_v.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'k_h (m/s) – song song',  unit:'m/s', answer: d=>d.kh, tol:d=>d.kh*0.05 },
    { id:'q2', type:'fill', label:'k_v (m/s) – nối tiếp',   unit:'m/s', answer: d=>d.kv, tol:d=>d.kv*0.05 },
    { id:'q3', type:'fill', label:'k_h / k_v',              unit:'',    answer: d=>d.ratio, tol:0.5 },
  ]
};

EXERCISES['ch3_t05'] = {
  chapterId: 'ch3',
  title: '3.5 – MCQ: Khái niệm tính thấm',
  type: 'guided',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:12px;margin-bottom:10px">
    <p style="font-weight:700;margin-bottom:6px">Ôn tập lý thuyết tính thấm</p>
    <ul style="font-size:.86rem;line-height:1.9;padding-left:18px">
      <li><b>Thấm trong đất</b> = sự di chuyển của nước trong lỗ rỗng dưới tác dụng của gradient thủy lực</li>
      <li><b>Định luật Darcy</b>: v = k·i (quan hệ vận tốc thấm và gradient)</li>
      <li><b>Gradient tới hạn</b> i_cr: khi áp lực nước lỗ rỗng = trọng lượng hữu hiệu → đất mất khả năng chịu lực</li>
      <li><b>TN cột nước không đổi</b>: đất hạt thô | <b>TN cột nước thay đổi</b>: đất hạt mịn</li>
    </ul>
  </div>`,
  hint: 'Xem lại định nghĩa gradient tới hạn và phân biệt 2 loại thí nghiệm thấm.',
  genData(rng) { return {r: Math.floor(rng()*2)}; },
  statement(d) { return 'Trả lời các câu hỏi trắc nghiệm về tính thấm:'; },
  questions: [
    {
      id:'q1', type:'mcq',
      label:'Thấm trong đất được hiểu là gì?',
      choices: ()=>['Sự biến dạng thể tích đất dưới tải trọng ngoài','Sự di chuyển của nước trong lỗ rỗng dưới tác dụng của gradient thủy lực','Quá trình bay hơi nước khỏi đất','Sự thay đổi độ ẩm do mưa và nắng'],
      correctIndex: ()=>1
    },
    {
      id:'q2', type:'mcq',
      label:'Định luật Darcy mô tả mối quan hệ nào?',
      choices: ()=>['Quan hệ giữa ứng suất và biến dạng','Quan hệ giữa vận tốc thấm và gradient thủy lực','Quan hệ giữa lưu lượng và trọng lượng riêng nước','Quan hệ giữa độ rỗng và độ bão hòa'],
      correctIndex: ()=>1
    },
    {
      id:'q3', type:'mcq',
      label:'TN nào dùng để xác định k của đất hạt thô?',
      choices: ()=>['Thí nghiệm nén oedometer','Thí nghiệm thấm cột nước không đổi','Thí nghiệm thấm cột nước thay đổi','Thí nghiệm SPT'],
      correctIndex: ()=>1
    },
    {
      id:'q4', type:'mcq',
      label:'Gradient tới hạn i_cr xác định khi:',
      choices: ()=>['Áp lực nước lỗ rỗng bằng áp lực thủy tĩnh','Lực đẩy nổi cân bằng trọng lượng hữu hiệu đất','Dòng thấm đạt vận tốc lớn nhất','Đất đạt trạng thái bão hòa hoàn toàn'],
      correctIndex: ()=>1
    },
  ]
};

// ═══════════════════════════════════════════════════════
//  PHẦN 2 – BIẾN DẠNG (OEDOMETER)
// ═══════════════════════════════════════════════════════

// Dữ liệu bảng TN oedometer cố định (có a thay đổi e0)
// σ(kG/cm²): 0.12, 0.25, 0.50, 1.00, 2.00, 4.00, 8.00
// h(mm):     19.8, 19.4, 19.0, 18.5, 18.2, 17.9, 17.7

function _genOedo(rng) {
  // e0 ngẫu nhiên trong khoảng 1.25..1.45
  const e0 = r3(1.25 + rng()*0.20);
  const h0 = 20; // mm
  const sigma = [0.12, 0.25, 0.50, 1.00, 2.00, 4.00, 8.00];
  const h     = [19.8, 19.4, 19.0, 18.5, 18.2, 17.9, 17.7];
  return {e0, h0, sigma, h};
}

function _tableOedo(d) {
  let rows = d.sigma.map((s,i) =>
    `<td style="padding:5px 10px;text-align:center">${s}</td><td style="padding:5px 10px;text-align:center">${d.h[i]}</td>`
  );
  return `<div style="overflow-x:auto;margin:10px 0">
  <table style="border-collapse:collapse;font-size:.82rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng kết quả TN oedometer (h₀ = ${d.h0} mm, e₀ = ${r2(d.e0)})</caption>
  <tr style="background:#1565c0;color:#fff">
    <th style="padding:5px 10px">σ (kG/cm²)</th>${d.sigma.map(s=>`<th style="padding:5px 10px">${s}</th>`).join('')}
  </tr>
  <tr style="background:#f5f8ff">
    <th style="padding:5px 10px;background:#e3f0fd">h (mm)</th>${d.h.map(hv=>`<td style="padding:5px 10px;text-align:center">${hv}</td>`).join('')}
  </tr>
  </table></div>`;
}

EXERCISES['ch3_bd01'] = {
  chapterId: 'ch3',
  title: '3.6 – Oedometer: Độ lún S tại cấp tải σ (trực tiếp)',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Xử lý kết quả TN oedometer</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        S₁ = S_{0→1} = h₀ − h₁<br>
        Sᵢ = S_{0→i} = h₀ − hᵢ<br>
        S_{1→2} = h₁ − h₂ = S₂ − S₁
      </div>
      <p style="font-size:.83rem;color:#555">Độ lún S tính từ trạng thái ban đầu (h₀) đến cấp tải đang xét.</p>
    </div>
    <div style="flex:0 0 auto">${_svgOedometer()}</div>
  </div>`,
  hint: 'S = h₀ − h_i, đơn vị mm. Tìm h_i ứng với cấp tải σ trong bảng.',
  genData(rng) {
    const od = _genOedo(rng);
    // Chọn cấp tải ngẫu nhiên từ index 1..5
    const idx = 1 + Math.floor(rng()*5);
    const sig = od.sigma[idx];
    const hi  = od.h[idx];
    const S   = r2(od.h0 - hi);
    return {...od, idx, sig, hi, S};
  },
  statement(d) {
    return `${_tableOedo(d)}
    <p><b>Xác định độ lún S</b> ở cấp tải σ = <b>${d.sig} kG/cm²</b>.</p>`;
  },
  questions: [
    { id:'q1', type:'fill', label:'h tại σ (mm)',    unit:'mm', answer: d=>d.hi, tol:0.05 },
    { id:'q2', type:'fill', label:'S = h₀ − h (mm)', unit:'mm', answer: d=>d.S,  tol:0.05 },
  ]
};

EXERCISES['ch3_bd02'] = {
  chapterId: 'ch3',
  title: '3.7 – Oedometer: Độ lún S từ cấp tải này sang cấp tải khác',
  type: 'apply',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:10px;margin-bottom:10px;font-family:monospace;font-size:.84rem">
    S_{i→j} = hᵢ − h_j = S_j − Sᵢ
  </div>
  <p style="font-size:.86rem">Độ lún từ cấp tải σᵢ đến σⱼ = chênh lệch chiều cao mẫu tại hai cấp tải đó.</p>`,
  hint: 'S(i→j) = h_i − h_j. Tìm đúng 2 cấp tải trong bảng.',
  genData(rng) {
    const od  = _genOedo(rng);
    const i1  = 1 + Math.floor(rng()*3);
    const i2  = i1 + 1 + Math.floor(rng()*2);
    const sig1= od.sigma[i1];
    const sig2= od.sigma[i2];
    const h1  = od.h[i1];
    const h2  = od.h[i2];
    const S   = r2(h1 - h2);
    return {...od, sig1, sig2, h1, h2, S};
  },
  statement(d) {
    return `${_tableOedo(d)}
    <p><b>Xác định độ lún S</b> từ cấp tải σ = <b>${d.sig1} kG/cm²</b> đến cấp tải σ = <b>${d.sig2} kG/cm²</b>.</p>`;
  },
  questions: [
    { id:'q1', type:'fill', label:'h₁ tại σ₁ (mm)',     unit:'mm', answer: d=>d.h1, tol:0.05 },
    { id:'q2', type:'fill', label:'h₂ tại σ₂ (mm)',     unit:'mm', answer: d=>d.h2, tol:0.05 },
    { id:'q3', type:'fill', label:'S = h₁ − h₂ (mm)', unit:'mm', answer: d=>d.S,  tol:0.05 },
  ]
};

EXERCISES['ch3_bd03'] = {
  chapterId: 'ch3',
  title: '3.8 – Oedometer: Hệ số rỗng e tại cấp tải',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tính hệ số rỗng từ TN oedometer</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        e₁ = e₀ − (S₁/h₀)·(1 + e₀)<br>
        eᵢ = e₀ − (Sᵢ/h₀)·(1 + e₀)<br><br>
        Hoặc: eᵢ = e₁ − (S_{1→i}/h₁)·(1 + e₁)
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgOedometer()}</div>
  </div>`,
  hint: 'Tính Sᵢ = h₀ − hᵢ trước, rồi eᵢ = e₀ − (Sᵢ/h₀)×(1+e₀).',
  genData(rng) {
    const od  = _genOedo(rng);
    const idx = 1 + Math.floor(rng()*5);
    const sig = od.sigma[idx];
    const hi  = od.h[idx];
    const Si  = r2(od.h0 - hi);
    const ei  = r3(od.e0 - (Si/od.h0)*(1+od.e0));
    return {...od, idx, sig, hi, Si, ei};
  },
  statement(d) {
    return `${_tableOedo(d)}
    <p><b>Xác định hệ số rỗng e</b> ở cấp tải σ = <b>${d.sig} kG/cm²</b>. Biết e₀ = <b>${r2(d.e0)}</b>.</p>`;
  },
  questions: [
    { id:'q1', type:'fill', label:'S_i = h₀ − h_i (mm)', unit:'mm', answer: d=>d.Si, tol:0.05 },
    { id:'q2', type:'fill', label:'e_i',                  unit:'',   answer: d=>d.ei, tol:0.005 },
  ]
};

EXERCISES['ch3_bd04'] = {
  chapterId: 'ch3',
  title: '3.9 – Oedometer: Hệ số nén a và m_v',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Hệ số nén lún</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        a_{i-j} = (eᵢ − eⱼ) / (σⱼ − σᵢ)<br><br>
        m_v = a / (1 + e₀) = a_{i-j} / (1 + eᵢ)
      </div>
      <p style="font-size:.83rem;color:#555">a: hệ số nén (cm²/kG)<br>m_v: hệ số nén thể tích (cm²/kG)</p>
    </div>
    <div style="flex:0 0 auto">${_svgOedometer()}</div>
  </div>`,
  hint: 'Tính eᵢ, eⱼ trước từ bảng TN, rồi a = (eᵢ−eⱼ)/(σⱼ−σᵢ).',
  genData(rng) {
    const od  = _genOedo(rng);
    const i1  = Math.floor(rng()*4);
    const i2  = i1+1;
    const s1  = od.sigma[i1], s2 = od.sigma[i2];
    const h1  = od.h[i1], h2 = od.h[i2];
    const S1  = r2(od.h0-h1), S2 = r2(od.h0-h2);
    const e1  = r3(od.e0-(S1/od.h0)*(1+od.e0));
    const e2  = r3(od.e0-(S2/od.h0)*(1+od.e0));
    const a   = r3((e1-e2)/(s2-s1));
    const mv  = r3(a/(1+e1));
    return {...od, s1,s2,h1,h2,S1,S2,e1,e2,a,mv};
  },
  statement(d) {
    return `${_tableOedo(d)}
    <p>Xác định <b>hệ số nén a</b> và <b>hệ số nén thể tích m_v</b> ở cấp tải từ σ₁ = <b>${d.s1}</b> đến σ₂ = <b>${d.s2} kG/cm²</b>.</p>`;
  },
  questions: [
    { id:'q1', type:'fill', label:'e₁ tại σ₁',         unit:'',          answer: d=>d.e1, tol:0.005 },
    { id:'q2', type:'fill', label:'e₂ tại σ₂',         unit:'',          answer: d=>d.e2, tol:0.005 },
    { id:'q3', type:'fill', label:'a (cm²/kG)',         unit:'cm²/kG',    answer: d=>d.a,  tol:d=>d.a*0.05 },
    { id:'q4', type:'fill', label:'m_v (cm²/kG)',       unit:'cm²/kG',    answer: d=>d.mv, tol:d=>d.mv*0.05 },
  ]
};

EXERCISES['ch3_bd05'] = {
  chapterId: 'ch3',
  title: '3.10 – Oedometer: Tính độ lún với tải trọng cho trước (nội suy)',
  type: 'apply',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:10px;margin-bottom:10px;font-family:monospace;font-size:.84rem">
    Sⱼ = h₀/(1+e₀) × (e₀ − eⱼ)<br>
    Hoặc: Sⱼ = h₀ × m_{v,0-j} × (σⱼ − σ₀)<br><br>
    Khi σ nằm giữa hai cấp tải: nội suy tuyến tính để tìm eⱼ
  </div>
  <p style="font-size:.86rem">Nếu cấp tải σ không trùng bảng → nội suy eⱼ từ đường cong e-σ (cho phép tuyến tính giữa 2 điểm).</p>`,
  hint: 'Nội suy tuyến tính: e = e₁ + (e₂-e₁)×(σ-σ₁)/(σ₂-σ₁). Sau đó S = h₀/(1+e₀)×(e₀-e).',
  genData(rng) {
    const od  = _genOedo(rng);
    const i1  = 1 + Math.floor(rng()*3);
    const i2  = i1+1;
    const s1  = od.sigma[i1], s2 = od.sigma[i2];
    const h1  = od.h[i1], h2 = od.h[i2];
    const e1  = r3(od.e0-(r2(od.h0-h1)/od.h0)*(1+od.e0));
    const e2  = r3(od.e0-(r2(od.h0-h2)/od.h0)*(1+od.e0));
    // σ nội suy
    const t   = 0.3 + rng()*0.4;
    const sig = r2(s1 + t*(s2-s1));
    const e_j = r3(e1 + (e2-e1)*(sig-s1)/(s2-s1));
    const S   = r2(od.h0/(1+od.e0)*(od.e0-e_j));
    return {...od, s1,s2,e1,e2,sig,e_j,S};
  },
  statement(d) {
    return `${_tableOedo(d)}
    <p>Xác định <b>độ lún S</b> ứng với tải trọng σⱼ = <b>${d.sig} kG/cm²</b> (sử dụng nội suy tuyến tính). e₀ = <b>${r2(d.e0)}</b>.</p>`;
  },
  questions: [
    { id:'q1', type:'fill', label:'e₁ tại σ₁ (bảng)',  unit:'', answer: d=>d.e1,  tol:0.005 },
    { id:'q2', type:'fill', label:'e₂ tại σ₂ (bảng)',  unit:'', answer: d=>d.e2,  tol:0.005 },
    { id:'q3', type:'fill', label:'e_j nội suy',        unit:'', answer: d=>d.e_j, tol:0.005 },
    { id:'q4', type:'fill', label:'S (mm)',              unit:'mm', answer: d=>d.S, tol:0.1 },
  ]
};

EXERCISES['ch3_bd06'] = {
  chapterId: 'ch3',
  title: '3.11 – MCQ: Khái niệm biến dạng đất',
  type: 'guided',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:12px;margin-bottom:10px">
    <p style="font-weight:700;margin-bottom:6px">Ôn tập lý thuyết biến dạng</p>
    <ul style="font-size:.86rem;line-height:1.9;padding-left:18px">
      <li><b>TN oedometer</b>: nén 1D, không nở hông, đo h theo cấp tải σ</li>
      <li><b>Hệ số rỗng e</b>: thể hiện mức độ rỗng của đất</li>
      <li><b>Hệ số nén a</b>: độ dốc đường cong e-σ (giảm dần)</li>
      <li><b>m_v</b> = a/(1+e₀): hệ số nén thể tích</li>
      <li><b>S = h₀·m_v·Δσ</b>: công thức tính lún đơn giản</li>
    </ul>
  </div>`,
  hint: '',
  genData(rng) { return {}; },
  statement(d) { return 'Trả lời câu hỏi trắc nghiệm về biến dạng:'; },
  questions: [
    {
      id:'q1', type:'mcq',
      label:'Hệ số nén a_{i-j} được tính theo công thức nào?',
      choices: ()=>['a = (eᵢ − eⱼ)/(σⱼ − σᵢ)','a = (σⱼ − σᵢ)/(eᵢ − eⱼ)','a = eᵢ/σᵢ','a = Δh/h₀'],
      correctIndex: ()=>0
    },
    {
      id:'q2', type:'mcq',
      label:'Trong TN oedometer, đại lượng nào được đo trực tiếp?',
      choices: ()=>['Hệ số rỗng e','Chiều cao mẫu h theo cấp tải σ','Hệ số nén a','Mô đun biến dạng E'],
      correctIndex: ()=>1
    },
    {
      id:'q3', type:'mcq',
      label:'Hệ số nén thể tích m_v liên hệ với a theo công thức:',
      choices: ()=>['m_v = a·(1+e₀)','m_v = a/(1+e₀)','m_v = a/e₀','m_v = a·e₀'],
      correctIndex: ()=>1
    },
  ]
};

// ═══════════════════════════════════════════════════════
//  PHẦN 3 – TÍNH CHỐNG CẮT
// ═══════════════════════════════════════════════════════

EXERCISES['ch3_cc01'] = {
  chapterId: 'ch3',
  title: '3.12 – Lý thuyết: Tiêu chuẩn phá hoại Mohr-Coulomb',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tiêu chuẩn phá hoại Mohr-Coulomb</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        τ_f = c' + σ' · tan φ'<br><br>
        c': lực dính hữu hiệu (kPa)<br>
        φ': góc ma sát trong hữu hiệu (°)<br>
        σ' = σ − u: ứng suất pháp hữu hiệu
      </div>
      <div style="background:#e8f5e9;border-radius:7px;padding:8px;margin-top:8px;font-size:.84rem">
        <b>Đất rời (cát):</b> c ≈ 0, φ > 0<br>
        <b>Đất dính (sét bão hòa, UU):</b> φ = 0, τ = c_u<br>
        <b>Đất dính thông thường:</b> c > 0, φ > 0
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgCatPhang()}</div>
  </div>`,
  hint: 'Ứng suất hữu hiệu σ\' = σ − u. Sức kháng cắt τ_f = c + σ\' × tanφ.',
  genData(rng) {
    const c   = Math.round(5 + rng()*20);     // kPa
    const phi = Math.round(20 + rng()*15);    // độ
    const sig = r2(100 + rng()*150);          // kPa
    const u   = r2(rng()*30);
    const sig_eff = r2(sig - u);
    const tau = r2(c + sig_eff * Math.tan(phi*Math.PI/180));
    return {c, phi, sig, u, sig_eff, tau};
  },
  statement(d) {
    return `Đất có lực dính c = <b>${d.c} kPa</b>, góc ma sát trong φ = <b>${d.phi}°</b>.
    <br>Tại một điểm, ứng suất pháp σ = <b>${d.sig} kPa</b>, áp lực nước lỗ rỗng u = <b>${d.u} kPa</b>.
    <br>Tính <b>sức kháng cắt</b> τ_f tại điểm đó.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ\' = σ − u (kPa)',   unit:'kPa', answer: d=>d.sig_eff, tol:1 },
    { id:'q2', type:'fill', label:'τ_f = c + σ\'·tanφ (kPa)', unit:'kPa', answer: d=>d.tau, tol:2 },
  ]
};

EXERCISES['ch3_cc02'] = {
  chapterId: 'ch3',
  title: '3.13 – Cắt phẳng: Xác định c và φ từ 2 mẫu',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">TN cắt phẳng – Xác định c, φ</p>
      <p style="font-size:.86rem;margin-bottom:8px">Cắt ít nhất 2 mẫu với tải đứng P khác nhau, đo lực cắt T tới hạn.</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        σ = P/A  (ứng suất pháp)<br>
        τ = T/A  (ứng suất cắt)<br><br>
        Vẽ 2 điểm (σ₁,τ₁) và (σ₂,τ₂) → đường thẳng<br>
        tan φ = (τ₂−τ₁)/(σ₂−σ₁)<br>
        c = τ₁ − σ₁·tan φ
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgCatPhang()}</div>
  </div>`,
  hint: 'Tính σ=P/A và τ=T/A cho từng mẫu. Sau đó tanφ = (τ₂-τ₁)/(σ₂-σ₁), c = τ₁ - σ₁·tanφ.',
  genData(rng) {
    const A_cm2 = Math.round(40 + rng()*20);   // cm²
    const a_stt = Math.floor(rng()*30);
    const phi_deg = Math.round(20 + rng()*15);
    const c_kPa  = Math.round(5 + rng()*20);
    const P1_N = Math.round((100 + a_stt + rng()*20)*1)/1;
    const P2_N = Math.round((240 + a_stt + rng()*20)*1)/1;
    const sig1 = r2(P1_N / A_cm2 * 10);   // kPa (1 kG/cm² = 100 kPa, but N/cm² = 0.1 kPa → N/cm²×10 = kPa? No: 1N/cm² = 10 kPa)
    const sig2 = r2(P2_N / A_cm2 * 10);
    const tanphi = Math.tan(phi_deg*Math.PI/180);
    const T1_N = Math.round((c_kPa/10 + sig1/10 * tanphi) * A_cm2);
    const T2_N = Math.round((c_kPa/10 + sig2/10 * tanphi) * A_cm2);
    // recalc from T
    const tau1 = r2(T1_N / A_cm2 * 10);
    const tau2 = r2(T2_N / A_cm2 * 10);
    const tanphi_ans = r3((tau2-tau1)/(sig2-sig1));
    const phi_ans = r1(Math.atan(tanphi_ans)*180/Math.PI);
    const c_ans = r2(tau1 - sig1*tanphi_ans);
    return {A_cm2, P1_N, P2_N, T1_N, T2_N, sig1, sig2, tau1, tau2, tanphi_ans, phi_ans, c_ans};
  },
  statement(d) {
    return `Thí nghiệm cắt phẳng mẫu đất cát, diện tích tiết diện A = <b>${d.A_cm2} cm²</b>:
    <br><table style="border-collapse:collapse;margin:8px 0;font-size:.88rem">
    <tr style="background:#1565c0;color:#fff"><th style="padding:5px 12px">Tải đứng P (N)</th><th style="padding:5px 12px">Tải ngang T (N)</th></tr>
    <tr style="background:#f5f8ff"><td style="padding:5px 12px;text-align:center">${d.P1_N}</td><td style="padding:5px 12px;text-align:center">${d.T1_N}</td></tr>
    <tr><td style="padding:5px 12px;text-align:center">${d.P2_N}</td><td style="padding:5px 12px;text-align:center">${d.T2_N}</td></tr>
    </table>
    Xác định <b>góc ma sát trong φ</b> và <b>lực dính c</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ₁ = P₁/A (kPa)',  unit:'kPa', answer: d=>d.sig1, tol:1 },
    { id:'q2', type:'fill', label:'τ₁ = T₁/A (kPa)',  unit:'kPa', answer: d=>d.tau1, tol:1 },
    { id:'q3', type:'fill', label:'σ₂ = P₂/A (kPa)',  unit:'kPa', answer: d=>d.sig2, tol:1 },
    { id:'q4', type:'fill', label:'τ₂ = T₂/A (kPa)',  unit:'kPa', answer: d=>d.tau2, tol:1 },
    { id:'q5', type:'fill', label:'φ (°)',             unit:'°',   answer: d=>d.phi_ans, tol:1 },
    { id:'q6', type:'fill', label:'c (kPa)',           unit:'kPa', answer: d=>d.c_ans,   tol:2 },
  ]
};

function r1(v){return Math.round(v*10)/10}

EXERCISES['ch3_cc03'] = {
  chapterId: 'ch3',
  title: '3.14 – Nén 3 trục CU: Xác định c\' và φ\'',
  type: 'guided',
  theoryHTML: `
  <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">TN nén 3 trục CU (không thoát nước)</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        σ₁ = σ₃ + q  (ứng suất tổng)<br>
        σ'₁ = σ₁ − u  ;  σ'₃ = σ₃ − u<br><br>
        Vẽ vòng Mohr → đường bao phá hoại<br>
        Tâm: (σ'₁+σ'₃)/2 ; Bán kính: (σ'₁−σ'₃)/2<br><br>
        sin φ' = (σ'₁−σ'₃)/(σ'₁+σ'₃)<br>
        c' từ đường thẳng bao phá hoại
      </div>
    </div>
    <div style="flex:0 0 auto">${_svgNen3Truc()}</div>
  </div>`,
  hint: 'Tính σ\'₁, σ\'₃ cho từng mẫu. Dùng công thức sinφ\' = (σ\'₁−σ\'₃)/(σ\'₁+σ\'₃) khi c\'=0, hoặc vẽ đường bao qua 2 vòng Mohr.',
  genData(rng) {
    const phi_deg = Math.round(18 + rng()*12);
    const c_kPa   = Math.round(rng()*25);
    const sig3_1  = Math.round(100 + rng()*30);
    const sig3_2  = Math.round(200 + rng()*30);
    const tanphi  = Math.tan(phi_deg*Math.PI/180);
    // q_max = 2c·cos(phi) + 2sig3·sin(phi) · ... approximate
    // Dùng CT: σ₁ = σ₃·Nφ + 2c√Nφ, Nφ = tan²(45+φ/2)
    const Nphi= Math.pow(Math.tan((45+phi_deg/2)*Math.PI/180),2);
    const q1  = Math.round(sig3_1*(Nphi-1) + 2*c_kPa*Math.sqrt(Nphi));
    const q2  = Math.round(sig3_2*(Nphi-1) + 2*c_kPa*Math.sqrt(Nphi));
    const u1  = Math.round(20 + rng()*30);
    const u2  = Math.round(u1 + 20 + rng()*40);
    const s1_tot = sig3_1 + q1, s3_1 = sig3_1;
    const s1_eff = s1_tot - u1, s3_eff_1 = sig3_1 - u1;
    const s1_tot2= sig3_2 + q2, s3_2 = sig3_2;
    const s1_eff2= s1_tot2 - u2, s3_eff_2= sig3_2 - u2;
    // phi' from two circles (approximate)
    const phi_ans = r1(phi_deg);
    const c_ans   = r2(c_kPa);
    return {sig3_1, sig3_2, q1, q2, u1, u2,
            s1_tot, s1_eff, s3_eff_1,
            s1_tot2, s1_eff2, s3_eff_2,
            phi_ans, c_ans};
  },
  statement(d) {
    return `Kết quả TN nén 3 trục CU (không thoát nước) trên 2 mẫu đất á sét:
    <br><table style="border-collapse:collapse;margin:8px 0;font-size:.88rem">
    <tr style="background:#1565c0;color:#fff">
      <th style="padding:5px 12px">Thông số</th>
      <th style="padding:5px 12px">Mẫu 1</th>
      <th style="padding:5px 12px">Mẫu 2</th>
    </tr>
    <tr style="background:#f5f8ff"><td style="padding:5px 12px">Áp lực buồng σ₃ (kPa)</td><td style="padding:5px 12px;text-align:center">${d.sig3_1}</td><td style="padding:5px 12px;text-align:center">${d.sig3_2}</td></tr>
    <tr><td style="padding:5px 12px">Độ lệch ứng suất q = σ₁−σ₃ (kPa)</td><td style="padding:5px 12px;text-align:center">${d.q1}</td><td style="padding:5px 12px;text-align:center">${d.q2}</td></tr>
    <tr style="background:#f5f8ff"><td style="padding:5px 12px">Áp lực nước lỗ rỗng u (kPa)</td><td style="padding:5px 12px;text-align:center">${d.u1}</td><td style="padding:5px 12px;text-align:center">${d.u2}</td></tr>
    </table>
    Xác định <b>c' và φ'</b> (thông số hữu hiệu) từ TN CU.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ\'₁ mẫu 1 (kPa)',  unit:'kPa', answer: d=>d.s1_eff,   tol:2 },
    { id:'q2', type:'fill', label:'σ\'₃ mẫu 1 (kPa)',  unit:'kPa', answer: d=>d.s3_eff_1, tol:2 },
    { id:'q3', type:'fill', label:'σ\'₁ mẫu 2 (kPa)',  unit:'kPa', answer: d=>d.s1_eff2,  tol:2 },
    { id:'q4', type:'fill', label:'σ\'₃ mẫu 2 (kPa)',  unit:'kPa', answer: d=>d.s3_eff_2, tol:2 },
    { id:'q5', type:'fill', label:'φ\' (°)',            unit:'°',   answer: d=>d.phi_ans,  tol:2 },
    { id:'q6', type:'fill', label:'c\' (kPa)',          unit:'kPa', answer: d=>d.c_ans,    tol:3 },
  ]
};

EXERCISES['ch3_cc04'] = {
  chapterId: 'ch3',
  title: '3.15 – MCQ: Lý thuyết chống cắt',
  type: 'guided',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:12px;margin-bottom:10px">
    <p style="font-weight:700;margin-bottom:6px">Ôn tập lý thuyết chống cắt</p>
    <ul style="font-size:.86rem;line-height:1.9;padding-left:18px">
      <li><b>UU</b>: không cố kết – không thoát nước; φ=0, τ=c_u</li>
      <li><b>CU</b>: cố kết – không thoát nước; đo u → thông số hữu hiệu c', φ'</li>
      <li><b>CD</b>: cố kết – thoát nước; không kiểm soát u, thông số hữu hiệu trực tiếp</li>
      <li><b>Nhược điểm cắt phẳng</b>: không kiểm soát áp lực nước lỗ rỗng</li>
    </ul>
  </div>`,
  hint: '',
  genData(rng) { return {}; },
  statement(d) { return 'Trả lời câu hỏi trắc nghiệm về tính chống cắt:'; },
  questions: [
    {
      id:'q1', type:'mcq',
      label:'Trong công thức τ = c + σ\'·tanφ, φ biểu thị:',
      choices: ()=>['Góc nghiêng mặt trượt','Lực dính của đất','Góc ma sát trong','Độ rỗng đất'],
      correctIndex: ()=>2
    },
    {
      id:'q2', type:'mcq',
      label:'TN nén 3 trục không cố kết không thoát nước ký hiệu là:',
      choices: ()=>['CU','CD','UU','UC'],
      correctIndex: ()=>2
    },
    {
      id:'q3', type:'mcq',
      label:'Nhược điểm của TN cắt trực tiếp là:',
      choices: ()=>['Không xác định được φ','Không kiểm soát được áp lực nước lỗ rỗng','Cần thời gian rất dài','Không dùng cho đất cát'],
      correctIndex: ()=>1
    },
    {
      id:'q4', type:'mcq',
      label:'Ứng suất hữu hiệu σ\' theo Terzaghi:',
      choices: ()=>['σ\' = σ − u','σ\' = σ + u','σ\' = σ × u','σ\' = u'],
      correctIndex: ()=>0
    },
    {
      id:'q5', type:'mcq',
      label:'Khi φ = 0 (đất sét bão hòa, điều kiện UU), đất có đặc tính:',
      choices: ()=>['Đất rời','Đất sét mềm bão hòa','Đất cát chặt','Đất sét nửa cứng'],
      correctIndex: ()=>1
    },
  ]
};

// ═══════════════════════════════════════════════════════
//  TỔNG HỢP CÔNG THỨC CHƯƠNG 3
// ═══════════════════════════════════════════════════════

EXERCISES['ch3_sum'] = {
  chapterId: 'ch3',
  title: '📋 Tổng hợp công thức – Chương 3',
  type: 'guided',
  theoryHTML: `
<style>
.s3-sec{margin-bottom:18px}
.s3-sec h4{background:var(--primary);color:#fff;padding:6px 14px;border-radius:7px 7px 0 0;margin:0;font-size:.9rem}
.s3-body{border:1px solid var(--primary);border-top:none;border-radius:0 0 7px 7px;padding:12px 16px}
.s3-row{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;font-size:.85rem;line-height:1.7}
.s3-f{background:#e3f0fd;border-radius:5px;padding:4px 10px;font-family:monospace;flex-shrink:0;min-width:270px}
.s3-n{color:#555}
</style>

<div class="s3-sec">
  <h4>A. Tính thấm – Định luật Darcy</h4>
  <div class="s3-body">
    <div class="s3-row"><div class="s3-f">v = k · i</div><div class="s3-n">v: tốc độ thấm (m/s)</div></div>
    <div class="s3-row"><div class="s3-f">Q = k · i · A</div><div class="s3-n">Q: lưu lượng (m³/s)</div></div>
    <div class="s3-row"><div class="s3-f">i = Δh / L</div><div class="s3-n">gradient thủy lực</div></div>
    <div class="s3-row"><div class="s3-f">i_cr ≈ (G_s−1)/(1+e) ≈ 1.0</div><div class="s3-n">gradient tới hạn (xói ngầm)</div></div>
  </div>
</div>

<div class="s3-sec">
  <h4>B. Xác định hệ số thấm k</h4>
  <div class="s3-body">
    <div class="s3-row"><div class="s3-f">k = Q·L / (A·Δh)</div><div class="s3-n">Cột nước không đổi</div></div>
    <div class="s3-row"><div class="s3-f">k = (a·L)/(A·t) · ln(h₁/h₂)</div><div class="s3-n">Cột nước thay đổi</div></div>
    <div class="s3-row"><div class="s3-f">k_h = Σ(kᵢhᵢ)/Σhᵢ</div><div class="s3-n">Tương đương ngang (song song)</div></div>
    <div class="s3-row"><div class="s3-f">k_v = Σhᵢ / Σ(hᵢ/kᵢ)</div><div class="s3-n">Tương đương đứng (nối tiếp)</div></div>
  </div>
</div>

<div class="s3-sec">
  <h4>C. Biến dạng – TN Oedometer</h4>
  <div class="s3-body">
    <div class="s3-row"><div class="s3-f">Sᵢ = h₀ − hᵢ</div><div class="s3-n">Độ lún từ TN (mm)</div></div>
    <div class="s3-row"><div class="s3-f">eᵢ = e₀ − (Sᵢ/h₀)·(1+e₀)</div><div class="s3-n">Hệ số rỗng tại cấp tải σᵢ</div></div>
    <div class="s3-row"><div class="s3-f">a_{i-j} = (eᵢ−eⱼ)/(σⱼ−σᵢ)</div><div class="s3-n">Hệ số nén (cm²/kG)</div></div>
    <div class="s3-row"><div class="s3-f">m_v = a/(1+e₀)</div><div class="s3-n">Hệ số nén thể tích</div></div>
    <div class="s3-row"><div class="s3-f">S = h₀·m_v·Δσ</div><div class="s3-n">Tính lún đơn giản</div></div>
    <div class="s3-row"><div class="s3-f">S = h₀/(1+e₀)·(e₀−eⱼ)</div><div class="s3-n">Tính lún qua hệ số rỗng</div></div>
  </div>
</div>

<div class="s3-sec">
  <h4>D. Tính chống cắt – Mohr-Coulomb</h4>
  <div class="s3-body">
    <div class="s3-row"><div class="s3-f">τ_f = c + σ·tanφ</div><div class="s3-n">Bao phá hoại Mohr-Coulomb</div></div>
    <div class="s3-row"><div class="s3-f">τ_f = c' + σ'·tanφ'</div><div class="s3-n">Dùng thông số hữu hiệu</div></div>
    <div class="s3-row"><div class="s3-f">σ' = σ − u</div><div class="s3-n">Ứng suất hữu hiệu (Terzaghi)</div></div>
    <div class="s3-row"><div class="s3-f">σ = P/A ; τ = T/A</div><div class="s3-n">TN cắt phẳng</div></div>
    <div class="s3-row"><div class="s3-f">tanφ = (τ₂−τ₁)/(σ₂−σ₁)</div><div class="s3-n">Xác định φ từ 2 điểm</div></div>
    <div class="s3-row"><div class="s3-f">σ'₁ = σ₁−u ; σ'₃ = σ₃−u</div><div class="s3-n">TN nén 3 trục</div></div>
  </div>
</div>

<div class="s3-sec">
  <h4>E. Phân loại TN chống cắt</h4>
  <div class="s3-body">
    <div class="s3-row"><div class="s3-f">UU – Unconsolidated Undrained</div><div class="s3-n">Không cố kết, không thoát nước → φ=0, τ=c_u</div></div>
    <div class="s3-row"><div class="s3-f">CU – Consolidated Undrained</div><div class="s3-n">Cố kết, không thoát nước → đo u → c', φ'</div></div>
    <div class="s3-row"><div class="s3-f">CD – Consolidated Drained</div><div class="s3-n">Cố kết, thoát nước → u=0 → c', φ' trực tiếp</div></div>
  </div>
</div>`,
  hint: '',
  genData(rng){ return {}; },
  statement(d){ return 'Xem tổng hợp công thức bên trên – không có câu hỏi tính toán trong bài này.'; },
  questions: []
};
