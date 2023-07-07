import { Client, Databases } from "appwrite";

export const PROJECT_ID = "64a84dfe6373f3d27247";
export const DATABASE_ID = "64a852ecb726639586ee";
export const COLLECTION_ID_MESSAGES = "64a852fe5004f46449d8";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_SECRET); // using env variables

export const databases = new Databases(client);

export default client;
