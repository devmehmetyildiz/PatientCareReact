import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

export const TokenValidChecker = () => {
  const cookies = new Cookies();
  let token = cookies.get('X-Access-Token')
  if (token === undefined)
    return false
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false;
  } else {
    return true
  }
}

export const GetToken = () => {
  const cookies = new Cookies();
  let token = cookies.get('X-Access-Token')
  if (token === undefined)
    return ""
  else
    return token
}




