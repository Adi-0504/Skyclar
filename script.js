const outputBox = document.getElementById("output");
const predictBox = document.getElementById("predict");

let raw = [];   // 原始輸入
let buffer = ""; // 顯示輸出

/* 空語字母 */
const letters = {
  A:"σ",B:"ৎ",C:"১",D:"ঢ",E:"ε",F:"न",G:"३",
  H:"μ",I:"ι",J:"৮",K:"ও",L:"হ",M:"η",
  N:"प",O:"ड",P:"व",Q:"ς",R:"τ",S:"ग",
  T:"λ",U:"δ",V:"ζ",W:"ι",X:"ξ",Y:"ψ",Z:"χ"
};

const special = {
  KO: "टो"
};

/* OVS reorder engine */
function reorderOVS(words) {
  if (words.length < 3) return words.join(" ");

  let subject = words[0];
  let verb = words[1];
  let object = words.slice(2).join(" ");

  return `${object} ${verb} ${subject}`;
}

/* input */
function addChar(char, rawChar) {
  raw.push(rawChar);
  buffer += char;
  render();
  updatePredict(char);
}

/* KO */
function addKO() {
  raw.push("KO");
  buffer += special.KO;
  render();
}

/* SPACE → trigger grammar processing */
function addSpace() {
  raw.push("SPACE");

  let words = buffer.trim().split(" ");
  buffer = reorderOVS(words);

  buffer += " ";
  render();
  predictBox.innerHTML = "";
}

/* BACKSPACE */
function backspace() {
  raw.pop();
  buffer = buffer.trimEnd().slice(0, -1);
  render();
}

/* CLEAR */
function clearText() {
  raw = [];
  buffer = "";
  render();
  predictBox.innerHTML = "";
}

/* COPY */
function copyText() {
  navigator.clipboard.writeText(buffer);
}

/* render */
function render() {
  outputBox.innerText = buffer;
}

/* predictive */
function updatePredict(char) {
  predictBox.innerHTML = "";
}

/* keyboard */
function buildRow(id, keys) {
  const container = document.getElementById(id);

  keys.forEach(k => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      <div class="top">${k}</div>
      <div class="bottom">${letters[k]}</div>
    `;

    btn.onclick = () => addChar(letters[k], k);

    container.appendChild(btn);
  });
}

/* layout */
buildRow("row1", ["A","B","C","D","E","F","G","H","I","J"]);
buildRow("row2", ["K","L","M","N","O","P","Q","R"]);
buildRow("row3", ["S","T","U","V","W","X","Y","Z"]);
