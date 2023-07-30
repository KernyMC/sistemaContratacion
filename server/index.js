import app from "./app.js";
import { db } from "./db.js";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import transporter from './transporter.js';
//const app = express()
//Comprobación de conexión de la base de datos
db.connect((err) => {
  if (err) {
    console.error(
      "Error en la conexión a la base de datos, error numero:",
      err
    );
    return;
  }
  console.log("Conexión exitosa a la base de datos!");
});
app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.post('/send-email', (req, res) => {
	const { email, otp } = req.body;
	// Configurar el correo electrónico a enviar
	const mailOptions = {
	  from: 'gicalapaqui@espe.edu.ec',
	  to: email,
	  subject: 'Código de verificación',
	  html: `<h1>Ingrese este código para verificar su correo electrónico</h1><br><h2>El código es:</h2>${otp}`,
	};
	// Enviar el correo electrónico usando el transporter
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
		console.error(error);
		res.status(500).json({ message: 'Error sending email' });
	  } else {
		res.json({ message: 'Código enviado' });
	  }
	});
  });
  
//Conexión a un puerto para el servidor
app.listen(8800);
console.log("Servidor en el puerto ", 8800);
