/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react'
import { userContext } from '../context/user.context'
import axios from '../config/axios';
import toast from "react-hot-toast";
import apiClient from '../config/apiClient';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const {user} = useContext(userContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projectName, setProjectName] = useState(null)
  const [project, setProject] = useState([])
  const navigate = useNavigate();
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

  useEffect(()=> {
    apiClient.get('/projects/all').then((res) => {
      setProject(res.data.projects);
    }).catch( error => {
      console.log(error)
    })
  })

  return (
  <div>
    <main className='p-4'>
     <div>
      <button className="btn" onClick={()=> setIsModalOpen(true)}>
       <i class="ri-link ml-2"></i>
        New Project
      </button>
      <div>    
      {
        project.map((project) => (
          <div key={project._id} 
           onClick={()=>{ navigate(`/project`, {
            state: {project}
           })}}
          className='btn3'>
           <h2>{project.name}</h2>
           <p className='prata-regular'><i className="ri-user-3-line"></i>Collaborators: {project.users.length}</p>
           <i className="ri-link ml-2"></i>
          </div>
        ))
      }
      </div>
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