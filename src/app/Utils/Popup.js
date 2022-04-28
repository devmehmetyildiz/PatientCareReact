import cogoToast from 'cogo-toast';

import React from 'react'

function Popup(type,subject, message) {
    const toastoptions = {
        hideAfter: 5,
        position: 'top-right',
        heading: subject
    }
    switch (type) {
        case "Success":
            cogoToast.success(message, toastoptions)
            break;
        case "Error":
            cogoToast.error(message, toastoptions)
            break;
    }    
}

export default Popup

