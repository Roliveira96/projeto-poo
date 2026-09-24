import type { ConteudoDidatico } from '../../app/ConteudoDidatico';

export const conteudoAbstractFactory: ConteudoDidatico = {
  objetivo:
    'Fornecer uma interface para criar <b>famílias de objetos relacionados</b> sem especificar suas classes concretas.',
  problema:
    'Quando um sistema precisa de vários objetos que <b>devem combinar entre si</b> (cabeça, tronco, braços e locomoção da mesma linha), ' +
    'espalhar <code>new CabecaFogo()</code>, <code>new TroncoGelo()</code> pelo código deixa fácil misturar famílias por engano ' +
    'e difícil trocar a família inteira. O Abstract Factory concentra a criação de cada família em uma fábrica.',
  analogia:
    'Uma montadora com linhas de produção. A linha Fogo só produz peças de Fogo, a linha Gelo só peças de Gelo. ' +
    'Quem monta o robô só diz "me dê uma cabeça, um tronco, braços e uma locomoção" para a linha escolhida, e tudo sai combinando: ' +
    'o robô de Fogo voa com propulsor de foguete, o de Gelo anda de esteira e o Cyber flutua por magnetismo.',
  participantes: [
    { papel: 'Abstract Factory', classes: 'FabricaRobo', descricao: 'Interface com um método criarX() para cada produto.' },
    { papel: 'Fábricas Concretas', classes: 'FabricaFogo, FabricaGelo, FabricaCyber', descricao: 'Cada uma cria os produtos de UMA família.' },
    { papel: 'Produtos Abstratos', classes: 'Cabeca, Tronco, Bracos, Locomocao', descricao: 'Interfaces de cada tipo de peça.' },
    { papel: 'Produtos Concretos', classes: 'CabecaFogo, TroncoGelo, LocomocaoCyber…', descricao: 'Implementações de cada peça em cada família (3 linhas × 4 peças = 12 classes).' },
    { papel: 'Cliente', classes: 'Robo', descricao: 'Recebe uma FabricaRobo e só usa as interfaces.' },
  ],
  perguntas: [
    {
      pergunta: 'Qual a diferença entre Abstract Factory e Factory Method?',
      resposta: 'O Factory Method cria <b>um</b> produto e usa herança (a subclasse decide o que instanciar). O Abstract Factory cria uma <b>família</b> de produtos e usa composição: o cliente recebe um objeto-fábrica. Na prática, cada método <code>criarX()</code> de uma fábrica concreta se parece com um factory method.',
    },
    {
      pergunta: 'Como eu adiciono uma nova linha, por exemplo "Água"?',
      resposta: 'Crio <code>CabecaAgua</code>, <code>TroncoAgua</code>, <code>BracosAgua</code> e <code>FabricaAgua implements FabricaRobo</code>. O <code>Robo</code> não muda nada: <b>princípio Aberto/Fechado</b>.',
    },
    {
      pergunta: 'E se eu quiser adicionar um novo tipo de peça?',
      resposta: 'Essa é a <b>desvantagem</b> do padrão, e aconteceu neste projeto: a <code>Locomocao</code> foi a última peça criada. Para ela existir foi preciso ' +
        'criar a interface <code>Locomocao</code>, as 3 classes concretas (propulsor, esteira e flutuador), adicionar <code>criarLocomocao()</code> na interface ' +
        '<code>FabricaRobo</code> e implementar em <b>todas</b> as fábricas. Já uma nova <b>linha</b> não mexe em nada existente.',
    },
    {
      pergunta: 'O que impede de misturar peças de linhas diferentes?',
      resposta: 'O <code>Robo</code> recebe uma única <code>FabricaRobo</code> no construtor e pede todas as peças a ela. Como cada fábrica concreta só cria peças da própria família, a mistura não acontece.',
    },
    {
      pergunta: 'Onde esse padrão aparece no mundo real?',
      resposta: 'Kits de interface (componentes Windows × macOS, tema claro × escuro), drivers de banco de dados (JDBC cria Connection, Statement e ResultSet do mesmo fornecedor) e jogos (inimigos/cenários por fase).',
    },
    {
      pergunta: 'Por que interfaces e não classes abstratas?',
      resposta: 'Porque as fábricas e peças não compartilham implementação, só o contrato. Se houvesse código comum (ex.: um atributo compartilhado), uma classe abstrata também serviria.',
    },
  ],
  origem: [
    'Catalogado pela <i>Gang of Four</i> em 1994 como padrão <b>criacional</b>, também conhecido pelo nome <b>Kit</b>. O exemplo que abre o capítulo no livro é um ' +
    '<b>toolkit de interface gráfica</b> que precisa suportar vários padrões visuais (na época, Motif e Presentation Manager): janelas, barras de rolagem e botões ' +
    'de um estilo não podem ser misturados com os de outro.',
    'Entre os usos conhecidos citados pela GoF estão o <b>InterViews</b> (Stanford), que usava o sufixo "Kit" em classes como <code>WidgetKit</code> e <code>DialogKit</code>, ' +
    'e o <b>ET++</b>, framework de Erich Gamma e André Weinand, que usava uma fábrica abstrata <code>WindowSystem</code> para rodar o mesmo programa em sistemas de janelas diferentes.',
  ],
  aprofundamento: [
    '<b>Consequências apontadas pela GoF.</b> (1) Isola as classes concretas: o cliente manipula apenas interfaces. (2) Torna fácil trocar a família inteira, ' +
    'porque a fábrica concreta aparece em um único lugar. (3) Garante a <b>consistência</b> entre produtos da mesma família. (4) Em contrapartida, ' +
    '<b>adicionar um novo tipo de produto é difícil</b>, pois obriga a mudar a interface e todas as fábricas.',
    '<b>Relação com outros padrões.</b> Os métodos de uma fábrica concreta costumam ser <b>Factory Methods</b>. Como normalmente basta uma instância de cada fábrica ' +
    'concreta, elas são frequentemente <b>Singletons</b>. O <b>Prototype</b> é uma alternativa: a fábrica clona protótipos em vez de instanciar subclasses.',
    '<b>Princípios SOLID envolvidos.</b> É uma aplicação direta da <b>Inversão de Dependência</b> (o <code>Robo</code> depende da abstração <code>FabricaRobo</code>) ' +
    'e do <b>Aberto/Fechado</b> (uma nova linha entra sem alterar o cliente).',
    '<b>Onde aparece hoje.</b> Em Java, <code>javax.xml.parsers.DocumentBuilderFactory</code> e o <code>java.awt.Toolkit</code>; kits de componentes com temas claro/escuro; ' +
    'drivers de banco que entregam conexão, comando e resultado do mesmo fornecedor; e contêineres de <b>injeção de dependência</b>, que escolhem a fábrica concreta na configuração.',
  ],
};
