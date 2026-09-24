import type { ConteudoDidatico } from '../../app/ConteudoDidatico';

export const conteudoObserver: ConteudoDidatico = {
  objetivo:
    'Definir uma dependência <b>um-para-muitos</b>: quando um objeto (sujeito) muda de estado, todos os seus dependentes (observadores) são <b>notificados automaticamente</b>.',
  problema:
    'Sem o padrão, o <code>Pet</code> precisaria conhecer e chamar diretamente a barra, o alerta, o diário e o celular: ' +
    'forte acoplamento, e cada nova tela exigiria mudar a classe <code>Pet</code>. Com o Observer, o Pet só conhece a interface <code>Observador</code>.',
  analogia:
    'Um canal do YouTube: quem clica em "inscrever-se" entra na lista. Quando sai vídeo novo, o canal avisa a lista inteira ' +
    'sem saber quem é cada inscrito, e cada um decide o que fazer com o aviso.',
  participantes: [
    { papel: 'Subject (interface)', classes: 'Sujeito<T>', descricao: 'Contrato: inscrever(), desinscrever() e notificar().' },
    { papel: 'Subject Concreto', classes: 'Pet', descricao: 'Guarda o estado e a lista de observadores; avisa todos a cada mudança.' },
    { papel: 'Observer (interface)', classes: 'Observador<T>', descricao: 'Contrato com um único método: atualizar(dado).' },
    { papel: 'Observers Concretos', classes: 'BarraDeStatus, AlertaDeCuidado, DiarioDoPet, CelularDoDono', descricao: 'Cada um reage do seu jeito à mesma notificação.' },
    { papel: 'Dado da notificação', classes: 'EstadoPet', descricao: 'Retrato imutável do pet enviado junto com o aviso (modelo push).' },
  ],
  roteiro: [
    'Explique em uma frase: "um objeto muda e avisa automaticamente todos os interessados, sem conhecê-los".',
    'Mostre <code>Observador.ts</code> e <code>Sujeito.ts</code>: os dois contratos. Depois, em <code>Pet.ts</code>, a <b>lista</b> de observadores e o <b>for</b> do <code>notificar()</code>.',
    'Clique em <b>🍖 Alimentar</b>: acompanhe o método mudar o estado, chamar <code>notificar()</code>, e o aviso chegar a cada observador no diagrama.',
    'Mostre que cada observador reage <b>diferente</b> ao mesmo aviso: a barra redesenha, o diário anota, o celular só manda push quando o <b>humor muda</b>.',
    '<b>Desinscreva</b> o Celular do Dono (interruptor no cartão) e interaja de novo: o fio fica tracejado e ele para de receber. Inscrição é dinâmica, em tempo de execução.',
    'Ligue o <b>⏱ Relógio</b>: o tempo passa sozinho e as notificações continuam, sem ninguém "perguntar" ao pet.',
    'Feche com o desacoplamento: para criar um novo observador (ex.: "Veterinário"), basta implementar <code>Observador</code> e inscrever. <b>Nada muda no Pet</b>.',
  ],
  perguntas: [
    {
      pergunta: 'Qual a vantagem principal?',
      resposta: '<b>Baixo acoplamento</b>: o Pet depende só da interface <code>Observador</code>. Posso criar novos observadores sem alterar o Pet (Aberto/Fechado), e inscrever/desinscrever em tempo de execução.',
    },
    {
      pergunta: 'O que é modelo push e pull?',
      resposta: '<b>Push</b>: o sujeito envia os dados junto com o aviso, que é o que fazemos com o <code>EstadoPet</code>. <b>Pull</b>: o sujeito só avisa "mudei" e o observador consulta o que precisar (ex.: <code>pet.getEstado()</code>).',
    },
    {
      pergunta: 'Por que o EstadoPet é imutável?',
      resposta: 'Para que nenhum observador altere o pet pela notificação. Ele recebe uma "foto" somente leitura; mudar o estado continua sendo responsabilidade do próprio Pet.',
    },
    {
      pergunta: 'Qual a diferença entre Observer e Publish/Subscribe?',
      resposta: 'No Observer o sujeito <b>conhece diretamente</b> a lista de observadores. No Pub/Sub existe um <b>intermediário</b> (broker/event bus) entre publicadores e assinantes, que nem se conhecem, e a entrega costuma ser assíncrona.',
    },
    {
      pergunta: 'Quais os cuidados ou desvantagens?',
      resposta: 'Esquecer de desinscrever causa vazamento de memória (<i>lapsed listener</i>); a ordem de notificação não deve ser assumida; e atualizações em cascata podem ficar difíceis de rastrear.',
    },
    {
      pergunta: 'Onde aparece no mundo real?',
      resposta: '<code>addEventListener</code> do DOM, arquitetura MVC (o modelo avisa as views), RxJS/Observables, notificações de apps e webhooks.',
    },
  ],
};
