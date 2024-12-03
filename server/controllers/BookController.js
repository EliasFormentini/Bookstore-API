const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports = {
  async index(req, res) {
    const books = await Book.find();
    return res.json(books);
  },

  async create(req, res) {
    const book = await Book.create(req.body);
    return res.json(book);
  },

  async show(req, res) {
    const book = await Book.findById(req.params.id);
    if (book) {
      return res.json(book);
    }
    return res.send({ msg: "Livro não encontrado, verifique!" });
  },

  async update(req, res) {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (book) {
      return res.json(book);
    }
    return res.send({ msg: "Livro não encontrado, verifique!" });
  },

  async delete(req, res) {
    if (await Book.findByIdAndDelete(req.params.id)) {
      return res.send({ msg: "Registro apagado com sucesso!" });
    }
    return res.send({ msg: "Livro não encontrado, verifique!" });
  },
};
