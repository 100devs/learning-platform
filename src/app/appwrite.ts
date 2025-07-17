import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

export const account = new Account(client);
export { ID } from 'appwrite';