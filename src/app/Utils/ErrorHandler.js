import Popup from './Popup';

function ErrorHandler(catcherr,itemname,jobtype) { 
    if(catcherr===undefined){
        Popup("Error","Kullanıcı Kayıt Hatası","Server hatası") 
        return 0 
    }
    if (catcherr.data === undefined) {
        Popup("Error","Kullanıcı Kayıt Hatası","Server'a erişilemiyor") 
        return 0
    }
    else {
        if (catcherr.status === 401) {
            Popup("Error",itemname+' '+jobtype+' hatası','Geçersiz İşlem')  
            return 401
        }
        if (catcherr.status === 404) {
            Popup("Error",'',itemname+' bulunamadı')             
            return 404
        }
        if (catcherr.status === 403) {
            Popup("Error",itemname+' '+jobtype+' hatası','Yetkisiz İşlem')             
            return 403
        }
        if (catcherr.status === 500) {
            Popup("Error",catcherr.data,'')          
            return 500
        }
    }
}

export default ErrorHandler
