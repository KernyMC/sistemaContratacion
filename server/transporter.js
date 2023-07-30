import nodemailer from 'nodemailer';

// Configurar el transporte de Nodemailer con tus credenciales SMTP
const  transporter = nodemailer.createTransport({
	host: 'smtp.elasticemail.com',
	port: 2525,
	secure: false,
	auth: {
	  user: 'registro@espe.edu.ec',
	  pass: '291A4E6A6581387F6EB420861CBCA2214C9A',
	},
  });
export default transporter;