const cigarro = (sequelize, DataTypes) => {
    const cigarro = sequelize.define(
      'cigarros',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: DataTypes.STRING,
          unique: true,
        },
        marca: {
          type: DataTypes.STRING,
        },
        sabor:{
            type: DataTypes.STRING,
        },
        preco: {
          type: DataTypes.NUMERIC,
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    cigarro.sync();
    return cigarro;
  };
  
  export default cigarro;
  