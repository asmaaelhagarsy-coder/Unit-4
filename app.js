// Demo app file with share buttons and PWA note
function showToast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1500)}

document.addEventListener('DOMContentLoaded',()=>{
  const wa=document.getElementById('waShare');
  const fb=document.getElementById('fbShare');
  const cp=document.getElementById('copyShare');
  function ensurePublic(){if(!/^https?:$/i.test(location.protocol)){showToast('Open online (GitHub Pages) then share');return null}return location.href}
  wa?.addEventListener('click',()=>{const url=ensurePublic(); if(!url) return; const text=encodeURIComponent(document.title+' '+url); window.open('https://wa.me/?text='+text,'_blank');});
  fb?.addEventListener('click',()=>{const url=ensurePublic(); if(!url) return; const enc=encodeURIComponent(url); window.open('https://www.facebook.com/sharer/sharer.php?u='+enc,'_blank');});
  cp?.addEventListener('click',async()=>{const url=ensurePublic(); if(!url) return; try{await navigator.clipboard.writeText(url); showToast('Link copied ✅')}catch(e){showToast('Clipboard not available')}});
});
