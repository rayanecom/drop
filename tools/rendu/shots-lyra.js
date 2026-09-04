const { chromium } = require('playwright');
const path=require('path');
(async()=>{
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
  for(const pg of ['accueil','produit']){
    for(const [w,sc,tag] of [[390,2,'m'],[1280,1,'d']]){
      const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:sc});
      await p.goto('file://'+path.join(__dirname,'lyra',pg+'.html')); await p.waitForTimeout(500);
      await p.screenshot({path:path.join(__dirname,'lyra',`${pg}-${tag}.png`),fullPage:true});
      console.log(`  ${pg}-${tag}.png`);
      await p.close();
    }
  }
  await b.close();
})();
