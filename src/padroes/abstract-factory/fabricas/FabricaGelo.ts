import type { FabricaRobo } from './FabricaRobo';
import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';
import { CabecaGelo, TroncoGelo, BracosGelo } from '../familias/PecasGelo';

/**
 * FÁBRICA CONCRETA: só produz peças da linha Gelo.
 */
export class FabricaGelo implements FabricaRobo {
  public getNomeDaLinha(): string {
    return 'Gelo';
  }

  public criarCabeca(): Cabeca {
    return new CabecaGelo();
  }

  public criarTronco(): Tronco {
    return new TroncoGelo();
  }

  public criarBracos(): Bracos {
    return new BracosGelo();
  }
}
