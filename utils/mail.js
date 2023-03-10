const nodemailer=require("nodemailer")
//otp
exports.generateOTP=()=>{
let otp=""
  for(let i=0;i<=3;i++){
    const randVal=Math.round(Math.random()*9)
    otp=otp+randVal
  }
  return otp;
}

exports.mailTransport=()=> nodemailer.createTransport({
      //host: "sandbox.smtp.mailtrap.io",
      //port: 2525,
      service:"gmail",
      auth: {
        user: process.env._USERNAME,
        pass: process.env._PASSWORD,
      }
    });

    exports.generateEmailTemplate=code=>{
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset-"UTF_8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
        @media only screen and (max-width:620px){
            h1{
                font-size:20px;
                padding:5px;
            }
        }
        </style>
        </head>
        <body>
        <div>
        <div style="max-width:620px;margin:0 auto:font-family:sans-serif;color:#272727;">
        <h1 style="background:#f6f6f6;padding:10px:text-align:center;color:#272727;">Verify the student's account!</h1>
        <p>Please verify students email to continue , Your verfication code is :</p>
        <p style="width:80px; margin:0 auto;font-weight;bold;
        text-align:center;background:#f6f6f6f;border-radius:5px;
        font-size:25px;">${code}</p>
        </div>
        </div>
        </body>
        </html>
        `
    }    
    
    exports.plainEmailTemplate=(heading,message)=>{
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset-"UTF_8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <style>
        @media only screen and (max-width:620px){
            h1{
                font-size:20px;
                padding:5px;
            }
        }
        </style>
        </head>
        <body>
        <div>
        <div style="max-width:620px;margin:0 auto:font-family:sans-serif;color:#272727;">
        <h1 style="background:#f6f6f6;padding:10px:text-align:center;color:#272727;">${heading}</h1>
        <p style="color:#272727;text-align:center;">${message}</p>
        </div>
        </div>
        </body>
        </html>
        `
    }
   
