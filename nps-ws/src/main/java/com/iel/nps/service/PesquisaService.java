package com.iel.nps.service;

import com.iel.nps.dto.ResultadoPesquisa;
import com.iel.nps.enums.EnumStatus;
import com.iel.nps.exception.NegocioException;
import com.iel.nps.model.Pesquisa;
import com.iel.nps.repository.PesquisaRepository;
import com.iel.nps.repository.ResultadoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.math.BigDecimal;

@Service
public class PesquisaService {
    @Autowired
    private PesquisaRepository pesquisaRepository;

    @Autowired
    private ResultadoRepository resultadoRepository;

    public Pesquisa salvar(Pesquisa pesquisa){
        try{
            return pesquisaRepository.save(pesquisa);
        }catch ( DataIntegrityViolationException e){
            throw new NegocioException(e.getMessage());
        }
    }

    public Pesquisa atualizar(Long id, Pesquisa pesquisa){
        Pesquisa pesquisaSalvo = buscarPesquisaPeloId(id);

        BeanUtils.copyProperties(pesquisa,pesquisaSalvo, "id");

        return salvar(pesquisaSalvo);
    }

    public Pesquisa buscarPesquisaPeloId(Long id) {
        return pesquisaRepository.obter(id).orElseThrow(() -> new NegocioException(
                "Pesquisa não encontrada"
        ));
    }

    public void atualizarSituacao(Long id, Boolean ativo){
        Pesquisa pesquisa = buscarPesquisaPeloId(id);

        if(ativo){
            pesquisa.setStatus(EnumStatus.ATIVO);
        }else{
            pesquisa.setStatus(EnumStatus.INATIVO);
        }

        pesquisaRepository.save(pesquisa);
    }

    public void excluir(Long empreasId){
        try{
            pesquisaRepository.deleteById(empreasId);
            pesquisaRepository.flush();
        }catch(EmptyResultDataAccessException e){
            throw new NegocioException( "Pesquisa não encontrada" );
        }catch(DataIntegrityViolationException e){
            throw new NegocioException("Essa pesquisa não pode ser excluída, pois existe vínculos."
            );
        }
    }

    public ResultadoPesquisa montaResultadoPesquisa(long idPesquisa){
        ResultadoPesquisa resultadoPesquisa = resultadoRepository.buscaResultadosAgrupados(idPesquisa);

        completaAnaliseResultado(resultadoPesquisa);

        return resultadoPesquisa;
    }

    private void completaAnaliseResultado(ResultadoPesquisa resultadoPesquisa) {
        resultadoPesquisa.setPercPromotores( new BigDecimal( (resultadoPesquisa.getQtdePromotores() / resultadoPesquisa.getQtdeRespostas()) * 100  ) );
        resultadoPesquisa.setPercNeutros(new BigDecimal((resultadoPesquisa.getQtdeNeutros() / resultadoPesquisa.getQtdeRespostas()) * 100  ) );
        resultadoPesquisa.setPercDetratores(new BigDecimal((resultadoPesquisa.getQtdeDetratores() / resultadoPesquisa.getQtdeRespostas()) * 100  ));

        resultadoPesquisa.setNps(resultadoPesquisa.getPercPromotores().subtract(resultadoPesquisa.getPercDetratores())  );

        //  NPS <=  0 - Zona Crítica
        //  NPS <= 50 - Zona de Aperfeiçoamento
        //  NPS <= 75 - Zona de Qualidade
        //  NPS >  75 - Zona de Excelência

        if ( resultadoPesquisa.getNps().doubleValue() <= 0 ){
            resultadoPesquisa.setClassificacao("Zona Crítica");
        }else if ( resultadoPesquisa.getNps().doubleValue() <= 50 ){
            resultadoPesquisa.setClassificacao("Zona de Aperfeiçoamento");
        }else if ( resultadoPesquisa.getNps().doubleValue() <= 75 ){
            resultadoPesquisa.setClassificacao("Zona de Qualidade");
        }else if ( resultadoPesquisa.getNps().doubleValue() > 75 ){
            resultadoPesquisa.setClassificacao("Zona de Excelência");
        }
        resultadoPesquisa.setCorClassificacao( retornaCorClassificacao(resultadoPesquisa.getClassificacao()) );
    }


    private String retornaCorClassificacao(String classificacao){
        if (classificacao.equals("Zona Crítica")){
            return "danger";
        }else if (classificacao.equals("Zona de Aperfeiçoamento")){
            return "warning";
        }else if (classificacao.equals("Zona de Qualidade")){
            return "info";
        }else if (classificacao.equals("Zona de Excelência")){
            return "success";
        }
        return "";
    }

}
