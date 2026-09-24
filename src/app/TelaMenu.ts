import type { Tela } from './Tela';
import type { InfoDemo } from './InfoDemo';
import { Autor } from './Autor';
import { Professor } from './Professor';

const ICONE_GITHUB: string =
  '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
const ICONE_SITE: string =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.8 2.7 4 6.1 4 10s-1.2 7.3-4 10m0-20C9.2 4.7 8 8.1 8 12s1.2 7.3 4 10M2 12h20"/></svg>';
const ICONE_GRAVATAR: string =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 12a4 4 0 100-8 4 4 0 000 8zm-8 9c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>';

/** Tela inicial: os três padrões no centro da tela. */
export class TelaMenu implements Tela {
  private readonly demos: InfoDemo[];
  private readonly professor: Professor = new Professor(
    'Emerson André Fedechen',
    'Disciplina: Padrões de Projeto',
    'Exame de suficiência · Abstract Factory, Decorator e Observer',
  );
  private readonly autor: Autor = new Autor(
    'Ricardo Martins de Oliveira',
    'Software Developer / Backend Engineer na Studio4You',
    'Guarapuava, PR',
    'Desenvolvedor de software e empreendedor focado em backend, automações e arquitetura de sistemas com Golang.',
    'ricardo.png',
    [
      { rotulo: 'github.com/Roliveira96', endereco: 'https://github.com/Roliveira96', icone: ICONE_GITHUB },
      { rotulo: 'rmo.dev.br', endereco: 'https://rmo.dev.br', icone: ICONE_SITE },
      { rotulo: 'gravatar.com/roliveira96', endereco: 'https://gravatar.com/roliveira96', icone: ICONE_GRAVATAR },
    ],
  );

  constructor(demos: InfoDemo[]) {
    this.demos = demos;
  }

  public montar(raiz: HTMLElement): void {
    let cards: string = '';
    let numero: number = 1;
    for (const demo of this.demos) {
      cards +=
        '<a class="card card-' + demo.id + '" href="#/' + demo.id + '">' +
        '  <span class="card-numero">0' + numero + '</span>' +
        '  <span class="card-icone">' + demo.icone + '</span>' +
        '  <span class="card-categoria">' + demo.categoria + '</span>' +
        '  <h2>' + demo.padrao + '</h2>' +
        '  <h3>' + demo.tema + '</h3>' +
        '  <p>' + demo.resumo + '</p>' +
        '  <span class="card-abrir">Abrir demonstração →</span>' +
        '</a>';
      numero++;
    }
    raiz.innerHTML =
      '<div class="menu">' +
      '  <header class="menu-cabecalho">' +
      '    <span class="menu-selo">Exame de Suficiência</span>' +
      '    <h1>Padrões de Projeto</h1>' +
      '    <p>Três padrões, três mundos. Escolha um para ver o sistema funcionando e o código por trás dele.</p>' +
      '  </header>' +
      '  <nav class="menu-cards">' + cards + '</nav>' +
      '  <div class="pessoas">' + this.autor.gerarHtml() + this.professor.gerarHtml() + '</div>' +
      '  <p class="menu-dica so-com-dicas">💡 Ordem sugerida: <b>criacional</b> → <b>estrutural</b> → <b>comportamental</b>. ' +
      'Em cada demo, o botão <b>📋 Roteiro</b> mostra o que falar, e os controles ⏮ ▶ ⏭ (ou as teclas ← espaço →) ' +
      'deixam você avançar no seu ritmo.</p>' +
      '</div>';
  }

  public desmontar(): void {
    // tela estática, nada para limpar
  }
}
