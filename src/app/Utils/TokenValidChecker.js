import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import Popup from './Popup'
import { ROUTES } from './Constants';

export const TokenValidChecker = () => {
  try {
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
  } catch (error) {
    return false;
  }

}

export const GetToken = () => {
  const cookies = new Cookies();
  let token = cookies.get('X-Access-Token')
  if (token === undefined)
    return ""
  else {
    if (TokenValidChecker) {
      return token
    }
    else return ""
  }
}


export const AxiosErrorHandle = (error, controllername, methodname, authname) => {
  console.log('error: ', error);
  if (error.response !== undefined && error.response !== null && error.code !== "ERR_NETWORK") {
    const { response } = error
    switch (response.status) {
      case 500:
        Popup("Error", `${controllername} Server Hatası`, `Hata alınan method = ${methodname}`)
        break;
      case 401:
        if (controllername === ROUTES.AUTH) {
          Popup("Error", `Giriş Hatası`, "Kullanıcı Adı veya Parola Hatalı")
        }
      case 404:
        if (controllername === ROUTES.AUTH) {
          Popup("Error", `Giriş Hatası`, "Kullanıcı Adı veya Parola Hatalı")
        }
        Popup("Error", `${controllername} System`, "Kayıt Bulunamadı")
        break;
      case 403:
        Popup("Error", "Yetki Hatası", `${authname} yetkisi bulunmamaktadır`)
        break;
      default:
        break;
    }
  }
  else {
    Popup("Error", `Server Hatası`, "Server Kapalı Erişilemiyor")
  }
}