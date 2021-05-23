package com.iel.nps.service;

import com.iel.nps.dto.HomeEstatisticaDTO;
import com.iel.nps.repository.EmpresaRepository;
import com.iel.nps.repository.PesquisaRepository;
import com.iel.nps.repository.ResultadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private PesquisaRepository pesquisaRepository;

    @Autowired
    private ResultadoRepository resultadoRepository;

    private long buscaPesquisasInstuicao(String token){
        return pesquisaRepository.buscaQtdePesquisasInstituicao(token);
    }

    private long buscaEmpresasInstituicao(String token){
        return empresaRepository.buscaQtdeEmpresasInstituicao(token);
    }

    private long buscaResultadosInstituicao(String token){
        return resultadoRepository.buscaQtdePesquisasRespondidas(token);
    }

    public HomeEstatisticaDTO montaEstatiticaHome(String token){
        long qtdePesquisas  = buscaPesquisasInstuicao(token);
        long qtdeEmpresas   = buscaEmpresasInstituicao(token);
        long qtdeResultados = buscaResultadosInstituicao(token);

        HomeEstatisticaDTO homeEstatisticaDTO = new HomeEstatisticaDTO();
        homeEstatisticaDTO.setTotalEmpresas( qtdeEmpresas );
        homeEstatisticaDTO.setTotalPesquisas( qtdePesquisas );
        homeEstatisticaDTO.setTotalResponderam( qtdeResultados );

        return homeEstatisticaDTO;
    }
}
