import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";

import api from "../../services/api";

import "./style.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();

    const user_id = localStorage.getItem("user");
    const data = new FormData();

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("price", price);
    data.append("techs", techs);

    await api.post("/spots", data, { headers: { user_id } });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="select img" />
      </label>
      <label htmlFor="company">EMPRESA*</label>
      <input
        type="text"
        value={company}
        id="company"
        onChange={event => setCompany(event.target.value)}
        placeholder="Sua empresa incrível"
      />
      <label htmlFor="techs">
        TECNOLOGIAS*<span>(Separadas por virgula)</span>
      </label>
      <input
        type="text"
        value={techs}
        id="techs"
        onChange={event => setTechs(event.target.value)}
        placeholder="Quais tecnologias usam ?"
      />
      <label htmlFor="price">
        VALOR DA DIARIA*<span>(Em branco para gratuito)</span>
      </label>
      <input
        type="text"
        value={price}
        id="price"
        onChange={event => setPrice(event.target.value)}
        placeholder="Quais tecnologias usam ?"
      />
      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
