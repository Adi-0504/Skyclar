const output = document.getElementById("output");

/* LETTERS */
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

/* BUILD LETTER BUTTONS */
const lettersDiv = document.getElementById("letters");

Object.entries(letters).forEach(([key, val]) => {
  const btn = document.createElement("button");
  btn.innerHTML = key + "<br>" + val;
  btn.onclick = () => append(val);
  lettersDiv.appendChild(btn);
});

/* WORD BUTTONS */
const wordsDiv = document.getElementById("words");

words.forEach(w => {
  const btn = document.createElement("button");
  btn.innerText = w;
  btn.onclick = () => append(w + " ");
  wordsDiv.appendChild(btn);
});

/* TONE BUTTONS */
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
