import type { FabricaRobo } from './FabricaRobo';
import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';
import type { Locomocao } from '../produtos/Locomocao';
import { CabecaFogo, TroncoFogo, BracosFogo, LocomocaoFogo } from '../familias/PecasFogo';

/**
 * FÁBRICA CONCRETA: só produz peças da linha Fogo.
 */
export class FabricaFogo implements FabricaRobo {
  public getNomeDaLinha(): string {
    return 'Fogo';
  }

  public criarCabeca(): Cabeca {
    return new CabecaFogo();
  }

  public criarTronco(): Tronco {
    return new TroncoFogo();
  }

  public criarBracos(): Bracos {
    return new BracosFogo();
  }

  public criarLocomocao(): Locomocao {
    return new LocomocaoFogo();
  }
}
