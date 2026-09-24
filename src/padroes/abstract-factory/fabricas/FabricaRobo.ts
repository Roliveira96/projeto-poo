import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';

/**
 * ABSTRACT FACTORY
 * Declara um método de criação para cada produto da família.
 * Quem usa a fábrica só conhece esta interface, nunca as classes concretas.
 */
export interface FabricaRobo {
  getNomeDaLinha(): string;
  criarCabeca(): Cabeca;
  criarTronco(): Tronco;
  criarBracos(): Bracos;
}
