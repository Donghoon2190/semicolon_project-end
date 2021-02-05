import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        hideStory: async (_, agrs, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = agrs;
            const story = await prisma.$exists.story({ AND: [{ id, user: { id: user.id } }] })
            
            if (story) {
                await prisma.updateStory({
                    data: { state: "0" },
                    where: {
                        id
                        //5분 전부터 올린 스토리만 보이게 조건절 만들기
                    }
                })
                return true;
            } else {
                return false;
            }

        }
    }
};