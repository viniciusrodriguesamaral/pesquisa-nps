export class Pesquisa{
  id: number;
  token: string;
  pergunta: string;
  empresa = new Empresa();
  status = 'ATIVO';
}

export class Resultado{
  id: number;
  pesquisa = new Pesquisa();

  resposta: number;
  justificativa: string;
  data: Date;
}

export class Empresa{
  id: number;
  instituicao = new Instituicao();
  cnpj: string;
  razaoSocial: string;
  fantasia: string;
  email: string;
  codigoDescricao: string;
  status = 'ATIVO';
}

export class Instituicao{
  id: number;
  nome: string;
  token: string;
}

export class Credencial{
  idInstituicao: number;
  token: string;
  instituicao: string;
}

export class HomeEstatisticaDTO{
  totalEmpresas: number;
  totalPesquisas: number;
  totalResponderam: number;
}

export class ResultadoPesquisa{
  qtdeRespostas: number;
  percPromotores: number;
  qtdePromotores: number;
  percNeutros: number;
  qtdeNeutros: number;
  percDetratores: number;
  qtdeDetratores: number;
  nps: number;
  classificacao: string;
  corClassificacao: string;
}
