# Appwrite Setup Guide

This guide will help you set up Appwrite for this project

## Prerequisites

1. An Appwrite Account - [#100Devs Sign Up Link](https://apwr.dev/100devs) (use our link for free pro credit)
2. A project created in Appwrite Cloud or self-hosted instance

## Setup Steps

### 1. Create an Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Create a new project
3. Note down your **Project ID** from the project settings

### 2. Configure Authentication

1. In your Appwrite project dashboard, go to **Auth** → **Settings**
2. Enable **Email/Password** & **Magic Link** authentication method
3. Configure your allowed domains under **Security** → **Domains**
   - For development: add `localhost:3000`
   - For production: add your domain

### 4. Environment Variables 

1. Change `.env.example` to `.env.local` in your project root

2. **Replace:** 
- `NEXT_PUBLIC_APPWRITE_PROJECT_ID` with your actual Appwrite project ID
- `NEXT_PUBLIC_APPWRITE_ENDPOINT` with your actual Appwrite endpoint that looks like "https://city.cloud.appwrite.io/v1"


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

1. **"Project ID not found"**: Make sure you've updated the project ID in `.env.local`
2. **CORS errors**: Ensure your domain is added to the allowed domains in Appwrite settings
3. **Authentication failed**: Check that email/password auth is enabled in your Appwrite project

