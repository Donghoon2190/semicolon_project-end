import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        delComment: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const delcomment = await prisma.deleteComment({ id });
            return delcomment;
        }
    }
}