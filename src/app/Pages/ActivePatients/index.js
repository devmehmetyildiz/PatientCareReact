import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GetAllActivepatients, } from '../../Redux/actions/ActivepatientActions'
import { GetAllDepartments } from "../../Redux/actions/DepartmentAction"
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import Datatable from '../../Utils/Datatable';
import { COLUMNTYPES } from '../../Utils/Constants';


export const Index = (props) => {

  useEffect(() => {
    props.GetAllActivepatients()
    props.GetAllDepartments()
  }, [])

  const handleonaddnew = (e) => {
    props.history.push(`/Activepatients/Create/${e.target.id}`)
  }

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      type: 'number',
      Columntype: COLUMNTYPES.NUMBER,
      Formatheader: true,
      hidden: true
    }, {
      dataField: 'patientname',
      text: 'Hasta İsmi',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    },
    {
      dataField: 'approvaldate',
      text: 'Onay Tarihi',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    }, {
      dataField: 'registerdate',
      text: 'Kayıt Tarihi',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    }, {
      dataField: 'patientdiagnosis',
      text: 'Hasta Teşhisi',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    }, {
      dataField: 'roomnumber',
      text: 'Oda No',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    },
    {
      dataField: 'floornumber',
      text: 'Kat No',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    },
    {
      dataField: 'bednumber',
      text: 'Yatak No',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    },
    {
      dataField: 'casename',
      text: 'Durum',
      Columntype: COLUMNTYPES.TEXT,
      Formatheader: true,
    }
  ];



  const isloading = props.Activepatients.isloading || props.Departments.isloading
  const list = props.Activepatients.list
  console.log('list: ', list);
  return (
    <>
      {isloading ? <Spinner /> :
        <div className="row datatable">
          {props.Departments.list.filter(u => u.ishavepatients).map(item =>
            <div key={item} className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                      <h4 className="card-title">Dosyalar</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={handleonaddnew} className="btn btn-primary mr-2">Yeni Hasta Girişi</button>
                    </div>
                  </div>
                  <Datatable columns={columns} data={list} />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  Activepatients: state.Activepatients,
  Departments: state.Departments
})

const mapDispatchToProps = { GetAllActivepatients, GetAllDepartments }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))
