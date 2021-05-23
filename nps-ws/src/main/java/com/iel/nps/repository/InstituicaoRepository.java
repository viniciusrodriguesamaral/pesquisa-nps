package com.iel.nps.repository;

import com.iel.nps.model.Instituicao;
import com.iel.nps.model.Pesquisa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    @Query(" from Instituicao i where i.token  = :token ")
    Instituicao buscaInstituicao(@Param("token") String token);

}
