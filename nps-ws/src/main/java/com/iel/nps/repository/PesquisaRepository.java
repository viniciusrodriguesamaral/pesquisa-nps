package com.iel.nps.repository;

import com.iel.nps.model.Pesquisa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PesquisaRepository extends JpaRepository<Pesquisa, Long>, PesquisaRepositoryQuery {
//    @Query(" select p from Pesquisa p where p.token  = :token and p.status = 1 ")
//    Pesquisa buscarPesquisaPorToken(@Param("token") String token);


    @Query(" select count(p.id) from Pesquisa p join p.empresa e join e.instituicao i where i.token = :token ")
    long buscaQtdePesquisasInstituicao(@Param("token") String token);
}
