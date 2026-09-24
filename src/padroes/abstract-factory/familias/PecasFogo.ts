import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';
import type { Locomocao } from '../produtos/Locomocao';

/**
 * Família Fogo: quatro produtos concretos feitos para funcionar juntos.
 */
export class CabecaFogo implements Cabeca {
  private readonly nome: string = 'Cabeça Fogo';
  private readonly icone: string = '🔥';
  private readonly cor: string = '#ef5b3a';

  public getNome(): string {
    return this.nome;
  }

  public getIcone(): string {
    return this.icone;
  }

  public getCor(): string {
    return this.cor;
  }

  public escanear(): string {
    return 'Sensor térmico: 3 alvos detectados pelo calor.';
  }
}

export class TroncoFogo implements Tronco {
  private readonly nome: string = 'Tronco Fogo';
  private readonly icone: string = '🌋';
  private readonly cor: string = '#ef5b3a';
  private readonly blindagem: number = 60;

  public getNome(): string {
    return this.nome;
  }

  public getIcone(): string {
    return this.icone;
  }

  public getCor(): string {
    return this.cor;
  }

  public getBlindagem(): number {
    return this.blindagem;
  }
}

export class BracosFogo implements Bracos {
  private readonly nome: string = 'Braços Fogo';
  private readonly icone: string = '☄️';
  private readonly cor: string = '#ef5b3a';
  private readonly forca: number = 90;

  public getNome(): string {
    return this.nome;
  }

  public getIcone(): string {
    return this.icone;
  }

  public getCor(): string {
    return this.cor;
  }

  public getForca(): number {
    return this.forca;
  }

  public atacar(): string {
    return 'Lança-chamas! Causa queimadura.';
  }
}

export class LocomocaoFogo implements Locomocao {
  private readonly nome: string = 'Propulsor de Foguete';
  private readonly icone: string = '🚀';
  private readonly cor: string = '#ef5b3a';
  private readonly velocidade: number = 95;

  public getNome(): string {
    return this.nome;
  }

  public getIcone(): string {
    return this.icone;
  }

  public getCor(): string {
    return this.cor;
  }

  public getVelocidade(): number {
    return this.velocidade;
  }

  public mover(): string {
    return 'Propulsores ligados: decolou deixando um rastro de fogo!';
  }
}
