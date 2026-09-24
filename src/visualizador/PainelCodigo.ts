import { RealceSintaxe } from './RealceSintaxe';

/**
 * Mostra o código-fonte REAL dos padrões (importado como texto pelo Vite)
 * e destaca o trecho que está sendo executado.
 */
export class PainelCodigo {
  private readonly arquivos: Map<string, string>;
  private readonly realce: RealceSintaxe = new RealceSintaxe();
  private readonly abas: HTMLElement;
  private readonly corpo: HTMLElement;
  private arquivoAtual: string = '';

  constructor(container: HTMLElement, arquivos: Map<string, string>) {
    this.arquivos = arquivos;
    container.innerHTML = '<div class="codigo-abas"></div><div class="codigo-corpo"></div>';
    this.abas = container.querySelector('.codigo-abas') as HTMLElement;
    this.corpo = container.querySelector('.codigo-corpo') as HTMLElement;
    this.criarAbas();
    const primeiro: string | undefined = this.arquivos.keys().next().value;
    if (primeiro !== undefined) {
      this.abrir(primeiro);
    }
  }

  public abrir(nomeArquivo: string): void {
    const codigo: string | undefined = this.arquivos.get(nomeArquivo);
    if (codigo === undefined) {
      return;
    }
    this.arquivoAtual = nomeArquivo;
    const linhas: string[] = this.realce.realcarArquivo(codigo.trimEnd());
    let html: string = '';
    for (let indice = 0; indice < linhas.length; indice++) {
      html += '<div class="linha" data-n="' + (indice + 1) + '">' + linhas[indice] + '</div>';
    }
    this.corpo.innerHTML = html;
    this.corpo.scrollTop = 0;
    for (const aba of Array.from(this.abas.children)) {
      const ativa: boolean = (aba as HTMLElement).dataset.arquivo === nomeArquivo;
      aba.classList.toggle('ativa', ativa);
      if (ativa) {
        this.rolarAbaParaVisivel(aba as HTMLElement);
      }
    }
  }

  /**
   * Abre o arquivo e destaca a primeira linha que contém o trecho.
   * Se a linha abre um bloco "{", destaca o bloco inteiro (ex.: o método todo).
   */
  public destacar(nomeArquivo: string, trecho: string): void {
    if (nomeArquivo !== this.arquivoAtual) {
      this.abrir(nomeArquivo);
    }
    const codigo: string = this.arquivos.get(nomeArquivo) ?? '';
    const linhas: string[] = codigo.split('\n');
    let inicio: number = -1;
    for (let indice = 0; indice < linhas.length; indice++) {
      if (linhas[indice].includes(trecho)) {
        inicio = indice;
        break;
      }
    }
    this.limparDestaque();
    if (inicio === -1) {
      return;
    }

    let fim: number = inicio;
    if (linhas[inicio].trimEnd().endsWith('{')) {
      const recuo: string = linhas[inicio].substring(0, linhas[inicio].length - linhas[inicio].trimStart().length);
      for (let indice = inicio + 1; indice < linhas.length; indice++) {
        if (linhas[indice].startsWith(recuo + '}')) {
          fim = indice;
          break;
        }
      }
    }

    const elementos: HTMLCollection = this.corpo.children;
    for (let indice = inicio; indice <= fim; indice++) {
      elementos[indice].classList.add('destaque');
    }
    elementos[inicio].classList.add('destaque-inicio');
    const alvo: HTMLElement = elementos[inicio] as HTMLElement;
    this.corpo.scrollTo({ top: alvo.offsetTop - this.corpo.clientHeight / 3, behavior: 'smooth' });
  }

  public limparDestaque(): void {
    for (const linha of Array.from(this.corpo.querySelectorAll('.destaque'))) {
      linha.classList.remove('destaque', 'destaque-inicio');
    }
  }

  /** Rola só a barra de abas (e não a página) até a aba ativa aparecer. */
  private rolarAbaParaVisivel(aba: HTMLElement): void {
    const inicio: number = aba.offsetLeft - this.abas.offsetLeft;
    const fim: number = inicio + aba.offsetWidth;
    if (inicio < this.abas.scrollLeft || fim > this.abas.scrollLeft + this.abas.clientWidth) {
      this.abas.scrollTo({ left: inicio - 8, behavior: 'smooth' });
    }
  }

  private criarAbas(): void {
    for (const nome of this.arquivos.keys()) {
      const aba: HTMLButtonElement = document.createElement('button');
      aba.className = 'codigo-aba';
      aba.dataset.arquivo = nome;
      aba.textContent = nome;
      aba.addEventListener('click', () => this.abrir(nome));
      this.abas.appendChild(aba);
    }
  }
}
