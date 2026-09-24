/**
 * Diagrama ao vivo do Abstract Factory:
 * Cliente → interface → fábricas concretas → produtos criados.
 */
export class DiagramaFabrica {
  private readonly raiz: HTMLElement;

  constructor(container: HTMLElement, linhas: string[]) {
    let fabricas: string = '';
    for (const linha of linhas) {
      fabricas += '<div class="no no-fabrica linha-' + linha.toLowerCase() + '" data-linha="' + linha + '">Fabrica' + linha + '</div>';
    }
    container.innerHTML =
      '<div class="af-diagrama">' +
      '  <div class="no no-cliente" data-no="cliente">Robo<small>cliente</small></div>' +
      '  <div class="seta">▼ conhece apenas</div>' +
      '  <div class="no no-interface" data-no="interface"><small>«interface»</small>FabricaRobo</div>' +
      '  <div class="seta">▼ implementada por</div>' +
      '  <div class="af-fabricas">' + fabricas + '</div>' +
      '  <div class="seta">▼ cria a família</div>' +
      '  <div class="af-produtos">' +
      '    <div class="no no-produto" data-produto="Cabeca"><small>Cabeca</small><span>?</span></div>' +
      '    <div class="no no-produto" data-produto="Tronco"><small>Tronco</small><span>?</span></div>' +
      '    <div class="no no-produto" data-produto="Bracos"><small>Bracos</small><span>?</span></div>' +
      '  </div>' +
      '</div>';
    this.raiz = container.querySelector('.af-diagrama') as HTMLElement;
  }

  public ativarFabrica(linha: string): void {
    for (const no of Array.from(this.raiz.querySelectorAll<HTMLElement>('.no-fabrica'))) {
      no.classList.toggle('ativo', no.dataset.linha === linha);
    }
  }

  public pulsar(no: 'cliente' | 'interface' | 'fabrica'): void {
    const alvo: HTMLElement | null = no === 'fabrica'
      ? this.raiz.querySelector('.no-fabrica.ativo')
      : this.raiz.querySelector('[data-no="' + no + '"]');
    if (alvo !== null) {
      alvo.classList.remove('pulso');
      void alvo.offsetWidth;
      alvo.classList.add('pulso');
    }
  }

  /** Mostra os "quantidade" primeiros produtos da família (na ordem Cabeca, Tronco, Bracos). */
  public definirProdutos(linha: string, quantidade: number): void {
    const nos: HTMLElement[] = Array.from(this.raiz.querySelectorAll<HTMLElement>('.no-produto'));
    for (let indice = 0; indice < nos.length; indice++) {
      const rotulo: HTMLElement = nos[indice].querySelector('span') as HTMLElement;
      if (indice < quantidade) {
        rotulo.textContent = nos[indice].dataset.produto + linha;
        nos[indice].className = 'no no-produto criado linha-' + linha.toLowerCase();
      } else {
        rotulo.textContent = '?';
        nos[indice].className = 'no no-produto';
      }
    }
  }
}
