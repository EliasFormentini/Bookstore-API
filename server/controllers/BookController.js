const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports = {
  async index(req, res) {
    const books = await Book.find();
    return res.json(books);
  },

    // async create(req, res) {
    //   const book = await Book.create(req.body);
    //   return res.json(book);
    // },
  async create(req, res) {
    try {
      const book = await Book.create(req.body);
      return res.json(book);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Erro ao criar o livro", details: error.message });
    }
  },

  async show(req, res) {
    const book = await Book.findById(req.params.id);
    return res.json(book);
  },

  async update(req, res) {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(book);
  },

  async delete(req, res) {
    await Book.findByIdAndDelete(req.params.id);
    return res.send({ msg: "Registro apagado com sucesso!" });
  },
};
