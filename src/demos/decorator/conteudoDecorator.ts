import type { ConteudoDidatico } from '../../app/ConteudoDidatico';

export const conteudoDecorator: ConteudoDidatico = {
  objetivo:
    'Adicionar responsabilidades a um objeto <b>dinamicamente, em tempo de execução</b>, como alternativa flexível à herança.',
  problema:
    'Com 4 ingredientes, criar uma subclasse para cada combinação (<code>PocaoComOlhoEFada</code>, <code>PocaoComRaizEOlho</code>…) ' +
    'gera uma <b>explosão de classes</b>: 2⁴ = 16 combinações, sem contar ordem e repetição. Com o Decorator são só 4 classes que se empilham como quisermos.',
  analogia:
    'Vestir roupas no frio: você continua sendo você, mas cada camada (camiseta, blusa, casaco) envolve a anterior e acrescenta algo. ' +
    'Na poção, cada ingrediente envolve a poção anterior e soma poder, preço, cor e efeito.',
  participantes: [
    { papel: 'Componente', classes: 'Pocao', descricao: 'Interface comum: tanto a poção base quanto os ingredientes a implementam.' },
    { papel: 'Componente Concreto', classes: 'PocaoBase', descricao: 'O objeto original, o miolo que será decorado.' },
    { papel: 'Decorator', classes: 'IngredienteDecorator', descricao: 'Classe abstrata que guarda a referência "pocao" e repassa as chamadas.' },
    { papel: 'Decorators Concretos', classes: 'OlhoDeDragao, PoDeFada, RaizSombria, LagrimaDeUnicornio', descricao: 'Acrescentam comportamento antes/depois de repassar a chamada.' },
  ],
  roteiro: [
    'Explique em uma frase: "acrescentar comportamento a um objeto em tempo de execução, envolvendo-o em camadas".',
    'Mostre <code>Pocao.ts</code> (a interface) e <code>IngredienteDecorator.ts</code>: ele <b>implementa Pocao</b> e <b>guarda uma Pocao</b> dentro. Esses são os dois segredos do padrão.',
    'Adicione <b>Olho de Dragão</b>: no diagrama surge uma caixa envolvendo a base. No log aparece <code>pocao = new OlhoDeDragao(pocao)</code>.',
    'Adicione <b>Pó de Fada</b> e clique em <b>Calcular poder</b>. Mostre a chamada <b>entrando</b> camada por camada até a base e <b>voltando</b> com os valores.',
    'Clique em <b>Nova poção</b> e adicione na ordem inversa (Pó de Fada primeiro, depois Olho). O poder muda: <b>a ordem das camadas importa</b>.',
    'Destaque que o cliente sempre trata o resultado como uma simples <code>Pocao</code>: ele não sabe quantas camadas existem.',
    'Feche com a comparação com herança (explosão de subclasses) e cite Java IO: <code>new BufferedReader(new FileReader(...))</code>.',
  ],
  perguntas: [
    {
      pergunta: 'Por que não usar herança?',
      resposta: 'Herança é estática (definida em tempo de compilação) e cada combinação precisaria de uma subclasse. Com Decorator, a combinação é montada em <b>tempo de execução</b> e cada ingrediente é uma classe pequena. É o princípio <b>composição sobre herança</b>.',
    },
    {
      pergunta: 'Por que o IngredienteDecorator é abstrato?',
      resposta: 'Ele concentra o que todo ingrediente tem em comum: a referência para a poção interna e a delegação padrão dos métodos. Não faz sentido instanciar um "ingrediente genérico", só os concretos.',
    },
    {
      pergunta: 'O que acontece se eu trocar a ordem dos ingredientes?',
      resposta: 'O <code>PoDeFada</code> <b>multiplica</b> o poder do que está dentro dele. Base(10) → Olho(+30) → Fada(×2) = 80. Base(10) → Fada(×2) → Olho(+30) = 50. A ordem de empilhamento muda o resultado.',
    },
    {
      pergunta: 'Qual a diferença entre Decorator, Proxy e Adapter?',
      resposta: '<b>Decorator</b> mantém a interface e <b>acrescenta</b> comportamento, podendo empilhar. <b>Proxy</b> mantém a interface e <b>controla o acesso</b> (cache, lazy, segurança). <b>Adapter</b> <b>converte</b> uma interface em outra.',
    },
    {
      pergunta: 'Isso tem a ver com os @decorators do TypeScript?',
      resposta: 'Não diretamente. Os <code>@decorators</code> do TS/Angular são um recurso de metaprogramação da linguagem. Aqui é o padrão de projeto clássico do GoF, feito só com interface e composição de objetos.',
    },
    {
      pergunta: 'Quais as desvantagens?',
      resposta: 'Muitos objetos pequenos, o que dificulta a depuração; a ordem das camadas pode causar erros sutis; e remover uma camada do meio não é trivial.',
    },
  ],
};
