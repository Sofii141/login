import UserSchema from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
//---------------------------------------------------------------------

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    //validacion cuando el correo ya esta en uso
    const userFound = await UserSchema.findOne({ email });

    if (userFound) return res.status(400).json(["The email is already in use"]);
    //convertir un string a numeros aleatorios
    const passwordHashs = await bcrypt.hash(password, 10);

    const user = new UserSchema({
      email,
      username,
      password: passwordHashs,
    });

    const userSave = await user.save();

    //llamada de la funcion que realiza la creacion del token
    const token = await createAccessToken({ id: userSave._id });

    //se envia como respuesta una cookie que contiene el token
    res.cookie("token", token);

    //Datos del usuario registrado
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      createdAt: userSave.createdAt,
      updatedAt: userSave.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // se busca un usuario
    const userFound = await UserSchema.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "user not found" });

    //devuelve un true or false
    const isMatch = await bcrypt.compare(password, userFound.password);

    //se comprueba que la contraseña mandada coincida con la de la base de datos
    if (!isMatch)
      return res.status(400).json({ message: "incorrect password" });

    //se crea token al comprobar que la contraseña es correcta
    const token = await createAccessToken({ id: userFound._id });

    //se envia como respuesta una cookie que contiene el token
    res.cookie("token", token);

    //Datos del usuario registrado
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  //se deja vacio el token al cerrar seccion
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  //llega el usuario guardado en el req ya que antes pasa por otra ruta
  const userFound = await UserSchema.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    //id la cual le pertenece el token
    const userFound = await UserSchema.findById(user.id);

    //si el usuario no existe 
    if (!userFound) return res.status(401).json({ message: "Unaunthorized" });

    //Si el usuario existe 
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
