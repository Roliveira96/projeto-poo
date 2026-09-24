import type { Observador } from '../Observador';
import type { EstadoPet } from '../EstadoPet';

/**
 * OBSERVADOR CONCRETO: só se importa com situações de risco.
 */
export class AlertaDeCuidado implements Observador<EstadoPet> {
  private readonly elemento: HTMLElement;

  constructor(elemento: HTMLElement) {
    this.elemento = elemento;
  }

  public atualizar(estado: EstadoPet): void {
    const avisos: string[] = [];
    if (estado.getFome() >= 70) {
      avisos.push('🚨 ' + estado.getNome() + ' está com muita fome!');
    }
    if (estado.getEnergia() <= 20) {
      avisos.push('🚨 ' + estado.getNome() + ' precisa dormir!');
    }
    if (estado.getFelicidade() <= 25) {
      avisos.push('🚨 ' + estado.getNome() + ' está entediado!');
    }

    if (avisos.length === 0) {
      this.elemento.textContent = '✅ Tudo sob controle.';
      this.elemento.classList.remove('perigo');
    } else {
      this.elemento.textContent = avisos.join('  ');
      this.elemento.classList.add('perigo');
    }
  }
}
