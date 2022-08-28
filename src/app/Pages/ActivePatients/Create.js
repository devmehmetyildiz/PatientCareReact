import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { OverlayTrigger, Button, Tooltip, Form } from 'react-bootstrap';
import { MARIALSTATUS, BIOLOGICALAFFINITY } from '../../Utils/Constants';
import Popup from '../../Utils/Popup';
import { CreateFile } from "../../Redux/actions/FileActions"
import Createapplicant from './FormsCreate/Createapplicant';

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
        isActive: false
    })

    const [patientApplicant, setpatientApplicant] = useState({
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
    })

    const [patientBodycontrolform, setpatientBodycontrolform] = useState({
        activepatientid: '',
        info: '',
        checkreason: '',
        controllername: '',
        cotrollername1: '',
        controllername2: '',
    })

    const [patientDiagnosis, setpatientDiagnosis] = useState([{
        reportid: '',
        diagnosisname: '',
        diagnosisstatus: '',
        info: '',
    }])

    const [patientDisabilitypermitform, setpatientDisabilitypermitform] = useState({
        activepatientid: ''
    })

    const [patientDisabledhealthboardreport, setpatientDisabledhealthboardreport] = useState({
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
    })

    const [patientFirstadmissionform, setpatientFirstadmissionform] = useState({
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
    })

    const [patientFirstapproachreport, setpatientFirstapproachreport] = useState({
        activepatientID: '',
        acceptancedate: null,
        interviewdate: null,
        healthinitialassesmentdate: null,
        reasonforhealtcare: '',
        ratinginfo: '',
        knowledgesource: '',
        controllername: '',
    })

    const [patientOwnershiprecieve, setpatientOwnershiprecieve] = useState({
        activepatientid: '',
        itemstxt: '',
        items: [],
        recievername: '',
        recievercountryno: '',
        submittercountryno: '',
        submittername: '',
        witnessname: '',
        witnesscountryid: '',
    })

    const [patientRecieveform, setpatientRecieveform] = useState({
        activepatientid: '',
        reportdate: null,
        itemstxt: '',
        items: [],
        submittername: '',
        submittercountryid: '',
    })

    const [patientSubmittingform, setpatientSubmittingform] = useState({
        activepatientid: '',
        stocks: [],
        items: [],
        itemstxt: '',
        submitterpersonelname: '',
        recievername: '',
        recievercountryno: '',
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
        const data = patient
        data[e.target.id] = e.target.value
        setpatient(data)
    }

    const handleoncheckboxchange = (e) => {
        console.log('e: ', e);
        const data = patient
        data[e.target.name] = e.target.value
        setpatient(data)
        console.log('data: ', data);
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
            <Createapplicant data={patientApplicant} refreshdata={setpatientApplicant} />
            <div className='Page'>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Hastalar > Yeni</h4>
                            <form className="form-sample" >
                                <div className="row">
                                    <div className="col-9">
                                        <div className='row'>
                                            <div className='col-4'>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">İsim</label>
                                                    <Form.Control
                                                        id="firstname"
                                                        value={patient.firstname}
                                                        type="text"
                                                        placeholder="İsim"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Soyisim</label>
                                                    <Form.Control
                                                        id="lastname"
                                                        value={patient.lastname}
                                                        type="text"
                                                        placeholder="Soyisim"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Baba Adı</label>
                                                    <Form.Control
                                                        id="fathername"
                                                        value={patient.fathername}
                                                        type="text"
                                                        placeholder="Baba Adı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Anne Adı</label>
                                                    <Form.Control
                                                        id="mothername"
                                                        value={patient.mothername}
                                                        type="text"
                                                        placeholder="Anne Adı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Baba Yakınlık Durumu</label>
                                                    <div style={{ marginRight: '-5px' }} className='col-12'>
                                                        <Select
                                                            // value={selecteddepartments}
                                                            //  onChange={}
                                                            options={BIOLOGICALAFFINITY}
                                                            placeholder="Seçiniz..."
                                                            styles={colourStyles}
                                                        />
                                                    </div>
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Anne Yakınlık Durumu</label>
                                                    <div style={{ marginRight: '-5px' }} className='col-12'>
                                                        <Select
                                                            // value={selecteddepartments}
                                                            //  onChange={}
                                                            options={BIOLOGICALAFFINITY}
                                                            placeholder="Seçiniz..."
                                                            styles={colourStyles}
                                                        />
                                                    </div>
                                                </Form.Group>
                                                <div className="form-check ">
                                                    <label className="form-check-label ml-10">
                                                        <input
                                                            onChange={(e) => {
                                                                handleoncheckboxchange({
                                                                    target: {
                                                                        name: "ismotheralive",
                                                                        value: e.target.checked,
                                                                    },
                                                                });
                                                            }}
                                                            type="checkbox" key="{item}" className="form-check-input" name="" value={patient.ismotheralive} />
                                                        <i className="input-helper"></i>
                                                        Anne Yaşıyor mu?
                                                    </label>
                                                </div>
                                                <div className="form-check ">
                                                    <label className="form-check-label ml-10">
                                                        <input
                                                            onChange={(e) => {
                                                                handleoncheckboxchange({
                                                                    target: {
                                                                        name: "isfatheralive",
                                                                        value: e.target.checked,
                                                                    },
                                                                });
                                                            }}
                                                            type="checkbox" key="{item}" className="form-check-input" name="" value={patient.isfatheralive} />
                                                        <i className="input-helper"></i>
                                                        Baba Yaşıyor mu?
                                                    </label>
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">TC Kimlik No</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.countryID}
                                                        type="number"
                                                        placeholder="TC Kimlik No"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Doğum Tarihi</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.dateofbirth}
                                                        type="date"
                                                        placeholder="Doğum Tarihi"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Doğum Yeri</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.placeofbirth}
                                                        type="text"
                                                        placeholder="Doğum Yeri"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Tarihi</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.dateofdeath}
                                                        type="date"
                                                        placeholder="Ölüm Tarihi"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Yeri</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.placeofdeath}
                                                        type="text"
                                                        placeholder="Ölüm Yeri"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Ölüm Nedeni</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.deathinfo}
                                                        type="text"
                                                        placeholder="Ölüm Nedeni"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Cinsiyet</label>
                                                    <div style={{ marginRight: '-5px' }} className='col-12'>
                                                        <Select
                                                            // value={selecteddepartments}
                                                            //  onChange={}
                                                            options={[]}
                                                            placeholder="Seçiniz..."
                                                            styles={colourStyles}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className='col-4'>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Medeni Durum</label>
                                                    <div style={{ marginRight: '-5px' }} className='col-12'>
                                                        <Select
                                                            // value={selecteddepartments}
                                                            //  onChange={}
                                                            options={MARIALSTATUS}
                                                            placeholder="Seçiniz..."
                                                            styles={colourStyles}
                                                        />
                                                    </div>
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Sabıka Kaydı</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.criminalrecord}
                                                        type="text"
                                                        placeholder="Sabıka Kaydı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Cocuk Sayısı</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.childnumber}
                                                        type="number"
                                                        placeholder="Cocuk Sayısı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Engelli Çocuk Sayısı</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.disabledchildnumber}
                                                        type="number"
                                                        placeholder="Engelli Çocuk Sayısı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Kardeş Sayısı</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.siblingstatus}
                                                        type="number"
                                                        placeholder="Kardeş Sayısı"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">SGK Durumu</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.sgkstatus}
                                                        type="text"
                                                        placeholder="SGK Durumu"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="row m-2" >
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Gelir Durumu</label>
                                                    <Form.Control
                                                        id="name"
                                                        value={patient.budgetstatus}
                                                        type="text"
                                                        placeholder="Gelir Durumu"
                                                        onChange={handleonchange}
                                                    />
                                                </Form.Group>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex" style={{ flexDirection: 'column' }}>
                                        <label>Hasta Fotoğrafı</label>
                                        <img style={{ objectFit: 'contain', margin: '10px', width: '200px', height: '200px', marginLeft: '15px' }} src={image.filepath} className="card-img-top" />
                                        <div className='form-group'>
                                            <input className={"form-control-file"} style={{ width: '265px' }} accept='image/*' type="file"
                                                onChange={showPreview}
                                            />
                                        </div>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">Engelli Sağlık Kurul Raporu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">İlk Görüş Ve Değerlendirme Formu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">Teslim Alma Formu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">Mülkiyet Teslim Alma Formu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">İlk Kabul Formu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">Genel Vücut Kontrol Formu</button>
                                        <button onClick={goBack()} style={{ width: '250px' }} className="btn btn-primary m-2">Engelli İzin Formu</button>
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

})

const mapDispatchToProps = { CreateFile }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))
