import { CAvatar } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetUsers } from "../../actions/UserActions";
function InputTag(props) {
  const [Users, setUsers] = useState([]);
  const [UserFiltred, setUserFiltred] = useState([])
  const [UserSelected, setUserSelected] = useState([]);
  const [ShowList, setShowList] = useState(false);
  const [UserSearch, setUserSearch] = useState("")

  
const UserReducer = useSelector(state => state.UserReducer)

  const GET_ALL_USER = async () => {
    

    const users = await GetUsers();
    const others = users.filter(el => el._id != UserReducer._id)
    setUsers(others);
    setUserFiltred(others);
  };

  useEffect(() => {
    setUserSelected([]);
    GET_ALL_USER();
    return () => {};
  }, []);  

  const Select = (el) => {
    let arr = [...UserSelected];
    arr.push(el);
    setUserSelected(arr);
    let new_users = [...Users];
    new_users = Users.filter((user) => user._id != el._id);
    setUsers(new_users);
    setUserFiltred(new_users);
    setUserSearch('')
  };

  const Unselect = (el) => {
    let arr = UserSelected.filter(user => user._id != el._id)
    setUserSelected(arr)
    let arr_2 = [...Users]
    arr_2.push(el)
    setUsers(arr_2)
    setUserFiltred(arr_2);
    setUserSearch('')
  };

useEffect(() => {
   const element = document.querySelector(".input_tag")
  if(element)
   element.focus()
  props.SendUserSelected(UserSelected)
}, [UserSelected])

useEffect(() => {
   
  if(ShowList)
{
    setUserSearch('')
    const element = document.querySelector(".input_tag")
    if(element)
     element.focus()
}
 }, [ShowList])

 useEffect(() => {
    if(UserSearch.length==0)
    GET_ALL_USER();
 }, [UserSearch])

 const Search = (e) => {
     
     setUserSearch(e.target.value)
    const text = e.target.value.toLowerCase();
    let arr = Users.filter((el) => {
      return (
        `${el.name} +' '+ ${el.lastName}`.toLowerCase().includes(text)
      );
    });
    setUserFiltred(arr)
  };

  return (
    <div className="TAG">
      <div onClick={() => setShowList(true)} className="InputTag">
        {UserSelected.map((el, index) => (
          <div key={index} className="user_tag">
         
            {el.name +' '+ el.lastName}
         <button onClick={() => Unselect(el)} className='cancel'>X</button>
          </div>
        
        ))}
          {
          ShowList && Users.length > 0 &&
          <div className="user_tag_input">
           <input  value={UserSearch} onChange={(e) => Search(e)} className="input_tag" type="text" />
           </div>}
          
      </div>
      {ShowList && (
        <div className="user_container">
          <p onClick={() => setShowList(false)} className="close_X">X</p>
          {UserFiltred.map((user, index) => (
            <div onClick={() => Select(user)} className="item" key={index}>
                     <CAvatar color="secondary" size="">
                         {user.name[0].toUpperCase() +''+user.lastName[0].toUpperCase()}
                     </CAvatar>
              {user.name + " " + user.lastName}{" "}
            </div>
          ))}
          {UserFiltred.length == 0 && <p className="NO_DATA"> No user To select </p>}
        </div>
      )}
    </div>
  );
}

export default InputTag;
