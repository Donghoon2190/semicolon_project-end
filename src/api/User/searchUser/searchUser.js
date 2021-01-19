import { prisma } from "../../../../generated/prisma-client";
export default {
    Query: {
        searchUser: (_, agrs) => prisma.users({
            where: {
                OR: [
                    { username_contains: agrs.term },
                    { firstName_contains: agrs.term },
                    { lastName_contains: agrs.term }]
            }
        }
        )

    }
};