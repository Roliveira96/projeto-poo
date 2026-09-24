import { IngredienteDecorator } from '../IngredienteDecorator';

/**
 * DECORATOR CONCRETO: Pó de Fada
 * DOBRA o poder de tudo que está dentro dele. Por isso a ORDEM dos ingredientes importa!
 */
export class PoDeFada extends IngredienteDecorator {
  private readonly nome: string = 'Pó de Fada';
  private readonly cor: string = '#ffd60a';
  private readonly precoExtra: number = 15;
  private readonly efeito: string = '✨ Brilho mágico';
  private readonly multiplicador: number = 2;

  public getDescricao(): string {
    return this.pocao.getDescricao() + ' + ' + this.nome;
  }

  public getPoder(): number {
    return this.pocao.getPoder() * this.multiplicador;
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
