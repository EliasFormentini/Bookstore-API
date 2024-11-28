import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import client from "../../api/api";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const livrosFiltrados = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    
      client.get("/")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao listar livros", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Carregando lista de livros...</p>;

  const updateBook = (updateBook) => {
    setBooks(
      books.map((book) => (book.id === updateBook.id ? updateBook : book))
    );
  };

  const deleteBook = (bookId) => {
    if (window.confirm("Deseja apagar este livro?")) {
      
        client.delete(`/${bookId}`)
        .then(() => navigate(0))
        .catch((error) => console.error("Erro ao apagar livro", error));
    }
  };

  console.log(livrosFiltrados)

  return (
    <div className="container">
      <h1>Lista de Livros </h1>
      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar livro"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul>
        {livrosFiltrados.map((book) => (
          <li key={book._id}>
            {book.title}
            <div>
              <button>
                <Link to={`/book/${book._id}`}>Ver Detalhes</Link>
              </button>
              <button>
                <Link to={`/edit/${book._id}`} onClick={() => updateBook(book)}>
                  Editar <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
              </button>
              <button onClick={() => deleteBook(book._id)}>
                Apagar <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
