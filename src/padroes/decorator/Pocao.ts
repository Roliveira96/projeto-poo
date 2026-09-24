/**
 * COMPONENTE
 * Contrato comum entre a poção base e todos os ingredientes (decoradores).
 * Para quem usa, uma poção decorada é "só mais uma Pocao".
 */
export interface Pocao {
  getDescricao(): string;
  getPoder(): number;
  getPreco(): number;
  getCor(): string;
  getEfeitos(): string[];
}
