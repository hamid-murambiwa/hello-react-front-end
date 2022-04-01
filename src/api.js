const initState = {
    greeting: '',
};

const greetingReducer = (state = initState, action) => {
    switch (action.type) {
    case 'FETCHING_GREETING':
      return {
        ...state,
        loaded: true,
      };
      case 'COMPLETE_GREETING':
        return {
          ...state,
          loaded: false,
          greeting: action.payload.greeting,
        };
      default:  
      return state;
    }
};

export const fetchgreeting = () => async (dispatch) => {
  dispatch({ type: 'FETCHING_GREETING' });
  await fetch('https://first-hello-rails-back-end.herokuapp.com/api/v1/greetings')
    .then((response) => response.json())
    .then((data) => {
      dispatch({ type: 'COMPLETE_GREETING', payload: data });
    })
    .catch(() => dispatch({ type: 'FETCHING_GREETING' }))
};

export default greetingReducer;