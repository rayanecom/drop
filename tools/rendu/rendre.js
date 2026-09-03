const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pages = process.argv.slice(2);
  for (const nom of pages) {
    for (const [w, tag] of [[375,'m375'],[1280,'d1280']]) {
      const p = await b.newPage({ viewport:{width:w,height:1000}, deviceScaleFactor:1 });
      const erreurs = [];
      p.on('pageerror', e => erreurs.push('JS: ' + e.message));
      p.on('console', m => { if (m.type()==='error') erreurs.push('console: ' + m.text().slice(0,120)); });
      await p.goto('file://' + process.cwd() + '/tools/rendu/pages/' + nom + '.html');
      await p.waitForTimeout(1200);
      const diag = await p.evaluate(() => {
        const de = document.documentElement;
        const deborde = de.scrollWidth > window.innerWidth + 1;
        let coupables = [];
        if (deborde) {
          document.querySelectorAll('body *').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > window.innerWidth + 1 || r.left < -1) {
              coupables.push((el.className && typeof el.className==='string' ? '.'+el.className.split(' ')[0] : el.tagName)
                             + ' → ' + Math.round(r.right) + 'px');
            }
          });
        }
        // textes sous 13px
        const petits = new Set();
        document.querySelectorAll('body *').forEach(el => {
          if (!el.textContent.trim() || el.children.length) return;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs && fs < 13 && !el.closest('.rp-tag')) petits.add(Math.round(fs*10)/10 + 'px : ' + el.textContent.trim().slice(0,34));
        });
        // cibles tactiles sous 44px
        const petitesCibles = [];
        document.querySelectorAll('a,button,summary,input[type=radio]').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width===0 && r.height===0) return;
          if (r.height < 44 && r.height > 3) petitesCibles.push(Math.round(r.height)+'px : '+(el.textContent||el.getAttribute('aria-label')||el.tagName).trim().slice(0,28));
        });
        return { hauteur: Math.round(de.scrollHeight), deborde,
                 coupables: [...new Set(coupables)].slice(0,6),
                 petits: [...petits].slice(0,8), petitesCibles: [...new Set(petitesCibles)].slice(0,8) };
      });
      console.log(`\n### ${nom} @ ${w}px`);
      console.log(`  hauteur totale   ${diag.hauteur} px`);
      console.log(`  debordement lat. ${diag.deborde ? 'OUI  ' + diag.coupables.join(' | ') : 'non'}`);
      if (diag.petits.length)        console.log(`  texte < 13px     ${diag.petits.join(' | ')}`);
      if (diag.petitesCibles.length) console.log(`  cible < 44px     ${diag.petitesCibles.join(' | ')}`);
      if (erreurs.length)            console.log(`  erreurs          ${erreurs.join(' | ')}`);
      await p.screenshot({ path: `tools/rendu/pages/${nom}-${tag}.png`, fullPage: true });
      await p.close();
    }
  }
  await b.close();
})();
