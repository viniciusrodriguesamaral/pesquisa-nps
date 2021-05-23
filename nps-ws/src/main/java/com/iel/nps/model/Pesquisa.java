package com.iel.nps.model;

import com.iel.nps.enums.EnumStatus;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "pesquisa")
public class Pesquisa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    @GeneratedValue(strategy = GenerationType.AUTO)
    private String token;

    private String pergunta;
    private LocalDate data;
    private EnumStatus status;
}
