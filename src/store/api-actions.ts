import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { OfferType } from '../types/offers';
import { AppDispatch } from '../types/state';
import { UserData } from '../types/user-data';
import { loadOffers, requireAuthorization, setLoadingOffersStatus, setUserData } from './action';

type ApiThunkConfigObject = {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}

const fetchOffersAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoadingOffersStatus(true));
    const { data } = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setLoadingOffersStatus(false));
    dispatch(loadOffers({ offers: data }));
  }
);

const checkAuthAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const res = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(res.data));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

const loginAction = createAsyncThunk<void, AuthData, ApiThunkConfigObject>(
  'login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const res = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(res.data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

const logoutAction = createAsyncThunk<void, undefined, ApiThunkConfigObject>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export { checkAuthAction, fetchOffersAction, loginAction, logoutAction };
