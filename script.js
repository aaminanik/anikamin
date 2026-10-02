/* anikamin: page switching, waveform, clock, copy-email */
(function(){
var pages=[].slice.call(document.querySelectorAll('.page')),links=[].slice.call(document.querySelectorAll('#nav a')),main=document.getElementById('main');
function route(){
  var id=(location.hash.replace('#/','')||'home');
  if(!document.getElementById(id)||!document.getElementById(id).classList.contains('page'))id='home';
  pages.forEach(function(p){p.classList.toggle('on',p.id===id)});
  links.forEach(function(a){if(a.getAttribute('href')==='#/'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  var t=document.getElementById(id).dataset.title;
  document.title=(id==='home'?'Ahsanul Amin | Electrical & Electronic Engineer':t+' | Ahsanul Amin');
  window.scrollTo(0,0);
  var cur=document.querySelector('#nav a[aria-current]');if(cur&&cur.scrollIntoView)cur.scrollIntoView({inline:'center',block:'nearest'});
}
window.addEventListener('hashchange',route);route();
// power waveform in hero
var d='M0 32',x;for(x=8;x<=800;x+=8){var env=Math.min(1,x/300);d+=' L'+x+' '+(32-26*env*Math.sin(x/26)).toFixed(1)}
document.getElementById('wp').setAttribute('d',d);
document.getElementById('yr').textContent=new Date().getFullYear();
function tick(){try{document.getElementById('clock').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',minute:'2-digit'})}catch(e){}}
tick();setInterval(tick,30000);
var c=document.getElementById('copy');
c.addEventListener('click',function(){
  var m=document.getElementById('cmsg');
  (navigator.clipboard?navigator.clipboard.writeText('ahsanulaminanik221@gmail.com'):Promise.reject()).then(function(){m.textContent='Email copied.'},function(){m.textContent='Copy failed. Please copy it manually.'});
});
})();
