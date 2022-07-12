require('dotenv/config');

export const isAuthenticated = async (req, res, next) => {
  if (!req.query.senha) {
    return res.status(401).send({
      message: 'Precisa da senha',
    });
  } else {
    const { senha } = req.query;
    if (senha == 'forget') {
      return next();
    } else {
      return res.status(401).send({
        message: 'Senha errada!!',
      });
    }
  }
};
