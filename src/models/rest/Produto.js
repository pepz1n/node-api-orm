const produto = (sequelize, DataTypes) => {
    const Produto = sequelize.define(
      'produtos',
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
        preco: {
          type: DataTypes.NUMERIC,
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Produto.sync();
    return Produto;
  };
  
  export default produto;
  