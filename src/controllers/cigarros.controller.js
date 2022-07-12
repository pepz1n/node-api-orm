const db = require('../models');
const Cigarro = db.rest.models.cigarros;


exports.getCigarro = async (req, res) => {
  const { id } = req.params;

  try {
    const cigarro = await Cigarro.findOne({
      where: {
        id,
      },
    });
    console.log(cigarro.dataValues);
    if (!cigarro) {
      return res.status(400).send({
        message: `Não foi encontrado cigarro com id ${id}`,
      });
    }

    return res.send(cigarro);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createCigarro = async (req, res) => {
  const { nome, marca, preco, sabor} = req.body;
  if (!nome || !marca) {
    return res.status(400).send({
      message: 'Por favor, informe um nome e uma marca para cadastrar um novo cigarro!',
    });
  }

  let nomeExiste = await Cigarro.findOne({
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
    let novoCigarro = await Cigarro.create({
      nome,
      marca,
      sabor,
      preco,
      
    });
    return res.send(novoCigarro);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteCigarro = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do cigarro que você está tentando deletar!',
    });
  }

  const cigarro = await Cigarro.findOne({
    where: {
      id,
    },
  });

  if (!cigarro) {
    return res.status(400).send({
      message: `Nenhum cigarro encontrado com o id ${id}`,
    });
  }

  try {
    await cigarro.destroy();
    return res.send({
      message: `cigarro ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateCigarro = async (req, res) => {
  const { nome, marca, preco, sabor } = req.body;
  const { id } = req.params;

  const cigarro = await Cigarro.findOne({
    where: {
      id,
    },
  });

  if (!cigarro) {
    return res.status(400).send({
      message: `Nenhum cigarro encontrado com o id ${id}`,
    });
  }

  try {
    if (nome) {
      cigarro.nome = nome;
    }
    if (marca) {
      cigarro.marca = marca;
    }
    if(sabor) {
        cigarro.sabor = sabor;
    }
    if (preco){
        cigarro.preco = preco;
    }

    cigarro.save();
    return res.send({
      message: `Cigarro ${id} atualizado com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
