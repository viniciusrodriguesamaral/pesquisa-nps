package com.iel.nps.model;

import com.iel.nps.enums.EnumStatus;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "empresa")
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituicao_id")
    private Instituicao instituicao;

    private String cnpj;
    private String razaoSocial;
    private String fantasia;
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private EnumStatus status;

    @Transient
    private String codigoDescricao;

    public String getCodigoDescricao() {
        return  getId() + " - " + getRazaoSocial();
    }

}
