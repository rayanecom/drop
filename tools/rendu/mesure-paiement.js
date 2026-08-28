const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w,h,name] of [[320,620,'paiement-320'],[375,620,'paiement-375'],[414,620,'paiement-414'],[1280,620,'paiement-1280']]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto('file://' + __dirname + '/banc-paiement.html');
    await p.waitForTimeout(250);
    const m = await p.evaluate(() => {
      const panel = document.querySelector('#panel');
      const lis = [...panel.querySelectorAll('li')];
      const tops = new Set(lis.map(li => Math.round(li.getBoundingClientRect().top)));
      const r = panel.getBoundingClientRect();
      return {
        hauteur_panneau: Math.round(r.height),
        largeur_logo: Math.round(lis[0].getBoundingClientRect().width),
        hauteur_logo: Math.round(lis[0].getBoundingClientRect().height),
        lignes: tops.size,
        largeur_rangee: Math.round(lis[lis.length-1].getBoundingClientRect().right - lis[0].getBoundingClientRect().left)
      };
    });
    const hoz = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    console.log(name.padEnd(15), JSON.stringify(m), 'debordementX=', hoz);
    await p.screenshot({ path: __dirname + '/' + name + '.png', fullPage: false });
    await p.close();
  }
  await b.close();
})();
