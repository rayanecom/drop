const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const pg of ['dentina-accueil','dentina-produit']){
  const p=await b.newPage({viewport:{width:375,height:812}});
  await p.goto('file://'+path.join(__dirname,'lyra',pg+'.html'));await p.waitForTimeout(300);
  const o=await p.evaluate(()=>{const r=[];
    document.querySelectorAll('small,span,b').forEach(el=>{
      if(!el.textContent.trim()||el.children.length)return;
      const fs=parseFloat(getComputedStyle(el).fontSize);
      if(fs<12) r.push(`${el.tagName} ${fs.toFixed(1)}px dans .${el.parentElement.className||el.parentElement.tagName} « ${el.textContent.trim().slice(0,44)} »`);});
    return [...new Set(r)];});
  console.log('══ '+pg); o.forEach(x=>console.log('  '+x));
  await p.close();}
await b.close();})();
