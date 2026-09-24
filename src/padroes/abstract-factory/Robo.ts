import type { FabricaRobo } from './fabricas/FabricaRobo';
import type { Cabeca } from './produtos/Cabeca';
import type { Tronco } from './produtos/Tronco';
import type { Bracos } from './produtos/Bracos';
import type { Locomocao } from './produtos/Locomocao';

/**
 * CLIENTE do padrão.
 * O Robo recebe UMA fábrica e pede a ela todas as peças.
 * Ele não sabe (nem precisa saber) se a fábrica é de Fogo, Gelo ou Cyber:
 * por isso é impossível montar um robô com peças de linhas misturadas.
 */
export class Robo {
  private readonly linha: string;
  private readonly cabeca: Cabeca;
  private readonly tronco: Tronco;
  private readonly bracos: Bracos;
  private readonly locomocao: Locomocao;

  constructor(fabrica: FabricaRobo) {
    this.linha = fabrica.getNomeDaLinha();
    this.cabeca = fabrica.criarCabeca();
    this.tronco = fabrica.criarTronco();
    this.bracos = fabrica.criarBracos();
    this.locomocao = fabrica.criarLocomocao();
  }

  public getLinha(): string {
    return this.linha;
  }

  public getCabeca(): Cabeca {
    return this.cabeca;
  }

  public getTronco(): Tronco {
    return this.tronco;
  }

  public getBracos(): Bracos {
    return this.bracos;
  }

  public getLocomocao(): Locomocao {
    return this.locomocao;
  }

  public getPoderTotal(): number {
    return this.tronco.getBlindagem() + this.bracos.getForca();
  }

  public executarMissao(): string[] {
    const relatorio: string[] = [];
    relatorio.push(this.locomocao.mover());
    relatorio.push(this.cabeca.escanear());
    relatorio.push(this.bracos.atacar());
    relatorio.push('Blindagem ativa: ' + this.tronco.getBlindagem() + ' pontos.');
    return relatorio;
  }
}
