import api from "@/config/api";
import { FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS } from "./ActionType";
import axios from "axios";
import {
  FETCH_TOP_50_COINS_REQUEST,
  FETCH_TOP_50_COINS_SUCCESS,
  FETCH_TOP_50_COINS_FAILURE
} from './ActionType';

export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });

  try {
    const { data } = await api.get(`/coins?page=${page}`);

    dispatch({
      type: FETCH_COIN_LIST_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FETCH_COIN_LIST_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};




export const getTop50Coins = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });

  try {
    const response = await axios.get('http://localhost:5455/coins/top50');

    // Depending on backend, the coins might be in response.data
    const coins = response.data; // if backend sends { data: [...] } then use response.data.data

    dispatch({
      type: FETCH_TOP_50_COINS_SUCCESS,
      payload: coins
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_50_COINS_FAILURE,
      payload: error.message
    });
  }
};



// =======================================
// 3️⃣ FETCH MARKET CHART
// =======================================
export const fetchMarketChart = (coinId, days, jwt) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });

  try {
    const { data } = await api.get(
      `/coins/${coinId}/market-chart?days=${days}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    );

    dispatch({
      type: FETCH_MARKET_CHART_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FETCH_MARKET_CHART_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};



// =======================================
// 4️⃣ FETCH COIN BY ID
// =======================================
export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/coins/${coinId}`);

    dispatch({
      type: FETCH_COIN_BY_ID_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: FETCH_COIN_BY_ID_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};



// =======================================
// 5️⃣ FETCH COIN DETAILS
// =======================================
// Fetch coin details directly
export const fetchCoinDetails = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });

  try {
    const response = await axios.get(`http://localhost:5455/coins/details/${coinId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({
      type: FETCH_COIN_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    console.error("Error fetching coin details:", error);
    dispatch({
      type: FETCH_COIN_DETAILS_FAILURE,
      payload: error.message
    });
  }
};


// =======================================
// 6️⃣ SEARCH COIN
// =======================================
export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });

  try {
    const { data } = await api.get(`/coins/search?q=${keyword}`);

    dispatch({
      type: SEARCH_COIN_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: SEARCH_COIN_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};