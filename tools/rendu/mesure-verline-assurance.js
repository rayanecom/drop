const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w, h, name] of [[320,900,'vrg-320'],[375,900,'vrg-375'],[414,900,'vrg-414'],[1280,900,'vrg-1280']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto('file://' + __dirname + '/banc-verline-assurance.html');
    await p.waitForTimeout(250);
    const rows = await p.$$eval('.vrg', els => els.map(el => {
      const r = el.getBoundingClientRect();
      // le plus petit corps de texte réellement rendu dans le bloc
      let min = 999;
      el.querySelectorAll('*').forEach(n => {
        if (!n.textContent.trim()) return;
        const fs = parseFloat(getComputedStyle(n).fontSize);
        if (fs && fs < min) min = fs;
      });
      return {
        variante: el.className.replace('vrg vrg--', ''),
        w: Math.round(r.width),
        h: Math.round(r.height),
        clipped: el.scrollHeight > Math.ceil(r.height) + 1,
        minFont: min
      };
    }));
    const hoz = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(name.padEnd(9), 'overflowX=' + hoz);
    rows.forEach(r => console.log('   ', JSON.stringify(r)));
    await p.screenshot({ path: name + '.png', fullPage: true });
    await p.close();
  }
  await b.close();
})();
