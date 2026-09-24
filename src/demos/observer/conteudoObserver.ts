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
  origem: [
    'Catalogado pela <i>Gang of Four</i> em 1994 como padrão <b>comportamental</b>, também conhecido como <b>Dependents</b> (dependentes) e <b>Publish-Subscribe</b>. ' +
    'Sua raiz é o <b>MVC</b>, criado por Trygve Reenskaug no Xerox PARC em 1978–79: no Smalltalk-80, todo objeto podia registrar dependentes ' +
    '(<code>addDependent:</code>) e avisá-los com <code>changed</code>, que chamava <code>update:</code> em cada um.',
    'Entre os usos conhecidos listados pela GoF estão o próprio MVC do Smalltalk, o toolkit <b>InterViews</b>, o <b>Andrew Toolkit</b> (Carnegie Mellon) e o <b>Unidraw</b> de John Vlissides.',
  ],
  aprofundamento: [
    '<b>Push × pull.</b> No modelo <b>push</b> o sujeito envia os dados junto com o aviso (como o <code>EstadoPet</code> aqui); no <b>pull</b> ele só avisa "mudei" e cada observador ' +
    'busca o que precisa. O push é mais simples para o observador; o pull deixa o sujeito mais independente de quem observa.',
    '<b>Cuidados.</b> Atualizações em cascata (um observador que altera outro sujeito) podem gerar ciclos difíceis de rastrear. Observadores que não se desinscrevem mantêm referências vivas ' +
    'e causam vazamento de memória (<i>lapsed listener</i>). Para dependências complexas, a GoF sugere um <b>ChangeManager</b> intermediário, que é um <b>Mediator</b>.',
    '<b>Da GoF à programação reativa.</b> O Java trouxe <code>java.util.Observable</code> desde a versão 1.0, mas ele foi <b>depreciado no Java 9</b>, justamente por ser uma classe ' +
    '(obriga herança) e não uma interface. A ideia evoluiu para a <b>programação reativa</b>: o ReactiveX (Rx), criado na Microsoft por volta de 2009, combina Observer com Iterator e ' +
    'hoje está no RxJS, no Angular e em várias plataformas.',
    '<b>Onde aparece hoje.</b> O <code>addEventListener</code> do DOM, o MVC e o MVVM de frameworks de interface, notificações de aplicativos, webhooks e, em escala de sistemas, ' +
    'a arquitetura orientada a eventos (com um broker no meio, o que já é Publish/Subscribe).',
  ],
};
