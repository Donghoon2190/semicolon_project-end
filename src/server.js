import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport"
import { authenticateJwt } from "./passport";
import { uploadController, uploadMiddleware } from "./upload";
const PORT = process.env.PORT;

const server = new GraphQLServer({ schema, context: ({ request }) => ({ request }) })

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () => console.log(`Server running ╰(*°▽°*)╯ on your port (☞ﾟヮﾟ)☞  http://localhost:${PORT} ☜(ﾟヮﾟ☜)`));
