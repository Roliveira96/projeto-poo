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

/** Material de apoio exibido nas janelas "Conceito" e "Roteiro". */
export interface ConteudoDidatico {
  objetivo: string;
  problema: string;
  analogia: string;
  participantes: Participante[];
  roteiro: string[];
  perguntas: PerguntaProvavel[];
}
