/* eslint-disable default-param-last */
import {
  GET_PEOPLE,
  GET_PROBLEMS,
  GET_TEAMS,
  GET_LEADERBOARD,
  GET_JUDGEPOINTS,
} from "./GetAllTypes";

const initialState = {
  people: {},
  problems: [],
  teams: {},
  leaderboard: [],
  judgePoints: [],
};

const getAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PEOPLE:
      return {
        ...state,
        people: action.payload,
      };
    case GET_PROBLEMS:
      return {
        ...state,
        problems: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
      };
    case GET_JUDGEPOINTS:
      return {
        ...state,
        judgePoints: action.payload,
      };
    default:
      return state;
  }
};
export default getAllReducer;