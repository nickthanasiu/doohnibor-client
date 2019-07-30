import {
  GET_PORTFOLIO_BEGIN,
  GET_PORTFOLIO_SUCCESS,
  GET_PORTFOLIO_ERROR,
  GET_PORTFOLIO_AS_NUM,
  GET_PORTFOLIO_INTRA_BEGIN,
  GET_PORTFOLIO_INTRA_SUCCESS,
  GET_PORTFOLIO_INTRA_ERROR,
  SET_SELECTED_TIMESERIES,
} from '../actions/types';


const initialState = {
  portfolioValue: 0,
  portfolioValueAsNum: 0,
  loadingPortfolio: false,
  portfolioError: '',
  portfolioIntradayData: {},
  loadingPortfolioIntra: false,
  portfolioIntradayError: '',

  selectedTimeSeries: '1D',
  portfolioData: {
    '1D': {},
    '1W': {},
    '1M': {}
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PORTFOLIO_BEGIN:
      return {
        ...state,
        loadingPortfolio: true,
        portfolioError: '',
      };
    case GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        loadingPortfolio: false,
        portfolioValue: action.payload.value,
      };
    case GET_PORTFOLIO_ERROR:
      return {
        ...state,
        loadingPortfolio: false,
        portfolioError: action.payload.error,
        portfolioValue: 0,
      };
    case GET_PORTFOLIO_AS_NUM:
      return {
        ...state,
        portfolioValueAsNum: action.payload.numValue,
      };
    case GET_PORTFOLIO_INTRA_BEGIN:
      return {
        ...state,
        loadingPortfolioIntra: true,
        portfolioIntradayError: '',
      };
    case GET_PORTFOLIO_INTRA_SUCCESS:
      return {
        ...state,
        loadingPortfolioIntra: false,
        portfolioIntradayData: action.payload.data,
      };
    case GET_PORTFOLIO_INTRA_ERROR:
      return {
        ...state,
        loadingPortfolioIntra: false,
        portfolioIntradayError: action.payload.error,
        portfolioIntradayData: {},
      };
    case SET_SELECTED_TIMESERIES:
      return {
        ...state,
        selectedTimeSeries: action.payload.timeseries
      };
    default:
      return state;
  }
};

export const getTimespan = state => {
  switch (state.selectedTimeSeries) {
    case '1D':
      return 'Today';
    case '1W':
      return 'Past Week';
    case '1M':
      return 'Past Month';
  }
};