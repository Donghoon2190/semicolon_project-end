import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        delComment: async (_, args, { request }) => {
            inAuthenticated(request);
            const { id } = args;
            const delcomment = await prisma.deleteComment({ id });
            return delcomment;
        }
    }
}