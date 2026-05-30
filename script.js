const output = document.getElementById("output");

/* 空語字母表 */
const letters = {
  A: "σ", B: "ৎ", C: "১", D: "ঢ", E: "ε",
  F: "न", G: "३", H: "μ", I: "ι", J: "৮",
  K: "ও", L: "হ", M: "η", N: "प", O: "ड",
  P: "व", Q: "ς", R: "τ", S: "ग", T: "λ",
  U: "δ", V: "ζ", W: "ι", X: "ξ", Y: "ψ",
  Z: "χ"
};

/* ABC 排列（你要的版本） */
const row1 = ["A","B","C","D","E","F","G","H","I","J"];
const row2 = ["K","L","M","N","O","P","Q","R"];
const row3 = ["S","T","U","V","W","X","Y","Z"];

/* 安全取得 container */
function safeGet(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn("Missing element:", id);
  }
  return el;
}

const outputBox = safeGet("output");
const row1Box = safeGet("row1");
const row2Box = safeGet("row2");
const row3Box = safeGet("row3");

/* 建立鍵盤 */
function buildRow(container, keys) {
  if (!container) return;

  keys.forEach(k => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      <div class="top">${k}</div>
      <div class="bottom">${letters[k]}</div>
    `;

    btn.onclick = () => {
      if (outputBox) {
        outputBox.innerText += letters[k] + " ";
      }
    };

    container.appendChild(btn);
  });
}

/* 渲染三排 */
buildRow(row1Box, row1);
buildRow(row2Box, row2);
buildRow(row3Box, row3);

/* ===== 功能鍵 ===== */

function clearText() {
  if (outputBox) outputBox.innerText = "";
}

function backspace() {
  if (!outputBox) return;

  let text = outputBox.innerText.trim();
  let arr = text.split(" ");

  arr.pop();

  outputBox.innerText = arr.length ? arr.join(" ") + " " : "";
}
