/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { userContext } from '../context/user.context'
import axios from '../config/axios';
import toast from "react-hot-toast";

const Home = () => {

  const {user} = useContext(userContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)

  function createProject() {
    console.log({projectName})
    axios.post('/projects/create',
      {name: projectName}).then((res) => {
        console.log(res)
        setIsModalOpen(false)
        toast.success("New Project Created!!")
      }).catch((error)=> {
        console.log(error)
      })
    
  }

  return (
  <div>
    <main>
     <div className='projects'>
      <button className="btn" onClick={()=> setIsModalOpen(true)}>
       <i class="ri-link"></i>
        New Project
      </button>
     </div>

     {isModalOpen && (
     <div className="register-container flex-center">
     <h2 className="form-heading">Create New Project</h2>
     <form
       onSubmit={(e)=> {
       e.preventDefault();
       createProject();
       setIsModalOpen(false);
      }}
      className="register-form"
     >
     <input
      type="text"
      name="name"
      className="form-input"
      placeholder="Enter Project Name"
      required
      onChange={(e)=> setProjectName(e.target.value)}
      value={projectName}
     />
     <div className='flex flex-row'>
      <button className='btn2' 
       onClick={()=> setIsModalOpen(false)}
       >Cancel</button>
        <button
         type="submit"
         className="btn form-btn"
         >
          Create
         </button>
       </div>
       </form>
      </div>
     )}
    </main>
 </div>
)
}

export default Home