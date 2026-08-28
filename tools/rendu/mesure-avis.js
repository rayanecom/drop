const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w,h,name] of [[320,860,'avis-320'],[375,860,'avis-375'],[414,860,'avis-414'],[1280,900,'avis-1280']]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto('file://' + __dirname + '/banc-avis.html');
    await p.waitForTimeout(300);
    const m = await p.evaluate(() => {
      const sec   = document.querySelector('.vap');
      const track = document.querySelector('.vap__track');
      const card  = document.querySelector('.vap__card');
      const quote = document.querySelector('.vap__quote');
      const next  = document.querySelector('[data-vap-next]');
      const prev  = document.querySelector('[data-vap-prev]');
      const r = el => { const b = el.getBoundingClientRect(); return {w:Math.round(b.width), h:Math.round(b.height)}; };
      const cs = getComputedStyle(quote);
      return {
        section: r(sec),
        carte: r(card),
        cartes_par_ecran: +(track.clientWidth / card.getBoundingClientRect().width).toFixed(2),
        photo: r(document.querySelector('.vap__photo')),
        corps_texte_px: cs.fontSize,
        texte_coupe: card.scrollHeight > Math.ceil(card.getBoundingClientRect().height) + 1,
        fleche_suiv_visible: !next.hidden,
        fleche_prec_visible: !prev.hidden,
        cible_fleche: r(next)
      };
    });
    const hoz = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    console.log(name.padEnd(10), JSON.stringify(m), 'debordementX=', hoz);
    await p.screenshot({ path: __dirname + '/' + name + '.png', fullPage: false });
    await p.close();
  }
  await b.close();
})();
