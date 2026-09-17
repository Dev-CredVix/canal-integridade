(() => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  if (path !== '' && path !== 'index.html') return;

  const replacements = [
    ['Canal de Denúncias Credvix', 'Canal de Integridade Credvix'],
    ['Canal de Denúncias', 'Canal de Integridade'],
    ['Consultar denúncia', 'Acompanhar relato'],
    ['Fazer denúncia agora', 'Registrar relato agora'],
    ['Fazer denúncia', 'Registrar relato'],
    ['Denúncia sem identificação', 'Relato sem identificação'],
    ['Antes de denunciar', 'Antes de registrar seu relato'],
    ['Pode ser denunciado', 'Situações que podem ser relatadas'],
    ['Denúncias levadas a sério', 'Relatos tratados com responsabilidade'],
    ['Já enviou uma denúncia?', 'Já enviou um relato?'],
    ['Sua denúncia faz diferença.', 'Seu relato contribui para um ambiente mais seguro.'],
    ['Preciso informar meu nome para denunciar?', 'Preciso informar meu nome para registrar um relato?'],
    ['O formulário permite denúncia anônima.', 'O formulário permite relato anônimo.'],
    ['Como acompanho o andamento da denúncia?', 'Como acompanho o andamento do relato?'],
    ['Consultar denúncia”', 'Acompanhar relato”']
  ];

  const replaceText = value => replacements.reduce((text, [from, to]) => text.split(from).join(to), value);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (node.parentElement && ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) return;
    node.nodeValue = replaceText(node.nodeValue || '');
  });

  document.querySelectorAll('[aria-label]').forEach(element => {
    const value = element.getAttribute('aria-label');
    if (value) element.setAttribute('aria-label', replaceText(value));
  });

  const accent = document.querySelector('.guidelines-section .text-accent');
  if (accent && accent.textContent.trim().toLowerCase() === 'denunciar') accent.textContent = 'registrar seu relato';
  document.title = 'Credvix — Canal de Integridade';

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', 'Canal de Integridade Credvix: espaço seguro e confidencial para registrar e acompanhar relatos que demandem apuração.');
})();
