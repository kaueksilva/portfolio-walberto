/* ==========================================================================
   CONTATOS — dados do currículo. Campos vazios não aparecem na página.
   ========================================================================== */
const CONTATOS = {
  linkedin: 'https://www.linkedin.com/in/walberto-ferreira-de-souza-tec',
  email: 'walberto.ferreira@gmail.com',
  whatsapp: '5581997562445', // DDI + DDD + número
};

document.documentElement.classList.add('js');
document.getElementById('ano').textContent = new Date().getFullYear();

// ---------- Contatos ----------
const ICONES = {
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
  WhatsApp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c.3 2 2.5 4.3 4.5 4.8l1-1.2 2 .9c-.2 1.3-1.2 2-2.3 2-3.3-.3-6.2-3.2-6.5-6.5 0-1.1.7-2.1 2-2.3l.9 2z"/></svg>',
  'E-mail': '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
};

(function montarContatos() {
  const links = [];
  if (CONTATOS.linkedin) links.push(['LinkedIn', CONTATOS.linkedin, 'botao-azul']);
  if (CONTATOS.whatsapp) links.push(['WhatsApp', `https://wa.me/${CONTATOS.whatsapp.replace(/\D/g, '')}`, 'botao-primario']);
  if (CONTATOS.email) links.push(['E-mail', `mailto:${CONTATOS.email}`, 'botao-fantasma']);

  const caixa = document.getElementById('contato-links');
  for (const [rotulo, href, classe] of links) {
    const a = document.createElement('a');
    a.className = `botao ${classe}`;
    a.href = href;
    a.innerHTML = `${ICONES[rotulo]}<span>${rotulo}</span>`;
    if (href.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    caixa.append(a);
  }
})();

// ---------- Cabeçalho ----------
const cabecalho = document.querySelector('.cabecalho');
const atualizarCabecalho = () => cabecalho.classList.toggle('rolado', window.scrollY > 24);
atualizarCabecalho();
window.addEventListener('scroll', atualizarCabecalho, { passive: true });

const menu = document.getElementById('menu');
const menuBotao = document.querySelector('.menu-botao');
const fecharMenu = () => {
  menu.classList.remove('aberto');
  menuBotao.setAttribute('aria-expanded', 'false');
  menuBotao.setAttribute('aria-label', 'Abrir menu');
};
menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBotao.setAttribute('aria-expanded', String(aberto));
  menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', fecharMenu));
document.addEventListener('keydown', (e) => e.key === 'Escape' && fecharMenu());

// Destaca no menu a seção visível
const linksMenu = [...menu.querySelectorAll('a[href^="#"]')];
const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      linksMenu.forEach((a) => a.classList.toggle('ativo', a.getAttribute('href') === `#${entrada.target.id}`));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
linksMenu.forEach((a) => {
  const secao = document.querySelector(a.getAttribute('href'));
  if (secao) observadorSecoes.observe(secao);
});

// ---------- Animações ----------
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Índice de cada filho, usado pelo CSS para o atraso da cascata
document.querySelectorAll('.escalonar').forEach((lista) => {
  [...lista.children].forEach((filho, i) => filho.style.setProperty('--i', i));
});

// Conta de 0 até o valor, mantendo prefixo e sufixo (ex.: "+30%", "12+", "1º")
function contar(el) {
  const [, prefixo, numero, sufixo] = el.textContent.match(/^(\D*)(\d+)(.*)$/) || [];
  if (!numero || reduzirMovimento) return;
  const alvo = Number(numero);
  const duracao = 1600;
  const inicio = performance.now();
  const passo = (agora) => {
    const t = Math.min((agora - inicio) / duracao, 1);
    el.textContent = prefixo + Math.round(alvo * (1 - Math.pow(1 - t, 3))) + sufixo;
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

const observadorRevelar = new IntersectionObserver(
  (entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      const el = entrada.target;
      el.classList.add('visivel');
      observadorRevelar.unobserve(el);
      if (el.matches('.numeros')) el.querySelectorAll('dt').forEach(contar);
      // Depois da cascata, tira o atraso para o hover responder na hora
      if (el.matches('.escalonar')) setTimeout(() => el.classList.add('pronto'), 400 + el.children.length * 120);
    }
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.revelar, .escalonar, .linha-tempo').forEach((el) => observadorRevelar.observe(el));

// Barra de progresso de leitura
const barra = document.querySelector('.progresso');
let agendado = false;
const atualizarProgresso = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.setProperty('--progresso', total > 0 ? (window.scrollY / total).toFixed(4) : 0);
  agendado = false;
};
window.addEventListener('scroll', () => {
  if (!agendado) {
    agendado = true;
    requestAnimationFrame(atualizarProgresso);
  }
}, { passive: true });
atualizarProgresso();

// ---------- Foto do hero vira gráfico de barras no hover ----------
const fotoHero = document.querySelector('.hero-foto');
if (fotoHero && !reduzirMovimento) {
  // Quanto (%) é recortado do topo de cada coluna: define as alturas das barras
  const CORTES = [38, 16, 52, 8, 30, 46, 12, 58, 24];
  const grafico = document.createElement('div');
  grafico.className = 'foto-grafico';
  grafico.setAttribute('aria-hidden', 'true');
  grafico.style.setProperty('--n', CORTES.length);
  CORTES.forEach((corte, i) => {
    const coluna = document.createElement('span');
    coluna.style.setProperty('--i', i);
    coluna.style.setProperty('--corte', `${corte}%`);
    coluna.style.setProperty('--x', `${(i / (CORTES.length - 1)) * 100}%`);
    grafico.append(coluna);
  });
  fotoHero.querySelector('img').after(grafico);

  const colunas = [...grafico.children];
  let temporizador;
  fotoHero.addEventListener('pointerenter', () => {
    // Depois da cascata de entrada, as barras respondem ao cursor sem atraso
    temporizador = setTimeout(() => grafico.classList.add('pronto'), 700 + colunas.length * 45);
  });
  fotoHero.addEventListener('pointermove', (e) => {
    const r = grafico.getBoundingClientRect();
    const ativa = Math.floor(((e.clientX - r.left) / r.width) * colunas.length);
    colunas.forEach((coluna, i) => coluna.classList.toggle('ativa', i === ativa));
  });
  fotoHero.addEventListener('pointerleave', () => {
    clearTimeout(temporizador);
    grafico.classList.remove('pronto');
    colunas.forEach((coluna) => coluna.classList.remove('ativa'));
  });
}
