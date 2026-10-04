'use strict';
function updateCountdown(){const s=Math.max(0,Math.floor((Date.parse('2027-02-20T00:00:00+08:00')-Date.now())/1000));const a=[Math.floor(s/86400),Math.floor(s/3600)%24,Math.floor(s/60)%60,s%60];a.forEach((v,i)=>{document.getElementById('timer-'+i).textContent=v;});}
updateCountdown();setInterval(updateCountdown,1000);
const url=window.WEDDING_CONFIG?.googleFormsUrl?.trim();
if(url){try{const u=new URL(url);const isForm=u.protocol==='https:'&&(u.hostname==='forms.gle'||(u.hostname==='docs.google.com'&&u.pathname.startsWith('/forms/')&&u.pathname.endsWith('/viewform')));if(isForm){document.getElementById('rsvp-link').href=u.href;document.getElementById('rsvp-link').hidden=false;document.getElementById('rsvp-pending').hidden=true;}else{console.error('Use a Google Forms responder link.');}}catch(e){console.error('Invalid Google Forms link.');}}
const row=document.querySelector('.gallery-photos');const photos=Array.from(row.children);let slide=0;
function showSlide(i){slide=(i+photos.length)%photos.length;photos.forEach(photo=>{photo.hidden=true;});for(let n=0;n<Math.min(4,photos.length);n++){const photo=photos[(n+slide)%photos.length];photo.hidden=false;row.append(photo);}document.querySelectorAll('[data-slide]').forEach((b,n)=>{b.classList.toggle('active',n===slide);b.setAttribute('aria-pressed',String(n===slide));});}showSlide(0);
document.getElementById('previous').addEventListener('click',()=>showSlide(slide-1));document.getElementById('next').addEventListener('click',()=>showSlide(slide+1));document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>showSlide(Number(b.dataset.slide))));
const dialog=document.getElementById('photo-dialog');const large=document.getElementById('large-photo');document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{const img=b.querySelector('img');large.src=img.src;large.alt=img.alt;dialog.showModal();}));document.getElementById('close-photo').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

const gallery=document.getElementById('gallery');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let galleryHovered=false;
gallery.addEventListener('mouseenter',()=>{galleryHovered=true;});
gallery.addEventListener('mouseleave',()=>{galleryHovered=false;});
setInterval(()=>{
  if(document.hidden||reducedMotion.matches||galleryHovered||gallery.contains(document.activeElement)||dialog.open)return;
  showSlide(slide+1);
},5000);