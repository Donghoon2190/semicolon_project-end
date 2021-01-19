import { prisma } from "../../../../generated/prisma-client";
export default {
    Query: {
        searchPost: (_, agrs) => prisma.posts({
            where: {
                OR: [
                    { location_starts_with: agrs.term },
                    { caption_contains: agrs.term }]
            }
        }
        )

    }
};