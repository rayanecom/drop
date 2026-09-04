const {chromium}=require('playwright');const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for (const [nom,opts] of [
    ['contexte standard', {viewport:{width:390,height:844}}],
    ['contexte MOBILE   ', {viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true}],
  ]) {
    const ctx=await b.newContext(opts); const p=await ctx.newPage();
    await p.goto('file://'+path.join(__dirname,'lyra','dentina-produit.html'));
    await p.waitForTimeout(500);
    const avant=await p.evaluate(()=>document.getElementById('barre').className);
    await p.evaluate(()=>window.scrollTo(0,2000)); await p.waitForTimeout(700);
    const apres=await p.evaluate(()=>({cl:document.getElementById('barre').className,
      scroll:Math.round(window.scrollY), vv: window.visualViewport?Math.round(window.visualViewport.height):null}));
    console.log(`  ${nom}  avant="${avant}"  après="${apres.cl}"  scrollY=${apres.scroll}  ${apres.cl.includes('on')?'✓':'⛔'}`);
    if (apres.cl.includes('on')) await p.screenshot({path:path.join(__dirname,'lyra','barre-collante.png')});
    await ctx.close();
  }
  await b.close();
})();
