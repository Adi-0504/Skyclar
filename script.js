const outputBox = document.getElementById("output");
const predictBox = document.getElementById("predict");

/* 空語字母 */
const letters = {
  A: "σ", B: "ৎ", C: "১", D: "ঢ", E: "ε",
  F: "न", G: "३", H: "μ", I: "ι", J: "৮",
  K: "ও", L: "হ", M: "η", N: "प", O: "ड",
  P: "व", Q: "ς", R: "τ", S: "ग", T: "λ",
  U: "δ", V: "ζ", W: "ι", X: "ξ", Y: "ψ",
  Z: "χ"
};

/* 特殊音 */
const special = {
  KO: "ट",
  XH: "χ"
};

/* predictive（假簡易詞庫） */
const predictions = {
  w: ["wuso", "wula"],
  k: ["kanu", "kupaz"],
  p: ["paz", "pazik"],
};

/* rows */
const row1 = ["A","B","C","D","E","F","G","H","I","J"];
const row2 = ["K","L","M","N","O","P","Q","R"];
const row3 = ["S","T","U","V","W","X","Y","Z"];

/* ---------- keyboard builder ---------- */

function buildRow(id, keys) {
  const container = document.getElementById(id);

  keys.forEach(k => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      <div class="top">${k}</div>
      <div class="bottom">${letters[k]}</div>
    `;

    /* iPad + desktop stable click */
    const input = () => {
      outputBox.innerText += letters[k] + " ";
      updatePredict(k.toLowerCase());
    };

    btn.addEventListener("click", input);
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      input();
    });

    /* long press (future expansion) */
    let pressTimer;
    btn.addEventListener("touchstart", () => {
      pressTimer = setTimeout(() => {
        outputBox.innerText += letters[k] + letters[k] + " ";
      }, 400);
    });

    btn.addEventListener("touchend", () => clearTimeout(pressTimer));

    container.appendChild(btn);
  });
}

buildRow("row1", row1);
buildRow("row2", row2);
buildRow("row3", row3);

/* ---------- predictive bar ---------- */

function updatePredict(char) {
  const list = predictions[char] || [];
  predictBox.innerHTML = "";

  list.forEach(word => {
    const b = document.createElement("button");
    b.innerText = word;

    b.onclick = () => {
      outputBox.innerText += word + " ";
    };

    predictBox.appendChild(b);
  });
}

/* ---------- OVS check（簡化版） ---------- */

function checkOVS() {
  let text = outputBox.innerText.trim().split(" ");
  if (text.length >= 3) {
    return "OVS OK";
  }
  return "need structure";
}

/* ---------- actions ---------- */

function clearText() {
  outputBox.innerText = "";
  predictBox.innerHTML = "";
}

function backspace() {
  let text = outputBox.innerText.trim();
  if (!text) return;

  let arr = text.split(" ").filter(Boolean);
  arr.pop();

  outputBox.innerText = arr.length ? arr.join(" ") + " " : "";
}

/* ---------- copy ---------- */

function copyText() {
  navigator.clipboard.writeText(outputBox.innerText);
}
