const dealbaseApiUrl = process.env.NEXT_PUBLIC_DEALBASE_API_URL;
const dealbaseApiVersion = process.env.NEXT_PUBLIC_DEALBASE_API_VERSION;
export const config = {
    dealbaseApiUrl: `${dealbaseApiUrl}/${dealbaseApiVersion}`,
    apiKey: process.env.NEXT_PUBLIC_DEALBASE_API_KEY,
    authToken: process.env.NEXT_PUBLIC_X_AUTH_TOKEN,
};
//# sourceMappingURL=config.js.map