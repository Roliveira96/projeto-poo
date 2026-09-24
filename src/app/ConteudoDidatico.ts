/** Papel de uma classe dentro do padrão (ex.: "Fábrica Concreta" → FabricaFogo). */
export interface Participante {
  papel: string;
  classes: string;
  descricao: string;
}

export interface PerguntaProvavel {
  pergunta: string;
  resposta: string;
}

/** Material exibido nas janelas "Conceito" e "Materiais". */
export interface ConteudoDidatico {
  objetivo: string;
  problema: string;
  analogia: string;
  participantes: Participante[];
  perguntas: PerguntaProvavel[];
  /** De onde o padrão veio (HTML, um item por parágrafo). */
  origem: string[];
  /** Texto complementar: consequências, variações e usos modernos (HTML, um item por parágrafo). */
  aprofundamento: string[];
}
