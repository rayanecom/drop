const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const b = await chromium.launch({ executablePath: exe });
  const url = 'file://' + path.join(__dirname, 'dentina.html');
  let echecs = 0;
  for (const [w, h, nom] of [[320,720,'m320'],[375,812,'m375'],[414,896,'m414'],[1280,900,'d1280']]) {
    const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
    await p.goto(url); await p.waitForTimeout(400);
    const r = await p.evaluate(() => {
      const de = document.documentElement;
      // debordement horizontal + coupables
      const coupables = [];
      document.querySelectorAll('*').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.width > 0 && (b.right > window.innerWidth + 1 || b.left < -1))
          coupables.push((el.tagName+'.'+(el.className||'')).slice(0,48)+' r='+Math.round(b.right));
      });
      // cibles tactiles < 44px
      const petites = [];
      document.querySelectorAll('a,button,summary').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.height > 0 && b.height < 44) petites.push((el.textContent||'').trim().slice(0,28)+' h='+Math.round(b.height));
      });
      // texte sous 16px hors etiquettes autorisees
      const petitTexte = new Set();
      document.querySelectorAll('p,li,summary,span,figcaption').forEach(el => {
        if (!el.textContent.trim()) return;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        const ok = el.matches('.surt,.lg,.offre__tag,.apr,.sous-cta,figcaption,.marque small,.faq p,.offre__det,.etapes p');
        if (fs < 16 && !ok) petitTexte.add(el.tagName+'.'+el.className+' '+fs+'px');
      });
      return { hauteur: Math.round(de.scrollHeight),
               overflowX: de.scrollWidth > window.innerWidth,
               scrollW: de.scrollWidth,
               coupables: [...new Set(coupables)].slice(0,5),
               petitesCibles: [...new Set(petites)].slice(0,5),
               petitTexte: [...petitTexte].slice(0,5) };
    });
    const ko = r.overflowX || r.petitesCibles.length || r.petitTexte.length;
    if (ko) echecs++;
    console.log(`${nom.padEnd(6)} hauteur=${String(r.hauteur).padStart(5)}px  scrollW=${r.scrollW}  overflowX=${r.overflowX ? 'OUI ⛔' : 'non ✓'}`);
    if (r.coupables.length)      console.log('        déborde  :', r.coupables.join(' | '));
    if (r.petitesCibles.length)  console.log('        cibles<44:', r.petitesCibles.join(' | '));
    if (r.petitTexte.length)     console.log('        texte<16 :', r.petitTexte.join(' | '));
    await p.screenshot({ path: path.join(__dirname, 'dentina-'+nom+'.png'), fullPage: true });
    await p.close();
  }
  await b.close();
  console.log(echecs ? `\n⛔ ${echecs} largeur(s) en échec` : '\n✓ 4 largeurs conformes');
})();
