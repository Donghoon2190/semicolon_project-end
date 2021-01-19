import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        addComment: async (_, args, { request }) => {
            inAuthenticated(request);
            const { text, postId } = args;
            const { user } = request;
            const addcomment = await prisma.createComment({
                user: {
                    connect: {
                        id: user.id
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                },
                text
            });
            return addcomment;
        }
    }
}