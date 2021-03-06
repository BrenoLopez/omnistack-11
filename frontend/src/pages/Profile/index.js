import React, { useState, useEffect } from "react";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
  const ongName = localStorage.getItem("ongName");
  const [state, setState] = useState([]);
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();
  useEffect(() => {
    async function loadProfile() {
      const response = await api.get("/profile", {
        headers: {
          authorization: ongId
        }
      });
      setState(response.data);
    }
    loadProfile();
  }, [ongId]);

  async function deleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          authorization: ongId
        }
      });
      setState(state.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente .");
    }
  }
  function logout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={()=>{logout()}}>
          <FiPower size={18} color="E02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>

      <ul>
        {state.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>
              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.value)}
              </p>
              <button
                type="button"
                onClick={() => {
                  deleteIncident(incident.id);
                }}
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
