import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

function useFetch() {
  const Router = useRouter();
  const accessToken = Cookies.get('accessToken');

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    'Access-Control-Allow-Origin': '*',
  };
  async function getFetch(url, header = {}) {
    let res;
    try {
      const response = await axios
        .get(url, { headers: { ...authHeaders, ...header } })
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }
  /////
  async function putFetch(url, body = {}, header = {}) {
    let res;
    try {
      const response = await axios
        .put(url, body, {
          headers: { ...authHeaders, ...header },
        })
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }
  ////
  async function postFetch(url, body = {}, header = {}) {
    let res;
    try {
      const response = await axios
        .post(url, body, {
          headers: { ...authHeaders, ...header },
        })
        .then(function (response) {
          res = response;
        })
        .catch(function (error) {
          console.log(error?.data);
          res = error;
        });
    } catch (e) {
      return null;
    }
    return res;
  }

  return [getFetch, postFetch, putFetch];
}
export default useFetch;
