import * as SecureStore from 'expo-secure-store';

async function getRefreshToken(): Promise<string | null> {
  return await SecureStore.getItemAsync('refreshToken');
}

const TokenService = {
  getRefreshToken,
};

export default TokenService;
