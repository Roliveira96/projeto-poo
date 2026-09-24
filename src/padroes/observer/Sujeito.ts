import type { Observador } from './Observador';

/**
 * SUBJECT (Sujeito / Publicador)
 * Mantém a lista de inscritos e avisa todos quando algo muda.
 */
export interface Sujeito<T> {
  inscrever(observador: Observador<T>): void;
  desinscrever(observador: Observador<T>): void;
  notificar(): void;
}
