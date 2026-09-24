import { InfoDemo } from './InfoDemo';
import type { DemoPadrao } from './DemoPadrao';
import { DemoAbstractFactory } from '../demos/abstract-factory/DemoAbstractFactory';
import { DemoDecorator } from '../demos/decorator/DemoDecorator';
import { DemoObserver } from '../demos/observer/DemoObserver';

/** Registro das demos disponíveis: alimenta o menu e cria a demo escolhida. */
export class CatalogoDeDemos {
  private readonly demos: InfoDemo[] = [
    new InfoDemo('abstract-factory', 'Abstract Factory', 'Padrão Criacional', 'Fábrica de Robôs', '🤖',
      'Cria famílias inteiras de peças que combinam entre si, sem o cliente conhecer as classes concretas.'),
    new InfoDemo('decorator', 'Decorator', 'Padrão Estrutural', 'Laboratório de Poções', '🧪',
      'Adiciona ingredientes a uma poção em tempo de execução, camada por camada, sem herança.'),
    new InfoDemo('observer', 'Observer', 'Padrão Comportamental', 'Pet Virtual', '🐣',
      'O pet muda de estado e avisa automaticamente todos os interessados que se inscreveram.'),
  ];

  public listar(): InfoDemo[] {
    return this.demos;
  }

  public criar(id: string): DemoPadrao | null {
    for (const info of this.demos) {
      if (info.id !== id) {
        continue;
      }
      switch (id) {
        case 'abstract-factory':
          return new DemoAbstractFactory(info);
        case 'decorator':
          return new DemoDecorator(info);
        case 'observer':
          return new DemoObserver(info);
      }
    }
    return null;
  }
}
