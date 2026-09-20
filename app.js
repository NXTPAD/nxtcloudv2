const routes=["home","dex","launchpad","ai"];
const toastEl=document.getElementById("toast");
function toast(msg){toastEl.textContent=msg;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),2600)}
function route(){let id=location.hash.replace("#","")||"home";if(!routes.includes(id))id="home";document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===id));document.querySelectorAll(".nav a").forEach(x=>x.classList.toggle("active",x.dataset.route===id));window.scrollTo({top:0,behavior:"smooth"})}
window.addEventListener("hashchange",route);route();

const cloudMenu=document.getElementById("cloudMenu"),cloudMenuBtn=document.getElementById("cloudMenuBtn");
function closeCloudMenu(){cloudMenu?.classList.remove("open");cloudMenuBtn?.setAttribute("aria-expanded","false")}
cloudMenuBtn?.addEventListener("click",e=>{e.stopPropagation();const open=cloudMenu.classList.toggle("open");cloudMenuBtn.setAttribute("aria-expanded",String(open))});
cloudMenu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeCloudMenu));
document.addEventListener("click",e=>{if(!e.target.closest(".cloud-menu"))closeCloudMenu()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCloudMenu()});

let connected=false;
document.getElementById("walletBtn").addEventListener("click",async()=>{
 if(connected){connected=false;document.getElementById("walletLabel").textContent="Connect Wallet";toast("Wallet disconnected");return}
 const phantom=window.solana?.isPhantom;
 const ethereum=window.ethereum;
 try{
   if(phantom){const r=await window.solana.connect();document.getElementById("walletLabel").textContent=r.publicKey.toString().slice(0,4)+"…"+r.publicKey.toString().slice(-4);connected=true;toast("Solana wallet connected")}
   else if(ethereum){const a=await ethereum.request({method:"eth_requestAccounts"});document.getElementById("walletLabel").textContent=a[0].slice(0,6)+"…"+a[0].slice(-4);connected=true;toast("EVM wallet connected")}
   else toast("Install Phantom or an EVM wallet extension first")
 }catch(e){toast(e?.message||"Wallet connection cancelled")}
});

const pay=document.getElementById("payAmount"), receive=document.getElementById("receiveAmount");
pay.addEventListener("input",()=>{const n=Number(pay.value||0);receive.value=n?((n*145.42).toFixed(2)):""});
document.getElementById("flipBtn").addEventListener("click",()=>{const a=document.getElementById("payToken"),b=document.getElementById("receiveToken");const t=a.firstChild.textContent.trim();a.firstChild.textContent=b.firstChild.textContent.trim()+" ";b.firstChild.textContent=t+" "});
document.getElementById("swapBtn").addEventListener("click",()=>connected?toast("Swap routing is ready for provider integration"):document.getElementById("walletBtn").click());
document.getElementById("settingsBtn").addEventListener("click",()=>toast("Swap settings panel coming with live routing"));

let step=1, selectedChain="Solana";
document.querySelectorAll(".chain-card").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".chain-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selectedChain=b.dataset.chain;document.getElementById("summaryChain").textContent=selectedChain}));
document.getElementById("nextStep").addEventListener("click",()=>{
 if(step===1){step=2;document.getElementById("stepNum").textContent="02";document.getElementById("wizardContent").innerHTML=`<h2>Configure your token</h2><p class="muted">Define the public token details. Deployment remains wallet-signed.</p><div class="token-box"><div class="token-label">Token name</div><div class="token-row"><input id="tokenName" placeholder="My Token"></div></div><div class="token-box"><div class="token-label">Ticker</div><div class="token-row"><input id="tokenSymbol" placeholder="NXT"></div></div><div class="token-box"><div class="token-label">Total supply</div><div class="token-row"><input id="tokenSupply" type="number" placeholder="1000000000"></div></div><button class="primary-btn full" id="reviewBtn">Review <span>→</span></button>`;document.getElementById("reviewBtn").onclick=()=>{const n=document.getElementById("tokenName").value||"Untitled Token";const s=document.getElementById("tokenSymbol").value||"—";document.getElementById("summaryToken").textContent=n+" ("+s+")";toast("Token configuration saved")}}
});
document.querySelectorAll(".suggestions button").forEach(b=>b.onclick=()=>{document.getElementById("chatInput").value=b.firstChild.textContent.trim();document.getElementById("chatForm").requestSubmit()});
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const input=document.getElementById("chatInput");const v=input.value.trim();if(!v)return;const box=document.getElementById("messages");box.insertAdjacentHTML("beforeend",`<div class="message" style="margin:12px 0 12px auto;background:#17142a">${escapeHtml(v)}</div><div class="message assistant">I received your request. Live NXT AI responses will be enabled when the Cloudflare AI provider is connected.</div>`);input.value="";box.scrollTop=box.scrollHeight});
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]))}
