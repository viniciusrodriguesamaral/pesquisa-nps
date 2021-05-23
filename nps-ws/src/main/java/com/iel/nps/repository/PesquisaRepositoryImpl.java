package com.iel.nps.repository;

import com.iel.nps.enums.EnumStatus;
import com.iel.nps.filter.PesquisaFilter;
import com.iel.nps.model.Pesquisa;
import com.iel.nps.util.UtilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.Optional;

public class PesquisaRepositoryImpl implements PesquisaRepositoryQuery{
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UtilRepository utilRepository;

    @Override
    public Optional<Pesquisa> obter(Long id) {
        try{
            String jpql = "select p from Pesquisa p " +
                    "where p.id = :id";

            Pesquisa pesquisa = entityManager.createQuery(jpql, Pesquisa.class)
                    .setParameter("id", id)
                    .getSingleResult();
            return Optional.ofNullable(pesquisa);
        }catch(NoResultException e){
            return Optional.empty();
        }
    }

    @Override
    public Page<Pesquisa> pesquisaResumoPaginado(PesquisaFilter pesquisaFilter, Pageable pageable) {
        StringBuilder jpql                      = new StringBuilder();

        HashMap<String, Object> parametros      = new HashMap<>();

        jpql.append( "select p from Pesquisa p " +
                " join fetch p.empresa e " +
                " where 0 = 0 " +
                " and e.id = :idEmpresa ");

        parametros.put("idEmpresa" , pesquisaFilter.getIdEmpresa());

        jpql.append(" order by p.data ");

        TypedQuery<Pesquisa> query = entityManager.createQuery(jpql.toString(), Pesquisa.class);

        parametros.forEach((chave, valor) -> query.setParameter(chave, valor));
        utilRepository.adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(pesquisaFilter) );
    }

    private Long total(PesquisaFilter pesquisaFilter) {
        StringBuilder jpql              = new StringBuilder();

        HashMap<String, Object> parametros = new HashMap<String, Object>();

        jpql.append(" select count(p.id) from Pesquisa p " +
                " join p.empresa e " +
                " where 0 = 0 " +
                " and e.id = :idEmpresa ");

        parametros.put("idEmpresa" , pesquisaFilter.getIdEmpresa());

        TypedQuery<Long> query = entityManager.createQuery(jpql.toString(), Long.class);

        parametros.forEach((chave, valor) -> query.setParameter(chave, valor));

        return query.getSingleResult();
    }

    @Override
    public Pesquisa buscarPesquisaPorToken(String token) {
        try{
            StringBuilder jpql              = new StringBuilder();
            jpql.append(" select p from Pesquisa p " +
                        "join fetch p.empresa e " +
                        "where p.token = :token and p.status = :status ");

            Pesquisa pesquisa = entityManager.createQuery(jpql.toString(), Pesquisa.class)
                    .setParameter("token", token)
                    .setParameter("status", EnumStatus.ATIVO)
                    .getSingleResult();
            return pesquisa;
        }catch(NoResultException e){
            return null;
        }
    }


}
