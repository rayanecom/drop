const { chromium } = require('playwright');
const D='/home/user/drop/theme-dentina/';
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const mesure = async (fichier,w,h,dsf) => {
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dsf,isMobile:w<800,hasTouch:w<800});
    const p=await ctx.newPage(); await p.goto('file://'+D+fichier); await p.waitForTimeout(800);
    const r=await p.evaluate(()=>{
      const q=s=>document.querySelector(s), bb=e=>e?e.getBoundingClientRect():null;
      const img=bb(q('.dt-home-hero__photo')), hero=bb(q('.dt-home-hero')), card=bb(q('.dt-home-hero__card'));
      const video=bb(q('.dt-home-hero__motion-card'));
      return {heroH:Math.round(hero.height), cardH:Math.round(card.height),
              imgL:Math.round(img.width), imgH:Math.round(img.height),
              imgTop:Math.round(img.top), videoOk: video? Math.round(video.width)>0 : false,
              docH:Math.round(document.documentElement.scrollHeight),
              ox:document.documentElement.scrollWidth>window.innerWidth};
    });
    await ctx.close(); return r;
  };
  for (const [w,h,dsf,nom] of [[390,844,2,'mobile 390'],[1440,900,1,'desktop 1440']]) {
    const a=await mesure('banc-avant.html',w,h,dsf), b2=await mesure('banc-accueil.html',w,h,dsf);
    console.log(`\n══ ${nom} ══`);
    const l=(k,u='px')=>{const d=b2[k]-a[k];
      console.log(`  ${k.padEnd(8)} avant ${String(a[k]).padStart(5)}${u}  après ${String(b2[k]).padStart(5)}${u}  écart ${d>0?'+':''}${d}${u} ${d===0?'✓ identique':(Math.abs(d)<=2?'✓ négligeable':'⚠')}`);};
    ['heroH','cardH','imgL','imgH','imgTop','docH'].forEach(k=>l(k));
    console.log(`  vidéo    avant ${a.videoOk?'ok':'KO'}  après ${b2.videoOk?'ok ✓':'KO ⛔'}`);
    console.log(`  débord.X avant ${a.ox?'OUI':'non'}  après ${b2.ox?'OUI ⛔':'non ✓'}`);
  }
  await b.close();
})();
