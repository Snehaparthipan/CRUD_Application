import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    role: ""
  })
  const [data, setData] = useState([])

  const [refresh, setRefresh] = useState([])

  const [editid, setId] = useState("")
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    Getuser()
  }, [refresh])

  function handlechange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }
  async function Postuser() {
    try {
      const res = await axios.post("http://localhost:5000/api/users", form)
      alert("user send")
      setForm({ name: "", email: "", phoneNo: "", role: "" })
      setRefresh(!refresh)
    }
    catch (error) {
      console.log(error)
    }

  }
  async function Getuser() {
    try {
      const res = await axios.get("http://localhost:5000/api/all", form)
      setData(res.data.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function Deleteuser(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/del/${id}`)
      setRefresh(!refresh)
      alert("user deleted")
    } catch (error) {
      console.log(error)
    }
  }
  function handleedit(val) {
    setForm({
      name: val.name,
      email: val.email,
      phoneNo: val.phoneNo,
      role: val.role
    })
    setId(val._id)
    setPopup(true)
  }
  async function Edituser() {
    try {
      const res = await axios.put(`http://localhost:5000/api/new/${editid}`, form)
      setForm({ name: "", email: "", phoneNo: "", role: "" })
      setRefresh(!refresh)
      setPopup(false)
      
    } catch (error) {
      console.log(error)
    }

  }
  async function Canceluser(){
    try {
      setPopup(false)
      setForm({ name: "", email: "", phoneNo: "", role: "" })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <div className='div'>
      <h1>Employee Form</h1>
      <input type="text" name='name' value={form.name} placeholder='Enter Your Name' onChange={handlechange} />
      <input type="email" name='email' value={form.email} placeholder='Enter Your EmailId' onChange={handlechange} />
      <input type="number" name='phoneNo' value={form.phoneNo} placeholder='Enter Your Phone. No' onChange={handlechange} />
      <input type="text" name='role' value={form.role} placeholder='Enter Your Role' onChange={handlechange} />
      <button onClick={() => Postuser()}>Submit</button>

      <table  cellSpacing={0} cellPadding={20}>
        <th>Name</th>
        <th>Mail</th>
        <th>contact</th>
        <th>Role</th>

        <th colSpan={2}>Actions</th>
        <th>time</th>
        <th>Date</th>

        {
          data.map((val) => {
            return <tr key={val._id} className='trow'>
              <td>{val.name}</td>
              <td>{val.email}</td>
              <td>{val.phoneNo}</td>
              <td>{val.role}</td>
              <td><button onClick={() => handleedit(val)}>Edit</button></td>
              <td><button onClick={() => Deleteuser(val._id)}>Delete</button></td>
              <td>{new Date(val?.updatedAt).toLocaleTimeString()}</td>
              <td>{new Date(val?.updatedAt).toDateString()}</td>
            </tr>

          })
        }
      </table>

      {
        popup && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Edit User</h3>

              <input type="text" name='name' value={form.name} placeholder='Enter Employee Name' onChange={handlechange} />
              <input type="email" name='email' value={form.email} placeholder='Enter Employee Email' onChange={handlechange} />
              <input type="number" name='phoneNo' value={form.phoneNo} placeholder='Enter Employee Name' onChange={handlechange} />
              <input type="text" name='role' value={form.role} placeholder='Enter Employee Name' onChange={handlechange} />

              <button onClick={() => Edituser()}>Edit</button>
              <button onClick={() => Canceluser()}>cancel</button></div>
          </div>
        )
      }
      </div>
    </>
  )
}

export default App;
