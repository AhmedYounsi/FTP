import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilCloudDownload, cilLoopCircular } from "@coreui/icons";
import {
  CButton,
  CCol,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import "./FTP.scss";
import Icons from "./Icons.js";
import RandomFile from "../../assets/icons/file.png";
import add_folder_ico from "../../assets/icons/add_folder.png";
import { socket } from "../../utils/initSocket";
import { useSelector } from "react-redux";
import FolderIcon from "../../assets/icons/FolderIcon.svg";
import LockIcon from "../../assets/icons/lock.png";
import NewFolderModal from "./NewFolderModal";

function FileManager() {
  const UserReducer = useSelector((state) => state.UserReducer);
  const [file, setFile] = useState(null);

  const [AllFiles, setAllFiles] = useState([]);
  const [FilesFiltred, setFilesFiltred] = useState([]);
  const [Loading, setLoading] = useState(false);
  const FileInput = useRef(null);
  const [CurrentFolder, setCurrentFolder] = useState(null);
  const [CurrentPath, setCurrentPath] = useState("./uploads/");
  const [FoldersList, setFoldersList] = useState([]);
  const [NewFolder, setNewFolder] = useState("");
  const [ShowModal, setShowModal] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => {
    socket.on("Error", (data) => {
      alert(data);
    });
    socket.on("Delete_Folder", (data) => {
 
      socket.emit("Get_Folders");
    });
    socket.on("Add_folder", () => {
      socket.emit("Get_Folders");
    });
    return () => {
      socket.off("Error");
      socket.off("Add_folder");
    };
  }, []);

  useEffect(() => {
    socket.emit("Get_Folders");
    socket.on("Get_Folders", (folders) => {
      setCurrentFolder(null);
      setFoldersList(folders);
      setConfirmDelete(null)
    });
    return () => {
      socket.off("Get_Folders");
    };
  }, []);

  useEffect(() => {
    if (CurrentFolder) socket.emit("Get_Files_One", CurrentFolder);

    socket.on(`TO_${CurrentFolder}`, (data) => {
      const json = JSON.parse(data);
      setLoading(false);
      const arr = json.sort((a, b) =>
        a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
      );
      setAllFiles(arr);
      setFilesFiltred(arr);
    });

    return () => {
      socket.off("Get_Files_One");
      socket.off(`TO_${CurrentFolder}`);
    };
  }, [CurrentFolder]);

  const refrech = () => {
    setFilesFiltred([]);
    socket.emit("Get_Files_One", CurrentFolder);
  };

  // UPLOAD FILE
  const uploadFile = async () => {
    if (!file) {
      return;
    }
    const user = {
      nom: UserReducer.name,
      prenom: UserReducer.lastName,
      user_id: UserReducer._id,
    };

    const formData = new FormData();
    formData.append("file", file); // appending file
    formData.append("user", JSON.stringify(user));
    formData.append("dir", CurrentFolder); //DIR
    try {
      setLoading(true);
      const res = await axios.post(
        "http://192.168.1.15:5000/uploads",
        formData
      );
      socket.emit("Get_Files_One", CurrentFolder);

      FileInput.current.value = null;
      setFile(null);
    } catch (error) {
      setLoading(false);
      alert(error.response.data);
      FileInput.current.value = null;
      setFile(null);
    }
  };

  // DELETE FILE
  const Delete = async (el) => {
    setLoading(true);
    try {
      const res = await axios.get("http://192.168.1.15:5000/delete_file", {
        params: { path: el.path, name: el.name },
      });
      setLoading(false);
      setConfirmDelete(null)
      socket.emit("Get_Files_One", CurrentFolder);
    } catch (error) {
      console.log(error);
    }
  };

  // DOWNLOAD FILE
  const download = (path) => {
    window.open(`http://192.168.1.15:5000${path}`);
  };

  // ADD FOLDER
  const New_folder = (data) => {
    let Ids = [];
    data.UserSelected.map((el) => Ids.push(el._id));

    if (NewFolder == "") return;

    socket.emit("Add_folder", {
      NewFolder,
      Ids,
      userId: UserReducer._id,
      is_private: data.IsPrivate,
    });
    setShowModal(false);
  };

  // DELETE FOLDER
  const Delete_folder = () => {
    socket.emit("Delete_Folder", { CurrentFolder, AllFiles });
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const ConverDate = (date) => {
    var d = new Date(date);
    const full_date =
      ("0" + d.getDate()).slice(-2) +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      d.getFullYear();
    return full_date;
  };

  const ConverTime = (date) => {
    var d = new Date(date);

    const full_date =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return full_date;
  };

  const Search = (e) => {
    const text = e.target.value.toLowerCase();
    let arr = AllFiles.filter((el) => {
      return (
        `${el.name} +' '+ ${el.lastName}`.toLowerCase().includes(text) ||
        ConverDate(el.date).toLowerCase().includes(text)
      );
    });
    setFilesFiltred(arr);
  };

  const getIcon = (ext) => {
    const link = Icons.find((el) => el.ext.includes(ext));
    if (!link)
      return (
        <div className="RandomFile">
          <p>{ext}</p>
          <img src={RandomFile} className="icon-file" />
        </div>
      );
    return <img src={link.icon} className="icon-file" />;
  };

  const IsCreator = () => {
    const folder = FoldersList.find((el) => el.name == CurrentFolder);
    if (folder && folder.creator == UserReducer._id) return true;
    else return false;
  };

  return (
    <div>
    {
      ConfirmDelete && 
      <CModal size="sm" visible={true} onClose={() => setConfirmDelete(null)}>
      <CModalHeader>
        <CModalTitle>Confirm Delete</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="control-btn">
           {
           Loading ? <CSpinner /> :
           <CButton
            color="danger"
            style={{ color: "white", marginLeft: 10 }}
            onClick={() => {
              if(ConfirmDelete == 'folder') Delete_folder(CurrentFolder)
              else Delete(ConfirmDelete)
            }}
          >
            <CIcon icon={cilTrash} size="xl" />
          </CButton>}
        </div>
      </CModalBody>
    </CModal>
    }
      <NewFolderModal
        New_folder={(data) => New_folder(data)}
        new_folder_name={(e) => setNewFolder(e)}
        setShowModal={(e) => setShowModal(e)}
        ShowModal={ShowModal}
      />
      <div className="control-btn">
        <CButton onClick={() => setShowModal(true)}>New folder</CButton>
        {CurrentFolder && CurrentFolder != "ZETA" && IsCreator() && (
          <CButton
            color="danger"
            style={{ color: "white", marginLeft: 10 }}
            onClick={() => setConfirmDelete("folder")}
          >
            <CIcon icon={cilTrash} size="xl" />
          </CButton>
        )}
      </div>
      <div className="folders">
        {FoldersList.length > 0 &&
          FoldersList?.map(
            (el, index) =>
              (el.access.includes(UserReducer._id) ||
                !el.private ||
                el.creator == UserReducer._id) && (
                <div
                  onClick={() => {
                    if(el.name == CurrentFolder) setCurrentFolder(null)
                    else {
                      setFilesFiltred([])
                      setAllFiles([])
                      setCurrentFolder(el.name)
                    }
                  }}
                  key={index}
                  style={{ position: "relative" }}
                  className={CurrentFolder == el.name ? "Selected_Folder" : ""}
                >
                  <img src={FolderIcon} alt="" />

                  <p>{el.name}</p>
                  {el.private && <img className="lock" src={LockIcon} alt="" />}
                </div>
              )
          )}
      </div>

      <hr />
      {CurrentFolder && (
        <>
          <div className="file-upload">
            <CFormInput
              className="file"
              ref={FileInput}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && Loading && <CSpinner style={{ marginLeft: "auto" }} />}
            {file && !Loading && (
              <CButton onClick={uploadFile} color="primary">
                Upload
              </CButton>
            )}
          </div>
        </>
      )}

      {CurrentFolder && (
        <>
          <div className="mb-3 search_box">
            <CCol xs={4}>
              <CFormInput
                onChange={(e) => Search(e)}
                type="text"
                placeholder="search ..."
                disabled={AllFiles.length == 0}
              />
            </CCol>

            <CIcon
              className="refresh__btn"
              onClick={() => refrech()}
              icon={cilLoopCircular}
              size="xxl"
            />
          </div>
          {AllFiles.length > 0 && (
            <div>
              <CTable className="file-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                    <CTableHeaderCell scope="col">File name</CTableHeaderCell>
                    <CTableHeaderCell colSpan="2" scope="col">
                      Date
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: "end" }} scope="col">
                      Size
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ textAlign: "end" }} scope="col">
                      by
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {FilesFiltred.map((el, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{ width: 70 }}>
                        {getIcon(el.ext)}
                      </CTableDataCell>

                      <CTableDataCell>
                        <p> {el.name}</p>
                      </CTableDataCell>

                      <CTableDataCell colSpan="2">
                        <p className="date">
                          {" "}
                          {ConverDate(el.date)} | {ConverTime(el.date)}{" "}
                        </p>
                      </CTableDataCell>

                      <CTableDataCell>
                        <p className="size"> {formatBytes(el.size)}</p>
                      </CTableDataCell>
                      <CTableDataCell>
                        <p className="size"> {el.user[1] + " " + el.user[0]}</p>
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: "right" }}>
                        {el.user_id == UserReducer._id &&
                          (!Loading ? (
                            <button
                              className="del__btn"
                              onClick={() => setConfirmDelete(el)}
                            >
                              <CIcon icon={cilTrash} size="xxl" />
                            </button>
                          ) : (
                            <CSpinner />
                          ))}
                        <button
                          className="del__btn download"
                          onClick={() => download(`/${el.folder}/${el.name}`)}
                        >
                          <CIcon icon={cilCloudDownload} size="xxl" />
                        </button>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {AllFiles.length < 1 && <p className="NO_DATA">NO FILE EXIST</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FileManager;
