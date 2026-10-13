function BarraPesquisa({
  busca,
  setBusca,
  ordenacao,
  setOrdenacao,
}) {
  return (
    <div className="barra-pesquisa">
      <div className="campo">
        <label htmlFor="busca">Pesquisar por título</label>
        <input
          id="busca"
          type="text"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Ex.: Mario"
        />
      </div>

      <div className="campo campo-ordenacao">
        <label htmlFor="ordenacao">Ordenar</label>
        <select
          id="ordenacao"
          value={ordenacao}
          onChange={(event) => setOrdenacao(event.target.value)}
        >
          <option value="titulo">Título (A-Z)</option>
          <option value="ano">Ano (mais recente)</option>
        </select>
      </div>
    </div>
  );
}

export default BarraPesquisa;
