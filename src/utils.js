import { adjectives, nouns } from "./words";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import mgTransport from "nodemailer-mailgun-transport";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

const sendMail = (email) => {
    const options = {
        auth: {
            domain: process.env.DOMAIN,
            apiKey: process.env.API_KEY
        }
    }
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
}


export const sendSecretMail = (address, secret) => {
    const email = {
        from: "Master@semicolon.com",
        to: address,
        subject: "Login Secret for Semicolon ~🔒",
        html: `반가워요! 이 문구는 회원님과 저만의 비밀입니다. (^///^) <br> <Strong>${secret}</Strong> 👈이 문구를 복사해서 붙여넣으세요.`
    }
    return sendMail(email);
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
