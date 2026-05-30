const outputBox = document.getElementById("output");
let buffer = "";

/* ===== 字母表 ===== */
const letters = {
  A:{base:"σ",tones:["σ̇","σ̲","σ'"]},
  B:{base:"ৎ",tones:["ৎ̇","ৎ̲","ৎ'"]},
  C:{base:"১",tones:["১̇","১̲","১'"]},
  D:{base:"ঢ",tones:["ঢ̇","ঢ̲","ঢ'"]},
  E:{base:"ε",tones:["ε̇","ε̲","ε'"]},
  F:{base:"न",tones:["न̇","न̲","न'"]},
  G:{base:"३",tones:["३̇","३̲","३'"]},

  H:{base:"μ",tones:["μ̇","μ̲","μ'"]},
  I:{base:"ι",tones:["ι̇","ι̲","ι'"]},
  J:{base:"৮",tones:["৮̇","৮̲","৮'"]},
  K:{base:"ও",tones:["ও̇","ও̲","ও'"]},
  L:{base:"হ",tones:["হ̇","হ̲","হ'"]},
  M:{base:"৩",tones:["৩̇","৩̲","৩'"]},

  N:{base:"η",tones:["η̇","η̲","η'"]},
  O:{base:"प",tones:["प̇","प̲","प'"]},
  P:{base:"ड",tones:["ड̇","ड̲","ड'"]},
  Q:{base:"व",tones:["व̇","व̲","व'"]},
  R:{base:"ς",tones:["ς̇","ς̲","ς'"]},
  S:{base:"ग",tones:["ग̇","ग̲","ग'"]},

  T:{base:"τ",tones:["τ̇","τ̲","τ'"]},
  U:{base:"ढ",tones:["ढ̇","ढ̲","ढ'"]},
  V:{base:"न",tones:["न̇","न̲","न'"]},
  W:{base:"λ",tones:["λ̇","λ̲","λ'"]},
  X:{base:"δ",tones:["δ̇","δ̲","δ'"]},
  Y:{base:"য",tones:["য̇","য̲","য'"]},
  Z:{base:"ζ",tones:["ζ̇","ζ̲","ζ'"]}
};

/* ===== render ===== */
function render(){
  outputBox.innerText = buffer;
}

/* ===== input ===== */
function addChar(c){
  buffer += c;
  render();
}

function addSpace(){
  buffer += " ";
  render();
}

function backspace(){
  buffer = buffer.slice(0,-1);
  render();
}

function clearText(){
  buffer = "";
  render();
}

function copyText(){
  navigator.clipboard.writeText(buffer);
}

/* ===== tone menu ===== */
function showToneMenu(tones){

  const old = document.getElementById("toneMenu");
  if (old) old.remove();

  const menu = document.createElement("div");
  menu.id = "toneMenu";

  tones.forEach(t=>{
    const b = document.createElement("button");
    b.innerText = t;

    b.onclick = ()=>{
      buffer += t;
      render();
      menu.remove();
    };

    menu.appendChild(b);
  });

  document.body.appendChild(menu);
}

/* ===== keyboard builder ===== */
function buildRow(id, keys){
  const container = document.getElementById(id);

  if (!container) return; // ⭐防炸

  container.innerHTML = "";

  keys.forEach(k=>{
    const data = letters[k];

    const key = document.createElement("div");
    key.className = "key";

    const top = document.createElement("div");
    top.className = "top";
    top.innerText = k;

    const base = document.createElement("div");
    base.className = "base";
    base.innerText = data.base;

    const underline = document.createElement("div");
    underline.className = "underline";
    underline.innerText = "ˍ";

    key.appendChild(top);
    key.appendChild(base);
    key.appendChild(underline);

    key.onclick = ()=> addChar(data.base);

    let timer;
    key.addEventListener("touchstart", ()=>{
      timer = setTimeout(()=> showToneMenu(data.tones), 350);
    });

    key.addEventListener("touchend", ()=> clearTimeout(timer));

    container.appendChild(key);
  });
}

/* ===== KO special key（安全版）===== */
function buildSpecial(){
  const row4 = document.getElementById("row4");
  if (!row4) return; // ⭐最重要：不讓它炸

  const ko = document.createElement("div");
  ko.className = "key";

  const top = document.createElement("div");
  top.className = "top";
  top.innerText = "KO";

  const base = document.createElement("div");
  base.className = "base";
  base.innerText = "ट";

  ko.appendChild(top);
  ko.appendChild(base);

  ko.onclick = ()=> addChar("ट");

  row4.appendChild(ko);

  const o = document.createElement("div");
  o.className = "key";

  const top2 = document.createElement("div");
  top2.className = "top";
  top2.innerText = "O";

  const base2 = document.createElement("div");
  base2.className = "base";
  base2.innerText = "ो";

  o.appendChild(top2);
  o.appendChild(base2);

  o.onclick = ()=> addChar("ो");

  row4.appendChild(o);
}

/* ===== init ===== */
buildRow("row1", ["A","B","C","D","E","F","G","H","I","J"]);
buildRow("row2", ["K","L","M","N","O","P","Q","R"]);
buildRow("row3", ["S","T","U","V","W","X","Y","Z"]);
buildSpecial();
