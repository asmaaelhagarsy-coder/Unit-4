// App JS: share buttons + dictation retry + tabs + simple data
function showToast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1600)}

document.addEventListener('DOMContentLoaded',()=>{
  const wa=document.getElementById('waShare');
  const fb=document.getElementById('fbShare');
  const cp=document.getElementById('copyShare');
  function ensurePublic(){if(!/^https?:$/i.test(location.protocol)){showToast('Open online (GitHub Pages) then share');return null}return location.href}
  wa?.addEventListener('click',()=>{const url=ensurePublic(); if(!url) return; const text=encodeURIComponent(document.title+' '+url); window.open('https://wa.me/?text='+text,'_blank');});
  fb?.addEventListener('click',()=>{const url=ensurePublic(); if(!url) return; const enc=encodeURIComponent(url); window.open('https://www.facebook.com/sharer/sharer.php?u='+enc,'_blank');});
  cp?.addEventListener('click',async()=>{const url=ensurePublic(); if(!url) return; try{await navigator.clipboard.writeText(url); showToast('Link copied ✅')}catch(e){showToast('Clipboard not available')}});
});

// ---- Minimal lesson scaffolding (you already have full data in earlier builds). You can replace 'data' with your v7 content. ----
const data={lessons:{1:{title:'Lesson 1 — Go Green',vocabulary:[{en:'concerns',ar:'مخاوف',ex:'There are concerns about pollution.'},{en:'slogan',ar:'شعار',ex:'The campaign uses a simple slogan.'},{en:'renewable energy',ar:'طاقة متجددة',ex:'Solar power is renewable energy.'}]}}};
function $(s,r=document){return r.querySelector(s)}function $all(s,r=document){return Array.from(r.querySelectorAll(s))}
function buildTopTabs(){const w=$('.tabs');['Lesson 1','Unit Exam'].forEach((t,i)=>{const el=document.createElement('div');el.className='tab';el.textContent=t;el.onclick=()=>activateSection(i);w.appendChild(el)})}
function activateSection(i){$all('.tab').forEach((t,idx)=>t.classList.toggle('active',idx===i));$all('.section').forEach((s,idx)=>s.classList.toggle('active',idx===i))}
function buildLesson(){const sec=document.createElement('div');sec.className='section';document.querySelector('.container').appendChild(sec);const grid=document.createElement('div');grid.className='cards';sec.appendChild(grid);data.lessons[1].vocabulary.forEach(item=>{const c=document.createElement('div');c.className='card';c.innerHTML=`<h3>${item.en}</h3><div class="ar">${item.ar}</div><div class="ex">Example: ${item.ex}</div>`;grid.appendChild(c)});}
function init(){buildTopTabs();buildLesson();const sec=document.createElement('div');sec.className='section';document.querySelector('.container').appendChild(sec);activateSection(0)}
window.addEventListener('DOMContentLoaded',init)
