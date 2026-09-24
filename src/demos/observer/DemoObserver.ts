import { DemoPadrao } from '../../app/DemoPadrao';
import type { ConteudoDidatico } from '../../app/ConteudoDidatico';
import type { Passo } from '../../visualizador/Passo';
import { DiagramaObserver, type NoObservador } from './DiagramaObserver';
import { conteudoObserver } from './conteudoObserver';
import { Pet } from '../../padroes/observer/Pet';
import type { EstadoPet, Humor } from '../../padroes/observer/EstadoPet';
import type { Observador } from '../../padroes/observer/Observador';
import { BarraDeStatus } from '../../padroes/observer/observadores/BarraDeStatus';
import { AlertaDeCuidado } from '../../padroes/observer/observadores/AlertaDeCuidado';
import { DiarioDoPet } from '../../padroes/observer/observadores/DiarioDoPet';
import { CelularDoDono } from '../../padroes/observer/observadores/CelularDoDono';

const codigoFonte = import.meta.glob('../../padroes/observer/**/*.ts', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

/** Um observador da demo com o cartão que o representa na tela. */
interface CartaoObservador {
  id: string;
  classe: string;
  titulo: string;
  observador: Observador<EstadoPet>;
  cartao: HTMLElement;
  conteudo: HTMLElement;
  inscrito: boolean;
}

/** "Foto" do que está desenhado na tela, para o reprodutor poder voltar no tempo. */
interface FotoDaTela {
  rosto: string;
  balao: string;
  cartoes: Map<string, FotoDoCartao>;
}

interface FotoDoCartao {
  html: string;
  classes: string;
}

/** Demonstração do Observer com o tema Pet Virtual. */
export class DemoObserver extends DemoPadrao {
  private static readonly INTERVALO_DO_RELOGIO: number = 4000;
  private static readonly ROSTOS: Record<Humor, string> = {
    feliz: '😸', normal: '🐱', triste: '😿', faminto: '🙀', cansado: '😴',
  };

  private readonly pet: Pet = new Pet('Pixel');
  private readonly cartoes: CartaoObservador[] = [];
  /** Espelha a ordem da lista interna do Pet (quem se inscreveu por último é avisado por último). */
  private readonly ordemDeInscricao: CartaoObservador[] = [];
  private diagrama!: DiagramaObserver;
  private sistema!: HTMLElement;
  private relogio: number | null = null;

  protected getArquivosDeCodigo(): Map<string, string> {
    return this.organizarArquivos(codigoFonte, 'observer/', [
      'Sujeito.ts', 'Observador.ts', 'Pet.ts', 'EstadoPet.ts',
      'observadores/BarraDeStatus.ts', 'observadores/AlertaDeCuidado.ts',
      'observadores/DiarioDoPet.ts', 'observadores/CelularDoDono.ts',
    ]);
  }

  protected getConteudo(): ConteudoDidatico {
    return conteudoObserver;
  }

  protected montarDiagrama(container: HTMLElement): void {
    const nos: NoObservador[] = [
      { id: 'barra', classe: 'BarraDeStatus' },
      { id: 'alerta', classe: 'AlertaDeCuidado' },
      { id: 'diario', classe: 'DiarioDoPet' },
      { id: 'celular', classe: 'CelularDoDono' },
    ];
    this.diagrama = new DiagramaObserver(container, nos);
  }

  protected montarSistema(container: HTMLElement): void {
    this.sistema = container;
    container.innerHTML =
      '<div class="ob">' +
      '  <div class="ob-topo">' +
      '    <div class="ob-pet"><div class="ob-rosto"></div><div class="ob-nome">Pixel</div><div class="ob-balao"></div></div>' +
      '    <div class="ob-acoes">' +
      '      <button class="botao-acao" data-acao="alimentar">🍖 Alimentar</button>' +
      '      <button class="botao-acao" data-acao="brincar">🎾 Brincar</button>' +
      '      <button class="botao-acao" data-acao="dormir">😴 Dormir</button>' +
      '      <button class="botao-acao" data-acao="passarTempo">⏩ Passar tempo</button>' +
      '      <label class="interruptor ob-relogio"><input type="checkbox" data-relogio><span></span>⏱ Relógio automático</label>' +
      '      <div class="ob-contador"></div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="passo"><span>👀</span> Observadores (use o interruptor para inscrever/desinscrever)</div>' +
      '  <div class="ob-cartoes">' +
      this.htmlCartao('barra', 'BarraDeStatus', '📊 Barra de status', '<div class="ob-barras"></div>') +
      this.htmlCartao('alerta', 'AlertaDeCuidado', '🚨 Alerta de cuidado', '<div class="ob-alerta"></div>') +
      this.htmlCartao('diario', 'DiarioDoPet', '📔 Diário do pet', '<ul class="ob-diario"></ul>') +
      this.htmlCartao('celular', 'CelularDoDono', '📱 Celular do dono', '<div class="ob-celular"></div>') +
      '  </div>' +
      '</div>';

    this.registrarCartao('barra', 'BarraDeStatus', '📊 Barra de status', this.area('barra', '.ob-barras'));
    this.registrarCartao('alerta', 'AlertaDeCuidado', '🚨 Alerta de cuidado', this.area('alerta', '.ob-alerta'));
    this.registrarCartao('diario', 'DiarioDoPet', '📔 Diário do pet', this.area('diario', '.ob-diario'));
    this.registrarCartao('celular', 'CelularDoDono', '📱 Celular do dono', this.area('celular', '.ob-celular'));

    for (const botao of Array.from(container.querySelectorAll<HTMLButtonElement>('.botao-acao'))) {
      botao.addEventListener('click', () => this.executarAcao(botao.dataset.acao as string, botao.textContent as string));
    }
    (container.querySelector('[data-relogio]') as HTMLInputElement).addEventListener('change', (evento: Event) => {
      this.alternarRelogio((evento.target as HTMLInputElement).checked);
    });

    this.visualizador.separador('Início');
    for (const cartao of this.cartoes) {
      this.pet.inscrever(cartao.observador);
      this.ordemDeInscricao.push(cartao);
      this.visualizador.registrar('pet.inscrever(' + this.nomeDaVariavel(cartao.classe) + ')');
    }
    this.pet.notificar();
    this.atualizarPet();
    this.visualizador.destacarCodigo('Pet.ts', 'private readonly observadores');
    this.visualizador.mostrarDica(
      'Os 4 observadores já se inscreveram. O <code>Pet</code> guarda apenas uma <b>lista de Observador</b>: ele não sabe que um é barra e outro é celular. ' +
      'Clique em uma ação, como <b>🍖 Alimentar</b>.');
  }

  protected aoSair(): void {
    this.alternarRelogio(false);
  }

  /**
   * O método do Pet roda de verdade logo no início (e notifica todos na hora).
   * Guardamos a tela ANTES e DEPOIS para o reprodutor mostrar, passo a passo,
   * cada observador recebendo o aviso, e também para poder voltar.
   */
  private executarAcao(metodo: string, rotulo: string): void {
    this.reprodutor.encerrar();
    const inscritos: CartaoObservador[] = this.cartoesInscritos();
    const antes: FotoDaTela = this.fotografarTela();
    this.chamarMetodoDoPet(metodo);
    const depois: FotoDaTela = this.fotografarTela();

    const passos: Passo[] = [
      {
        registro: 'pet.' + metodo + '()',
        arquivo: 'Pet.ts',
        trecho: 'public ' + metodo + '()',
        dica: 'Primeiro o <code>Pet</code> muda o <b>próprio estado</b>…',
        duracao: 1300,
        aplicar: () => {
          this.restaurarTela(antes, depois, 0, inscritos);
          this.diagrama.pulsarPet();
        },
      },
      {
        registro: 'this.registrarEvento(...) → this.notificar()',
        arquivo: 'Pet.ts',
        trecho: 'private registrarEvento',
        dica: '…e toda mudança termina chamando <code>notificar()</code>.',
        duracao: 1100,
        aplicar: () => this.restaurarTela(antes, depois, 0, inscritos),
      },
      {
        registro: 'for (observador of observadores): ' + inscritos.length + ' inscritos',
        tipo: 'evento',
        arquivo: 'Pet.ts',
        trecho: 'observador.atualizar(estado)',
        dica: 'O <code>for</code> percorre a lista e chama <code>atualizar(estado)</code> em cada inscrito. ' +
          (inscritos.length < this.cartoes.length ? 'Quem foi <b>desinscrito</b> fica de fora.' : 'Cada um reage do seu jeito.'),
        duracao: 1100,
        aplicar: () => this.restaurarTela(antes, depois, 0, inscritos),
      },
    ];

    for (let posicao = 0; posicao < inscritos.length; posicao++) {
      const cartao: CartaoObservador = inscritos[posicao];
      passos.push({
        registro: cartao.classe + '.atualizar(estado)',
        tipo: 'retorno',
        arquivo: 'observadores/' + cartao.classe + '.ts',
        trecho: 'public atualizar',
        duracao: 1000,
        aplicar: () => {
          this.restaurarTela(antes, depois, posicao + 1, inscritos);
          this.diagrama.enviarPara(cartao.id);
          this.piscarCartao(cartao);
        },
      });
    }

    passos.push({
      dica: this.dicaFinal(inscritos.length),
      duracao: 600,
      aplicar: () => this.restaurarTela(antes, depois, inscritos.length, inscritos),
    });

    this.reprodutor.iniciar(rotulo.trim(), passos);
  }

  private fotografarTela(): FotoDaTela {
    const cartoes: Map<string, FotoDoCartao> = new Map();
    for (const cartao of this.cartoes) {
      cartoes.set(cartao.id, { html: cartao.conteudo.innerHTML, classes: cartao.conteudo.className });
    }
    return {
      rosto: (this.sistema.querySelector('.ob-rosto') as HTMLElement).textContent ?? '',
      balao: (this.sistema.querySelector('.ob-balao') as HTMLElement).textContent ?? '',
      cartoes,
    };
  }

  /** Pet já no estado novo; os "quantosAtualizados" primeiros inscritos mostram o DEPOIS, o resto o ANTES. */
  private restaurarTela(antes: FotoDaTela, depois: FotoDaTela, quantosAtualizados: number, inscritos: CartaoObservador[]): void {
    (this.sistema.querySelector('.ob-rosto') as HTMLElement).textContent = depois.rosto;
    (this.sistema.querySelector('.ob-balao') as HTMLElement).textContent = depois.balao;
    for (const cartao of this.cartoes) {
      const posicao: number = inscritos.indexOf(cartao);
      const foto: FotoDoCartao = (posicao !== -1 && posicao < quantosAtualizados ? depois : antes).cartoes.get(cartao.id) as FotoDoCartao;
      cartao.conteudo.innerHTML = foto.html;
      cartao.conteudo.className = foto.classes;
    }
  }

  /** Chama o método real do Pet (que notifica os inscritos) e redesenha o bichinho. */
  private chamarMetodoDoPet(metodo: string): void {
    switch (metodo) {
      case 'alimentar':
        this.pet.alimentar();
        break;
      case 'brincar':
        this.pet.brincar();
        break;
      case 'dormir':
        this.pet.dormir();
        break;
      default:
        this.pet.passarTempo();
    }
    this.atualizarPet();
  }

  private alternarInscricao(cartao: CartaoObservador, inscrever: boolean): void {
    this.reprodutor.encerrar();
    cartao.inscrito = inscrever;
    cartao.cartao.classList.toggle('desinscrito', !inscrever);
    this.diagrama.definirInscrito(cartao.id, inscrever);
    const variavel: string = this.nomeDaVariavel(cartao.classe);
    if (inscrever) {
      this.pet.inscrever(cartao.observador);
      this.ordemDeInscricao.push(cartao);
      this.visualizador.registrar('pet.inscrever(' + variavel + ')', 'evento');
      this.visualizador.destacarCodigo('Pet.ts', 'public inscrever');
      this.visualizador.mostrarDica(
        '<code>' + cartao.classe + '</code> voltou para a lista. A partir do próximo aviso ele recebe de novo. Tudo em <b>tempo de execução</b>.');
    } else {
      this.pet.desinscrever(cartao.observador);
      this.ordemDeInscricao.splice(this.ordemDeInscricao.indexOf(cartao), 1);
      this.visualizador.registrar('pet.desinscrever(' + variavel + ')', 'evento');
      this.visualizador.destacarCodigo('Pet.ts', 'public desinscrever');
      this.visualizador.mostrarDica(
        '<code>' + cartao.classe + '</code> saiu da lista (fio tracejado). Interaja com o pet: ele <b>não recebe mais</b> avisos, e o Pet nem percebe a diferença.');
    }
    this.atualizarContador();
  }

  private alternarRelogio(ligado: boolean): void {
    if (this.relogio !== null) {
      window.clearInterval(this.relogio);
      this.relogio = null;
    }
    if (!ligado) {
      return;
    }
    this.relogio = window.setInterval(() => this.passarTempoAutomatico(), DemoObserver.INTERVALO_DO_RELOGIO);
    this.visualizador.mostrarDica(
      'Relógio ligado: a cada 4s o tempo passa e o Pet <b>avisa sozinho</b>. Os observadores nunca precisam perguntar se algo mudou.');
  }

  /** Versão rápida (sem pausas) para não travar a tela a cada tique do relógio. */
  private passarTempoAutomatico(): void {
    if (this.reprodutor.emAndamento()) {
      return;
    }
    this.reprodutor.encerrar();
    this.pet.passarTempo();
    this.atualizarPet();
    this.visualizador.registrar('⏱ pet.passarTempo() → notificar()', 'evento');
    this.visualizador.destacarCodigo('Pet.ts', 'public passarTempo');
    this.diagrama.pulsarPet();
    for (const cartao of this.cartoesInscritos()) {
      this.diagrama.enviarPara(cartao.id);
      this.piscarCartao(cartao);
    }
  }

  private atualizarPet(): void {
    const estado: EstadoPet = this.pet.getEstado();
    (this.sistema.querySelector('.ob-rosto') as HTMLElement).textContent = DemoObserver.ROSTOS[estado.getHumor()];
    (this.sistema.querySelector('.ob-balao') as HTMLElement).textContent = estado.getEvento() + ' · ' + estado.getHumor();
    this.atualizarContador();
  }

  private atualizarContador(): void {
    (this.sistema.querySelector('.ob-contador') as HTMLElement).innerHTML =
      'Inscritos na lista: <b>' + this.pet.getQuantidadeDeObservadores() + '</b>';
  }

  private dicaFinal(quantidade: number): string {
    if (quantidade === 0) {
      return 'Ninguém está inscrito: o Pet mudou, chamou <code>notificar()</code>, e a lista estava vazia. Nenhum erro, nenhum acoplamento.';
    }
    return 'Uma única chamada de <code>notificar()</code> atualizou ' + quantidade + ' objetos diferentes. ' +
      'Repare no <b>Celular do Dono</b>: recebe todo aviso, mas só manda push quando o humor muda. Agora tente <b>desinscrever</b> alguém.';
  }

  private registrarCartao(id: string, classe: string, titulo: string, conteudo: HTMLElement): void {
    const elemento: HTMLElement = this.sistema.querySelector('[data-cartao="' + id + '"]') as HTMLElement;
    const observador: Observador<EstadoPet> = this.criarObservador(id, conteudo);
    const cartao: CartaoObservador = { id, classe, titulo, observador, cartao: elemento, conteudo, inscrito: true };
    this.cartoes.push(cartao);
    (elemento.querySelector('input') as HTMLInputElement).addEventListener('change', (evento: Event) => {
      this.alternarInscricao(cartao, (evento.target as HTMLInputElement).checked);
    });
  }

  private criarObservador(id: string, conteudo: HTMLElement): Observador<EstadoPet> {
    switch (id) {
      case 'barra':
        return new BarraDeStatus(conteudo);
      case 'alerta':
        return new AlertaDeCuidado(conteudo);
      case 'diario':
        return new DiarioDoPet(conteudo);
      default:
        return new CelularDoDono(conteudo);
    }
  }

  private htmlCartao(id: string, classe: string, titulo: string, conteudo: string): string {
    return '<div class="ob-cartao" data-cartao="' + id + '">' +
      '<header><div><b>' + titulo + '</b><small>' + classe + '</small></div>' +
      '<label class="interruptor" title="Inscrito"><input type="checkbox" checked><span></span></label></header>' +
      conteudo +
      '<div class="ob-fora">desinscrito: não recebe avisos</div>' +
      '</div>';
  }

  private area(id: string, seletor: string): HTMLElement {
    return this.sistema.querySelector('[data-cartao="' + id + '"] ' + seletor) as HTMLElement;
  }

  /** Inscritos na mesma ordem em que o Pet vai notificá-los. */
  private cartoesInscritos(): CartaoObservador[] {
    return this.ordemDeInscricao.slice();
  }

  private piscarCartao(cartao: CartaoObservador): void {
    cartao.cartao.classList.remove('notificado');
    void cartao.cartao.offsetWidth;
    cartao.cartao.classList.add('notificado');
  }

  private nomeDaVariavel(classe: string): string {
    return classe.charAt(0).toLowerCase() + classe.substring(1);
  }
}
