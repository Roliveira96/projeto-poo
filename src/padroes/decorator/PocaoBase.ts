import type { Pocao } from './Pocao';

/**
 * COMPONENTE CONCRETO
 * O objeto original, sem nenhuma decoração. É o miolo da "cebola".
 */
export class PocaoBase implements Pocao {
  private readonly descricao: string = 'Água Encantada';
  private readonly poder: number = 10;
  private readonly preco: number = 5;
  private readonly cor: string = '#8ecae6';

  public getDescricao(): string {
    return this.descricao;
  }

  public getPoder(): number {
    return this.poder;
  }

  public getPreco(): number {
    return this.preco;
  }

  public getCor(): string {
    return this.cor;
  }

  public getEfeitos(): string[] {
    return [];
  }
}
