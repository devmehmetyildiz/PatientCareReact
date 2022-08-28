import { ACTION_TYPES } from "../actions/ActivepatientActions"

const INITIAL_STATE = {
    list: [],
    selected_activepatient: {
        id: 0,
        patientID: "",
        patient: {},
        applicant: {},
        bodycontrolform: {},
        diagnosis: {},
        disabilitypermitform: {},
        disabledhealthboardreport: {},
        firstadmissionform: {},
        firstapproachreport: {},
        ownershiprecieve: {},
        recieveform: {},
        submittingform: {},
        approvaldate: null,
        registerdate: null,
        patientdiagnosis: "",
        releasedate: null,
        roomnumber: 0,
        floornumber: 0,
        bednumber: 0,
        processid: "",
        iswaitingactivation: false,
        process: {},
        caseId: "",
        case: {},
        departmentid: "",
        departmentname: "",
        department: {},
        concurrencyStamp: null,
        createdUser: "",
        updatedUser: null,
        deleteUser: null,
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true,
    },
    applicant: {},
    bodycontrolform: {},
    diagnosis: {},
    disabilitypermitform: {},
    disabledhealthboardreport: {},
    firstadmissionform: {},
    firstapproachreport: {},
    ownershiprecieve: {},
    recieveform: {},
    submittingform: {},
    department: {
        id: 0,
        name: "",
        concurrencyStamp: null,
        createdUser: "",
        updatedUser: null,
        deleteUser: null,
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true,
        isAdded: false,
        stationstxt: "",
        stations: []
    },
    isOpenApplicant: false,
    isOpenBodycontrolform: false,
    isOpenDiagnosis: false,
    isOpenDisabilitypermitform: false,
    isOpenDisabledhealthboardreport: false,
    isOpenFirstadmissionform: false,
    isOpenFirstapproachreport: false,
    isOpenOwnershiprecieve: false,
    isOpenRecieveform: false,
    isOpenSubmittingform: false,
    errmsg: "",
    isLoading: false,
    isSelected: false,
    isModalOpen: false
}

export const ActivepatientReducer = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case ACTION_TYPES.GET_ALLACTIVEPATIENTS_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLACTIVEPATIENTS_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLACTIVEPATIENTS_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_SUCCESS:
            return { ...state, selected_activepatient: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_APPLICANTFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_APPLICANTFORM_SUCCESS:
            return { ...state, applicant: payload, isLoading: false }
        case ACTION_TYPES.GET_APPLICANTFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_BODYCONTROLFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_BODYCONTROLFORM_SUCCESS:
            return { ...state, bodycontrolform: payload, isLoading: false }
        case ACTION_TYPES.GET_BODYCONTROLFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_SUCCESS:
            return { ...state, disabilitypermitform: payload, isLoading: false }
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_SUCCESS:
            return { ...state, disabledhealthboardreport: payload, isLoading: false }
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_SUCCESS:
            return { ...state, firstadmissionform: payload, isLoading: false }
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_SUCCESS:
            return { ...state, firstapproachreport: payload, isLoading: false }
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_SUCCESS:
            return { ...state, ownershiprecieve: payload, isLoading: false }
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_RECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_RECIEVEFORM_SUCCESS:
            return { ...state, recieveform: payload, isLoading: false }
        case ACTION_TYPES.GET_RECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SUBMITTINGFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_SUBMITTINGFORM_SUCCESS:
            return { ...state, submittingform: payload, isLoading: false }
        case ACTION_TYPES.GET_SUBMITTINGFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_APPLICANTFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_APPLICANTFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_APPLICANTFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_RECIEVEFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_RECIEVEFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_RECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.REMOVE_SELECTEDACTIVEPATIENT:
            return {
                ...state,
                applicant: {},
                bodycontrolform: {},
                diagnosis: {},
                disabilitypermitform: {},
                disabledhealthboardreport: {},
                firstadmissionform: {},
                firstapproachreport: {},
                ownershiprecieve: {},
                recieveform: {},
                submittingform: {},
                selected_activepatient: INITIAL_STATE.selected_activepatient,
                isSelected: false
            }
        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_INIT:
            return { ...state }
        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_SUCCESS:
            return { ...state, department: payload }
        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_ERROR:
            return { ...state, errmsg: payload }
        default:
            return state;
    }
}