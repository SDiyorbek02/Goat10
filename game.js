// 🎯 Elementlarni tanlash
const coin = document.getElementById("coin");
const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const energyWaitEl = document.getElementById("energy-wait");
const coinArea = document.getElementById("coin").parentElement;

// ⚙️ Doimiy o‘zgaruvchilar
const MAX_ENERGY = 500;
const REFILL_INTERVAL = 24 * 60 * 60 * 1000; // 24 soat

let now = Date.now();
let balance = parseInt(localStorage.getItem("goat10_balance") ?? "0");
let energy = parseInt(localStorage.getItem("energy") ?? MAX_ENERGY);
let lastRefill = parseInt(localStorage.getItem("lastEnergyRefill") ?? now);

// 🔁 24 soatlik energiya yangilanishi
function checkAutoRefill() {
  now = Date.now();
  const timePassed = now - lastRefill;
  if (timePassed >= REFILL_INTERVAL) {
    energy = MAX_ENERGY;
    lastRefill = now;
    localStorage.setItem("energy", energy);
    localStorage.setItem("lastEnergyRefill", lastRefill);
  }
}

// 🔄 UI yangilash
function updateDisplay() {
  balanceEl.textContent = balance;
  energyEl.textContent = energy;
  energyWaitEl.classList.toggle("hidden", energy > 0);
}

// ➕ Uchib chiquvchi matn
function showFloatingText(text, color = "white") {
  const plus = document.createElement("div");
  plus.textContent = text;
  plus.className = "floating-text";
  plus.style.color = color;
  coinArea.appendChild(plus);

  plus.style.position = "absolute";
  plus.style.left = "50%";
  plus.style.top = "50%";
  plus.style.transform = "translate(-50%, -50%)";
  plus.style.fontSize = "2rem";
  plus.style.opacity = 1;
  plus.style.transition = "all 0.5s ease-out";

  requestAnimationFrame(() => {
    plus.style.transform = "translate(-50%, -100%)";
    plus.style.opacity = 0;
  });

  setTimeout(() => plus.remove(), 800);
}

// 💫 Coin animatsiyasi
function animateCoin(boost = false) {
  coin.classList.remove("clicked", "booster-active");
  void coin.offsetWidth;

  if (boost) {
    coin.classList.add("booster-active");
    setTimeout(() => coin.classList.remove("booster-active"), 200);
  } else {
    coin.classList.add("clicked");
    setTimeout(() => coin.classList.remove("clicked"), 200);
  }
}

// 🔥 Booster faolligini tekshirish
function getBoostMultiplier() {
  const boosterUntil = parseInt(localStorage.getItem("goat10_booster_active_until") ?? "0");
  return Date.now() < boosterUntil ? 2 : 1;
}

// 🛒 Booster sotib olish
document.getElementById("buyBooster")?.addEventListener("click", () => {
  if (balance >= 500) {
    balance -= 500;
    const endTime = Date.now() + 60 * 60 * 1000; // 1 soat
    localStorage.setItem("goat10_booster_active_until", endTime.toString());
    localStorage.setItem("goat10_balance", balance.toString());
    updateDisplay();
    alert("🔥 Booster Activated for 1 hour!");
  } else {
    alert("❌ Not enough balance for booster!");
  }
});

// 🪙 Coin bosilganda
coin?.addEventListener("click", () => {
  checkAutoRefill();

  const boost = getBoostMultiplier();
  const energyToConsume = boost === 2 ? 2 : 1;

  if (energy < energyToConsume) return;

  energy -= energyToConsume;
  balance += boost;

  localStorage.setItem("energy", energy.toString());
  localStorage.setItem("goat10_balance", balance.toString());

  updateDisplay();
  showFloatingText("+" + boost, boost === 2 ? "#facc15" : "white");
  animateCoin(boost === 2);
});

// ✅ Boshlanishda
checkAutoRefill();
updateDisplay();