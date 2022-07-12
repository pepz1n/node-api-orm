const db = require('../models');
const Notas = db.rest.models.notas;


exports.getNotas = async (req, res) => {
  const { id } = req.params;

  try {
    const notas = await Notas.findOne({
      where: {
        id,
      },
    });
    console.log(notas.dataValues);
    if (!notas) {
      return res.status(400).send({
        message: `Não foi encontrado usuário com id ${id}`,
      });
    }

    return res.send(notas);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.createNotas = async (req, res) => {
  const { aluno, materia, nota} = req.body;
  if (!aluno || !materia || !nota) {
    return res.status(400).send({
      message: 'Por favor, informe um aluno uma materia e uma nota para cadastrar um novo Notas!',
    });
  }

  if(nota>10){
    return res.status(400).send({
      message: 'Informe notas de 0 a 10'
    })
  }
  
  try {
    let novoNotas = await Notas.create({
      aluno,
      materia,
      nota,
    });
    return res.send(novoNotas);
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.deleteNotas = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({
      message: 'Por favor, informe o ID do Notas que você está tentando deletar!',
    });
  }

  const notas = await Notas.findOne({
    where: {
      id,
    },
  });

  if (!notas) {
    return res.status(400).send({
      message: `Nenhuma notas encontrado com o id ${id}`,
    });
  }

  try {
    await Notas.destroy();
    return res.send({
      message: `Notas ${id} foi deletado!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};

exports.updateNotas = async (req, res) => {
  const { aluno, nota, materia } = req.body;
  const { id } = req.params;

  const notas = await Notas.findOne({
    where: {
      id,
    },
  });

  if (!notas) {
    return res.status(400).send({
      message: `Nenhuma nota encontrada com o id ${id}`,
    });
  }

  try {
    if (aluno) {
      notas.aluno = aluno;
    }
    if (nota) {
      notas.nota = nota;
    }
    if (materia){
        notas.materia = materia;
    }

    Notas.save();
    return res.send({
      message: `nota ${id} atualizada com sucesso!`,
    });
  } catch (err) {
    return res.status(500).send({
      message: `Erro: ${err.message}`,
    });
  }
};
