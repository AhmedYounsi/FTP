import {
  CFormSelect,
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { GetUsers } from '../../actions/UserActions'

function WorkInfo(props) {
  const [validated, setValidated] = useState(false)
  const [ReportedToArr, setReportedToArr] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
  }

  // Get All User => reportedToList
  const GetAll = async () => {
    const res = await GetUsers()
    let arr = []
    var label,value
    if (res) {
      res.map((el) => {
        label = value = el.name + ' ' + el.lastName
        return arr.push({ label, value, id: el._id })
      })
    }
    setReportedToArr(arr)
  }

  useEffect(() => {
    GetAll()
  }, [])

  const officeItems = [
    { label: '', value: '' },
    {
      label: 'Centre Urbain Nord Tunisie',
      value: 'Centre Urbain Nord Tunisie',
    },
    { label: 'Tozeur Tunisie', value: 'Tozeur Tunisie' },
    { label: 'France', value: 'France' },
  ]

  const departmentItems = [
    { label: '', value: '' },
    { label: 'RH', value: 'RH' },
  ]

  const contractItems = [
    { label: '', value: '' },
    { label: 'CDD', value: 'CDD' },
    { label: 'CDI', value: 'CDI' },
    { label: 'CVP', value: 'CVP' },
  ]

  const postItems = [
    { label: '', value: '' },
    { label: 'Ingenieur', value: 'Ingenieur' },
  ]

  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Offfice</CFormLabel>
        <CFormSelect
          onChange={(e) => props.HandleOffice(e.target.value)}
          aria-label="Default select example"
        >
          {officeItems.map((el, index) => (
            <option key={index} value={el.value}>
              {' '}
              {el.label}{' '}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Department</CFormLabel>

        <CFormSelect
          onChange={(e) => props.HandleDep(e.target.value)}
          aria-label="Default select example"
        >
          {departmentItems.map((el, index) => (
            <option key={index} value={el.value}>
              {' '}
              {el.label}{' '}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Post Title</CFormLabel>

        <CFormSelect
          onChange={(e) => props.HandlePost(e.target.value)}
          aria-label="Default select example"
        >
          {contractItems.map((el, index) => (
            <option key={index} value={el.value}>
              {' '}
              {el.label}{' '}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Contract Type</CFormLabel>
        <CFormSelect
          onChange={(e) => props.HandleContract(e.target.value)}
          aria-label="Default select example"
        >
          {postItems.map((el, index) => (
            <option key={index} value={el.value}>
              {' '}
              {el.label}{' '}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Reported To</CFormLabel>
        <CFormSelect
          onChange={(e) => props.HandleReported(e.target.value)}
          aria-label="Default select example"
        >
          <option></option>
          {ReportedToArr.map((el, index) => (
            <option key={index} value={el.value}>
              {' '}
              {el.label}{' '}
            </option>
          ))}
        </CFormSelect>
      </CCol>
    </CForm>
  )
}

export default WorkInfo
