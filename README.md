# Next.js ChatGPT With Stream text generator
> Build and customize your own ChatGPT-like web app using Next.js and the OpenAI API. The provided code serves as a foundation, and you can customize it to fit your specific use case. 

## Overview

The application uses the following components:

- Next.js for the frontend and backend server
- The OpenAI API for chat interactions
- Tailwind CSS for styling
- Apideck components for toast notifications and modals

## Getting Started

1.  Clone the repository and navigate to the project directory.
    
2.  Install the required dependencies by running `npm install` or `yarn`.
    
3.  Create a `.env.local` file in the project root and add your OpenAI API key:
    ```
    OPENAI_API_KEY=your_openai_api_key
    ```
4.  Start the development server by running `npm run dev` or `yarn dev`.
    
5.  Open your browser and navigate to `http://localhost:3000` to access the application.
    
6.  You can now interact with the chatbot using the input field at the bottom of the screen.
    

## Customizing the Application

#### Model Selection (Optional)

The current implementation of the application uses the "gpt-4.0-turbo" model for chat interactions. This model provides excellent performance for a wide range of tasks and is the recommended choice for most use cases.

```typescript
const body = JSON.stringify({
  messages,
  model: 'gpt-4', // Replace 'gpt-4.0' with 'your desired model'
  stream: false
})
``` 

