/**
 * Produto abstrato D da família: como o robô se desloca.
 * Foi o último produto adicionado. Para ele existir, a interface FabricaRobo
 * e TODAS as fábricas concretas precisaram ganhar o método criarLocomocao().
 */
export interface Locomocao {
  getNome(): string;
  getIcone(): string;
  getCor(): string;
  getVelocidade(): number;
  mover(): string;
}
