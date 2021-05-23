package com.iel.nps.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class ResultadoPesquisa {
    private double qtdeRespostas;
    private BigDecimal percPromotores;

    private double qtdePromotores;
    private BigDecimal percNeutros;

    private double qtdeNeutros;
    private BigDecimal percDetratores;

    private long qtdeDetratores;
    private BigDecimal nps;
    private String classificacao;
    private String corClassificacao;
}
