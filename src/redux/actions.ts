export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const SET_USERNAME = 'SET_USERNAME';

export const setAccessToken = (accessToken: string | null) => (dispatch: any) => {
  dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
};

export const setRefreshToken = (refreshToken: string | null) => (dispatch: any) => {
  dispatch({ type: SET_REFRESH_TOKEN, payload: refreshToken });
};

export const setUsername = (username: string | null) => (dispatch: any) => {
  dispatch({ type: SET_USERNAME, payload: username });
};
