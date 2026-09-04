const { chromium, devices } = require('playwright');
const path = require('path');
const profils = [
  ['iPhone SE',      {width:375,height:667}, 2],
  ['iPhone 12/13',   {width:390,height:844}, 3],
  ['iPhone 14 ProMax',{width:430,height:932},3],
  ['Galaxy S20',     {width:360,height:800}, 3],
  ['Petit Android',  {width:320,height:640}, 2],
  ['iPhone paysage', {width:844,height:390}, 3],
];
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  let echecs = [];
  for (const page of ['dentina-accueil','dentina-produit']) {
    console.log('\n════ ' + page.replace('dentina-','').toUpperCase() + ' ════');
    for (const [nom, vp, dsf] of profils) {
      const ctx = await b.newContext({ viewport:vp, deviceScaleFactor:dsf, isMobile:true, hasTouch:true });
      const p = await ctx.newPage();
      await p.goto('file://'+path.join(__dirname,'lyra',page+'.html'));
      await p.waitForTimeout(400);
      const r = await p.evaluate(() => {
        const de = document.documentElement;
        const pb = []; // cibles tactiles trop petites OU trop proches
        const rects = [];
        document.querySelectorAll('a,button,summary,input,label.bump').forEach(el=>{
          const b = el.getBoundingClientRect();
          if (b.width===0||b.height===0) return;
          rects.push({el, b});
          // cible effective : un contrôle enveloppé dans un <label> assez grand est atteignable
          var cible = el.closest('label') || el;
          var cb = cible.getBoundingClientRect();
          if (cb.height < 44 || cb.width < 44) pb.push(`${(el.textContent||el.tagName).trim().slice(0,22)} ${Math.round(cb.width)}x${Math.round(cb.height)}`);
        });
        // texte trop petit hors etiquettes
        const petits = [];
        document.querySelectorAll('p,li,summary,span,b,small').forEach(el=>{
          if (!el.textContent.trim() || el.children.length) return;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs < 12) petits.push(el.tagName+' '+fs+'px');
        });
        // viewport meta
        const meta = document.querySelector('meta[name=viewport]');
        const mv = meta ? meta.content : 'ABSENT';
        // en-tete collant : combien il mange
        const tete = document.querySelector('.tete');
        const hautTete = tete ? Math.round(tete.getBoundingClientRect().height) : 0;
        // barre d'achat collante présente ?
        const barre = document.querySelector('.barre');
        const barreOk = barre ? getComputedStyle(barre).position === 'fixed' : null;
        // premier CTA visible sans scroller ?
        const cta = document.querySelector('.btn');
        const cb = cta ? cta.getBoundingClientRect() : null;
        return {
          overflowX: de.scrollWidth > window.innerWidth,
          scrollW: de.scrollWidth, innerW: window.innerWidth,
          ciblesKO: [...new Set(pb)].slice(0,5),
          texteKO: [...new Set(petits)].slice(0,3),
          viewport: mv,
          hautTete,
          ctaBas: cb ? Math.round(cb.bottom) : null,
          ctaDansEcran: cb ? cb.bottom <= window.innerHeight : false,
          barreOk,
        };
      });
      const ko = r.overflowX || r.ciblesKO.length || r.texteKO.length || r.viewport==='ABSENT'
                 || (!r.ctaDansEcran && !r.barreOk);
      if (ko) echecs.push(`${page}/${nom}`);
      console.log(`  ${nom.padEnd(19)} ${String(r.innerW).padStart(3)}px  déb.X=${r.overflowX?'OUI ⛔':'non ✓'}  cibles=${r.ciblesKO.length?'⛔ '+r.ciblesKO.length:'✓'}  texte=${r.texteKO.length?'⛔':'✓'}  entête=${r.hautTete}px  CTA à ${r.ctaBas}px ${r.ctaDansEcran?'✓ visible':(r.barreOk?'→ barre collante ✓':'⛔ SOUS LA LIGNE')}`);
      if (r.ciblesKO.length) console.log('        cibles :', r.ciblesKO.join(' | '));
      if (r.texteKO.length)  console.log('        texte  :', r.texteKO.join(' | '));
      await ctx.close();
    }
  }
  await b.close();
  console.log('\n' + (echecs.length ? '⛔ ÉCHECS : '+echecs.join(', ') : '✓ 12 profils conformes'));
})();
