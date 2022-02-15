import { CAlert, CButton, CCol } from "@coreui/react";
import React, { useEffect, useState } from "react";
import GeneralInfo from "./GeneralInfo";
import WorkInfo from "./WorkInfo";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft, cilWarning } from "@coreui/icons";
import { RegisterAction } from "../../actions/Auth";
import { useHistory } from "react-router-dom";
import "./Form.scss";
function New_employee() {
  const history = useHistory();
  // GeneralInfo
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Nom, setNom] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [BirthDay, setBirthDay] = useState("");
  const [Tel, setTel] = useState("");
  //    WorkInfo
  const [Office, setOffice] = useState("");
  const [Dep, setDep] = useState("");
  const [Post, setPost] = useState("");
  const [Contrat, setContrat] = useState("");
  const [Report, setReport] = useState("");

  const [Current, setCurrent] = useState(1);
  const [ErrorMSG, setErrorMSG] = useState(null);
  const Register = async () => {
    if (Current == 1) {
      setCurrent(2);
      return;
    }

    const userData = {
      name: Nom,
      email: Email,
      avatar: "",
      password: Password,
      lastName: Prenom,
      tel: Tel,
      address: Adresse,
      DateOfBirth: BirthDay,
      office: Office,
      departement: Dep,
      post: Post,
      reportsTo: Report,
      typeContrat: Contrat,
      from: "",
    };
    const res = await RegisterAction(userData, history);

    if (res.status == 200) return;
    else {
      setErrorMSG(res.data);
      setCurrent(1);
    }
  };

  useEffect(() => {
    if(ErrorMSG != null)
    setTimeout(() => {
      setErrorMSG(null);
    }, 10000);
  }, [ErrorMSG]);

  return (
    <>
      {ErrorMSG && (
        <CAlert
          dismissible
          color="danger"
          className="d-flex align-items-center"
        >
          <CIcon
            icon={cilWarning}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div> {ErrorMSG} </div>
        </CAlert>
      )}
       
        <div className="transitions">
          <div className={Current == 2 ? "div_1 tran_div_1" : "div_1"}>
            <GeneralInfo
              HandleEmail={(text) => setEmail(text)}
              HandlePassword={(text) => setPassword(text)}
              HandlePrenom={(text) => setPrenom(text)}
              HandleNom={(text) => setNom(text)}
              HandleAdresse={(text) => setAdresse(text)}
              HandleBirthday={(text) => setBirthDay(text)}
              HandleTel={(text) => setTel(text)}
              adresseMail={Email}
            />
          </div>

          <div className={Current == 2 ? "div_2 tran_div_2" : "div_2"}>
            <WorkInfo
              HandleOffice={(text) => setOffice(text)}
              HandleDep={(text) => setDep(text)}
              HandlePost={(text) => setPost(text)}
              HandleContract={(text) => setContrat(text)}
              HandleReported={(text) => setReport(text)}
            />
          </div>
        </div>
     

      <CCol className="button-form" xs={12}>
        {Current == 2 && (
          <CButton
            className="mr-5"
            onClick={() => setCurrent(1)}
            color="primary"
            type="submit"
          >
            Retour
          </CButton>
        )}
        <CButton
          className="Next_btn"
          onClick={() => Register()}
          color="primary"
          type="submit"
        >
          {Current == 1 ? "Suivant" : "Register"}
        </CButton>
      </CCol>
    </>
  );
}

export default New_employee;
