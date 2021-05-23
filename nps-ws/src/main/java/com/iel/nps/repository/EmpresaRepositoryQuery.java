package com.iel.nps.repository;

import com.iel.nps.filter.EmpresaFilter;
import com.iel.nps.model.Empresa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepositoryQuery {
    public Optional<Empresa> obter(Long id);
    public Page<Empresa> pesquisaResumoPaginado(EmpresaFilter empresaFilter, Pageable pageable);
    public List<Empresa> buscaPorRazaoOrFantasiaOrRegistro(EmpresaFilter empresaFilter);
}
