import type { Observador } from '../Observador';
import type { EstadoPet } from '../EstadoPet';

/**
 * OBSERVADOR CONCRETO: redesenha as barras de fome, felicidade e energia.
 */
export class BarraDeStatus implements Observador<EstadoPet> {
  private readonly elemento: HTMLElement;

  constructor(elemento: HTMLElement) {
    this.elemento = elemento;
  }

  public atualizar(estado: EstadoPet): void {
    this.elemento.innerHTML =
      this.desenharBarra('🍖 Fome', estado.getFome(), 'fome') +
      this.desenharBarra('😊 Felicidade', estado.getFelicidade(), 'felicidade') +
      this.desenharBarra('⚡ Energia', estado.getEnergia(), 'energia');
  }

  private desenharBarra(rotulo: string, valor: number, tipo: string): string {
    return '<div class="barra"><span>' + rotulo + '</span>' +
      '<div class="barra-trilho"><div class="barra-valor ' + tipo + '" style="width:' + valor + '%"></div></div>' +
      '<b>' + valor + '</b></div>';
  }
}
