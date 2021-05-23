package com.iel.nps.filter;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class PesquisaFilter {
    private Long id;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Long idEmpresa;
}
