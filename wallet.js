let web3;
let account = null;

async function connectWallet(type = 'metamask') {
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = isAndroid || isIOS;

  if (typeof window.ethereum === "undefined") {
    let url = "";
    if (type === "metamask") {
      url = isAndroid
        ? "https://play.google.com/store/apps/details?id=io.metamask"
        : "https://apps.apple.com/app/metamask/id1438144202";
    } else if (type === "trust") {
      url = isAndroid
        ? "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp"
        : "https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409";
    }

    alert("Wallet ilovasi topilmadi. Yuklab olishga yo‘naltiramiz.");
    window.location.href = url;
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    account = accounts[0];

    const short = account.slice(0, 6) + "..." + account.slice(-4);
    document.getElementById("walletStatus").textContent = "✅ " + short;
    document.getElementById("disconnectBtn").classList.remove("hidden");

    localStorage.setItem("goat10_wallet", account);
  } catch (err) {
    console.error("Ulanishda xatolik:", err);
    alert("Wallet ulanmadi yoki rad etildi.");
  }
}

function disconnectWallet() {
  account = null;
  localStorage.removeItem("goat10_wallet");
  document.getElementById("walletStatus").textContent = "❌ Wallet not connected";
  document.getElementById("disconnectBtn").classList.add("hidden");
}

// Avtomatik ulanish sahifa yuklanganda
window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        account = accounts[0];
        const short = account.slice(0, 6) + "..." + account.slice(-4);
        document.getElementById("walletStatus").textContent = "✅ " + short;
        document.getElementById("disconnectBtn").classList.remove("hidden");
        localStorage.setItem("goat10_wallet", account);
      }
    } catch (e) {
      console.warn("Avtomatik wallet ulanmadi");
    }
  }
});