package com.iel.nps.api;

import com.iel.nps.dto.Credencial;
import com.iel.nps.dto.HomeEstatisticaDTO;
import com.iel.nps.model.Instituicao;
import com.iel.nps.repository.InstituicaoRepository;
import com.iel.nps.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("instituicao")
public class InstituicaoController {
    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private HomeService homeService;

//    @GetMapping ("/buscarEmpresasInstituicao")
//    public Page<Empresa> buscarEmpresasInstituicao(EmpresaFilter empresaFilter, Pageable pageable){
//        return instituicaoRepository.
//    }

    @GetMapping("/buscaInstituicaoPorToken/{token}")
    public Credencial buscaInstituicaoPorToken(@PathVariable String token){
        Instituicao instituicao         = instituicaoRepository.buscaInstituicao(token);
        Credencial credencial           = new Credencial();

        if (instituicao != null && instituicao.getId() > 0) {
            credencial.setIdInstituicao( instituicao.getId() );
            credencial.setToken( token );
            credencial.setInstituicao( instituicao.getNome() );
        }

        return credencial;
    }

    @GetMapping("/buscaEstatiticaHomePorToken/{token}")
    public HomeEstatisticaDTO buscaEstatiticaHomePorToken(@PathVariable String token){
        HomeEstatisticaDTO homeEstatisticaDTO = homeService.montaEstatiticaHome(token);

        return homeEstatisticaDTO;
    }
}
