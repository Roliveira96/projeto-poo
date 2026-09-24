import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';

/**
 * Família Cyber: três produtos concretos feitos para funcionar juntos.
 */
export class CabecaCyber implements Cabeca {
  private readonly nome: string = 'Cabeça Cyber';
  private readonly icone: string = '🛰️';
  private readonly cor: string = '#b388ff';

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
    return 'Varredura digital: 2 redes wi-fi invadidas.';
  }
}

export class TroncoCyber implements Tronco {
  private readonly nome: string = 'Tronco Cyber';
  private readonly icone: string = '💾';
  private readonly cor: string = '#b388ff';
  private readonly blindagem: number = 70;

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

export class BracosCyber implements Bracos {
  private readonly nome: string = 'Braços Cyber';
  private readonly icone: string = '⚡';
  private readonly cor: string = '#b388ff';
  private readonly forca: number = 75;

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
    return 'Pulso eletromagnético! Desliga os circuitos do alvo.';
  }
}
