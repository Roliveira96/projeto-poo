import { DemoPadrao } from '../../app/DemoPadrao';
import type { ConteudoDidatico } from '../../app/ConteudoDidatico';
import type { Passo } from '../../visualizador/Passo';
import { DiagramaDecorator, type CamadaVisual } from './DiagramaDecorator';
import { conteudoDecorator } from './conteudoDecorator';
import type { Pocao } from '../../padroes/decorator/Pocao';
import { PocaoBase } from '../../padroes/decorator/PocaoBase';
import { OlhoDeDragao } from '../../padroes/decorator/ingredientes/OlhoDeDragao';
import { PoDeFada } from '../../padroes/decorator/ingredientes/PoDeFada';
import { RaizSombria } from '../../padroes/decorator/ingredientes/RaizSombria';
import { LagrimaDeUnicornio } from '../../padroes/decorator/ingredientes/LagrimaDeUnicornio';

const codigoFonte = import.meta.glob('../../padroes/decorator/**/*.ts', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

/** Demonstração do Decorator com o tema Laboratório de Poções. */
export class DemoDecorator extends DemoPadrao {
  private static readonly LIMITE_DE_CAMADAS: number = 7;

  /** Cada versão da poção, da base (índice 0) até a mais decorada. */
  private historico: Pocao[] = [];
  private nomesDasClasses: string[] = [];
  private diagrama!: DiagramaDecorator;
  private sistema!: HTMLElement;

  protected getArquivosDeCodigo(): Map<string, string> {
    return this.organizarArquivos(codigoFonte, 'decorator/', [
      'Pocao.ts', 'PocaoBase.ts', 'IngredienteDecorator.ts',
      'ingredientes/OlhoDeDragao.ts', 'ingredientes/PoDeFada.ts',
      'ingredientes/RaizSombria.ts', 'ingredientes/LagrimaDeUnicornio.ts',
    ]);
  }

  protected getConteudo(): ConteudoDidatico {
    return conteudoDecorator;
  }

  protected montarDiagrama(container: HTMLElement): void {
    this.diagrama = new DiagramaDecorator(container);
  }

  protected montarSistema(container: HTMLElement): void {
    this.sistema = container;
    container.innerHTML =
      '<div class="dc">' +
      '  <div class="dc-palco">' +
      '    <div class="caldeirao"><div class="caldeirao-boca"></div><div class="caldeirao-corpo"><div class="liquido"><i></i><i></i><i></i></div></div><div class="caldeirao-fogo">🔥🔥🔥</div></div>' +
      '    <div class="dc-ficha"></div>' +
      '  </div>' +
      '  <div class="passo"><span>1</span> Adicione ingredientes (cada um é um decorator)</div>' +
      '  <div class="dc-ingredientes">' +
      '    <button class="botao-ingrediente" data-ingrediente="OlhoDeDragao"><span>🐉</span><b>Olho de Dragão</b><small>+30 poder · +R$12</small></button>' +
      '    <button class="botao-ingrediente" data-ingrediente="PoDeFada"><span>🧚</span><b>Pó de Fada</b><small>×2 poder · +R$15</small></button>' +
      '    <button class="botao-ingrediente" data-ingrediente="RaizSombria"><span>🌑</span><b>Raiz Sombria</b><small>+15 poder · +R$8</small></button>' +
      '    <button class="botao-ingrediente" data-ingrediente="LagrimaDeUnicornio"><span>🦄</span><b>Lágrima de Unicórnio</b><small>+5 poder · +R$20</small></button>' +
      '  </div>' +
      '  <div class="passo"><span>2</span> Veja a chamada atravessar as camadas</div>' +
      '  <div class="dc-botoes">' +
      '    <button class="botao-primario" data-acao="calcular">⚗️ Calcular poder</button>' +
      '    <button class="botao-secundario" data-acao="remover">↩ Remover último</button>' +
      '    <button class="botao-secundario" data-acao="nova">🗑 Nova poção</button>' +
      '  </div>' +
      '</div>';

    for (const botao of Array.from(container.querySelectorAll<HTMLButtonElement>('.botao-ingrediente'))) {
      botao.addEventListener('click', () => this.adicionarIngrediente(botao.dataset.ingrediente as string));
    }
    this.botao('calcular').addEventListener('click', () => this.calcularPoder());
    this.botao('remover').addEventListener('click', () => this.removerUltimo());
    this.botao('nova').addEventListener('click', () => this.novaPocao());

    this.novaPocao();
    this.visualizador.mostrarDica(
      'Temos só a <code>PocaoBase</code>, o objeto original. Adicione um ingrediente e veja-o <b>envolver</b> a poção.');
  }

  private novaPocao(): void {
    this.reprodutor.encerrar();
    this.historico = [new PocaoBase()];
    this.nomesDasClasses = ['PocaoBase'];
    this.visualizador.separador('Nova poção');
    this.visualizador.registrar('let pocao: Pocao = new PocaoBase()');
    this.visualizador.destacarCodigo('PocaoBase.ts', 'export class');
    this.atualizarTela();
  }

  private adicionarIngrediente(nomeDaClasse: string): void {
    this.reprodutor.encerrar();
    if (this.historico.length >= DemoDecorator.LIMITE_DE_CAMADAS) {
      this.visualizador.mostrarDica('O caldeirão está cheio! Remova um ingrediente ou comece uma nova poção.');
      return;
    }
    const decorada: Pocao = this.criarIngrediente(nomeDaClasse, this.pocaoAtual());
    this.historico.push(decorada);
    this.nomesDasClasses.push(nomeDaClasse);

    this.visualizador.registrar('pocao = new ' + nomeDaClasse + '(pocao)');
    this.visualizador.destacarCodigo('ingredientes/' + nomeDaClasse + '.ts', 'export class');
    this.atualizarTela();
    this.mostrarDicaAoAdicionar(nomeDaClasse);
  }

  /** Aqui acontece o "envelopamento": o ingrediente recebe a poção atual no construtor. */
  private criarIngrediente(nomeDaClasse: string, pocao: Pocao): Pocao {
    switch (nomeDaClasse) {
      case 'OlhoDeDragao':
        return new OlhoDeDragao(pocao);
      case 'PoDeFada':
        return new PoDeFada(pocao);
      case 'RaizSombria':
        return new RaizSombria(pocao);
      default:
        return new LagrimaDeUnicornio(pocao);
    }
  }

  private removerUltimo(): void {
    this.reprodutor.encerrar();
    if (this.historico.length <= 1) {
      this.visualizador.mostrarDica('Só resta a <code>PocaoBase</code>: não há camada para remover.');
      return;
    }
    const removida: string = this.nomesDasClasses[this.nomesDasClasses.length - 1];
    this.historico.pop();
    this.nomesDasClasses.pop();
    this.visualizador.registrar('pocao = versão anterior (sem ' + removida + ')', 'info');
    this.atualizarTela();
    this.visualizador.mostrarDica(
      'Removemos a camada mais externa. Observação honesta: o decorator não sabe "se desembrulhar"; ' +
      'a demo guarda as versões anteriores. Remover uma camada do <b>meio</b> é uma limitação conhecida do padrão.');
  }

  private calcularPoder(): void {
    this.reprodutor.encerrar();
    const ultima: number = this.historico.length - 1;
    const operacoes: string[] = this.calcularOperacoes();
    const passos: Passo[] = [];

    for (let indice = ultima; indice >= 1; indice--) {
      passos.push({
        registro: this.nomesDasClasses[indice] + '.getPoder() → this.pocao.getPoder()',
        arquivo: 'ingredientes/' + this.nomesDasClasses[indice] + '.ts',
        trecho: 'public getPoder',
        dica: 'A chamada <b>entra</b> pela camada de fora: <code>' + this.nomesDasClasses[indice] +
          '</code> ainda não sabe o valor e repassa para a <code>pocao</code> de dentro…',
        duracao: 1100,
        aplicar: () => this.diagrama.definirEstado(indice, this.rotulosDaEtapa(operacoes, indice, -1)),
      });
    }

    passos.push({
      registro: 'PocaoBase.getPoder() → ' + this.historico[0].getPoder(),
      tipo: 'retorno',
      arquivo: 'PocaoBase.ts',
      trecho: 'public getPoder',
      dica: '…até chegar ao miolo, a <code>PocaoBase</code>, que responde de verdade. Agora os valores <b>voltam</b> camada por camada.',
      duracao: 1400,
      aplicar: () => this.diagrama.definirEstado(0, this.rotulosDaEtapa(operacoes, 0, 0)),
    });

    for (let indice = 1; indice <= ultima; indice++) {
      passos.push({
        registro: this.nomesDasClasses[indice] + ' devolve ' + operacoes[indice],
        tipo: 'retorno',
        arquivo: 'ingredientes/' + this.nomesDasClasses[indice] + '.ts',
        trecho: 'public getPoder',
        dica: '<code>' + this.nomesDasClasses[indice] + '</code> recebe o valor de dentro e aplica a <b>sua</b> regra: ' + operacoes[indice] + '.',
        duracao: 1100,
        aplicar: () => this.diagrama.definirEstado(indice, this.rotulosDaEtapa(operacoes, 0, indice)),
      });
    }

    passos.push({
      dica: 'Poder final: <b>' + this.pocaoAtual().getPoder() + '</b>. O cliente fez UMA chamada em uma <code>Pocao</code> e não sabe quantas camadas existem. ' +
        (this.nomesDasClasses.indexOf('PoDeFada') !== -1
          ? 'Como há <b>Pó de Fada</b>, teste inverter a ordem: o resultado muda!'
          : 'Adicione um <b>Pó de Fada</b> para mostrar que a ordem importa.'),
      duracao: 600,
      aplicar: () => this.diagrama.definirEstado(-1, this.rotulosDaEtapa(operacoes, 0, ultima)),
    });

    this.reprodutor.iniciar('pocao.getPoder()', passos);
  }

  /** Texto que cada camada mostra ao devolver o valor, ex.: "↑ 40 × 2 = 80". */
  private calcularOperacoes(): string[] {
    const operacoes: string[] = ['= ' + this.historico[0].getPoder()];
    for (let indice = 1; indice < this.historico.length; indice++) {
      const anterior: number = this.historico[indice - 1].getPoder();
      const atual: number = this.historico[indice].getPoder();
      const conta: string = atual === anterior * 2 && anterior !== 0
        ? anterior + ' × 2'
        : anterior + ' + ' + (atual - anterior);
      operacoes.push('↑ ' + conta + ' = ' + atual);
    }
    return operacoes;
  }

  /**
   * Rótulos de cada camada num instante da chamada:
   * camadas até "voltouAte" já devolveram valor; as de "entrouAte" para fora estão repassando.
   */
  private rotulosDaEtapa(operacoes: string[], entrouAte: number, voltouAte: number): string[] {
    const rotulos: string[] = [];
    for (let indice = 0; indice < operacoes.length; indice++) {
      if (indice <= voltouAte) {
        rotulos.push(operacoes[indice]);
      } else if (indice >= entrouAte) {
        rotulos.push('↓ repassa');
      } else {
        rotulos.push('');
      }
    }
    return rotulos;
  }

  private mostrarDicaAoAdicionar(nomeDaClasse: string): void {
    const camadas: number = this.historico.length - 1;
    if (nomeDaClasse === 'PoDeFada') {
      this.visualizador.mostrarDica(
        'O <code>PoDeFada</code> <b>multiplica</b> o poder de tudo que está dentro dele. Por isso a <b>ordem</b> dos decorators muda o resultado.');
    } else if (camadas === 1) {
      this.visualizador.mostrarDica(
        'O ingrediente recebeu a poção no construtor e a guardou em <code>this.pocao</code>. Ele também <b>é</b> uma <code>Pocao</code>, então pode ser envolvido de novo.');
    } else {
      this.visualizador.mostrarDica(
        camadas + ' camadas e nenhuma classe "PocaoComIssoEAquilo" foi criada: as combinações são montadas <b>em tempo de execução</b>.');
    }
  }

  private atualizarTela(): void {
    const pocao: Pocao = this.pocaoAtual();
    const caldeirao: HTMLElement = this.sistema.querySelector('.caldeirao') as HTMLElement;
    caldeirao.style.setProperty('--cor-pocao', pocao.getCor());
    caldeirao.style.setProperty('--nivel', String(30 + (this.historico.length - 1) * 10) + '%');

    let efeitos: string = '';
    for (const efeito of pocao.getEfeitos()) {
      efeitos += '<span class="chip">' + efeito + '</span>';
    }
    (this.sistema.querySelector('.dc-ficha') as HTMLElement).innerHTML =
      '<p class="dc-descricao">' + pocao.getDescricao() + '</p>' +
      '<div class="dc-numeros"><div><small>Poder</small><b>' + pocao.getPoder() + '</b></div>' +
      '<div><small>Preço</small><b>R$ ' + pocao.getPreco() + '</b></div>' +
      '<div><small>Camadas</small><b>' + this.historico.length + '</b></div></div>' +
      '<div class="dc-efeitos">' + (efeitos === '' ? '<span class="chip vazio">sem efeitos</span>' : efeitos) + '</div>';

    const camadas: CamadaVisual[] = [];
    for (let indice = 0; indice < this.historico.length; indice++) {
      camadas.push({ classe: this.nomesDasClasses[indice], cor: this.historico[indice].getCor() });
    }
    this.diagrama.renderizar(camadas);
  }

  private pocaoAtual(): Pocao {
    return this.historico[this.historico.length - 1];
  }

  private botao(acao: string): HTMLButtonElement {
    return this.sistema.querySelector('[data-acao="' + acao + '"]') as HTMLButtonElement;
  }
}
