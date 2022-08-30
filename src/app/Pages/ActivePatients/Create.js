import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { OverlayTrigger, Button, Tooltip, Form } from 'react-bootstrap';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../Utils/Constants';
import { CreateFile } from "../../Redux/actions/FileActions"
import {
    OpenApplicantmodal, OpenBodycontrolformmodal, OpenDiagnosismodal, OpenDisabilityformmodal, OpenDisabledhealthboardreportmodal,
    OpenFirstadmissionsformmodal, OpenFirstapproachreportmodal, OpenOwnershiprecievemodal, OpenSubmittingmodal, CloseApplicantmodal,
    CloseBodycontrolformmodal, CloseDiagnosismodal, CloseDisabilityformmodal, CloseDisabledhealthboardreportmodal, CloseOwnershiprecievemodal,
    CloseFirstadmissionsformmodal, CloseFirstapproachreportmodal, CloseSubmittingformmodal
} from '../../Redux/actions/ActivepatientActions';
import Createapplicant from './FormsCreate/Createapplicant';
import Createdisabledhealthboardreport from './FormsCreate/Createdisabledhealthboardreport';
import Createfirstapproachreport from './FormsCreate/Createfirstapproachreport';
import Createpatient from './FormsCreate/Createpatient';

export const Create = (props) => {
    const defaultImageSrc = '/img/user.png'

    const imageINIT = {
        id: 0,
        name: "",
        filename: '',
        filefolder: ' ',
        filetype: ' ',
        downloadedcount: 0,
        lastdownloadeduser: ' ',
        lastdownloadedip: ' ',
        filepath: defaultImageSrc,
        file: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: false
    }

    const [patient, setpatient] = useState({
        id: 0,
        firstname: '',
        lastname: '',
        fathername: '',
        mothername: '',
        motherbiologicalaffinity: '',
        ismotheralive: false,
        fatherbiologicalaffinity: '',
        isfatheralive: false,
        countryID: 0,
        dateofbirth: null,
        placeofbirth: '',
        dateofdeath: null,
        placeofdeath: '',
        deathinfo: '',
        gender: '',
        marialstatus: '',
        criminalrecord: '',
        childnumber: 0,
        disabledchildnumber: 0,
        siblingstatus: '',
        sgkstatus: '',
        budgetstatus: '',
        town: '',
        city: '',
        address1: '',
        address2: '',
        country: '',
        contactnumber1: '',
        contactnumber2: '',
        contactname1: '',
        contactname2: '',
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientApplicant, setpatientApplicant] = useState({
        id: 0,
        activepatientid: '',
        firstname: '',
        lastname: '',
        proximitystatus: '',
        countryid: '',
        fathername: '',
        mothername: '',
        dateofbirth: null,
        placeofbirth: '',
        gender: '',
        marialstatus: '',
        jobstatus: '',
        educationstatus: '',
        montlyincome: '',
        town: '',
        city: '',
        address1: '',
        address2: '',
        country: '',
        contactnumber1: '',
        contactnumber2: '',
        contactname1: '',
        contactname2: '',
        appialdate: null,
        appialreason: '',
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientBodycontrolform, setpatientBodycontrolform] = useState({
        id: 0,
        activepatientid: '',
        info: '',
        checkreason: '',
        controllername: '',
        cotrollername1: '',
        controllername2: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientDiagnosis, setpatientDiagnosis] = useState([{
        id: 0,
        reportid: '',
        diagnosisname: '',
        diagnosisstatus: '',
        info: '',
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    }])

    const [patientDisabilitypermitform, setpatientDisabilitypermitform] = useState({
        id: 0,
        activepatientid: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientDisabledhealthboardreport, setpatientDisabledhealthboardreport] = useState({
        id: 0,
        activepatientid: '',
        reportno: '',
        reportname: '',
        sendinginstitution: '',
        appealdate: '',
        disabilityname: '',
        disabilityinfo: '',
        disabilityrate: '',
        disabilitystatus: '',
        wontworkjobs: '',
        ispermanent: '',
        diagnosies: [],
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientFirstadmissionform, setpatientFirstadmissionform] = useState({
        id: 0,
        activepatientID: '',
        patienttype: '',
        locationknowledge: '',
        ishaveitem: '',
        itemstxt: '',
        items: [],
        reportstatus: '',
        reportvaliddate: null,
        reportdegree: '',
        bodycontroldate: null,
        disableorientation: '',
        controllername: '',
        managername: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientFirstapproachreport, setpatientFirstapproachreport] = useState({
        id: 0,
        activepatientID: '',
        acceptancedate: null,
        interviewdate: null,
        healthinitialassesmentdate: null,
        reasonforhealtcare: '',
        ratinginfo: '',
        knowledgesource: '',
        controllername: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientOwnershiprecieve, setpatientOwnershiprecieve] = useState({
        id: 0,
        activepatientid: '',
        itemstxt: '',
        items: [],
        recievername: '',
        recievercountryno: '',
        submittercountryno: '',
        submittername: '',
        witnessname: '',
        witnesscountryid: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientRecieveform, setpatientRecieveform] = useState({
        id: 0,
        activepatientid: '',
        reportdate: null,
        itemstxt: '',
        items: [],
        submittername: '',
        submittercountryid: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [patientSubmittingform, setpatientSubmittingform] = useState({
        id: 0,
        activepatientid: '',
        stocks: [],
        items: [],
        itemstxt: '',
        submitterpersonelname: '',
        recievername: '',
        recievercountryno: '',
        documentcode: '',
        releasedate: null,
        revisiondate: null,
        actualdate: null,
        concurrencyStamp: '',
        createdUser: '',
        updatedUser: '',
        deleteUser: '',
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true
    })

    const [activepatient, setactivepatient] = useState({
        patientID: '',
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
        ratientdiagnosis: '',
        releasedate: null,
        roomnumber: 0,
        floornumber: 0,
        bednumber: 0,
        departmentname: '',
        departmentid: '',
        department: {},
        processid: '',
        iswaitingactivation: false,
        process: {},
        caseId: '',
        case: {},
    })

    const [image, setimage] = useState(imageINIT)


    const goBack = () => {

    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                setimage({
                    ...image,
                    file: imageFile,
                    filepath: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        } else {
            setimage({
                ...image,
                file: null,
                filepath: defaultImageSrc
            })
        }
    }

    const handleonchange = (e) => {
        const { id, value } = e.target
        const data = patient
        data[e.target.id] = e.target.value
        setpatient((patient) => ({ ...patient, [id]: value }));

    }

    const colourStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            console.log({ data, isDisabled, isFocused, isSelected });
            return {
                ...styles,
                backgroundColor: isFocused ? "#8e8d8d" : null,
            };
        }
    };

    return (
        <>
            <Createapplicant
                show={props.Activepatients.isOpenApplicant}
                onHide={() => props.CloseApplicantmodal()}
                data={patientApplicant}
                refreshdata={setpatientApplicant}
                selectstyle={colourStyles}
            />
            <Createdisabledhealthboardreport
                show={props.Activepatients.isOpenDisabledhealthboardreport}
                onHide={() => { props.CloseDisabledhealthboardreportmodal() }}
                data={patientDisabledhealthboardreport}
                refreshdata={setpatientDisabledhealthboardreport}
                selectstyle={colourStyles}
            />
            <Createfirstapproachreport
                show={props.Activepatients.isOpenFirstapproachreport}
                onHide={() => props.CloseFirstapproachreportmodal()}
                data={patientFirstapproachreport}
                refreshdata={setpatientFirstapproachreport}
                selectstyle={colourStyles}
            />
            <div className='Page'>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Hastalar > Yeni</h4>
                            <form className="form-sample" >
                                <div className="row">
                                    <div className="col-9">
                                        <Createpatient
                                            data={patient}
                                            refreshdata={setpatient}
                                            selectstyle={colourStyles}
                                        />
                                    </div>
                                    <div className="col-3 d-flex" style={{ flexDirection: 'column' }}>
                                        <label>Hasta Fotoğrafı</label>
                                        <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px', marginLeft: '15px' }} src={image.filepath} className="card-img-top" />
                                        <div className='form-group'>
                                            <input className={"form-control-file"} style={{ width: '265px' }} accept='image/*' type="file"
                                                onChange={showPreview}
                                            />
                                        </div>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            props.OpenApplicantmodal()
                                        }} style={{ width: '250px' }} className="btn btn-primary m-2">Hasta Yakını Bilgileri</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            props.OpenDisabledhealthboardreportmodal()
                                        }} style={{ width: '250px' }} className="btn btn-primary m-2">Engelli Sağlık Kurul Raporu</button>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            props.OpenFirstapproachreportmodal()
                                        }} style={{ width: '250px' }} className="btn btn-primary m-2">İlk Görüş Ve Değerlendirme Formu</button>
                                    </div>
                                </div>
                                <div className='row d-flex mt-3 pr-5 justify-content-end align-items-right'>
                                    <button onClick={goBack()} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                    <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Ekle</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

const mapStateToProps = (state) => ({
    Activepatients: state.Activepatients
})

const mapDispatchToProps = {
    CreateFile, OpenApplicantmodal, OpenBodycontrolformmodal, OpenDiagnosismodal, OpenDisabilityformmodal,
    OpenDisabledhealthboardreportmodal, OpenFirstadmissionsformmodal, OpenFirstapproachreportmodal, OpenOwnershiprecievemodal, OpenSubmittingmodal,
    CloseApplicantmodal, CloseBodycontrolformmodal, CloseDiagnosismodal, CloseDisabilityformmodal, CloseDisabledhealthboardreportmodal, CloseFirstadmissionsformmodal,
    CloseFirstapproachreportmodal, CloseOwnershiprecievemodal, CloseSubmittingformmodal
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))
