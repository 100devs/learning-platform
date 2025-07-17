# Appwrite Setup Guide

This guide will help you set up Appwrite for the login functionality in your learning platform.

## Prerequisites

1. An Appwrite account (free tier available)
2. A project created in Appwrite Cloud or self-hosted instance

## Setup Steps

### 1. Create an Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Create a new project
3. Note down your **Project ID** from the project settings

### 2. Configure Authentication

1. In your Appwrite project dashboard, go to **Auth** → **Settings**
2. Enable **Email/Password** authentication method
3. Configure your allowed domains under **Security** → **Domains**
   - For development: add `localhost:3000`
   - For production: add your domain

### 3. Update Configuration

Edit the `src/app/appwrite.ts` file and replace the placeholder values:

```typescript
import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('YOUR_PROJECT_ID'); // Replace with your actual Project ID

export const account = new Account(client);
export { ID } from 'appwrite';
```

**Replace:**
- `YOUR_PROJECT_ID` with your actual Appwrite project ID

### 4. Environment Variables (Optional but Recommended)

For better security, you can use environment variables:

1. Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
```

2. Update `src/app/appwrite.ts`:
```typescript
import { Client, Account, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID');

export const account = new Account(client);
export { ID } from 'appwrite';
```

## Features

The login page includes:

- **User Registration**: Create new accounts with email, password, and name
- **User Login**: Sign in with existing credentials
- **User Logout**: End user sessions
- **Error Handling**: Display helpful error messages
- **Loading States**: Show loading indicators during operations
- **Form Validation**: Basic client-side validation
- **Responsive Design**: Works on all screen sizes

## Usage

1. Navigate to `/login` in your application
2. Use the "Sign in" button to log in with existing credentials
3. Use the "Create new account" button to register a new user
4. After successful login, users will see a welcome message with logout option

## Troubleshooting

### Common Issues

1. **"Project ID not found"**: Make sure you've updated the project ID in `appwrite.ts`
2. **CORS errors**: Ensure your domain is added to the allowed domains in Appwrite settings
3. **Authentication failed**: Check that email/password auth is enabled in your Appwrite project

### Development Tips

- Check the browser console for detailed error messages
- Verify your Appwrite project settings match your configuration
- Test with simple credentials first before implementing complex validation

## Next Steps

After setting up authentication, you can:

1. Add user profile management
2. Implement protected routes
3. Add role-based access control
4. Integrate with your learning platform features