const db = require('../models');
const Produto = db.rest.models.produtos;


exports.getProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findOne({
      where: {
        id,
      },
    });
    console.log(produto.dataValues);
    if (!produto) {
      return res.status(400).send({
        message: `Não foi encontrado usuário com id ${id}`,
      });
    }

    return res.send(produto);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createProduto = async (req, res) => {
  const { nome, marca, preco} = req.body;
  if (!nome || !marca || !preco) {
    return res.status(400).send({
      message: 'Por favor, informe um nome e uma marca para cadastrar um novo produto!',
    });
  }

  let nomeExiste = await Produto.findOne({
    where: {
      nome,
    },
  });

  if (nomeExiste) {
    return res.status(400).send({
      message: 'Já existe um usuário cadastrado com esse nome!',
    });
  }

  try {
    let novoProduto = await Produto.create({
      nome,
      marca,
      preco,
    });
    return res.send(novoProduto);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteProduto = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do produto que você está tentando deletar!',
    });
  }

  const produto = await Produto.findOne({
    where: {
      id,
    },
  });

  if (!produto) {
    return res.status(400).send({
      message: `Nenhum produto encontrado com o id ${id}`,
    });
  }

  try {
    await produto.destroy();
    return res.send({
      message: `produto ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateProduto = async (req, res) => {
  const { nome, marca, preco } = req.body;
  const { id } = req.params;

  const produto = await Produto.findOne({
    where: {
      id,
    },
  });

  if (!produto) {
    return res.status(400).send({
      message: `Nenhum usuário encontrado com o id ${id}`,
    });
  }

  try {
    if (nome) {
      produto.nome = nome;
    }
    if (marca) {
      produto.marca = marca;
    }
    if (preco){
        produto.preco = preco;
    }

    produto.save();
    return res.send({
      message: `Produto ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
