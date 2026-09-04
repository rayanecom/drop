const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
await p.goto('file:///home/user/drop/tools/rendu/lyra/produit.html');await p.waitForTimeout(500);
const o=await p.$('#offres'); if(o) await o.screenshot({path:'/home/user/drop/tools/rendu/lyra/cloture.png'});
const bump=await p.$('.bump'); if(bump) await bump.screenshot({path:'/home/user/drop/tools/rendu/lyra/bump.png'});
console.log('  cloture.png + bump.png');await b.close();})();
