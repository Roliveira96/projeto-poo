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
  origem: [
    'Catalogado pela <i>Gang of Four</i> em 1994 como padrão <b>estrutural</b>, também conhecido como <b>Wrapper</b> (invólucro). O exemplo do livro é um editor de texto em que ' +
    'uma <code>TextView</code> ganha borda e barra de rolagem envolvendo-a com um <code>BorderDecorator</code> e um <code>ScrollDecorator</code>, sem criar subclasses como ' +
    '<code>TextViewComBordaERolagem</code>.',
    'Os usos conhecidos citados vêm de toolkits gráficos da época, como o <b>InterViews</b> e o <b>ET++</b>, e o livro também ilustra a ideia com <b>fluxos de dados</b> ' +
    '(streams que ganham compressão ou conversão de caracteres ao serem envolvidos). ' +
    'Pouco depois, em 1996, a biblioteca <code>java.io</code> popularizou o padrão para milhões de programadores: <code>new BufferedReader(new InputStreamReader(new FileInputStream(arquivo)))</code> ' +
    'é uma pilha de decorators.',
  ],
  aprofundamento: [
    '<b>A frase da GoF.</b> O livro resume a diferença entre Decorator e Strategy assim: <i>o Decorator muda a "pele" de um objeto; o Strategy muda as suas "entranhas"</i>. ' +
    'O decorator trabalha por fora, envolvendo; o strategy troca o algoritmo por dentro.',
    '<b>Consequências.</b> Mais flexível que a herança estática e evita classes "inchadas" no topo da hierarquia, pois cada responsabilidade vira uma classe pequena ' +
    '(<b>Responsabilidade Única</b>). Por outro lado, um decorator e o objeto decorado <b>não são o mesmo objeto</b> (comparar identidade falha), e o sistema passa a ter ' +
    'muitos objetos pequenos e parecidos, o que dificulta a depuração para quem não conhece o padrão.',
    '<b>Relação com outros padrões.</b> Pode ser visto como um <b>Composite</b> degenerado, com um único filho. Compartilha a estrutura de "envolver" com o <b>Proxy</b> e o ' +
    '<b>Adapter</b>, mas com intenções diferentes: acrescentar comportamento, controlar acesso e converter interfaces, respectivamente.',
    '<b>Onde aparece hoje.</b> Nos <b>middlewares HTTP</b>: em Go, uma função que recebe um <code>http.Handler</code> e devolve outro <code>http.Handler</code> adicionando log, ' +
    'autenticação ou compressão é um decorator; o mesmo vale para os middlewares do Express. Também aparece em <i>wrappers</i> de cache, retry e métricas em volta de clientes de API.',
  ],
};
