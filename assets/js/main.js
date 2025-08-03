/* Shared JS for internal pages: search widget mount, sidebar population, popular tracking, and currency converter (if present) */
(function(){
  const CONTENT_INDEX = [
    {t:"Rusya’da üniversite okumak 2025 Rehberi",u:"/egitim/rusyada-universite-okumak.html",c:"Eğitim",e:"Başvuru, harçlar, İngilizce programlar ve üniversiteler."},
    {t:"Rusya’da tıp okumak: fakülteler ve ücretler",u:"/egitim/tip-okumak.html",c:"Eğitim",e:"Müfredat, hastane stajları, dil şartı."},
    {t:"Diş hekimliği: Rusya’da dişçilik okumak",u:"/egitim/dis-hekimligi.html",c:"Eğitim",e:"Fakülteler, klinik pratik, İngilizce seçenekler."},
    {t:"Yazılım mühendisliği ve IT kariyeri",u:"/egitim/yazilim-muhendisligi.html",c:"Eğitim",e:"Programlar, iş imkanları, maaş aralıkları."},
    {t:"İngilizce programlar ve hazırlık",u:"/egitim/ingilizce-programlar.html",c:"Eğitim",e:"Hazırlık (podgotovitelnıy), sınavlar."},
    {t:"Kazan Federal Üniversitesi Rehberi",u:"/egitim/kazan-federal-universitesi.html",c:"Eğitim",e:"Bölümler, ücretler, başvuru takvimi."},
    {t:"Ural Federal Üniversitesi Rehberi",u:"/egitim/ural-federal-universitesi.html",c:"Eğitim",e:"YÖK denklik, hazırlık, kampüs yaşamı."},
    {t:"Moskova Devlet Üniversitesi Rehberi",u:"/egitim/moskova-devlet-universitesi.html",c:"Eğitim",e:"Giriş şartları, İngilizce imkanlar."},
    {t:"St. Petersburg Devlet Üniversitesi Rehberi",u:"/egitim/petersburg-devlet-universitesi.html",c:"Eğitim",e:"Programlar, şehir hayatı, yurtlar."},
    {t:"VNJ oturma izni: şartlar ve süreç",u:"/hukuk/vnj-oturma-izni.html",c:"Hukuk",e:"Evraklar, kayıt, cezalar ve ipuçları."},
    {t:"Rusya’da yaşam nasıl? 2025",u:"/yasam/rusyada-yasam-nasil.html",c:"Yaşam",e:"Şehir bazlı yaşam maliyeti ve kiralar."},
    {t:"Moskova şehir rehberi",u:"/sehirler/moskova.html",c:"Şehirler",e:"Toplu taşıma, iş fırsatları, güvenlik."},
    {t:"St. Petersburg şehir rehberi",u:"/sehirler/petersburg.html",c:"Şehirler",e:"Kültür, yaşam maliyeti, kiralar."},
    {t:"Novosibirsk şehir rehberi",u:"/sehirler/novosibirsk.html",c:"Şehirler",e:"Sibirya’nın başkenti, yaşam ve eğitim."},
    {t:"Yekaterinburg şehir rehberi",u:"/sehirler/yekaterinburg.html",c:"Şehirler",e:"Ural bölgesi sanayi ve yaşam."},
    {t:"Nijniy Novgorod şehir rehberi",u:"/sehirler/nijniy-novgorod.html",c:"Şehirler",e:"Volga kıyısında yaşam ve maliyet."},
    {t:"Kazan şehir rehberi",u:"/sehirler/kazan.html",c:"Şehirler",e:"Tataristan başkenti; kültür ve eğitim."},
    {t:"Samara şehir rehberi",u:"/sehirler/samara.html",c:"Şehirler",e:"Uzay endüstrisi ve yaşam maliyeti."},
    {t:"Omsk şehir rehberi",u:"/sehirler/omsk.html",c:"Şehirler",e:"Batı Sibirya’da yaşam."},
    {t:"Çelyabinsk şehir rehberi",u:"/sehirler/celyabinsk.html",c:"Şehirler",e:"Ural’da maliyet ve iş."},
    {t:"Rostov-na-Donu şehir rehberi",u:"/sehirler/rostov-na-donu.html",c:"Şehirler",e:"Güney Rusya ticaret merkezi."},
    {t:"Araba fiyatları ve vergiler",u:"/araba/araba-fiyatlari.html",c:"Araba",e:"Sınıflar, gümrük ve piyasalar."}
  ];

  /* Mount search if present */
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  function search(q){
    if (!results) return;
    q = (q||'').trim().toLowerCase();
    if (!q) { results.style.display='none'; results.innerHTML=''; return; }
    const match = CONTENT_INDEX.filter(p =>
      p.t.toLowerCase().includes(q) || p.e.toLowerCase().includes(q) || p.c.toLowerCase().includes(q)
    ).slice(0,10);
    if (!match.length){ results.style.display='none'; results.innerHTML=''; return; }
    results.innerHTML = match.map(m => `
      <a href="${m.u}" role="option">
        <strong>${m.t}</strong>
        <span class="muted">${m.c} • ${m.e}</span>
      </a>
    `).join('');
    results.style.display='block';
  }
  if (input) {
    input.addEventListener('input', ()=>search(input.value));
    document.addEventListener('click', (e)=>{ if (!e.target.closest('.search-wrap')) { if(results) results.style.display='none'; }});
  }

  /* Sidebar widgets if present */
  const sidebarLatest = document.getElementById('sidebar-latest');
  const sidebarPopular = document.getElementById('sidebar-popular');
  if (sidebarLatest) {
    sidebarLatest.innerHTML = '<ul>'+CONTENT_INDEX.slice(0,6).map(p=>`<li><a href="${p.u}" data-track="${p.u}">${p.t}</a></li>`).join('')+'</ul>';
  }
  if (sidebarPopular) {
    const clicks = JSON.parse(localStorage.getItem('clicks') || '{}');
    const ranked = CONTENT_INDEX.slice().sort((a,b)=>(clicks[b.u]||0)-(clicks[a.u]||0)).slice(0,6);
    sidebarPopular.innerHTML = '<ol>'+ranked.map(p=>`<li><a href="${p.u}" data-track="${p.u}">${p.t}</a> <span class="muted">(${clicks[p.u]||0})</span></li>`).join('')+'</ol>';
  }

  /* Click tracking (popular) */
  document.addEventListener('click', (e)=>{
    const a = e.target.closest && e.target.closest('a[data-track]');
    if (!a) return;
    const key = a.getAttribute('data-track');
    const clicks = JSON.parse(localStorage.getItem('clicks') || '{}');
    clicks[key] = (clicks[key]||0)+1;
    localStorage.setItem('clicks', JSON.stringify(clicks));
  });

  /* Currency converter if present */
  const rubInput = document.getElementById('rubInput');
  const tryOutput = document.getElementById('tryOutput');
  const convertBtn = document.getElementById('convertBtn');
  const rateInfo = document.getElementById('rateInfo');

  // Bidirectional converter elements (optional: if present on page)
  const tryInput = document.getElementById('tryInput');
  const rubOutput = document.getElementById('rubOutput');
  const convertRevBtn = document.getElementById('convertRevBtn');

  let rubToTry = null;
  let usdToRub = null;
  let usdToTry = null;

  async function loadRates(){
    try {
      const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {cache:'no-store'});
      const data = await res.json();
      if (data.Valute?.TRY?.Value) {
        const rubPerTry = data.Valute.TRY.Value;
        rubToTry = 1 / rubPerTry;
      }
      if (data.Valute?.USD?.Value) {
        usdToRub = data.Valute.USD.Value;
      }
      if (!rubToTry) {
        try {
          const fx = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=TRY');
          const fxj = await fx.json();
          usdToTry = fxj.rates?.TRY || null;
        } catch {}
        if (usdToRub && usdToTry) {
          const rubToUsd = 1 / usdToRub;
          rubToTry = rubToUsd * usdToTry;
        }
      }
      if (rateInfo) {
        if (rubToTry) rateInfo.textContent = `Kur: 1 RUB ≈ ${(rubToTry).toFixed(4)} TL`;
        else rateInfo.textContent = 'Kur bilgisi alınamadı';
      }
      localStorage.setItem('rubToTry', rubToTry || '');
    } catch {
      const cached = parseFloat(localStorage.getItem('rubToTry') || '0');
      if (cached && rateInfo) {
        rubToTry = cached;
        rateInfo.textContent = `Kur (önbellek): 1 RUB ≈ ${(rubToTry).toFixed(4)} TL`;
      }
    }
  }
  if (convertBtn) {
    convertBtn.addEventListener('click', ()=>{
      const v = parseFloat((rubInput && rubInput.value) || '0');
      if (!rubToTry || !isFinite(v)) { if (tryOutput) tryOutput.value=''; return; }
      if (tryOutput) tryOutput.value = (v * rubToTry).toFixed(2);
    });
  }
  if (convertRevBtn) {
    convertRevBtn.addEventListener('click', ()=>{
      const v = parseFloat((tryInput && tryInput.value) || '0');
      if (!rubToTry || !isFinite(v)) { if (rubOutput) rubOutput.value=''; return; }
      const tryToRub = 1 / rubToTry;
      if (rubOutput) rubOutput.value = (v * tryToRub).toFixed(2);
    });
  }
  // Load rates if any converter exists on the page
  if (convertBtn || convertRevBtn) {
    loadRates();
  }
})();
