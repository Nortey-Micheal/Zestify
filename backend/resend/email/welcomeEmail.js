import { Resend } from 'resend';
import dotenv from 'dotenv'
import { welcomeEmailTemplate } from '../template/welcomeEmailTemplate.js';

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail ({email,userName}) {
  const { data, error } = await resend.emails.send({
    from: 'Czar <onboarding@resend.dev>',
    to: email,
    subject: "🎉 Welcome to Zestify – Let’s Get Cooking!",
    html: welcomeEmailTemplate.replace('{userName}',userName),
  });

  if (error) {
    throw new Error({ error });
  }

  //console.log({ data });
}

export default sendWelcomeEmail