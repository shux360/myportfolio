document.getElementById('year').textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const glow=document.querySelector('.cursor-glow');addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
document.querySelector('[data-target]').addEventListener('click',function(){const open=this.dataset.open==='true';document.querySelectorAll(this.dataset.target).forEach(el=>el.style.display=open?'none':'block');this.dataset.open=String(!open);this.innerHTML=open?'View all projects <span>＋</span>':'Show fewer projects <span>−</span>'});
const tabs=[...document.querySelectorAll('[role="tab"]')];
const credentialPanels=[...document.querySelectorAll('.credential-list')];
const credentialMore=document.querySelector('.credential-more');

function credentialLabel(tabId){return tabId==='awards'?'awards':'credentials'}
function resetCredentialMore(tabId){
  credentialPanels.forEach(panel=>panel.classList.remove('credentials-expanded'));
  credentialMore.setAttribute('aria-expanded','false');
  credentialMore.setAttribute('aria-controls',tabId);
  credentialMore.innerHTML=`See all ${credentialLabel(tabId)} <span>＋</span>`;
}
function activateCredentialTab(tab,moveFocus=false){
  tabs.forEach(button=>{
    const selected=button===tab;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  credentialPanels.forEach(panel=>panel.classList.toggle('active',panel.id===tab.dataset.tab));
  resetCredentialMore(tab.dataset.tab);
  if(moveFocus) tab.focus();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>activateCredentialTab(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key==='ArrowRight'?(index+1)%tabs.length:(index-1+tabs.length)%tabs.length;
    activateCredentialTab(tabs[nextIndex],true);
  });
});
credentialMore.addEventListener('click',function(){
  const panel=document.querySelector('.credential-list.active');
  const expanded=!panel.classList.contains('credentials-expanded');
  panel.classList.toggle('credentials-expanded',expanded);
  this.setAttribute('aria-expanded',String(expanded));
  this.innerHTML=expanded?'Show less <span>−</span>':`See all ${credentialLabel(panel.id)} <span>＋</span>`;
});

const header=document.querySelector('.nav-shell');
let previousScrollY=window.scrollY;
addEventListener('scroll',()=>{
  const currentScrollY=window.scrollY;
  const scrollingDown=currentScrollY>previousScrollY;
  if(currentScrollY<80||!scrollingDown||header.matches(':focus-within')) header.classList.remove('nav-hidden');
  else if(currentScrollY>previousScrollY+3) header.classList.add('nav-hidden');
  previousScrollY=currentScrollY;
},{passive:true});
