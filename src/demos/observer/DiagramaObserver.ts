/** Um observador como aparece no diagrama. */
export interface NoObservador {
  id: string;
  classe: string;
}

/**
 * Diagrama ao vivo do Observer: o Pet (sujeito) no topo, ligado por "fios"
 * a cada observador. Fio cheio = inscrito; fio tracejado = desinscrito.
 */
export class DiagramaObserver {
  private readonly svg: SVGSVGElement;

  constructor(container: HTMLElement, observadores: NoObservador[]) {
    const largura: number = 440;
    const passo: number = largura / observadores.length;
    let fios: string = '';
    let nos: string = '';
    for (let indice = 0; indice < observadores.length; indice++) {
      const x: number = passo * indice + passo / 2;
      const id: string = observadores[indice].id;
      fios += '<line class="fio" data-fio="' + id + '" x1="220" y1="62" x2="' + x + '" y2="168"></line>';
      nos +=
        '<g class="no-obs" data-no="' + id + '">' +
        '<rect x="' + (x - 50) + '" y="168" width="100" height="44" rx="10"></rect>' +
        '<text x="' + x + '" y="187">' + observadores[indice].classe + '</text>' +
        '<text class="no-sub" x="' + x + '" y="203">atualizar()</text>' +
        '</g>';
    }
    container.innerHTML =
      '<svg class="ob-diagrama" viewBox="0 0 440 230" role="img" aria-label="Diagrama do padrão Observer">' +
      fios +
      '<g class="no-pet" data-no="pet">' +
      '<rect x="150" y="14" width="140" height="48" rx="12"></rect>' +
      '<text x="220" y="36">Pet</text>' +
      '<text class="no-sub" x="220" y="52">sujeito · notificar()</text>' +
      '</g>' +
      nos +
      '</svg>';
    this.svg = container.querySelector('svg') as SVGSVGElement;
  }

  public definirInscrito(id: string, inscrito: boolean): void {
    this.elemento('[data-fio="' + id + '"]').classList.toggle('desligado', !inscrito);
    this.elemento('[data-no="' + id + '"]').classList.toggle('desligado', !inscrito);
  }

  public pulsarPet(): void {
    this.reiniciarClasse(this.elemento('[data-no="pet"]'), 'pulso');
  }

  public enviarPara(id: string): void {
    this.reiniciarClasse(this.elemento('[data-fio="' + id + '"]'), 'enviando');
    this.reiniciarClasse(this.elemento('[data-no="' + id + '"]'), 'pulso');
  }

  private elemento(seletor: string): Element {
    return this.svg.querySelector(seletor) as Element;
  }

  private reiniciarClasse(elemento: Element, classe: string): void {
    elemento.classList.remove(classe);
    void (elemento as SVGGraphicsElement).getBoundingClientRect();
    elemento.classList.add(classe);
  }
}
