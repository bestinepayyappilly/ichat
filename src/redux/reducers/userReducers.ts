const initialState = {
  _id: '',
  email: '',

  name: '',
  avatar: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DETAILS': {
      return {
        ...state,
        _id: action.state._id,
        email: action.state.email,
        name: action.state.name,
        avatar: action.state.avatar,
      };
    }
    case 'UPDATE_DETAILS': {
      return {
        ...state,
        _id: action.state._id,
        email: action.state.email,
        name: action.state.name,
        avatar: action.state.avatar,
      };
    }
    default:
      return state;
  }
};
