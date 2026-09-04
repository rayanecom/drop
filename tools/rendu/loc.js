const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport:{width:375,height:812} });
  await p.goto('file:///home/user/drop/tools/rendu/dentina.html'); await p.waitForTimeout(300);
  const out = await p.evaluate(() => {
    const r=[];
    document.querySelectorAll('p,li,summary,span,figcaption').forEach(el=>{
      if(!el.textContent.trim()) return;
      const fs=parseFloat(getComputedStyle(el).fontSize);
      if(fs<16) r.push({sel:el.tagName+'.'+(el.className||'—'), fs, txt:el.textContent.trim().slice(0,60),
                        parent:el.parentElement.tagName+'.'+(el.parentElement.className||'—')});
    });
    return r;
  });
  out.forEach(o=>console.log(`${String(o.fs).padStart(4)}px  ${o.sel.padEnd(26)} dans ${o.parent.padEnd(14)} « ${o.txt} »`));
  await b.close();
})();
