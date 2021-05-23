package com.iel.nps.filter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmpresaFilter {
    private Long id;
    private String criterio;
    private Long idInstituicao;
    private String token;
}
