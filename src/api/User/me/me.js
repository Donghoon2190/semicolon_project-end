import { prisma } from "../../../../generated/prisma-client";
// import { USER_FRAGMENT } from "../../../fragments";
import { inAuthenticated } from "../../../middlewares";
export default {
    Query: {
        me: async (_, __, { request }) => {
            inAuthenticated(request)
            const { user } = request;
            const userProfile = await prisma.user({ id: user.id })
            const posts = await prisma.user({ id: user.id }).posts();
            // const userProfile = prisma.user({ id: user.id }).$fragment(USER_FRAGMENT)

            return { user: userProfile, posts }

        }
    }
}