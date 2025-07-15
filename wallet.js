// MetaMask ochish uchun
function openMetaMask() {
  const dappUrl = window.location.href.split('?')[0]; // wallet.html manzili
  const metamaskLink = 'https://metamask.app.link/dapp/${dappUrl.replace(/^https?:\/\//,")}'; 
  window=location.href = metamaskLink;
}

// Trust Wallet ochish uchun
function openTrustWallet() {
  const dappUrl = window.location.href.split('?')[0];
  const trustLink = 'https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(dappUrl)};'
  window=location.href = trustLink;
}

// Avtomatik ulanishni tekshirish
async function tryAutoConnect() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const address = accounts[0];
        const currentUrl = window.location.origin + window.location.pathname + '?address=' + address;
        window.location.href = currentUrl;
      }
    } catch (error) {
      console.error('Auto-connect error:', error);
    }
  }
}

// URL orqali manzilni chiqarish
function displayAddress() {
  const params = new URLSearchParams(window.location.search);
  const address = params.get('address');

  if (address) {
    const fullUrl = window.location.href;
    document.getElementById("walletInfo").innerHTML = 
      '✅ <b>Hamyon ulandi!</b><br><br>'
      '<b>Manzil:</b><br>${address}<br><br>'
      '<b>URL:</b><br><a href="${fullUrl}" style="color:lightblue">${fullUrl}</a>'
    ;
  } else {
    document.getElementById("walletInfo").innerText = "⏳Once all tokens are listed, wallet connection and trading (buy/sell) will be enabled. .";
  }
}

// Sahifa yuklanganda ishga tushadi
window.onload = function () {
  displayAddress();
  tryAutoConnect();
};