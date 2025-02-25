import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../../api/api";


const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);


  useEffect(() => {
    
      client.get(`/${id}`)
      .then((response) => setBook(response.data))
      .catch((error) =>
        console.error("Erro ao carregar detalhes do livro", error)
      );
  }, [id]);

  if (!book) return <p className="loading">Carregando detalhes do livro...</p>;

  const publishDate = new Date(book.publishDate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container">
      <h2>{book.title}</h2>
      <p>
        <strong>Descrição:</strong> {book.description}
      </p>
      <p>
        <strong>Páginas:</strong> {book.pageCount}
      </p>
      <p>
        <strong>Publicado em:</strong> {publishDate}
      </p>
    </div>
  );
};

export default BookDetails;
