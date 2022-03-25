export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const SET_USER_ID = 'SET_USER_ID';
export const SET_USERNAME = 'SET_USERNAME';

export const SET_EXPO_PUSH_TOKEN = 'SET_EXPO_PUSH_TOKEN';

export const setAccessToken = (accessToken: string | null) => (dispatch: any) => {
  dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
};

export const setRefreshToken = (refreshToken: string | null) => (dispatch: any) => {
  dispatch({ type: SET_REFRESH_TOKEN, payload: refreshToken });
};

export const setUserId = (id: number | null) => (dispatch: any) => {
  dispatch({ type: SET_USER_ID, payload: id });
};

export const setUsername = (username: string | null) => (dispatch: any) => {
  dispatch({ type: SET_USERNAME, payload: username });
};

export const setExpoPushToken = (expoPushToken: string | null) => (dispatch: any) => {
  dispatch({ type: SET_EXPO_PUSH_TOKEN, payload: expoPushToken });
};
