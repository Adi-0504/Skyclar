const output = document.getElementById("output");

/* 空語字母 */
const letters = {
  A: "σ", B: "ৎ", C: "১", D: "ঢ", E: "ε",
  F: "न", G: "३", H: "μ", I: "ι", J: "৮",
  K: "ও", L: "হ", M: "η", N: "प", O: "ड",
  P: "व", Q: "ς", R: "τ", S: "ग", T: "λ",
  U: "δ", V: "ζ", W: "ι", X: "ξ", Y: "ψ",
  Z: "χ"
};

/* 你的新 ABC 排列 */
const row1 = ["A","B","C","D","E","F","G","H","I","J"];
const row2 = ["K","L","M","N","O","P","Q","R"];
const row3 = ["U","V","W","X","Y","Z"];

function buildRow(id, keys) {
  const container = document.getElementById(id);

  keys.forEach(k => {
    const btn = document.createElement("button");

    btn.innerHTML = `
      <div class="top">${k}</div>
      <div class="bottom">${letters[k]}</div>
    `;

    btn.onclick = () => {
      output.innerText += letters[k] + " ";
    };

    container.appendChild(btn);
  });
}

buildRow("row1", row1);
buildRow("row2", row2);
buildRow("row3", row3);
