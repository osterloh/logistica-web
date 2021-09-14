import React, { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import api from "../../service/api";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container } from "./styles";

interface PessoaProps{
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

const Cadastro: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const pessoa = {
    nome: "",
    usuario: {
      email: "",
      senha: ""
    },
    telefone: ""
  }
  const cadastrar = useCallback( async (data: PessoaProps) => {
    try{
      formRef.current?.setErrors({});
      
      pessoa.nome = data.nome;
      pessoa.usuario.email = data.email;
      pessoa.usuario.senha = data.senha;
      pessoa.telefone = data.telefone;

      await api.post("/pessoas", pessoa);

    }catch(err){
      console.log(err);
      return;
    }
  }, []);

  return (
    <>
      <Container>
        <h1>Cadastro</h1>
        <Form ref={formRef} onSubmit={cadastrar}>
          <Input name="nome" placeholder="Informe o nome" />
          <Input name="telefone" placeholder="Telefone com DDD" />
          <Input name="email" placeholder="E-Mail"/>
          <Input name="senha" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Container>
    </>
  );
};

export default Cadastro;
