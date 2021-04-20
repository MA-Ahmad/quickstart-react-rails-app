const userReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_USER': {
      localStorage.setItem('currentUser', JSON.stringify(payload.user));
      return {
        user: payload.user,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default userReducer;
