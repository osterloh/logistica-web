import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../service/api";

import { Container } from "./styles";

interface Pessoa {
  nome: string;
  telefone: string;
}

const Dashboard: React.FC = () => {
  const [pessoas, setPessoa] = useState<Pessoa[]>([]);

  useEffect(() => {
    api.get("/pessoas").then((response) => {
      setPessoa(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <h1>Dashboard</h1>

        {pessoas.map((pessoa) => (
          <div>
            <p>{pessoa.nome}</p>
            <p>{pessoa.telefone}</p>
          </div>
        ))}
        
        <Link to="/cadastro">
          Cadastro
        </Link>
      </Container>
    </>
  );
};

export default Dashboard;
