const { chromium } = require('playwright');

const APRES = () => {
  // Seul le bloc <style> livre est active. Aucun reglage Shopify n'est simule :
  // tout le resultat doit venir du CSS qui part sur le theme.
  document.getElementById('apres').media = 'all';
};

const MESURE = () => {
  const r = el => el.getBoundingClientRect();
  const header = r(document.querySelector('.faux-header'));
  const boxes  = [...document.querySelectorAll('.product-media-container')].map(r);
  const eyebrow = r(document.querySelector('.vrl-main-eyebrow'));
  const wrapper = r(document.querySelector('.product__media-wrapper'));
  const slides = [...document.querySelectorAll('.product__media-item')].map(r);
  const hauteurs = slides.map(b => Math.round(b.height));

  return {
    logo_image:  Math.round(boxes[0].top - header.bottom),
    image_texte: Math.round(eyebrow.top - boxes[0].bottom),
    colonne:     Math.round(wrapper.width),
    slide1:      Math.round(slides[0].width),
    debord_droite: Math.round(wrapper.right - slides[0].right),
    hauteurs_min_max: [Math.min(...hauteurs), Math.max(...hauteurs)],
    overflowX: document.documentElement.scrollWidth > window.innerWidth
  };
};

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w, name] of [[320,'m320'],[375,'m375'],[414,'m414']]) {
    for (const etat of ['avant','apres']) {
      const p = await b.newPage({ viewport:{width:w,height:900}, deviceScaleFactor:2 });
      await p.goto('file://' + __dirname + '/banc-galerie.html');
      await p.waitForTimeout(150);
      if (etat === 'apres') { await p.evaluate(APRES); await p.waitForTimeout(150); }
      const m = await p.evaluate(MESURE);
      console.log(name, etat.padEnd(5), JSON.stringify(m));
      await p.screenshot({ path: __dirname + '/' + name + '-' + etat + '.png' });
      await p.close();
    }
  }
  await b.close();
})();
