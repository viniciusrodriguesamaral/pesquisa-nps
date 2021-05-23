package com.iel.nps.repository;

import com.iel.nps.dto.ResultadoPesquisa;
import com.iel.nps.filter.PesquisaFilter;
import com.iel.nps.model.Pesquisa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ResultadoRepositoryQuery {
    public ResultadoPesquisa buscaResultadosAgrupados(long idPesquisa);
}
