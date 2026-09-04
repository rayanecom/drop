const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const p=await ctx.newPage();
  await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));
  await p.waitForTimeout(500);
  const etat=async()=>p.evaluate(()=>{const b=document.getElementById('barre');
    const r=b.getBoundingClientRect();
    return {visible:b.classList.contains('on'), bas:Math.round(r.bottom), haut:Math.round(r.top),
            dansEcran:r.top < window.innerHeight-10, aria:b.getAttribute('aria-hidden')};});
  console.log('  en haut de page        :', JSON.stringify(await etat()));
  await p.evaluate(()=>window.scrollTo(0,1800)); await p.waitForTimeout(600);
  console.log('  après 1800px de scroll :', JSON.stringify(await etat()));
  await p.screenshot({path:path.join(__dirname,'lyra','barre-collante.png')});
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);
  console.log('  retour en haut         :', JSON.stringify(await etat()));
  // le pied est-il masqué par la barre ?
  await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight)); await p.waitForTimeout(500);
  const pied=await p.evaluate(()=>{const f=document.querySelector('.pied__bas'),b=document.getElementById('barre');
    return {piedBas:Math.round(f.getBoundingClientRect().bottom), barreHaut:Math.round(b.getBoundingClientRect().top),
            recouvert: f.getBoundingClientRect().bottom > b.getBoundingClientRect().top};});
  console.log('  bas de page            :', JSON.stringify(pied));
  await b.close();
})();
