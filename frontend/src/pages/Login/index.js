import React, { useState } from "react";
import "./styles.css";
import herosImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  function handleLogin(e) {
    e.persist();   
    setId(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await api.post("/sessions", {id});
      localStorage.setItem('ongId',id);
      localStorage.setItem('ongName',response.data.name);
      history.push('/profile');
    }
    catch(err){
      alert('Falha no login tente novamente !');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <input type="text" placeholder="Sua ID"  onChange={handleLogin} value={id}/>
          <button type="submit" className="button">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="Heroes" />
    </div>
  );
}
