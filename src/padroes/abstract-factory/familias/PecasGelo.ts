import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';

/**
 * Família Gelo: três produtos concretos feitos para funcionar juntos.
 */
export class CabecaGelo implements Cabeca {
  private readonly nome: string = 'Cabeça Gelo';
  private readonly icone: string = '❄️';
  private readonly cor: string = '#4cc9f0';

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
    return 'Visão criogênica: temperatura ambiente -40°C.';
  }
}

export class TroncoGelo implements Tronco {
  private readonly nome: string = 'Tronco Gelo';
  private readonly icone: string = '🧊';
  private readonly cor: string = '#4cc9f0';
  private readonly blindagem: number = 90;

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

export class BracosGelo implements Bracos {
  private readonly nome: string = 'Braços Gelo';
  private readonly icone: string = '🌨️';
  private readonly cor: string = '#4cc9f0';
  private readonly forca: number = 60;

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
    return 'Raio congelante! O alvo fica lento.';
  }
}
