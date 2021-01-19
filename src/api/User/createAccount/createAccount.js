import { prisma } from "../../../../generated/prisma-client";
export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;

            const exisname = await prisma.$exists.user({ username });
            const exisemail = await prisma.$exists.user({ email });
            if (exisname) {
                throw Error("This username is already taken");
            } else if (exisemail) {
                throw Error("This email is already taken");
            }
            // const exists = await prisma.$exists.user({
            //     OR: [{ username },{ email }]
            // });
            // if (exists) {
            //     throw Error("This username / email is already taken");
            // }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};