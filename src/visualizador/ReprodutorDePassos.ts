import type { Passo } from './Passo';
import type { PainelCodigo } from './PainelCodigo';
import type { LogDeChamadas, EntradaDeLog } from './LogDeChamadas';
import type { CaixaDeDica } from './CaixaDeDica';

/**
 * Controle estilo depurador: voltar, play/pausa, avançar e velocidade.
 * Cada ação da demo entrega uma lista de Passos; o reprodutor decide
 * quando e em que ordem aplicá-los.
 */
export class ReprodutorDePassos {
  private static readonly CHAVE_VELOCIDADE: string = 'exame-padroes:velocidade';
  private static readonly DURACAO_PADRAO: number = 1200;

  private readonly painelCodigo: PainelCodigo;
  private readonly log: LogDeChamadas;
  private readonly dica: CaixaDeDica;
  private readonly botaoVoltar: HTMLButtonElement;
  private readonly botaoPlay: HTMLButtonElement;
  private readonly botaoAvancar: HTMLButtonElement;
  private readonly seletorVelocidade: HTMLInputElement;
  private readonly rotuloVelocidade: HTMLElement;
  private readonly titulo: HTMLElement;
  private readonly contador: HTMLElement;
  private readonly progresso: HTMLElement;
  private readonly aoTeclar: (evento: KeyboardEvent) => void;

  private passos: Passo[] = [];
  private tituloDaSequencia: string = '';
  private indice: number = -1;
  private tocando: boolean = true;
  private velocidade: number = 1;
  private temporizador: number | null = null;

  constructor(container: HTMLElement, painelCodigo: PainelCodigo, log: LogDeChamadas, dica: CaixaDeDica) {
    this.painelCodigo = painelCodigo;
    this.log = log;
    this.dica = dica;
    container.innerHTML =
      '<div class="rep-botoes">' +
      '  <button class="rep-botao" data-rep="voltar" title="Passo anterior (←)">⏮</button>' +
      '  <button class="rep-botao rep-play" data-rep="play" title="Play / pausa (espaço)">⏸</button>' +
      '  <button class="rep-botao" data-rep="avancar" title="Próximo passo (→)">⏭</button>' +
      '</div>' +
      '<div class="rep-info"><div class="rep-linha"><span class="rep-titulo"></span><span class="rep-contador"></span></div>' +
      '  <div class="rep-trilho"><div class="rep-progresso"></div></div></div>' +
      '<label class="rep-velocidade" title="Velocidade da reprodução">🐢' +
      '  <input type="range" min="0.25" max="3" step="0.25">🐇<b></b></label>';
    this.botaoVoltar = container.querySelector('[data-rep="voltar"]') as HTMLButtonElement;
    this.botaoPlay = container.querySelector('[data-rep="play"]') as HTMLButtonElement;
    this.botaoAvancar = container.querySelector('[data-rep="avancar"]') as HTMLButtonElement;
    this.seletorVelocidade = container.querySelector('input') as HTMLInputElement;
    this.rotuloVelocidade = container.querySelector('.rep-velocidade b') as HTMLElement;
    this.titulo = container.querySelector('.rep-titulo') as HTMLElement;
    this.contador = container.querySelector('.rep-contador') as HTMLElement;
    this.progresso = container.querySelector('.rep-progresso') as HTMLElement;

    this.botaoVoltar.addEventListener('click', () => this.voltar());
    this.botaoPlay.addEventListener('click', () => this.alternarPlay());
    this.botaoAvancar.addEventListener('click', () => this.avancar());
    this.seletorVelocidade.addEventListener('input', () => this.definirVelocidade(Number(this.seletorVelocidade.value)));
    this.aoTeclar = (evento: KeyboardEvent) => this.tratarTecla(evento);
    document.addEventListener('keydown', this.aoTeclar);

    this.definirVelocidade(this.lerVelocidadeSalva());
    this.atualizarControles();
  }

  /** Começa uma nova sequência. A anterior é concluída e fica registrada no log. */
  public iniciar(titulo: string, passos: Passo[]): void {
    this.encerrar();
    if (passos.length === 0) {
      return;
    }
    this.log.separador(titulo);
    this.tituloDaSequencia = titulo;
    this.passos = passos;
    this.irPara(0);
    this.agendarProximo();
  }

  /** Leva a sequência atual até o fim e a descarta (não dá mais para voltar nela). */
  public encerrar(): void {
    this.pararTemporizador();
    if (this.passos.length > 0 && this.indice < this.passos.length - 1) {
      this.irPara(this.passos.length - 1);
    }
    this.log.confirmarProvisorias();
    this.passos = [];
    this.indice = -1;
    this.atualizarControles();
  }

  /** Verdadeiro enquanto há uma sequência que ainda não chegou ao último passo. */
  public emAndamento(): boolean {
    return this.passos.length > 0 && this.indice < this.passos.length - 1;
  }

  public avancar(): void {
    if (this.indice < this.passos.length - 1) {
      this.irPara(this.indice + 1);
      this.agendarProximo();
    }
  }

  public voltar(): void {
    if (this.indice > 0) {
      this.irPara(this.indice - 1);
      this.agendarProximo();
    }
  }

  public alternarPlay(): void {
    if (this.passos.length > 0 && this.indice === this.passos.length - 1) {
      this.tocando = true;
      this.irPara(0);
    } else {
      this.tocando = !this.tocando;
    }
    this.agendarProximo();
    this.atualizarControles();
  }

  public destruir(): void {
    this.pararTemporizador();
    document.removeEventListener('keydown', this.aoTeclar);
  }

  private irPara(indice: number): void {
    this.indice = indice;
    const passo: Passo = this.passos[indice];
    if (passo.aplicar !== undefined) {
      passo.aplicar();
    }

    const entradas: EntradaDeLog[] = [];
    let arquivo: string | undefined;
    let trecho: string = '';
    let dica: string | undefined;
    for (let posicao = 0; posicao <= indice; posicao++) {
      const atual: Passo = this.passos[posicao];
      if (atual.registro !== undefined) {
        entradas.push({ texto: atual.registro, tipo: atual.tipo ?? 'chamada' });
      }
      if (atual.arquivo !== undefined) {
        arquivo = atual.arquivo;
        trecho = atual.trecho ?? '';
      }
      if (atual.dica !== undefined) {
        dica = atual.dica;
      }
    }
    this.log.definirProvisorias(entradas);
    if (arquivo !== undefined) {
      this.painelCodigo.destacar(arquivo, trecho);
    }
    if (dica !== undefined) {
      this.dica.mostrar(dica);
    }
    this.atualizarControles();
  }

  private agendarProximo(): void {
    this.pararTemporizador();
    if (!this.tocando || this.indice >= this.passos.length - 1) {
      this.atualizarControles();
      return;
    }
    const duracao: number = this.passos[this.indice].duracao ?? ReprodutorDePassos.DURACAO_PADRAO;
    this.temporizador = window.setTimeout(() => {
      this.irPara(this.indice + 1);
      this.agendarProximo();
    }, duracao / this.velocidade);
  }

  private pararTemporizador(): void {
    if (this.temporizador !== null) {
      window.clearTimeout(this.temporizador);
      this.temporizador = null;
    }
  }

  private definirVelocidade(velocidade: number): void {
    this.velocidade = velocidade;
    this.seletorVelocidade.value = String(velocidade);
    this.rotuloVelocidade.textContent = velocidade.toLocaleString('pt-BR') + 'x';
    try {
      localStorage.setItem(ReprodutorDePassos.CHAVE_VELOCIDADE, String(velocidade));
    } catch {
      // sem armazenamento: a velocidade só vale nesta visita
    }
    if (this.temporizador !== null) {
      this.agendarProximo();
    }
  }

  private lerVelocidadeSalva(): number {
    try {
      const salva: number = Number(localStorage.getItem(ReprodutorDePassos.CHAVE_VELOCIDADE));
      return salva >= 0.25 && salva <= 3 ? salva : 1;
    } catch {
      return 1;
    }
  }

  private atualizarControles(): void {
    const total: number = this.passos.length;
    const noFim: boolean = total > 0 && this.indice === total - 1;
    this.botaoVoltar.disabled = this.indice <= 0;
    this.botaoAvancar.disabled = total === 0 || noFim;
    this.botaoPlay.textContent = noFim ? '↺' : (this.tocando ? '⏸' : '▶');
    this.botaoPlay.title = noFim ? 'Repetir do início (espaço)' : 'Play / pausa (espaço)';
    this.botaoPlay.classList.toggle('pausado', !this.tocando);

    if (total === 0) {
      this.titulo.textContent = this.tocando
        ? 'Modo automático · faça uma ação no sistema'
        : 'Modo passo a passo · a próxima ação começa pausada';
      this.contador.textContent = '';
      this.progresso.style.setProperty('--progresso', '0%');
      return;
    }
    this.titulo.textContent = this.tituloDaSequencia;
    this.contador.textContent = 'passo ' + (this.indice + 1) + '/' + total;
    this.progresso.style.setProperty('--progresso', ((this.indice + 1) / total * 100) + '%');
  }

  private tratarTecla(evento: KeyboardEvent): void {
    const alvo: HTMLElement = evento.target as HTMLElement;
    if (alvo.tagName === 'INPUT' || document.querySelector('.modal-fundo.aberto') !== null) {
      return;
    }
    if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      this.avancar();
    } else if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      this.voltar();
    } else if (evento.key === ' ') {
      evento.preventDefault();
      this.alternarPlay();
    }
  }
}
