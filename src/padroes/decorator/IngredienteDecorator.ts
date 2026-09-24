import type { Pocao } from './Pocao';

/**
 * DECORATOR ABSTRATO
 * 1) Implementa a MESMA interface do objeto decorado (Pocao).
 * 2) Guarda uma referência para a poção que está envolvendo.
 * 3) Por padrão, apenas repassa as chamadas para dentro.
 * Cada ingrediente concreto sobrescreve o que quer alterar.
 */
export abstract class IngredienteDecorator implements Pocao {
  protected readonly pocao: Pocao;

  constructor(pocao: Pocao) {
    this.pocao = pocao;
  }

  public getDescricao(): string {
    return this.pocao.getDescricao();
  }

  public getPoder(): number {
    return this.pocao.getPoder();
  }

  public getPreco(): number {
    return this.pocao.getPreco();
  }

  public getCor(): string {
    return this.pocao.getCor();
  }

  public getEfeitos(): string[] {
    return this.pocao.getEfeitos();
  }

  /** Mistura a cor da poção interna com a cor do ingrediente (média RGB). */
  protected misturarCor(corDoIngrediente: string): string {
    const corAtual: string = this.pocao.getCor();
    let resultado: string = '#';
    for (let posicao = 1; posicao < 7; posicao += 2) {
      const canalAtual: number = parseInt(corAtual.substring(posicao, posicao + 2), 16);
      const canalNovo: number = parseInt(corDoIngrediente.substring(posicao, posicao + 2), 16);
      const media: number = Math.round((canalAtual + canalNovo) / 2);
      resultado += media.toString(16).padStart(2, '0');
    }
    return resultado;
  }
}
