const outputBox = document.getElementById("output");

let buffer = "";

/* 空語字母 */
const letters = {
  A:"σ",B:"ৎ",C:"১",D:"ঢ",E:"ε",F:"न",G:"३",
  H:"μ",I:"ι",J:"৮",K:"ও",L:"হ",M:"η",
  N:"प",O:"ड",P:"व",Q:"ς",R:"τ",S:"ग",
  T:"λ",U:"δ",V:"ζ",W:"ι",X:"ξ",Y:"ψ",Z:"χ"
};

/* KO & χ */
const special = {
  KO: "टो",
  CHI: "ो"
};

/* tone marks */
const tones = ["", "̇", "̲", "'"];

/* keyboard */
const row1 = ["A","B","C","D","E","F","G","H","I","J"];
const row2 = ["K","L","M","N","O","P","Q","R"];
const row3 = ["S","T","U","V","W","X","Y","Z"];

/* render */
function render() {
  outputBox.innerText = buffer;
}

/* input */
function addChar(c){
  buffer += c;
  render();
}

/* space */
function addSpace(){
  buffer += " ";
  render();
}

/* delete */
function backspace(){
  buffer = buffer.trimEnd().slice(0,-1);
  render();
}

/* clear */
function clearText(){
  buffer = "";
  render();
}

/* copy */
function copyText(){
  navigator.clipboard.writeText(buffer);
}

/* KO button */
function addKO(){
  buffer += special.KO;
  render();
}

/* χ button */
function addCHI(){
  buffer += special.CHI;
  render();
}

/* build keyboard */
function buildRow(id, keys){
  const container = document.getElementById(id);

  keys.forEach(k=>{
    const btn = document.createElement("button");

    btn.innerHTML = `
      <div class="top">${k}</div>
      <div class="bottom">${letters[k]}</div>
    `;

    let pressTimer;

    btn.addEventListener("touchstart", ()=>{
      pressTimer = setTimeout(()=>{
        showToneMenu(letters[k]);
      }, 400);
    });

    btn.addEventListener("touchend", ()=>{
      clearTimeout(pressTimer);
    });

    btn.onclick = ()=> addChar(letters[k]);

    container.appendChild(btn);
  });
}

/* tone menu */
function showToneMenu(base){
  const menu = document.createElement("div");
  menu.id = "toneMenu";

  tones.forEach(t=>{
    const b = document.createElement("button");
    b.innerText = base + t;

    b.onclick = ()=>{
      buffer += base + t;
      render();
      menu.remove();
    };

    menu.appendChild(b);
  });

  document.body.appendChild(menu);
}

/* init */
buildRow("row1", row1);
buildRow("row2", row2);
buildRow("row3", row3);

/* add special buttons */
const actions = document.querySelector(".actions");

const koBtn = document.createElement("button");
koBtn.innerText = "KO (टो)";
koBtn.onclick = addKO;

const chiBtn = document.createElement("button");
chiBtn.innerText = "χ (ो)";
chiBtn.onclick = addCHI;

actions.appendChild(koBtn);
actions.appendChild(chiBtn);
