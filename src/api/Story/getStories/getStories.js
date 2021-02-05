import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        getStories: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();
            return prisma.stories({
                where: {
                    AND:
                        [{
                            user: {
                                id_in: [...following.map(user => user.id), user.id]
                            }
                        },
                        {
                            state:'1'    
                        }
                    ]
                    
                },
               orderBy:"createdAt_DESC"
            });
        }
    }
}; 
