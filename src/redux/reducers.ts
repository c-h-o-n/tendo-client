import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USERNAME } from './actions';

const initialState = {
  accessToken: null,
  refreshToken: null,
  username: null,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case SET_REFRESH_TOKEN:
      return { ...state, refreshToken: action.payload };
    case SET_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  }
}
