import {
  SET_DATA,
  SET_WAITING,
  SET_TOKEN,
  SET_ERROR,
  SET_LOADING,
  SET_TABLE,
  SET_QUATITY,
  SET_INDEX,
  SET_PLUS,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ZERO,
  OPEN_FAQ,
  CLOSE_FAQ,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true, waiting: false };
    case SET_DATA:
      return {
        ...state,
        loading: false,
        waiting: false,
        error: false,
        questions: action.payload.data.results,
      };
    case SET_WAITING:
      return { ...state, waiting: true, error: true };
    case SET_ERROR:
      return { ...state, error: true };
    case SET_TOKEN:
      return { ...state, token: action.payload.data.token };
    case SET_TABLE:
      return { ...state, table: action.payload.data.trivia_categories };
    case SET_QUATITY:
      return { ...state, tableQuantity: action.payload.data.categories };
    case SET_INDEX:
      return { ...state, index: action.payload.oldIndex + 1 };
    case SET_PLUS:
      return { ...state, correct: action.payload.oldCorrect + 1 };
    case OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case CLOSE_MODAL:
      return { ...state, isModalOpen: false, waiting: true, correct: 0 };
    case OPEN_FAQ:
      return { ...state, isFAQ: true };
    case CLOSE_FAQ:
      return { ...state, isFAQ: false };
    case SET_ZERO:
      return { ...state, index: 0 };
    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};
export default reducer;
