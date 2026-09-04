const { chromium } = require('playwright');
const path=require('path');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const url='file://'+path.join(__dirname,'dentina.html');
  // mobile : trois zones cles
  const p = await b.newPage({ viewport:{width:375,height:812}, deviceScaleFactor:2 });
  await p.goto(url); await p.waitForTimeout(400);
  const zones = [['section:nth-of-type(1)','heros'],['section:nth-of-type(2)','demo'],
                 ['section:nth-of-type(4)','enjeu'],['#offres','offres']];
  for (const [sel,nom] of zones) {
    const el = await p.$(sel);
    if (el) { await el.screenshot({ path: path.join(__dirname,'crop-m-'+nom+'.png') }); console.log('  mobile  '+nom); }
  }
  await p.close();
  // desktop : heros + offres
  const d = await b.newPage({ viewport:{width:1280,height:900}, deviceScaleFactor:1 });
  await d.goto(url); await d.waitForTimeout(400);
  for (const [sel,nom] of [['section:nth-of-type(1)','heros'],['#offres','offres'],['section:nth-of-type(8)','objection']]) {
    const el = await d.$(sel);
    if (el) { await el.screenshot({ path: path.join(__dirname,'crop-d-'+nom+'.png') }); console.log('  desktop '+nom); }
  }
  await d.close(); await b.close();
})();
