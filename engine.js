// ═══════════════════════════════════════════════════════
//  engine.js – Logic chính
//  KHÔNG SỬA FILE NÀY
// ═══════════════════════════════════════════════════════

// ── Math helpers ──
function r2(v) { return Math.round(v * 100) / 100; }
function r3(v) { return Math.round(v * 1000) / 1000; }

function makeRNG(seed) {
  let s = Math.abs(seed * 1664525 + 1013904223) & 0x7fffffff;
  return () => { s = (s * 1664525 + 1013904223) & 0x7fffffff; return s / 0x7fffffff; };
}

// ── Toast ──
let _tt;
function toast(msg, dur = 3000) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(() => el.classList.remove('show'), dur);
}

// ── Loading ──
function loading(show) {
  document.getElementById('loading-overlay').classList.toggle('show', show);
}

// ── Timer ──
const TIMER = {
  t: 0, iv: null,
  start() {
    this.t = Date.now(); clearInterval(this.iv);
    this.iv = setInterval(() => {
      const s = Math.floor((Date.now() - this.t) / 1000);
      const str = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
      const tb = document.getElementById('timer-badge');
      const sc = document.getElementById('sb-clock');
      if (tb) tb.textContent = str;
      if (sc) sc.textContent = str;
    }, 1000);
  },
  elapsed() {
    const s = Math.floor((Date.now() - this.t) / 1000);
    return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }
};

// ════════════════════════════════════════════════════════
//  CONFIG – localStorage
// ════════════════════════════════════════════════════════
const CFG_KEY = 'chd_config';

const DEFAULT_CFG = {
  gasUrl:       '',
  teacher:      'TS. Phạm Việt Anh · Bộ môn Cơ học đất - Nền móng · ĐHXD Hà Nội',
  adminPw:      'admin123',
  showFeedback: false,
  showScore:    true,
  classes: [
    { id: '68XDC1', name: 'Lớp 68XDC1' },
    { id: '68XDC2', name: 'Lớp 68XDC2' },
  ],
  schedule: {
    ch3: { open: null, close: null, minPct: 80, active: true  },
    ch4: { open: null, close: null, minPct: 80, active: true  },
    ch5: { open: null, close: null, minPct: 80, active: false },
    ch6: { open: null, close: null, minPct: 80, active: false },
  }
};

function loadCfg() {
  try {
    const saved = JSON.parse(localStorage.getItem(CFG_KEY));
    if (!saved) return JSON.parse(JSON.stringify(DEFAULT_CFG));
    return {
      ...DEFAULT_CFG, ...saved,
      schedule: { ...DEFAULT_CFG.schedule, ...(saved.schedule || {}) }
    };
  } catch { return JSON.parse(JSON.stringify(DEFAULT_CFG)); }
}

function saveCfg(cfg) {
  localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
}

function applyFeedback() {
  const cfg = loadCfg();
  document.body.classList.toggle('no-feedback', !cfg.showFeedback);
}

// ════════════════════════════════════════════════════════
//  Gửi kết quả qua Cloudflare Worker → Google Sheet
// ════════════════════════════════════════════════════════
const WORKER_URL = 'https://chd-results.phamvietanh158.workers.dev';

async function gasSend(payload) {
  if (!payload.name || !payload.mssv) {
    console.warn('[CHD] Thiếu tên/MSSV, không gửi kết quả.');
    return;
  }

  // Hiển thị trạng thái nếu có element
  const statusEl = document.getElementById('submit-status');
  if (statusEl) {
    statusEl.textContent = '⏳ Đang ghi kết quả...';
    statusEl.style.color = '#e65100';
  }

  try {
    const resp = await fetch(WORKER_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        name:      String(payload.name      || '').trim(),
        mssv:      String(payload.mssv      || '').trim(),
        stt:       Number(payload.stt)       || 0,
        classId:   String(payload.classId   || ''),
        chapterId: String(payload.chapterId || ''),
        score:     Number(payload.score)     || 0,
        total:     Number(payload.total)     || 0,
        correct:   Number(payload.correct)   || 0,
        duration:  String(payload.duration  || ''),
      })
    });

    const data = await resp.json();

    if (data.ok) {
      console.log('[CHD] ✅ Kết quả đã ghi vào Google Sheet.');
      if (statusEl) {
        statusEl.textContent = '✅ Đã ghi kết quả!';
        statusEl.style.color = '#2e7d32';
      }
    } else {
      throw new Error(data.error || 'Worker lỗi không xác định');
    }
  } catch (err) {
    console.error('[CHD] ❌ Gửi kết quả thất bại:', err.message);
    if (statusEl) {
      statusEl.textContent = '⚠️ Chưa ghi được – kiểm tra mạng.';
      statusEl.style.color = '#c62828';
    }
  }
}

// ════════════════════════════════════════════════════════
//  ADMIN
// ════════════════════════════════════════════════════════
const ADMIN = {
  loggedIn: false,

  open() {
    document.getElementById('admin-overlay').classList.add('show');
    if (this.loggedIn) { this.showDashboard(); return; }
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
    document.getElementById('admin-pw').value = '';
    document.getElementById('admin-login-err').classList.add('hidden');
    setTimeout(() => document.getElementById('admin-pw').focus(), 100);
  },

  close() { document.getElementById('admin-overlay').classList.remove('show'); },

  login() {
    const pw  = document.getElementById('admin-pw').value;
    const cfg = loadCfg();
    if (pw !== cfg.adminPw) {
      const err = document.getElementById('admin-login-err');
      err.textContent = '❌ Mật khẩu không đúng.';
      err.classList.remove('hidden'); return;
    }
    this.loggedIn = true;
    this.showDashboard();
  },

  showDashboard() {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    this.renderSchedule();
    this.renderClasses();
    this.renderSettingsForm();
  },

  switchTab(name, btn) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('pane-' + name).classList.add('active');
  },

  renderSchedule() {
    const cfg = loadCfg();
    document.getElementById('schedule-tbody').innerHTML = CHAPTERS_DEF.map(ch => {
      const s = cfg.schedule[ch.id] || { minPct: 80, active: false };
      return `<tr>
        <td><strong>${ch.icon} ${ch.name}</strong><br>
          <span style="font-size:.74rem;color:#607080">${ch.desc}</span></td>
        <td><input type="datetime-local" id="sch-open-${ch.id}"  value="${s.open  || ''}" /></td>
        <td><input type="datetime-local" id="sch-close-${ch.id}" value="${s.close || ''}" /></td>
        <td><input type="number" class="min-pct-input" id="sch-pct-${ch.id}"
              value="${s.minPct || 80}" min="0" max="100" />%</td>
        <td><label class="toggle-switch">
          <input type="checkbox" id="sch-active-${ch.id}" ${s.active ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label></td>
      </tr>`;
    }).join('');
  },

  saveSchedule() {
    const cfg = loadCfg();
    CHAPTERS_DEF.forEach(ch => {
      cfg.schedule[ch.id] = {
        open:   document.getElementById(`sch-open-${ch.id}`)?.value  || null,
        close:  document.getElementById(`sch-close-${ch.id}`)?.value || null,
        minPct: parseInt(document.getElementById(`sch-pct-${ch.id}`)?.value) || 80,
        active: document.getElementById(`sch-active-${ch.id}`)?.checked || false,
      };
    });
    saveCfg(cfg);
    if (APP.student) APP.renderTabs();
    document.getElementById('schedule-msg').innerHTML = '<div class="succ-box">✅ Đã lưu lịch!</div>';
    setTimeout(() => document.getElementById('schedule-msg').innerHTML = '', 2200);
    toast('✅ Đã lưu lịch!');
  },

  resetSchedule() {
    if (!confirm('Reset lịch về mặc định?')) return;
    const cfg = loadCfg();
    cfg.schedule = JSON.parse(JSON.stringify(DEFAULT_CFG.schedule));
    saveCfg(cfg); this.renderSchedule();
    toast('↺ Đã reset!');
  },

  renderClasses() {
    const cfg = loadCfg();
    document.getElementById('class-list').innerHTML = (cfg.classes || []).map((c, i) =>
      `<li class="class-item">
        <span class="class-badge">${String(i+1).padStart(2,'0')}</span>
        <input type="text" id="cls-id-${i}"   value="${c.id}"   placeholder="Mã lớp" />
        <input type="text" id="cls-name-${i}" value="${c.name}" placeholder="Tên lớp" />
        <button class="btn btn-danger btn-sm" onclick="ADMIN.removeClass(${i})">✕</button>
      </li>`
    ).join('');
  },

  addClass() {
    const cfg = loadCfg(); cfg.classes.push({ id: '', name: '' });
    saveCfg(cfg); this.renderClasses();
  },

  removeClass(i) {
    const cfg = loadCfg(); cfg.classes.splice(i, 1);
    saveCfg(cfg); this.renderClasses();
  },

  saveClasses() {
    const cfg = loadCfg();
    cfg.classes = Array.from({ length: cfg.classes.length }, (_, i) => ({
      id:   (document.getElementById(`cls-id-${i}`)?.value   || '').trim(),
      name: (document.getElementById(`cls-name-${i}`)?.value || '').trim(),
    })).filter(c => c.id);
    saveCfg(cfg); APP.populateClasses();
    document.getElementById('classes-msg').innerHTML = '<div class="succ-box">✅ Đã lưu!</div>';
    setTimeout(() => document.getElementById('classes-msg').innerHTML = '', 2200);
    toast('✅ Đã lưu danh sách lớp!');
  },

  renderSettingsForm() {
    const cfg = loadCfg();
    document.getElementById('setting-gas-url').value  = cfg.gasUrl  || '';
    document.getElementById('setting-teacher').value  = cfg.teacher || '';
    document.getElementById('setting-new-pw').value   = '';
    document.getElementById('opt-feedback').checked   = !!cfg.showFeedback;
    document.getElementById('opt-show-score').checked = cfg.showScore !== false;
  },

  saveSettings() {
    const cfg = loadCfg();
    cfg.gasUrl       = (document.getElementById('setting-gas-url').value || '').trim();
    cfg.teacher      = (document.getElementById('setting-teacher').value  || '').trim();
    cfg.showFeedback = document.getElementById('opt-feedback').checked;
    cfg.showScore    = document.getElementById('opt-show-score').checked;
    const newPw = (document.getElementById('setting-new-pw').value || '').trim();
    if (newPw) cfg.adminPw = newPw;
    saveCfg(cfg);
    if (cfg.teacher) document.getElementById('site-sub').textContent = cfg.teacher;
    applyFeedback();
    document.getElementById('settings-msg').innerHTML = '<div class="succ-box">✅ Đã lưu!</div>';
    setTimeout(() => document.getElementById('settings-msg').innerHTML = '', 2200);
    toast('✅ Đã lưu cài đặt!');
  },
};

// ════════════════════════════════════════════════════════
//  APP
// ════════════════════════════════════════════════════════
const APP = {
  student:   null,
  exData:    {},
  answers:   {},
  checked:   {},
  currentCh: null,
  minPct:    80,

  init() {
    const cfg = loadCfg();
    if (cfg.teacher) document.getElementById('site-sub').textContent = cfg.teacher;
    applyFeedback();
    this.populateClasses();
    this.renderTabs();
  },

  populateClasses() {
    const cfg = loadCfg();
    const sel = document.getElementById('f-class');
    sel.innerHTML = '<option value="">-- Chọn lớp của bạn --</option>';
    (cfg.classes || []).forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id; opt.textContent = c.name || c.id;
      sel.appendChild(opt);
    });
  },

  chapterStatus(chId) {
    const cfg = loadCfg();
    const s   = cfg.schedule?.[chId];
    if (!s || !s.active) return 'locked';
    const now   = Date.now();
    const open  = s.open  ? new Date(s.open).getTime()  : null;
    const close = s.close ? new Date(s.close).getTime() : null;
    if (open  && now < open)  return 'soon';
    if (close && now > close) return 'closed';
    return 'open';
  },

  renderTabs() {
    const logged = !!this.student;
    const icons  = { open: '✅', soon: '🕐', closed: '⛔', locked: '🔒' };
    document.getElementById('chapter-tabs').innerHTML = CHAPTERS_DEF.map(ch => {
      const st = logged ? this.chapterStatus(ch.id) : 'locked';
      return `<button class="ch-tab ${st !== 'open' ? 'locked' : ''} ${this.currentCh === ch.id ? 'active' : ''}"
        id="tab-${ch.id}" onclick="APP.clickTab('${ch.id}')">
        <span>${ch.icon}</span>${ch.name}
        ${logged ? `<span style="font-size:.62rem;opacity:.8;">${icons[st]}</span>` : ''}
      </button>`;
    }).join('');
  },

  clickTab(chId) {
    if (!this.student) { toast('⚠️ Nhập thông tin trước.'); return; }
    const st = this.chapterStatus(chId);
    const msgs = {
      locked: '🔒 Chương chưa được mở.',
      soon:   '🕐 Chưa đến giờ mở.',
      closed: '⛔ Đã hết hạn nộp.'
    };
    if (st !== 'open') { toast(msgs[st] || msgs.locked); return; }
    this.switchChapter(chId);
  },

  start() {
    const name    = (document.getElementById('f-name').value  || '').trim();
    const mssv    = (document.getElementById('f-mssv').value  || '').trim();
    const stt     = parseInt(document.getElementById('f-stt').value);
    const classId = document.getElementById('f-class').value;
    const errEl   = document.getElementById('login-err');
    errEl.classList.add('hidden');

    if (!name || !mssv || !stt || !classId) {
      errEl.textContent = '⚠️ Vui lòng điền đầy đủ tất cả thông tin.';
      errEl.classList.remove('hidden'); return;
    }

    this.student  = { name, mssv, stt, classId };
    this.answers  = {};
    this.checked  = {};
    this.exData   = {};

    // Sinh số liệu
    Object.entries(EXERCISES).forEach(([id, ex], i) => {
      this.exData[id] = ex.genData(makeRNG(stt * 997 + i * 31 + 7));
    });

    // UI
    document.getElementById('sb-av').textContent   = name.slice(-1).toUpperCase();
    document.getElementById('sb-name').textContent = name;
    document.getElementById('sb-meta').textContent = `MSSV: ${mssv} · STT: ${stt} · ${classId}`;
    document.getElementById('student-bar').style.display   = 'flex';
    document.getElementById('timer-badge').style.display   = 'block';
    document.getElementById('card-login').style.display    = 'none';
    document.getElementById('exercise-area').classList.remove('hidden');
    document.getElementById('submit-section').style.display = 'block';

    this.renderTabs();
    TIMER.start();

    const first = CHAPTERS_DEF.find(c => this.chapterStatus(c.id) === 'open');
    if (first) this.switchChapter(first.id);
    else {
      document.getElementById('ch-title').textContent = 'Chưa có chương nào được mở.';
      document.getElementById('ch-desc').textContent  = 'Vui lòng chờ giảng viên mở bài.';
    }
    toast('✅ Đề bài đã sẵn sàng!');
  },

  // ── Thoát ──
  exitConfirm() {
    const scoreVisible = document.getElementById('score-panel').style.display === 'block';
    if (scoreVisible) { location.reload(); return; }
    const answered = Object.values(this.answers).filter(v => v != null).length;
    if (answered > 0) {
      if (!confirm('⚠️ Bài làm chưa được nộp!\nBạn có chắc muốn thoát? Dữ liệu sẽ bị mất.')) return;
    }
    location.reload();
  },

  switchChapter(chId) {
    this.currentCh = chId;
    document.querySelectorAll('.ch-tab').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById('tab-' + chId);
    if (tab) tab.classList.add('active');

    const ch  = CHAPTERS_DEF.find(c => c.id === chId);
    const cfg = loadCfg();
    const sch = cfg.schedule?.[chId] || {};
    this.minPct = sch.minPct || 80;
    document.getElementById('min-pct-lbl').textContent = this.minPct + '%';
    document.getElementById('ch-icon').textContent  = ch.icon;
    document.getElementById('ch-title').textContent = `${ch.name} – ${ch.desc}`;

    const st      = this.chapterStatus(chId);
    const badgeEl = document.getElementById('ch-badge');
    const labels  = { open: '✅ Đang mở', soon: '🕐 Chưa mở', closed: '⛔ Đã đóng', locked: '🔒 Chưa mở' };
    badgeEl.textContent = labels[st] || st;
    badgeEl.className   = 'ch-badge ' + st;

    if (st === 'open' && sch.close) {
      document.getElementById('ch-desc').textContent = `Hạn nộp: ${new Date(sch.close).toLocaleString('vi-VN')}`;
    } else {
      document.getElementById('ch-desc').textContent = ch.desc;
    }

    const exIds = Object.keys(EXERCISES).filter(id => EXERCISES[id].chapterId === chId);
    this.renderExercises(exIds, st);
  },

  renderExercises(exIds, status) {
    const cont = document.getElementById('problems-container');
    cont.innerHTML = '';

    if (status !== 'open') {
      const m = {
        soon:   { icon: '🕐', title: 'Chưa đến giờ mở',   sub: 'Vui lòng quay lại đúng thời gian được thông báo.' },
        closed: { icon: '⛔', title: 'Đã hết hạn nộp bài', sub: 'Bạn không thể làm bài sau thời hạn.' },
        locked: { icon: '🔒', title: 'Chưa được mở',       sub: 'Giảng viên sẽ mở sau khi dạy xong nội dung.' },
      }[status] || { icon: '🔒', title: 'Chưa mở', sub: '' };
      cont.innerHTML = `<div class="locked-msg">
        <span class="lock-icon">${m.icon}</span>
        <h4>${m.title}</h4><p>${m.sub}</p>
      </div>`;
      document.getElementById('progress-wrap').style.display = 'none';
      return;
    }

    if (!exIds.length) {
      cont.innerHTML = `<div class="locked-msg">
        <span class="lock-icon">📭</span>
        <h4>Chưa có bài tập</h4>
        <p>Bài tập sẽ được thêm sớm.</p>
      </div>`;
      document.getElementById('progress-wrap').style.display = 'none';
      return;
    }

    document.getElementById('progress-wrap').style.display = 'block';
    exIds.forEach((id, i) => cont.appendChild(this.buildCard(id, i)));
    this.updateProgress();
  },

  // ── Build 1 bài tập ──
  buildCard(exId, idx) {
    const ex   = EXERCISES[exId];
    const data = this.exData[exId];
    const card = document.createElement('div');
    card.className = 'prob-card';
    card.style.animationDelay = (idx * 0.07) + 's';

    let html = `
      <div class="prob-head">
        <span class="prob-num">BÀI ${idx + 1}</span>
        <span class="prob-title">${ex.title}</span>
        <span class="prob-type">${ex.type === 'guided' ? '📖 LT + BT' : '✏️ Áp dụng'}</span>
      </div>
      <div class="prob-body">`;

    // ── LÝ THUYẾT ──
    const hasTheory = ex.theoryHTML || ex.theory?.url || ex.hint;
    if (hasTheory) {
      html += `
        <div class="section-bar">
          <hr class="sec-line">
          <span class="section-tag tag-theory">📖 Lý thuyết</span>
          <hr class="sec-line">
        </div>`;

      if (ex.theoryHTML) {
        html += ex.theoryHTML;
      } else if (ex.theory?.url) {
        html += `<div class="theory-block">
          <div class="theory-label">📖 Nhắc lại lý thuyết</div>
          <img src="${ex.theory.url}" alt="Lý thuyết"
            onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
          <div class="img-error" style="display:none;">🖼️ Chưa có ảnh – dán link Drive vào theory.url</div>
          <p class="theory-caption">${ex.theory.caption || ''}</p>
        </div>`;
      }
      if (ex.hint) {
        html += `<div class="hint-box">${ex.hint}</div>`;
      }
    }

    // ── BÀI TẬP ──
    html += `
      <div class="section-bar">
        <hr class="sec-line">
        <span class="section-tag tag-exercise">✏️ Bài tập</span>
        <hr class="sec-line">
      </div>
      <div class="exercise-zone">`;

    if (ex.dataTable) {
      const rows = ex.dataTable(data);
      html += `<table class="data-table">
        <thead><tr>
          <th>Thông số</th><th>Kí hiệu</th><th>Giá trị</th><th>Đơn vị</th>
        </tr></thead>
        <tbody>${rows.map(r =>
          `<tr>
            <td>${r.param}</td>
            <td class="dt-sym">${r.sym}</td>
            <td class="dt-val">${r.val}</td>
            <td class="dt-unit">${r.unit}</td>
          </tr>`).join('')}
        </tbody>
      </table>`;
    }

    html += `<div class="prob-stmt">${ex.statement(data)}</div>
    </div>`; // close exercise-zone

    // ── ĐIỀN ĐÁP SỐ ──
    html += `
      <div class="section-bar">
        <hr class="sec-line">
        <span class="section-tag tag-answer">📝 Điền đáp số</span>
        <hr class="sec-line">
      </div>
      <div class="answer-zone">`;

    ex.questions.forEach((q, qi) => {
      const key = exId + '_' + q.id;

      if (q.type === 'fill') {
        html += `
          <div class="ans-row">
            <span class="ans-label">${q.label}</span>
            <input class="ans-input" type="number" step="any"
              id="inp-${key}" placeholder="..."
              oninput="APP.checkFill('${exId}','${q.id}')" />
            <span class="ans-unit">${q.unit || ''}</span>
            <span class="s-chip" id="chip-${key}"></span>
          </div>`;

      } else if (q.type === 'mcq') {
        const choices = q.choices(data);
        html += `
          <div class="mcq-wrap">
            <div class="mcq-label">${q.label}</div>
            <div class="mcq-opts" id="mcq-${key}">`;

        choices.forEach((c, ci) => {
          const label = c.replace(/^[A-Z][.)]\s*/, '');
          html += `<div class="mcq-opt" id="opt-${key}-${ci}"
            onclick="APP.pickMCQ('${exId}','${q.id}',${ci})">
            <span class="mcq-key">${String.fromCharCode(65 + ci)}</span>
            <span>${label}</span>
          </div>`;
        });

        html += `</div>
            <span class="s-chip" id="chip-${key}" style="display:inline-flex;margin-top:6px;"></span>
          </div>`;
      }
    });

    html += `</div>`; // close answer-zone
    html += `</div>`; // close prob-body

    card.innerHTML = html;
    return card;
  },

  // ── Check fill ──
  checkFill(exId, qId) {
    const ex   = EXERCISES[exId];
    if (!ex) return;
    const q    = ex.questions.find(x => x.id === qId);
    if (!q) return;
    const data = this.exData[exId];
    const key  = exId + '_' + qId;
    const val  = parseFloat(document.getElementById('inp-' + key).value);
    const inp  = document.getElementById('inp-' + key);
    const chip = document.getElementById('chip-' + key);

    if (isNaN(val)) {
      if (inp)  inp.className  = 'ans-input';
      if (chip) { chip.textContent = ''; chip.className = 's-chip'; }
      this.answers[key] = null;
      this.updateProgress(); return;
    }

    const correct = q.answer(data);
    const ok = Math.abs(val - correct) <= q.tol;
    this.answers[key] = val;
    this.checked[key] = ok;

    if (inp) inp.className  = 'ans-input ' + (ok ? 'correct' : 'wrong');
    if (chip) {
      chip.textContent = ok ? '✓ Đúng' : '✗ Kiểm tra lại';
      chip.className   = 's-chip show ' + (ok ? 'ok' : 'err');
    }
    this.updateProgress();
  },

  // ── Pick MCQ ──
  pickMCQ(exId, qId, chosenIdx) {
    const ex = EXERCISES[exId];
    if (!ex) return;
    const q = ex.questions.find(x => x.id === qId);
    if (!q) return;
    const data = this.exData[exId];
    const key  = exId + '_' + qId;
    const correctIdx = q.correctIndex(data);
    const ok = chosenIdx === correctIdx;

    this.answers[key] = chosenIdx;
    this.checked[key] = ok;

    // Reset + highlight
    const container = document.getElementById('mcq-' + key);
    if (container) {
      Array.from(container.children).forEach((el, i) => {
        el.className = 'mcq-opt';
        if (i === chosenIdx) el.classList.add('chosen');
        if (i === chosenIdx) el.classList.add(ok ? 'correct' : 'wrong');
        if (!ok && i === correctIdx) el.classList.add('correct');
      });
    }

    const chip = document.getElementById('chip-' + key);
    if (chip) {
      chip.textContent = ok ? '✓ Đúng' : '✗ Sai';
      chip.className   = 's-chip show ' + (ok ? 'ok' : 'err');
    }
    this.updateProgress();
  },

  // ── Progress ──
  updateProgress() {
    const exIds = Object.keys(EXERCISES).filter(id => EXERCISES[id].chapterId === this.currentCh);
    let total = 0, answered = 0;
    exIds.forEach(exId => {
      EXERCISES[exId].questions.forEach(q => {
        total++;
        if (this.answers[exId + '_' + q.id] != null) answered++;
      });
    });

    const pct  = total ? Math.round(answered / total * 100) : 0;
    const fill = document.getElementById('prog-fill');
    if (fill) {
      fill.style.width = pct + '%';
      fill.className   = 'progress-fill' + (pct >= 100 ? ' done' : '');
    }
    const pt = document.getElementById('prog-text');
    if (pt) pt.textContent = `${answered}/${total} câu (${pct}%)`;

    const btn  = document.getElementById('btn-submit');
    const note = document.getElementById('submit-note');
    if (btn) btn.disabled = pct < this.minPct;
    if (note) note.textContent = pct >= this.minPct
      ? `✅ Đạt ${pct}% – bạn có thể nộp bài.`
      : `Cần hoàn thành ít nhất ${this.minPct}% để nộp bài (hiện tại: ${pct}%).`;
  },

  // ── Submit ──
  submit() {
    if (!this.student) return;
    const exIds = Object.keys(EXERCISES).filter(id => EXERCISES[id].chapterId === this.currentCh);
    let total = 0, correct = 0;
    exIds.forEach(exId => {
      EXERCISES[exId].questions.forEach(q => {
        total++;
        if (this.checked[exId + '_' + q.id] === true) correct++;
      });
    });

    const wrong = total - correct;
    const score = total ? Math.round(correct / total * 100) : 0;
    const dur   = TIMER.elapsed();

    const cfg = loadCfg();
    if (cfg.showScore !== false) {
      document.getElementById('sp-score').textContent  = score + '%';
      document.getElementById('sp-score').className    = 'big-score ' + (score >= this.minPct ? 'pass' : 'fail');
      document.getElementById('sp-sub').textContent    = `${correct}/${total} câu đúng`;
      document.getElementById('sp-correct').textContent = String(correct);
      document.getElementById('sp-wrong').textContent   = String(wrong);
      document.getElementById('sp-time').textContent    = dur;
      document.getElementById('score-panel').style.display = 'block';
      document.getElementById('score-panel').scrollIntoView({ behavior: 'smooth' });
    }

    const btn  = document.getElementById('btn-submit');
    const note = document.getElementById('submit-note');
    if (btn)  btn.disabled  = true;
    if (note) note.textContent = '✅ Đã nộp bài thành công.';

    gasSend({
      name:      this.student.name,
      mssv:      this.student.mssv,
      stt:       this.student.stt,
      classId:   this.student.classId,
      chapterId: this.currentCh,
      score, total, correct,
      duration:  dur,
    });

    toast(`🎉 Nộp thành công! Điểm: ${score}%`, 4000);
  }
};

// Cảnh báo thoát
window.addEventListener('beforeunload', e => {
  if (!APP.student) return;
  const scoreVisible = document.getElementById('score-panel').style.display === 'block';
  if (!scoreVisible && Object.values(APP.answers).some(v => v != null)) {
    e.preventDefault(); e.returnValue = '';
  }
});

// Khởi động
window.addEventListener('load', () => APP.init());
