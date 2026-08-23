const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const S = process.argv[2];
  for (const [w,h,nom] of [[320,900,'m320'],[375,900,'m375'],[414,900,'m414'],[1280,900,'d1280']]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto('file://' + S + '/banc-accueil.html');
    await p.waitForTimeout(400);
    const secs = await p.$$eval('section', els => els.map(el => {
      const r = el.getBoundingClientRect();
      return { id: el.id.replace('sec-',''), h: Math.round(r.height),
               clipped: el.scrollHeight > Math.ceil(r.height) + 1 };
    }));
    const hoz = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    const petit = await p.evaluate(() => {
      let n = 0;
      document.querySelectorAll('p,li,div.a,h3').forEach(e => {
        if (!e.textContent.trim()) return;
        if (parseFloat(getComputedStyle(e).fontSize) < 16) n++;
      });
      return n;
    });
    const cible = await p.evaluate(() => {
      let ko = [];
      document.querySelectorAll('a,summary').forEach(e => {
        const r = e.getBoundingClientRect();
        if (r.height > 0 && r.height < 44) ko.push(e.tagName + ':' + Math.round(r.height));
      });
      return ko;
    });
    console.log(nom.padEnd(6), 'overflowX=' + hoz, '| <16px:' + petit, '| cibles<44px:' + (cible.length ? cible.join(',') : 'aucune'));
    secs.forEach(s => { if (s.clipped) console.log('   ROGNÉ →', s.id, s.h + 'px'); });
    await p.screenshot({ path: S + '/accueil-' + nom + '.png', fullPage: false });
    await p.close();
  }
  await b.close();
})();
