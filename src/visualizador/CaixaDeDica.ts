/**
 * Balão de dica contextual: muda conforme o usuário interage,
 * lembrando o apresentador do que falar naquele momento.
 */
export class CaixaDeDica {
  private readonly elemento: HTMLElement;
  private textoAtual: string = '';

  constructor(elemento: HTMLElement) {
    this.elemento = elemento;
  }

  public mostrar(texto: string): void {
    if (texto === this.textoAtual) {
      return;
    }
    this.textoAtual = texto;
    this.elemento.innerHTML = '<span class="dica-icone">💡</span><div>' + texto + '</div>';
    this.elemento.classList.remove('dica-nova');
    void this.elemento.offsetWidth;
    this.elemento.classList.add('dica-nova');
  }
}
