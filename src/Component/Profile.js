import React, { useState, useEffect } from "react";


const Profile = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");

    const userEmail = localStorage.getItem('user');

    useEffect(() => {
        if (userEmail && typeof userEmail === 'string') {
            const parsedUserEmail = JSON.parse(userEmail);

            if (parsedUserEmail && parsedUserEmail.email) {
                setEmail(parsedUserEmail.email);
            }
        }


        userData();
    },); 

    const userData = async () => {
        try {
            let result = await fetch(`http://localhost:8000/user/${email}`);
            if (!result.ok) {
                throw new Error(`HTTP error! Status: ${result.status}`);
            }
            result = await result.json();
            setUser(result);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    

    return (
        <div className="container">
            <div className="profile-header">
                <h1>Profile Page</h1>
            </div>
            <div className="profile-details">
                {user ? (
                    <>
                        <div className="profile-avatar">
                            <img src={user.avatar} alt="User Avatar" />
                        </div>
                        <div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>DOB: 21/01/2002</p>
                            <p>Phone No. : 8604335512</p>
                        </div>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
            <button className="logout-button">Logout</button>
        </div>
    );
};

export default Profile;
