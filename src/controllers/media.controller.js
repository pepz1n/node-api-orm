const db = require('../models');
const Notas = db.rest.models.notas;



exports.Media = async (req, res) => {
    const { aluno, materia } = req.body
    let informacoes= []
    try{
         informacoes = await Notas.findAll({
        attributes: ['nota'],
        where:{
            aluno: aluno,
            materia: materia,
        }
        })
        let media1 = pegarMedia(informacoes)
        return res.status(200).send({
            aluno,
            media: media1.toFixed(2),
            materia
        })
    }catch(err){
        return res.status(500).send({
            message: `Erro: ${err.message}`,
        });

    }
    
    

}



const pegarMedia = (notas) =>{
    let somaNotas = 0
    let contador = 0
    notas.forEach(nota => {
        somaNotas += Number(nota.dataValues.nota)
        contador++
    });
    return somaNotas/contador
}