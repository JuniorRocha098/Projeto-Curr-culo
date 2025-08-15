// util
const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// ===== Menu dinâmico (drawer) =====
const menuToggle  = $("#menuToggle");
const navBackdrop = $("#navBackdrop");
const siteNav     = $("#site-nav");

function openMenu(){
  document.documentElement.classList.add("nav-open");
  menuToggle.setAttribute("aria-expanded","true");
  if (navBackdrop) navBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeMenu(){
  document.documentElement.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded","false");
  if (navBackdrop) navBackdrop.hidden = true;
  document.body.style.overflow = "";
}

menuToggle.addEventListener("click", ()=>{
  const open = document.documentElement.classList.contains("nav-open");
  open ? closeMenu() : openMenu();
});

// Fecha ao clicar no backdrop
if (navBackdrop) navBackdrop.addEventListener("click", closeMenu);

// Fecha ao clicar em qualquer link do menu
$$("#site-nav a").forEach(a => a.addEventListener("click", closeMenu));

// Fecha com ESC
document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeMenu(); });

// Fecha ao redimensionar para desktop
window.addEventListener("resize", ()=>{ if (window.innerWidth > 980) closeMenu(); });

/* ✅ NOVO: fecha ao clicar em qualquer lugar da tela (fora do menu e do botão) */
document.addEventListener("pointerdown", (e)=>{
  // só faz sentido se o menu estiver aberto
  if (!document.documentElement.classList.contains("nav-open")) return;

  // se clicou dentro do menu, não fecha
  if (siteNav && siteNav.contains(e.target)) return;

  // se clicou no próprio botão, não fecha (toggle já cuida)
  if (menuToggle && menuToggle.contains(e.target)) return;

  // qualquer outro clique fecha
  closeMenu();
});

// ===== Footer: ano corrente =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Modal de detalhes =====
const modal        = $("#modal");
const modalClose   = $("#modalClose");
const modalContent = $("#modalContent");

function openModal(html){
  modalContent.innerHTML = html;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}
function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
  modal.addEventListener("click", (e)=>{ if (e.target === modal) closeModal(); });
}
document.addEventListener("keydown", (e)=>{ if (e.key === "Escape" && modal && modal.classList.contains("show")) closeModal(); });

// ===== Conteúdos do modal por certificado =====
const CERT_DETAILS = {
  meta: {
    titulo: "Faculdade",
    texto: "Planejamento de campanhas, estruturação de conjuntos/ads, testes A/B, orçamento, mensuração (CPA/ROAS) e atribuição.",
    img: "C:\Users\Coneccta Sistemas\Desktop\Projeto Binho\Css-Js Pag-Certificado\imgs\certificates\WhatsApp Image 2025-08-13 at 14.11.40.jpeg",
    itens: [
      "Configuração de pixel/conversions API",
      "Estratégias de criativos e segmentações",
      "Leitura de relatórios e otimização contínua"
    ],
    pdf: "C:\Users\Coneccta Sistemas\Desktop\Projeto Binho\Css-Js Pag-Certificado\imgs\certificates\WhatsApp Image 2025-08-13 at 14.11.40.jpeg"
  },
  ga: {
    titulo: "Google Analytics Certification",
    texto: "Métricas, eventos e funis; análise de desempenho e tomada de decisão orientada a dados.",
    img: "./assets/img/Design-sem-nome.png",
    itens: [
      "Explorações, públicos e funis",
      "Atribuição e medição de ROI",
      "Integrações com Google Ads e Looker Studio"
    ],
    pdf: "./assets/certs/google-analytics.pdf"
  },
  hubspot: {
    titulo: "HubSpot — Content Marketing",
    texto: "Estratégia de conteúdo, SEO on-page, calendário editorial e nutrição de leads.",
    img: "./assets/img/Design-sem-nome.png",
    itens: [
      "Pilares e clusters de conteúdo",
      "Copywriting e otimização on-page",
      "Fluxos de email e lead scoring"
    ],
    pdf: "./assets/certs/hubspot-content.pdf"
  },
  coursera: {
    titulo: "Coursera — Marketing Strategy",
    texto: "Posicionamento, proposta de valor e growth guiado por dados.",
    img: "./assets/img/Design-sem-nome.png",
    itens: [
      "Pesquisa, personas e JTBD",
      "Go-to-market & diferenciação",
      "Medição e experimentação"
    ],
    pdf: "./assets/certs/marketing-strategy.pdf"
  }
};

// abre modal pelos botões "Detalhes"
$$(".btn-primary[data-cert]").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const key = btn.getAttribute("data-cert");
    const c = CERT_DETAILS[key];
    if(!c) return;

    const media = c.img
      ? `<div class="cert-media"><img src="${c.img}" alt="Certificado: ${c.titulo}"></div>`
      : `<div class="cert-media" aria-label="Prévia do certificado">🧾</div>`;

    const html = `
      <div class="cert-detail">
        ${media}
        <div class="cert-info">
          <h2 class="section-title" style="margin:0 0 6px">${c.titulo}</h2>
          <p class="muted-blurb" style="margin:0 0 10px">${c.texto}</p>
          <ul>
            ${c.itens.map(i=>`<li>${i}</li>`).join("")}
          </ul>
          <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap">
            <a class="btn-primary" href="${c.pdf}" target="_blank" rel="noopener">Abrir PDF</a>
            <a class="btn-outline" href="${c.pdf}" download>Baixar</a>
          </div>
        </div>
      </div>`;
    openModal(html);
  });
});