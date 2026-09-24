export type Humor = 'feliz' | 'normal' | 'triste' | 'faminto' | 'cansado';

/**
 * "Foto" do pet em um instante. É o dado enviado junto com a notificação.
 * Imutável: nenhum observador consegue alterar o pet através dela.
 */
export class EstadoPet {
  private readonly nome: string;
  private readonly fome: number;
  private readonly felicidade: number;
  private readonly energia: number;
  private readonly evento: string;

  constructor(nome: string, fome: number, felicidade: number, energia: number, evento: string) {
    this.nome = nome;
    this.fome = fome;
    this.felicidade = felicidade;
    this.energia = energia;
    this.evento = evento;
  }

  public getNome(): string {
    return this.nome;
  }

  public getFome(): number {
    return this.fome;
  }

  public getFelicidade(): number {
    return this.felicidade;
  }

  public getEnergia(): number {
    return this.energia;
  }

  public getEvento(): string {
    return this.evento;
  }

  public getHumor(): Humor {
    if (this.energia < 20) {
      return 'cansado';
    }
    if (this.fome > 70) {
      return 'faminto';
    }
    if (this.felicidade < 30) {
      return 'triste';
    }
    if (this.felicidade > 70) {
      return 'feliz';
    }
    return 'normal';
  }
}
