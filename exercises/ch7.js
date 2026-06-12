// ═══════════════════════════════════════════════════════════════════
//  exercises/ch7.js
//  Chương 7: Áp lực đất lên tường chắn
//  TS. Phạm Việt Anh – ĐHXD Hà Nội
// ═══════════════════════════════════════════════════════════════════

// ── HẰNG SỐ HTML DÙNG CHUNG ─────────────────────────────────────

// ── DEFS CHUNG cho tất cả SVG ──
// Quy ước: line(x1,y1 → x2,y2) luôn đi từ GỐC → ĐÍCH
// marker-end tại đích → mũi tên chỉ về hướng line đang đi
// orient="auto" → mũi tên tự xoay đúng hướng với path chuẩn M0,0 L10,3.5 L0,7

const _DEFS = `
  <defs>
    <marker id="a-red"  markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,3.5 L0,7 Z" fill="#e53935"/></marker>
    <marker id="a-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,3.5 L0,7 Z" fill="#1565c0"/></marker>
    <marker id="a-org"  markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,3.5 L0,7 Z" fill="#e65100"/></marker>
    <marker id="a-grn"  markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,3.5 L0,7 Z" fill="#1b5e20"/></marker>
    <marker id="a-pur"  markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,3.5 L0,7 Z" fill="#7b1fa2"/></marker>
    <marker id="a-dn-r" markerWidth="7" markerHeight="10" refX="3.5" refY="9" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L3.5,10 L7,0 Z" fill="#e53935"/></marker>
    <marker id="a-dn-b" markerWidth="7" markerHeight="10" refX="3.5" refY="9" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L3.5,10 L7,0 Z" fill="#1565c0"/></marker>
    <marker id="a-dn-o" markerWidth="7" markerHeight="10" refX="3.5" refY="9" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L3.5,10 L7,0 Z" fill="#e65100"/></marker>
    <marker id="a-dn-g" markerWidth="7" markerHeight="10" refX="3.5" refY="9" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L3.5,10 L7,0 Z" fill="#1b5e20"/></marker>
    <marker id="a-up-r" markerWidth="7" markerHeight="10" refX="3.5" refY="1" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,10 L3.5,0 L7,10 Z" fill="#e53935"/></marker>
    <pattern id="hatch-sand" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="12" stroke="#bcaaa4" stroke-width="1.5"/></pattern>
    <pattern id="hatch-clay" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="12" stroke="#a5d6a7" stroke-width="1.5"/></pattern>
    <linearGradient id="g-sand" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff9c4"/><stop offset="100%" stop-color="#ffe082"/></linearGradient>
    <linearGradient id="g-clay" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="100%" stop-color="#c8e6c9"/></linearGradient>
    <linearGradient id="g-wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#90a4ae"/><stop offset="100%" stop-color="#607d8b"/></linearGradient>
    <linearGradient id="g-pb" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="rgba(21,101,192,0.35)"/><stop offset="100%" stop-color="rgba(21,101,192,0.05)"/></linearGradient>
    <linearGradient id="g-nền" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#90a4ae"/><stop offset="100%" stop-color="#607d8b"/></linearGradient>
  </defs>`;

// ─── SVG TƯỜNG CHẮN ĐẤT RỜI (biểu đồ tam giác) ──────────────────
const SVG_TUONG_CHAN_ROI = `
<svg viewBox="0 0 460 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:460px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  ${_DEFS}
  <rect width="460" height="230" fill="#f8faff" rx="8"/>
  <!-- Đất sau tường -->
  <rect x="15" y="20" width="160" height="185" fill="url(#g-sand)"/>
  <rect x="15" y="20" width="160" height="185" fill="url(#hatch-sand)" opacity="0.4"/>
  <!-- Mặt đất -->
  <line x1="8" y1="20" x2="185" y2="20" stroke="#5d4037" stroke-width="2"/>
  <line x1="8" y1="20" x2="20" y2="30" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="25" y1="20" x2="37" y2="30" stroke="#5d4037" stroke-width="0.8"/>
  <line x1="42" y1="20" x2="54" y2="30" stroke="#5d4037" stroke-width="0.8"/>
  <text x="15" y="14" font-size="9.5" fill="#5d4037" font-style="italic">Mặt đất tự nhiên</text>
  <!-- Tường chắn -->
  <rect x="175" y="20" width="26" height="185" fill="url(#g-wall)" stroke="#37474f" stroke-width="2" rx="1"/>
  <text x="188" y="113" text-anchor="middle" font-size="9" fill="#fff" font-weight="700" transform="rotate(-90,188,113)">TƯỜNG CHẮN</text>
  <!-- Nền -->
  <rect x="15" y="205" width="420" height="18" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
  <!-- Biểu đồ áp lực TAM GIÁC: đỉnh tại (201,20), đáy tại (201,205), góc tại (370,205) -->
  <polygon points="201,20 201,205 370,205" fill="url(#g-pb)" stroke="#1565c0" stroke-width="2"/>
  <!-- Mũi tên áp lực: từ phải → trái vào tường (x1 > x2, marker-end ở x2) -->
  <line x1="360" y1="205" x2="204" y2="205" stroke="#e53935" stroke-width="2"   marker-end="url(#a-red)"/>
  <line x1="326" y1="168" x2="204" y2="168" stroke="#e53935" stroke-width="1.5" marker-end="url(#a-red)" opacity="0.7"/>
  <line x1="285" y1="131" x2="204" y2="131" stroke="#e53935" stroke-width="1.5" marker-end="url(#a-red)" opacity="0.5"/>
  <line x1="244" y1="94"  x2="204" y2="94"  stroke="#e53935" stroke-width="1"   marker-end="url(#a-red)" opacity="0.35"/>
  <!-- Nhãn p_max -->
  <rect x="345" y="196" width="100" height="16" fill="white" rx="3" opacity="0.9"/>
  <text x="395" y="207" text-anchor="middle" font-size="9.5" fill="#e53935" font-weight="700">p = Ka·γ·H</text>
  <!-- Kích thước H: từ trên xuống, marker-end ở dưới -->
  <line x1="428" y1="20" x2="428" y2="205" stroke="#e65100" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#a-dn-o)"/>
  <line x1="422" y1="20"  x2="434" y2="20"  stroke="#e65100" stroke-width="1.5"/>
  <line x1="422" y1="205" x2="434" y2="205" stroke="#e65100" stroke-width="1.5"/>
  <rect x="432" y="105" width="22" height="16" fill="white" rx="3" opacity="0.9"/>
  <text x="443" y="117" text-anchor="middle" font-size="13" fill="#e65100" font-weight="700">H</text>
  <!-- H/3 -->
  <line x1="201" y1="143" x2="340" y2="143" stroke="#7b1fa2" stroke-width="1.2" stroke-dasharray="4,3"/>
  <rect x="306" y="134" width="38" height="14" fill="white" rx="3" opacity="0.9"/>
  <text x="325" y="144" text-anchor="middle" font-size="9.5" fill="#7b1fa2" font-weight="600">H/3</text>
  <!-- E hợp lực: từ phải → trái -->
  <line x1="355" y1="185" x2="204" y2="185" stroke="#1565c0" stroke-width="2.5" marker-end="url(#a-blue)"/>
  <rect x="358" y="177" width="88" height="16" fill="#e3f2fd" rx="3" stroke="#90caf9" stroke-width="1"/>
  <text x="402" y="189" text-anchor="middle" font-size="9.5" fill="#1565c0" font-weight="700">E=½·Ka·γ·H²</text>
  <!-- Thông số đất -->
  <rect x="28" y="90" width="105" height="44" fill="white" rx="5" opacity="0.88" stroke="#f9a825" stroke-width="1"/>
  <text x="81" y="108" text-anchor="middle" font-size="11" fill="#1b5e20" font-weight="700">γ, φ (c = 0)</text>
  <text x="81" y="124" text-anchor="middle" font-size="9.5" fill="#555">Ka = tg²(45−φ/2)</text>
</svg>`;

// ─── SVG TƯỜNG ĐẤT DÍNH (vùng hc âm) ────────────────────────────
const SVG_TUONG_DINH = `
<svg viewBox="0 0 470 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:470px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  ${_DEFS}
  <rect width="470" height="250" fill="#f8faff" rx="8"/>
  <!-- Đất sau tường -->
  <rect x="15" y="20" width="160" height="200" fill="url(#g-clay)"/>
  <rect x="15" y="20" width="160" height="200" fill="url(#hatch-clay)" opacity="0.5"/>
  <!-- Mặt đất -->
  <line x1="8" y1="20" x2="185" y2="20" stroke="#5d4037" stroke-width="2"/>
  <text x="15" y="14" font-size="9.5" fill="#5d4037" font-style="italic">Mặt đất</text>
  <!-- Tường -->
  <rect x="175" y="20" width="26" height="200" fill="url(#g-wall)" stroke="#37474f" stroke-width="2" rx="1"/>
  <text x="188" y="120" text-anchor="middle" font-size="9" fill="#fff" font-weight="700" transform="rotate(-90,188,120)">TƯỜNG CHẮN</text>
  <!-- Nền -->
  <rect x="15" y="220" width="440" height="18" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
  <!-- Vùng âm (hc) -->
  <rect x="201" y="20" width="75" height="70" fill="rgba(229,57,53,0.08)" stroke="#e53935" stroke-width="1.5" stroke-dasharray="5,3" rx="2"/>
  <text x="240" y="52" text-anchor="middle" font-size="9" fill="#e53935" font-style="italic">p &lt; 0</text>
  <text x="240" y="65" text-anchor="middle" font-size="9" fill="#e53935">(bỏ qua)</text>
  <!-- Đường hc (p=0) -->
  <line x1="175" y1="90" x2="280" y2="90" stroke="#e53935" stroke-width="1.8" stroke-dasharray="5,3"/>
  <!-- hc kích thước: từ trên xuống -->
  <line x1="158" y1="20" x2="158" y2="90" stroke="#e53935" stroke-width="1.5" marker-end="url(#a-dn-r)"/>
  <line x1="152" y1="20" x2="164" y2="20" stroke="#e53935" stroke-width="1.5"/>
  <line x1="152" y1="90" x2="164" y2="90" stroke="#e53935" stroke-width="1.5"/>
  <rect x="128" y="48" width="24" height="16" fill="white" rx="3" opacity="0.9"/>
  <text x="140" y="60" text-anchor="middle" font-size="12" fill="#e53935" font-weight="700">hc</text>
  <!-- Biểu đồ dương (hc→đáy): tam giác từ (201,90) đến (400,220) -->
  <polygon points="201,90 201,220 400,220" fill="rgba(21,101,192,0.22)" stroke="#1565c0" stroke-width="2"/>
  <!-- Mũi tên áp lực dương: từ phải → trái -->
  <line x1="395" y1="220" x2="204" y2="220" stroke="#1565c0" stroke-width="2"   marker-end="url(#a-blue)"/>
  <line x1="355" y1="183" x2="204" y2="183" stroke="#1565c0" stroke-width="1.5" marker-end="url(#a-blue)" opacity="0.7"/>
  <line x1="302" y1="146" x2="204" y2="146" stroke="#1565c0" stroke-width="1"   marker-end="url(#a-blue)" opacity="0.5"/>
  <!-- Nhãn p_H -->
  <rect x="362" y="212" width="98" height="15" fill="white" rx="3" opacity="0.9"/>
  <text x="411" y="223" text-anchor="middle" font-size="8.5" fill="#1565c0" font-weight="700">Ka·γH − 2c√Ka</text>
  <!-- H: từ trên xuống -->
  <line x1="440" y1="20" x2="440" y2="220" stroke="#e65100" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#a-dn-o)"/>
  <line x1="434" y1="20"  x2="446" y2="20"  stroke="#e65100" stroke-width="1.5"/>
  <line x1="434" y1="220" x2="446" y2="220" stroke="#e65100" stroke-width="1.5"/>
  <text x="452" y="125" font-size="13" fill="#e65100" font-weight="700">H</text>
  <!-- H-hc -->
  <line x1="456" y1="90" x2="456" y2="220" stroke="#1565c0" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#a-dn-b)"/>
  <rect x="406" y="148" width="42" height="15" fill="white" rx="3" opacity="0.9"/>
  <text x="427" y="159" text-anchor="middle" font-size="10" fill="#1565c0" font-weight="600">H−hc</text>
  <!-- Thông số -->
  <rect x="28" y="100" width="105" height="44" fill="white" rx="5" opacity="0.88" stroke="#a5d6a7" stroke-width="1"/>
  <text x="81" y="118" text-anchor="middle" font-size="11" fill="#1b5e20" font-weight="700">γ, φ, c</text>
  <text x="81" y="134" text-anchor="middle" font-size="9.5" fill="#555">hc = 2c/(γ√Ka)</text>
</svg>`;

// ─── SVG TƯỜNG ĐẤT RỜI CÓ TẢI q (hình thang) ───────────────────
const SVG_TUONG_Q = `
<svg viewBox="0 0 470 245" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:470px;display:block;margin:8px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  ${_DEFS}
  <rect width="470" height="245" fill="#f8faff" rx="8"/>
  <!-- Tải q phân bố: từ trên xuống -->
  <line x1="12" y1="18" x2="178" y2="18" stroke="#e65100" stroke-width="2.5"/>
  <line x1="30"  y1="5" x2="30"  y2="16" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-dn-o)"/>
  <line x1="60"  y1="5" x2="60"  y2="16" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-dn-o)"/>
  <line x1="90"  y1="5" x2="90"  y2="16" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-dn-o)"/>
  <line x1="120" y1="5" x2="120" y2="16" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-dn-o)"/>
  <line x1="150" y1="5" x2="150" y2="16" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-dn-o)"/>
  <rect x="52" y="0" width="82" height="13" fill="white" rx="3" opacity="0.9"/>
  <text x="93" y="10" text-anchor="middle" font-size="10" fill="#e65100" font-weight="700">q (kN/m²)</text>
  <!-- Đất sau tường -->
  <rect x="12" y="18" width="165" height="197" fill="url(#g-sand)"/>
  <rect x="12" y="18" width="165" height="197" fill="url(#hatch-sand)" opacity="0.4"/>
  <line x1="8" y1="18" x2="185" y2="18" stroke="#5d4037" stroke-width="2"/>
  <!-- Tường -->
  <rect x="177" y="18" width="26" height="197" fill="url(#g-wall)" stroke="#37474f" stroke-width="2" rx="1"/>
  <text x="190" y="117" text-anchor="middle" font-size="9" fill="#fff" font-weight="700" transform="rotate(-90,190,117)">TƯỜNG CHẮN</text>
  <!-- Nền -->
  <rect x="12" y="215" width="445" height="18" fill="#c8e6c9" stroke="#388e3c" stroke-width="1"/>
  <!-- Biểu đồ hình THANG: điểm (203,18),(203,215),(400,215),(258,18) -->
  <polygon points="203,18 203,215 400,215 258,18" fill="url(#g-pb)" stroke="#1565c0" stroke-width="2"/>
  <!-- Mũi tên áp lực: từ phải → trái -->
  <line x1="254" y1="18"  x2="206" y2="18"  stroke="#e65100" stroke-width="1.8" marker-end="url(#a-org)"/>
  <line x1="390" y1="215" x2="206" y2="215" stroke="#1565c0" stroke-width="2"   marker-end="url(#a-blue)"/>
  <!-- Nhãn 2 đầu -->
  <rect x="257" y="10" width="55" height="14" fill="#fff3e0" rx="3" stroke="#ffb74d" stroke-width="1"/>
  <text x="285" y="20" text-anchor="middle" font-size="9" fill="#e65100" font-weight="700">Ka·q</text>
  <rect x="393" y="207" width="70" height="14" fill="#e3f2fd" rx="3" stroke="#90caf9" stroke-width="1"/>
  <text x="428" y="218" text-anchor="middle" font-size="9" fill="#1565c0" font-weight="700">Ka·(γH+q)</text>
  <!-- Phân tích E1 + E2 -->
  <rect x="218" y="130" width="148" height="56" fill="white" rx="5" opacity="0.9" stroke="#e0e0e0" stroke-width="1"/>
  <text x="292" y="148" text-anchor="middle" font-size="9.5" fill="#1565c0" font-weight="700">E = E₁ + E₂</text>
  <text x="292" y="163" text-anchor="middle" font-size="9"   fill="#7b1fa2">E₁ = Ka·q·H   (chữ nhật)</text>
  <text x="292" y="178" text-anchor="middle" font-size="9"   fill="#7b1fa2">E₂ = ½·Ka·γ·H²  (tam giác)</text>
  <!-- H: từ trên xuống -->
  <line x1="445" y1="18" x2="445" y2="215" stroke="#e65100" stroke-width="1.8" stroke-dasharray="5,3" marker-end="url(#a-dn-o)"/>
  <line x1="439" y1="18"  x2="451" y2="18"  stroke="#e65100" stroke-width="1.5"/>
  <line x1="439" y1="215" x2="451" y2="215" stroke="#e65100" stroke-width="1.5"/>
  <text x="458" y="120" font-size="13" fill="#e65100" font-weight="700">H</text>
</svg>`;

// ─── SVG 3 KIỂU TƯỜNG CHẮN (cho b1a) ────────────────────────────
const SVG_3_KIEU_TUONG = `
<svg viewBox="0 0 580 205" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;display:block;margin:10px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  ${_DEFS}
  <rect width="580" height="205" fill="#fafbff" rx="8"/>

  <!-- ① TƯỜNG TRỌNG LỰC -->
  <rect x="4" y="4" width="182" height="197" rx="6" fill="#fffde7" stroke="#f9a825" stroke-width="1.5"/>
  <text x="95" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#e65100">① Tường trọng lực</text>
  <rect x="14" y="28" width="70" height="138" fill="url(#g-sand)"/>
  <rect x="14" y="28" width="70" height="138" fill="url(#hatch-sand)" opacity="0.5"/>
  <line x1="8" y1="28" x2="98" y2="28" stroke="#5d4037" stroke-width="1.5"/>
  <!-- Thân tường hình thang -->
  <polygon points="84,28 112,28 120,166 76,166" fill="#90a4ae" stroke="#455a64" stroke-width="1.5"/>
  <rect x="63" y="166" width="72" height="12" fill="#607d8b" stroke="#37474f" stroke-width="1.5"/>
  <rect x="10" y="178" width="170" height="12" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" opacity="0.8"/>
  <!-- Áp lực Ea: từ phải → trái -->
  <line x1="108" y1="148" x2="86" y2="148" stroke="#e53935" stroke-width="1.8" marker-end="url(#a-red)"/>
  <text x="115" y="152" font-size="8.5" fill="#e53935" font-weight="600">Ea</text>
  <!-- Trọng lượng W: từ trên xuống -->
  <line x1="98" y1="55" x2="98" y2="85" stroke="#1b5e20" stroke-width="2.5" marker-end="url(#a-dn-g)"/>
  <text x="106" y="76" font-size="9" fill="#1b5e20" font-weight="700">W</text>
  <text x="20" y="195" font-size="8" fill="#888" font-style="italic">Ổn định nhờ W bản thân</text>

  <!-- ② TƯỜNG CỪ -->
  <rect x="200" y="4" width="182" height="197" rx="6" fill="#e3f2fd" stroke="#90caf9" stroke-width="1.5"/>
  <text x="291" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#0d47a1">② Tường cừ</text>
  <rect x="210" y="28" width="68" height="120" fill="url(#g-sand)"/>
  <rect x="210" y="28" width="68" height="120" fill="url(#hatch-sand)" opacity="0.5"/>
  <line x1="204" y1="28" x2="288" y2="28" stroke="#5d4037" stroke-width="1.5"/>
  <!-- Tấm cừ -->
  <rect x="278" y="28" width="12" height="148" fill="url(#g-wall)" stroke="#37474f" stroke-width="1.5"/>
  <!-- Đất trước tường bị động -->
  <rect x="290" y="105" width="72" height="71" fill="#c8e6c9" opacity="0.7"/>
  <rect x="290" y="105" width="72" height="71" fill="url(#hatch-clay)" opacity="0.35"/>
  <line x1="204" y1="105" x2="372" y2="105" stroke="#555" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="212" y="100" font-size="8" fill="#555">Mặt đào</text>
  <!-- Ea: từ phải → trái -->
  <line x1="278" y1="75" x2="258" y2="75" stroke="#e53935" stroke-width="1.8" marker-end="url(#a-red)"/>
  <text x="214" y="79" font-size="8.5" fill="#e53935">Ea →</text>
  <!-- Eb bị động: từ trái → phải -->
  <line x1="290" y1="135" x2="310" y2="135" stroke="#1b5e20" stroke-width="1.8" marker-end="url(#a-grn)"/>
  <text x="315" y="139" font-size="8.5" fill="#1b5e20">← Eb</text>
  <rect x="205" y="178" width="172" height="12" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" opacity="0.8"/>
  <text x="214" y="195" font-size="8" fill="#888" font-style="italic">Ổn định: Ea ≤ Eb</text>

  <!-- ③ 3 HÌNH THỨC MẤT ỔN ĐỊNH -->
  <rect x="396" y="4" width="180" height="197" rx="6" fill="#fff0f0" stroke="#ef9a9a" stroke-width="1.5"/>
  <text x="486" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#c62828">③ Mất ổn định ngoài</text>
  <!-- Tường nhỏ -->
  <polygon points="448,38 464,38 470,155 440,155" fill="#90a4ae" stroke="#455a64" stroke-width="1.2"/>
  <rect x="430" y="155" width="52" height="8" fill="#607d8b" stroke="#37474f" stroke-width="1"/>
  <rect x="404" y="163" width="168" height="10" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" opacity="0.8"/>
  <!-- Đất -->
  <rect x="404" y="38" width="44" height="125" fill="url(#g-sand)" opacity="0.7"/>
  <rect x="404" y="38" width="44" height="125" fill="url(#hatch-sand)" opacity="0.35"/>
  <!-- ①Trượt: mũi tên ngang -->
  <line x1="440" y1="163" x2="404" y2="163" stroke="#e53935" stroke-width="2" marker-end="url(#a-red)" stroke-dasharray="4,3"/>
  <text x="402" y="185" font-size="8" fill="#e53935" font-weight="600">①Trượt đáy</text>
  <!-- ②Lật: cung tròn + mũi tên -->
  <path d="M470,155 A18,18 0 0,1 488,168" fill="none" stroke="#e65100" stroke-width="2"/>
  <line x1="486" y1="167" x2="490" y2="174" stroke="#e65100" stroke-width="2" marker-end="url(#a-dn-o)"/>
  <text x="490" y="185" font-size="8" fill="#e65100" font-weight="600">②Lật</text>
  <!-- ③Phá hoại nền: mũi tên xuống -->
  <line x1="455" y1="163" x2="455" y2="178" stroke="#7b1fa2" stroke-width="2" marker-end="url(#a-dn-r)" stroke-dasharray="4,3"/>
  <text x="528" y="176" font-size="8" fill="#7b1fa2" font-weight="600">③Phá hoại</text>
  <text x="528" y="188" font-size="8" fill="#7b1fa2">nền</text>
</svg>`;

// ─── SVG BA LOẠI ÁP LỰC + CHUYỂN VỊ TƯỜNG (cho b1b) ─────────────
const SVG_3_LOAI_AP_LUC = `
<svg viewBox="0 0 580 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;display:block;margin:10px auto;border-radius:8px;box-shadow:0 1px 6px rgba(0,0,0,.1)">
  ${_DEFS}
  <rect width="580" height="210" fill="#fafbff" rx="8"/>

  <!-- ① CHỦ ĐỘNG (tường dịch ra xa) -->
  <rect x="4" y="4" width="180" height="202" rx="6" fill="#e3f2fd" stroke="#90caf9" stroke-width="1.5"/>
  <text x="94" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#0d47a1">Chủ động (Ea)</text>
  <text x="94" y="30" text-anchor="middle" font-size="8.5" fill="#555">Tường dịch ra xa →</text>
  <rect x="14" y="36" width="65" height="132" fill="url(#g-sand)"/>
  <rect x="14" y="36" width="65" height="132" fill="url(#hatch-sand)" opacity="0.4"/>
  <line x1="8" y1="36" x2="92" y2="36" stroke="#5d4037" stroke-width="1.5"/>
  <!-- Mặt trượt -->
  <line x1="14" y1="168" x2="79" y2="36" stroke="#e53935" stroke-width="1.5" stroke-dasharray="5,3"/>
  <!-- Tường (đã dịch ra) -->
  <rect x="80" y="36" width="14" height="132" fill="url(#g-wall)" stroke="#455a64" stroke-width="1.5"/>
  <!-- Mũi tên tường dịch ra: từ trái → phải -->
  <line x1="94" y1="72" x2="114" y2="72" stroke="#e53935" stroke-width="2.5" marker-end="url(#a-red)"/>
  <rect x="114" y="65" width="55" height="13" fill="white" rx="2" opacity="0.9"/>
  <text x="142" y="75" text-anchor="middle" font-size="8.5" fill="#e53935" font-weight="700">Δ≈0.5%H</text>
  <!-- Biểu đồ Ea (nhỏ): từ phải → trái -->
  <polygon points="94,36 94,168 128,168" fill="rgba(21,101,192,0.2)" stroke="#1565c0" stroke-width="1.5"/>
  <line x1="126" y1="168" x2="96" y2="168" stroke="#1565c0" stroke-width="1.8" marker-end="url(#a-blue)"/>
  <rect x="110" y="178" width="54" height="14" fill="#e3f2fd" rx="3" stroke="#90caf9" stroke-width="1"/>
  <text x="137" y="189" text-anchor="middle" font-size="9.5" fill="#1565c0" font-weight="700">Ea (nhỏ)</text>
  <text x="94" y="202" text-anchor="middle" font-size="8" fill="#555">Ka &lt; K₀ &lt; Kb</text>

  <!-- ② TĨNH (đứng yên) -->
  <rect x="200" y="4" width="180" height="202" rx="6" fill="#fffde7" stroke="#fff176" stroke-width="1.5"/>
  <text x="290" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#e65100">Tĩnh (E₀)</text>
  <text x="290" y="30" text-anchor="middle" font-size="8.5" fill="#555">Tường không chuyển vị</text>
  <rect x="210" y="36" width="68" height="132" fill="url(#g-sand)" opacity="0.8"/>
  <rect x="210" y="36" width="68" height="132" fill="url(#hatch-sand)" opacity="0.4"/>
  <line x1="204" y1="36" x2="286" y2="36" stroke="#5d4037" stroke-width="1.5"/>
  <rect x="278" y="36" width="14" height="132" fill="url(#g-wall)" stroke="#455a64" stroke-width="1.5"/>
  <!-- Biểu đồ E0 (trung bình): từ phải → trái -->
  <polygon points="292,36 292,168 352,168" fill="rgba(230,81,0,0.2)" stroke="#e65100" stroke-width="1.5"/>
  <line x1="350" y1="168" x2="294" y2="168" stroke="#e65100" stroke-width="1.8" marker-end="url(#a-org)"/>
  <rect x="320" y="178" width="50" height="14" fill="#fff3e0" rx="3" stroke="#ffb74d" stroke-width="1"/>
  <text x="345" y="189" text-anchor="middle" font-size="9.5" fill="#e65100" font-weight="700">E₀ (TB)</text>
  <!-- K0 label -->
  <rect x="216" y="126" width="56" height="28" fill="white" rx="4" opacity="0.9" stroke="#ffe082" stroke-width="1"/>
  <text x="244" y="140" text-anchor="middle" font-size="8.5" fill="#e65100">K₀ = μ/(1−μ)</text>
  <text x="244" y="151" text-anchor="middle" font-size="8" fill="#555">μ: hệ số Poisson</text>

  <!-- ③ BỊ ĐỘNG (đẩy vào) -->
  <rect x="396" y="4" width="180" height="202" rx="6" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="1.5"/>
  <text x="486" y="19" text-anchor="middle" font-size="10" font-weight="700" fill="#1b5e20">Bị động (Eb)</text>
  <text x="486" y="30" text-anchor="middle" font-size="8.5" fill="#555">Tường đẩy vào đất ←</text>
  <rect x="406" y="36" width="68" height="132" fill="url(#g-clay)" opacity="0.8"/>
  <rect x="406" y="36" width="68" height="132" fill="url(#hatch-clay)" opacity="0.4"/>
  <line x1="400" y1="36" x2="484" y2="36" stroke="#5d4037" stroke-width="1.5"/>
  <rect x="474" y="36" width="14" height="132" fill="url(#g-wall)" stroke="#455a64" stroke-width="1.5"/>
  <!-- Mũi tên tường đẩy vào: từ phải → trái -->
  <line x1="474" y1="72" x2="454" y2="72" stroke="#1b5e20" stroke-width="2.5" marker-end="url(#a-grn)"/>
  <rect x="400" y="65" width="50" height="13" fill="white" rx="2" opacity="0.9"/>
  <text x="425" y="75" text-anchor="middle" font-size="8.5" fill="#1b5e20" font-weight="700">Δ≈5%H</text>
  <!-- Biểu đồ Eb (lớn): từ phải → trái -->
  <polygon points="488,36 488,168 565,168" fill="rgba(27,94,32,0.22)" stroke="#2e7d32" stroke-width="1.5"/>
  <line x1="563" y1="168" x2="490" y2="168" stroke="#2e7d32" stroke-width="1.8" marker-end="url(#a-grn)"/>
  <rect x="530" y="178" width="46" height="14" fill="#e8f5e9" rx="3" stroke="#a5d6a7" stroke-width="1"/>
  <text x="553" y="189" text-anchor="middle" font-size="9.5" fill="#1b5e20" font-weight="700">Eb (lớn)</text>
  <text x="486" y="202" text-anchor="middle" font-size="8" fill="#555" font-style="italic">Kb = 1/Ka</text>
</svg>`;
// Bảng Ka, K0, Kb
const BANG_HE_SO_AP_LUC = `
<div style="margin-top:10px;">
  <div style="font-size:.8rem;font-weight:700;color:#1565c0;margin-bottom:5px;">
    📋 Công thức hệ số áp lực đất
  </div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;">
    <thead>
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:5px 8px;">Loại</th>
        <th style="padding:5px 8px;">Hệ số</th>
        <th style="padding:5px 8px;">Công thức</th>
        <th style="padding:5px 8px;">Ký hiệu khác</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff9c4;text-align:center;">
        <td style="padding:5px 8px;font-weight:700;color:#e65100;">Tĩnh</td>
        <td>K₀</td>
        <td style="font-family:monospace;">K₀ = ξ = μ/(1−μ)</td>
        <td>ξ hoặc μ₀</td>
      </tr>
      <tr style="text-align:center;">
        <td style="padding:5px 8px;font-weight:700;color:#1565c0;">Chủ động</td>
        <td>Ka</td>
        <td style="font-family:monospace;">Ka = tg²(45°−φ/2)</td>
        <td>Kc</td>
      </tr>
      <tr style="background:#e8f5e9;text-align:center;">
        <td style="padding:5px 8px;font-weight:700;color:#1b5e20;">Bị động</td>
        <td>Kb</td>
        <td style="font-family:monospace;">Kb = tg²(45°+φ/2)</td>
        <td>Kp</td>
      </tr>
    </tbody>
  </table>
  <div style="font-size:.78rem;margin-top:5px;color:#555;">
    Ghi chú: Ka &lt; K₀ &lt; Kb; &nbsp; Ka · Kb = 1
  </div>
</div>`;


// ═══════════════════════════════════════════════════════════════════
// PHẦN 1 – LÝ THUYẾT (ch7_b1a, ch7_b1b, ch7_b1c)
// ch7_b1a: MCQ Phân loại tường, hình thức mất ổn định
// ch7_b1b: MCQ Ba loại áp lực đất, sự khác nhau
// ch7_b1c: MCQ Nhận biết biểu đồ áp lực
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_TUONG_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 TƯỜNG CHẮN – Phân loại và hình thức mất ổn định</div>
  ${SVG_3_KIEU_TUONG}
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:8px;">
    <thead>
      <tr style="background:#1565c0;color:#fff;">
        <th style="padding:5px 8px;">Loại tường</th>
        <th style="padding:5px 8px;">Cơ chế ổn định</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff9c4;">
        <td style="padding:5px 8px;font-weight:700;">① Tường trọng lực</td>
        <td style="padding:5px 8px;">Nhờ trọng lượng bản thân tường</td>
      </tr>
      <tr>
        <td style="padding:5px 8px;font-weight:700;">② Tường cừ</td>
        <td style="padding:5px 8px;">Cừ cắm sâu vào đất, dùng áp lực bị động Eb chống lại Ea</td>
      </tr>
      <tr style="background:#fff0f0;">
        <td style="padding:5px 8px;font-weight:700;color:#c62828;">③ 3 hình thức mất ổn định ngoài</td>
        <td style="padding:5px 8px;">① Trượt phẳng theo đáy &nbsp;② Lật quanh mép trước &nbsp;③ Phá hoại nền</td>
      </tr>
    </tbody>
  </table>
</div>`;

const LY_THUYET_AP_LUC_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 BA LOẠI ÁP LỰC ĐẤT LÊN TƯỜNG – Quan hệ với chuyển vị</div>
  ${SVG_3_LOAI_AP_LUC}
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:8px;">
    <thead>
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:5px 8px;">Loại áp lực</th>
        <th style="padding:5px 8px;">Khi nào xảy ra</th>
        <th style="padding:5px 8px;">Chuyển vị cần thiết</th>
        <th style="padding:5px 8px;">Giá trị</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff9c4;">
        <td style="padding:5px 8px;font-weight:700;color:#e65100;">Tĩnh E₀</td>
        <td style="padding:5px 8px;">Tường <b>không chuyển vị</b></td>
        <td style="padding:5px 8px;text-align:center;">Δ = 0</td>
        <td style="padding:5px 8px;text-align:center;">Trung bình</td>
      </tr>
      <tr>
        <td style="padding:5px 8px;font-weight:700;color:#1565c0;">Chủ động Ea</td>
        <td style="padding:5px 8px;">Tường dịch <b>ra xa</b> khối đất</td>
        <td style="padding:5px 8px;text-align:center;">Δ ≈ 0.5–1%H</td>
        <td style="padding:5px 8px;text-align:center;color:#1565c0;font-weight:700;">NHỎ NHẤT</td>
      </tr>
      <tr style="background:#e8f5e9;">
        <td style="padding:5px 8px;font-weight:700;color:#1b5e20;">Bị động Eb</td>
        <td style="padding:5px 8px;">Tường đẩy <b>vào</b> khối đất</td>
        <td style="padding:5px 8px;text-align:center;">Δ ≈ 2–15%H</td>
        <td style="padding:5px 8px;text-align:center;color:#1b5e20;font-weight:700;">LỚN NHẤT</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top:6px;font-size:.8rem;color:#555;">
    Quan hệ: E<sub>a</sub> &lt; E₀ &lt; E<sub>b</sub> &nbsp;|&nbsp; Ka · Kb = 1
  </div>
</div>`;

// ── ch7_b1a: MCQ Phân loại và hình thức mất ổn định ───────────────
EXERCISES['ch7_b1a'] = {
  chapterId: 'ch7',
  title: '7.1a – Phân loại tường chắn và hình thức mất ổn định',
  type: 'guided',
  theoryHTML: LY_THUYET_TUONG_HTML,
  hint: `
    <div class="hint-title">💡 Gợi ý</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Phân biệt: tường <b>trọng lực</b> ổn định nhờ trọng lượng bản thân; tường <b>cừ</b> ổn định nhờ phần cắm sâu.<br>
      3 hình thức mất ổn định: trượt, lật, sức chịu tải nền.
    </div>`,
  genData(rng) {
    const sets = [
      {
        q: 'Tường chắn loại nào ổn định chủ yếu nhờ phần cừ cắm sâu trong đất và lợi dụng áp lực bị động?',
        choices: ['A. Tường trọng lực', 'B. Tường bán trọng lực', 'C. Tường cừ', 'D. Tường neo'],
        correct: 2
      },
      {
        q: 'Hiện tượng tường chắn bị xoay quanh mép dưới phía trước tường được gọi là hình thức mất ổn định nào?',
        choices: ['A. Trượt phẳng theo đáy', 'B. Lật quanh mép trước', 'C. Sụt lún do quá tải nền', 'D. Mất ổn định tổng thể'],
        correct: 1
      },
      {
        q: 'Tường bán trọng lực khác tường trọng lực ở điểm nào?',
        choices: [
          'A. Dùng cừ cắm sâu để tạo ổn định',
          'B. Bản đáy kéo dài ra sau để lợi dụng thêm trọng lượng đất đặt lên bản đáy',
          'C. Hoàn toàn giống nhau, chỉ khác tên gọi',
          'D. Không dùng trọng lực bản thân'
        ],
        correct: 1
      },
      {
        q: 'Đối với tường trọng lực, điều kiện đảm bảo KHÔNG bị trượt phẳng theo đáy là:',
        choices: [
          'A. Lực ma sát đáy móng ≥ Tổng áp lực đất ngang',
          'B. Momen giữ ≥ Momen lật',
          'C. Tải trọng nền ≤ Sức chịu tải của nền',
          'D. Chiều cao tường đủ lớn'
        ],
        correct: 0
      },
    ];
    const pick = (rng() * sets.length) | 0;
    return { set: sets[pick], idx: sets[pick].correct };
  },
  statement(d) { return d.set.q; },
  questions: [
    { id: 'q1', type: 'mcq', label: 'Chọn đáp án đúng:',
      choices: d => d.set.choices, correctIndex: d => d.idx }
  ]
};

// ── ch7_b1b: MCQ Ba loại áp lực đất ──────────────────────────────
EXERCISES['ch7_b1b'] = {
  chapterId: 'ch7',
  title: '7.1b – Phân loại và so sánh ba loại áp lực đất',
  type: 'guided',
  theoryHTML: LY_THUYET_AP_LUC_HTML,
  hint: `
    <div class="hint-title">💡 Nhớ nhanh</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Tường ra xa → Chủ động (nhỏ nhất, nguy hiểm cho tường).<br>
      Tường đẩy vào → Bị động (lớn nhất, giúp ổn định tường cừ).<br>
      Tường đứng yên → Áp lực tĩnh.
    </div>`,
  genData(rng) {
    const sets = [
      {
        q: 'Áp lực đất nào tác dụng lên tường khi tường KHÔNG có bất kỳ chuyển vị nào?',
        choices: ['A. Áp lực chủ động Ea', 'B. Áp lực tĩnh E₀', 'C. Áp lực bị động Eb', 'D. Không có áp lực'],
        correct: 1
      },
      {
        q: 'Khi tường chắn dịch chuyển RỜI XA khối đất, áp lực đất đạt giá trị:',
        choices: [
          'A. Tăng lên đến cực đại (áp lực bị động)',
          'B. Giảm xuống đến cực tiểu (áp lực chủ động)',
          'C. Không thay đổi',
          'D. Bằng 0'
        ],
        correct: 1
      },
      {
        q: 'Để áp lực đất chủ động Ea hình thành cần chuyển vị của tường bằng khoảng bao nhiêu % chiều cao tường H?',
        choices: ['A. 0.05 – 0.1%H', 'B. 0.5 – 1%H', 'C. 2 – 5%H', 'D. 10 – 20%H'],
        correct: 1
      },
      {
        q: 'Thứ tự đúng về độ lớn của 3 loại áp lực đất lên tường là:',
        choices: [
          'A. Ea > E₀ > Eb',
          'B. Eb > Ea > E₀',
          'C. Ea < E₀ < Eb',
          'D. E₀ < Ea < Eb'
        ],
        correct: 2
      },
    ];
    const pick = (rng() * sets.length) | 0;
    return { set: sets[pick], idx: sets[pick].correct };
  },
  statement(d) { return d.set.q; },
  questions: [
    { id: 'q1', type: 'mcq', label: 'Chọn đáp án đúng:',
      choices: d => d.set.choices, correctIndex: d => d.idx }
  ]
};

// ── ch7_b1c: MCQ Nhận biết biểu đồ, hệ số K ──────────────────────
EXERCISES['ch7_b1c'] = {
  chapterId: 'ch7',
  title: '7.1c – Hệ số áp lực đất và dạng biểu đồ',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 HỆ SỐ ÁP LỰC ĐẤT</div>
  ${BANG_HE_SO_AP_LUC}
  <div style="margin-top:10px;font-size:.85rem;line-height:1.8;">
    <b>Dạng biểu đồ áp lực:</b><br>
    • Đất rời: tam giác (p = 0 ở đỉnh, tăng tuyến tính xuống đáy)<br>
    • Đất dính: có vùng âm hc ở trên (bỏ qua), tam giác cụt phía dưới<br>
    • Có tải q: hình thang (p = Ka·q ở đỉnh, p = Ka·(γH+q) ở đáy)
  </div>
</div>`,
  hint: `
    <div class="hint-title">💡 So sánh Ka và Kb</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Ka = tg²(45°−φ/2) → luôn &lt; 1<br>
      Kb = tg²(45°+φ/2) → luôn &gt; 1<br>
      Ka × Kb = 1
    </div>`,
  genData(rng) {
    const sets = [
      {
        q: 'Hệ số áp lực đất chủ động Ka được tính bằng:',
        choices: [
          'A. Ka = tg²(45° + φ/2)',
          'B. Ka = tg²(45° − φ/2)',
          'C. Ka = μ/(1−μ)',
          'D. Ka = tg²(φ/2)'
        ],
        correct: 1
      },
      {
        q: 'Biểu đồ áp lực đất chủ động của ĐẤT RỜI thuần túy (c=0) lên tường thẳng có dạng:',
        choices: [
          'A. Hình chữ nhật (đều khắp)',
          'B. Tam giác (đỉnh bằng 0, tăng xuống đáy)',
          'C. Hình thang',
          'D. Parabol'
        ],
        correct: 1
      },
      {
        q: 'Khi đất sau tường là đất DÍNH (c≠0), điểm đặc biệt hc là:',
        choices: [
          'A. Chiều sâu tại đó áp lực bị động bằng 0',
          'B. Chiều sâu tại đó áp lực chủ động bằng 0 (biên âm–dương)',
          'C. Chiều sâu đặt hợp lực E',
          'D. Chiều sâu tường chắn'
        ],
        correct: 1
      },
      {
        q: 'Khi mặt đất sau tường có tải trọng phân bố đều q, biểu đồ áp lực đất chủ động (đất rời) có dạng:',
        choices: [
          'A. Tam giác (không đổi)',
          'B. Hình thang (Ka·q ở đỉnh, Ka·(γH+q) ở đáy)',
          'C. Chữ nhật (Ka·q toàn bộ chiều cao)',
          'D. Hình parabol'
        ],
        correct: 1
      },
    ];
    const pick = (rng() * sets.length) | 0;
    return { set: sets[pick], idx: sets[pick].correct };
  },
  statement(d) { return d.set.q; },
  questions: [
    { id: 'q1', type: 'mcq', label: 'Chọn đáp án đúng:',
      choices: d => d.set.choices, correctIndex: d => d.idx }
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 2 – ÁP LỰC ĐẤT TĨNH
// ch7_b2a: Tính cường độ áp lực tĩnh tại độ sâu z
// ch7_b2b: Tính tổng áp lực tĩnh E₀ (tích phân → tam giác)
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_TINH_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 ÁP LỰC ĐẤT TĨNH</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Khi tường hoàn toàn không chuyển vị (cứng), đất ở trạng thái cân bằng đàn hồi:<br>
  </div>
  <div style="background:#fff;border:2px solid #e65100;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#e65100;">
      p₀(z) = K₀ · γ · z &nbsp;&nbsp; (K₀ = ξ = μ/(1−μ))
    </span>
  </div>
  <div style="background:#fff;border:2px solid #e65100;border-radius:8px;padding:9px 18px;margin:4px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#e65100;">
      E₀ = ½ · K₀ · γ · H²
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:6px;color:#555;">
    Hợp lực E₀ đặt tại H/3 tính từ đáy tường.
  </div>
  ${SVG_TUONG_CHAN_ROI}
</div>`;

// ── ch7_b2a: Cường độ áp lực tĩnh tại độ sâu z ───────────────────
EXERCISES['ch7_b2a'] = {
  chapterId: 'ch7',
  title: '7.2a – Cường độ áp lực đất TĨNH tại độ sâu z',
  type: 'guided',
  theoryHTML: LY_THUYET_TINH_HTML,
  hint: `
    <div class="hint-title">💡 Công thức</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Bước 1.</b> Xác định K₀ = ξ (cho sẵn trong bài)<br>
      <b>Bước 2.</b> p₀(z) = K₀ · γ · z
    </div>`,
  genData(rng) {
    const H = Math.floor(4 + rng() * 6);       // 4–9 m
    const z = Math.floor(1 + rng() * (H - 1));  // 1 đến H-1
    const gamma = r2(1.7 + rng() * 0.3);        // T/m³ (theo ví dụ PDF)
    const xi = r2(0.3 + rng() * 0.25);          // ξ = 0.3–0.55
    const p0z = r2(xi * gamma * z);
    const E0 = r2(0.5 * xi * gamma * H * H);
    return { H, z, gamma, xi, p0z, E0 };
  },
  statement(d) {
    return `Cho tường chắn cứng cao <strong>H = ${d.H} m</strong>, lưng tường thẳng đứng. Đất sau lưng tường có: trọng lượng riêng <strong>γ = ${d.gamma} T/m³</strong>, hệ số áp lực đất tĩnh <strong>K₀ = ξ = ${d.xi}</strong>. Mặt đất sau lưng tường nằm ngang, bỏ qua ma sát ngoài giữa đất và tường.<br><br>
    Tính cường độ áp lực đất tĩnh tại độ sâu <strong>z = ${d.z} m</strong> và tổng áp lực đất tĩnh lên tường.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Cường độ áp lực tĩnh tại z: p₀(z) = K₀·γ·z =',
      unit: 'T/m²', answer: d => d.p0z, tol: 0.03 },
    { id: 'q2', type: 'fill',
      label: 'Tổng áp lực đất tĩnh E₀ = ½·K₀·γ·H² =',
      unit: 'T/m', answer: d => d.E0, tol: 0.1 },
  ]
};

// ── ch7_b2b: Tính K₀ từ hệ số Poisson μ, rồi tính E₀ ─────────────
EXERCISES['ch7_b2b'] = {
  chapterId: 'ch7',
  title: '7.2b – Tính K₀ từ μ và xác định áp lực đất tĩnh',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Công thức K₀ từ μ</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <div class="hint-formula">K₀ = ξ = μ / (1 − μ)</div>
      Sau đó: E₀ = ½ · K₀ · γ · H²
    </div>`,
  genData(rng) {
    const H = Math.floor(4 + rng() * 5);
    const gamma = r2(1.75 + rng() * 0.25);
    // μ lấy các giá trị đặc trưng
    const mu_opts = [0.25, 0.28, 0.30, 0.32, 0.35, 0.40];
    const mu = mu_opts[Math.floor(rng() * mu_opts.length)];
    const K0 = r2(mu / (1 - mu));
    const E0 = r2(0.5 * K0 * gamma * H * H);
    return { H, gamma, mu, K0, E0 };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>. Đất sau tường: <strong>γ = ${d.gamma} T/m³</strong>, hệ số Poisson <strong>μ = ${d.mu}</strong>. Mặt đất nằm ngang, bỏ qua ma sát tường-đất.<br><br>
    Tính K₀ và tổng áp lực đất tĩnh E₀ tác dụng lên tường.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Hệ số áp lực tĩnh K₀ = μ/(1−μ) =',
      unit: '', answer: d => d.K0, tol: 0.01 },
    { id: 'q2', type: 'fill',
      label: 'Tổng áp lực đất tĩnh E₀ =',
      unit: 'T/m', answer: d => d.E0, tol: 0.1 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 3 – ÁP LỰC ĐẤT CHỦ ĐỘNG
// ch7_b3a: Tính Ka (đất rời), cường độ tại z, tổng E_c (đất rời)
// ch7_b3b: Cường độ áp lực chủ động đất dính tại z, tìm hc
// ch7_b3c: Tổng áp lực chủ động đất dính Ec
// ch7_b3d: Đất rời có tải trọng phân bố q – cường độ và E
// ch7_b3e: Đất dính có tải q – cường độ tại z
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_CHU_DONG_ROI_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 ÁP LỰC ĐẤT CHỦ ĐỘNG – ĐẤT RỜI (c = 0)</div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.95rem;font-weight:700;color:#1565c0;">
      Ka = tg²(45° − φ/2)
    </span>
  </div>
  <div style="background:#fff;border:1px solid #90caf9;border-radius:8px;padding:8px 16px;margin:4px 0;">
    <span style="font-family:monospace;font-size:.88rem;color:#1565c0;">
      p_a(z) = Ka · γ · z &nbsp;&nbsp;(cường độ tại độ sâu z)<br>
      E_c = ½ · Ka · γ · H² &nbsp;&nbsp;(tổng áp lực, đặt tại H/3 từ đáy)
    </span>
  </div>
  ${SVG_TUONG_CHAN_ROI}
</div>`;

const LY_THUYET_CHU_DONG_DINH_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 ÁP LỰC ĐẤT CHỦ ĐỘNG – ĐẤT DÍNH (c ≠ 0)</div>
  <div style="background:#fff;border:2px solid #c62828;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.92rem;font-weight:700;color:#c62828;">
      p_a(z) = Ka·γ·z − 2c·√Ka
    </span>
  </div>
  <div style="font-size:.83rem;line-height:1.75;margin-top:6px;">
    Chiều sâu âm (vùng bỏ qua): <strong>hc = 2c / (γ·√Ka)</strong><br>
    Tổng áp lực (chỉ tính phần dương):
  </div>
  <div style="background:#fff;border:1px solid #ef9a9a;border-radius:8px;padding:8px 16px;margin:4px 0;">
    <span style="font-family:monospace;font-size:.88rem;color:#c62828;">
      Ec = ½ · (γ·H·Ka − 2c·√Ka) · (H − hc)
    </span>
  </div>
  ${SVG_TUONG_DINH}
</div>`;

// ── ch7_b3a: Ka đất rời, p tại z, E_c ────────────────────────────
EXERCISES['ch7_b3a'] = {
  chapterId: 'ch7',
  title: '7.3a – Áp lực đất chủ động: đất RỜI',
  type: 'guided',
  theoryHTML: LY_THUYET_CHU_DONG_ROI_HTML,
  hint: `
    <div class="hint-title">💡 Trình tự tính</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Ka = tg²(45° − φ/2)<br>
      <b>B2.</b> p_a(z) = Ka · γ · z<br>
      <b>B3.</b> Ec = ½ · Ka · γ · H²
    </div>`,
  genData(rng) {
    const phi = Math.floor(28 + rng() * 10); // 28–37°
    const H = Math.floor(4 + rng() * 6);
    const z = Math.floor(1 + rng() * (H - 1));
    const gamma = r2(1.78 + rng() * 0.12);
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const paz = r2(Ka * gamma * z);
    const Ec = r2(0.5 * Ka * gamma * H * H);
    return { phi, H, z, gamma, Ka, paz, Ec };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>, lưng thẳng đứng. Đất sau tường là cát có <strong>φ = ${d.phi}°</strong>, <strong>γ = ${d.gamma} T/m³</strong>, c = 0. Mặt đất nằm ngang, bỏ qua ma sát ngoài.<br><br>
    Tính hệ số Ka, cường độ áp lực chủ động tại <strong>z = ${d.z} m</strong> và tổng áp lực chủ động Ec.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Hệ số áp lực chủ động Ka = tg²(45°−φ/2) =',
      unit: '', answer: d => d.Ka, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: 'Cường độ áp lực tại z: p_a(z) = Ka·γ·z =',
      unit: 'T/m²', answer: d => d.paz, tol: 0.05 },
    { id: 'q3', type: 'fill',
      label: 'Tổng áp lực chủ động Ec = ½·Ka·γ·H² =',
      unit: 'T/m', answer: d => d.Ec, tol: 0.1 },
  ]
};

// ── ch7_b3b: Đất dính – cường độ tại z, tìm hc ───────────────────
EXERCISES['ch7_b3b'] = {
  chapterId: 'ch7',
  title: '7.3b – Áp lực đất chủ động: đất DÍNH – cường độ và hc',
  type: 'guided',
  theoryHTML: LY_THUYET_CHU_DONG_DINH_HTML,
  hint: `
    <div class="hint-title">💡 Hai bước quan trọng</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>Bước 1.</b> Tính Ka = tg²(45°−φ/2), sau đó √Ka<br>
      <b>Bước 2.</b> p_a(z) = Ka·γ·z − 2c·√Ka<br>
      <b>Chiều sâu âm:</b> hc = 2c / (γ·√Ka) &nbsp;&nbsp; (vùng trên hc bỏ qua)
    </div>`,
  genData(rng) {
    const phi = Math.floor(18 + rng() * 10); // 18–27°
    const H = Math.floor(4 + rng() * 5);
    const z = H; // tính cường độ tại đáy tường
    const gamma = r2(1.78 + rng() * 0.15);
    const c_kPa = Math.floor(10 + rng() * 15); // kPa
    const c_T = r2(c_kPa / 10); // đổi sang T/m²
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const sqrtKa = r3(Math.sqrt(Ka));
    const hc = r2(2 * c_T / (gamma * sqrtKa));
    const paz = r2(Ka * gamma * H - 2 * c_T * sqrtKa);
    return { phi, H, z, gamma, c_kPa, c_T, Ka, sqrtKa, hc, paz };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>. Đất sau tường là đất dính có: <strong>φ = ${d.phi}°</strong>, <strong>c = ${d.c_kPa} kPa = ${d.c_T} T/m²</strong>, <strong>γ = ${d.gamma} T/m³</strong>. Bỏ qua ma sát ngoài.<br><br>
    Tính hệ số Ka, chiều sâu vùng âm hc và cường độ áp lực chủ động tại đáy tường (z = H).`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Ka = tg²(45°−φ/2) =',
      unit: '', answer: d => d.Ka, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: '√Ka =',
      unit: '', answer: d => d.sqrtKa, tol: 0.005 },
    { id: 'q3', type: 'fill',
      label: 'Chiều sâu vùng âm hc = 2c/(γ·√Ka) =',
      unit: 'm', answer: d => d.hc, tol: 0.05 },
    { id: 'q4', type: 'fill',
      label: 'Cường độ áp lực tại đáy tường p_a(H) =',
      unit: 'T/m²', answer: d => d.paz, tol: 0.05 },
  ]
};

// ── ch7_b3c: Đất dính – tổng áp lực Ec ───────────────────────────
EXERCISES['ch7_b3c'] = {
  chapterId: 'ch7',
  title: '7.3c – Tổng áp lực chủ động đất DÍNH',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Diện tích tam giác cụt</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <div class="hint-formula">Ec = ½ · p_a(H) · (H − hc)</div>
      Hợp lực đặt tại (H − hc)/3 tính từ đáy tường.
    </div>`,
  genData(rng) {
    const phi = Math.floor(15 + rng() * 12);
    const H = Math.floor(4 + rng() * 5);
    const gamma = r2(1.78 + rng() * 0.15);
    const c_kPa = Math.floor(12 + rng() * 12);
    const c_T = r2(c_kPa / 10);
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const sqrtKa = r3(Math.sqrt(Ka));
    const hc = r2(2 * c_T / (gamma * sqrtKa));
    const paH = r2(Ka * gamma * H - 2 * c_T * sqrtKa);
    // Chỉ tính khi paH > 0 (đất đủ cao)
    const Heff = r2(H - hc);
    const Ec = paH > 0 ? r2(0.5 * paH * Heff) : 0;
    const arm = r2(Heff / 3); // từ đáy
    return { phi, H, gamma, c_kPa, c_T, Ka, sqrtKa, hc, paH, Heff, Ec, arm };
  },
  statement(d) {
    return `Tường chắn cao <strong>H = ${d.H} m</strong>. Đất dính sau tường: <strong>φ = ${d.phi}°</strong>, <strong>c = ${d.c_kPa} kPa</strong>, <strong>γ = ${d.gamma} T/m³</strong>.<br>
    Đã tính được: Ka = ${d.Ka}, √Ka = ${d.sqrtKa}, hc = ${d.hc} m, p_a(H) = ${d.paH} T/m².<br><br>
    Tính tổng áp lực chủ động Ec và vị trí đặt lực (từ đáy tường).`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Chiều cao vùng áp lực dương (H − hc) =',
      unit: 'm', answer: d => d.Heff, tol: 0.05 },
    { id: 'q2', type: 'fill',
      label: 'Tổng áp lực chủ động Ec = ½·p_a(H)·(H−hc) =',
      unit: 'T/m', answer: d => d.Ec, tol: 0.1 },
    { id: 'q3', type: 'fill',
      label: 'Hợp lực Ec đặt cách đáy tường một khoảng =',
      unit: 'm', answer: d => d.arm, tol: 0.05 },
  ]
};

// ── ch7_b3d: Đất rời có tải trọng phân bố q ──────────────────────
EXERCISES['ch7_b3d'] = {
  chapterId: 'ch7',
  title: '7.3d – Áp lực chủ động: đất rời + tải phân bố q',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📖 ÁP LỰC CHỦ ĐỘNG – ĐẤT RỜI + TẢI PHÂN BỐ q</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Tải phân bố đều q tương đương một lớp đất dày q/γ. Biểu đồ áp lực là <b>hình thang</b>:
  </div>
  <div style="background:#fff;border:2px solid #1565c0;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.92rem;font-weight:700;color:#1565c0;">
      p_a(z) = Ka · (γ·z + q)<br>
      E = Ka · q · H + ½ · Ka · γ · H²
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:6px;color:#555;">
    E₁ = Ka·q·H (chữ nhật, đặt tại H/2 từ đáy)<br>
    E₂ = ½·Ka·γ·H² (tam giác, đặt tại H/3 từ đáy)
  </div>
  ${SVG_TUONG_Q}
</div>`,
  hint: `
    <div class="hint-title">💡 Chia E thành 2 phần</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>E₁</b> = Ka · q · H &nbsp;(chữ nhật – từ q)<br>
      <b>E₂</b> = ½ · Ka · γ · H² &nbsp;(tam giác – từ đất)<br>
      <b>E = E₁ + E₂</b>
    </div>`,
  genData(rng) {
    const phi = Math.floor(28 + rng() * 8);
    const H = Math.floor(4 + rng() * 5);
    const z = H; // cường độ tại đáy
    const gamma = r2(1.78 + rng() * 0.12);
    const q = Math.floor(10 + rng() * 20); // kN/m² = 1–3 T/m²
    const q_T = r2(q / 10);
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const paTop = r2(Ka * q_T);        // tại z=0
    const paBot = r2(Ka * (gamma * H + q_T)); // tại z=H
    const E1 = r2(Ka * q_T * H);
    const E2 = r2(0.5 * Ka * gamma * H * H);
    const E = r2(E1 + E2);
    return { phi, H, gamma, q, q_T, Ka, paTop, paBot, E1, E2, E };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>. Đất sau tường là cát: <strong>φ = ${d.phi}°</strong>, <strong>γ = ${d.gamma} T/m³</strong>, c = 0. Mặt đất sau lưng tường nằm ngang, chịu tải trọng phân bố đều <strong>q = ${d.q} kN/m² = ${d.q_T} T/m²</strong>.<br><br>
    Tính cường độ áp lực chủ động tại đỉnh và đáy tường, rồi xác định tổng áp lực Ec.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Ka = tg²(45°−φ/2) =',
      unit: '', answer: d => d.Ka, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: 'Cường độ tại đỉnh p_a(0) = Ka·q =',
      unit: 'T/m²', answer: d => d.paTop, tol: 0.03 },
    { id: 'q3', type: 'fill',
      label: 'Cường độ tại đáy p_a(H) = Ka·(γH+q) =',
      unit: 'T/m²', answer: d => d.paBot, tol: 0.05 },
    { id: 'q4', type: 'fill',
      label: 'Thành phần E₁ = Ka·q·H =',
      unit: 'T/m', answer: d => d.E1, tol: 0.1 },
    { id: 'q5', type: 'fill',
      label: 'Thành phần E₂ = ½·Ka·γ·H² =',
      unit: 'T/m', answer: d => d.E2, tol: 0.1 },
    { id: 'q6', type: 'fill',
      label: 'Tổng áp lực chủ động E = E₁ + E₂ =',
      unit: 'T/m', answer: d => d.E, tol: 0.15 },
  ]
};

// ── ch7_b3e: Đất dính có tải q – cường độ tại z ───────────────────
EXERCISES['ch7_b3e'] = {
  chapterId: 'ch7',
  title: '7.3e – Áp lực chủ động: đất DÍNH + tải q',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Công thức kết hợp</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <div class="hint-formula">p_a(z) = Ka·γ·z − 2c·√Ka + Ka·q</div>
      Biểu đồ: phần âm bỏ qua. hc mới: đặt p_a(z) = 0 → tính z.
    </div>`,
  genData(rng) {
    const phi = Math.floor(18 + rng() * 10);
    const H = Math.floor(4 + rng() * 4);
    const z_ask = H; // cường độ tại đáy
    const gamma = r2(1.78 + rng() * 0.15);
    const c_kPa = Math.floor(10 + rng() * 14);
    const c_T = r2(c_kPa / 10);
    const q = Math.floor(10 + rng() * 15);
    const q_T = r2(q / 10);
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const sqrtKa = r3(Math.sqrt(Ka));
    // hc khi có q: Ka*gamma*z - 2c*sqrtKa + Ka*q = 0 → z = (2c*sqrtKa - Ka*q)/(Ka*gamma)
    const hc_raw = (2 * c_T * sqrtKa - Ka * q_T) / (Ka * gamma);
    const hc = r2(Math.max(0, hc_raw));
    const paH = r2(Ka * gamma * H - 2 * c_T * sqrtKa + Ka * q_T);
    return { phi, H, gamma, c_kPa, c_T, q, q_T, Ka, sqrtKa, hc, paH };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>. Đất dính sau tường: <strong>φ = ${d.phi}°</strong>, <strong>c = ${d.c_kPa} kPa</strong>, <strong>γ = ${d.gamma} T/m³</strong>. Mặt đất chịu tải phân bố đều <strong>q = ${d.q} kN/m²</strong>.<br><br>
    Tính Ka, √Ka, chiều sâu vùng âm hc (khi có q) và cường độ áp lực tại đáy tường.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Ka =', unit: '', answer: d => d.Ka, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: '√Ka =', unit: '', answer: d => d.sqrtKa, tol: 0.005 },
    { id: 'q3', type: 'fill',
      label: 'Chiều sâu vùng âm hc =',
      unit: 'm', answer: d => d.hc, tol: 0.08 },
    { id: 'q4', type: 'fill',
      label: 'Cường độ áp lực tại đáy tường p_a(H) =',
      unit: 'T/m²', answer: d => d.paH, tol: 0.05 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 4 – ÁP LỰC ĐẤT BỊ ĐỘNG
// ch7_b4a: Tính Kb, cường độ và Eb (đất rời)
// ch7_b4b: Đất dính, cường độ tại z, tổng Eb
// ═══════════════════════════════════════════════════════════════════

const LY_THUYET_BI_DONG_HTML = `
<div class="theory-block">
  <div class="theory-label">📖 ÁP LỰC ĐẤT BỊ ĐỘNG</div>
  <div style="font-size:.85rem;line-height:1.8;margin-top:4px;">
    Xảy ra khi tường chuyển vị <b>đẩy vào</b> khối đất. Công thức tương tự chủ động nhưng đổi dấu:
  </div>
  <div style="background:#fff;border:2px solid #1b5e20;border-radius:8px;padding:9px 18px;margin:8px 0;display:inline-block;">
    <span style="font-family:monospace;font-size:.92rem;font-weight:700;color:#1b5e20;">
      Kb = tg²(45° + φ/2)<br><br>
      Đất rời: p_b(z) = Kb·γ·z ; E_b = ½·Kb·γ·H²<br>
      Đất dính: p_b(z) = Kb·γ·z + 2c·√Kb
    </span>
  </div>
  <div style="font-size:.82rem;margin-top:6px;color:#555;">
    Lưu ý: Áp lực bị động LỚN HƠN nhiều so với chủ động.<br>
    Hợp lực E_b đặt tại H/3 từ đáy (đất rời) hoặc tùy dạng biểu đồ (đất dính).
  </div>
</div>`;

// ── ch7_b4a: Tính Kb, cường độ và Eb đất rời ─────────────────────
EXERCISES['ch7_b4a'] = {
  chapterId: 'ch7',
  title: '7.4a – Áp lực đất bị động: đất RỜI',
  type: 'guided',
  theoryHTML: LY_THUYET_BI_DONG_HTML,
  hint: `
    <div class="hint-title">💡 Đổi dấu so với chủ động</div>
    <div style="font-size:.85rem;line-height:1.85;">
      Kb = tg²(45° + φ/2) &nbsp;(góc cộng thay vì trừ)<br>
      p_b(z) = Kb · γ · z<br>
      E_b = ½ · Kb · γ · H²
    </div>`,
  genData(rng) {
    const phi = Math.floor(28 + rng() * 8);
    const H = Math.floor(3 + rng() * 4);
    const z = Math.floor(1 + rng() * (H - 1));
    const gamma = r2(1.8 + rng() * 0.15);
    const Kb = r3(Math.pow(Math.tan((45 + phi / 2) * Math.PI / 180), 2));
    const pbz = r2(Kb * gamma * z);
    const Eb = r2(0.5 * Kb * gamma * H * H);
    return { phi, H, z, gamma, Kb, pbz, Eb };
  },
  statement(d) {
    return `Tường cừ cắm sâu vào đất ở phía trước tường. Đất phía trước: cát có <strong>φ = ${d.phi}°</strong>, <strong>γ = ${d.gamma} T/m³</strong>, c = 0. Chiều sâu phần cắm vào đất <strong>H = ${d.H} m</strong>.<br><br>
    Tính hệ số Kb, cường độ áp lực bị động tại độ sâu <strong>z = ${d.z} m</strong> và tổng áp lực bị động Eb.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Kb = tg²(45°+φ/2) =',
      unit: '', answer: d => d.Kb, tol: 0.01 },
    { id: 'q2', type: 'fill',
      label: 'Cường độ tại z: p_b(z) = Kb·γ·z =',
      unit: 'T/m²', answer: d => d.pbz, tol: 0.05 },
    { id: 'q3', type: 'fill',
      label: 'Tổng áp lực bị động E_b = ½·Kb·γ·H² =',
      unit: 'T/m', answer: d => d.Eb, tol: 0.1 },
  ]
};

// ── ch7_b4b: Đất dính – cường độ và Eb ───────────────────────────
EXERCISES['ch7_b4b'] = {
  chapterId: 'ch7',
  title: '7.4b – Áp lực đất bị động: đất DÍNH',
  type: 'apply',
  hint: `
    <div class="hint-title">💡 Công thức đất dính bị động</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <div class="hint-formula">p_b(z) = Kb·γ·z + 2c·√Kb</div>
      Biểu đồ là hình thang (giá trị &gt; 0 ở đỉnh vì cộng lực dính).<br>
      E_b = ½·(p_b(0) + p_b(H))·H
    </div>`,
  genData(rng) {
    const phi = Math.floor(15 + rng() * 12);
    const H = Math.floor(3 + rng() * 4);
    const z = H;
    const gamma = r2(1.78 + rng() * 0.15);
    const c_kPa = Math.floor(12 + rng() * 15);
    const c_T = r2(c_kPa / 10);
    const Kb = r3(Math.pow(Math.tan((45 + phi / 2) * Math.PI / 180), 2));
    const sqrtKb = r3(Math.sqrt(Kb));
    const pb0 = r2(2 * c_T * sqrtKb); // tại đỉnh z=0
    const pbH = r2(Kb * gamma * H + 2 * c_T * sqrtKb);
    const Eb = r2(0.5 * (pb0 + pbH) * H);
    return { phi, H, gamma, c_kPa, c_T, Kb, sqrtKb, pb0, pbH, Eb };
  },
  statement(d) {
    return `Đất phía trước tường cừ (phần cắm sâu H = ${d.H} m) là đất dính: <strong>φ = ${d.phi}°</strong>, <strong>c = ${d.c_kPa} kPa</strong>, <strong>γ = ${d.gamma} T/m³</strong>.<br>
    Đã tính Kb = ${d.Kb}, √Kb = ${d.sqrtKb}.<br><br>
    Tính cường độ áp lực bị động tại đỉnh (z=0), tại đáy (z=H) và tổng áp lực bị động Eb.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'p_b(0) = 2c·√Kb =',
      unit: 'T/m²', answer: d => d.pb0, tol: 0.05 },
    { id: 'q2', type: 'fill',
      label: 'p_b(H) = Kb·γ·H + 2c·√Kb =',
      unit: 'T/m²', answer: d => d.pbH, tol: 0.05 },
    { id: 'q3', type: 'fill',
      label: 'Tổng áp lực bị động Eb = ½·(p_b0 + p_bH)·H =',
      unit: 'T/m', answer: d => d.Eb, tol: 0.1 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
// PHẦN 5 – BÀI TỔNG HỢP (ch7_bz)
// ch7_bz: Cho đủ thông số, tính cường độ ở nhiều vị trí,
//          xác định E, vị trí đặt lực → tổng hợp biểu đồ
// ═══════════════════════════════════════════════════════════════════

EXERCISES['ch7_bz'] = {
  chapterId: 'ch7',
  title: '7.z – Tổng hợp: Biểu đồ và tổng áp lực chủ động đầy đủ',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📋 TỔNG HỢP CÔNG THỨC – ÁP LỰC ĐẤT CHỦ ĐỘNG</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:6px;">
    <thead>
      <tr style="background:#1565c0;color:#fff;text-align:center;">
        <th style="padding:5px 8px;">Trường hợp</th>
        <th style="padding:5px 8px;">Cường độ p_a(z)</th>
        <th style="padding:5px 8px;">Tổng E_c</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fff9c4;text-align:center;">
        <td style="padding:5px 8px;font-weight:700;">Rời (c=0)</td>
        <td style="font-family:monospace;padding:5px 8px;">Ka·γ·z</td>
        <td style="font-family:monospace;padding:5px 8px;">½·Ka·γ·H²</td>
      </tr>
      <tr style="text-align:center;">
        <td style="padding:5px 8px;font-weight:700;">Dính (c≠0)</td>
        <td style="font-family:monospace;padding:5px 8px;">Ka·γ·z − 2c·√Ka</td>
        <td style="font-family:monospace;padding:5px 8px;">½·p_a(H)·(H−hc)</td>
      </tr>
      <tr style="background:#fff9c4;text-align:center;">
        <td style="padding:5px 8px;font-weight:700;">Rời + q</td>
        <td style="font-family:monospace;padding:5px 8px;">Ka·(γ·z + q)</td>
        <td style="font-family:monospace;padding:5px 8px;">Ka·q·H + ½·Ka·γ·H²</td>
      </tr>
      <tr style="text-align:center;">
        <td style="padding:5px 8px;font-weight:700;">Dính + q</td>
        <td style="font-family:monospace;padding:5px 8px;">Ka·γ·z − 2c·√Ka + Ka·q</td>
        <td style="padding:5px 8px;">Theo biểu đồ thực tế</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top:8px;font-size:.8rem;color:#555;">
    Ka = tg²(45°−φ/2); Kb = tg²(45°+φ/2); K₀ = μ/(1−μ)<br>
    Hợp lực tam giác đặt tại H/3 từ đáy; hình thang đặt giữa E₁·(H/2) và E₂·(H/3).
  </div>
</div>`,
  hint: `
    <div class="hint-title">💡 Trình tự bài tổng hợp</div>
    <div style="font-size:.85rem;line-height:1.85;">
      <b>B1.</b> Tính Ka (nếu đất rời) hoặc Ka + √Ka (nếu đất dính)<br>
      <b>B2.</b> Tính cường độ tại đỉnh và đáy tường<br>
      <b>B3.</b> Tính hc nếu đất dính<br>
      <b>B4.</b> Tính E₁ (hình thang từ q) và E₂ (tam giác từ đất)<br>
      <b>B5.</b> E = E₁ + E₂, xác định vị trí đặt lực
    </div>`,
  genData(rng) {
    // Bài tổng hợp: đất rời có q
    const phi = Math.floor(30 + rng() * 6); // 30–35°
    const H = Math.floor(5 + rng() * 5); // 5–9 m
    const gamma = r2(1.8 + rng() * 0.15);
    const q = Math.floor(15 + rng() * 20); // kN/m²
    const q_T = r2(q / 10);
    const Ka = r3(Math.pow(Math.tan((45 - phi / 2) * Math.PI / 180), 2));
    const paTop = r2(Ka * q_T);
    const paBot = r2(Ka * (gamma * H + q_T));
    const E1 = r2(Ka * q_T * H); // chữ nhật
    const E2 = r2(0.5 * Ka * gamma * H * H); // tam giác
    const E = r2(E1 + E2);
    // Vị trí hợp lực từ đáy
    const z1 = r2(H / 2);
    const z2 = r2(H / 3);
    const z_E = r2((E1 * z1 + E2 * z2) / E);
    return { phi, H, gamma, q, q_T, Ka, paTop, paBot, E1, E2, E, z1, z2, z_E };
  },
  statement(d) {
    return `Tường chắn cứng cao <strong>H = ${d.H} m</strong>, lưng thẳng đứng. Đất sau tường là cát thô có <strong>φ = ${d.phi}°</strong>, <strong>γ = ${d.gamma} T/m³</strong>, c = 0. Mặt đất nằm ngang chịu tải trọng phân bố đều <strong>q = ${d.q} kN/m² = ${d.q_T} T/m²</strong>. Bỏ qua ma sát ngoài giữa đất và tường.<br><br>
    Xác định đầy đủ biểu đồ áp lực chủ động, tổng áp lực và vị trí đặt lực.`;
  },
  questions: [
    { id: 'q1', type: 'fill',
      label: 'Ka = tg²(45°−φ/2) =',
      unit: '', answer: d => d.Ka, tol: 0.005 },
    { id: 'q2', type: 'fill',
      label: 'Cường độ tại đỉnh tường p_a(0) = Ka·q =',
      unit: 'T/m²', answer: d => d.paTop, tol: 0.03 },
    { id: 'q3', type: 'fill',
      label: 'Cường độ tại đáy tường p_a(H) = Ka·(γH+q) =',
      unit: 'T/m²', answer: d => d.paBot, tol: 0.05 },
    { id: 'q4', type: 'fill',
      label: 'Thành phần E₁ = Ka·q·H (phần hình chữ nhật) =',
      unit: 'T/m', answer: d => d.E1, tol: 0.1 },
    { id: 'q5', type: 'fill',
      label: 'Thành phần E₂ = ½·Ka·γ·H² (phần tam giác) =',
      unit: 'T/m', answer: d => d.E2, tol: 0.1 },
    { id: 'q6', type: 'fill',
      label: 'Tổng áp lực chủ động E = E₁ + E₂ =',
      unit: 'T/m', answer: d => d.E, tol: 0.15 },
    { id: 'q7', type: 'fill',
      label: 'Vị trí đặt hợp lực E cách đáy tường =',
      unit: 'm', answer: d => d.z_E, tol: 0.08 },
  ]
};


// ═══════════════════════════════════════════════════════════════════
// TÓM TẮT CÔNG THỨC CUỐI CHƯƠNG 7
// ═══════════════════════════════════════════════════════════════════

EXERCISES['ch7_tomtat'] = {
  chapterId: 'ch7',
  title: '7.★ Tóm tắt công thức Chương 7',
  type: 'guided',
  theoryHTML: `
<div class="theory-block">
  <div class="theory-label">📚 TÓM TẮT CÔNG THỨC – CHƯƠNG 7: ÁP LỰC ĐẤT LÊN TƯỜNG CHẮN</div>

  <div style="margin-top:10px;font-weight:700;color:#e65100;font-size:.9rem;">▸ A. HỆ SỐ ÁP LỰC ĐẤT</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#fff9c4;">
      <td style="padding:5px 8px;width:30%;font-weight:700;">Tĩnh K₀</td>
      <td style="padding:5px 8px;font-family:monospace;">K₀ = ξ = μ/(1−μ) &nbsp;(μ = hệ số Poisson)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Chủ động Ka</td>
      <td style="padding:5px 8px;font-family:monospace;">Ka = tg²(45° − φ/2)</td>
    </tr>
    <tr style="background:#e8f5e9;">
      <td style="padding:5px 8px;font-weight:700;">Bị động Kb</td>
      <td style="padding:5px 8px;font-family:monospace;">Kb = tg²(45° + φ/2)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Quan hệ</td>
      <td style="padding:5px 8px;font-family:monospace;">Ka &lt; K₀ &lt; Kb &nbsp;|&nbsp; Ka · Kb = 1</td>
    </tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ B. ÁP LỰC ĐẤT TĨNH</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#fff9c4;">
      <td style="padding:5px 8px;width:30%;font-weight:700;">Cường độ tại z</td>
      <td style="padding:5px 8px;font-family:monospace;">p₀(z) = K₀ · γ · z</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;font-weight:700;">Tổng E₀</td>
      <td style="padding:5px 8px;font-family:monospace;">E₀ = ½ · K₀ · γ · H² &nbsp;(đặt tại H/3 từ đáy)</td>
    </tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#1565c0;font-size:.9rem;">▸ C. ÁP LỰC ĐẤT CHỦ ĐỘNG (Ka)</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;" colspan="2" style="color:#1565c0;">ĐẤT RỜI (c = 0)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;width:30%;">Cường độ</td>
      <td style="padding:5px 8px;font-family:monospace;">p_a(z) = Ka · γ · z</td>
    </tr>
    <tr style="background:#f7faff;">
      <td style="padding:5px 8px;">Tổng E_c</td>
      <td style="padding:5px 8px;font-family:monospace;">Ec = ½ · Ka · γ · H² &nbsp;(H/3 từ đáy)</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;" colspan="2">ĐẤT DÍNH (c ≠ 0)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;">Cường độ</td>
      <td style="padding:5px 8px;font-family:monospace;">p_a(z) = Ka·γ·z − 2c·√Ka</td>
    </tr>
    <tr style="background:#f7faff;">
      <td style="padding:5px 8px;">Chiều sâu âm</td>
      <td style="padding:5px 8px;font-family:monospace;">hc = 2c / (γ·√Ka) &nbsp;(vùng trên hc bỏ qua)</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;">Tổng Ec</td>
      <td style="padding:5px 8px;font-family:monospace;">Ec = ½·p_a(H)·(H−hc) &nbsp;((H−hc)/3 từ đáy)</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;" colspan="2">ĐẤT RỜI + TẢI q</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;">Cường độ</td>
      <td style="padding:5px 8px;font-family:monospace;">p_a(z) = Ka·(γ·z + q)</td>
    </tr>
    <tr style="background:#f7faff;">
      <td style="padding:5px 8px;">Tổng E</td>
      <td style="padding:5px 8px;font-family:monospace;">E = Ka·q·H + ½·Ka·γ·H² = E₁ + E₂</td>
    </tr>
    <tr style="background:#e3f2fd;">
      <td style="padding:5px 8px;font-weight:700;" colspan="2">ĐẤT DÍNH + TẢI q</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;">Cường độ</td>
      <td style="padding:5px 8px;font-family:monospace;">p_a(z) = Ka·γ·z − 2c·√Ka + Ka·q</td>
    </tr>
  </table>

  <div style="margin-top:12px;font-weight:700;color:#1b5e20;font-size:.9rem;">▸ D. ÁP LỰC ĐẤT BỊ ĐỘNG (Kb)</div>
  <table style="border-collapse:collapse;font-size:.82rem;width:100%;margin-top:4px;">
    <tr style="background:#e8f5e9;">
      <td style="padding:5px 8px;width:30%;">Đất rời</td>
      <td style="padding:5px 8px;font-family:monospace;">p_b(z) = Kb·γ·z ; E_b = ½·Kb·γ·H²</td>
    </tr>
    <tr>
      <td style="padding:5px 8px;">Đất dính</td>
      <td style="padding:5px 8px;font-family:monospace;">p_b(z) = Kb·γ·z + 2c·√Kb</td>
    </tr>
  </table>
  <div style="margin-top:8px;font-size:.78rem;color:#555;line-height:1.6;">
    <b>Đơn vị hay dùng:</b> γ [T/m³], c [T/m²], p [T/m²], E [T/m], H và z [m].<br>
    1 kPa = 0.1 T/m²; 1 T/m² = 10 kPa.
  </div>
</div>`,
  hint: `<div class="hint-title">💡 Tóm tắt công thức ôn tập – không có câu hỏi tính toán.</div>`,
  genData(rng) {
    return {};
  },
  statement(d) { return ''; },
  questions: []
};
