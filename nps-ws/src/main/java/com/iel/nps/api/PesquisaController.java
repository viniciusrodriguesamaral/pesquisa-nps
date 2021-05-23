package com.iel.nps.api;

import com.iel.nps.dto.ResultadoPesquisa;
import com.iel.nps.filter.EmpresaFilter;
import com.iel.nps.filter.PesquisaFilter;
import com.iel.nps.model.Empresa;
import com.iel.nps.model.Pesquisa;
import com.iel.nps.model.Resultado;
import com.iel.nps.repository.PesquisaRepository;
import com.iel.nps.repository.ResultadoRepository;
import com.iel.nps.service.PesquisaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("pesquisa")
public class PesquisaController {
    @Autowired
    private ResultadoRepository resultadoRepository;

    @Autowired
    private PesquisaRepository pesquisaRepository;

    @Autowired
    private PesquisaService pesquisaService;

    @GetMapping("/obter")
    public Pesquisa obter(PesquisaFilter pesquisaFilter){
        Pesquisa pesquisa = pesquisaService.buscarPesquisaPeloId(pesquisaFilter.getId() );

        return pesquisa;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pesquisa adicionar(@Valid @RequestBody Pesquisa pesquisa){
        Random gerador = new Random();

        pesquisa.setData( LocalDate.now() );

        UUID uuid = UUID.randomUUID();
        pesquisa.setToken( uuid.toString().toUpperCase(Locale.ROOT) );

        return pesquisaService.salvar(pesquisa);
    }

    @PutMapping("/{id}")
    public Pesquisa atualizar(@PathVariable Long id, @RequestBody @Valid Pesquisa pesquisa){
        return pesquisaService.atualizar(id, pesquisa);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@PathVariable Long id){
        pesquisaService.excluir(id);
    }

    @PutMapping("/{id}/ativo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizarStatus(@PathVariable Long id, @RequestBody Boolean ativo){
        pesquisaService.atualizarSituacao(id, ativo);
    }

    @GetMapping ("/buscarPesquisasDaEmpresa")
    public Page<Pesquisa> buscarEmpresasInstituicao(PesquisaFilter pesquisaFilter, Pageable pageable){
        return pesquisaRepository.pesquisaResumoPaginado(pesquisaFilter,pageable);
    }

    @PostMapping("/enviarPesquisa")
    @ResponseStatus(HttpStatus.CREATED)
    public void cadastrarPesquisa(@RequestBody Resultado resultado){
        resultadoRepository.save(resultado);
    }

    @GetMapping("/buscarPesquisaPorToken/{token}")
    public Pesquisa buscarPesquisaPorToken(@PathVariable String token){
        Pesquisa pesquisa = pesquisaRepository.buscarPesquisaPorToken(token);

        return pesquisa;
    }

    @GetMapping("/buscarResultadoPesquisa/{idPesquisa}")
    public ResultadoPesquisa buscarResultadoPesquisa(@PathVariable long idPesquisa){
        ResultadoPesquisa resultadoPesquisa = pesquisaService.montaResultadoPesquisa(idPesquisa);

        return resultadoPesquisa;
    }

}
