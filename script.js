const output = document.getElementById("output");

/* SKY LETTER MAP */
const letters = {
  A: "σ", B: "ৎ", C: "১", D: "ঢ", E: "ε", F: "न", G: "३",
  H: "μ", I: "ι", J: "৮", K: "ও", L: "হ", M: "৩",
  N: "η", O: "प", P: "ड", Q: "व", R: "ς", S: "গ",
  T: "τ", U: "ढ", V: "न", W: "λ", X: "δ", Y: "য", Z: "ζ"
};

/* WORDS */
const words = ["wuso", "kanu", "paz", "kupaz", "kula", "wula"];

/* TONES */
const tones = ["̇", "̲", "˩"];

/* BUILD ABC GRID */
const lettersDiv = document.getElementById("letters");

Object.keys(letters).forEach(key => {
  const btn = document.createElement("button");

  btn.innerHTML =
    `<div style="font-size:12px;">${key}</div>
     <div style="font-size:20px;">${letters[key]}</div>`;

  btn.onclick = () => append(letters[key]);

  lettersDiv.appendChild(btn);
});

/* WORDS */
const wordsDiv = document.getElementById("words");

words.forEach(w => {
  const btn = document.createElement("button");
  btn.innerText = w;
  btn.onclick = () => append(w + " ");
  wordsDiv.appendChild(btn);
});

/* TONES */
const tonesDiv = document.getElementById("tones");

tones.forEach(t => {
  const btn = document.createElement("button");
  btn.innerText = t;
  btn.onclick = () => appendTone(t);
  tonesDiv.appendChild(btn);
});

/* FUNCTIONS */
function append(text) {
  output.innerText += text + " ";
}

function appendTone(tone) {
  output.innerText = output.innerText.trim();
  output.innerText += tone + " ";
}

function clearText() {
  output.innerText = "";
}

function backspace() {
  output.innerText = output.innerText.trim().slice(0, -1);
}
