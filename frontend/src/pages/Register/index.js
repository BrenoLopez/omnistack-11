import React, { useState } from "react";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: ""
  });
  const history = useHistory();

  function handleRegister(e) {
    e.persist();
    const { name } = e.target;
    const { value } = e.target;
    setState(state => ({ ...state, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await api.post("/ongs", state);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    }
    catch(err){
      alert('Ocorreu um erro ao cadastrar a ong !');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça o seu cadastro, entre na plataforma e ajude pessoas a
            encontrarem os casos da sua ONG.
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="E02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome da ONG"
            name="name"
            value={state.name}
            onChange={handleRegister}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={state.email}
            onChange={handleRegister}
          />
          <input
            type="text"
            placeholder="WhatsApp"
            name="whatsapp"
            value={state.whatsapp}
            onChange={handleRegister}
          />

          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              name="city"
              value={state.city}
              onChange={handleRegister}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={state.uf}
              name="uf"
              onChange={handleRegister}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
