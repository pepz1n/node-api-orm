const usuario = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
      'notas',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        aluno: {
          type: DataTypes.STRING,
        },
        materia: {
          type: DataTypes.STRING,
        },
        nota:{
            type: DataTypes.NUMERIC,
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Usuario.sync();
    return Usuario;
  };
  
  export default usuario;
  