/* ================================================================
   OM MEDICAL STORE — bot.js
   AI Pharmacy Assistant | Blue & White Theme
   Medicine ordering chatbot with WhatsApp integration
   ================================================================ */
(function () {

const CSS = `
#om-fab {
  position:fixed!important;bottom:140px!important;right:22px!important;
  z-index:2147483640!important;display:flex!important;align-items:center!important;
  gap:9px!important;background:linear-gradient(135deg,#0d6efd,#0ea5e9)!important;
  color:#fff!important;border:none!important;border-radius:50px!important;
  padding:9px 16px 9px 11px!important;cursor:pointer!important;
  box-shadow:0 4px 20px rgba(13,110,253,0.45)!important;
  font-family:'Inter',sans-serif!important;transition:all 0.25s!important;
}
#om-fab:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(13,110,253,0.55)!important;}
#om-fab .fi{font-size:18px!important;flex-shrink:0!important;}
#om-fab .ft{display:flex!important;flex-direction:column!important;line-height:1.2!important;}
#om-fab .fm{font-size:12px!important;font-weight:700!important;}
#om-fab .fs{font-size:9.5px!important;opacity:0.82!important;}

#om-panel {
  position:fixed!important;bottom:140px!important;right:22px!important;
  z-index:2147483641!important;width:340px!important;max-height:580px!important;
  background:#ffffff!important;border-radius:20px!important;
  box-shadow:0 24px 64px rgba(13,110,253,0.18),0 0 0 1px rgba(13,110,253,0.1)!important;
  display:none!important;flex-direction:column!important;overflow:hidden!important;
  font-family:'Inter',sans-serif!important;
}
#om-panel.open{display:flex!important;animation:panelIn 0.32s cubic-bezier(.16,1,.3,1) both!important;}

/* Head */
.bh{background:linear-gradient(135deg,#0d2040,#0d6efd)!important;padding:14px 15px!important;
  display:flex!important;align-items:center!important;justify-content:space-between!important;flex-shrink:0!important;}
.bh-l{display:flex!important;align-items:center!important;gap:10px!important;}
.bh-av{width:36px!important;height:36px!important;background:rgba(255,255,255,0.15)!important;
  border-radius:50%!important;display:flex!important;align-items:center!important;
  justify-content:center!important;font-size:18px!important;}
.bh-nm{font-size:13px!important;color:#fff!important;font-weight:700!important;}
.bh-st{font-size:10px!important;color:rgba(255,255,255,0.7)!important;display:flex!important;
  align-items:center!important;gap:4px!important;margin-top:2px!important;}
.bh-dot{width:6px!important;height:6px!important;background:#4ade80!important;
  border-radius:50%!important;animation:blink 1.5s infinite!important;}
.bh-x{background:rgba(255,255,255,0.15)!important;border:none!important;color:#fff!important;
  width:28px!important;height:28px!important;border-radius:50%!important;cursor:pointer!important;
  font-size:13px!important;display:flex!important;align-items:center!important;
  justify-content:center!important;transition:background 0.2s!important;}
.bh-x:hover{background:rgba(255,255,255,0.3)!important;}

/* Progress */
.bp{background:#f0f6ff!important;padding:7px 14px!important;display:flex!important;
  align-items:center!important;gap:8px!important;flex-shrink:0!important;
  border-bottom:1px solid #e8f0fe!important;}
.bp-bar{flex:1!important;height:3px!important;background:#dbeafe!important;
  border-radius:2px!important;overflow:hidden!important;}
.bp-fill{height:100%!important;background:linear-gradient(90deg,#0d6efd,#38bdf8)!important;
  border-radius:2px!important;transition:width 0.4s ease!important;}
.bp-lbl{font-size:10px!important;color:#0d6efd!important;font-weight:600!important;white-space:nowrap!important;}

/* Body */
.bb{flex:1!important;overflow-y:auto!important;padding:12px 10px!important;
  display:flex!important;flex-direction:column!important;gap:8px!important;
  background:#f8fbff!important;min-height:160px!important;max-height:255px!important;}
.bb::-webkit-scrollbar{width:3px!important;}
.bb::-webkit-scrollbar-thumb{background:#bfdbfe!important;border-radius:2px!important;}

/* Messages */
.bm{display:flex!important;gap:7px!important;align-items:flex-end!important;
  animation:msgIn 0.2s ease!important;}
.bm.u{flex-direction:row-reverse!important;}
.bbl{max-width:83%!important;padding:9px 13px!important;border-radius:12px!important;
  font-size:12.5px!important;line-height:1.58!important;}
.bm.b .bbl{background:#fff!important;color:#1e293b!important;
  border:1px solid #e2e8f0!important;border-bottom-left-radius:3px!important;}
.bm.u .bbl{background:linear-gradient(135deg,#0d6efd,#0ea5e9)!important;
  color:#fff!important;border-bottom-right-radius:3px!important;}
.bav{font-size:16px!important;flex-shrink:0!important;}

/* Typing */
.btyp{display:flex!important;gap:4px!important;align-items:center!important;
  padding:9px 13px!important;background:#fff!important;
  border:1px solid #e2e8f0!important;border-radius:12px!important;
  border-bottom-left-radius:3px!important;width:fit-content!important;}
.btyp span{width:6px!important;height:6px!important;background:#93c5fd!important;
  border-radius:50%!important;animation:dots 1.2s infinite!important;}
.btyp span:nth-child(2){animation-delay:0.2s!important;}
.btyp span:nth-child(3){animation-delay:0.4s!important;}

/* Options */
.bo{padding:8px 10px!important;display:flex!important;flex-wrap:wrap!important;
  gap:6px!important;background:#fff!important;border-top:1px solid #f0f6ff!important;
  min-height:48px!important;flex-shrink:0!important;}
.opt{background:#f0f6ff!important;border:1.5px solid #bfdbfe!important;color:#0d6efd!important;
  padding:6px 12px!important;border-radius:20px!important;font-size:11.5px!important;
  font-weight:500!important;cursor:pointer!important;transition:all 0.2s!important;
  font-family:'Inter',sans-serif!important;}
.opt:hover,.opt.pk{background:linear-gradient(135deg,#0d6efd,#0ea5e9)!important;
  color:#fff!important;border-color:transparent!important;}

/* Summary */
.bsum{background:#f0f6ff!important;border:1px solid #bfdbfe!important;
  border-radius:12px!important;padding:13px!important;margin:3px 0!important;}
.bsum-t{font-size:10px!important;font-weight:700!important;letter-spacing:1px!important;
  text-transform:uppercase!important;color:#0d6efd!important;margin-bottom:9px!important;}
.bsum-r{display:flex!important;gap:7px!important;margin-bottom:5px!important;font-size:11.5px!important;}
.bsum-l{color:#94a3b8!important;min-width:78px!important;flex-shrink:0!important;}
.bsum-v{color:#1e293b!important;font-weight:600!important;}
.bwa{width:100%!important;padding:10px!important;margin-top:10px!important;
  background:#25d366!important;color:#fff!important;border:none!important;
  border-radius:10px!important;font-size:12.5px!important;font-weight:700!important;
  cursor:pointer!important;display:flex!important;align-items:center!important;
  justify-content:center!important;gap:7px!important;
  font-family:'Inter',sans-serif!important;transition:all 0.2s!important;}
.bwa:hover{background:#20ba58!important;transform:translateY(-1px)!important;}

/* Input row */
.bi{padding:8px 10px!important;background:#fff!important;
  border-top:1px solid #f0f6ff!important;display:flex!important;
  gap:7px!important;flex-shrink:0!important;}
.binp{flex:1!important;background:#f0f6ff!important;border:1.5px solid #dbeafe!important;
  border-radius:10px!important;padding:8px 11px!important;color:#1e293b!important;
  font-size:12.5px!important;font-family:'Inter',sans-serif!important;outline:none!important;}
.binp:focus{border-color:#0d6efd!important;background:#fff!important;}
.binp::placeholder{color:#94a3b8!important;}
.bsnd{width:34px!important;height:34px!important;
  background:linear-gradient(135deg,#0d6efd,#0ea5e9)!important;
  border:none!important;border-radius:10px!important;color:#fff!important;
  font-size:13px!important;cursor:pointer!important;display:flex!important;
  align-items:center!important;justify-content:center!important;flex-shrink:0!important;}

@keyframes panelIn{from{opacity:0;transform:translateY(16px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes dots{0%,80%,100%{transform:scale(0.7);opacity:0.4}40%{transform:scale(1);opacity:1}}
@keyframes msgIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:480px){
  #om-panel{width:calc(100vw - 16px)!important;right:8px!important;}
  #om-fab{right:8px!important;}
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);

// State
const state = {
  name:'', phone:'', address:'',
  need:'', items:[], timing:'', note:''
};
const TOTAL = 7;
let multiSel = [];

// Conversation flow
const flow = [
  {
    bot: "👋 Welcome to Om Medical Store!\n\nI'm your pharmacy assistant — I'll help you order medicines or find products with **home delivery** across Jodhpur. What's your name?",
    type: 'input',
    placeholder: 'Your full name...',
    save: v => { state.name = v; },
    next: () => `Hello ${state.name}! 😊 How can I help you today?`
  },
  {
    bot: () => `${state.name.split(' ')[0]}, what do you need today?`,
    type: 'opts',
    opts: [
      '💊 Medicines (have prescription)',
      '💊 Common OTC Medicines',
      '🩺 Surgical & Medical Items',
      '👶 Baby & Mother Care',
      '💪 Vitamins & Supplements',
      '🌿 Ayurvedic Products',
      '💄 Cosmetics & Personal Care',
      '🩸 Diabetes / BP Care',
      '📦 Multiple Items'
    ],
    save: v => { state.need = v; },
    next: () => `Got it! Let me help with ${state.need}.`
  },
  {
    bot: 'Which specific medicines or products do you need? (Select all that apply)',
    type: 'multi',
    opts: [
      'Paracetamol / Crocin',
      'Antibiotics (prescription)',
      'Antacid / Digestion',
      'Cough Syrup / Cold',
      'Pain Relief / Spray',
      'BP Medicines',
      'Diabetes Medicines',
      'Baby Diapers / Wipes',
      'Baby Food / Formula',
      'Bandage / First Aid',
      'Glucose Meter / Strips',
      'Vitamins / Iron Tablets',
      'Shampoo / Hair Care',
      'Skin Care / Sunscreen',
      'Will send prescription photo'
    ],
    save: v => { state.items.push(v); },
    done: '✅ Done — Next Step',
    next: () => 'Items noted! ✓'
  },
  {
    bot: 'Do you want home delivery or will you pick up from store?',
    type: 'opts',
    opts: [
      '🏠 Home Delivery — Jodhpur',
      '🏪 I\'ll visit the store',
      '⚡ Urgent — Need ASAP'
    ],
    save: v => { state.timing = v; },
    next: () => 'Perfect!'
  },
  {
    bot: () => state.timing.includes('store')
      ? 'Any special notes or brand preference?'
      : 'Please share your delivery address:',
    type: 'input',
    placeholder: () => state.timing.includes('store')
      ? 'Notes or brand preference...'
      : 'Your full delivery address in Jodhpur...',
    save: v => { state.timing.includes('store') ? (state.note = v) : (state.address = v); },
    next: () => 'Got it!'
  },
  {
    bot: 'Your WhatsApp number for order confirmation:',
    type: 'input',
    placeholder: '10-digit WhatsApp number...',
    save: v => { state.phone = v; },
    next: () => '📱 Great!'
  },
  {
    bot: 'When do you need the delivery?',
    type: 'opts',
    opts: [
      '⚡ ASAP — Urgent',
      '🌅 Morning (8AM–12PM)',
      '☀️ Afternoon (12PM–4PM)',
      '🌆 Evening (4PM–8PM)',
      '🌙 Night (8PM–10PM)',
      '📅 Tomorrow'
    ],
    save: v => { state.note = (state.note ? state.note + ' | ' : '') + 'Time: ' + v; },
    next: () => "Here's your complete order summary!"
  }
];

// Build DOM
document.body.insertAdjacentHTML('beforeend', `
  <button id="om-fab" aria-label="Open pharmacy assistant">
    <span class="fi">💊</span>
    <span class="ft">
      <span class="fm">Order Assistant</span>
      <span class="fs">Home Delivery Available</span>
    </span>
  </button>
  <div id="om-panel" role="dialog" aria-label="Om Medical Store Chat">
    <div class="bh">
      <div class="bh-l">
        <div class="bh-av">💊</div>
        <div>
          <div class="bh-nm">Om Medical Assistant</div>
          <div class="bh-st"><span class="bh-dot"></span>Online — Here to help</div>
        </div>
      </div>
      <button class="bh-x" id="omClose" aria-label="Close">✕</button>
    </div>
    <div class="bp">
      <div class="bp-bar"><div class="bp-fill" id="bpFill" style="width:0%"></div></div>
      <span class="bp-lbl" id="bpLbl">Step 0 / ${TOTAL}</span>
    </div>
    <div class="bb" id="bBody"></div>
    <div class="bo" id="bOpts"></div>
    <div class="bi" id="bInp" style="display:none">
      <input class="binp" id="bInput" placeholder="Type here..."/>
      <button class="bsnd" id="bSend">➤</button>
    </div>
  </div>
`);

// Elements
const fab   = document.getElementById('om-fab');
const panel = document.getElementById('om-panel');
const close = document.getElementById('omClose');
const body  = document.getElementById('bBody');
const opts  = document.getElementById('bOpts');
const inp   = document.getElementById('bInp');
const input = document.getElementById('bInput');
const send  = document.getElementById('bSend');
const fill  = document.getElementById('bpFill');
const lbl   = document.getElementById('bpLbl');

// Toggle
fab.addEventListener('click', () => {
  panel.classList.toggle('open');
  if (panel.classList.contains('open') && body.children.length === 0) {
    setTimeout(() => ask(0), 350);
  }
});
close.addEventListener('click', () => panel.classList.remove('open'));

// Helpers
function scroll() { body.scrollTop = body.scrollHeight; }

function addMsg(txt, who = 'b') {
  const d = document.createElement('div');
  d.className = `bm ${who}`;
  d.innerHTML = who === 'b'
    ? `<span class="bav">💊</span><div class="bbl">${txt.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`
    : `<div class="bbl">${txt}</div><span class="bav">👤</span>`;
  body.appendChild(d);
  scroll();
}

function showTyping() {
  const d = document.createElement('div');
  d.className = 'bm b'; d.id = 'bTyp';
  d.innerHTML = `<span class="bav">💊</span><div class="btyp"><span></span><span></span><span></span></div>`;
  body.appendChild(d); scroll();
}
function hideTyping() { const t = document.getElementById('bTyp'); if (t) t.remove(); }

function clearOpts() { opts.innerHTML = ''; inp.style.display = 'none'; }

function setProgress(n) {
  const pct = Math.round((n / TOTAL) * 100);
  fill.style.width = pct + '%';
  lbl.textContent = `Step ${n} / ${TOTAL}`;
}

// Main conversation engine
function ask(idx) {
  if (idx >= flow.length) { showSummary(); return; }
  const step = flow[idx];
  multiSel = [];
  clearOpts();
  setProgress(idx + 1);

  const txt = typeof step.bot === 'function' ? step.bot() : step.bot;
  showTyping();

  setTimeout(() => {
    hideTyping();
    addMsg(txt);

    if (step.type === 'input') {
      inp.style.display = 'flex';
      input.value = '';
      const ph = typeof step.placeholder === 'function' ? step.placeholder() : step.placeholder;
      input.placeholder = ph || 'Type here...';
      setTimeout(() => input.focus(), 100);

      const go = () => {
        const v = input.value.trim();
        if (!v) { input.style.borderColor = '#dc2626'; setTimeout(() => input.style.borderColor = '', 1500); return; }
        addMsg(v, 'u');
        step.save(v);
        clearOpts();
        const nxt = step.next ? step.next() : '';
        if (nxt) {
          showTyping();
          setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => ask(idx + 1), 450); }, 650);
        } else {
          setTimeout(() => ask(idx + 1), 350);
        }
      };
      send.onclick = go;
      input.onkeydown = e => { if (e.key === 'Enter') go(); };

    } else if (step.type === 'opts') {
      step.opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.textContent = o;
        btn.onclick = () => {
          opts.querySelectorAll('.opt').forEach(b => b.classList.remove('pk'));
          btn.classList.add('pk');
          addMsg(o, 'u');
          step.save(o);
          clearOpts();
          const nxt = step.next ? step.next() : '';
          if (nxt) {
            showTyping();
            setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => ask(idx + 1), 450); }, 650);
          } else {
            setTimeout(() => ask(idx + 1), 350);
          }
        };
        opts.appendChild(btn);
      });

    } else if (step.type === 'multi') {
      step.opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'opt';
        btn.textContent = o;
        btn.onclick = () => {
          if (btn.classList.contains('pk')) {
            btn.classList.remove('pk');
            multiSel = multiSel.filter(x => x !== o);
          } else {
            btn.classList.add('pk');
            multiSel.push(o);
            step.save(o);
          }
        };
        opts.appendChild(btn);
      });

      // Done button
      const doneBtn = document.createElement('button');
      doneBtn.className = 'opt';
      doneBtn.textContent = step.done || '✅ Done';
      doneBtn.style.cssText = 'background:linear-gradient(135deg,#0d6efd,#0ea5e9)!important;color:#fff!important;border-color:transparent!important;font-weight:700!important;';
      doneBtn.onclick = () => {
        const chosen = multiSel.length ? multiSel.join(', ') : 'Will share prescription photo';
        addMsg(chosen, 'u');
        clearOpts();
        const nxt = step.next ? step.next() : '';
        if (nxt) {
          showTyping();
          setTimeout(() => { hideTyping(); addMsg(nxt); setTimeout(() => ask(idx + 1), 450); }, 650);
        } else {
          setTimeout(() => ask(idx + 1), 350);
        }
      };
      opts.appendChild(doneBtn);
    }

  }, 800);
}

// Summary screen
function showSummary() {
  setProgress(TOTAL);
  clearOpts();
  showTyping();

  setTimeout(() => {
    hideTyping();
    const itemsStr = state.items.length ? state.items.join(', ') : 'To be shared separately';

    const html = `
      <div class="bsum">
        <div class="bsum-t">🛒 Your Order Summary</div>
        <div class="bsum-r"><span class="bsum-l">👤 Name</span><span class="bsum-v">${state.name}</span></div>
        <div class="bsum-r"><span class="bsum-l">📞 WhatsApp</span><span class="bsum-v">${state.phone}</span></div>
        <div class="bsum-r"><span class="bsum-l">💊 Need</span><span class="bsum-v">${state.need}</span></div>
        <div class="bsum-r"><span class="bsum-l">📦 Items</span><span class="bsum-v">${itemsStr}</span></div>
        <div class="bsum-r"><span class="bsum-l">🚚 Delivery</span><span class="bsum-v">${state.timing}</span></div>
        ${state.address ? `<div class="bsum-r"><span class="bsum-l">📍 Address</span><span class="bsum-v">${state.address}</span></div>` : ''}
        ${state.note ? `<div class="bsum-r"><span class="bsum-l">📝 Notes</span><span class="bsum-v">${state.note}</span></div>` : ''}
        <button class="bwa" id="bWaBtn">
          <i class="fab fa-whatsapp" style="font-size:1.1rem"></i>
          Send Order via WhatsApp
        </button>
      </div>`;

    const d = document.createElement('div');
    d.className = 'bm b';
    d.innerHTML = `<span class="bav">💊</span><div class="bbl" style="max-width:96%!important;width:100%!important">${html}</div>`;
    body.appendChild(d);
    scroll();

    document.getElementById('bWaBtn').addEventListener('click', sendToWhatsApp);

    // Restart button
    const restartBtn = document.createElement('button');
    restartBtn.className = 'opt';
    restartBtn.textContent = '🔄 Start New Order';
    restartBtn.onclick = () => {
      Object.assign(state, { name:'', phone:'', address:'', need:'', items:[], timing:'', note:'' });
      body.innerHTML = '';
      clearOpts();
      setTimeout(() => ask(0), 200);
    };
    opts.appendChild(restartBtn);

  }, 950);
}

// Send to WhatsApp
function sendToWhatsApp() {
  const itemsStr = state.items.length ? state.items.join(', ') : 'Will share prescription photo';
  const msg = `🏪 *Order Request — Om Medical Store*

👤 *Name:* ${state.name}
📞 *WhatsApp:* ${state.phone}
💊 *Need:* ${state.need}
📦 *Items:* ${itemsStr}
🚚 *Delivery:* ${state.timing}${state.address ? `\n📍 *Address:* ${state.address}` : ''}${state.note ? `\n📝 *Notes:* ${state.note}` : ''}

_Please confirm availability & delivery time. Thank you!_
_Om Medical Store, Jodhpur_`;

  window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
}

})();
