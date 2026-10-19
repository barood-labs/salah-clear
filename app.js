const SUPPORT_URL = "https://payhip.com/PLACEHOLDER-salah-clear-supporter"; // TODO: real Payhip product link
const KAABA = {lat:21.422487, lng:39.826206};
const T = {
 en:{times:"Times",qibla:"Qibla",azkar:"Azkar",settings:"Settings",fajr:"Fajr",sunrise:"Sunrise",dhuhr:"Dhuhr",asr:"Asr",maghrib:"Maghrib",isha:"Isha",next:"Next",in:"in",startCompass:"Start compass",morning:"Morning",evening:"Evening",location:"Location",useGps:"Use my location",city:"Or pick a city",method:"Calculation method",madhab:"Asr (madhab)",shafi:"Standard (Shafi'i, Maliki, Hanbali)",hanafi:"Hanafi",clock:"Clock",theme:"Theme",green:"Green",night:"Night",sand:"Sand (supporters)",notif:"Prayer notifications",enable:"Enable",enabled:"Enabled",support:"Support Salah Clear",supportTxt:"Everything is free with no ads. If it helps you, a one-time $2.99 supporter unlock says thanks and unlocks extra themes.",supportBtn:"Become a supporter",privacy:"Privacy policy",noTrack:"No ads, no tracking, no account. Everything stays on your device.",azSrc:"Sources: Qur'an and Sahih/Sunan hadith collections. Tap a card to count. Translations of meaning are approximate.",qdeg:d=>`Qibla: ${d}° from true North`,qhint:"Hold your phone flat, away from metal. Figure-8 motion calibrates the compass. Without a compass, face the bearing shown using any map.",noCompass:"No compass sensor found: use the bearing above.",notifNote:"Web version: reminders fire while the app is open or in a background tab. The Android app schedules real adhan alarms.",gpsFail:"Could not get location; pick a city.",myLoc:"My location",
  methods:{MuslimWorldLeague:"Muslim World League",UmmAlQura:"Umm al-Qura (Makkah)",Egyptian:"Egyptian Authority",Karachi:"Karachi (Univ. of Islamic Sciences)",NorthAmerica:"ISNA (North America)",Dubai:"Dubai",Kuwait:"Kuwait",Qatar:"Qatar",Singapore:"Singapore/Malaysia",Turkey:"Turkey (Diyanet)",Tehran:"Tehran",MoonsightingCommittee:"Moonsighting Committee"}},
 ar:{times:"المواقيت",qibla:"القبلة",azkar:"الأذكار",settings:"الإعدادات",fajr:"الفجر",sunrise:"الشروق",dhuhr:"الظهر",asr:"العصر",maghrib:"المغرب",isha:"العشاء",next:"الصلاة القادمة",in:"بعد",startCompass:"تشغيل البوصلة",morning:"أذكار الصباح",evening:"أذكار المساء",location:"الموقع",useGps:"استخدم موقعي",city:"أو اختر مدينة",method:"طريقة الحساب",madhab:"العصر (المذهب)",shafi:"الجمهور (شافعي، مالكي، حنبلي)",hanafi:"حنفي",clock:"الساعة",theme:"المظهر",green:"أخضر",night:"ليلي",sand:"رملي (للداعمين)",notif:"تنبيهات الصلاة",enable:"تفعيل",enabled:"مفعّلة",support:"ادعم صلاة بلا إعلانات",supportTxt:"كل شيء مجاني وبلا إعلانات. إن نفعك التطبيق، فدعم لمرة واحدة بقيمة 2.99$ هو شكر لنا ويفتح مظاهر إضافية.",supportBtn:"كن داعمًا",privacy:"سياسة الخصوصية",noTrack:"بلا إعلانات ولا تتبّع ولا حساب. كل شيء يبقى على جهازك.",azSrc:"المصادر: القرآن الكريم وكتب الصحاح والسنن. اضغط على البطاقة للعدّ. ترجمة المعاني تقريبية.",qdeg:d=>`القبلة: ${d}° من الشمال الحقيقي`,qhint:"ضع الهاتف مستويًا بعيدًا عن المعادن، وحرّكه على شكل 8 لمعايرة البوصلة. إن لم تتوفر بوصلة فاتجه إلى الزاوية الظاهرة باستخدام أي خريطة.",noCompass:"لا يوجد مستشعر بوصلة: استخدم الزاوية أعلاه.",notifNote:"نسخة الويب: تعمل التنبيهات والتطبيق مفتوح أو في علامة تبويب بالخلفية. تطبيق أندرويد يجدول أذانًا حقيقيًا.",gpsFail:"تعذّر تحديد الموقع؛ اختر مدينة.",myLoc:"موقعي",
  methods:{MuslimWorldLeague:"رابطة العالم الإسلامي",UmmAlQura:"أم القرى (مكة)",Egyptian:"الهيئة المصرية العامة للمساحة",Karachi:"جامعة العلوم الإسلامية بكراتشي",NorthAmerica:"الجمعية الإسلامية لأمريكا الشمالية",Dubai:"دبي",Kuwait:"الكويت",Qatar:"قطر",Singapore:"سنغافورة/ماليزيا",Turkey:"تركيا (ديانت)",Tehran:"طهران",MoonsightingCommittee:"لجنة رؤية الهلال"}}
};
const S = Object.assign({lang:(navigator.language||"").startsWith("ar")?"ar":"en",city:2,lat:null,lng:null,method:"UmmAlQura",madhab:"Shafi",h24:"0",theme:"green",notif:false}, JSON.parse(localStorage.getItem("sc")||"{}"));
const save=()=>localStorage.setItem("sc",JSON.stringify(S));
const $=s=>document.querySelector(s), t=k=>T[S.lang][k];
const PR=["fajr","sunrise","dhuhr","asr","maghrib","isha"];
function coords(){return S.lat!=null?{lat:S.lat,lng:S.lng,name:t("myLoc")}:{lat:CITIES[S.city][2],lng:CITIES[S.city][3],name:CITIES[S.city][S.lang=="ar"?1:0]}}
function calc(d){const c=coords();const p=adhan.CalculationMethod[S.method]();p.madhab=adhan.Madhab[S.madhab];const pt=new adhan.PrayerTimes(new adhan.Coordinates(c.lat,c.lng),d,p);return pt}
function fmt(d){return d.toLocaleTimeString(S.lang=="ar"?"ar-u-nu-latn":"en",{hour:"numeric",minute:"2-digit",hour12:S.h24!="1"})}
function qibla(){const c=coords();return Math.round(adhan.Qibla(new adhan.Coordinates(c.lat,c.lng)))}
function render(){
 document.documentElement.lang=S.lang;document.documentElement.dir=S.lang=="ar"?"rtl":"ltr";document.body.className=S.theme;
 $("#appname").textContent=S.lang=="ar"?"صلاة بلا إعلانات":"Salah Clear";$("#langBtn").textContent=S.lang=="ar"?"English":"العربية";
 document.querySelectorAll("[data-i]").forEach(e=>{const v=t(e.dataset.i);if(typeof v=="string")e.textContent=v});
 $("#method").innerHTML=Object.entries(T[S.lang].methods).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");$("#method").value=S.method;
 $("#city").innerHTML=(S.lat!=null?`<option value="-1">${t("myLoc")}</option>`:"")+CITIES.map((c,i)=>`<option value="${i}">${S.lang=="ar"?c[1]:c[0]}</option>`).join("");$("#city").value=S.lat!=null?-1:S.city;
 $("#madhab").value=S.madhab;$("#h24").value=S.h24;$("#theme").value=S.theme;$("#supportLink").href=SUPPORT_URL;$("#notifBtn").textContent=t(S.notif?"enabled":"enable");
 $("#notifNote").textContent=t("notifNote");$("#qdeg").textContent=t("qdeg")(qibla());$("#qhint").textContent=t("qhint");
 $("#kaaba").style.transform=`rotate(${qibla()}deg) translate(-50%,-125px)`;$("#needle").style.transform=`rotate(${qibla()}deg)`;
 tick();renderAz();
}
let last="";function tick(){const now=new Date(),pt=calc(now),c=coords();
 let nx=pt.nextPrayer(),nt;if(nx=="none"){const tm=new Date(now);tm.setDate(tm.getDate()+1);nx="fajr";nt=calc(tm).fajr}else nt=pt.timeForPrayer(nx);
 $("#place").textContent="📍 "+c.name+` (${c.lat.toFixed(2)}, ${c.lng.toFixed(2)})`;
 const loc=S.lang=="ar"?"ar-SA-u-nu-latn":"en";$("#dates").textContent=now.toLocaleDateString(loc,{weekday:"long",day:"numeric",month:"long",year:"numeric",calendar:"gregory"})+" · "+new Intl.DateTimeFormat((S.lang=="ar"?"ar":"en")+"-u-ca-islamic-umalqura-nu-latn",{day:"numeric",month:"long",year:"numeric"}).format(now);
 $("#next").textContent=t("next")+": "+t(nx)+" "+fmt(nt);const ms=nt-now,h=Math.floor(ms/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);$("#count").textContent=t("in")+` ${h}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
 $("#ptable").innerHTML=PR.map(p=>`<tr class="${p==nx&&nx!="none"&&pt.nextPrayer()!="none"?"nx":""}"><td>${t(p)}</td><td>${fmt(pt[p])}</td></tr>`).join("");
 if(S.notif&&Notification.permission=="granted"&&ms<1000&&last!=nx+nt){last=nx+nt;if(nx!="sunrise")navigator.serviceWorker.ready.then(r=>r.showNotification(S.lang=="ar"?"حان وقت صلاة "+t(nx):"Time for "+t(nx),{body:fmt(nt),icon:"icon-192.png",tag:"prayer"}))}
}
let az="morning";function renderAz(){const done=JSON.parse(sessionStorage.getItem("az_"+az)||"{}");$("#azlist").innerHTML=AZKAR[az].map((z,i)=>{const c=done[i]||0;return `<div class="z ${c>=z.n?"done":""}" data-i2="${i}"><span class="cnt">${c}/${z.n}</span><div class="ar">${z.ar}</div>${S.lang=="en"?`<p>${z.en}</p>`:""}<p class="muted small" dir="ltr">${z.src}</p></div>`}).join("")}
$("#azlist").onclick=e=>{const el=e.target.closest(".z");if(!el)return;const i=el.dataset.i2,k="az_"+az,d=JSON.parse(sessionStorage.getItem(k)||"{}");if((d[i]||0)<AZKAR[az][i].n){d[i]=(d[i]||0)+1;navigator.vibrate&&navigator.vibrate(15)}sessionStorage.setItem(k,JSON.stringify(d));renderAz()};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button,.tab").forEach(x=>x.classList.remove("on"));b.classList.add("on");$("#"+b.dataset.tab).classList.add("on")});
document.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".seg button").forEach(x=>x.classList.remove("on"));b.classList.add("on");az=b.dataset.az;renderAz()});
$("#langBtn").onclick=()=>{S.lang=S.lang=="ar"?"en":"ar";save();render()};
$("#city").onchange=e=>{const v=+e.target.value;if(v>=0){S.city=v;S.lat=S.lng=null;S.method=CITIES[v][4]}save();render()};
["method","madhab","h24","theme"].forEach(k=>$("#"+k).onchange=e=>{S[k]=e.target.value;save();render()});
$("#gps").onclick=()=>navigator.geolocation.getCurrentPosition(p=>{S.lat=+p.coords.latitude.toFixed(4);S.lng=+p.coords.longitude.toFixed(4);save();render()},()=>alert(t("gpsFail")),{timeout:15000});
$("#notifBtn").onclick=async()=>{if(!("Notification"in window))return;const r=await Notification.requestPermission();S.notif=r=="granted";save();render()};
$("#qStart").onclick=async()=>{try{if(window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)await DeviceOrientationEvent.requestPermission()}catch(e){}
 let got=false;const h=e=>{let hd=e.webkitCompassHeading!=null?e.webkitCompassHeading:(e.absolute&&e.alpha!=null?360-e.alpha:null);if(hd==null)return;got=true;$("#dial").style.transform=`rotate(${-hd}deg)`};
 window.addEventListener("deviceorientationabsolute",h);window.addEventListener("deviceorientation",h);setTimeout(()=>{if(!got)$("#qhint").textContent=t("noCompass")},3000)};
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
render();setInterval(tick,1000);
