const message = `I have been holding this inside for longer than I admit.

Being around you feels safe.
It feels real.
It feels honest.

Somewhere between conversations and silence,
you became someone I care about deeply.

Not knowing how you feel
has left me waiting,
stuck in uncertainty,
wanting clarity.

I am not asking for perfection.
I am asking for honesty.

Jahanvi Singh,
would you like to be with me?

Malank Srivastav`;

const textBox = document.getElementById("text");
const startBtn = document.getElementById("start");
const buttons = document.querySelector(".buttons");
const result = document.getElementById("result");
const music = document.getElementById("music");

let i = 0;
const speed = 35;

/* Restore saved choice */
const savedChoice = localStorage.getItem("answer");
if (savedChoice) {
  applyChoice(savedChoice, true);
}

function typeText() {
  if (i < message.length) {
    textBox.innerHTML += message.charAt(i);
    i++;
    setTimeout(typeText, speed);
  } else {
    if (!localStorage.getItem("answer")) {
      buttons.classList.remove("hidden");
    }
  }
}

startBtn.onclick = () => {
  startBtn.style.display = "none";

  music.volume = 0;
  music.play();

  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.6) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 150);

  typeText();
};

document.getElementById("yes").onclick = () => {
  saveAndApply("yes");
};

document.getElementById("no").onclick = () => {
  saveAndApply("no");
};

function saveAndApply(choice) {
  localStorage.setItem("answer", choice);
  applyChoice(choice, false);
}

function applyChoice(choice, instant) {
  buttons.style.display = "none";
  startBtn.style.display = "none";
  textBox.innerHTML = message;

  if (choice === "yes") {
    document.body.classList.add("yes");
    result.innerText = "She said YES";
    result.style.color = "#e63946";

    if (!instant) {
      for (let j = 0; j < 40; j++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.innerText = "❤️";
        h.style.left = Math.random() * 100 + "vw";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 4000);
      }
    }
  }

  if (choice === "no") {
    document.body.classList.add("no");
    result.innerText = "She said NO";
    result.style.color = "#ccc";
    music.volume = 0.2;
  }
}
