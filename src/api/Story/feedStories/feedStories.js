import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        feedStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            let thereisstory = false;

            let gotstory = [];

            //팔로잉한 사람들
            const following = await prisma.user({ id: user.id }).following();
            following.map(follow => {
                thereisstory = prisma.$exists.story({ user: { id: follow.id } });
                if (thereisstory) {
                    gotstory.push(follow.username);
                }
            }
            );
            return prisma.users({ where: { username_in: gotstory } });
        }
    }
}; 
