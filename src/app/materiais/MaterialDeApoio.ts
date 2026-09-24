/**
 * Material complementar comum aos três padrões:
 * a história dos padrões de projeto e as referências.
 */
export class MaterialDeApoio {
  private readonly historia: string[] = [
    '<b>Tudo começou na arquitetura, não na computação.</b> Em 1977 o arquiteto Christopher Alexander publicou <i>A Pattern Language</i>, ' +
    'um catálogo de 253 padrões para projetar cidades, bairros e casas. A definição que ele deu virou a base de tudo o que veio depois: ' +
    '<blockquote>"Cada padrão descreve um problema que ocorre repetidamente em nosso ambiente e, então, descreve o núcleo da solução para esse problema, ' +
    'de tal forma que você possa usar essa solução um milhão de vezes, sem nunca fazê-la da mesma maneira duas vezes."</blockquote>',

    '<b>1987: a ideia chega ao software.</b> Kent Beck e Ward Cunningham apresentaram na conferência OOPSLA o artigo ' +
    '<i>Using Pattern Languages for Object-Oriented Programs</i>, aplicando as ideias de Alexander ao projeto de interfaces em Smalltalk. ' +
    'Pouco depois, Erich Gamma escreveu sua tese de doutorado (Universidade de Zurique, 1991) catalogando padrões encontrados no framework ET++.',

    '<b>1990–1993: nasce a "Gangue dos Quatro".</b> Gamma, Richard Helm, Ralph Johnson e John Vlissides se encontraram em workshops das conferências ' +
    'OOPSLA e ECOOP e perceberam que estavam documentando as mesmas soluções recorrentes. Em 1993 publicaram o artigo ' +
    '<i>Design Patterns: Abstraction and Reuse of Object-Oriented Design</i> (ECOOP), a semente do livro.',

    '<b>1994: o livro.</b> <i>Design Patterns: Elements of Reusable Object-Oriented Software</i> (Addison-Wesley), lançado na OOPSLA de 1994 ' +
    'com prefácio de Grady Booch, catalogou <b>23 padrões</b> divididos em três famílias: <b>5 criacionais</b> (como criar objetos), ' +
    '<b>7 estruturais</b> (como compor objetos) e <b>11 comportamentais</b> (como os objetos se comunicam). Os autores ganharam o apelido ' +
    '<i>Gang of Four</i> (GoF), e o livro se tornou um dos mais influentes da história da computação. No Brasil saiu como ' +
    '<i>Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos</i> (Bookman).',

    '<b>Os dois princípios que atravessam o livro.</b> Logo no primeiro capítulo, a GoF resume a filosofia por trás dos 23 padrões: ' +
    '<b>"Programe para uma interface, não para uma implementação"</b> e <b>"Prefira composição de objetos à herança de classes"</b>. ' +
    'Os três padrões desta apresentação são aplicações diretas disso: o Abstract Factory entrega interfaces, o Decorator compõe em vez de herdar ' +
    'e o Observer depende apenas de um contrato.',

    '<b>Reconhecimento e críticas.</b> Em 2005 os quatro autores receberam o <i>Programming Languages Achievement Award</i> da ACM SIGPLAN. ' +
    'O livro também recebeu críticas construtivas: em 1996, Peter Norvig mostrou que 16 dos 23 padrões ficam mais simples ou até "invisíveis" ' +
    'em linguagens dinâmicas como Lisp e Dylan, argumento usado até hoje para lembrar que <b>padrões dependem da linguagem</b> e não devem ser ' +
    'aplicados por obrigação, e sim quando o problema que resolvem realmente aparece.',
  ];

  private readonly referencias: string[] = [
    'GAMMA, E.; HELM, R.; JOHNSON, R.; VLISSIDES, J. <i>Design Patterns: Elements of Reusable Object-Oriented Software</i>. Addison-Wesley, 1994.',
    'GAMMA, E. et al. <i>Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos</i>. Porto Alegre: Bookman, 2000.',
    'ALEXANDER, C.; ISHIKAWA, S.; SILVERSTEIN, M. <i>A Pattern Language: Towns, Buildings, Construction</i>. Oxford University Press, 1977.',
    'BECK, K.; CUNNINGHAM, W. <i>Using Pattern Languages for Object-Oriented Programs</i>. Workshop OOPSLA, 1987.',
    'VLISSIDES, J. <i>Pattern Hatching: Design Patterns Applied</i>. Addison-Wesley, 1998.',
    'FREEMAN, E.; ROBSON, E. <i>Use a Cabeça! Padrões de Projetos</i>. Alta Books, 2ª ed.',
    'NORVIG, P. <i>Design Patterns in Dynamic Languages</i>. Apresentação, 1996.',
    'REFACTORING.GURU. <i>Padrões de Projeto</i>. Disponível em: refactoring.guru/pt-br/design-patterns.',
  ];

  public gerarHtmlHistoria(): string {
    let html: string = '';
    for (const paragrafo of this.historia) {
      html += '<p>' + paragrafo + '</p>';
    }
    return html;
  }

  public gerarHtmlReferencias(): string {
    let html: string = '<ul class="referencias">';
    for (const referencia of this.referencias) {
      html += '<li>' + referencia + '</li>';
    }
    return html + '</ul>';
  }

  /** Janela completa; "especifico" é o trecho do padrão atual (vazio na capa). */
  public gerarHtml(especifico: string): string {
    return especifico +
      '<h3>🏛️ Quem criou os padrões de projeto</h3>' + this.gerarHtmlHistoria() +
      '<h3>📖 Referências</h3>' + this.gerarHtmlReferencias();
  }
}
