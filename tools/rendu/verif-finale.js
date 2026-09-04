const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const pbs = [];
  for (const pg of ['dentina-accueil','dentina-produit']) {
    console.log('\n════ ' + pg + ' ════');
    const p = await b.newPage({ viewport:{width:390,height:844} });
    const erreurs = [];
    p.on('pageerror', e => erreurs.push(e.message));
    p.on('console', m => { if (m.type()==='error') erreurs.push('console: '+m.text()); });
    await p.goto('file://'+path.join(__dirname,'lyra',pg+'.html'));
    await p.waitForTimeout(600);
    const r = await p.evaluate(() => {
      const out = {};
      out.lang = document.documentElement.lang || 'ABSENT';
      out.title = document.title || 'ABSENT';
      out.viewport = !!document.querySelector('meta[name=viewport]');
      out.charset = !!document.querySelector('meta[charset]');
      // hiérarchie des titres
      const h = [...document.querySelectorAll('h1,h2,h3')].map(e=>+e.tagName[1]);
      out.h1 = h.filter(x=>x===1).length;
      let saut = false; for (let i=1;i<h.length;i++) if (h[i]-h[i-1] > 1) saut = true;
      out.sautDeNiveau = saut;
      // images sans alt
      out.imgSansAlt = [...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length;
      out.nbImg = document.querySelectorAll('img').length;
      // liens internes
      out.liens = [...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))
        .filter(h=>h && !h.startsWith('#') && !h.startsWith('http'));
      // emplacements vides
      out.emplacements = document.querySelectorAll('.vide').length;
      // svg décoratifs sans aria-hidden
      out.svgNus = [...document.querySelectorAll('svg')].filter(s=>!s.hasAttribute('aria-hidden')).length;
      // boutons vides
      out.ctaVides = [...document.querySelectorAll('a.btn,button')].filter(e=>!e.textContent.trim()).length;
      return out;
    });
    const dit = (ok, txt) => { console.log(`  ${ok?'✓':'⛔'} ${txt}`); if(!ok) pbs.push(pg+' : '+txt); };
    dit(r.lang==='fr', `lang="${r.lang}"`);
    dit(r.title!=='ABSENT', `title : ${r.title.slice(0,52)}`);
    dit(r.viewport, 'meta viewport');
    dit(r.charset, 'meta charset');
    dit(r.h1===1, `un seul <h1> (trouvé ${r.h1})`);
    dit(!r.sautDeNiveau, 'hiérarchie des titres sans saut de niveau');
    dit(r.imgSansAlt===0, `alt sur les ${r.nbImg} image(s) (${r.imgSansAlt} sans)`);
    dit(r.ctaVides===0, `aucun bouton vide (${r.ctaVides})`);
    dit(erreurs.length===0, `aucune erreur JS (${erreurs.length})`);
    if (erreurs.length) erreurs.slice(0,3).forEach(e=>console.log('       '+e.slice(0,90)));
    console.log(`  · ${r.emplacements} emplacements à remplir · liens internes : ${[...new Set(r.liens)].join(', ')||'aucun'}`);
    // les liens internes existent-ils ?
    const fs = require('fs');
    for (const l of [...new Set(r.liens)]) {
      const ok = fs.existsSync(path.join(__dirname,'lyra',l));
      dit(ok, `le lien « ${l} » pointe vers un fichier existant`);
    }
    await p.close();
  }
  await b.close();
  console.log('\n' + (pbs.length ? '⛔ '+pbs.length+' problème(s)' : '✓ Tout est conforme'));
})();
