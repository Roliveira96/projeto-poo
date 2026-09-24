import { IngredienteDecorator } from '../IngredienteDecorator';

/**
 * DECORATOR CONCRETO: Olho de Dragão
 * Soma +30 de poder ao que já existe dentro dele.
 */
export class OlhoDeDragao extends IngredienteDecorator {
  private readonly nome: string = 'Olho de Dragão';
  private readonly cor: string = '#e63946';
  private readonly precoExtra: number = 12;
  private readonly efeito: string = '🔥 Sopro de fogo';
  private readonly poderExtra: number = 30;

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
