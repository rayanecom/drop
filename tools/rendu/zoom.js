const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const cibles = [['accueil',375,0,1100,'accueil-hero-m375'],
                  ['accueil',1280,0,900,'accueil-hero-d1280'],
                  ['produit-blocs-achat',375,0,300,'zoom-preuve-m375']];
  for (const [nom,w,y,h,out] of cibles) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto('file://' + process.cwd() + '/tools/rendu/pages/' + nom + '.html');
    await p.waitForTimeout(1000);
    await p.evaluate(yy => window.scrollTo(0,yy), y);
    await p.screenshot({ path: `tools/rendu/pages/${out}.png` });
    await p.close();
  }
  await b.close();
})();
