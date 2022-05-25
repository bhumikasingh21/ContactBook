import React from 'react';
import './App.css';
import Data from "./DummyData.json"

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

  const {name,address,phone,email}=formData;

  // const getData = ()=>{
  //   fetch("http://jsonplaceholder.typicode.com/users")
  //   .then((Response)=> Response.json())
  //   .then((data)=>{
  //     console.log(data)
  //     setIdData(data)
  //       })
  // }


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
  }

  // React.useEffect(()=>{
  // getData();
  // },[])
  
  console.log("hello",iddata)
 
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
      <button>Edit</button>
      <button onClick={()=>deleteItem(value.id)}>Delete</button>
    </td>
    </tr>
  })
  }
       
      </tbody>
    </table>
    <div>
      <button onClick={Previous} disabled={page===0?true:false} >Previous</button>
      <button onClick={Next} disabled={page===2?true:false}>Next</button>
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
        <button onClick={addNewItem}>Add</button>
      </div>
    </form>
    </div>
    
  );
}

export default App;
