import * as SecureStore from 'expo-secure-store';

export default function useJwtToken() {
  const getStoredRefreshToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('refreshToken');
  };

  return { getStoredRefreshToken };
}
