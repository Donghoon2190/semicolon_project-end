import { prisma } from "../../../generated/prisma-client";

export default {
  Story: {
    files: ({ id }) => prisma.story({ id }).files(),
    user: ({ id }) => prisma.story({ id }).user(),
    seenUsers: ({ id }) => prisma.story({ id }).seenUsers(),
    tagUser: ({ id }) => prisma.story({ id }).tagUser(),
  }
};