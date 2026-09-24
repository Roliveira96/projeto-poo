import type { Tela } from './Tela';
import type { InfoDemo } from './InfoDemo';
import type { ConteudoDidatico } from './ConteudoDidatico';
import { JanelaModal } from './JanelaModal';
import { Visualizador } from '../visualizador/Visualizador';
import { MaterialDeApoio } from './materiais/MaterialDeApoio';
import type { ReprodutorDePassos } from '../visualizador/ReprodutorDePassos';

/**
 * Esqueleto comum das três demonstrações (Template Method):
 * monta o cabeçalho e a tela dividida, e deixa cada demo preencher
 * o lado do SISTEMA, o DIAGRAMA e o CONTEÚDO didático.
 */
export abstract class DemoPadrao implements Tela {
  protected readonly info: InfoDemo;
  protected visualizador!: Visualizador;
  protected reprodutor!: ReprodutorDePassos;
  private modal: JanelaModal | null = null;

  constructor(info: InfoDemo) {
    this.info = info;
  }

  public montar(raiz: HTMLElement): void {
    raiz.innerHTML =
      '<div class="demo demo-' + this.info.id + '">' +
      '  <header class="demo-cabecalho">' +
      '    <a class="botao-voltar" href="#/">← Menu</a>' +
      '    <div class="demo-titulo"><span class="demo-icone">' + this.info.icone + '</span>' +
      '      <div><h1>' + this.info.padrao + '</h1><p>' + this.info.categoria + ' · ' + this.info.tema + '</p></div></div>' +
      '    <div class="reprodutor" aria-label="Controles de reprodução"></div>' +
      '    <nav class="demo-acoes">' +
      '      <button class="botao-secundario" data-acao="conceito">📖 Conceito</button>' +
      '      <button class="botao-secundario" data-acao="materiais">📚 Materiais</button>' +
      '    </nav>' +
      '  </header>' +
      '  <main class="demo-divisao">' +
      '    <section class="lado-sistema"><div class="rotulo-lado">🖥️ Sistema</div><div class="sistema"></div></section>' +
      '    <aside class="lado-visualizador"><div class="rotulo-lado">🔍 Por baixo dos panos</div><div class="visualizador"></div></aside>' +
      '  </main>' +
      '</div>';

    this.modal = new JanelaModal();
    this.visualizador = new Visualizador(
      raiz.querySelector('.visualizador') as HTMLElement,
      raiz.querySelector('.reprodutor') as HTMLElement,
      this.getArquivosDeCodigo());
    this.reprodutor = this.visualizador.getReprodutor();
    this.montarDiagrama(this.visualizador.getAreaDiagrama());
    this.montarSistema(raiz.querySelector('.sistema') as HTMLElement);

    (raiz.querySelector('[data-acao="conceito"]') as HTMLElement).addEventListener('click', () => this.abrirConceito());
    (raiz.querySelector('[data-acao="materiais"]') as HTMLElement).addEventListener('click', () => this.abrirMateriais());
  }

  public desmontar(): void {
    this.aoSair();
    this.visualizador.destruir();
    if (this.modal !== null) {
      this.modal.destruir();
    }
  }

  protected abstract montarSistema(container: HTMLElement): void;
  protected abstract montarDiagrama(container: HTMLElement): void;
  protected abstract getArquivosDeCodigo(): Map<string, string>;
  protected abstract getConteudo(): ConteudoDidatico;

  /** Gancho opcional: demos com timers sobrescrevem para limpá-los. */
  protected aoSair(): void {
    // nada por padrão
  }

  /** Converte o resultado do import.meta.glob em "nome curto → código", na ordem pedida. */
  protected organizarArquivos(brutos: Record<string, string>, pastaBase: string, ordem: string[]): Map<string, string> {
    const porNome: Map<string, string> = new Map();
    for (const caminho of Object.keys(brutos)) {
      const nome: string = caminho.substring(caminho.indexOf(pastaBase) + pastaBase.length);
      porNome.set(nome, brutos[caminho]);
    }
    const ordenados: Map<string, string> = new Map();
    for (const nome of ordem) {
      const codigo: string | undefined = porNome.get(nome);
      if (codigo !== undefined) {
        ordenados.set(nome, codigo);
      }
    }
    return ordenados;
  }

  private abrirConceito(): void {
    const conteudo: ConteudoDidatico = this.getConteudo();
    let participantes: string = '';
    for (const participante of conteudo.participantes) {
      participantes += '<tr><td><b>' + participante.papel + '</b></td><td><code>' + participante.classes +
        '</code></td><td>' + participante.descricao + '</td></tr>';
    }
    let perguntas: string = '';
    for (const item of conteudo.perguntas) {
      perguntas += '<details><summary>' + item.pergunta + '</summary><p>' + item.resposta + '</p></details>';
    }
    this.modal?.abrir(this.info.icone + ' ' + this.info.padrao + ': conceito',
      '<h3>🎯 Objetivo</h3><p>' + conteudo.objetivo + '</p>' +
      '<h3>🧩 Problema que resolve</h3><p>' + conteudo.problema + '</p>' +
      '<h3>🧠 Analogia</h3><p>' + conteudo.analogia + '</p>' +
      '<h3>👥 Participantes neste projeto</h3><table class="tabela">' + participantes + '</table>' +
      '<div class="so-com-dicas"><h3>🙋 Perguntas que o professor pode fazer</h3>' + perguntas + '</div>');
  }

  private abrirMateriais(): void {
    const conteudo: ConteudoDidatico = this.getConteudo();
    let origem: string = '';
    for (const paragrafo of conteudo.origem) {
      origem += '<p>' + paragrafo + '</p>';
    }
    let aprofundamento: string = '';
    for (const paragrafo of conteudo.aprofundamento) {
      aprofundamento += '<p>' + paragrafo + '</p>';
    }
    const especifico: string =
      '<h3>🧬 Origem do ' + this.info.padrao + '</h3>' + origem +
      '<h3>🔬 Aprofundamento</h3>' + aprofundamento;
    this.modal?.abrir('📚 Materiais: ' + this.info.padrao, new MaterialDeApoio().gerarHtml(especifico));
  }
}
