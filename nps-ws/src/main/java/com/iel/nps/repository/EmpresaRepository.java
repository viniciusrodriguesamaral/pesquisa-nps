package com.iel.nps.repository;

import com.iel.nps.model.Empresa;
import com.iel.nps.model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>, EmpresaRepositoryQuery {
    @Query(" select count(e.id) from Empresa e join e.instituicao i where i.token  = :token ")
    long buscaQtdeEmpresasInstituicao(@Param("token") String token);
}
