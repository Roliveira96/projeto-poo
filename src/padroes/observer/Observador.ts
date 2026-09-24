/**
 * OBSERVER
 * Contrato de quem quer ser avisado. O sujeito só conhece este método.
 */
export interface Observador<T> {
  atualizar(dado: T): void;
}
