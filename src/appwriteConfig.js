import { Client, Databases, Account } from "appwrite";

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID_MESSAGES = import.meta.env
  .VITE_COLLECTION_ID_MESSAGES;

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_SECRET); // using env variables

export const databases = new Databases(client);
export const account = new Account(client);

export default client;
