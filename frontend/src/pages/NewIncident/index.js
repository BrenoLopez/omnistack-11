import React, { useState } from "react";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";

export default function NewIncident() {
  const [state, setState] = useState({
    title: "",
    description: "",
    value: ""
  });
  const history = useHistory();
  const ongId = localStorage.getItem("ongId");

  function handleChange(e) {
    e.persist();
    const { name } = e.target;
    const { value } = e.target;
    setState(state => ({ ...state, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/incidents", state, {
        headers: {
          authorization: ongId
        }
      });
      setState({ title: "", description: "", value: "" });
      history.push('/profile');
    } catch (err) {
      alert("Ocorreu um erro ao cadastrar o caso !");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título do caso"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
          <textarea
            placeholder="Descrição"
            name="description"
            value={state.description}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Valor em reais"
            name="value"
            value={state.value}
            onChange={handleChange}
            style={{appearance: 'textfield'}}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
