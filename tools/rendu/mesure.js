const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w,h,name] of [[375,900,'m375'],[320,900,'m320'],[414,900,'m414'],[1280,900,'d1280']]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto('file://' + __dirname + '/banc.html');
    await p.waitForTimeout(250);
    const box = await p.$eval('#atPromo', el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), scroll: el.scrollHeight,
               clipped: el.scrollHeight > Math.ceil(r.height) + 1 };
    });
    const hoz = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(name.padEnd(6), JSON.stringify(box), 'overflowX=', hoz);
    await p.screenshot({ path: name + '.png', fullPage: false });
    await p.close();
  }
  await b.close();
})();
