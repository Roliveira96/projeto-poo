import type { Observador } from './Observador';
import type { Sujeito } from './Sujeito';
import { EstadoPet } from './EstadoPet';

/**
 * SUJEITO CONCRETO
 * O Pet não sabe QUEM são seus observadores (barra, alerta, diário, celular...).
 * Ele só guarda uma lista de "Observador" e chama atualizar() em cada um.
 */
export class Pet implements Sujeito<EstadoPet> {
  private readonly observadores: Observador<EstadoPet>[] = [];
  private readonly nome: string;
  private fome: number = 30;
  private felicidade: number = 60;
  private energia: number = 80;
  private ultimoEvento: string = 'nasceu';

  constructor(nome: string) {
    this.nome = nome;
  }

  public inscrever(observador: Observador<EstadoPet>): void {
    if (this.observadores.indexOf(observador) === -1) {
      this.observadores.push(observador);
    }
  }

  public desinscrever(observador: Observador<EstadoPet>): void {
    const posicao: number = this.observadores.indexOf(observador);
    if (posicao !== -1) {
      this.observadores.splice(posicao, 1);
    }
  }

  public notificar(): void {
    const estado: EstadoPet = this.getEstado();
    for (const observador of this.observadores) {
      observador.atualizar(estado);
    }
  }

  public alimentar(): void {
    this.fome = this.limitar(this.fome - 30);
    this.energia = this.limitar(this.energia + 5);
    this.registrarEvento('comeu um peixinho');
  }

  public brincar(): void {
    this.felicidade = this.limitar(this.felicidade + 25);
    this.fome = this.limitar(this.fome + 10);
    this.energia = this.limitar(this.energia - 15);
    this.registrarEvento('brincou com a bolinha');
  }

  public dormir(): void {
    this.energia = this.limitar(this.energia + 40);
    this.fome = this.limitar(this.fome + 5);
    this.registrarEvento('tirou uma soneca');
  }

  public passarTempo(): void {
    this.fome = this.limitar(this.fome + 6);
    this.felicidade = this.limitar(this.felicidade - 5);
    this.energia = this.limitar(this.energia - 4);
    this.registrarEvento('o tempo passou');
  }

  public getEstado(): EstadoPet {
    return new EstadoPet(this.nome, this.fome, this.felicidade, this.energia, this.ultimoEvento);
  }

  public getQuantidadeDeObservadores(): number {
    return this.observadores.length;
  }

  /** Toda mudança de estado termina aqui: registra o evento e avisa os inscritos. */
  private registrarEvento(evento: string): void {
    this.ultimoEvento = evento;
    this.notificar();
  }

  private limitar(valor: number): number {
    return Math.max(0, Math.min(100, valor));
  }
}
