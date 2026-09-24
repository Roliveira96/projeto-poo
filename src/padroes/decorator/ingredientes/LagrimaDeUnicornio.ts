import { IngredienteDecorator } from '../IngredienteDecorator';

/**
 * DECORATOR CONCRETO: Lágrima de Unicórnio
 * Pouco poder (+5), mas adiciona cura. É o ingrediente mais caro.
 */
export class LagrimaDeUnicornio extends IngredienteDecorator {
  private readonly nome: string = 'Lágrima de Unicórnio';
  private readonly cor: string = '#ffafcc';
  private readonly precoExtra: number = 20;
  private readonly efeito: string = '💖 Cura total';
  private readonly poderExtra: number = 5;

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
