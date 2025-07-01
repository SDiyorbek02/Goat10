// ✅ Get and Update Balance
function getBalance() {
  return parseInt(localStorage.getItem("goat10_balance") || "0");
}

function updateBalance(newBalance) {
  localStorage.setItem("goat10_balance", newBalance.toString());
  updateShopBalanceDisplay(newBalance);
}

// ✅ Display balance in Shop
function updateShopBalanceDisplay(amount) {
  const el = document.getElementById("shop-balance");
  if (el) {
    el.textContent = "💰 Balance: ${amount} 🪙;"
     el.classList.add("animate");
    setTimeout(() => el.classList.remove("animate"), 600);
  }
}

// ✅ Booster (2x for 1 hour)
function buyBooster() {
  const balance = getBalance();
  if (balance >= 100) {
    updateBalance(balance - 100);
    const now = Date.now();
    localStorage.setItem("goat10_booster_active_until", now + 60 * 60 * 1000);
    showEffect("🔥 BOOSTED for 1 hour!");
  } else {
    alert("❌ Not enough tokens!");
  }
}


// ✅ Booster check
function isBoosterActive() {
  const until = parseInt(localStorage.getItem("goat10_booster_active_until") || "0");
  return Date.now() < until;
}

// ✅ Global floating effect
function showEffect(text) {
  const el = document.createElement("div");
  el.textContent = text;
  el.className = "shop-float-text";
  document.body.appendChild(el);
  setTimeout(() => document.body.removeChild(el), 1500);
}

// ✅ Floating +100 animation
function showFloatingEffect(text, color = "#facc15") {
  const float = document.createElement("div");
  float.textContent = text;
  float.style.position = "fixed";
  float.style.left = "${Math.random() * 60 + 20}%;"
  float.style.top = "${Math.random() * 40 + 30}%;"
  float.style.fontSize = "1.4rem";
  float.style.color = color;
  float.style.fontWeight = "bold";
  float.style.zIndex = 1000;
  float.style.pointerEvents = "none";
  float.style.animation = "floatOut 1.2s ease-out forwards";
  document.body.appendChild(float);
  setTimeout(() => float.remove(), 1200);
}

// ✅ Init
document.addEventListener("DOMContentLoaded", () => {
  updateShopBalanceDisplay(getBalance());
});