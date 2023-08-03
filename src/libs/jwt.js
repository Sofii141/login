import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

//Funcion que recibe como parametro un id y retorna un token
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
