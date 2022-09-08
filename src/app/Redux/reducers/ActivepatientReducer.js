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
    files:[],
    stocks:[],
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
            return { ...state, list: payload, isLoading: false };
        case ACTION_TYPES.GET_ALLACTIVEPATIENTS_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_SUCCESS:
            return { ...state, selected_activepatient: payload, isLoading: false };
        case ACTION_TYPES.GET_SELECTEDACTIVEPATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.CREATE_ACTIVEPATIENT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.CREATE_ACTIVEPATIENT_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.CREATE_ACTIVEPATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_ACTIVEPATIENT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_ACTIVEPATIENT_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_ACTIVEPATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_APPLICANTFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_APPLICANTFORM_SUCCESS:
            return { ...state, applicant: payload, isLoading: false };
        case ACTION_TYPES.GET_APPLICANTFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_BODYCONTROLFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_BODYCONTROLFORM_SUCCESS:
            return { ...state, bodycontrolform: payload, isLoading: false };
        case ACTION_TYPES.GET_BODYCONTROLFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_SUCCESS:
            return { ...state, disabilitypermitform: payload, isLoading: false };
        case ACTION_TYPES.GET_DISABILITYPERMITFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_SUCCESS:
            return { ...state, disabledhealthboardreport: payload, isLoading: false };
        case ACTION_TYPES.GET_DISABLEDHEALTHBOARDREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_SUCCESS:
            return { ...state, firstadmissionform: payload, isLoading: false };
        case ACTION_TYPES.GET_FIRSTADMISSIONFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_SUCCESS:
            return { ...state, firstapproachreport: payload, isLoading: false };
        case ACTION_TYPES.GET_FIRSTAPPROACHREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_SUCCESS:
            return { ...state, ownershiprecieve: payload, isLoading: false };
        case ACTION_TYPES.GET_OWNERSHIPRECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_RECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_RECIEVEFORM_SUCCESS:
            return { ...state, recieveform: payload, isLoading: false };
        case ACTION_TYPES.GET_RECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.GET_SUBMITTINGFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_SUBMITTINGFORM_SUCCESS:
            return { ...state, submittingform: payload, isLoading: false };
        case ACTION_TYPES.GET_SUBMITTINGFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };


        case ACTION_TYPES.UPDATE_APPLICANTFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_APPLICANTFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_APPLICANTFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_BODYCONTROLFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_DIAGNOSISFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_DISABILITYPERMITFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_DISABLEDHEALTHBOARDREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_FIRSTADMISSIONFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_FIRSTAPPROACHREPORT_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_OWNERSHIPRECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_RECIEVEFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_RECIEVEFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_RECIEVEFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_SUCCESS:
            return { ...state, isLoading: false };
        case ACTION_TYPES.UPDATE_SUBMITTINGFORM_ERROR:
            return { ...state, errmsg: payload, isLoading: false };

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
            };

        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_INIT:
            return { ...state };
        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_SUCCESS:
            return { ...state, department: payload };
        case ACTION_TYPES.UPDATE_DEPARTMENTUUI_ERROR:
            return { ...state, errmsg: payload };

        case ACTION_TYPES.OPEN_APPLICANT_MODAL:
            return { ...state, isOpenApplicant: true };
        case ACTION_TYPES.OPEN_BODYCONTROLFORM_MODAL:
            return { ...state, isOpenBodycontrolform: true };
        case ACTION_TYPES.OPEN_DIAGNOSIS_MODAL:
            return { ...state, isOpenDiagnosis: true };
        case ACTION_TYPES.OPEN_DISABILITYFORM_MODAL:
            return { ...state, isOpenDisabilitypermitform: true };
        case ACTION_TYPES.OPEN_DISABLEDHEALTHBOARDREPORT_MODAL:
            return { ...state, isOpenDisabledhealthboardreport: true };
        case ACTION_TYPES.OPEN_FIRSTADMISSIONSFORM_MODAL:
            return { ...state, isOpenFirstadmissionform: true };
        case ACTION_TYPES.OPEN_FIRSTAPPROACHREPORT_MODAL:
            return { ...state, isOpenFirstapproachreport: true };
        case ACTION_TYPES.OPEN_OWNERSHIPRECIEVE_MODAL:
            return { ...state, isOpenOwnershiprecieve: true };
        case ACTION_TYPES.OPEN_SUBMITTINGFORM_MODAL:
            return { ...state, isOpenSubmittingform: true };
        case ACTION_TYPES.CLOSE_APPLICANT_MODAL:
            return { ...state, isOpenApplicant: false };
        case ACTION_TYPES.CLOSE_BODYCONTROLFORM_MODAL:
            return { ...state, isOpenBodycontrolform: false };
        case ACTION_TYPES.CLOSE_DIAGNOSIS_MODAL:
            return { ...state, isOpenDiagnosis: false };
        case ACTION_TYPES.CLOSE_DISABILITYFORM_MODAL:
            return { ...state, isOpenDisabilitypermitform: false };
        case ACTION_TYPES.CLOSE_DISABLEDHEALTHBOARDREPORT_MODAL:
            return { ...state, isOpenDisabledhealthboardreport: false };
        case ACTION_TYPES.CLOSE_FIRSTADMISSIONSFORM_MODAL:
            return { ...state, isOpenFirstadmissionform: false };
        case ACTION_TYPES.CLOSE_FIRSTAPPROACHREPORT_MODAL:
            return { ...state, isOpenFirstapproachreport: false };
        case ACTION_TYPES.CLOSE_OWNERSHIPRECIEVE_MODAL:
            return { ...state, isOpenOwnershiprecieve: false };
        case ACTION_TYPES.CLOSE_SUBMITTINGFORM_MODAL:
            return { ...state, isOpenSubmittingform: false };

        default:
            return state;
    }
}


