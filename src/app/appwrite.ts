import { Client, Account} from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

export const account = new Account(client);
export { ID } from 'appwrite';