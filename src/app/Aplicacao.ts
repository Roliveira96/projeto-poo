import type { Tela } from './Tela';
import { TelaMenu } from './TelaMenu';
import { CatalogoDeDemos } from './CatalogoDeDemos';

/**
 * Ponto central do site: navega entre o menu e as demos pelo endereço (#/decorator etc.)
 * e controla o botão global de liga/desliga das dicas.
 */
export class Aplicacao {
  private static readonly CHAVE_DICAS: string = 'exame-padroes:dicas';

  private readonly raiz: HTMLElement;
  private readonly catalogo: CatalogoDeDemos = new CatalogoDeDemos();
  private telaAtual: Tela | null = null;

  constructor(raiz: HTMLElement) {
    this.raiz = raiz;
  }

  public iniciar(): void {
    this.criarBotaoDeDicas();
    window.addEventListener('hashchange', () => this.navegar());
    this.navegar();
  }

  private navegar(): void {
    const id: string = window.location.hash.replace('#/', '');
    const demo: Tela | null = this.catalogo.criar(id);
    this.trocarTela(demo !== null ? demo : new TelaMenu(this.catalogo.listar()));
  }

  private trocarTela(novaTela: Tela): void {
    if (this.telaAtual !== null) {
      this.telaAtual.desmontar();
    }
    this.telaAtual = novaTela;
    this.raiz.innerHTML = '';
    novaTela.montar(this.raiz);
    window.scrollTo(0, 0);
  }

  private criarBotaoDeDicas(): void {
    const botao: HTMLButtonElement = document.createElement('button');
    botao.className = 'botao-dicas';
    botao.title = 'Liga/desliga as dicas para o apresentador';
    botao.addEventListener('click', () => {
      this.aplicarDicas(document.body.classList.contains('sem-dicas'), botao);
    });
    document.body.appendChild(botao);
    this.aplicarDicas(this.lerPreferencia(), botao);
  }

  private aplicarDicas(ligadas: boolean, botao: HTMLButtonElement): void {
    document.body.classList.toggle('sem-dicas', !ligadas);
    botao.textContent = ligadas ? '💡 Dicas: ligadas' : '💡 Dicas: desligadas';
    try {
      localStorage.setItem(Aplicacao.CHAVE_DICAS, ligadas ? '1' : '0');
    } catch {
      // armazenamento indisponível: segue sem lembrar a escolha
    }
  }

  private lerPreferencia(): boolean {
    try {
      return localStorage.getItem(Aplicacao.CHAVE_DICAS) !== '0';
    } catch {
      return true;
    }
  }
}
