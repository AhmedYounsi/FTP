import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSwitch,
  CTooltip,
} from "@coreui/react";
import React, { useState } from "react";
import InputTag from "./InputTag";

function NewFolderModal(props) {
  const [UserSelected, setUserSelected] = useState([]);
  const [IsPrivate, setIsPrivate] = useState(false);
  const [Name, setName] = useState("");
  const Onchange = (text) => {
    const re = /^[A-Za-z]+$/;
    if (text === "" || re.test(text)) {
      setName(text);
      props.new_folder_name(text);
    } else return;
  };
  return (
    <div>
      <CModal
        alignment="center"
        visible={props.ShowModal}
        onClose={() => props.setShowModal(false)}
      >
        <CModalHeader>
          <CModalTitle>New folder</CModalTitle>
        </CModalHeader>

        <CFormInput
          value={Name}
          placeholder="Add Skill"
          style={{ margin: 20, width: "auto" }}
          onChange={(e) => Onchange(e.target.value)}
          type="text"
          placeholder="Folder name ..."
        />
        <div className="Privacy">
          <CFormSwitch onChange={(e) => setIsPrivate(e.target.checked)} />

          {IsPrivate ? (
            <CTooltip
              content="Only you and the selected employees can access to this folder"
              placement="top"
            >
              <p>{"Private"}</p>
            </CTooltip>
          ) : (
            <p>{"public"}</p>
          )}
        </div>

        {IsPrivate && (
          <>
            <div className="Privacy select_emp">
              <span>Select Employee :</span>
            </div>

            <InputTag SendUserSelected={(users) => setUserSelected(users)} />
          </>
        )}
        <CButton
          style={{ margin: 20, marginTop: 0, width: "auto" }}
          onClick={() => {
            props.New_folder({ UserSelected, IsPrivate });
            setIsPrivate(false);
          }}
          color="primary"
        >
          ADD
        </CButton>
      </CModal>
    </div>
  );
}

export default NewFolderModal;
