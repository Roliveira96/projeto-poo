import type { TipoDeRegistro } from './LogDeChamadas';

/**
 * Um passo da execução, como uma linha num depurador.
 * "aplicar" deve deixar a tela no estado ABSOLUTO daquele passo,
 * para que avançar e voltar funcionem em qualquer ordem.
 */
export interface Passo {
  registro?: string;
  tipo?: TipoDeRegistro;
  arquivo?: string;
  trecho?: string;
  dica?: string;
  duracao?: number;
  aplicar?: () => void;
}
