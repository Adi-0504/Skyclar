const outputBox = document.getElementById("output");

let buffer = "";

/* ===== 空語字典 ===== */
const letters = {
  A: { base:"σ", tones:["σ̇","σ̲","σ'"] },
  B: { base:"ৎ", tones:["ৎ̇","ৎ̲","ৎ'"] },
  C: { base:"১", tones:["১̇","১̲","১'"] },
  D: { base:"ঢ", tones:["ঢ̇","ঢ̲","ঢ'"] },
  E: { base:"ε", tones:["ε̇","ε̲","ε'"] },
  F: { base:"न", tones:["न̇","न̲","न'"] },
  G: { base:"३", tones:["३̇","३̲","३'"] },

  H: { base:"μ", tones:["μ̇","μ̲","μ'"] },
  I: { base:"ι", tones:["ι̇","ι̲","ι'"] },
  J: { base:"৮", tones:["৮̇","৮̲","৮'"] },
  K: { base:"ও", tones:["ও̇","ও̲","ও'"] },
  L: { base:"হ", tones:["হ̇","হ̲","হ'"] },
  M: { base:"৩", tones:["৩̇","৩̲","৩'"] },

  N: { base:"η", tones:["η̇","η̲","η'"] },
  O: { base:"प", tones:["प̇","प̲","प'"] },
  P: { base:"ड", tones:["ड̇","ड̲","ड'"] },
  Q: { base:"व", tones:["व̇","व̲","व'"] },
  R: { base:"ς", tones:["ς̇","ς̲","ς'"] },
  S: { base:"ग", tones:["ग̇","ग̲","ग'"] },

  T: { base:"τ", tones:["τ̇","τ̲","τ'"] },
  U: { base:"ढ", tones:["ढ̇","ढ̲","ढ'"] },
  V: { base:"न", tones:["न̇","न̲","न'"] },
  W: { base:"λ", tones:["λ̇","λ̲","λ'"] },
  X: { base:"δ", tones:["δ̇","δ̲","δ'"] },
  Y: { base:"য", tones:["য̇","য̲","য'"] },
  Z: { base:"ζ", tones:["ζ̇","ζ̲","ζ'"] }
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
  buffer = buffer.trimEnd().slice(0,-1);
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
  container.innerHTML = "";

  keys.forEach(k=>{
    const data = letters[k];

    const key = document.createElement("div");
    key.className = "key";

    /* 🔺 英文小字 */
    const top = document.createElement("div");
    top.className = "top";
    top.innerText = "TEST";

    /* 🔻 空語大字 */
    const base = document.createElement("div");
    base.className = "base";
    base.innerText = data.base;

    /* underline */
    const underline = document.createElement("div");
    underline.className = "underline";
    underline.innerText = "ˍ";

    key.appendChild(top);
    key.appendChild(base);
    key.appendChild(underline);

    /* tap */
    key.onclick = () => addChar(data.base);

    /* long press */
    let timer;
    key.addEventListener("touchstart", ()=>{
      timer = setTimeout(()=>{
        showToneMenu(data.tones);
      }, 350);
    });

    key.addEventListener("touchend", ()=>{
      clearTimeout(timer);
    });

    container.appendChild(key);
  });
}

/* ===== init ===== */
buildRow("row1", ["A","B","C","D","E","F","G","H","I","J"]);
buildRow("row2", ["K","L","M","N","O","P","Q","R"]);
buildRow("row3", ["S","T","U","V","W","X","Y","Z"]);
