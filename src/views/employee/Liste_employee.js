import {
  CTableDataCell,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CFormInput,
  CFormLabel,
  CCol,
  CButton,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { DelUser, GetUsers } from "../../actions/UserActions";
import Alert from "../../components/Alert";
import avatar1 from "../../assets/images/avatars/1.jpg";
import CIcon from "@coreui/icons-react";

function Liste_employee() {
  const location = useLocation();
  const [isSaved, setisSaved] = useState(false);
  const [Data, setData] = useState([]);
  const [DataFiltred, setDataFiltred] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Sorted, setSorted] = useState(null);
  const [Deleted_id, setDeleted_id] = useState([]);

  const TokenReducer = useSelector((state) => state.TokenReducer);
  const history = useHistory();
  const Get_all = async () => {
    setLoading(true);
    const res = await GetUsers();
    if (res) {
      setData(res);
      setDataFiltred(res);
      setLoading(false);
    }
  };
  useEffect(() => {
    Get_all();
    if (location.state?.userIsSaved) setisSaved(true);
  }, []);

  useEffect(() => {
    if (isSaved)
      setTimeout(() => {
        setisSaved(false);
      }, 3000);
  }, [isSaved]);

  const Search = (e) => {
    const text = e.target.value.toLowerCase();
    let arr = Data.filter((el) => {
      return (
        `${el.name} +' '+ ${el.lastName}`.toLowerCase().includes(text) ||
        el.email.toLowerCase().includes(text)
      );
    });
    setDataFiltred(arr);
  };

  const SortBy = (att) => {
    setSorted(att);
    let arr = [...DataFiltred];

    if (!Sorted) {
      arr.sort((a, b) => (a[att] < b[att] ? 1 : -1));
      setDataFiltred(arr);
    } else {
      arr.sort((a, b) => (a[att] > b[att] ? 1 : -1));
      setDataFiltred(arr);
      setSorted(null);
    }
  };

  const DeleteEmp = async () => {
    setLoading(true);
    const res = await DelUser(TokenReducer, Deleted_id);
    setData(res.data);
    setDataFiltred(res.data);
    setLoading(false);
  };

  const ToDelete = (id) => {
    // let arr = [...Deleted_id];
    // const i = arr.findIndex((el) => el == id);
    // if (i == -1) {
    //   arr.push(id);
    // } else arr.splice(i, 1);
    if (Deleted_id.includes(id)) {
      setDeleted_id([]);
      return;
    }
    let arr = [];
    arr.push(id);
    setDeleted_id(arr);
  };

  const convertDate = (date) => {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, "0");
    var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = date.getFullYear();

    return `Registered : ${dd + "/" + mm + "/" + yyyy}`;
  };

  return (
    <div style={{ overflow: "auto" }}>
      {isSaved && <Alert text={"employee is saved successfully"} />}
      <div className="mb-3">
        <CCol xs={4}>
          <CFormInput
            disabled={Data.length == 0}
            onChange={(e) => Search(e)}
            type="text"
            placeholder="search ..."
          />
        </CCol>
      </div>

      <CTable style={{ minWidth: 1000 }}>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell
              style={{ width: 75 }}
              scope="col"
            ></CTableHeaderCell>
            <CTableHeaderCell onClick={() => SortBy("Nom")} scope="col">
              Nom
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => SortBy("Prenom")} scope="col">
              Prenom
            </CTableHeaderCell>

            <CTableHeaderCell onClick={() => SortBy("Email")} scope="col">
              Email
            </CTableHeaderCell>
            {/* <CTableHeaderCell onClick={() => SortBy("Office")} scope="col">
              Office
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => SortBy("Post")} scope="col">
              Post
            </CTableHeaderCell>
            <CTableHeaderCell onClick={() => SortBy("Departement")} scope="col">
              Departement
            </CTableHeaderCell> */}
            <CTableHeaderCell style={{ width: 150 }}></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {DataFiltred.map((el, index) => (
            <CTableRow
              className={Deleted_id.includes(el._id) ? "activeDelete" : ""}
              onClick={() => ToDelete(el._id)}
              key={index}
            >
              <CTableDataCell>
                {/* <img className="icon-table" src={avatar1} alt="" /> */}
              </CTableDataCell>
              <CTableDataCell>
                <div className="row_name_date">
                  <span>{el.name}</span>
                  <span>{convertDate(el.date)}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <p>{el.lastName}</p>
              </CTableDataCell>
              <CTableDataCell>
                <p>{el.email}</p>
              </CTableDataCell>
              {/* <CTableDataCell>
                <p>{el.office}</p>
              </CTableDataCell>
              <CTableDataCell>
                <p>{el.post}</p>
              </CTableDataCell>
              <CTableDataCell>
                <p>{el.departement}</p>
              </CTableDataCell> */}
              <CTableDataCell>
                <div className=" table-action">
                  {Deleted_id.includes(el._id) && (
                    <CButton
                      onClick={() => DeleteEmp()}
                      size="sm"
                      style={{ color: "white" }}
                      color="danger"
                    >
                      Delete
                    </CButton>
                  )}
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {!Loading && Data.length == 0 && (
        <p style={{ textAlign: "center" }}>
          No employee to display
          <br />
          <b className="_link" onClick={() => history.push("/new_employee")}>
            Click here to create new one
          </b>
        </p>
      )}
      {Loading && (
        <div style={{ textAlign: "center" }}>
          <CSpinner />
        </div>
      )}
    </div>
  );
}

export default Liste_employee;
