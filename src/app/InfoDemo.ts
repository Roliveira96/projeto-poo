/** Dados do card exibido no menu inicial. */
export class InfoDemo {
  public readonly id: string;
  public readonly padrao: string;
  public readonly categoria: string;
  public readonly tema: string;
  public readonly icone: string;
  public readonly resumo: string;

  constructor(id: string, padrao: string, categoria: string, tema: string, icone: string, resumo: string) {
    this.id = id;
    this.padrao = padrao;
    this.categoria = categoria;
    this.tema = tema;
    this.icone = icone;
    this.resumo = resumo;
  }
}
