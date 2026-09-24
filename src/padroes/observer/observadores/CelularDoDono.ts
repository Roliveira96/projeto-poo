import type { Observador } from '../Observador';
import type { EstadoPet, Humor } from '../EstadoPet';

/**
 * OBSERVADOR CONCRETO: recebe TODAS as notificações, mas decide sozinho
 * que só vale a pena mandar um push quando o HUMOR do pet muda.
 */
export class CelularDoDono implements Observador<EstadoPet> {
  private readonly elemento: HTMLElement;
  private ultimoHumor: Humor | null = null;
  private ultimoPush: string = '';
  private avisosRecebidos: number = 0;
  private pushesEnviados: number = 0;

  constructor(elemento: HTMLElement) {
    this.elemento = elemento;
  }

  public atualizar(estado: EstadoPet): void {
    this.avisosRecebidos++;
    const humorAtual: Humor = estado.getHumor();
    if (humorAtual !== this.ultimoHumor) {
      this.ultimoHumor = humorAtual;
      this.pushesEnviados++;
      this.ultimoPush = '📳 ' + estado.getNome() + ' agora está <b>' + humorAtual + '</b>';
    }
    this.elemento.innerHTML = this.ultimoPush +
      '<small>' + this.avisosRecebidos + ' avisos recebidos → ' + this.pushesEnviados + ' push enviados</small>';
  }
}
