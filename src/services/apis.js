import {Network} from './Network';

export default class Apis {
  static Login = data => {
    return Network('POST', '/login', '', data);
  };

  static AddUser = data => {
    return Network('POST', '/user/add', '', data);
  };
  static GetRoles = data => {
    return Network('GET', '/roles', '', data);
  };
  static GetStates = data => {
    return Network('GET', '/states', '', data);
  };
  static GetCities = data => {
    return Network('GET', `/cities/${data.stateId}`, '', data);
  };
  static GetUserList = data => {
    return Network('GET', `/users`, '', data);
  };
  static GetUserDetails = data => {
    return Network('GET', `/user/details`, '', data);
  };
  static GetUserPincodes = data => {
    return Network('GET', `/user/pincodes`, '', data);
  };
  static GetUserListByPincode = data => {
    return Network('GET', `/users/${data?.pincode}?page=${data.pageNo}`, '', data);
  };
  static SearchUser = data => {
    return Network('POST', `/search`, '', data);
  };

  //survay
  static GetSurvayDetils = data => {
    return Network('GET', `/user/wards/`, '', data);
  };
  static GetSurvayList = data => {
    return Network('GET', `/users/ward/${data?.key}`, '', data);
  };

  static AddOneSurvay = data => {
    return Network('POST', `/ward/survey`, '', data);
  };
  static  GetSliders = data => {
    return Network('GET', `/sliders`, '', data);
  };
  static  GetNotification = data => {
    return Network('GET', `/notifications`, '', data);
  };
}
