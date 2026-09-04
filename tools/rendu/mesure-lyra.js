const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  let ko = 0;
  for (const page of ['accueil','produit']) {
    console.log('══ ' + page.toUpperCase() + ' ══');
    for (const [w,h,nom] of [[320,720,'320'],[375,812,'375'],[414,896,'414'],[1280,900,'1280']]) {
      const p = await b.newPage({ viewport:{width:w,height:h}, deviceScaleFactor:2 });
      await p.goto('file://'+path.join(__dirname,'lyra',page+'.html'));
      await p.waitForTimeout(500);
      const r = await p.evaluate(() => {
        const de=document.documentElement, deb=[], pet=[], txt=new Set();
        document.querySelectorAll('*').forEach(el=>{const b=el.getBoundingClientRect();
          if(b.width>0&&(b.right>window.innerWidth+1||b.left<-1)) deb.push((el.tagName+'.'+(el.className||'')).slice(0,42));});
        document.querySelectorAll('a,button,summary').forEach(el=>{const b=el.getBoundingClientRect();
          if(b.height>0&&b.height<44) pet.push((el.textContent||'').trim().slice(0,26)+' h='+Math.round(b.height));});
        document.querySelectorAll('p,li,span,summary').forEach(el=>{
          if(!el.textContent.trim()||el.children.length) return;
          const fs=parseFloat(getComputedStyle(el).fontSize);
          if(fs<16&&!el.matches('.surt,.lg,.apr,.verif,.vide b,.vide small,.pied__bas span,.annonce,.pastille,.fleche,.otag,.rcarte small,.etoiles,.pagi span,.scarte p,.vcarte p,.acarte__txt p,.pcarte small,.al p,.dcarte span,.videocard small,.bandeau-g small,.nav a,.icones,.paiements'))
            txt.add(el.tagName+'.'+(el.className||'—')+' '+fs+'px');});
        return {h:Math.round(de.scrollHeight),ox:de.scrollWidth>window.innerWidth,
                deb:[...new Set(deb)].slice(0,4),pet:[...new Set(pet)].slice(0,4),txt:[...txt].slice(0,4)};
      });
      const bad = r.ox||r.pet.length||r.txt.length; if(bad) ko++;
      console.log(`  ${nom.padStart(4)}px  hauteur=${String(r.h).padStart(5)}  débordement=${r.ox?'OUI ⛔':'non ✓'}  cibles<44=${r.pet.length||'0 ✓'}  texte<16=${r.txt.length||'0 ✓'}`);
      if(r.deb.length) console.log('         déborde :', r.deb.join(' | '));
      if(r.pet.length) console.log('         cibles  :', r.pet.join(' | '));
      if(r.txt.length) console.log('         texte   :', r.txt.join(' | '));
      await p.close();
    }
  }
  await b.close();
  console.log(ko?`\n⛔ ${ko} cas en échec`:'\n✓ 8 cas conformes');
})();
