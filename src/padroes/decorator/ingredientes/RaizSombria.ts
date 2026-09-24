import { IngredienteDecorator } from '../IngredienteDecorator';

/**
 * DECORATOR CONCRETO: Raiz Sombria
 * Soma +15 de poder e deixa quem beber invisível.
 */
export class RaizSombria extends IngredienteDecorator {
  private readonly nome: string = 'Raiz Sombria';
  private readonly cor: string = '#5a189a';
  private readonly precoExtra: number = 8;
  private readonly efeito: string = '👻 Invisibilidade';
  private readonly poderExtra: number = 15;

  public getDescricao(): string {
    return this.pocao.getDescricao() + ' + ' + this.nome;
  }

  public getPoder(): number {
    return this.pocao.getPoder() + this.poderExtra;
  }

  public getPreco(): number {
    return this.pocao.getPreco() + this.precoExtra;
  }

  public getCor(): string {
    return this.misturarCor(this.cor);
  }

  public getEfeitos(): string[] {
    const efeitos: string[] = this.pocao.getEfeitos();
    efeitos.push(this.efeito);
    return efeitos;
  }
}
