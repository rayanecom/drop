const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const p of ['dentina-accueil','dentina-produit']){
  const pg=await b.newPage({viewport:{width:375,height:812}});
  await pg.goto('file:///home/user/drop/tools/rendu/lyra/'+p+'.html'); await pg.waitForTimeout(500);
  const r=await pg.evaluate(()=>({h:document.documentElement.scrollHeight,
    police:getComputedStyle(document.querySelector('h1')).fontFamily.split(',')[0],
    ox:document.documentElement.scrollWidth>window.innerWidth}));
  console.log(`  ${p.padEnd(18)} hauteur=${r.h}  police=${r.police}  débordement=${r.ox?'OUI':'non'}`);
  await pg.close();}
await b.close();})();
