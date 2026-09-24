import type { FabricaRobo } from './FabricaRobo';
import type { Cabeca } from '../produtos/Cabeca';
import type { Tronco } from '../produtos/Tronco';
import type { Bracos } from '../produtos/Bracos';
import type { Locomocao } from '../produtos/Locomocao';
import { CabecaCyber, TroncoCyber, BracosCyber, LocomocaoCyber } from '../familias/PecasCyber';

/**
 * FÁBRICA CONCRETA: só produz peças da linha Cyber.
 */
export class FabricaCyber implements FabricaRobo {
  public getNomeDaLinha(): string {
    return 'Cyber';
  }

  public criarCabeca(): Cabeca {
    return new CabecaCyber();
  }

  public criarTronco(): Tronco {
    return new TroncoCyber();
  }

  public criarBracos(): Bracos {
    return new BracosCyber();
  }

  public criarLocomocao(): Locomocao {
    return new LocomocaoCyber();
  }
}
