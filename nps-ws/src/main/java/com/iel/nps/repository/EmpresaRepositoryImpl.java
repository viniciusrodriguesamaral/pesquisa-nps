package com.iel.nps.repository;

import com.iel.nps.filter.EmpresaFilter;
import com.iel.nps.model.Empresa;
import com.iel.nps.util.StringUtil;
import com.iel.nps.util.UtilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public class EmpresaRepositoryImpl  implements EmpresaRepositoryQuery{
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private UtilRepository utilRepository;

    @Override
    public Optional<Empresa> obter(Long id) {
        try{
            String jpql = "select e from Empresa e " +
                    "where e.id = :id";

            Empresa empresa = entityManager.createQuery(jpql, Empresa.class)
                    .setParameter("id", id)
                    .getSingleResult();
            return Optional.ofNullable(empresa);
        }catch(NoResultException e){
            return Optional.empty();
        }
    }

    @Override
    public Page<Empresa> pesquisaResumoPaginado(EmpresaFilter empresaFilter, Pageable pageable) {
        StringBuilder jpql                      = new StringBuilder();

        HashMap<String, Object> parametros      = new HashMap<>();

        jpql.append( "select e from Empresa e " +
                " join fetch e.instituicao i " +
                " where 0 = 0 " +
                " and i.token = :token ");

        parametros.put("token" , empresaFilter.getToken());

        if(   StringUtils.hasLength(empresaFilter.getCriterio() )){
            jpql.append(" and ( upper(e.razaoSocial) like :pesquisa  ");
            jpql.append(" or upper(e.fantasia) like :pesquisa ");
            jpql.append(" or upper(e.cnpj) like :pesquisa ) ");

            parametros.put("pesquisa", "%" + StringUtil.removerAcentos( empresaFilter.getCriterio().toUpperCase() ) + "%" );
        }

        jpql.append(" order by e.razaoSocial ");

        TypedQuery<Empresa> query = entityManager.createQuery(jpql.toString(), Empresa.class);

        parametros.forEach((chave, valor) -> query.setParameter(chave, valor));
        utilRepository.adicionarRestricoesDePaginacao(query, pageable);

        return new PageImpl<>(query.getResultList(), pageable, total(empresaFilter) );
    }

    private Long total(EmpresaFilter empresaFilter) {
        StringBuilder jpql              = new StringBuilder();

        HashMap<String, Object> parametros = new HashMap<String, Object>();

        jpql.append(" select count(e.id) from Empresa e " +
                " join e.instituicao i " +
                " where 0 = 0 " +
                " and i.token = :token ");

        parametros.put("token" , empresaFilter.getIdInstituicao());

        if(StringUtils.hasLength(empresaFilter.getCriterio() )){
            jpql.append(" and ( upper(e.razaoSocial) like :pesquisa  ");
            jpql.append(" or upper(e.fantasia) like :pesquisa ");
            jpql.append(" or upper(e.cnpj) like :pesquisa ) ");

            parametros.put("pesquisa", "%" + StringUtil.removerAcentos( empresaFilter.getCriterio().toUpperCase() ) + "%" );
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql.toString(), Long.class);

        parametros.forEach((chave, valor) -> query.setParameter(chave, valor));

        return query.getSingleResult();
    }

    @Override
    public List<Empresa> buscaPorRazaoOrFantasiaOrRegistro(EmpresaFilter empresaFilter) {

        List<Empresa> empresas;
        StringBuilder jpql                      = new StringBuilder();
        HashMap<String, Object> parametros      = new HashMap<String, Object>();

        jpql.append(" select e from Empresa e " +
                    " join e.instituicao i " +
                    " where 0 = 0 " +
                    " and i.id = :idInstituicao " +
                    " and ( upper(e.razaoSocial) like :pesquisa  or " +
                    "       upper(e.fantasia) like :pesquisa  or " +
                    "       e.cnpj like :pesquisa)  ");

        parametros.put("idInstituicao" , empresaFilter.getIdInstituicao());
        parametros.put("pesquisa", "%" + StringUtil.removerAcentos( empresaFilter.getCriterio().toUpperCase()) + "%" );

        TypedQuery<Empresa> query = entityManager.createQuery(jpql.toString(), Empresa.class);

        parametros.forEach((chave, valor) -> query.setParameter(chave, valor));

        empresas = query.getResultList();

        return empresas;
    }

}
