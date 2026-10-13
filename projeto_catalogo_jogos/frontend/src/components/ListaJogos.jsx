import JogoCard from "./JogoCard";

function ListaJogos({ jogos, onExcluir }) {
  if (jogos.length === 0) {
    return <p className="mensagem">Nenhum item cadastrado.</p>;
  }

  return (
    <div className="lista">
      {jogos.map((jogo) => (
        <JogoCard key={jogo.id} jogo={jogo} onExcluir={onExcluir} />
      ))}
    </div>
  );
}

export default ListaJogos;
