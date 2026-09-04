const { chromium } = require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for(const pg of ['accueil','produit']){
    const p=await b.newPage({viewport:{width:375,height:812}});
    await p.goto('file://'+path.join(__dirname,'lyra',pg+'.html')); await p.waitForTimeout(300);
    const out=await p.evaluate(()=>{
      const r=[];
      document.querySelectorAll('p,span,li,summary').forEach(el=>{
        if(!el.textContent.trim()||el.children.length) return;
        const fs=parseFloat(getComputedStyle(el).fontSize);
        if(fs>=15&&fs<16) r.push({sel:el.tagName+'.'+(el.className||'—'),fs,
          txt:el.textContent.trim().slice(0,50),par:el.parentElement.className||el.parentElement.tagName});
      });
      const deb=[];
      document.querySelectorAll('*').forEach(el=>{const b=el.getBoundingClientRect();
        if(b.width>0&&b.right>window.innerWidth+1) deb.push({sel:el.tagName+'.'+(el.className||'—'),right:Math.round(b.right),txt:(el.textContent||'').trim().slice(0,40)});});
      return {r,deb:deb.slice(0,4)};
    });
    console.log('══ '+pg+' ══');
    out.r.forEach(o=>console.log(`  ${o.fs}px  ${o.sel.padEnd(16)} dans .${String(o.par).padEnd(12)} « ${o.txt} »`));
    out.deb.forEach(o=>console.log(`  DÉBORDE ${o.sel.padEnd(16)} right=${o.right} « ${o.txt} »`));
    await p.close();
  }
  await b.close();
})();
