import Apis from '../../services/apis';
import {PROFILE} from '../types';

export const getProfileData = (token) => {
  return dispatch => {
    dispatch({type: PROFILE.LOADING});

    Apis.GetUserDetails({token})
      .then(res => {
        dispatch({type: PROFILE.SUCCESS, payload: res?.data});
      })
      .catch(err => {
        dispatch({type: PROFILE.ERROR, payload: err});
      });
  };
};

export const updateProfile = payload => {
  return dispatch => {
    //     dispatch({type: UPDATE_PROFILE, payload});
  };
};
