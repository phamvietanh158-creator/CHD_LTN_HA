// ═══════════════════════════════════════════════════════════════════
//  exercises/ch6.js
//  Chương 6: Sức chịu tải của nền và ổn định mái dốc
//  TS. Phạm Việt Anh – ĐHXD Hà Nội
// ═══════════════════════════════════════════════════════════════════

// ── HẰNG SỐ DÙNG CHUNG ──────────────────────────────────────────────

const TERZAGHI_DATA = {
  phi:    [ 0,  5, 10, 15, 17, 18, 20, 22, 25, 28, 30, 32, 35],
  n_gamma:[ 0.0, 0.5, 1.2, 2.5, 3.4, 3.9, 5.0, 6.4, 9.7,15.4,19.7,24.5,42.4],
  n_q:   [ 1.0, 1.6, 2.7, 4.4, 5.5, 6.0, 7.4, 9.2,12.7,17.8,22.5,28.5,41.4],
  n_c:   [ 5.7, 7.3, 9.6,12.9,14.6,15.5,17.7,20.3,25.1,31.6,37.2,44.0,57.8]
};

const BANG_TERZAGHI_HTML = `
<div style="margin-top:10px;">
  <div style="font-size:.8rem;font-weight:700;color:#1565c0;margin-bottom:6px;">
    📊 Bảng tra hệ số sức chịu tải Terzaghi N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub> theo φ
  </div>
  <table style="border-collapse:collapse;font-size:.78rem;width:100%;">
    <thead>
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:4px 6px;">φ°</th>
        <th style="padding:4px 6px;">N<sub>γ</sub></th>
        <th style="padding:4px 6px;">N<sub>q</sub></th>
        <th style="padding:4px 6px;">N<sub>c</sub></th>
        <th style="padding:4px 6px;">φ°</th>
        <th style="padding:4px 6px;">N<sub>γ</sub></th>
        <th style="padding:4px 6px;">N<sub>q</sub></th>
        <th style="padding:4px 6px;">N<sub>c</sub></th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#f7faff;text-align:center;">
        <td>0</td><td>0.0</td><td>1.0</td><td>5.7</td>
        <td>18</td><td>3.9</td><td>6.0</td><td>15.5</td>
      </tr>
      <tr style="text-align:center;">
        <td>5</td><td>0.5</td><td>1.6</td><td>7.3</td>
        <td>20</td><td>5.0</td><td>7.4</td><td>17.7</td>
      </tr>
      <tr style="background:#f7faff;text-align:center;">
        <td>10</td><td>1.2</td><td>2.7</td><td>9.6</td>
        <td>25</td><td>9.7</td><td>12.7</td><td>25.1</td>
      </tr>
      <tr style="text-align:center;">
        <td>15</td><td>2.5</td><td>4.4</td><td>12.9</td>
        <td>30</td><td>19.7</td><td>22.5</td><td>37.2</td>
      </tr>
      <tr style="background:#f7faff;text-align:center;">
        <td>17</td><td>3.4</td><td>5.5</td><td>14.6</td>
        <td>35</td><td>42.4</td><td>41.4</td><td>57.8</td>
      </tr>
    </tbody>
  </table>
</div>`;

// Bảng hệ số hình dạng α cho bài toán không gian
const BANG_HINH_DANG_HTML = `
<div style="margin-top:10px;">
  <div style="font-size:.8rem;font-weight:700;color:#1565c0;margin-bottom:5px;">
    📋 Hệ số hình dạng α<sub>i</sub> (bài toán không gian)
  </div>
  <table style="border-collapse:collapse;font-size:.78rem;width:100%;">
    <thead>
      <tr style="background:#e3f2fd;color:#0d47a1;text-align:center;">
        <th style="padding:4px 8px;border:1px solid #90caf9;">Loại móng</th>
        <th style="padding:4px 8px;border:1px solid #90caf9;">α₁</th>
        <th style="padding:4px 8px;border:1px solid #90caf9;">α₂</th>
        <th style="padding:4px 8px;border:1px solid #90caf9;">α₃</th>
      </tr>
    </thead>
    <tbody>
      <tr style="text-align:center;">
        <td style="border:1px solid #90caf9;padding:4px 8px;">Tròn</td>
        <td style="border:1px solid #90caf9;">0.3</td>
        <td style="border:1px solid #90caf9;">1.0</td>
        <td style="border:1px solid #90caf9;">1.3</td>
      </tr>
      <tr style="background:#f7faff;text-align:center;">
        <td style="border:1px solid #90caf9;padding:4px 8px;">Vuông</td>
        <td style="border:1px solid #90caf9;">0.4</td>
        <td style="border:1px solid #90caf9;">1.0</td>
        <td style="border:1px solid #90caf9;">1.3</td>
      </tr>
      <tr style="text-align:center;">
        <td style="border:1px solid #90caf9;padding:4px 8px;">Chữ nhật</td>
        <td style="border:1px solid #90caf9;">1 − 0.2b/l</td>
        <td style="border:1px solid #90caf9;">1.0</td>
        <td style="border:1px solid #90caf9;">1 + 0.2b/l</td>
      </tr>
    </tbody>
  </table>
</div>`;

// SVG sơ đồ móng băng tổng quát – nâng cấp
const SVG_MONG_BANG = `
<svg viewBox="0 0 440 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  <defs>
    <marker id="mb-dn" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#c62828"/></marker>
    <marker id="mb-dn2" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#e65100"/></marker>
    <marker id="mb-r" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1565c0"/></marker>
    <marker id="mb-l" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto-start-reverse"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1565c0"/></marker>
    <pattern id="mb-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#bcaaa4" stroke-width="1.5"/>
    </pattern>
    <linearGradient id="mb-soil" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#efebe9"/>
      <stop offset="100%" stop-color="#d7ccc8"/>
    </linearGradient>
    <linearGradient id="mb-found" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#90a4ae"/>
      <stop offset="100%" stop-color="#607d8b"/>
    </linearGradient>
    <linearGradient id="mb-nền" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#c8e6c9"/>
      <stop offset="100%" stop-color="#a5d6a7"/>
    </linearGradient>
  </defs>
  <!-- Nền -->
  <rect x="0" y="0" width="440" height="195" fill="#fafbff" rx="8"/>
  <!-- Đất hông (texture) -->
  <rect x="25" y="52" width="130" height="75" fill="url(#mb-soil)"/>
  <rect x="25" y="52" width="130" height="75" fill="url(#mb-hatch)" opacity="0.45"/>
  <rect x="285" y="52" width="130" height="75" fill="url(#mb-soil)"/>
  <rect x="285" y="52" width="130" height="75" fill="url(#mb-hatch)" opacity="0.45"/>
  <!-- Đất nền dưới -->
  <rect x="25" y="127" width="390" height="58" fill="url(#mb-nền)" rx="0 0 6 6"/>
  <text x="220" y="163" text-anchor="middle" font-size="11" fill="#1b5e20" font-weight="600">Đất nền: c, φ, γ</text>
  <!-- Mặt đất tự nhiên -->
  <line x1="8" y1="52" x2="432" y2="52" stroke="#5d4037" stroke-width="2"/>
  <text x="340" y="46" font-size="9.5" fill="#5d4037" font-style="italic">Mặt đất tự nhiên</text>
  <!-- Gạch chéo mặt đất -->
  <line x1="8" y1="52" x2="20" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="25" y1="52" x2="37" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="42" y1="52" x2="54" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="320" y1="52" x2="332" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="348" y1="52" x2="360" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="376" y1="52" x2="388" y2="62" stroke="#5d4037" stroke-width="0.8"/>
  <!-- MÓNG -->
  <rect x="155" y="52" width="130" height="75" fill="url(#mb-found)" stroke="#37474f" stroke-width="2" rx="2"/>
  <text x="220" y="93" text-anchor="middle" font-size="12" fill="#fff" font-weight="700">MÓNG BĂNG</text>
  <text x="220" y="108" text-anchor="middle" font-size="9" fill="#cfd8dc">b × l</text>
  <!-- Tải P trên móng -->
  <line x1="220" y1="18" x2="220" y2="50" stroke="#c62828" stroke-width="2.5" marker-end="url(#mb-dn)"/>
  <rect x="195" y="8" width="50" height="14" fill="#ffebee" rx="3" stroke="#ef9a9a" stroke-width="1"/>
  <text x="220" y="18" text-anchor="middle" font-size="10" fill="#c62828" font-weight="700">P (tải)</text>
  <!-- q mũi tên bên hông -->
  <line x1="88" y1="22" x2="88" y2="50" stroke="#e65100" stroke-width="2" marker-end="url(#mb-dn2)"/>
  <rect x="55" y="12" width="66" height="14" fill="#fff3e0" rx="3" stroke="#ffb74d" stroke-width="1"/>
  <text x="88" y="22" text-anchor="middle" font-size="9" fill="#e65100" font-weight="600">q = γ·h_m</text>
  <!-- Kích thước h_m -->
  <line x1="12" y1="52" x2="12" y2="127" stroke="#e53935" stroke-width="1.5" marker-end="url(#mb-dn)"/>
  <line x1="8" y1="52" x2="16" y2="52" stroke="#e53935" stroke-width="1.5"/>
  <line x1="8" y1="127" x2="16" y2="127" stroke="#e53935" stroke-width="1.5"/>
  <text x="3" y="96" font-size="10" fill="#e53935" font-weight="700">h_m</text>
  <!-- Kích thước b -->
  <line x1="155" y1="187" x2="285" y2="187" stroke="#1565c0" stroke-width="1.5" marker-start="url(#mb-l)" marker-end="url(#mb-r)"/>
  <rect x="200" y="180" width="40" height="13" fill="#e3f2fd" rx="3"/>
  <text x="220" y="190" text-anchor="middle" font-size="10" fill="#1565c0" font-weight="700">b</text>
</svg>`;

// SVG mái dốc vô hạn đất rời – nâng cấp
const SVG_MAI_DOC_ROI = `
<svg viewBox="0 0 420 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:420px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  <defs>
    <marker id="dr-dn" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#2e7d32"/></marker>
    <marker id="dr-p" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#7b1fa2"/></marker>
    <linearGradient id="dr-sand" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="100%" stop-color="#ffe082"/>
    </linearGradient>
  </defs>
  <rect width="420" height="210" fill="#f0f4ff" rx="8"/>
  <!-- Thân mái đất cát -->
  <polygon points="30,185 400,185 400,75 30,185" fill="url(#dr-sand)" stroke="#f9a825" stroke-width="2"/>
  <!-- Texture cát -->
  <line x1="80" y1="170" x2="140" y2="153" stroke="#f9a825" stroke-width="0.7" opacity="0.6"/>
  <line x1="130" y1="175" x2="220" y2="148" stroke="#f9a825" stroke-width="0.7" opacity="0.6"/>
  <line x1="200" y1="178" x2="320" y2="143" stroke="#f9a825" stroke-width="0.7" opacity="0.6"/>
  <line x1="270" y1="180" x2="390" y2="150" stroke="#f9a825" stroke-width="0.7" opacity="0.6"/>
  <!-- Nền đáy -->
  <rect x="0" y="185" width="420" height="25" fill="#a5d6a7" stroke="#388e3c" stroke-width="1"/>
  <!-- Mặt mái (đường nghiêng) -->
  <line x1="30" y1="185" x2="400" y2="75" stroke="#e53935" stroke-width="2.5"/>
  <!-- Khối ABCD nổi bật -->
  <polygon points="130,155 260,120 260,185 130,185" fill="rgba(21,101,192,0.2)" stroke="#1565c0" stroke-width="2"/>
  <text x="195" y="158" text-anchor="middle" font-size="11" fill="#1565c0" font-weight="700">Khối ABCD</text>
  <!-- Nhãn góc β -->
  <path d="M 55,185 A 28,28 0 0,0 47,162" fill="none" stroke="#e53935" stroke-width="2"/>
  <text x="66" y="178" font-size="13" fill="#e53935" font-weight="700">β</text>
  <!-- Lực W (trọng lượng) -->
  <line x1="195" y1="145" x2="195" y2="178" stroke="#2e7d32" stroke-width="2.5" marker-end="url(#dr-dn)"/>
  <rect x="173" y="132" width="44" height="14" fill="#e8f5e9" rx="3" stroke="#81c784" stroke-width="1"/>
  <text x="195" y="142" text-anchor="middle" font-size="9.5" fill="#1b5e20" font-weight="600">W·cosβ</text>
  <!-- Chiều sâu z -->
  <line x1="270" y1="120" x2="270" y2="185" stroke="#7b1fa2" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#dr-p)"/>
  <rect x="272" y="145" width="18" height="13" fill="#f3e5ff" rx="2"/>
  <text x="281" y="155" text-anchor="middle" font-size="10" fill="#7b1fa2" font-weight="600">z</text>
  <!-- Công thức -->
  <rect x="8" y="8" width="200" height="45" fill="white" rx="6" stroke="#1565c0" stroke-width="1" opacity="0.92"/>
  <text x="18" y="24" font-size="10" fill="#1565c0" font-weight="700">σₙ = γ·z·cos²β</text>
  <text x="18" y="40" font-size="10" fill="#c62828" font-weight="700">τ = γ·z·cosβ·sinβ</text>
  <rect x="220" y="8" width="180" height="28" fill="white" rx="6" stroke="#2e7d32" stroke-width="1" opacity="0.92"/>
  <text x="310" y="27" text-anchor="middle" font-size="11" fill="#2e7d32" font-weight="700">Fₛ = tanφ / tanβ</text>
</svg>`;

// SVG mái dốc đất dính – khối BAC – nâng cấp
const SVG_MAI_DOC_DINH = `
<svg viewBox="0 0 440 215" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:440px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  <defs>
    <marker id="gd-dn" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#1b5e20"/></marker>
    <marker id="gd-r" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e65100"/></marker>
    <linearGradient id="gd-clay" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fff9c4"/>
      <stop offset="100%" stop-color="#ffcc02" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  <rect width="440" height="215" fill="#f5f5f5" rx="8"/>
  <!-- Nền -->
  <rect x="0" y="170" width="440" height="40" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
  <!-- Thân mái đất dính -->
  <polygon points="55,170 360,170 360,55" fill="url(#gd-clay)" stroke="#f9a825" stroke-width="2"/>
  <!-- Vách thẳng đứng -->
  <line x1="360" y1="55" x2="360" y2="170" stroke="#1565c0" stroke-width="2.5"/>
  <!-- Mặt trượt AC (màu đỏ nổi bật) -->
  <line x1="55" y1="170" x2="360" y2="85" stroke="#e53935" stroke-width="2.5"/>
  <!-- Khối BAC tô màu -->
  <polygon points="55,170 360,170 360,85" fill="rgba(21,101,192,0.18)" stroke="#1565c0" stroke-width="1.5"/>
  <!-- Nhãn điểm -->
  <circle cx="55" cy="170" r="4.5" fill="#e53935" stroke="white" stroke-width="1.5"/>
  <text x="34" y="168" font-size="13" fill="#e53935" font-weight="700">A</text>
  <circle cx="360" cy="170" r="4.5" fill="#e53935" stroke="white" stroke-width="1.5"/>
  <text x="366" y="182" font-size="13" fill="#e53935" font-weight="700">B</text>
  <circle cx="360" cy="85" r="4.5" fill="#1565c0" stroke="white" stroke-width="1.5"/>
  <text x="366" y="86" font-size="13" fill="#1565c0" font-weight="700">C</text>
  <!-- Kích thước H -->
  <line x1="388" y1="85" x2="388" y2="170" stroke="#e65100" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#gd-r)"/>
  <line x1="384" y1="85" x2="392" y2="85" stroke="#e65100" stroke-width="1.5"/>
  <line x1="384" y1="170" x2="392" y2="170" stroke="#e65100" stroke-width="1.5"/>
  <text x="394" y="132" font-size="12" fill="#e65100" font-weight="700">H</text>
  <!-- Góc α -->
  <path d="M 80,170 A 32,32 0 0,0 68,145" fill="none" stroke="#e53935" stroke-width="2"/>
  <text x="88" y="165" font-size="13" fill="#e53935" font-weight="700">α</text>
  <!-- Lực G -->
  <line x1="250" y1="142" x2="250" y2="168" stroke="#1b5e20" stroke-width="2.5" marker-end="url(#gd-dn)"/>
  <rect x="225" y="130" width="50" height="14" fill="#e8f5e9" rx="3" stroke="#81c784" stroke-width="1"/>
  <text x="250" y="140" text-anchor="middle" font-size="9.5" fill="#1b5e20" font-weight="600">G (TL khối)</text>
  <!-- Nhãn T N -->
  <text x="110" y="120" font-size="10" fill="#7b1fa2" font-weight="600">T = G·sinα (trượt)</text>
  <text x="110" y="135" font-size="10" fill="#388e3c" font-weight="600">N = G·cosα (pháp tuyến)</text>
  <!-- Công thức K -->
  <rect x="8" y="8" width="340" height="28" fill="white" rx="6" stroke="#c62828" stroke-width="1.5" opacity="0.95"/>
  <text x="178" y="26" text-anchor="middle" font-size="10.5" fill="#c62828" font-weight="700">K = (N·tanφ + c·BA) / T = (G·cosα·tanφ + c·h/sinα) / G·sinα</text>
</svg>`;


// ═══════════════════════════════════════════════════════════════════
// PHẦN 1 – TRẠNG THÁI CÂN BẰNG TẠI MỘT ĐIỂM (Bài 2 trong slide)
// ch6_b1a  MCQ lý thuyết hình thức phá hoại
// ch6_b1b  Tính sinφ_max – kiểm tra trạng thái điểm M (ứng suất chính)
// ch6_b1c  Nghịch: cho CBGH, tìm c khi biết φ
// ═══════════════════════════════════════════════════════════════════

const SVG_PHA_HOAI = `
<svg viewBox="0 0 560 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;display:block;margin:10px auto;">
  <defs>
    <marker id="ph-arr" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#c62828"/></marker>
    <marker id="ph-arr2" markerWidth="7" markerHeight="7" refX="3.5" refY="7" orient="auto"><path d="M0,0 L3.5,7 L7,0 Z" fill="#1565c0"/></marker>
  </defs>

  <!-- ① PHÁ HOẠI TỔNG THỂ -->
  <rect x="2" y="2" width="176" height="176" rx="8" fill="#fffde7" stroke="#f9a825" stroke-width="1.5"/>
  <text x="90" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#e65100">① Tổng thể</text>
  <text x="90" y="29" text-anchor="middle" font-size="8.5" fill="#888">(cát chặt, sét cứng)</text>
  <!-- mặt đất -->
  <line x1="10" y1="50" x2="170" y2="50" stroke="#5d4037" stroke-width="1.5"/>
  <!-- móng -->
  <rect x="68" y="42" width="44" height="18" fill="#90a4ae" stroke="#455a64" stroke-width="1.5" rx="2"/>
  <text x="90" y="55" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold">MÓNG</text>
  <!-- tải P -->
  <line x1="90" y1="25" x2="90" y2="42" stroke="#c62828" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="96" y="36" font-size="9" fill="#c62828" font-weight="bold">P</text>
  <!-- đất nền -->
  <rect x="10" y="60" width="160" height="80" fill="#e8d5b0" rx="3"/>
  <!-- mặt trượt 2 bên rõ ràng -->
  <path d="M68,60 Q30,95 18,130 Q10,150 28,160" fill="none" stroke="#e53935" stroke-width="2" stroke-dasharray="5,3"/>
  <path d="M112,60 Q150,95 162,130 Q170,150 152,160" fill="none" stroke="#e53935" stroke-width="2" stroke-dasharray="5,3"/>
  <!-- đất trồi -->
  <ellipse cx="25" cy="58" rx="16" ry="8" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="25" y="62" text-anchor="middle" font-size="8" fill="#5d4037">trồi</text>
  <ellipse cx="155" cy="58" rx="16" ry="8" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="155" y="62" text-anchor="middle" font-size="8" fill="#5d4037">trồi</text>
  <!-- mũi tên trồi -->
  <line x1="25" y1="68" x2="25" y2="52" stroke="#e65100" stroke-width="1.5" marker-end="url(#ph-arr)"/>
  <line x1="155" y1="68" x2="155" y2="52" stroke="#e65100" stroke-width="1.5" marker-end="url(#ph-arr)"/>
  <text x="90" y="108" text-anchor="middle" font-size="8.5" fill="#555">Mặt trượt rõ ràng</text>
  <text x="90" y="120" text-anchor="middle" font-size="8.5" fill="#c62828" font-weight="600">Biến dạng ngang lớn</text>

  <!-- ② PHÁ HOẠI CỤC BỘ -->
  <rect x="192" y="2" width="176" height="176" rx="8" fill="#f1f8e9" stroke="#81c784" stroke-width="1.5"/>
  <text x="280" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#2e7d32">② Cục bộ</text>
  <text x="280" y="29" text-anchor="middle" font-size="8.5" fill="#888">(cát vừa, sét nửa cứng)</text>
  <line x1="200" y1="50" x2="360" y2="50" stroke="#5d4037" stroke-width="1.5"/>
  <rect x="258" y="42" width="44" height="18" fill="#90a4ae" stroke="#455a64" stroke-width="1.5" rx="2"/>
  <text x="280" y="55" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold">MÓNG</text>
  <line x1="280" y1="25" x2="280" y2="42" stroke="#c62828" stroke-width="2" marker-end="url(#ph-arr)"/>
  <text x="286" y="36" font-size="9" fill="#c62828" font-weight="bold">P</text>
  <rect x="200" y="60" width="160" height="80" fill="#e8d5b0" rx="3"/>
  <!-- mặt phá hoại mờ dần -->
  <path d="M258,60 Q230,85 215,110 Q208,130 218,148" fill="none" stroke="#ffa726" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.8"/>
  <path d="M302,60 Q330,85 345,110 Q352,130 342,148" fill="none" stroke="#ffa726" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.8"/>
  <!-- lún nhiều trước -->
  <rect x="262" y="60" width="36" height="16" fill="#90a4ae" stroke="#455a64" stroke-width="1" rx="1" opacity="0.6"/>
  <text x="280" y="72" text-anchor="middle" font-size="7.5" fill="#333">lún trước</text>
  <text x="280" y="108" text-anchor="middle" font-size="8.5" fill="#555">Mặt trượt không rõ</text>
  <text x="280" y="120" text-anchor="middle" font-size="8.5" fill="#2e7d32" font-weight="600">Lún lớn trước khi phá hoại</text>

  <!-- ③ TRƯỢT SÂU (ĐÂM XUYÊN) -->
  <rect x="382" y="2" width="176" height="176" rx="8" fill="#e3f2fd" stroke="#64b5f6" stroke-width="1.5"/>
  <text x="470" y="18" text-anchor="middle" font-size="10" font-weight="700" fill="#0d47a1">③ Trượt sâu</text>
  <text x="470" y="29" text-anchor="middle" font-size="8.5" fill="#888">(đất rất yếu, móng sâu)</text>
  <line x1="390" y1="50" x2="550" y2="50" stroke="#5d4037" stroke-width="1.5"/>
  <rect x="448" y="42" width="44" height="18" fill="#90a4ae" stroke="#455a64" stroke-width="1.5" rx="2"/>
  <text x="470" y="55" text-anchor="middle" font-size="9" fill="#fff" font-weight="bold">MÓNG</text>
  <line x1="470" y1="22" x2="470" y2="42" stroke="#c62828" stroke-width="3" marker-end="url(#ph-arr)"/>
  <text x="476" y="34" font-size="9" fill="#c62828" font-weight="bold">P</text>
  <rect x="390" y="60" width="160" height="115" fill="#b3cde0" rx="3" opacity="0.7"/>
  <!-- móng chìm xuống -->
  <rect x="448" y="60" width="44" height="30" fill="#78909c" stroke="#455a64" stroke-width="1.5" rx="2"/>
  <text x="470" y="80" text-anchor="middle" font-size="8" fill="#fff">chìm</text>
  <!-- mũi tên xuống mạnh -->
  <line x1="470" y1="90" x2="470" y2="115" stroke="#0d47a1" stroke-width="2.5" marker-end="url(#ph-arr2)"/>
  <!-- không trồi -->
  <text x="415" y="110" font-size="8" fill="#888">không trồi đất</text>
  <text x="470" y="140" text-anchor="middle" font-size="8.5" fill="#555">Không có mặt trượt</text>
  <text x="470" y="152" text-anchor="middle" font-size="8.5" fill="#0d47a1" font-weight="600">Như đóng đinh vào đất</text>
</svg>`;

const LY_THUYET_PHÁ_HOAI_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 SỰ PHÁ HOẠI NỀN ĐẤT – Phân loại Vesic (1973)</div>
  ${SVG_PHA_HOAI}
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:8px;">
    <thead>
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:5px 8px;">Kiểu phá hoại</th>
        <th style="padding:5px 8px;">Dấu hiệu nhận biết</th>
        <th style="padding:5px 8px;">Gặp khi nào</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff9c4;">
        <td style="padding:5px 8px;font-weight:700;color:#e65100;">① Tổng thể</td>
        <td style="padding:5px 8px;">Đất 2 bên móng <b>trồi lên</b>, mặt trượt rõ ràng, biến dạng ngang rất lớn</td>
        <td style="padding:5px 8px;">Nền cát chặt, sét cứng; móng nông</td>
      </tr>
      <tr style="background:#e8f5e9;">
        <td style="padding:5px 8px;font-weight:700;color:#1b5e20;">② Cục bộ</td>
        <td style="padding:5px 8px;">Mặt phá hoại <b>không xác định rõ</b>, lún lớn trước khi đạt tải giới hạn</td>
        <td style="padding:5px 8px;">Cát vừa, sét nửa cứng; móng nông trung</td>
      </tr>
      <tr style="background:#e3f2fd;">
        <td style="padding:5px 8px;font-weight:700;color:#0d47a1;">③ Trượt sâu</td>
        <td style="padding:5px 8px;">Móng <b>chìm như "đóng đinh"</b>, không trồi đất, không quan sát được mặt phá hoại</td>
        <td style="padding:5px 8px;">Đất rất yếu; móng sâu</td>
      </tr>
    </tbody>
  </table>
</div>`;

const LY_THUYET_MOHR_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 TRẠNG THÁI CÂN BẰNG GIỚI HẠN TẠI MỘT ĐIỂM – Mohr-Rankine</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:6px;">
    Kiểm tra điểm M bằng cách tính <strong>sin&theta;<sub>max</sub></strong> và so sánh với sin&phi;:<br>
  </div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
      sin&theta;<sub>max</sub> = (&sigma;₁ − &sigma;₃) / (&sigma;₁ + &sigma;₃ + 2c/tg&phi;)
    </span>
  </div>
  <div style="font-size:.82rem;line-height:1.75;margin-top:4px;">
    → Nếu <strong>sin&theta;<sub>max</sub> &lt; sin&phi;</strong>: điểm M ổn định (cân bằng bền)<br>
    → Nếu <strong>sin&theta;<sub>max</sub> = sin&phi;</strong>: điểm M ở trạng thái CBGH<br>
    → Nếu <strong>sin&theta;<sub>max</sub> &gt; sin&phi;</strong>: điểm M phá hoại (không xảy ra trong thực tế)<br>
    <br>
    Góc lệch ứng suất nguy hiểm: <strong>&theta;<sub>max</sub> = arcsin(sin&theta;<sub>max</sub>)</strong><br>
    Góc mặt phẳng phá hoại: <strong>&alpha;<sub>tr</sub> = 45° + &phi;/2</strong>
  </div>
</div>`;

// ── ch6_b1a: MCQ Lý thuyết hình thức phá hoại ─────────────────────
EXERCISES['ch6_b1a'] = {
  chapterId: 'ch6',
  title: '6.1a – Nhận biết hình thức phá hoại nền đất',
  type: 'guided',
  theoryHTML: LY_THUYET_PHÁ_HOAI_HTML,
  hint: `
    <div class="hint-title">💡 Gợi ý nhận biết</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Chú ý 2 dấu hiệu chính: <br>
      • Đất 2 bên móng có trồi lên không?<br>
      • Mặt phá hoại có quan sát được không?<br>
      • Biến dạng đứng hay ngang là chủ đạo?
    </div>`,
  genData(rng) {
    // 3 câu MCQ xoay vòng theo bộ câu hỏi
    const sets = [
      {
        q: 'Mái dốc phát hiện: đất 2 bên móng trồi rõ ràng, mặt trượt xác định được rõ ràng trên hiện trường, biến dạng ngang rất lớn. Đây là dấu hiệu của:',
        choices: ['A. Phá hoại cục bộ', 'B. Phá hoại tổng thể', 'C. Phá hoại trượt sâu (đâm xuyên)', 'D. Chưa xác định được'],
        correct: 1
      },
      {
        q: 'Quan sát một móng nông trên nền sét nửa cứng thấy: lún lớn trước khi tải trọng đạt giới hạn, mặt phá hoại mở rộng dần từ 2 mép nhưng không xác định rõ. Đây là:',
        choices: ['A. Phá hoại tổng thể', 'B. Phá hoại trượt sâu', 'C. Phá hoại cục bộ', 'D. Nền chưa bị phá hoại'],
        correct: 2
      },
      {
        q: 'Đóng cọc trên nền đất yếu thấy: cọc chìm dần xuống "như đóng đinh", không thấy đất trồi xung quanh, không quan sát được mặt phẳng phá hoại. Đây là kiểu phá hoại:',
        choices: ['A. Phá hoại tổng thể', 'B. Phá hoại cục bộ', 'C. Phá hoại trượt sâu (đâm xuyên)', 'D. Không phá hoại'],
        correct: 2
      },
      {
        q: 'Móng nông trên nền CÁT CHẶT chịu tải tăng dần. Kiểu phá hoại thường gặp nhất là:',
        choices: ['A. Phá hoại trượt sâu', 'B. Phá hoại cục bộ', 'C. Phá hoại tổng thể', 'D. Không có phá hoại'],
        correct: 2
      },
    ];
    const pick = (rng() * sets.length) | 0;
    return { set: sets[pick], idx: sets[pick].correct };
  },
  statement(d) {
    return d.set.q;
  },
  questions: [
    {
      id: 'q1', type: 'mcq',
      label: 'Chọn đáp án đúng:',
      choices: d => d.set.choices,
      correctIndex: d => d.idx
    }
  ]
};

// ── ch6_b1b: Kiểm tra trạng thái điểm M theo Mohr-Rankine ─────────
EXERCISES['ch6_b1b'] = {
  chapterId: 'ch6',
  title: '6.1b – Kiểm tra trạng thái tại điểm M (Mohr-Rankine)',
  type: 'guided',
  theoryHTML: LY_THUYET_MOHR_HTML,
  hint: `
    <div class="hint-title">💡 Trình tự 4 bước</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Tính 2c/tgφ (đơn vị kPa)<br>
      <b>B2.</b> Tính sin&theta;<sub>max</sub> = (σ₁−σ₃) / (σ₁+σ₃+2c/tgφ)<br>
      <b>B3.</b> Tính &theta;<sub>max</sub> = arcsin(sin&theta;<sub>max</sub>)<br>
      <b>B4.</b> So sánh sin&theta;<sub>max</sub> với sinφ → kết luận trạng thái
    </div>`,
  genData(rng) {
    const phi_deg = [15, 20, 22, 25][Math.floor(rng() * 4)];
    const c = Math.floor(8 + rng() * 15); // 8–22 kPa
    const sigma3 = Math.floor(30 + rng() * 40); // 30–70 kPa
    // Tạo sigma1 sao cho điểm M ổn định (sin_theta < sin_phi)
    const phi_rad = phi_deg * Math.PI / 180;
    const sin_phi = Math.sin(phi_rad);
    const cotphi = Math.cos(phi_rad) / Math.sin(phi_rad);
    // Tính sigma1 < sigma1_gh (đặt 70–90% CBGH)
    const ratio = 0.6 + rng() * 0.35;
    const denom = (sigma3 + sigma3 + 2 * c * cotphi);
    const sigma1_cbgh = sigma3 + sin_phi * denom;
    const sigma1 = Math.round(sigma3 + ratio * (sigma1_cbgh - sigma3));

    const sin_theta = (sigma1 - sigma3) / (sigma1 + sigma3 + 2 * c * cotphi);
    const theta_max = r2(Math.asin(sin_theta) * 180 / Math.PI);
    const sin_theta_r = r3(sin_theta);
    const sin_phi_r = r3(sin_phi);
    // Trạng thái: 0=ổn định, 1=CBGH (không thể xảy ra chính xác với số nguyên)
    const state = sin_theta_r < sin_phi_r ? 0 : 1;
    return { phi_deg, c, sigma1, sigma3, sin_theta_r, sin_phi_r, theta_max, state };
  },
  statement(d) {
    return `Điểm M trong nền đất chịu tải, bài toán phẳng. Ứng suất chính tại M: <strong>σ₁ = ${d.sigma1} kPa</strong> và <strong>σ₃ = ${d.sigma3} kPa</strong>. Nền đất sét pha có <strong>c = ${d.c} kPa</strong> và <strong>φ = ${d.phi_deg}°</strong>.<br><br>
    Hãy kiểm tra trạng thái tại điểm M theo thuyết bền Mohr-Rankine.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'sin θ_max =',
      unit: '',
      answer: d => d.sin_theta_r, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: 'sin φ =',
      unit: '',
      answer: d => d.sin_phi_r, tol: 0.005 },
    { id: 'q3', type: 'fill',
      label: 'Góc lệch ứng suất θ_max ≈',
      unit: '°',
      answer: d => d.theta_max, tol: 0.5 },
    { id: 'q4', type: 'mcq',
      label: 'Kết luận trạng thái tại điểm M:',
      choices: d => [
        `A. Điểm M ở trạng thái ổn định (sin θ_max = ${d.sin_theta_r} < sin φ = ${d.sin_phi_r})`,
        `B. Điểm M ở trạng thái cân bằng giới hạn (sin θ_max ≈ sin φ)`
      ],
      correctIndex: d => d.state }
  ]
};

// ── ch6_b1b2: Kiểm tra trạng thái – cho ứng suất TRỰC GIAO σx, σz, τ ──
EXERCISES['ch6_b1b2'] = {
  chapterId: 'ch6',
  title: '6.1b2 – Kiểm tra trạng thái M từ ứng suất trực giao (σx, σz, τxz)',
  type: 'apply',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 TÍNH ỨNG SUẤT CHÍNH TỪ ỨNG SUẤT TRỰC GIAO</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 16px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.92rem;font-weight:700;color:#1565c0;">
      σ₁,₃ = (σz+σx)/2 ± √[((σz−σx)/2)² + τ²]
    </span>
  </div>
  <div style="font-size:.84rem;margin-top:6px;line-height:1.8;">
    Sau khi có σ₁, σ₃ → kiểm tra theo Mohr-Rankine:<br>
    <span style="font-family:monospace;">sinθ = (σ₁−σ₃)/(σ₁+σ₃+2c/tgφ)</span><br>
    So sánh sinθ với sinφ → kết luận
  </div>
</div>`,
  hint: `
    <div class="hint-title">💡 Trình tự</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Tính R = √[((σz−σx)/2)² + τ²]<br>
      <b>B2.</b> σ₁ = (σz+σx)/2 + R ; σ₃ = (σz+σx)/2 − R<br>
      <b>B3.</b> sinθ = (σ₁−σ₃)/(σ₁+σ₃+2c/tgφ) ; so sánh sinφ
    </div>`,
  genData(rng) {
    const phi_deg = [15, 20, 25][Math.floor(rng() * 3)];
    const c = Math.floor(5 + rng() * 20);
    const phi_rad = phi_deg * Math.PI / 180;
    const sin_phi = Math.sin(phi_rad);
    const cotphi = Math.cos(phi_rad) / Math.sin(phi_rad);
    const sz = Math.floor(80 + rng() * 80);
    const sx = Math.floor(30 + rng() * 40);
    const tau = Math.floor(10 + rng() * 30);
    const R = r2(Math.sqrt(((sz - sx) / 2) ** 2 + tau ** 2));
    const s1 = r2((sz + sx) / 2 + R);
    const s3 = r2((sz + sx) / 2 - R);
    const sin_theta = r3((s1 - s3) / (s1 + s3 + 2 * c * cotphi));
    const sin_phi_r = r3(sin_phi);
    const state = sin_theta < sin_phi_r ? 0 : 1;
    return { phi_deg, c, sz, sx, tau, R, s1, s3, sin_theta, sin_phi_r, state };
  },
  statement(d) {
    return `Tại điểm M trong nền đất, đo được các thành phần ứng suất: <strong>σz = ${d.sz} kPa</strong>, <strong>σx = ${d.sx} kPa</strong>, <strong>τxz = ${d.tau} kPa</strong>.<br>
    Đất nền có <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi_deg}°</strong>. Kiểm tra trạng thái tại M.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'R = √[((σz−σx)/2)²+τ²] =', unit: 'kPa', answer: d => d.R, tol: 0.5 },
    { id: 'q2', type: 'fill', label: 'σ₁ =', unit: 'kPa', answer: d => d.s1, tol: 0.5 },
    { id: 'q3', type: 'fill', label: 'σ₃ =', unit: 'kPa', answer: d => d.s3, tol: 0.5 },
    { id: 'q4', type: 'fill', label: 'sin θ_max =', unit: '', answer: d => d.sin_theta, tol: 0.005 },
    { id: 'q5', type: 'mcq',
      label: 'Kết luận trạng thái tại M:',
      choices: d => [
        `A. Điểm M ổn định (sinθ = ${d.sin_theta} < sinφ = ${d.sin_phi_r}) ✓`,
        `B. Điểm M ở CBGH hoặc phá hoại (sinθ ≥ sinφ = ${d.sin_phi_r}) ✗`
      ],
      correctIndex: d => d.state }
  ]
};

// ── ch6_b1b3: Kiểm tra trạng thái – ĐẤT RỜI (c = 0) ────────────────
EXERCISES['ch6_b1b3'] = {
  chapterId: 'ch6',
  title: '6.1b3 – Kiểm tra trạng thái M trong đất rời (c = 0)',
  type: 'apply',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 ĐẤT RỜI (c = 0) – CÔNG THỨC ĐƠN GIẢN HƠN</div>
  <div style="background:#fff;border:2px solid #2e7d32;border-radius:8px;padding:9px 16px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#2e7d32;">
      c = 0 → sinθ = (σ₁−σ₃) / (σ₁+σ₃)
    </span>
  </div>
  <div style="font-size:.84rem;margin-top:6px;color:#444;">
    So sánh sinθ với sinφ để kết luận.<br>
    Điều kiện ổn định: sinθ &lt; sinφ
  </div>
</div>`,
  hint: `<div class="hint-title">💡 Khi c = 0, công thức sinθ rút gọn còn (σ₁−σ₃)/(σ₁+σ₃)</div>`,
  genData(rng) {
    const phi_deg = [25, 28, 30, 32, 35][Math.floor(rng() * 5)];
    const phi_rad = phi_deg * Math.PI / 180;
    const sin_phi = Math.sin(phi_rad);
    const sigma3 = Math.floor(40 + rng() * 60);
    const ratio = 0.55 + rng() * 0.35;
    const sigma1_cbgh = sigma3 * (1 + sin_phi) / (1 - sin_phi);
    const sigma1 = Math.round(sigma3 + ratio * (sigma1_cbgh - sigma3));
    const sin_theta = r3((sigma1 - sigma3) / (sigma1 + sigma3));
    const sin_phi_r = r3(sin_phi);
    const state = sin_theta < sin_phi_r ? 0 : 1;
    return { phi_deg, sigma1, sigma3, sin_theta, sin_phi_r, state };
  },
  statement(d) {
    return `Tại điểm M trong nền <strong>cát (c = 0)</strong>, ứng suất chính: <strong>σ₁ = ${d.sigma1} kPa</strong>, <strong>σ₃ = ${d.sigma3} kPa</strong>.<br>
    Cát có góc ma sát trong <strong>φ = ${d.phi_deg}°</strong>. Kiểm tra trạng thái tại M.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'sin θ = (σ₁−σ₃)/(σ₁+σ₃) =', unit: '', answer: d => d.sin_theta, tol: 0.005 },
    { id: 'q2', type: 'fill', label: 'sin φ =', unit: '', answer: d => d.sin_phi_r, tol: 0.005 },
    { id: 'q3', type: 'mcq',
      label: 'Kết luận:',
      choices: d => [
        `A. Điểm M ổn định (sinθ < sinφ = ${d.sin_phi_r}) ✓`,
        `B. Điểm M ở CBGH hoặc phá hoại ✗`
      ],
      correctIndex: d => d.state }
  ]
};

// ── ch6_b1b4: Tìm σ₁ giới hạn khi biết σ₃, c, φ ──────────────────────
EXERCISES['ch6_b1b4'] = {
  chapterId: 'ch6',
  title: '6.1b4 – Tính ứng suất chính lớn nhất giới hạn σ₁_gh',
  type: 'apply',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 ỨNG SUẤT GIỚI HẠN – CÔNG THỨC RANKINE</div>
  <div style="background:#fff;border:2px solid #c62828;border-radius:8px;padding:9px 16px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#c62828;">
      σ₁_gh = σ₃·tan²(45°+φ/2) + 2c·tan(45°+φ/2)
    </span>
  </div>
  <div style="font-size:.84rem;margin-top:6px;color:#444;">
    Khi σ₁ ≤ σ₁_gh: điểm M ổn định<br>
    Khi σ₁ > σ₁_gh: điểm M bị phá hoại
  </div>
</div>`,
  hint: `<div class="hint-title">💡 Tính tan(45+φ/2), bình phương nó, nhân σ₃ rồi cộng 2c×tan(45+φ/2)</div>`,
  genData(rng) {
    const phi_deg = [15, 20, 22, 25, 28][Math.floor(rng() * 5)];
    const c = Math.floor(5 + rng() * 20);
    const phi_rad = phi_deg * Math.PI / 180;
    const alpha_rad = (45 + phi_deg / 2) * Math.PI / 180;
    const tan_a = Math.tan(alpha_rad);
    const sigma3 = Math.floor(50 + rng() * 80);
    const s1_gh = r2(sigma3 * tan_a * tan_a + 2 * c * tan_a);
    const s1_act = Math.round(s1_gh * (0.7 + rng() * 0.5));
    const safe = s1_act <= s1_gh ? 0 : 1;
    return { phi_deg, c, sigma3, s1_gh, s1_act, safe, tan_a: r3(tan_a) };
  },
  statement(d) {
    return `Đất dính có <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi_deg}°</strong>. Tại điểm M, ứng suất nhỏ <strong>σ₃ = ${d.sigma3} kPa</strong>, ứng suất lớn thực tế <strong>σ₁ = ${d.s1_act} kPa</strong>.<br>
    Tính σ₁ giới hạn và kết luận trạng thái tại M.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'tan(45°+φ/2) =', unit: '', answer: d => d.tan_a, tol: 0.005 },
    { id: 'q2', type: 'fill', label: 'σ₁_gh =', unit: 'kPa', answer: d => d.s1_gh, tol: 2 },
    { id: 'q3', type: 'mcq',
      label: 'Kết luận trạng thái tại M:',
      choices: d => [
        `A. Ổn định – σ₁ = ${d.s1_act} ≤ σ₁_gh = ${d.s1_gh} kPa ✓`,
        `B. Phá hoại – σ₁ = ${d.s1_act} > σ₁_gh = ${d.s1_gh} kPa ✗`
      ],
      correctIndex: d => d.safe }
  ]
};

// ── ch6_b1c: Nghịch – cho CBGH tìm c khi biết φ ───────────────────
EXERCISES['ch6_b1c'] = {
  chapterId: 'ch6',
  title: '6.1c – Xác định lực dính c khi điểm M đạt CBGH',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Biến đổi từ điều kiện CBGH</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Khi điểm M đúng ở CBGH: sin φ = sin θ<sub>max</sub><br><br>
      <div class="hint-formula">sinφ = (σ₁−σ₃) / (σ₁+σ₃+2c/tgφ)</div>
      Giải ra: <strong>c = [ (σ₁−σ₃)/sinφ − (σ₁+σ₃) ] × tgφ / 2</strong>
    </div>`,
  genData(rng) {
    const phi_deg = [15, 18, 20, 22, 25][Math.floor(rng() * 5)];
    const phi_rad = phi_deg * Math.PI / 180;
    const c_true = Math.floor(8 + rng() * 18); // kPa
    const sigma3 = Math.floor(40 + rng() * 40);
    // Tính sigma1 giới hạn đúng
    const cotphi = Math.cos(phi_rad) / Math.sin(phi_rad);
    const sin_phi = Math.sin(phi_rad);
    // CT đúng: σ₁ = σ₃·(1+sinφ)/(1−sinφ) + 2c·cosφ/(1−sinφ)
    const sigma1 = Math.round(sigma3*(1+sin_phi)/(1-sin_phi) + 2*c_true*Math.cos(phi_rad)/(1-sin_phi));
    // c ngược (đảm bảo dương)
    const c_ans = r2(Math.max(0.1, ((sigma1-sigma3)/sin_phi - (sigma1+sigma3)) * Math.tan(phi_rad) / 2));
    return { phi_deg, sigma1, sigma3, c_ans };
  },
  statement(d) {
    return `Trong thí nghiệm nén ba trục, mẫu đất phá hoại cắt khi hai ứng suất chính đạt: <strong>σ₁ = ${d.sigma1} kPa</strong> và <strong>σ₃ = ${d.sigma3} kPa</strong>. Biết góc ma sát trong <strong>φ = ${d.phi_deg}°</strong>.<br><br>
    Giả thiết điểm đất đúng ở trạng thái cân bằng giới hạn (CBGH). Hãy tính lực dính đơn vị c của đất.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Lực dính đơn vị c =',
      unit: 'kPa',
      answer: d => d.c_ans, tol: 0.5 }
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 2 – SỨC CHỊU TẢI NỀN THEO TERZAGHI
// ch6_b2a  Tra bảng N_γ, N_q, N_c theo φ (MCQ + fill)
// ch6_b2b  Tính q = γ·h_m (1 lớp đất)
// ch6_b2c  Tính q khi có 2 lớp đất trên đáy móng
// ch6_b2d  Tính p_gh móng băng (bài thuận – đủ số liệu)
// ch6_b2e  Kiểm tra nền: tính p_tx từ tải trọng, so sánh với [P]
// ch6_b2f  Tổng hợp – cho tải trọng, kích thước, tính ngược F_s
// ═══════════════════════════════════════════════════════════════════

// ── ch6_b2a: Tra bảng hệ số Terzaghi ──────────────────────────────
EXERCISES['ch6_b2a'] = {
  chapterId: 'ch6',
  title: '6.2a – Tra bảng hệ số sức chịu tải Terzaghi',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 HỆ SỐ SỨC CHỊU TẢI TERZAGHI – Cách tra bảng</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:6px;">
    Hệ số N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub> chỉ phụ thuộc vào <strong>φ</strong> (góc ma sát trong của đất dưới đáy móng).<br>
    Tra bảng theo φ → đọc ra bộ 3 hệ số → dùng cho công thức tính p<sub>gh</sub>.
  </div>
  ${BANG_TERZAGHI_HTML}
</div>`,
  hint: `
    <div class="hint-title">💡 Cách tra</div>
    <div style="font-size:.85rem;line-height:1.8;">
      Tìm dòng có φ tương ứng trong bảng trên.<br>
      Đọc giá trị ở cột N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub>.
    </div>`,
  genData(rng) {
    const opts = [
      {phi:0,  ng:0.0, nq:1.0, nc:5.7},
      {phi:10, ng:1.2, nq:2.7, nc:9.6},
      {phi:15, ng:2.5, nq:4.4, nc:12.9},
      {phi:18, ng:3.9, nq:6.0, nc:15.5},
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
      {phi:30, ng:19.7, nq:22.5, nc:37.2},
      {phi:35, ng:42.4, nq:41.4, nc:57.8},
    ];
    const pick = opts[Math.floor(rng() * opts.length)];
    return { phi: pick.phi, ng: pick.ng, nq: pick.nq, nc: pick.nc };
  },
  statement(d) {
    return `Nền đất dưới đáy móng có góc ma sát trong <strong>φ = ${d.phi}°</strong>.<br>
    Tra bảng hệ số sức chịu tải Terzaghi, xác định N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub>.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'N_γ =', unit: '', answer: d => d.ng, tol: 0.05 },
    { id: 'q2', type: 'fill', label: 'N_q =', unit: '', answer: d => d.nq, tol: 0.05 },
    { id: 'q3', type: 'fill', label: 'N_c =', unit: '', answer: d => d.nc, tol: 0.05 },
  ]
};

// ── ch6_b2b: Tính phụ tải q = γ_tb · h_m (1 lớp và 2 lớp) ────────
EXERCISES['ch6_b2b'] = {
  chapterId: 'ch6',
  title: '6.2b – Xác định phụ tải đất bên hông móng q',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 PHỤ TẢI BÊN HÔNG MÓNG q</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:6px;">
    <strong>q</strong> là tải trọng tương đương của đất <em>trên và bên cạnh</em> móng, tính bằng áp lực tại đáy móng:<br>
  </div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:8px 16px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
      1 lớp: q = γ · h<sub>m</sub><br>
      2 lớp: q = γ₁·h₁ + γ₂·h₂ &nbsp;(h₁+h₂ = h<sub>m</sub>)
    </span>
  </div>
  ${SVG_MONG_BANG}
</div>`,
  hint: `
    <div class="hint-title">💡 Gợi ý</div>
    <div style="font-size:.85rem;line-height:1.8;">
      Nhân trọng lượng riêng từng lớp với chiều dày lớp đó rồi cộng lại.<br>
      γ<sub>tb</sub> = (γ₁·h₁ + γ₂·h₂) / h<sub>m</sub> nếu muốn tính trung bình.
    </div>`,
  genData(rng) {
    const two_layers = rng() > 0.45;
    if (!two_layers) {
      const gamma = r2(17.5 + rng() * 2.0);
      const hm = r2(1.0 + rng() * 1.2);
      const q = r2(gamma * hm);
      return { two_layers, gamma, hm, q };
    } else {
      const h1 = r2(0.6 + rng() * 0.6);
      const h2 = r2(0.5 + rng() * 0.7);
      const hm = r2(h1 + h2);
      const gamma1 = r2(17.0 + rng() * 1.5);
      const gamma2 = r2(18.5 + rng() * 1.5);
      const q = r2(gamma1 * h1 + gamma2 * h2);
      return { two_layers, h1, h2, hm, gamma1, gamma2, q };
    }
  },
  statement(d) {
    if (!d.two_layers) {
      return `Móng băng đặt ở độ sâu chôn móng <strong>h<sub>m</sub> = ${d.hm} m</strong>. Đất phủ trên đáy móng đồng nhất có <strong>γ = ${d.gamma} kN/m³</strong>.<br>Tính phụ tải đất bên hông móng q.`;
    } else {
      return `Móng băng đặt ở độ sâu <strong>h<sub>m</sub> = ${d.hm} m</strong> gồm 2 lớp đất phủ:<br>
      • Lớp 1 dày <strong>h₁ = ${d.h1} m</strong>, γ₁ = ${d.gamma1} kN/m³<br>
      • Lớp 2 dày <strong>h₂ = ${d.h2} m</strong>, γ₂ = ${d.gamma2} kN/m³<br>
      Tính phụ tải đất bên hông móng q.`;
    }
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Phụ tải đất hông móng q =', unit: 'kPa', answer: d => d.q, tol: 0.3 }
  ]
};

// ── ch6_b2c: Tính p_gh móng băng (bài thuận, đủ số liệu) ──────────
EXERCISES['ch6_b2c'] = {
  chapterId: 'ch6',
  title: '6.2c – Sức chịu tải giới hạn nền móng băng (Terzaghi)',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 CÔNG THỨC TERZAGHI – MÓNG BĂNG</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
      p<sub>gh</sub> = ½·N<sub>γ</sub>·b·γ + N<sub>q</sub>·q + N<sub>c</sub>·c
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:6px;line-height:1.75;">
    Trong đó: b = bề rộng đáy móng; q = γ<sub>tb</sub>·h<sub>m</sub> (phụ tải hông); c, φ, γ của đất <em>dưới</em> đáy móng.<br>
    N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub> tra bảng Terzaghi theo φ.
  </div>
  ${BANG_TERZAGHI_HTML}
  ${SVG_MONG_BANG}
</div>`,
  hint: `
    <div class="hint-title">💡 Các bước tính</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Tính q = γ·h<sub>m</sub><br>
      <b>B2.</b> Tra N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub> theo φ (đã cho sẵn trong bài)<br>
      <b>B3.</b> Tính p<sub>gh</sub> = ½·N<sub>γ</sub>·b·γ + N<sub>q</sub>·q + N<sub>c</sub>·c
    </div>`,
  genData(rng) {
    const opts = [
      {phi:15, ng:2.5, nq:4.4, nc:12.9},
      {phi:18, ng:3.9, nq:6.0, nc:15.5},
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
      {phi:30, ng:19.7, nq:22.5, nc:37.2},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const b = r2(1.0 + rng() * 1.5);
    const hm = r2(1.0 + rng() * 1.2);
    const gamma = r2(17.5 + rng() * 2.0);
    const c = Math.floor(rng() > 0.5 ? 0 : (8 + rng() * 15));
    const q = r2(gamma * hm);
    const p_gh = r2(0.5 * o.ng * b * gamma + o.nq * q + o.nc * c);
    return { phi: o.phi, ng: o.ng, nq: o.nq, nc: o.nc, b, hm, gamma, c, q, p_gh };
  },
  statement(d) {
    return `Cho móng băng bề rộng <strong>b = ${d.b} m</strong>, chiều sâu chôn móng <strong>h<sub>m</sub> = ${d.hm} m</strong>.<br>
    Nền đất đồng nhất dưới đáy móng: <strong>γ = ${d.gamma} kN/m³</strong>, <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi}°</strong>.<br>
    Hệ số Terzaghi tra sẵn: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}, N<sub>c</sub> = ${d.nc}.<br><br>
    Theo lời giải Terzaghi, tính sức chịu tải giới hạn p<sub>gh</sub>.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Phụ tải hông móng q =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q2', type: 'fill', label: 'Sức chịu tải giới hạn p_gh =', unit: 'kPa', answer: d => d.p_gh, tol: 2.0 },
  ]
};

// ── ch6_b2d: Bài toán không gian – móng vuông/tròn/chữ nhật ────────
EXERCISES['ch6_b2d'] = {
  chapterId: 'ch6',
  title: '6.2d – Sức chịu tải móng không gian (vuông / tròn / chữ nhật)',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 TERZAGHI – BÀI TOÁN KHÔNG GIAN</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.92rem;font-weight:700;color:#1565c0;">
      p<sub>gh</sub> = α₁·½·N<sub>γ</sub>·b·γ + α₂·N<sub>q</sub>·q + α₃·N<sub>c</sub>·c
    </span>
  </div>
  ${BANG_HINH_DANG_HTML}
  ${BANG_TERZAGHI_HTML}
</div>`,
  hint: `
    <div class="hint-title">💡 Gợi ý tra hệ số hình dạng</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Tra bảng α theo loại móng → thay vào công thức không gian.<br>
      <b>Vuông:</b> α₁=0.4, α₂=1.0, α₃=1.3<br>
      <b>Tròn:</b> α₁=0.3, α₂=1.0, α₃=1.3
    </div>`,
  genData(rng) {
    const opts = [
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const type = ['vuông', 'tròn'][Math.floor(rng() * 2)];
    const a1 = type === 'tròn' ? 0.3 : 0.4;
    const a3 = 1.3;
    const b = r2(1.2 + rng() * 1.0);
    const hm = r2(1.0 + rng() * 1.0);
    const gamma = r2(18.0 + rng() * 1.5);
    const c = Math.floor(10 + rng() * 12);
    const q = r2(gamma * hm);
    const p_gh = r2(a1 * 0.5 * o.ng * b * gamma + o.nq * q + a3 * o.nc * c);
    return { phi: o.phi, ng: o.ng, nq: o.nq, nc: o.nc, b, hm, gamma, c, q, p_gh, type, a1, a3 };
  },
  statement(d) {
    return `Tính sức chịu tải giới hạn p<sub>gh</sub> cho móng <strong>${d.type}</strong> (bài toán không gian), kích thước <strong>b = ${d.b} m</strong>, chiều sâu chôn móng <strong>h<sub>m</sub> = ${d.hm} m</strong>.<br>
    Đất nền: <strong>γ = ${d.gamma} kN/m³</strong>, <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi}°</strong>.<br>
    Hệ số Terzaghi: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}, N<sub>c</sub> = ${d.nc}.<br>
    Hệ số hình dạng: α₁ = ${d.a1}, α₂ = 1.0, α₃ = ${d.a3}.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Phụ tải hông q =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q2', type: 'fill', label: 'p_gh =', unit: 'kPa', answer: d => d.p_gh, tol: 2.5 },
  ]
};

// ── ch6_b2d2: SCT không gian – đất RỜI (c=0), móng vuông ──────────
EXERCISES['ch6_b2d2'] = {
  chapterId: 'ch6',
  title: '6.2d2 – SCT không gian móng vuông trên đất rời (c = 0)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đất rời c = 0 → bỏ hạng Nc</div>
    <div style="font-size:.85rem;line-height:1.85;">
      p<sub>gh</sub> = α₁·½·N<sub>γ</sub>·b·γ + α₂·N<sub>q</sub>·q<br>
      Móng vuông: α₁ = 0.4, α₂ = 1.0
    </div>
    ${BANG_TERZAGHI_HTML}`,
  genData(rng) {
    const opts = [
      {phi:25, ng:9.7,  nq:12.7},
      {phi:28, ng:15.4, nq:17.8},
      {phi:30, ng:19.7, nq:22.5},
      {phi:32, ng:24.5, nq:28.5},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const b = r2(1.0 + rng() * 1.2);
    const hm = r2(1.0 + rng() * 1.0);
    const gamma = r2(18.0 + rng() * 1.5);
    const q = r2(gamma * hm);
    const p_gh = r2(0.4 * 0.5 * o.ng * b * gamma + 1.0 * o.nq * q);
    return { phi: o.phi, ng: o.ng, nq: o.nq, b, hm, gamma, q, p_gh };
  },
  statement(d) {
    return `Móng <strong>vuông</strong> kích thước b = <strong>${d.b} m</strong>, chôn sâu h<sub>m</sub> = <strong>${d.hm} m</strong>.<br>
    Đất nền là <strong>cát</strong> (c = 0): γ = <strong>${d.gamma} kN/m³</strong>, φ = <strong>${d.phi}°</strong>.<br>
    Hệ số Terzaghi: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}. Hệ số hình dạng: α₁ = 0.4, α₂ = 1.0.<br>
    Tính sức chịu tải giới hạn p<sub>gh</sub>.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'q = γ·h_m =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q2', type: 'fill', label: 'p_gh =', unit: 'kPa', answer: d => d.p_gh, tol: 3 },
  ]
};

// ── ch6_b2d3: SCT không gian – đất DÍNH (φ=0), móng tròn ──────────
EXERCISES['ch6_b2d3'] = {
  chapterId: 'ch6',
  title: '6.2d3 – SCT không gian móng tròn trên đất dính (φ = 0)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Đất sét bão hòa φ=0 → bỏ hạng Nγ và Nq</div>
    <div style="font-size:.85rem;line-height:1.85;">
      p<sub>gh</sub> = α₃·N<sub>c</sub>·c + N<sub>q</sub>·q<br>
      Khi φ=0: N<sub>c</sub> = 5.7, N<sub>q</sub> = 1.0, N<sub>γ</sub> = 0<br>
      Móng tròn: α₃ = 1.3
    </div>`,
  genData(rng) {
    const b = r2(1.0 + rng() * 1.5);
    const hm = r2(1.0 + rng() * 1.0);
    const gamma = r2(17.5 + rng() * 2.0);
    const c = Math.floor(15 + rng() * 25);
    const q = r2(gamma * hm);
    const p_gh = r2(1.3 * 5.7 * c + 1.0 * q);
    return { b, hm, gamma, c, q, p_gh };
  },
  statement(d) {
    return `Móng <strong>tròn</strong> đường kính D = <strong>${d.b} m</strong>, chôn sâu h<sub>m</sub> = <strong>${d.hm} m</strong>.<br>
    Đất nền là <strong>sét bão hòa (φ = 0)</strong>: γ = <strong>${d.gamma} kN/m³</strong>, c<sub>u</sub> = <strong>${d.c} kPa</strong>.<br>
    Khi φ=0: N<sub>γ</sub>=0, N<sub>q</sub>=1.0, N<sub>c</sub>=5.7. Hệ số hình dạng: α₃ = 1.3.<br>
    Tính sức chịu tải giới hạn p<sub>gh</sub>.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'q = γ·h_m =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q2', type: 'fill', label: 'p_gh = 1.3·Nc·c + Nq·q =', unit: 'kPa', answer: d => d.p_gh, tol: 2 },
  ]
};

// ── ch6_b2d4: SCT không gian – móng CHỮ NHẬT, đất dính ────────────
EXERCISES['ch6_b2d4'] = {
  chapterId: 'ch6',
  title: '6.2d4 – SCT không gian móng chữ nhật (hệ số α theo b/l)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Hệ số hình dạng chữ nhật</div>
    <div style="font-size:.85rem;line-height:1.85;">
      α₁ = 1 − 0.2·b/l &nbsp; α₂ = 1.0 &nbsp; α₃ = 1 + 0.2·b/l
    </div>
    ${BANG_TERZAGHI_HTML}`,
  genData(rng) {
    const opts = [
      {phi:15, ng:2.5, nq:4.4, nc:12.9},
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const b = r2(1.2 + rng() * 0.8);
    const l = r2(b * (1.5 + rng() * 1.5));
    const hm = r2(1.0 + rng() * 1.0);
    const gamma = r2(17.5 + rng() * 2.0);
    const c = Math.floor(8 + rng() * 15);
    const a1 = r2(1 - 0.2 * b / l);
    const a3 = r2(1 + 0.2 * b / l);
    const q = r2(gamma * hm);
    const p_gh = r2(a1 * 0.5 * o.ng * b * gamma + 1.0 * o.nq * q + a3 * o.nc * c);
    return { phi: o.phi, ng: o.ng, nq: o.nq, nc: o.nc, b, l, hm, gamma, c, a1, a3, q, p_gh };
  },
  statement(d) {
    return `Móng <strong>chữ nhật</strong> b×l = <strong>${d.b}×${d.l} m</strong>, chôn sâu h<sub>m</sub> = <strong>${d.hm} m</strong>.<br>
    Đất nền: γ = <strong>${d.gamma} kN/m³</strong>, c = <strong>${d.c} kPa</strong>, φ = <strong>${d.phi}°</strong>.<br>
    Hệ số Terzaghi: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}, N<sub>c</sub> = ${d.nc}.<br>
    Tính hệ số hình dạng α₁, α₃ và p<sub>gh</sub>.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'α₁ = 1−0.2·b/l =', unit: '', answer: d => d.a1, tol: 0.02 },
    { id: 'q2', type: 'fill', label: 'α₃ = 1+0.2·b/l =', unit: '', answer: d => d.a3, tol: 0.02 },
    { id: 'q3', type: 'fill', label: 'q = γ·h_m =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q4', type: 'fill', label: 'p_gh =', unit: 'kPa', answer: d => d.p_gh, tol: 3 },
  ]
};

// ── ch6_b2e: Kiểm tra nền – tính p_tx từ tải trọng, tìm F_s ───────
EXERCISES['ch6_b2e'] = {
  chapterId: 'ch6',
  title: '6.2e – Kiểm tra nền: tính áp lực tiếp xúc và hệ số an toàn',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Công thức kiểm tra</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Áp lực tiếp xúc:</b> p<sub>tx</sub> = N / (b·l)  (móng băng: l = 1 m/m dài)<br>
      <b>Hệ số an toàn:</b> F<sub>s</sub> = p<sub>gh</sub> / p<sub>tx</sub><br>
      <b>Áp lực cho phép:</b> [P] = p<sub>gh</sub> / F<sub>s</sub><br>
      <b>Kết luận nền an toàn khi:</b> F<sub>s</sub> ≥ [F<sub>s</sub>] (thường [F<sub>s</sub>] = 2.5 – 3.0)
    </div>`,
  genData(rng) {
    const opts = [
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
      {phi:30, ng:19.7, nq:22.5, nc:37.2},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const b = r2(1.0 + rng() * 1.2);
    const hm = r2(1.0 + rng() * 0.8);
    const gamma = r2(17.5 + rng() * 2.0);
    const c = o.phi >= 25 ? 0 : Math.floor(8 + rng() * 12);
    const q = r2(gamma * hm);
    const p_gh = r2(0.5 * o.ng * b * gamma + o.nq * q + o.nc * c);
    // Tải trọng cột nhà (kN) để tạo p_tx hợp lý
    const N = r2((p_gh * b) * (0.45 + rng() * 0.35));
    const p_tx = r2(N / b);
    const fs = r2(p_gh / p_tx);
    // Fs yêu cầu ngẫu nhiên 2.5 hoặc 3.0
    const fs_yc = rng() > 0.5 ? 3.0 : 2.5;
    const safe = fs >= fs_yc ? 0 : 1;
    return { phi: o.phi, ng: o.ng, nq: o.nq, nc: o.nc, b, hm, gamma, c, q, p_gh, N, p_tx, fs, fs_yc, safe };
  },
  statement(d) {
    return `Cột nhà có tải trọng tính toán truyền xuống móng <strong>N = ${d.N} kN/m dài</strong>. Móng băng bề rộng <strong>b = ${d.b} m</strong>, chiều sâu chôn móng <strong>h<sub>m</sub> = ${d.hm} m</strong>.<br>
    Đất nền: <strong>γ = ${d.gamma} kN/m³</strong>, <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi}°</strong>.<br>
    Hệ số Terzaghi đã tra: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}, N<sub>c</sub> = ${d.nc}. Đã tính được p<sub>gh</sub> = ${d.p_gh} kPa.<br><br>
    Kiểm tra điều kiện an toàn của nền (lấy [F<sub>s</sub>] = ${d.fs_yc}).`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Áp lực tiếp xúc dưới đáy móng p_tx =', unit: 'kPa', answer: d => d.p_tx, tol: 0.5 },
    { id: 'q2', type: 'fill', label: 'Hệ số an toàn thực tế F_s =', unit: '', answer: d => d.fs, tol: 0.05 },
    { id: 'q3', type: 'mcq',
      label: 'Đánh giá nền đất:',
      choices: d => [
        `A. Nền đảm bảo an toàn (F_s ≥ [F_s] = ${d.fs_yc}) ✓`,
        `B. Nền KHÔNG an toàn, cần điều chỉnh (F_s < [F_s] = ${d.fs_yc}) ✗`
      ],
      correctIndex: d => d.safe }
  ]
};

// ── ch6_b2z: Tổng hợp SCT – cho tải, kích thước, tính đầy đủ ──────
EXERCISES['ch6_b2z'] = {
  chapterId: 'ch6',
  title: '6.2z – Tổng hợp: Xác định SCT và kiểm tra nền móng',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📋 TRÌNH TỰ BÀI TOÁN SCT TỔNG HỢP</div>
  <div style="font-size:.85rem;line-height:1.75;margin-top:6px;">
    <b>Bước 1:</b> Tra N<sub>γ</sub>, N<sub>q</sub>, N<sub>c</sub> theo φ<br>
    <b>Bước 2:</b> Tính q = γ·h<sub>m</sub> (hoặc Σγ<sub>i</sub>·h<sub>i</sub>)<br>
    <b>Bước 3:</b> Tính p<sub>gh</sub> theo công thức Terzaghi (có hệ số hình dạng α nếu không gian)<br>
    <b>Bước 4:</b> Tính áp lực tiếp xúc p<sub>tx</sub> = N / (b·l)<br>
    <b>Bước 5:</b> Tính F<sub>s</sub> = p<sub>gh</sub> / p<sub>tx</sub> → kết luận
  </div>
  ${BANG_TERZAGHI_HTML}
  ${SVG_MONG_BANG}
</div>`,
  hint: `
    <div class="hint-title">💡 Lần lượt từng bước</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Làm tuần tự từ B1 → B5, mỗi kết quả trung gian dùng cho bước tiếp theo.
    </div>`,
  genData(rng) {
    const opts = [
      {phi:15, ng:2.5, nq:4.4, nc:12.9},
      {phi:20, ng:5.0, nq:7.4, nc:17.7},
      {phi:25, ng:9.7, nq:12.7, nc:25.1},
    ];
    const o = opts[Math.floor(rng() * opts.length)];
    const b = r2(1.2 + rng() * 1.0);
    const l = r2(b * (1.5 + rng() * 2.0)); // móng chữ nhật
    const hm = r2(1.0 + rng() * 1.0);
    const gamma = r2(17.5 + rng() * 2.0);
    const c = Math.floor(10 + rng() * 10);
    // Hệ số hình dạng chữ nhật
    const a1 = r2(1 - 0.2 * b / l);
    const a3 = r2(1 + 0.2 * b / l);
    const q = r2(gamma * hm);
    const p_gh = r2(a1 * 0.5 * o.ng * b * gamma + o.nq * q + a3 * o.nc * c);
    const p_allow = r2(p_gh / 3.0);
    const N_kN = r2(b * l * p_allow * (0.6 + rng() * 0.3));
    const p_tx = r2(N_kN / (b * l));
    const fs = r2(p_gh / p_tx);
    const fs_yc = rng() > 0.5 ? 3.0 : 2.5;
    const safe = fs >= fs_yc ? 0 : 1;
    return { phi: o.phi, ng: o.ng, nq: o.nq, nc: o.nc, b, l, hm, gamma, c, a1, a3, q, p_gh, N_kN, p_tx, fs, fs_yc, safe };
  },
  statement(d) {
    return `Cột nhà có tải trọng tính toán truyền xuống móng <strong>N = ${d.N_kN} kN</strong>. Móng đơn hình chữ nhật kích thước <strong>b × l = ${d.b} × ${d.l} m</strong>, chiều sâu chôn móng <strong>h<sub>m</sub> = ${d.hm} m</strong>.<br>
    Đất nền: <strong>γ = ${d.gamma} kN/m³</strong>, <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi}°</strong>.<br>
    Hệ số Terzaghi tra sẵn: N<sub>γ</sub> = ${d.ng}, N<sub>q</sub> = ${d.nq}, N<sub>c</sub> = ${d.nc}.<br>
    Hệ số hình dạng chữ nhật: α₁ = ${d.a1}, α₂ = 1.0, α₃ = ${d.a3}.<br><br>
    Hãy tính đầy đủ và đánh giá nền.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Phụ tải hông móng q =', unit: 'kPa', answer: d => d.q, tol: 0.3 },
    { id: 'q2', type: 'fill', label: 'Sức chịu tải giới hạn p_gh =', unit: 'kPa', answer: d => d.p_gh, tol: 3.0 },
    { id: 'q3', type: 'fill', label: 'Áp lực tiếp xúc p_tx = N / (b·l) =', unit: 'kPa', answer: d => d.p_tx, tol: 0.5 },
    { id: 'q4', type: 'fill', label: 'Hệ số an toàn F_s =', unit: '', answer: d => d.fs, tol: 0.1 },
    { id: 'q5', type: 'mcq',
      label: 'Kết luận về nền:',
      choices: d => [
        `A. Nền đảm bảo an toàn (F_s ≥ [F_s] = ${d.fs_yc}) ✓`,
        `B. Nền CHƯA đảm bảo (F_s < [F_s] = ${d.fs_yc}) ✗`
      ],
      correctIndex: d => d.safe }
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 3 – ỔN ĐỊNH MÁI DỐC
// ch6_b3a  MCQ lý thuyết ổn định mái dốc
// ch6_b3b  Mái dốc đất RỜI vô hạn – tính F_s
// ch6_b3c  Mái dốc đất RỜI vô hạn – tìm β_max khi biết F_s
// ch6_b3d  Mái dốc đất DÍNH – tính hệ số K theo khối BAC
// ch6_b3e  Tìm chiều cao đào lớn nhất h_max (đất dính, β=90°)
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_MAI_DOC_HTML = `
<div class="theory-block">
  <div class="theory-label">⛰️ ỔN ĐỊNH MÁI DỐC – Phương pháp cân bằng khối trượt rắn</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:6px;">
    <strong>Hệ số ổn định K</strong> (hay hệ số an toàn F<sub>s</sub>) = Lực giữ / Lực gây trượt<br><br>
    <strong>Mái dốc vô hạn, đất RỜI (c = 0):</strong>
  </div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:8px 18px;margin:6px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#1565c0;">
      F<sub>s</sub> = tgφ / tgβ
    </span>
  </div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:6px;">
    <strong>Mái dốc đất DÍNH, mặt trượt phẳng qua chân mái (góc α):</strong>
  </div>
  <div style="background:#fff;border:2px solid #e53935;border-radius:8px;padding:8px 18px;margin:6px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#c62828;">
      K = (G·tgφ·cosα + c·BA) / (G·sinα)
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:6px;color:#444;">
    BA = h / sinα; &nbsp; G = ½·γ·h²/tgα &nbsp;(vách thẳng đứng)
  </div>
  ${SVG_MAI_DOC_DINH}
</div>`;

// ── ch6_b3a: MCQ Lý thuyết ổn định mái dốc ────────────────────────
EXERCISES['ch6_b3a'] = {
  chapterId: 'ch6',
  title: '6.3a – Lý thuyết ổn định mái dốc (MCQ)',
  type: 'guided',
  theoryHTML: LY_THUYET_MAI_DOC_HTML,
  hint: `
    <div class="hint-title">💡 Gợi ý</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Đọc kỹ phân loại: mặt trượt phẳng, cung tròn, hỗn hợp.<br>
      Hệ số ổn định K > [K] = 1 thì mái dốc an toàn.
    </div>`,
  genData(rng) {
    const sets = [
      {
        q: 'Đối với mái dốc đất cát khô vô hạn (c = 0), điều kiện để mái dốc ổn định là:',
        choices: ['A. β < φ', 'B. β > φ', 'C. β = φ', 'D. β = 45° + φ/2'],
        correct: 0
      },
      {
        q: 'Phương pháp cân bằng khối trượt rắn giả định khối trượt ở trạng thái:',
        choices: [
          'A. Đàn hồi tuyến tính',
          'B. Cân bằng giới hạn (mặt trượt đã hình thành)',
          'C. Biến dạng dẻo hoàn toàn',
          'D. Chưa bị ứng suất'
        ],
        correct: 1
      },
      {
        q: 'Điều kiện để mái dốc đảm bảo ổn định về trượt là:',
        choices: [
          'A. K ≥ [K] hoặc F_s ≥ [F_s]',
          'B. K ≤ [K]',
          'C. K = 1.0',
          'D. Không cần điều kiện'
        ],
        correct: 0
      },
      {
        q: 'Với mái dốc đất cát khô (c=0), hệ số an toàn F_s phụ thuộc vào:',
        choices: [
          'A. Chiều cao mái H và trọng lượng riêng γ',
          'B. Chỉ góc dốc β',
          'C. Tỉ số tgφ / tgβ (không phụ thuộc chiều sâu z)',
          'D. Cả b, γ, c và φ'
        ],
        correct: 2
      },
    ];
    const pick = (rng() * sets.length) | 0;
    return { set: sets[pick], idx: sets[pick].correct };
  },
  statement(d) { return d.set.q; },
  questions: [
    { id: 'q1', type: 'mcq',
      label: 'Chọn đáp án đúng:',
      choices: d => d.set.choices,
      correctIndex: d => d.idx }
  ]
};

// ── ch6_b3b: Mái dốc đất rời vô hạn – tính F_s ────────────────────
EXERCISES['ch6_b3b'] = {
  chapterId: 'ch6',
  title: '6.3b – Hệ số ổn định mái dốc đất rời vô hạn',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">⛰️ MÁI DỐC VÔ HẠN – ĐẤT RỜI KHÔ (c = 0)</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Khi c = 0, ứng suất cắt và sức kháng cắt trên mặt trượt song song với mặt mái:
  </div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.97rem;font-weight:700;color:#1565c0;">
      F<sub>s</sub> = tgφ / tgβ
    </span>
  </div>
  <div style="font-size:.82rem;color:#444;">
    → Chú ý: F<sub>s</sub> không phụ thuộc độ sâu z hay trọng lượng riêng γ (chúng triệt tiêu nhau).
  </div>
  ${SVG_MAI_DOC_ROI}
</div>`,
  hint: `
    <div class="hint-title">💡 Lưu ý đổi đơn vị</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Đổi cả φ và β sang radian trước khi tính tan:<br>
      <b>F_s = tan(φ_rad) / tan(β_rad)</b>
    </div>`,
  genData(rng) {
    const phi = Math.floor(28 + rng() * 8); // 28–35°
    const beta = Math.floor(18 + rng() * (phi - 18 - 2)); // beta < phi
    const fs = r2(Math.tan(phi * Math.PI / 180) / Math.tan(beta * Math.PI / 180));
    return { phi, beta, fs };
  },
  statement(d) {
    return `Mái dốc cát khô dài vô hạn có góc nghiêng <strong>β = ${d.beta}°</strong>. Thí nghiệm cho biết góc ma sát trong của cát <strong>φ = ${d.phi}°</strong>.<br><br>
    Tính hệ số an toàn ổn định chống trượt của mái dốc. Kết luận mái dốc có an toàn không?`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Hệ số an toàn F_s =', unit: '', answer: d => d.fs, tol: 0.05 },
    { id: 'q2', type: 'mcq',
      label: 'Kết luận:',
      choices: d => [
        `A. Mái dốc ổn định (F_s = ${d.fs} > 1)`,
        `B. Mái dốc mất ổn định (F_s = ${d.fs} < 1)`
      ],
      correctIndex: d => d.fs >= 1 ? 0 : 1 }
  ]
};

// ── ch6_b3c: Mái dốc đất rời – tìm β_max khi biết F_s ─────────────
EXERCISES['ch6_b3c'] = {
  chapterId: 'ch6',
  title: '6.3c – Góc dốc lớn nhất cho phép (mái dốc đất rời)',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Nghịch từ công thức</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Từ F<sub>s</sub> = tgφ / tgβ → suy ra:<br>
      <div class="hint-formula">tgβ = tgφ / F_s</div>
      → β = arctan(tgφ / F_s)
    </div>`,
  genData(rng) {
    const phi = Math.floor(28 + rng() * 8);
    const fs = r2(1.2 + rng() * 0.8); // Fs = 1.2 – 2.0
    const tan_beta = Math.tan(phi * Math.PI / 180) / fs;
    const beta_max = r2(Math.atan(tan_beta) * 180 / Math.PI);
    return { phi, fs, beta_max };
  },
  statement(d) {
    return `Mái dốc đất cát khô vô hạn có góc ma sát trong <strong>φ = ${d.phi}°</strong>. Yêu cầu thiết kế hệ số an toàn tối thiểu <strong>[F<sub>s</sub>] = ${d.fs}</strong>.<br><br>
    Xác định góc nghiêng mái lớn nhất β<sub>max</sub> được phép để đảm bảo ổn định.`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Góc nghiêng mái tối đa β_max =', unit: '°', answer: d => d.beta_max, tol: 0.3 }
  ]
};

// ── ch6_b3d: Mái đất dính – hệ số ổn định K khối BAC ──────────────
EXERCISES['ch6_b3d'] = {
  chapterId: 'ch6',
  title: '6.3d – Hệ số ổn định mái đất dính (mặt trượt phẳng)',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">⛰️ MÁI ĐẤT DÍNH – MẶT TRƯỢT PHẲNG QUA CHÂN MÁI</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Khối trượt BAC là hình tam giác vuông. Xét cân bằng lực dọc mặt trượt BA:
  </div>
  <div style="background:#fff;border:2px solid #c62828;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.93rem;font-weight:700;color:#c62828;">
      K = (N·tgφ + c·BA) / T
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:4px;color:#444;">
    Với: T = G·sinα; &nbsp; N = G·cosα; &nbsp; BA = h/sinα<br>
    G = ½·γ·h²·(cosα/sinα − cosβ/sinβ) &nbsp;(hình chữ nhật tổng quát)<br>
    Trường hợp đơn giản mặt AB ngang (α = mặt trượt, β = 90°): G = ½·γ·(h/tgα)·h
  </div>
  ${SVG_MAI_DOC_DINH}
</div>`,
  hint: `
    <div class="hint-title">💡 Trình tự 4 bước</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Tính G = ½·γ·h²/tgα (khối tam giác, vách đứng)<br>
      <b>B2.</b> Tính BA = h/sinα<br>
      <b>B3.</b> Tính T = G·sinα, N = G·cosα<br>
      <b>B4.</b> K = (N·tgφ + c·BA) / T
    </div>`,
  genData(rng) {
    const phi_deg = Math.floor(15 + rng() * 10); // 15–25°
    const c = Math.floor(8 + rng() * 12);
    const gamma = r2(17.5 + rng() * 2.0);
    const h = r2(4.0 + rng() * 4.0); // chiều cao mái 4–8m
    const alpha_deg = Math.floor(30 + rng() * 20); // 30–50°
    const alpha_rad = alpha_deg * Math.PI / 180;
    const phi_rad = phi_deg * Math.PI / 180;
    // Vách thẳng đứng (β=90°): G = ½γh²cotα
    const G = r2(0.5 * gamma * h * h / Math.tan(alpha_rad));
    const BA = r2(h / Math.sin(alpha_rad));
    const T = r2(G * Math.sin(alpha_rad));
    const N = r2(G * Math.cos(alpha_rad));
    const K = r2((N * Math.tan(phi_rad) + c * BA) / T);
    const K_yc = rng() > 0.5 ? 1.4 : 1.5;
    const safe = K >= K_yc ? 0 : 1;
    return { phi_deg, c, gamma, h, alpha_deg, G, BA, T, N, K, safe, K_yc };
  },
  statement(d) {
    return `Một mái đất dính cao <strong>H = ${d.h} m</strong> (vách đào thẳng đứng). Đất có: <strong>γ = ${d.gamma} kN/m³</strong>, <strong>c = ${d.c} kPa</strong>, <strong>φ = ${d.phi_deg}°</strong>.<br>
    Giả thiết mặt trượt phẳng BA đi qua chân mái với góc <strong>α = ${d.alpha_deg}°</strong> so với phương ngang.<br><br>
    Tính hệ số ổn định K của khối trượt BAC (tính trên 1m dài).`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Trọng lượng khối đất trượt G =', unit: 'kN/m', answer: d => d.G, tol: 1.5 },
    { id: 'q2', type: 'fill', label: 'Chiều dài mặt trượt BA =', unit: 'm', answer: d => d.BA, tol: 0.1 },
    { id: 'q3', type: 'fill', label: 'Lực gây trượt T = G·sinα =', unit: 'kN/m', answer: d => d.T, tol: 1.5 },
    { id: 'q4', type: 'fill', label: 'Hệ số ổn định K =', unit: '', answer: d => d.K, tol: 0.05 },
    { id: 'q5', type: 'mcq',
      label: 'Kết luận:',
      choices: d => [
        `A. Mái đất ổn định (K ≥ [K] = ${d.K_yc}) ✓`,
        `B. Mái đất KHÔNG đủ ổn định (K < [K] = ${d.K_yc}) ✗`
      ],
      correctIndex: d => d.safe }
  ]
};

// ── ch6_b3e: Chiều cao đào lớn nhất h_max (vách thẳng đứng) ────────
EXERCISES['ch6_b3e'] = {
  chapterId: 'ch6',
  title: '6.3e – Chiều cao đào thẳng đứng lớn nhất h_max',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">⛰️ CHIỀU CAO ĐÀO THẲNG ĐỨNG LỚN NHẤT</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Với vách đào thẳng đứng (β = 90°), xét mặt trượt nguy hiểm nhất (α = 45° + φ/2), chiều cao đào tối đa:
  </div>
  <div style="background:#fff;border:2px solid #c62828;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#c62828;">
      h<sub>max</sub> = (4c/γ) · tg(45° + φ/2)
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:4px;color:#444;">
    Trường hợp đặc biệt đất sét thuần túy (φ = 0): h<sub>max</sub> = 4c/γ
  </div>
  ${SVG_MAI_DOC_DINH}
</div>`,
  hint: `
    <div class="hint-title">💡 Công thức thẳng đường</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <div class="hint-formula">h_max = (4·c / γ) · tan(45° + φ/2)</div>
      Đổi (45 + φ/2) sang radian trước khi tính tan.
    </div>`,
  genData(rng) {
    const phi_deg = [0, 10, 15, 20][Math.floor(rng() * 4)];
    const c_u = r2(8 + rng() * 15); // 8–23 kPa
    const gamma = r2(17.0 + rng() * 2.0);
    const angle_rad = (45 + phi_deg / 2) * Math.PI / 180;
    const h_max = r2((4 * c_u / gamma) * Math.tan(angle_rad));
    return { phi_deg, c_u, gamma, h_max };
  },
  statement(d) {
    return `Một nền đất dính có: trọng lượng riêng <strong>γ = ${d.gamma} kN/m³</strong>, lực dính đơn vị <strong>c = ${d.c_u} kPa</strong>, góc ma sát trong <strong>φ = ${d.phi_deg}°</strong>.<br><br>
    Khi tiến hành đào hố móng thẳng đứng, chiều sâu đào tối đa có thể thực hiện mà vẫn đảm bảo an toàn chống sụt mái là bao nhiêu?`;
  },
  questions: [
    { id: 'q1', type: 'fill', label: 'Chiều cao đào thẳng đứng tối đa h_max =', unit: 'm', answer: d => d.h_max, tol: 0.1 }
  ]
};


// ═══════════════════════════════════════════════════════════════════
// TÓM TẮT CÔNG THỨC CUỐI CHƯƠNG 6
// ═══════════════════════════════════════════════════════════════════

EXERCISES['ch6_tomtat'] = {
  chapterId: 'ch6',
  title: '6.★ Tóm tắt công thức Chương 6',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📚 TÓM TẮT CÔNG THỨC – CHƯƠNG 6: SCT NỀN & ỔN ĐỊNH MÁI DỐC</div>

  <div style="margin-top:12px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ A. TRẠNG THÁI TẠI MỘT ĐIỂM (Mohr-Rankine)</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;width:40%;font-weight:700;">Ứng suất chính giới hạn</td>
      <td style="padding:5px 8px;font-family:monospace;">σ₁ = σ₃·tan²(45°+φ/2) + 2c·tan(45°+φ/2)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Kiểm tra trạng thái M</td>
      <td style="padding:5px 8px;font-family:monospace;">sinθ_max = (σ₁−σ₃)/(σ₁+σ₃+2c/tgφ) ; so với sinφ</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;">Góc mặt trượt nguy hiểm</td>
      <td style="padding:5px 8px;font-family:monospace;">α_tr = 45° + φ/2</td>
    </tr>
  </table>

  <div style="margin-top:14px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ B. SỨC CHỊU TẢI TERZAGHI</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;width:40%;font-weight:700;">Móng băng (bài phẳng)</td>
      <td style="padding:5px 8px;font-family:monospace;">p_gh = ½·Nγ·b·γ + Nq·q + Nc·c</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Móng không gian</td>
      <td style="padding:5px 8px;font-family:monospace;">p_gh = α₁·½·Nγ·b·γ + α₂·Nq·q + α₃·Nc·c</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;">Hệ số hình dạng</td>
      <td style="padding:5px 8px;">Vuông: α₁=0.4, α₃=1.3 &nbsp;|&nbsp; Tròn: α₁=0.3, α₃=1.3</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Phụ tải hông móng</td>
      <td style="padding:5px 8px;font-family:monospace;">q = γ_tb·h_m (1 lớp) hoặc Σγᵢ·hᵢ</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;">Áp lực cho phép</td>
      <td style="padding:5px 8px;font-family:monospace;">[P] = p_gh / F_s ; F_s thường = 2.5 – 3.0</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Kiểm tra nền</td>
      <td style="padding:5px 8px;font-family:monospace;">p_tx = N/(b·l) ≤ [P] = p_gh/F_s</td>
    </tr>
  </table>
  ${BANG_TERZAGHI_HTML}
  ${BANG_HINH_DANG_HTML}

  <div style="margin-top:14px;font-weight:700;color:#c62828;font-size:.9rem;">▸ C. ỔN ĐỊNH MÁI DỐC</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#fce4ec;">
      <td style="padding:5px 8px;width:40%;font-weight:700;">Đất rời vô hạn (c=0)</td>
      <td style="padding:5px 8px;font-family:monospace;">F_s = tgφ / tgβ &nbsp;; điều kiện ổn định: β &lt; φ</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Đất dính – mặt trượt phẳng</td>
      <td style="padding:5px 8px;font-family:monospace;">K = (G·tgφ·cosα + c·BA) / (G·sinα)</td>
    </tr>
    <tr style="background:#fce4ec;">
      <td style="padding:5px 8px;font-weight:700;">Chiều cao đào tối đa (vách đứng)</td>
      <td style="padding:5px 8px;font-family:monospace;">h_max = (4c/γ)·tg(45°+φ/2)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Sét thuần (φ=0)</td>
      <td style="padding:5px 8px;font-family:monospace;">h_max = 4c/γ</td>
    </tr>
    <tr style="background:#fce4ec;">
      <td style="padding:5px 8px;font-weight:700;">Kết luận ổn định</td>
      <td style="padding:5px 8px;">K ≥ [K] = 1.0 (tối thiểu) hoặc [K] = 1.4 – 1.5 (thiết kế)</td>
    </tr>
  </table>
  <div style="margin-top:10px;font-size:.8rem;color:#555;">
    <strong>Ghi chú:</strong> α<sub>nguy hiểm nhất</sub> = 45° + φ/2 (cực tiểu hàm h theo α, cực đại hàm K nghịch → cực tiểu K)
  </div>
</div>`,
  hint: `<div class="hint-title">📌 Tóm tắt toàn bộ công thức chương 6 – không có câu hỏi tính toán.</div>`,
  genData(rng) { return {}; },
  statement(d) { return ''; },
  questions: []
};
