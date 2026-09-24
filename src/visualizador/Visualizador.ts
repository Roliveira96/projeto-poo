import { PainelCodigo } from './PainelCodigo';
import { LogDeChamadas, type TipoDeRegistro } from './LogDeChamadas';
import { CaixaDeDica } from './CaixaDeDica';
import { ReprodutorDePassos } from './ReprodutorDePassos';

/**
 * Painel direito ("Por baixo dos panos"): dica, diagrama ao vivo, log e código.
 * Os controles de reprodução ficam no cabeçalho da demo, mas também são criados aqui.
 * As demos conversam só com esta classe, sem conhecer as partes internas.
 */
export class Visualizador {
  private readonly areaDiagrama: HTMLElement;
  private readonly painelCodigo: PainelCodigo;
  private readonly log: LogDeChamadas;
  private readonly dica: CaixaDeDica;
  private readonly reprodutor: ReprodutorDePassos;

  constructor(container: HTMLElement, areaDosControles: HTMLElement, arquivos: Map<string, string>) {
    container.innerHTML =
      '<div class="dica"></div>' +
      '<section class="ao-vivo">' +
      '  <div class="rotulo-secao">Ao vivo</div>' +
      '  <div class="diagrama"></div>' +
      '  <div class="log"></div>' +
      '</section>' +
      '<section class="codigo">' +
      '  <div class="rotulo-secao">Código-fonte real</div>' +
      '  <div class="codigo-painel"></div>' +
      '</section>';
    this.areaDiagrama = container.querySelector('.diagrama') as HTMLElement;
    this.log = new LogDeChamadas(container.querySelector('.log') as HTMLElement);
    this.dica = new CaixaDeDica(container.querySelector('.dica') as HTMLElement);
    this.painelCodigo = new PainelCodigo(container.querySelector('.codigo-painel') as HTMLElement, arquivos);
    this.reprodutor = new ReprodutorDePassos(areaDosControles, this.painelCodigo, this.log, this.dica);
  }

  public getAreaDiagrama(): HTMLElement {
    return this.areaDiagrama;
  }

  public getReprodutor(): ReprodutorDePassos {
    return this.reprodutor;
  }

  public mostrarDica(texto: string): void {
    this.dica.mostrar(texto);
  }

  public registrar(texto: string, tipo: TipoDeRegistro = 'chamada'): void {
    this.log.registrar(texto, tipo);
  }

  public separador(titulo: string): void {
    this.log.separador(titulo);
  }

  public destacarCodigo(arquivo: string, trecho: string): void {
    this.painelCodigo.destacar(arquivo, trecho);
  }

  public destruir(): void {
    this.reprodutor.destruir();
  }
}
