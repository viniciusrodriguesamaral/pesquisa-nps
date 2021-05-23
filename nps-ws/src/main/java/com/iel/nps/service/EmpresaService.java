package com.iel.nps.service;

import com.iel.nps.enums.EnumStatus;
import com.iel.nps.exception.NegocioException;
import com.iel.nps.model.Empresa;
import com.iel.nps.repository.EmpresaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public Empresa salvar(Empresa empresa){
        try{
            return empresaRepository.save(empresa);
        }catch ( DataIntegrityViolationException e){
            throw new NegocioException(e.getMessage());
        }
    }

    public Empresa atualizar(Long id, Empresa empresa){
        Empresa empresaSalvo = buscarEmpresaPeloId(id);

        BeanUtils.copyProperties(empresa,empresaSalvo, "id");

        return salvar(empresaSalvo);
    }

    public Empresa buscarEmpresaPeloId(Long id) {
        return empresaRepository.obter(id).orElseThrow(() -> new NegocioException(
                "Empresa não encontrada"
        ));        
    }

    public void atualizarSituacao(Long id, Boolean ativo){
        Empresa empresa = buscarEmpresaPeloId(id);

        if(ativo){
            empresa.setStatus(EnumStatus.ATIVO);
        }else{
            empresa.setStatus(EnumStatus.INATIVO);
        }

        empresaRepository.save(empresa);
    }

    public void excluir(Long empreasId){
        try{

            empresaRepository.deleteById(empreasId);
            empresaRepository.flush();

        }catch(EmptyResultDataAccessException e){
            throw new NegocioException( "Empresa não encontrada" );

        }catch(DataIntegrityViolationException e){
            throw new NegocioException(
                    "Essa empresa não pode ser excluída, pois existe vínculos."
            );
        }
    }

}
