import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares"

const DELETE = "DELETE";
const EDIT = "EDIT";
export default {
    Mutation: {
        editPost: async (_, agrs, { request }) => {
            inAuthenticated(request);
            const { user } = request;
            const { id, location, caption, action } = agrs;
            const post = await prisma.$exists.post({ id, user: { id: user.id } })
            const aa = ["ewwm", "wetge"];
            // 포스트가 있는지 확인하고 지금 로그인 한 유저가 포스트를 만든 유저인지 확인.
            if (post) {
                if (action === EDIT) {
                    return prisma.updatePost({
                        data: { location, caption },
                        where: { id }
                    })
                } else if (action === DELETE) {
                    return prisma.deletePost({ id })
                }
            } else {
                throw error("No!");
            }

        }
    }
};