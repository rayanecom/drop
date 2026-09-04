const { chromium } = require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for(const [w,h,nom] of [[375,667,'iPhone SE 375x667'],[375,812,'iPhone X 375x812'],[414,896,'iPhone XR 414x896']]){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
    await p.goto('file://'+path.join(__dirname,'dentina.html')); await p.waitForTimeout(300);
    const r=await p.evaluate((h)=>{
      const vis=el=>{const b=el.getBoundingClientRect(); return b.top<h && b.bottom>0;};
      const cta=document.querySelector('.cta');
      const cb=cta.getBoundingClientRect();
      return { h1:vis(document.querySelector('h1')),
               sousTitre:vis(document.querySelector('h1').parentElement.querySelector('.plus')),
               ctaVisible: cb.top < h,
               ctaEntier: cb.bottom <= h,
               ctaTop: Math.round(cb.top), ctaBottom: Math.round(cb.bottom) };
    },h);
    console.log(`${nom.padEnd(20)} H1=${r.h1?'✓':'⛔'}  accroche=${r.sousTitre?'✓':'⛔'}  bouton visible=${r.ctaVisible?'✓':'⛔'} (top ${r.ctaTop}px, bas ${r.ctaBottom}px)  entier=${r.ctaEntier?'✓':'non'}`);
    await p.screenshot({path:path.join(__dirname,'fold-'+w+'x'+h+'.png')});
    await p.close();
  }
  await b.close();
})();
