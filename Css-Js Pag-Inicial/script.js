/* ===== WhatsApp ===== */
function openWhatsApp(){
  window.open('https://wa.me/5511973367068','_blank','noopener');
}

/* ===== Download do CV (use arquivo relativo em /assets/cv/) ===== */
function baixarCV(url = 'C:\Users\Coneccta Sistemas\Desktop\Projeto Binho\Curriculo\CV Kleber Lago.pdf', nome = 'Kleber_S_Lago_CV.pdf'){
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', nome);
  document.body.appendChild(a);
  a.click();
  a.remove();
}
window.baixarCV = baixarCV;

/* ===== Menu responsivo ===== */
const headerEl   = document.querySelector('.site-header');
const navEl      = document.getElementById('site-nav');
const toggleBtn  = document.getElementById('menuToggle');
const backdropEl = document.getElementById('navBackdrop');

function openMenu(){
  if (!headerEl.classList.contains('menu-open')){
    headerEl.classList.add('menu-open');
    toggleBtn?.setAttribute('aria-expanded','true');
    backdropEl.hidden = false;
    document.body.style.overflow = 'hidden';
  }
}
function closeMenu(){
  if (headerEl.classList.contains('menu-open')){
    headerEl.classList.remove('menu-open');
    toggleBtn?.setAttribute('aria-expanded','false');
    backdropEl.hidden = true;
    document.body.style.overflow = '';
  }
}
function toggleMobileMenu(force){
  const isOpen = headerEl.classList.contains('menu-open');
  const willOpen = (force === true) ? true : (force === false) ? false : !isOpen;
  willOpen ? openMenu() : closeMenu();
}
window.toggleMobileMenu = toggleMobileMenu;

toggleBtn?.addEventListener('click', ()=> toggleMobileMenu());
backdropEl?.addEventListener('click', closeMenu);
navEl?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeMenu(); });
document.addEventListener('pointerdown', (e)=>{
  if (!headerEl.classList.contains('menu-open')) return;
  if (navEl.contains(e.target)) return;
  if (toggleBtn.contains(e.target)) return;
  closeMenu();
});
window.addEventListener('resize', ()=>{ if (window.innerWidth > 768) closeMenu(); });

/* ===== Scroll suave para âncoras ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    const id = a.getAttribute('href');
    const target = id && id.length > 1 ? document.querySelector(id) : null;
    if(target){
      ev.preventDefault();
      target.scrollIntoView({ behavior:'smooth', block:'start' });
    }
  });
});