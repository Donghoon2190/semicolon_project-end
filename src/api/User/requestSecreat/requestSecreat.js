import { prisma } from "../../../../generated/prisma-client";
import { generateSecret } from "../../../utils";
import { sendSecretMail } from "../../../utils";
export default {
    Mutation: {
        requestSecret: async (_, agrs) => {
            const { email } = agrs;
            const loginSecreat = generateSecret();
            try {
                console.log(loginSecreat)
                await sendSecretMail(email, loginSecreat);
                await prisma.updateUser({ data: { loginSecreat }, where: { email } });
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }

        },
    }
};