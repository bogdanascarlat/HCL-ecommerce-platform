import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import multer from "multer";
import mime from "mime-types";
import path from 'path';
import { typeDefs, resolvers } from "./schema/schema.js";
import "dotenv/config";
import { decodeJWT } from "./utils/utils.js"
import { getUserById, updateUserById } from "./repo/user.js"

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    const extension = mime.extension(file.mimetype);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  },
});

const upload = multer({ storage });

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const corsOptions = {
    origin: "http://localhost:3000", // Replace with your client's origin if different
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const authHeader = req.headers.authorization || "";
        return { res, authHeader };
      },
    })
  );

  app.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
      const file = req.file;
  
      if (!file) {
        throw new Error('No file uploaded');
      }
  
      console.log('Received Token:', req.headers.authorization);
  
      const { id } = decodeJWT(req.headers.authorization);
      console.log('Decoded User ID:', id);
  
      const user = await getUserById(id);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Only store the filename.extension part
      const filename = path.parse(file.path).base;
      user.image = filename;
      console.log('File name:', filename);
      console.log('User:', user);

      await updateUserById(id, user);
  
      res.json({ message: 'File uploaded successfully', file: file });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.use("/debug", express.static("public"));

  app.use('/uploads', express.static('uploads'));

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloServer();
