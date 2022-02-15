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
import React, { useState } from 'react'

function GeneralInfo(props) {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom">Email</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandleEmail(e.target.value)}
          type="mail"
          id="validationCustom001"
          required
        />
        <CFormFeedback invalid>Adresse mail non valide.</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Password</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandlePassword(e.target.value)}
          type="password"
          id="validationCustom002"
          required
        />
        <CFormFeedback invalid>mot de passe non valide.</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Confirmer Password</CFormLabel>
        <CFormInput type="password" id="validationCustom02" required />
        <CFormFeedback invalid>mot de passe non valide.</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom00">Nom</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandleNom(e.target.value)}
          type="text"
          id="validationCustom004"
          required
        />
        <CFormFeedback invalid>Nom non valide.</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Prenom</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandlePrenom(e.target.value)}
          type="text"
          id="validationCustom005"
          required
        />
        <CFormFeedback invalid>Prénom non valide.</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Date de naissance</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandleBirthday(e.target.value)}
          type="date"
          id="validationCustom007"
          required
        />
        <CFormFeedback invalid>Prénom non valide.</CFormFeedback>
      </CCol>

      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Adresse</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandleAdresse(e.target.value)}
          type="text"
          id="validationCustom006"
          required
        />
        <CFormFeedback invalid>Adresse non valide.</CFormFeedback>
      </CCol>

      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">Téléphone</CFormLabel>
        <CFormInput
          onChange={(e) => props.HandleTel(e.target.value)}
          type="text"
          id="validationCustom05"
          required
        />
        <CFormFeedback invalid>Numéro non valide.</CFormFeedback>
      </CCol>
   
    </CForm>
  )
}

export default GeneralInfo
