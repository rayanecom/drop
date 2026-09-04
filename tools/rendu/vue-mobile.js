const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const p=await ctx.newPage();
  await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));await p.waitForTimeout(600);
  // le bloc d achat entier, avec le bump
  const a=await p.$('.achat > div:nth-child(2)');
  if(a) await a.screenshot({path:path.join(__dirname,'lyra','vue-achat-mobile.png')});
  console.log('  vue-achat-mobile.png');
  await b.close();
})();
