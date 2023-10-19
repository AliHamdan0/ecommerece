import { useRouter } from 'next/router';
export function Helpers() {
  const Router = useRouter();

  const urlToObj = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramsObject = {};

    for (const [key, value] of urlParams.entries()) {
      if (paramsObject.hasOwnProperty(key)) {
        paramsObject[key].push(value);
      } else {
        paramsObject[key] = [value];
      }
    }
    return paramsObject;
  };
  const addToUrl = (query) => {
    if (query != undefined) {
      let url = Router.pathname;
      url += url.indexOf('?') == -1 ? '?' : '';
      const urlQuery = urlToObj();
      const fullQuery = { ...urlQuery, ...query };
      // if (Object?.entries(fullQuery).length > 0) {
      // url += url.indexOf('?') == -1 ? '?' : '&';
      Object?.entries(fullQuery)?.forEach(([key, value]) => {
        if (value != '' && value != null && value != [])
          if (Array.isArray(value))
            value.forEach((item) => {
              url += `${key}=${item}&`;
            });
          else url += `${key}=${value}&`;
      });
      history.pushState(null, null, url);
    } else history.pushState(null, null, Router.pathname);
  };
  return [addToUrl];
}
