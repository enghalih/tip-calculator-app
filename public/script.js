const DEBUG = false;

const billEl = document.getElementById("bill");
const peopleEl = document.getElementById("people");
const tipEl = document.getElementById("tip");
const customTipEl = document.getElementById("custom-tip");
const totalTipEl = document.getElementById("total-tip");
const totalEl = document.getElementById("total");
const resetEl = document.getElementById("reset");
const calculatorGroupEl = document.getElementById("calculator__group");
const formEl = document.getElementById("calculator__form");

let bill = 0;
let people = 0;
let tip = 0;

formEl.addEventListener("reset", () => {
  bill = 0;
  people = 0;
  tip = 0;

  clearButtonsTip();

  changeTotal();
  changeTotalTip();

  resetEl.disabled = true;
});

billEl?.addEventListener("input", (e) => {
  bill = parseFloat(e.target.value) || 0;

  if (!validate(people)) {
    return;
  }

  changeTotalTip(bill, tip, people);
  changeTotal(bill, tip, people);
});

peopleEl?.addEventListener("input", (e) => {
  people = parseInt(e.target.value) || 0;

  if (!validate(people)) {
    return;
  }

  changeTotalTip(bill, tip, people);
  changeTotal(bill, tip, people);
});

customTipEl?.addEventListener("input", (e) => {
  tip = parseFloat(e.target.value) / 100 || 0;

  clearButtonsTip();

  if (!validate(people)) {
    return;
  }

  changeTotalTip(bill, tip, people);
  changeTotal(bill, tip, people);
});

tipEl?.addEventListener("click", (e) => {
  e = e.target.closest(".calculator__tip-btn") || 0;
  if (!e) return;

  const value = parseFloat(e.dataset.value);
  tip = value;

  clearButtonsTip(e);
  customTipEl.value = "";

  if (!validate(people)) {
    return;
  }

  changeTotalTip(bill, tip, people);
  changeTotal(bill, tip, people);
});

function changeTotalTip(bill, tip, people) {
  if (!totalTipEl) {
    return;
  }

  const totalTip = (bill * tip) / people || 0;
  totalTipEl.innerHTML = "$" + totalTip.toFixed(2);
  debug(bill, tip, people);
}

function changeTotal(bill, tip, people) {
  if (!totalEl) {
    return;
  }

  const total = (bill * (tip + 1)) / people || 0;
  totalEl.innerHTML = "$" + total.toFixed(2);
}

function validate(people) {
  const inputExist = people || bill || tip;
  debug(inputExist, people, bill, tip);
  resetEl.disabled = !inputExist;
  if (people <= 0) {
    calculatorGroupEl?.classList.toggle("calculator__group--error", true);
    peopleEl.ariaInvalid = true;
    return false;
  } else {
    calculatorGroupEl?.classList.toggle("calculator__group--error", false);
    peopleEl.ariaInvalid = false;
    return true;
  }
}

function debug(...content) {
  if (!DEBUG) {
    return;
  }

  console.log("[DEBUG] ", content);
}

function clearButtonsTip(activeButton = false) {
  debug("clear button");
  const buttonsTip = document.querySelectorAll(".calculator__tip-btn");
  buttonsTip.forEach((btnTip) => {
    const active = btnTip === activeButton;
    btnTip.classList.toggle("calculator__tip-btn--active", active);
    btnTip.ariaPressed = active;
  });
}
