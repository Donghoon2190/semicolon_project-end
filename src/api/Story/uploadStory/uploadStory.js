import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        uploadStory: async (_, args, { request }) => {
            isAuthenticated(request);
            let newStory;
            const { caption, files, tagUser } = args;
            const { user } = request;
            try {
                if (tagUser) {
                    const [tag] = await prisma.user({ id: user.id }).following({ where: { username_in: tagUser } })
                    newStory = await prisma.createStory({
                        tagUser: { connect: { username: tag.username } },
                        user: { connect: { id: user.id } },
                        caption,
                    });
                } else {
                    newStory = await prisma.createStory({
                        user: { connect: { id: user.id } },
                        caption,
                    });
                }
                files.forEach(async file => await prisma.createFile({
                    url: file,
                    story: {
                        connect: {
                            id: newStory.id
                        }
                    }
                }));
                return true;
            }
            catch {
                return false;
            }

        }
    }
}