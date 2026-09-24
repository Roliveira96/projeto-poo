/**
 * Colore código TypeScript linha a linha (sem dependências externas).
 * Guarda estado entre linhas para lidar com comentários de bloco.
 */
export class RealceSintaxe {
  private static readonly PALAVRAS_CHAVE: Set<string> = new Set([
    'import', 'from', 'export', 'class', 'interface', 'implements', 'extends', 'abstract',
    'public', 'private', 'protected', 'readonly', 'static', 'constructor', 'return', 'new',
    'const', 'let', 'for', 'of', 'if', 'else', 'this', 'type', 'void', 'null', 'true', 'false',
  ]);
  private static readonly TIPOS_PRIMITIVOS: Set<string> = new Set(['string', 'number', 'boolean']);

  private emComentarioDeBloco: boolean = false;

  public realcarArquivo(codigo: string): string[] {
    this.emComentarioDeBloco = false;
    const linhasRealcadas: string[] = [];
    for (const linha of codigo.split('\n')) {
      linhasRealcadas.push(this.realcarLinha(linha));
    }
    return linhasRealcadas;
  }

  private realcarLinha(linha: string): string {
    let resultado: string = '';
    let posicao: number = 0;

    while (posicao < linha.length) {
      if (this.emComentarioDeBloco) {
        const fim: number = linha.indexOf('*/', posicao);
        const ate: number = fim === -1 ? linha.length : fim + 2;
        resultado += this.envolver('comentario', linha.substring(posicao, ate));
        if (fim !== -1) {
          this.emComentarioDeBloco = false;
        }
        posicao = ate;
        continue;
      }

      const resto: string = linha.substring(posicao);
      if (resto.startsWith('/*')) {
        this.emComentarioDeBloco = true;
        continue;
      }
      if (resto.startsWith('//')) {
        resultado += this.envolver('comentario', resto);
        break;
      }

      const caractere: string = linha[posicao];
      if (caractere === "'" || caractere === '"' || caractere === '`') {
        let fim: number = posicao + 1;
        while (fim < linha.length && linha[fim] !== caractere) {
          fim += linha[fim] === '\\' ? 2 : 1;
        }
        resultado += this.envolver('texto', linha.substring(posicao, fim + 1));
        posicao = fim + 1;
        continue;
      }

      const palavra: RegExpMatchArray | null = resto.match(/^[A-Za-z_$][\w$]*/);
      if (palavra !== null) {
        resultado += this.classificarPalavra(palavra[0], linha.substring(posicao + palavra[0].length));
        posicao += palavra[0].length;
        continue;
      }

      const numero: RegExpMatchArray | null = resto.match(/^\d+/);
      if (numero !== null) {
        resultado += this.envolver('numero', numero[0]);
        posicao += numero[0].length;
        continue;
      }

      resultado += this.escapar(caractere);
      posicao++;
    }
    return resultado === '' ? ' ' : resultado;
  }

  private classificarPalavra(palavra: string, depois: string): string {
    if (RealceSintaxe.PALAVRAS_CHAVE.has(palavra)) {
      return this.envolver('chave', palavra);
    }
    if (RealceSintaxe.TIPOS_PRIMITIVOS.has(palavra) || /^[A-Z]/.test(palavra)) {
      return this.envolver('tipo', palavra);
    }
    if (depois.startsWith('(')) {
      return this.envolver('metodo', palavra);
    }
    return this.escapar(palavra);
  }

  private envolver(classe: string, conteudo: string): string {
    return '<span class="tk-' + classe + '">' + this.escapar(conteudo) + '</span>';
  }

  private escapar(texto: string): string {
    return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
