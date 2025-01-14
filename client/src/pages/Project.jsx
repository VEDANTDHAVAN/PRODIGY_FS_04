/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import apiClient from '../config/apiClient';

const Project = () => {
    const location = useLocation();
    console.log(location.state)
    const [isSidePanelOpen, setSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [project, setProject] = useState(location.state)
    const [messages, setMessages] = useState([
        { id: 1, type: "incoming", text: "Hello!", email: "example@gmail.com" },
    ]);

    const [users, setUsers] = useState([])

    const handleUserSelect = (_id) => {
        /*setSelectedUsers(prevSelectedUser => {
            const newSelectedUser = new Set(prevSelectedUser);
            if(newSelectedUser.has(_id)){
                newSelectedUser.delete(_id);
            } else{
                newSelectedUser.add(_id);
            }
            console.log(Array.from(newSelectedUser))
            return newSelectedUser;
        })*/
        if (selectedUsers.includes(_id)) {
            setSelectedUsers(selectedUsers.filter((userId) => userId !== _id));
        } else {
            setSelectedUsers([...selectedUsers, _id]);
        }
    };

    useEffect(()=> {

     apiClient.get(`/projects/get-project/${location.state.project._id}`).then(res =>{
        setProject(res.data.project)
     })

     apiClient.get('/api/all').then(res => {
       setUsers(res.data.users)
     }).catch(err => {
        console.log(err);
     })
    }, [])

    const addUsersToProject = () => {
        const newProjectUsers = users.filter((user) => selectedUsers.includes(user._id));
        setProjectUsers([...projectUsers, ...newProjectUsers]);
        setSelectedUsers([]);
        setIsModalOpen(false);
    };

    function addMembers() {
       axios.put('/projects/add-user', {
        projectId: location.state.project._id,
        users: Array.from(selectedUsers)
       }).then(res => {
        console.log(res.data)
        setIsModalOpen(false);
       }).catch(err=> {
        console.log(err)
       })
    }

    const sendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { id: Date.now(), type: "outgoing", text: inputMessage, email: "example@gmail.com" }]);
            setInputMessage("");
        }
    };

    return (
        <main className="h-screen w-screen flex">
            <section className="left">
                <header className="header2">
                    <button className="btn3" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-large-fill"></i>
                        <p className="text-sm">Add members</p>
                    </button>
                    <div className="head-text">Encrypted Chat</div>
                    <button onClick={() => setSidePanelOpen(!isSidePanelOpen)} className="icon">
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area">
                    <div className="message-box">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`${msg.type} message`}>
                                <small className="start">
                                    <i className="ri-account-circle-line"></i>
                                    {msg.email}
                                </small>
                                <p className="text">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="input-field">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Enter Message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button className="btn" onClick={sendMessage}>
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>
                {isSidePanelOpen && (
                    <div className="sidePanel">
                        <h3>Project Members</h3>
                        <div className="users">
                            {project.users && project.users.map(user => {
                               return (<div key={user._id} className="user-item">
                                <div className="icon2">
                                    <i className="ri-user-fill"></i>
                                </div>
                                <h4>{user}</h4>
                               </div> )
                            })
                             
                            /*projectUsers.map((user) => (
                                <div key={user._id} className="user-item">
                                    <div className="icon2">
                                        <i className="ri-user-fill"></i>
                                    </div>
                                    <h4>{user.email}</h4>
                                </div>
                            ))*/}
                        </div>
                    </div>
                )}
            </section>
            {isModalOpen && (
                <div className="modal">
                    <h3>Select Users to Add</h3>
                    <div className="modal-content">
                        <div className="user-list">
                            {users.map((user) => (
                                <div key={user._id} className="user-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() => handleUserSelect(user._id)}
                                        />
                                        {user.firstname} {user.lastname}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="buttons">      
                        <button className="btn" onClick={addMembers}>
                            Add Selected Users
                        </button>
                        <button className="btn2" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Project;
