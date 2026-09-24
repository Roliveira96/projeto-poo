/** Professor responsável pela avaliação, exibido na capa. */
export class Professor {
  private readonly nome: string;
  private readonly disciplina: string;
  private readonly avaliacao: string;

  constructor(nome: string, disciplina: string, avaliacao: string) {
    this.nome = nome;
    this.disciplina = disciplina;
    this.avaliacao = avaliacao;
  }

  /** Iniciais do primeiro e do último nome, ex.: "Emerson André Fedechen" → "EF". */
  public getIniciais(): string {
    const partes: string[] = this.nome.split(' ');
    return partes[0].charAt(0) + partes[partes.length - 1].charAt(0);
  }

  public gerarHtml(): string {
    return '<section class="professor">' +
      '<div class="professor-monograma" aria-hidden="true">' + this.getIniciais() + '</div>' +
      '<div>' +
      '  <span class="autor-rotulo">Professor avaliador</span>' +
      '  <h2>' + this.nome + '</h2>' +
      '  <p class="professor-disciplina">' + this.disciplina + '</p>' +
      '  <p class="professor-avaliacao">' + this.avaliacao + '</p>' +
      '</div>' +
      '</section>';
  }
}
