import { Resend } from 'resend';
import dotenv from 'dotenv'
import verificationEmail from '../template/signupTemplate.js';

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationToken ({email,verificationToken}) {
  const { data, error } = await resend.emails.send({
    from: 'Czar <onboarding@resend.dev>',
    to: email,
    subject: "Verify Email Adress",
    html: verificationEmail.replace('{verificationToken}',verificationToken),
  });

  if (error) {
    throw new Error({ error });
  }

  //console.log({ data });
}

export default sendVerificationToken