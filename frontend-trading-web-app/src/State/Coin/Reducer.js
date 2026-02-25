import {
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_COIN_LIST_FAILURE,

  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE,

  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,

  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_BY_ID_FAILURE,

  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,

  SEARCH_COIN_REQUEST,
  SEARCH_COIN_SUCCESS,
  SEARCH_COIN_FAILURE

} from "./ActionType";


const initialState = {
  coinList: [],
  top50Coins: [],
  selectedCoin: null,
  coinDetails: null,
  marketChart: {data :[] ,loading:false},
  searchResults: [],
  loading: false,
  error: null
};


const coinReducer = (state = initialState, action) => {
  switch (action.type) {

    // =========================
    // FETCH COIN LIST
    // =========================
    case FETCH_COIN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COIN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        coinList: action.payload,
        error: null
      };

    case FETCH_COIN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    // =========================
    // FETCH TOP 50 COINS
    // =========================
    case FETCH_TOP_50_COINS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_TOP_50_COINS_SUCCESS:
      return {
        ...state,
        loading: false,
        top50Coins: action.payload,
        error: null
      };

    case FETCH_TOP_50_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    // =========================
    // FETCH MARKET CHART
    // =========================
    case FETCH_MARKET_CHART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_MARKET_CHART_SUCCESS:
      return {
        ...state,
        marketChart: {data :action.payload.prices,loading:false},
        error: null
      };

    case FETCH_MARKET_CHART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    // =========================
    // FETCH COIN BY ID
    // =========================
    case FETCH_COIN_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COIN_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedCoin: action.payload,
        error: null
      };

    case FETCH_COIN_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    // =========================
    // FETCH COIN DETAILS
    // =========================
    case FETCH_COIN_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_COIN_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        coinDetails: action.payload,
        error: null
      };

    case FETCH_COIN_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    // =========================
    // SEARCH COIN
    // =========================
    case SEARCH_COIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SEARCH_COIN_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null
      };

    case SEARCH_COIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default coinReducer;