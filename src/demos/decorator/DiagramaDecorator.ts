/** Uma camada do diagrama: a classe e a cor com que ela aparece. */
export interface CamadaVisual {
  classe: string;
  cor: string;
}

/**
 * Diagrama ao vivo do Decorator: caixas aninhadas (bonecas russas).
 * A camada mais de fora é o último ingrediente adicionado.
 */
export class DiagramaDecorator {
  private readonly container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public renderizar(camadas: CamadaVisual[]): void {
    let html: string = '';
    for (let indice = 0; indice < camadas.length; indice++) {
      const papel: string = indice === 0 ? 'componente concreto' : 'decorator';
      html =
        '<div class="camada' + (indice === 0 ? ' camada-base' : '') + '" data-indice="' + indice + '" style="--cor-camada:' + camadas[indice].cor + '">' +
        '<div class="camada-rotulo"><b>' + camadas[indice].classe + '</b><small>' + papel + '</small><span class="camada-valor"></span></div>' +
        html +
        '</div>';
    }
    this.container.innerHTML =
      '<div class="dc-diagrama">' +
      '  <div class="dc-cliente">cliente chama <code>pocao.getPoder()</code> ▼</div>' +
      html +
      '</div>';
    const maisExterna: HTMLElement | null = this.container.querySelector('[data-indice="' + (camadas.length - 1) + '"]');
    if (maisExterna !== null && camadas.length > 1) {
      maisExterna.classList.add('camada-nova');
    }
  }

  /**
   * Estado absoluto do diagrama: qual camada está ativa (-1 = nenhuma)
   * e o texto exibido ao lado de cada camada (índice 0 = base).
   */
  public definirEstado(camadaAtiva: number, rotulos: string[]): void {
    for (const camada of Array.from(this.container.querySelectorAll<HTMLElement>('.camada'))) {
      const indice: number = Number(camada.dataset.indice);
      camada.classList.toggle('ativa', indice === camadaAtiva);
      (camada.querySelector(':scope > .camada-rotulo .camada-valor') as HTMLElement).textContent = rotulos[indice] ?? '';
    }
  }
}
