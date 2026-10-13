import { useState } from "react";

const estadoInicial = {
  titulo: "",
  genero: "",
  plataforma: "",
  ano_lancamento: "",
  disponivel: true,
};

function FormularioJogo({ onAdicionar }) {
  const [formulario, setFormulario] = useState(estadoInicial);
  const [mensagem, setMensagem] = useState("");

  const alterarCampo = (event) => {
    const { name, value, type, checked } = event.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const enviar = async (event) => {
    event.preventDefault();
    setMensagem("");

    if (
      !formulario.titulo.trim() ||
      !formulario.genero.trim() ||
      !formulario.plataforma.trim() ||
      !formulario.ano_lancamento
    ) {
      setMensagem("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await onAdicionar({
        ...formulario,
        titulo: formulario.titulo.trim(),
        genero: formulario.genero.trim(),
        plataforma: formulario.plataforma.trim(),
        ano_lancamento: Number(formulario.ano_lancamento),
      });

      setFormulario(estadoInicial);
      setMensagem("Jogo cadastrado com sucesso!");
    } catch {
      setMensagem("Não foi possível cadastrar o jogo.");
    }
  };

  return (
    <form onSubmit={enviar}>
      <div className="titulo-formulario">
        <div>
          <p className="tag">NOVO REGISTRO</p>
          <h2>Cadastrar jogo</h2>
        </div>
      </div>

      <div className="grid-form">
        <div className="campo">
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={alterarCampo}
            placeholder="Ex.: Minecraft"
          />
        </div>

        <div className="campo">
          <label htmlFor="genero">Gênero *</label>
          <input
            id="genero"
            name="genero"
            value={formulario.genero}
            onChange={alterarCampo}
            placeholder="Ex.: Aventura"
          />
        </div>

        <div className="campo">
          <label htmlFor="plataforma">Plataforma *</label>
          <input
            id="plataforma"
            name="plataforma"
            value={formulario.plataforma}
            onChange={alterarCampo}
            placeholder="Ex.: PC"
          />
        </div>

        <div className="campo">
          <label htmlFor="ano_lancamento">Ano *</label>
          <input
            id="ano_lancamento"
            name="ano_lancamento"
            type="number"
            min="1950"
            max="2100"
            value={formulario.ano_lancamento}
            onChange={alterarCampo}
            placeholder="2026"
          />
        </div>
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          name="disponivel"
          checked={formulario.disponivel}
          onChange={alterarCampo}
        />
        Jogo disponível
      </label>

      {mensagem && (
        <p className={mensagem.includes("sucesso") ? "sucesso" : "erro-form"}>
          {mensagem}
        </p>
      )}

      <button className="botao-principal" type="submit">
        Cadastrar jogo
      </button>
    </form>
  );
}

export default FormularioJogo;
