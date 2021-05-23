package com.iel.nps.api;

import com.iel.nps.filter.EmpresaFilter;
import com.iel.nps.model.Empresa;
import com.iel.nps.repository.EmpresaRepository;
import com.iel.nps.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("empresa")
public class EmpresaController {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private EmpresaService empresaService;

    @GetMapping("/obter")
    public Empresa obter(EmpresaFilter empresaFilter){
        Empresa empresa = empresaService.buscarEmpresaPeloId(empresaFilter.getId() );

        return empresa;
    }

    @GetMapping ("/buscarEmpresasDaInstituicao")
    public Page<Empresa> buscarEmpresasInstituicao(EmpresaFilter empresaFilter, Pageable pageable){
        return empresaRepository.pesquisaResumoPaginado(empresaFilter,pageable);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Empresa adicionar(@Valid @RequestBody Empresa empresa){
        return empresaService.salvar(empresa);
    }

    @PutMapping("/{id}")
    public Empresa atualizar(@PathVariable Long id, @RequestBody @Valid Empresa empresa){
        return empresaService.atualizar(id, empresa);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id){
        empresaService.excluir(id);
    }

    @PutMapping("/{id}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarStatus(@PathVariable Long id, @RequestBody Boolean ativo){
        empresaService.atualizarSituacao(id, ativo);
    }

    @GetMapping("/obterPorRazaoOrFantasia")
    public List<Empresa> obterPorRazaoOrFantasia( EmpresaFilter empresaFilter ){
        return empresaRepository.buscaPorRazaoOrFantasiaOrRegistro(empresaFilter);
    }
}
