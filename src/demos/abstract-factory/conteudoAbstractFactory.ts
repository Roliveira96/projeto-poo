import type { ConteudoDidatico } from '../../app/ConteudoDidatico';

export const conteudoAbstractFactory: ConteudoDidatico = {
  objetivo:
    'Fornecer uma interface para criar <b>famílias de objetos relacionados</b> sem especificar suas classes concretas.',
  problema:
    'Quando um sistema precisa de vários objetos que <b>devem combinar entre si</b> (cabeça, tronco e braços da mesma linha), ' +
    'espalhar <code>new CabecaFogo()</code>, <code>new TroncoGelo()</code> pelo código deixa fácil misturar famílias por engano ' +
    'e difícil trocar a família inteira. O Abstract Factory concentra a criação de cada família em uma fábrica.',
  analogia:
    'Uma montadora com linhas de produção. A linha Fogo só produz peças de Fogo, a linha Gelo só peças de Gelo. ' +
    'Quem monta o robô só diz "me dê uma cabeça, um tronco e braços" para a linha escolhida, e tudo sai combinando.',
  participantes: [
    { papel: 'Abstract Factory', classes: 'FabricaRobo', descricao: 'Interface com um método criarX() para cada produto.' },
    { papel: 'Fábricas Concretas', classes: 'FabricaFogo, FabricaGelo, FabricaCyber', descricao: 'Cada uma cria os produtos de UMA família.' },
    { papel: 'Produtos Abstratos', classes: 'Cabeca, Tronco, Bracos', descricao: 'Interfaces de cada tipo de peça.' },
    { papel: 'Produtos Concretos', classes: 'CabecaFogo, TroncoGelo, BracosCyber…', descricao: 'Implementações de cada peça em cada família.' },
    { papel: 'Cliente', classes: 'Robo', descricao: 'Recebe uma FabricaRobo e só usa as interfaces.' },
  ],
  roteiro: [
    'Abra <b>📖 Conceito</b> e explique em uma frase: "criar famílias de objetos que combinam, sem conhecer as classes concretas".',
    'Mostre a aba <code>fabricas/FabricaRobo.ts</code>: é a interface com <b>um método de criação por produto</b>.',
    'Escolha a linha <b>🔥 Fogo</b> e clique em <b>Montar robô</b>. Acompanhe o destaque: o <code>Robo</code> chama <code>fabrica.criarCabeca()</code> e quem responde é a <code>FabricaFogo</code>.',
    'Aponte no diagrama: o Robo só conhece a <b>interface</b>. Ele nunca escreve <code>new CabecaFogo()</code>.',
    'Troque para <b>❄️ Gelo</b> e monte de novo: <b>trocar a família inteira = trocar um único objeto</b>.',
    'Clique em <b>Executar missão</b>: o mesmo código do Robo gera comportamentos diferentes (polimorfismo).',
    'Feche com a vantagem (nova linha sem mexer no Robo: aberto/fechado) e a desvantagem (nova PEÇA obriga a mexer em todas as fábricas).',
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
      pergunta: 'E se eu quiser adicionar um novo tipo de peça, como "Pernas"?',
      resposta: 'Essa é a <b>desvantagem</b> do padrão: preciso adicionar <code>criarPernas()</code> na interface <code>FabricaRobo</code> e implementar em <b>todas</b> as fábricas concretas.',
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
};
