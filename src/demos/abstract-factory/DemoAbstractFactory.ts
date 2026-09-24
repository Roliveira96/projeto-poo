import { DemoPadrao } from '../../app/DemoPadrao';
import type { ConteudoDidatico } from '../../app/ConteudoDidatico';
import type { Passo } from '../../visualizador/Passo';
import { DiagramaFabrica } from './DiagramaFabrica';
import { conteudoAbstractFactory } from './conteudoAbstractFactory';
import type { FabricaRobo } from '../../padroes/abstract-factory/fabricas/FabricaRobo';
import { FabricaFogo } from '../../padroes/abstract-factory/fabricas/FabricaFogo';
import { FabricaGelo } from '../../padroes/abstract-factory/fabricas/FabricaGelo';
import { FabricaCyber } from '../../padroes/abstract-factory/fabricas/FabricaCyber';
import { Robo } from '../../padroes/abstract-factory/Robo';

const codigoFonte = import.meta.glob('../../padroes/abstract-factory/**/*.ts', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

interface PecaDoRobo {
  tipo: string;
  campo: string;
  metodo: string;
}

/** Demonstração do Abstract Factory com o tema Fábrica de Robôs. */
export class DemoAbstractFactory extends DemoPadrao {
  private readonly fabricas: Map<string, FabricaRobo> = new Map<string, FabricaRobo>([
    ['Fogo', new FabricaFogo()],
    ['Gelo', new FabricaGelo()],
    ['Cyber', new FabricaCyber()],
  ]);
  private readonly pecas: PecaDoRobo[] = [
    { tipo: 'Cabeca', campo: 'cabeca', metodo: 'criarCabeca' },
    { tipo: 'Tronco', campo: 'tronco', metodo: 'criarTronco' },
    { tipo: 'Bracos', campo: 'bracos', metodo: 'criarBracos' },
    { tipo: 'Locomocao', campo: 'locomocao', metodo: 'criarLocomocao' },
  ];
  private diagrama!: DiagramaFabrica;
  private sistema!: HTMLElement;
  private fabricaSelecionada: FabricaRobo | null = null;
  private robo: Robo | null = null;

  protected getArquivosDeCodigo(): Map<string, string> {
    return this.organizarArquivos(codigoFonte, 'abstract-factory/', [
      'fabricas/FabricaRobo.ts', 'fabricas/FabricaFogo.ts', 'fabricas/FabricaGelo.ts', 'fabricas/FabricaCyber.ts',
      'produtos/Cabeca.ts', 'produtos/Tronco.ts', 'produtos/Bracos.ts', 'produtos/Locomocao.ts',
      'familias/PecasFogo.ts', 'familias/PecasGelo.ts', 'familias/PecasCyber.ts', 'Robo.ts',
    ]);
  }

  protected getConteudo(): ConteudoDidatico {
    return conteudoAbstractFactory;
  }

  protected montarDiagrama(container: HTMLElement): void {
    this.diagrama = new DiagramaFabrica(container, Array.from(this.fabricas.keys()));
  }

  protected montarSistema(container: HTMLElement): void {
    this.sistema = container;
    container.innerHTML =
      '<div class="af">' +
      '  <div class="passo"><span>1</span> Escolha a linha de produção</div>' +
      '  <div class="af-linhas">' +
      '    <button class="botao-linha linha-fogo" data-linha="Fogo">🔥<b>Fogo</b></button>' +
      '    <button class="botao-linha linha-gelo" data-linha="Gelo">❄️<b>Gelo</b></button>' +
      '    <button class="botao-linha linha-cyber" data-linha="Cyber">🛰️<b>Cyber</b></button>' +
      '  </div>' +
      '  <div class="passo"><span>2</span> Monte e teste o robô</div>' +
      '  <div class="af-botoes">' +
      '    <button class="botao-primario" data-acao="montar" disabled>🔧 Montar robô</button>' +
      '    <button class="botao-primario" data-acao="missao" disabled>🚀 Executar missão</button>' +
      '  </div>' +
      '  <div class="af-palco">' +
      '    <div class="robo">' +
      '      <div class="peca peca-cabeca" data-peca="cabeca"><i class="olhos"></i><em></em></div>' +
      '      <div class="robo-meio">' +
      '        <div class="peca peca-braco" data-peca="bracos"><em></em></div>' +
      '        <div class="peca peca-tronco" data-peca="tronco"><em></em></div>' +
      '        <div class="peca peca-braco" data-peca="bracos"><em></em></div>' +
      '      </div>' +
      '      <div class="peca peca-locomocao" data-peca="locomocao"><em></em></div>' +
      '    </div>' +
      '    <div class="af-ficha">Nenhum robô montado ainda.</div>' +
      '  </div>' +
      '  <ul class="af-relatorio"></ul>' +
      '</div>';

    for (const botao of Array.from(container.querySelectorAll<HTMLButtonElement>('.botao-linha'))) {
      botao.addEventListener('click', () => this.selecionarLinha(botao.dataset.linha as string));
    }
    this.botao('montar').addEventListener('click', () => this.montarRobo());
    this.botao('missao').addEventListener('click', () => this.executarMissao());

    this.visualizador.mostrarDica(
      'Comece escolhendo uma <b>linha de produção</b>. Explique: cada linha é uma <b>família</b> de peças que combinam entre si.');
  }

  private selecionarLinha(linha: string): void {
    this.reprodutor.encerrar();
    const fabrica: FabricaRobo = this.fabricas.get(linha) as FabricaRobo;
    this.fabricaSelecionada = fabrica;
    this.robo = null;

    for (const botao of Array.from(this.sistema.querySelectorAll<HTMLElement>('.botao-linha'))) {
      botao.classList.toggle('selecionado', botao.dataset.linha === linha);
    }
    this.botao('montar').disabled = false;
    this.mostrarRoboAte(null, 0);
    this.diagrama.ativarFabrica(linha);
    this.diagrama.definirProdutos(linha, 0);

    this.visualizador.separador('Linha ' + linha);
    this.visualizador.registrar('const fabrica: FabricaRobo = new Fabrica' + linha + '()');
    this.visualizador.destacarCodigo('fabricas/Fabrica' + linha + '.ts', 'export class');
    this.visualizador.mostrarDica(
      'A variável é do tipo <code>FabricaRobo</code> (a interface), mas o objeto é uma <code>Fabrica' + linha + '</code>. ' +
      'Trocar a família inteira é trocar <b>só este objeto</b>. Agora clique em <b>Montar robô</b>.');
  }

  private montarRobo(): void {
    if (this.fabricaSelecionada === null) {
      return;
    }
    this.reprodutor.encerrar();
    const robo: Robo = new Robo(this.fabricaSelecionada);
    const linha: string = robo.getLinha();
    this.robo = robo;

    const passos: Passo[] = [{
      registro: 'new Robo(fabrica)',
      arquivo: 'Robo.ts',
      trecho: 'constructor(fabrica',
      dica: 'O <code>Robo</code> recebe a fábrica no construtor. Repare que ele <b>não sabe</b> qual é a linha: só conhece a interface.',
      duracao: 1600,
      aplicar: () => {
        this.mostrarRoboAte(robo, 0);
        this.diagrama.pulsar('cliente');
      },
    }];

    for (let quantidade = 0; quantidade < this.pecas.length; quantidade++) {
      const peca: PecaDoRobo = this.pecas[quantidade];
      passos.push({
        registro: 'fabrica.' + peca.metodo + '()',
        arquivo: 'Robo.ts',
        trecho: 'this.' + peca.campo + ' = fabrica.' + peca.metodo,
        dica: 'O <code>Robo</code> pede a peça para a <b>interface</b>: <code>fabrica.' + peca.metodo + '()</code>.',
        duracao: 1000,
        aplicar: () => {
          this.mostrarRoboAte(robo, quantidade);
          this.diagrama.pulsar('interface');
        },
      });
      passos.push({
        registro: 'Fabrica' + linha + '.' + peca.metodo + '() → new ' + peca.tipo + linha + '()',
        tipo: 'retorno',
        arquivo: 'fabricas/Fabrica' + linha + '.ts',
        trecho: 'public ' + peca.metodo,
        dica: 'Quem responde é a <code>Fabrica' + linha + '</code>, que só sabe criar peças da linha ' + linha + ': <code>new ' + peca.tipo + linha + '()</code>.',
        duracao: 1300,
        aplicar: () => {
          this.mostrarRoboAte(robo, quantidade + 1);
          this.diagrama.pulsar('fabrica');
        },
      });
    }

    passos.push({
      dica: 'Robô pronto e <b>todas as peças combinam</b>. Em nenhum lugar o Robo escreveu <code>new Cabeca' + linha + '()</code>. ' +
        'Experimente trocar de linha e montar de novo, ou clique em <b>Executar missão</b>.',
      duracao: 600,
      aplicar: () => {
        this.mostrarRoboAte(robo, this.pecas.length);
        this.atualizarFicha(robo);
        this.botao('missao').disabled = false;
      },
    });

    this.reprodutor.iniciar('Montando robô ' + linha, passos);
  }

  private executarMissao(): void {
    if (this.robo === null) {
      return;
    }
    this.reprodutor.encerrar();
    const linha: string = this.robo.getLinha();
    const relatorio: string[] = this.robo.executarMissao();
    const metodos: string[] = ['public mover', 'public escanear', 'public atacar', 'public getBlindagem'];
    const chamadas: string[] = ['locomocao.mover()', 'cabeca.escanear()', 'bracos.atacar()', 'tronco.getBlindagem()'];

    const passos: Passo[] = [{
      registro: 'robo.executarMissao()',
      arquivo: 'Robo.ts',
      trecho: 'public executarMissao',
      dica: 'O método <code>executarMissao()</code> é o <b>mesmo</b> para qualquer linha. O resultado muda porque cada peça concreta ' +
        'implementa o contrato do seu jeito: <b>polimorfismo</b>.',
      duracao: 1400,
      aplicar: () => this.mostrarRelatorioAte(relatorio, 0),
    }];
    for (let indice = 0; indice < relatorio.length; indice++) {
      passos.push({
        registro: chamadas[indice] + ' → ' + relatorio[indice],
        tipo: 'retorno',
        arquivo: 'familias/Pecas' + linha + '.ts',
        trecho: metodos[indice],
        duracao: 1100,
        aplicar: () => this.mostrarRelatorioAte(relatorio, indice + 1),
      });
    }
    this.reprodutor.iniciar('Missão', passos);
  }

  /** Estado absoluto do robô na tela: as "quantidade" primeiras peças montadas. */
  private mostrarRoboAte(robo: Robo | null, quantidade: number): void {
    for (let indice = 0; indice < this.pecas.length; indice++) {
      const campo: string = this.pecas[indice].campo;
      if (robo !== null && indice < quantidade) {
        this.mostrarPeca(campo, robo);
      } else {
        this.esconderPeca(campo);
      }
    }
    if (robo !== null) {
      this.diagrama.definirProdutos(robo.getLinha(), quantidade);
    }
    this.botao('missao').disabled = true;
    (this.sistema.querySelector('.af-ficha') as HTMLElement).textContent =
      robo === null ? 'Nenhum robô montado ainda.' : 'Montando… ' + quantidade + '/' + this.pecas.length + ' peças';
    (this.sistema.querySelector('.af-relatorio') as HTMLElement).innerHTML = '';
  }

  private mostrarRelatorioAte(relatorio: string[], quantidade: number): void {
    const lista: HTMLElement = this.sistema.querySelector('.af-relatorio') as HTMLElement;
    lista.innerHTML = '';
    for (let indice = 0; indice < quantidade; indice++) {
      const item: HTMLLIElement = document.createElement('li');
      item.textContent = relatorio[indice];
      lista.appendChild(item);
    }
  }

  private mostrarPeca(campo: string, robo: Robo): void {
    let icone: string;
    let cor: string;
    if (campo === 'cabeca') {
      icone = robo.getCabeca().getIcone();
      cor = robo.getCabeca().getCor();
    } else if (campo === 'tronco') {
      icone = robo.getTronco().getIcone();
      cor = robo.getTronco().getCor();
    } else if (campo === 'bracos') {
      icone = robo.getBracos().getIcone();
      cor = robo.getBracos().getCor();
    } else {
      icone = robo.getLocomocao().getIcone();
      cor = robo.getLocomocao().getCor();
    }
    for (const peca of this.elementosDaPeca(campo)) {
      peca.style.setProperty('--cor-peca', cor);
      peca.dataset.linha = robo.getLinha().toLowerCase();
      (peca.querySelector('em') as HTMLElement).textContent = icone;
      peca.classList.add('montada');
    }
  }

  private esconderPeca(campo: string): void {
    for (const peca of this.elementosDaPeca(campo)) {
      peca.classList.remove('montada');
    }
  }

  private elementosDaPeca(campo: string): HTMLElement[] {
    return Array.from(this.sistema.querySelectorAll<HTMLElement>('[data-peca="' + campo + '"]'));
  }

  private atualizarFicha(robo: Robo): void {
    (this.sistema.querySelector('.af-ficha') as HTMLElement).innerHTML =
      '<b>Robô linha ' + robo.getLinha() + '</b>' +
      '<span>' + robo.getCabeca().getNome() + ' · ' + robo.getTronco().getNome() + ' · ' + robo.getBracos().getNome() +
      ' · ' + robo.getLocomocao().getNome() + '</span>' +
      '<span>Blindagem ' + robo.getTronco().getBlindagem() + ' · Força ' + robo.getBracos().getForca() +
      ' · Velocidade ' + robo.getLocomocao().getVelocidade() +
      ' · <b>Poder total ' + robo.getPoderTotal() + '</b></span>';
  }

  private botao(acao: string): HTMLButtonElement {
    return this.sistema.querySelector('[data-acao="' + acao + '"]') as HTMLButtonElement;
  }
}
