import axios from 'axios';
import {base_url} from '../utils/constants';
import qs from 'qs';

//THIS CODE IS FOR DEBUGGIN NETWORK CALLES IN CHROME DEVTOOLS
//REMOVE THIS ON PRODUCTION BUILD
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest
//   ? GLOBAL.originalXMLHttpRequest
//   : GLOBAL.XMLHttpRequest;

//Main method for network calls using axios
export const Network = (method, endpoint, headers, data = {}) => {
  return new Promise((resolve, reject) => {
      //cheking network connection
      if (method == 'GET') {
        axios({
          method,
          url: `${base_url}${endpoint}`,
          headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "token": data.token ? data.token : '',
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        axios({
          method,
          url: `${base_url}${endpoint}`,
          data,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      }
  });
};
