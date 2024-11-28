import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import client from "../../api/api";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    
      client.get(`/${id}`)
      .then((response) => {
        const book = response.data;
        const Date = book.publishDate;
        const newDate = Date.split('T')
        console.log(newDate);
        setValue("title", book.title);
        setValue("description", book.description);
        setValue("pageCount", book.pageCount);
        setValue("publishDate", newDate[0]);
      })
      .catch((error) => console.error("Erro ao carregar livro", error));
  }, [id, setValue]);

  const onSubmit = (data) => {
    
      client.put(`/${id}`, data)
      .then(() => {
        navigate("/");
        console.log(`Livro editado com sucesso`);
        console.log(data);
      })
      .catch((error) => console.error("Erro ao atualizar livro", error));
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Editar Livro</h2>

        <input
          type="text"
          {...register("title", { required: "Título é obrigatório" })}
          placeholder="Título"
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}

        <input
          type="text"
          {...register("description", { required: "Descrição é obrigatória" })}
          placeholder="Descrição"
        />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}

        <input
          type="number"
          {...register("pageCount", {
            required: "Número de páginas é obrigatório",
          })}
          placeholder="Número de páginas"
        />
        {errors.pageCount && (
          <p className="error-message">{errors.pageCount.message}</p>
        )}

        <input
          type="date"
          {...register("publishDate", {
            required: "Data de publicação é obrigatória",
          })}
          placeholder="Publicado em"
        />
        {errors.publishDate && (
          <p className="error-message">{errors.publishDate.message}</p>
        )}

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditBook;
