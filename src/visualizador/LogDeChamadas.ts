export type TipoDeRegistro = 'chamada' | 'retorno' | 'evento' | 'info';

/** Uma linha do log. */
export interface EntradaDeLog {
  texto: string;
  tipo: TipoDeRegistro;
}

/**
 * Lista cronológica do que o código executou, exibida ao lado do diagrama.
 * Entradas "provisórias" pertencem à sequência que está sendo reproduzida:
 * elas somem ou reaparecem conforme o usuário volta ou avança os passos.
 */
export class LogDeChamadas {
  private readonly lista: HTMLElement;
  private readonly limite: number = 60;

  constructor(container: HTMLElement) {
    container.innerHTML = '<div class="log-titulo">Log de execução</div><ol class="log-lista"></ol>';
    this.lista = container.querySelector('.log-lista') as HTMLElement;
  }

  public registrar(texto: string, tipo: TipoDeRegistro = 'chamada'): void {
    this.lista.appendChild(this.criarItem(texto, tipo, false));
    this.aplicarLimite();
    this.rolarParaOFim();
  }

  public separador(titulo: string): void {
    this.registrar('── ' + titulo + ' ──', 'info');
  }

  /**
   * Mostra exatamente estas entradas provisórias. Como os passos só crescem
   * ou encolhem pelo fim, basta remover as sobrando ou acrescentar as que faltam.
   */
  public definirProvisorias(entradas: EntradaDeLog[]): void {
    const atuais: Element[] = Array.from(this.lista.querySelectorAll('.provisoria'));
    for (let indice = atuais.length - 1; indice >= entradas.length; indice--) {
      atuais[indice].remove();
    }
    for (let indice = atuais.length; indice < entradas.length; indice++) {
      this.lista.appendChild(this.criarItem(entradas[indice].texto, entradas[indice].tipo, true));
    }
    this.rolarParaOFim();
  }

  public confirmarProvisorias(): void {
    for (const item of Array.from(this.lista.querySelectorAll('.provisoria'))) {
      item.classList.remove('provisoria');
    }
    this.aplicarLimite();
  }

  private criarItem(texto: string, tipo: TipoDeRegistro, provisoria: boolean): HTMLLIElement {
    const item: HTMLLIElement = document.createElement('li');
    item.className = 'log-' + tipo + (provisoria ? ' provisoria' : '');
    item.textContent = texto;
    return item;
  }

  private aplicarLimite(): void {
    while (this.lista.children.length > this.limite && !this.lista.children[0].classList.contains('provisoria')) {
      this.lista.removeChild(this.lista.children[0]);
    }
  }

  private rolarParaOFim(): void {
    this.lista.scrollTop = this.lista.scrollHeight;
  }
}
