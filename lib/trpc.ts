import { createTRPCReact } from "@trpc/react-query";
import { httpLink } from "@trpc/client";
import type { AppRouter } from "@/backend/trpc/app-router";
import superjson from "superjson";
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  const envUrl = process.env.EXPO_PUBLIC_RORK_API_BASE_URL;

  if (Platform.OS === 'web') {
    return envUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8081');
  }

  // For native, prioritize EXPO_PUBLIC_RORK_API_BASE_URL if it's not localhost
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl;
  }

  // Fallback to dev server IP
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    const isTunnel = host.includes('ngrok') || host.includes('expo.direct');
    return isTunnel ? `https://${host}` : `http://${host}:8081`;
  }

  return envUrl || 'http://localhost:8081';
};

export const trpcClient = trpc.createClient({
  links: [
    httpLink({
      url: `${getBaseUrl()}/api/trpc`,
      transformer: superjson,
    }),
  ],
});
