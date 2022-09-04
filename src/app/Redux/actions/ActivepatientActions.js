import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import Popup from "../../Utils/Popup";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLACTIVEPATIENTS_INIT: 'GET_ALLACTIVEPATIENTS_INIT',
    GET_ALLACTIVEPATIENTS_SUCCESS: 'GET_ALLACTIVEPATIENTS_SUCCESS',
    GET_ALLACTIVEPATIENTS_ERROR: 'GET_ALLACTIVEPATIENTS_ERROR',

    GET_SELECTEDACTIVEPATIENT_INIT: 'GET_SELECTEDACTIVEPATIENT_INIT',
    GET_SELECTEDACTIVEPATIENT_SUCCESS: 'GET_SELECTEDACTIVEPATIENT_SUCCESS',
    GET_SELECTEDACTIVEPATIENT_ERROR: 'GET_SELECTEDACTIVEPATIENT_ERROR',

    UPDATE_ACTIVEPATIENT_INIT: 'UPDATE_ACTIVEPATIENT_INIT',
    UPDATE_ACTIVEPATIENT_SUCCESS: 'UPDATE_ACTIVEPATIENT_SUCCESS',
    UPDATE_ACTIVEPATIENT_ERROR: 'UPDATE_ACTIVEPATIENT_ERROR',

    CREATE_ACTIVEPATIENT_INIT: 'CREATE_ACTIVEPATIENT_INIT',
    CREATE_ACTIVEPATIENT_SUCCESS: 'CREATE_ACTIVEPATIENT_SUCCESS',
    CREATE_ACTIVEPATIENT_ERROR: 'CREATE_ACTIVEPATIENT_ERROR',

    CREATE_PATIENTFILE_INIT: `CREATE_PATIENTFILE_INIT`,
    CREATE_PATIENTFILE_SUCCESS: `CREATE_PATIENTFILE_SUCCESS`,
    CREATE_PATIENTFILE_ERROR: `CREATE_PATIENTFILE_ERROR`,

    GET_APPLICANTFORM_INIT: 'GET_APPLICANTFORM_INIT',
    GET_APPLICANTFORM_SUCCESS: 'GET_APPLICANTFORM_SUCCESS',
    GET_APPLICANTFORM_ERROR: 'GET_APPLICANTFORM_ERROR',

    GET_BODYCONTROLFORM_INIT: 'GET_BODYCONTROLFORM_INIT',
    GET_BODYCONTROLFORM_SUCCESS: 'GET_BODYCONTROLFORM_SUCCESS',
    GET_BODYCONTROLFORM_ERROR: 'GET_BODYCONTROLFORM_ERROR',

    GET_DIAGNOSISFORM_INIT: 'GET_DIAGNOSISFORM_INIT',
    GET_DIAGNOSISFORM_SUCCESS: 'GET_DIAGNOSISFORM_SUCCESS',
    GET_DIAGNOSISFORM_ERROR: 'GET_DIAGNOSISFORM_ERROR',

    GET_DISABILITYPERMITFORM_INIT: 'GET_DISABILITYPERMITFORM_INIT',
    GET_DISABILITYPERMITFORM_SUCCESS: 'GET_DISABILITYPERMITFORM_SUCCESS',
    GET_DISABILITYPERMITFORM_ERROR: 'GET_DISABILITYPERMITFORM_ERROR',

    GET_DISABLEDHEALTHBOARDREPORT_INIT: 'GET_DISABLEDHEALTHBOARDREPORT_INIT',
    GET_DISABLEDHEALTHBOARDREPORT_SUCCESS: 'GET_DISABLEDHEALTHBOARDREPORT_SUCCESS',
    GET_DISABLEDHEALTHBOARDREPORT_ERROR: 'GET_DISABLEDHEALTHBOARDREPORT_ERROR',

    GET_FIRSTADMISSIONFORM_INIT: 'GET_FIRSTADMISSIONFORM_INIT',
    GET_FIRSTADMISSIONFORM_SUCCESS: 'GET_FIRSTADMISSIONFORM_SUCCESS',
    GET_FIRSTADMISSIONFORM_ERROR: 'GET_FIRSTADMISSIONFORM_ERROR',

    GET_FIRSTAPPROACHREPORT_INIT: 'GET_FIRSTAPPROACHREPORT_INIT',
    GET_FIRSTAPPROACHREPORT_SUCCESS: 'GET_FIRSTAPPROACHREPORT_SUCCESS',
    GET_FIRSTAPPROACHREPORT_ERROR: 'GET_FIRSTAPPROACHREPORT_ERROR',

    GET_OWNERSHIPRECIEVEFORM_INIT: 'GET_OWNERSHIPRECIEVEFORM_INIT',
    GET_OWNERSHIPRECIEVEFORM_SUCCESS: 'GET_OWNERSHIPRECIEVEFORM_SUCCESS',
    GET_OWNERSHIPRECIEVEFORM_ERROR: 'GET_OWNERSHIPRECIEVEFORM_ERROR',

    GET_RECIEVEFORM_INIT: 'GET_RECIEVEFORM_INIT',
    GET_RECIEVEFORM_SUCCESS: 'GET_RECIEVEFORM_SUCCESS',
    GET_RECIEVEFORM_ERROR: 'GET_RECIEVEFORM_ERROR',

    GET_SUBMITTINGFORM_INIT: 'GET_SUBMITTINGFORM_INIT',
    GET_SUBMITTINGFORM_SUCCESS: 'GET_SUBMITTINGFORM_SUCCESS',
    GET_SUBMITTINGFORM_ERROR: 'GET_SUBMITTINGFORM_ERROR',

    UPDATE_APPLICANTFORM_INIT: 'UPDATE_APPLICANTFORM_INIT',
    UPDATE_APPLICANTFORM_SUCCESS: 'UPDATE_APPLICANTFORM_SUCCESS',
    UPDATE_APPLICANTFORM_ERROR: 'UPDATE_APPLICANTFORM_ERROR',

    UPDATE_BODYCONTROLFORM_INIT: 'UPDATE_BODYCONTROLFORM_INIT',
    UPDATE_BODYCONTROLFORM_SUCCESS: 'UPDATE_BODYCONTROLFORM_SUCCESS',
    UPDATE_BODYCONTROLFORM_ERROR: 'UPDATE_BODYCONTROLFORM_ERROR',

    UPDATE_DIAGNOSISFORM_INIT: 'UPDATE_DIAGNOSISFORM_INIT',
    UPDATE_DIAGNOSISFORM_SUCCESS: 'UPDATE_DIAGNOSISFORM_SUCCESS',
    UPDATE_DIAGNOSISFORM_ERROR: 'UPDATE_DIAGNOSISFORM_ERROR',

    UPDATE_DISABILITYPERMITFORM_INIT: 'UPDATE_DISABILITYPERMITFORM_INIT',
    UPDATE_DISABILITYPERMITFORM_SUCCESS: 'UPDATE_DISABILITYPERMITFORM_SUCCESS',
    UPDATE_DISABILITYPERMITFORM_ERROR: 'UPDATE_DISABILITYPERMITFORM_ERROR',

    UPDATE_DISABLEDHEALTHBOARDREPORT_INIT: 'UPDATE_DISABLEDHEALTHBOARDREPORT_INIT',
    UPDATE_DISABLEDHEALTHBOARDREPORT_SUCCESS: 'UPDATE_DISABLEDHEALTHBOARDREPORT_SUCCESS',
    UPDATE_DISABLEDHEALTHBOARDREPORT_ERROR: 'UPDATE_DISABLEDHEALTHBOARDREPORT_ERROR',

    UPDATE_FIRSTADMISSIONFORM_INIT: 'UPDATE_FIRSTADMISSIONFORM_INIT',
    UPDATE_FIRSTADMISSIONFORM_SUCCESS: 'UPDATE_FIRSTADMISSIONFORM_SUCCESS',
    UPDATE_FIRSTADMISSIONFORM_ERROR: 'UPDATE_FIRSTADMISSIONFORM_ERROR',

    UPDATE_FIRSTAPPROACHREPORT_INIT: 'UPDATE_FIRSTAPPROACHREPORT_INIT',
    UPDATE_FIRSTAPPROACHREPORT_SUCCESS: 'UPDATE_FIRSTAPPROACHREPORT_SUCCESS',
    UPDATE_FIRSTAPPROACHREPORT_ERROR: 'UPDATE_FIRSTAPPROACHREPORT_ERROR',

    UPDATE_OWNERSHIPRECIEVEFORM_INIT: 'UPDATE_OWNERSHIPRECIEVEFORM_INIT',
    UPDATE_OWNERSHIPRECIEVEFORM_SUCCESS: 'UPDATE_OWNERSHIPRECIEVEFORM_SUCCESS',
    UPDATE_OWNERSHIPRECIEVEFORM_ERROR: 'UPDATE_OWNERSHIPRECIEVEFORM_ERROR',

    UPDATE_RECIEVEFORM_INIT: 'UPDATE_RECIEVEFORM_INIT',
    UPDATE_RECIEVEFORM_SUCCESS: 'UPDATE_RECIEVEFORM_SUCCESS',
    UPDATE_RECIEVEFORM_ERROR: 'UPDATE_RECIEVEFORM_ERROR',

    UPDATE_SUBMITTINGFORM_INIT: 'UPDATE_SUBMITTINGFORM_INIT',
    UPDATE_SUBMITTINGFORM_SUCCESS: 'UPDATE_SUBMITTINGFORM_SUCCESS',
    UPDATE_SUBMITTINGFORM_ERROR: 'UPDATE_SUBMITTINGFORM_ERROR',

    REMOVE_SELECTEDACTIVEPATIENT: 'REMOVE_SELECTEDACTIVEPATIENT',

    UPDATE_DEPARTMENTUUI_INIT: "UPDATE_DEPARTMENTUUI_INIT",
    UPDATE_DEPARTMENTUUI_SUCCESS: "UPDATE_DEPARTMENTUUI_SUCCESS",
    UPDATE_DEPARTMENTUUI_ERROR: "UPDATE_DEPARTMENTUUI_ERROR",

    OPEN_APPLICANT_MODAL: 'OPEN_APPLICANT_MODAL',
    OPEN_BODYCONTROLFORM_MODAL: 'OPEN_BODYCONTROLFORM_MODAL',
    OPEN_DIAGNOSIS_MODAL: 'OPEN_DIAGNOSIS_MODAL',
    OPEN_DISABILITYFORM_MODAL: 'OPEN_DISABILITYFORM_MODAL',
    OPEN_DISABLEDHEALTHBOARDREPORT_MODAL: 'OPEN_DISABLEDHEALTHBOARDREPORT_MODAL',
    OPEN_FIRSTADMISSIONSFORM_MODAL: 'OPEN_FIRSTADMISSIONSFORM_MODAL',
    OPEN_FIRSTAPPROACHREPORT_MODAL: 'OPEN_FIRSTAPPROACHREPORT_MODAL',
    OPEN_OWNERSHIPRECIEVE_MODAL: 'OPEN_OWNERSHIPRECIEVE_MODAL',
    OPEN_SUBMITTINGFORM_MODAL: 'OPEN_SUBMITTINGFORM_MODAL',

    CLOSE_APPLICANT_MODAL: 'CLOSE_APPLICANT_MODAL',
    CLOSE_BODYCONTROLFORM_MODAL: 'CLOSE_BODYCONTROLFORM_MODAL',
    CLOSE_DIAGNOSIS_MODAL: 'CLOSE_DIAGNOSIS_MODAL',
    CLOSE_DISABILITYFORM_MODAL: 'CLOSE_DISABILITYFORM_MODAL',
    CLOSE_DISABLEDHEALTHBOARDREPORT_MODAL: 'CLOSE_DISABLEDHEALTHBOARDREPORT_MODAL',
    CLOSE_FIRSTADMISSIONSFORM_MODAL: 'CLOSE_FIRSTADMISSIONSFORM_MODAL',
    CLOSE_FIRSTAPPROACHREPORT_MODAL: 'CLOSE_FIRSTAPPROACHREPORT_MODAL',
    CLOSE_OWNERSHIPRECIEVE_MODAL: 'CLOSE_OWNERSHIPRECIEVE_MODAL',
    CLOSE_SUBMITTINGFORM_MODAL: 'CLOSE_SUBMITTINGFORM_MODAL',
}

export const GetAllActivepatients = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLACTIVEPATIENTS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach(element => {
                console.log('element: ', element);
                element.patientname = element.patient.firstname + " " + element.patient.lastname
                //element.casename = element.data.case.name
            });
            console.log("tamamladım")
            dispatch({ type: ACTION_TYPES.GET_ALLACTIVEPATIENTS_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLACTIVEPATIENTS_ERROR, payload: error }) })
}

export const GetSelectedActivepatient = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.ACTIVEPATIENT}/GetSelectedActivepatient?Guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_ERROR, payload: error }) })
};

export const GetSelectedActivepatientimage = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_PATIENTIMAGE_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.ACTIVEPATIENT}/GetSelectedFile?Guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_PATIENTIMAGE_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_PATIENTIMAGE_ERROR, payload: error }) })
};

export const CreatePatientFile = (Item, historypusher, filename) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/AddImage`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_SUCCESS })
            Popup("Success", "Dosyalar", `Dosya Yüklendi : ${filename}`)
            historypusher.push("/Activepatients")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.ACTIVEPATIENT, "Add")
        })
}

export const CreateActivepatient = (Item, historypusher, image, filename) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_ACTIVEPATIENT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then((res) => {
            const formData = new FormData();
            formData.append('id', image.id);
            formData.append('name', image.name);
            formData.append('filefolder', image.filefolder);
            formData.append('filetype', image.filetype);
            formData.append('downloadedcount', image.downloadedcount);
            formData.append('lastdownloadeduser', image.lastdownloadeduser);
            formData.append('lastdownloadedip', image.lastdownloadedip);
            formData.append('file', image.file);
            formData.append('concurrencyStamp', res.data);
            formData.append('createdUser', image.createdUser);
            formData.append('updatedUser', image.updatedUser);
            formData.append('deleteUser', image.deleteUser);
            formData.append('isActive', image.isActive);
            dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_INIT })
            axios({
                method: `post`,
                url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/AddImage`,
                headers: { Authorization: `Bearer ${GetToken()}` },
                data: formData
            })
                .then(() => {
                    dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_SUCCESS })
                    Popup("Success", "Hastalar", `Hasta Sisteme Eklendi`)
                    dispatch({ type: ACTION_TYPES.CREATE_ACTIVEPATIENT_SUCCESS })
                    historypusher.push("/Activepatients")
                })
                .catch(error => {
                    dispatch({ type: ACTION_TYPES.CREATE_PATIENTFILE_ERROR, payload: error })
                    AxiosErrorHandle(error, ROUTES.ACTIVEPATIENT, "Add")
                })




        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_ACTIVEPATIENT_ERROR, payload: error })
        })
}

export const UpdateActivepatient = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_ACTIVEPATIENT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_ACTIVEPATIENT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDACTIVEPATIENT })
            historypusher.push("/Activepatients")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_ACTIVEPATIENT_ERROR, payload: error })
        })
}

export const DeleteActivepatient = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ACTIVEPATIENT}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_ERROR, payload: error })
        })
}

export const GetApplicant = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_APPLICANTFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetApplicant?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_APPLICANTFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_APPLICANTFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetApplicant")
        })
};

export const GetBodycontrolform = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_BODYCONTROLFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetBodycontrolform?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_BODYCONTROLFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_BODYCONTROLFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetBodycontrolform")
        })
};

export const GetDisabilitypermitform = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_DISABILITYPERMITFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetDisabilitypermitform?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_DISABILITYPERMITFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_DISABILITYPERMITFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetDisabilitypermitform")
        })
};

export const GetDisabledhealthboardreport = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetDisabledhealthboardreport?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetDisabledhealthboardreport")
        })
};

export const GetFirstadmissionform = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_FIRSTADMISSIONFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetFirstadmissionform?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_FIRSTADMISSIONFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_FIRSTADMISSIONFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetFirstadmissionform")
        })
};

export const GetFirstapproachreport = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_FIRSTAPPROACHREPORT_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetFirstapproachreport?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_FIRSTAPPROACHREPORT_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_FIRSTAPPROACHREPORT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetFirstapproachreport")
        })
};

export const GetOwnershiprecieve = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetOwnershiprecieve?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetOwnershiprecieve")
        })
};

export const GetRecieveform = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_RECIEVEFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetRecieveform?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_RECIEVEFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_RECIEVEFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetRecieveform")
        })
};

export const GetSubmittingform = (Guid) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SUBMITTINGFORM_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENTREPORT}/GetSubmittingform?Guid=${Guid}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_SUBMITTINGFORM_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SUBMITTINGFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "GetSubmittingform")
        })
};

export const UpdateApplicant = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateApplicant`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateApplicant")
        })
}

export const UpdateBodycontrolform = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateBodycontrolform`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_APPLICANTFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateApplicant")
        })
}

export const UpdateDisabilitypermitform = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateDisabilitypermitform`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateDisabilitypermitform")
        })
}

export const UpdateDisabledhealthboardreport = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateDisabledhealthboardreport`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateDisabledhealthboardreport")
        })
}

export const UpdateFirstadmissionform = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateFirstadmissionform`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateFirstadmissionform")
        })
}

export const UpdateFirstapproachreport = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateFirstapproachreport`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateFirstapproachreport")
        })
}

export const UpdateOwnershiprecieveModel = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateOwnershiprecieveModel`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateOwnershiprecieveModel")
        })
}

export const UpdateRecieveform = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_RECIEVEFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdateRecieveform`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_RECIEVEFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_RECIEVEFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdateRecieveform")
        })
}

export const UpdatSubmittingform = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_SUBMITTINGFORM_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENTREPORT}/UpdatSubmittingform`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.UPDATE_SUBMITTINGFORM_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_SUBMITTINGFORM_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PATIENTREPORT, "UpdatSubmittingform")
        })
}

export const Clearactivepatient = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDACTIVEPATIENT })
}

export const UpdateDepartmentguid = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_DEPARTMENTUUI_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.DEPARTMENT}/GetSelectedDepartmentbyguid?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.UPDATE_DEPARTMENTUUI_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.UPDATE_DEPARTMENTUUI_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.DEPARTMENT, "GetSelectedDepartmentbyguid")
        })
}

export const OpenApplicantmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_APPLICANT_MODAL })
}
export const OpenBodycontrolformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_BODYCONTROLFORM_MODAL })
}
export const OpenDiagnosismodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_DIAGNOSIS_MODAL })
}
export const OpenDisabilityformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_DISABILITYFORM_MODAL })
}
export const OpenDisabledhealthboardreportmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_DISABLEDHEALTHBOARDREPORT_MODAL })
}
export const OpenFirstadmissionsformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_FIRSTADMISSIONSFORM_MODAL })
}
export const OpenFirstapproachreportmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_FIRSTAPPROACHREPORT_MODAL })
}
export const OpenOwnershiprecievemodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_OWNERSHIPRECIEVE_MODAL })
}
export const OpenSubmittingmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.OPEN_SUBMITTINGFORM_MODAL })
}

export const CloseApplicantmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_APPLICANT_MODAL })
}
export const CloseBodycontrolformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_BODYCONTROLFORM_MODAL })
}
export const CloseDiagnosismodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_DIAGNOSIS_MODAL })
}
export const CloseDisabilityformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_DISABILITYFORM_MODAL })
}
export const CloseDisabledhealthboardreportmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_DISABLEDHEALTHBOARDREPORT_MODAL })
}
export const CloseFirstadmissionsformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_FIRSTADMISSIONSFORM_MODAL })
}
export const CloseFirstapproachreportmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_FIRSTAPPROACHREPORT_MODAL })
}
export const CloseOwnershiprecievemodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_OWNERSHIPRECIEVE_MODAL })
}
export const CloseSubmittingformmodal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.CLOSE_SUBMITTINGFORM_MODAL })
}

