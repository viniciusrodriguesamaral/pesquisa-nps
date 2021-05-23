package com.iel.nps.repository;

import com.iel.nps.filter.PesquisaFilter;
import com.iel.nps.model.Pesquisa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Optional;

public interface PesquisaRepositoryQuery {
    public Optional<Pesquisa> obter(Long id);
    public Page<Pesquisa> pesquisaResumoPaginado(PesquisaFilter pesquisaFilter, Pageable pageable);
    Pesquisa buscarPesquisaPorToken(String token);
}
