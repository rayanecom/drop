const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:390,height:844}});
  await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));
  await p.waitForTimeout(500);
  // observateur temoin, identique a celui de la page
  await p.evaluate(()=>{
    window.__log=[];
    var pr=document.querySelector('.achat .btn--bloc');
    new IntersectionObserver(function(e){
      window.__log.push({inter:e[0].isIntersecting, top:Math.round(e[0].boundingClientRect.top)});
    },{threshold:0}).observe(pr);
  });
  for (const y of [0, 1000, 1800, 3000]) {
    await p.evaluate(v=>window.scrollTo(0,v), y);
    await p.waitForTimeout(500);
    const r = await p.evaluate(()=>({
      scroll: Math.round(window.scrollY),
      topBouton: Math.round(document.querySelector('.achat .btn--bloc').getBoundingClientRect().top),
      classe: document.getElementById('barre').className,
      temoin: window.__log.slice(-1)[0]
    }));
    console.log(`  scrollY=${String(r.scroll).padStart(4)}  bouton à ${String(r.topBouton).padStart(5)}px  barre="${r.classe}"  témoin=${JSON.stringify(r.temoin)}`);
  }
  await b.close();
})();
