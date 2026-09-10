const { chromium } = require('playwright');
const path = require('path');
const F = '/home/user/drop/theme-dentina/banc-accueil.html';
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [w,h,dsf,nom] of [[390,844,2,'mobile-390'],[1440,900,1,'desktop-1440'],[1280,900,1,'desktop-1280']]) {
    const ctx = await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dsf,isMobile:w<800,hasTouch:w<800});
    const p = await ctx.newPage();
    await p.goto('file://'+F); await p.waitForTimeout(900);
    const r = await p.evaluate(() => {
      const h1 = document.querySelector('.dt-home-hero__copy h1');
      const img = document.querySelector('.dt-home-hero__photo');
      const prix = document.querySelector('.dt-featured-price');
      const barre = document.querySelector('.dt-featured-price s');
      const gh = h1.getBoundingClientRect(), gi = img ? img.getBoundingClientRect() : null;
      return {
        titre: h1.textContent.trim(),
        h1: {l:Math.round(gh.width), h:Math.round(gh.height), lignes: Math.round(gh.height/parseFloat(getComputedStyle(h1).lineHeight)), taille: getComputedStyle(h1).fontSize},
        image: gi ? {l:Math.round(gi.width), h:Math.round(gi.height), visible: gi.width>0 && gi.height>0, rogne: gi.width < 40} : 'ABSENTE',
        prixTexte: prix ? prix.textContent.replace(/\s+/g,' ').trim() : 'ABSENT',
        barreTaille: barre ? getComputedStyle(barre).fontSize : 'ABSENT',
        barreBarre: barre ? getComputedStyle(barre).textDecorationLine : '—',
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        hauteurHero: Math.round(document.querySelector('.dt-home-hero').getBoundingClientRect().height),
      };
    });
    console.log(`\n── ${nom} ──`);
    console.log(`  H1      : « ${r.titre} »`);
    console.log(`  H1      : ${r.h1.l}×${r.h1.h}px, ${r.h1.lignes} ligne(s), ${r.h1.taille}`);
    console.log(`  image   : ${JSON.stringify(r.image)}`);
    console.log(`  prix    : « ${r.prixTexte} »  barré=${r.barreTaille} (${r.barreBarre})`);
    console.log(`  héros   : ${r.hauteurHero}px   débordement X : ${r.overflowX?'OUI ⛔':'non ✓'}`);
    await p.screenshot({path:path.join('/home/user/drop/theme-dentina', 'apercu-'+nom+'.png'), fullPage:false});
    await ctx.close();
  }
  await b.close();
})();
