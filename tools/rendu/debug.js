const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const p=await b.newPage({viewport:{width:390,height:844}});
  p.on('console',m=>console.log('  [console]',m.text()));
  p.on('pageerror',e=>console.log('  [ERREUR JS]',e.message));
  await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));
  await p.waitForTimeout(600);
  const d=await p.evaluate(()=>({
    principalTrouve: !!document.querySelector('.achat .btn--bloc'),
    barreTrouvee: !!document.getElementById('barre'),
    classeBody: document.body.className,
    positionBarre: getComputedStyle(document.getElementById('barre')).position,
    transformBarre: getComputedStyle(document.getElementById('barre')).transform,
    IO: 'IntersectionObserver' in window,
  }));
  console.log('  ', JSON.stringify(d,null,0));
  await b.close();
})();
