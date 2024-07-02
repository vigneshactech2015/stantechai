import axios from 'axios';
import qs from 'qs';
import { isNil, get } from 'lodash';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://66837f524102471fa4ca4061.mockapi.io/financetracker/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const AuthorizationKey = 'Authorization';

export const getHttpClient = (
  path,
  method,
  data = undefined,
  params = undefined,
) => {
  const query = !isNil(params)
    ? '?' + qs.stringify(params, { allowDots: true })
    : '';
  const urlPath = path + query;

  return asyncOperation(
    axios({
      method: method,
      url: urlPath,
      data: data,
    }),
  );
};


const asyncOperation = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    const data = get(error, 'response.data');
    const message = get(data, 'message', get(data, 'error'));
    notify(message)
  }

};


const notify = (params = "something went wrong") => toast(params, {
  autoClose: 2000,
  style:{
    backgroundColor:"red",
    color:"white"
  }
});