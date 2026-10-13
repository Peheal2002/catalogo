import { useEffect, useState } from "react";
import BarraPesquisa from "./components/BarraPesquisa";
import FormularioJogo from "./components/FormularioJogo";
import ListaJogos from "./components/ListaJogos";

const API_URL = "http://127.0.0.1:8000/api/jogos/";

function App() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState("titulo");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarJogos = async (termo = "") => {
    setCarregando(true);
    setErro("");

    try {
      const url = termo
        ? `${API_URL}?nome=${encodeURIComponent(termo)}`
        : API_URL;

      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error("Falha ao consultar a API.");
      }

      const dados = await resposta.json();
      setJogos(dados);
    } catch (error) {
      setErro("Não foi possível carregar os jogos. Verifique se a API está funcionando.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      carregarJogos(busca);
    }, 300);

    return () => clearTimeout(timer);
  }, [busca]);

  const adicionarJogo = async (novoJogo) => {
    setErro("");

    try {
      const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoJogo),
      });

      if (!resposta.ok) {
        throw new Error("Falha ao cadastrar.");
      }

      const jogoCriado = await resposta.json();

      // Atualização do estado: não há window.location.reload().
      setJogos((listaAtual) => [...listaAtual, jogoCriado]);
    } catch (error) {
      setErro("Não foi possível cadastrar o jogo.");
      throw error;
    }
  };

  const excluirJogo = async (id) => {
    const confirmou = window.confirm(
      "Tem certeza que deseja excluir este jogo?"
    );

    if (!confirmou) return;

    setErro("");

    try {
      const resposta = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Falha ao excluir.");
      }

      // Remove somente o registro do estado.
      setJogos((listaAtual) =>
        listaAtual.filter((jogo) => jogo.id !== id)
      );
    } catch (error) {
      setErro("Não foi possível excluir o jogo.");
    }
  };

  const jogosOrdenados = [...jogos].sort((a, b) => {
    if (ordenacao === "ano") {
      return b.ano_lancamento - a.ano_lancamento;
    }

    return a.titulo.localeCompare(b.titulo);
  });

  return (
    <main className="container">
      <header className="cabecalho">
        <div>
          <p className="tag">DESENVOLVIMENTO WEB</p>
          <h1>🎮 Catálogo de Jogos</h1>
          <p className="subtitulo">
            React consumindo uma API REST desenvolvida com Django.
          </p>
        </div>

        <div className="contador">
          <strong>{jogos.length}</strong>
          <span>jogos encontrados</span>
        </div>
      </header>

      <section className="painel">
        <FormularioJogo onAdicionar={adicionarJogo} />
      </section>

      <section className="painel">
        <BarraPesquisa
          busca={busca}
          setBusca={setBusca}
          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
        />

        {erro && <div className="erro">{erro}</div>}

        {carregando ? (
          <p className="mensagem">Carregando...</p>
        ) : (
          <ListaJogos jogos={jogosOrdenados} onExcluir={excluirJogo} />
        )}
      </section>
    </main>
  );
}

export default App;
