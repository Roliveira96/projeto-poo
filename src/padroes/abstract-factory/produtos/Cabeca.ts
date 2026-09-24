/**
 * Produto abstrato A da família.
 * Toda cabeça de robô, de qualquer linha, cumpre este contrato.
 */
export interface Cabeca {
  getNome(): string;
  getIcone(): string;
  getCor(): string;
  escanear(): string;
}
