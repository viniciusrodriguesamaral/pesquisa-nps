package com.iel.nps.repository;

import com.iel.nps.model.Resultado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultadoRepository extends JpaRepository<Resultado, Long>, ResultadoRepositoryQuery {

    @Query(" select count(r.id) from Resultado r join r.pesquisa p join p.empresa e join e.instituicao i where i.token = :token ")
    long buscaQtdePesquisasRespondidas(@Param("token") String token);
}
