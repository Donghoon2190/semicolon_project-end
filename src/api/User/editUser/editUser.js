import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares";
export default {
    Mutation: {
        editUser: async (_, args, { request }) => {
            inAuthenticated(request);
            const { username, email, firstName, lastName, bio, avatar } = args;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: { id: user.id },
                    data: {
                        username, email, firstName, lastName, bio, avatar
                    }
                })
                return true;
            } catch (e) {
                console.log(e)
                throw Error
            }
        }
    }
}