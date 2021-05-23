package com.iel.nps.repository;

import com.iel.nps.dto.ResultadoPesquisa;
import com.iel.nps.enums.EnumStatus;
import com.iel.nps.filter.PesquisaFilter;
import com.iel.nps.model.Pesquisa;
import com.iel.nps.util.UtilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class ResultadoRepositoryImpl implements ResultadoRepositoryQuery{
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UtilRepository utilRepository;


    @Override
    public ResultadoPesquisa buscaResultadosAgrupados(long idPesquisa) {
        Query query = entityManager.createNativeQuery("SELECT X.classificacao, COUNT(X.RESPOSTA) AS QTDE  FROM ( " +
                                                             "SELECT " +
                                                             "CASE " +
                                                             "  WHEN r.resposta IN (0,1,2,3,4,5,6) THEN 'Detratores' " +
                                                             "  WHEN r.resposta IN (7,8) THEN 'Neutros' " +
                                                             "  WHEN r.resposta IN (9,10) THEN 'Promotores' " +
                                                             "  else '' end as classificacao, " +
                                                             "  r.resposta " +
                                                             " FROM Resultado r WHERE r.pesquisa_id = :idPesquisa " +
                                                             ") X " +
                                                         "GROUP BY X.classificacao ");

        List<Object[]> resultados = query
                .setParameter("idPesquisa", idPesquisa )
                .getResultList();

        ResultadoPesquisa resultadoPesquisa = new ResultadoPesquisa();

        for (Object[] objects : resultados) {
            String tipo = (String) objects[0];
            int qtde = (int) objects[1];

            resultadoPesquisa.setQtdeRespostas( resultadoPesquisa.getQtdeRespostas() + qtde );

            if( tipo.equals("Detratores") ){
                resultadoPesquisa.setQtdeDetratores( qtde );
            }else if( tipo.equals("Neutros") ){
                resultadoPesquisa.setQtdeNeutros( qtde );
            }else if( tipo.equals("Promotores") ){
                resultadoPesquisa.setQtdePromotores( qtde );
            }

        }

        return resultadoPesquisa;
    }
}
