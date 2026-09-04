const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const p=await ctx.newPage();
  await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));await p.waitForTimeout(600);
  // 1. haut de page, tel que le visiteur le voit
  await p.screenshot({path:path.join(__dirname,'lyra','vue1-haut.png')});
  // 2. au niveau du bump et du bouton
  await p.evaluate(()=>document.querySelector('.bump').scrollIntoView({block:'center'}));
  await p.waitForTimeout(700);
  await p.screenshot({path:path.join(__dirname,'lyra','vue2-bump.png')});
  // controle : recouvrement reel entre l entete collant et le contenu
  const r=await p.evaluate(()=>{
    const t=document.querySelector('.tete').getBoundingClientRect();
    const sous=document.elementFromPoint(195, t.bottom+6);
    return {enteteBas:Math.round(t.bottom), elementSous:sous?sous.tagName+'.'+(sous.className||''):'—',
            barreVisible:document.getElementById('barre').classList.contains('on')};
  });
  console.log('  entête collant se termine à '+r.enteteBas+'px, élément juste dessous : '+r.elementSous.slice(0,40));
  console.log('  barre d\'achat visible à cette position : '+(r.barreVisible?'oui ✓':'non'));
  await b.close();
})();
