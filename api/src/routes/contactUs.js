const express = require("express");
const contactRouter = express.Router()
const nodemailer = require("nodemailer");


// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: 'urculluvalentin@gmail.com', // generated ethereal user
//     pass: 'cmpesvwqtyltqcck', // generated ethereal password
//   },
// })
// transporter.verify().then(() => {
//   console.log('ready for send email')
// })
const transporter = nodemailer.createTransport({
 service:'gmail',
  auth: {
    user: 'techzone.imgbb@gmail.com', // generated ethereal user
    pass: 'kprhwmycdjnwqvrp', // generated ethereal password
  },
})
transporter.verify().then(() => {
      console.log('ready for send email')
    })


contactRouter.post('/', async (req, res) => {

  const {input} = req.body;
  const mailOptions = {
    from:`${input.subject} <${input.email}>`, 
    to: `techzone.imgbb@gmail.com`, 
    subject: `Mensaje de ${input.email}: ${input.subject}`, 
    text: input.message,
  }
  transporter.sendMail(mailOptions,(error,info)=>{
    if (error){
        console.log(error)
        res.send('error')
    }else{
        console.log('email enviado correctamente')
        res.send('Enviado Exitosamente')
    }
  })


  })


    module.exports = contactRouter;
