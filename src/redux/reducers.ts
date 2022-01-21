import { SET_JWT_TOKEN, SET_USER_NAME } from './actions';

const initialState = {
  jwtToken: undefined,
  username: null,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_JWT_TOKEN:
      return { ...state, name: action.payload };
    case SET_USER_NAME:
      return { ...state, name: action.payload };

    default:
      return state;
  }
}
