import type { Observador } from '../Observador';
import type { EstadoPet } from '../EstadoPet';

/**
 * OBSERVADOR CONCRETO: guarda um histórico próprio dos eventos recebidos.
 */
export class DiarioDoPet implements Observador<EstadoPet> {
  private readonly elemento: HTMLElement;
  private readonly entradas: string[] = [];
  private readonly limiteDeEntradas: number = 6;

  constructor(elemento: HTMLElement) {
    this.elemento = elemento;
  }

  public atualizar(estado: EstadoPet): void {
    const hora: string = new Date().toLocaleTimeString('pt-BR');
    this.entradas.unshift(hora + ' — ' + estado.getNome() + ' ' + estado.getEvento());
    if (this.entradas.length > this.limiteDeEntradas) {
      this.entradas.pop();
    }
    this.elemento.innerHTML = '<li>' + this.entradas.join('</li><li>') + '</li>';
  }
}
