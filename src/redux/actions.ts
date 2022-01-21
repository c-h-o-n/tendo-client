export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const SET_USER_NAME = 'SET_USER_NAME';

export const setJwtToken = (jwtToken: string) => (dispatch: any) => {
  dispatch({ type: SET_JWT_TOKEN, payload: jwtToken });
};

export const setUserName = (username: string) => (dispatch: any) => {
  dispatch({ type: SET_USER_NAME, payload: username });
};
