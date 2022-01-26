export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const SET_USER_NAME = 'SET_USER_NAME';

export const setAccessToken =
  (accessToken: string | null) => (dispatch: any) => {
    dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
  };

export const setRefreshToken =
  (refreshToken: string | null) => (dispatch: any) => {
    dispatch({ type: SET_REFRESH_TOKEN, payload: refreshToken });
  };

export const setUserName = (username: string | null) => (dispatch: any) => {
  dispatch({ type: SET_USER_NAME, payload: username });
};
