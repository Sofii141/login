//resive como parametro un esquema y retorna un error en caso de que no se cumplan las validaciones del esquema
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // validar el esquema
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
