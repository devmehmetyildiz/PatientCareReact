import React from 'react'
import cogoToast from 'cogo-toast';

function ErrorHandler(props) {
    const toastoptions = {
        hideAfter: 5,
        position: 'top-right',
        heading: 'İstek Hatası'
    }

    if (props.data == undefined) {
        cogoToast.error("Server'a erişilemiyor", toastoptions)
        return 0
    }
    else {
        if (props.data.status == 401) {          
            cogoToast.error('Uzun Zamandır İşlem Yapılmadı Tekrar Giriş Yapınız', toastoptions)
            return 401
        }
        if (props.data.status == 403) {
            cogoToast.error('Bu İşlem için Yetkiniz Yok', toastoptions)           
            return 403 
        }
        if (props.data.status == 500) {
            cogoToast.error('Server Hatası Gerçekleşti.', toastoptions)
            return 500
        }
    }
}

export default ErrorHandler
