import React from 'react';
import './App.css';
import Data from "./DummyData.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  
  console.log("data", Data)
  const [iddata, setIdData] = React.useState(Data);
  const [page,setPage] = React.useState(0);
  const [formData, setFormData] = React.useState({
    id: Math.random(),
    name:"",
    address:"",
    phone: "" ,
    email:""
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editFormData, setEditFormData] = React.useState({
    name:"",
    address:"",
    phone: "" ,
    email:""
  })

  const {name,address,phone,email}=formData;
  // const {name,address,phone,email}=editFormData;

  // const getData = ()=>{
  //   fetch("http://jsonplaceholder.typicode.com/users")
  //   .then((Response)=> Response.json())
  //   .then((data)=>{
  //     console.log(data)
  //     setIdData(data)
  //       })
  // }

  let subtitle;
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Previous = () =>{
    setPage(page-1)
  }

  const Next = () =>{
  setPage(page+1)
  }

  const deleteItem = (id) =>{
  // console.log(id)
  const newItem = iddata.filter((value)=> value.id!==id)
  console.log(newItem)
  setIdData(newItem)
  }

  const handleChange=(event)=>{
    console.log(event.target.value);
    setFormData({...formData,[event.target.name]:event.target.value})
  }

  const addNewItem=(event)=>{
    event.preventDefault();
    console.log(formData)
    const newData = [...iddata, formData]
    // console.log(newData)
    setIdData(newData)
    toast.success("New user added successfully",{theme:"colored"})
    setFormData({
      name:"",
      address:"",
      phone: "" ,
      email:""})
  }

  const editHandleChange = (event) =>{
setEditFormData({...editFormData,[event.target.name]:event.target.value})
  }

  const editHandler=(value)=>{
    setIsOpen(true)
    console.log(value)
    setEditFormData({
      name: value.name,
      address:value.address,
      phone: value.phone ,
      email:value.email
    })
  }

  const handleEditBtn=(event)=>{
          event.preventDefault();
          const updatedData = [...iddata,editFormData]
          // setIdData(updatedData)
          console.log(updatedData)
  }
  
  // console.log("hello",iddata)
 
  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Contact-Book</h1>  
    <table>
      <thead>
        <tr>
          <th>
            SNo.
          </th>
          <th>
            Name
          </th>
          <th>
            Address
          </th>
          <th>
            Phone Number
          </th>
          <th>
            Email
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>
    
      <tbody>
      { iddata.slice(page*5,page*5+5).map((value,index)=>{
        // {console.log(value.name)}
        return <tr key={index}>
          <td>{value.id}</td>
    <td>{value.name}</td>
    <td>{value.address}</td>
    <td>{value.phone}</td>
    <td>{value.email}</td>
    <td>
      <button onClick={()=>editHandler(value)}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} style={{display:"flex",justifyContent:"flex-end"}}>X</button>
        <form style={{marginTop:"10px"}}>
        <div className='form-data'>
        <lable>
          Name
        </lable>
        <input onChange={editHandleChange} type="text" placeholder='Enter name' name='name' value={editFormData.name}/>
      </div>
      <div className='form-data'>
        <lable>
          Address
        </lable>
        <input onChange={editHandleChange} type="text" placeholder='Enter address' name = "address" value={editFormData.address}/>
      </div>
      <div className='form-data'>
        <lable>
          Phone
        </lable>
        <input onChange={editHandleChange} type="text" placeholder='Enter phone' name='phone' value={editFormData.phone} />
      </div>
      <div className='form-data'>
        <lable>
          Email
        </lable>
        <input onChange={editHandleChange} type="text" placeholder='Enter email' name='email' value={editFormData.email} />
      </div>
      <div>
        <button onClick={handleEditBtn}>Edit</button>
      </div>
        </form>
      </Modal>
      <button onClick={()=>deleteItem(value.id)}>Delete</button>
    </td>
    </tr>
  })
  } 
       
      </tbody>
    </table>
    <div>
      <button onClick={Previous} disabled={page===0?true:false} >Previous</button>
      <button onClick={Next} disabled={page===Math.ceil(iddata.length/5)-1?true:false}>Next</button>
    </div>
    <form>
      <div className='form-data'>
        <lable>
          Name
        </lable>
        <input onChange={handleChange} type="text" placeholder='Enter name' name='name' value={name}/>
      </div>
      <div className='form-data'>
        <lable>
          Address
        </lable>
        <input onChange={handleChange} type="text" placeholder='Enter address' name = "address" value={address}/>
      </div>
      <div className='form-data'>
        <lable>
          Phone
        </lable>
        <input onChange={handleChange} type="text" placeholder='Enter phone' name='phone' value={phone} />
      </div>
      <div className='form-data'>
        <lable>
          Email
        </lable>
        <input onChange={handleChange} type="text" placeholder='Enter email' name='email' value={email} />
      </div>
      <div className='add-btn'>
        <button onClick={addNewItem} disabled={name.length===0||address.length===0||phone.length===0||email.length===0?true:false}>Add</button>
        <ToastContainer />
      </div>
    </form>
    </div>
    
  );
}

export default App;
