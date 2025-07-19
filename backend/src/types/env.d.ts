declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DATABASE_URL: string;
            API_KEY: string;
            // Add other environment variables as needed
        }
    }
}

// This export is necessary to make the declaration file a module
// and prevent it from being treated as a global script.
export {};
