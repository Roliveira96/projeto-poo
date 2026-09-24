/**
 * Produto abstrato C da família.
 */
export interface Bracos {
  getNome(): string;
  getIcone(): string;
  getCor(): string;
  getForca(): number;
  atacar(): string;
}
