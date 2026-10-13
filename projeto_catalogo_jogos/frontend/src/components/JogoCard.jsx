function JogoCard({ jogo, onExcluir }) {
  return (
    <article className="card-jogo">
      <div>
        <div className="card-topo">
          <h3>{jogo.titulo}</h3>
          <span className={jogo.disponivel ? "status disponivel" : "status indisponivel"}>
            {jogo.disponivel ? "Disponível" : "Indisponível"}
          </span>
        </div>

        <p>
          <strong>Gênero:</strong> {jogo.genero}
        </p>
        <p>
          <strong>Plataforma:</strong> {jogo.plataforma}
        </p>
        <p>
          <strong>Ano:</strong> {jogo.ano_lancamento}
        </p>
      </div>

      <button className="botao-excluir" onClick={() => onExcluir(jogo.id)}>
        Excluir
      </button>
    </article>
  );
}

export default JogoCard;
