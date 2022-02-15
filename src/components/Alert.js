import { CAlert } from '@coreui/react'
import React from 'react'

function Alert(props) {
  return (
    <CAlert color="success" dismissible>
      <strong> {props.text} </strong>
    </CAlert>
  )
}

export default Alert
