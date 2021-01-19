import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
export default {
    Mutation: {
        confirmSecret: async (_, args) => {
            const { email, loginSecreat } = args;
            const user = await prisma.user({ email });
            if (user.loginSecreat === loginSecreat) {
                return generateToken(user.id);
            }
            else {
                throw Error("ee");
            }
        }
    }
};