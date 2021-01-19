import { prisma } from "../../../../generated/prisma-client";
import { inAuthenticated } from "../../../middlewares"

export default {
    Mutation: {
        toggleLike: async (_, args, { request }) => {
            inAuthenticated(request); // 유저값을 받아왔는지 확인하는 구문. 없으면 함수에서 오류를 날림
            console.log(args);
            const { postId } = args;
            const { user } = request;
            const filterOption = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            }
            try {
                const existingLike = await prisma.$exists.like(filterOption);
                if (existingLike) {
                    await prisma.deleteManyLikes(filterOption)
                } else {
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            }
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
}