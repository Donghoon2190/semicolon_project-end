import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        uploadStory: async (_, args, { request }) => {
            isAuthenticated(request);
            let newStory;
            const { caption, files, tagUser } = args;
            const { user } = request;
            console.log(tagUser);
            try {
                if (tagUser) {
                    const isFollowing = await prisma.user({ id: user.id }).following({ where: { username_in: tagUser } });
                    console.log(isFollowing);

                    if (isFollowing) {
                        if (isFollowing.length === 1) {
                            newStory = await prisma.createStory({
                                user: { connect: { id: user.id } },
                                tagUser: {
                                    connect: {
                                        username: isFollowing.username
                                    }
                                },
                                caption
                            })
                        } else {
                            newStory = await prisma.createStory({
                                user: { connect: { id: user.id } },
                                caption
                            })
                            isFollowing.map(async folloing =>
                                await prisma.updateStory({
                                    data: {
                                        tagUser: {
                                            connect: {
                                                username: folloing.username
                                            }
                                        },
                                    },
                                    where: { id: newStory.id }
                                })
                            )

                        }

                    }

                } else {
                    newStory = await prisma.createStory({
                        user: { connect: { id: user.id } },
                        caption,
                    })
                }
                files.forEach(async file => await prisma.createFile({
                    url: file,
                    story: {
                        connect: {
                            id: newStory.id
                        }
                    }
                }));
                return newStory;
            }
            catch (e) {
                console.log(e);
            }

        }
    }
}