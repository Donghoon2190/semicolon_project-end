import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares";
export default {
    Mutation: {
        following: async (_, args, { request }) => {
            inAuthenticated(request);
            const { id } = args;
            const { user } = request;
            try {
                await prisma.updateUser({
                    where: { id },
                    data: {
                        followers: {
                            connect: {
                                id: user.id
                            }
                        }
                    }
                })
                return true;
            } catch {
                return false;
            }

        }
    }
};