import { prisma } from "../../../../generated/prisma-client";

export default {
    Subscription: {
        notificateMsg: {
            subscribe: (_, args) => {
                const { roomId } = args;
                return prisma.$subscribe.message({
                    AND: [
                        { mutation_in: "CREATED" },
                        { node: { room: { id: roomId } } }
                    ]
                }).node()
            },
            //resolve 위에서 mutation_in에 따라 바뀐 값을 받아옴.
            resolve: payload => payload
        }

    }
};