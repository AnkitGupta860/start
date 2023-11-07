import React from "react";


function User(props){
    return(
        <div>
            <button onClick={props.data}>Click</button>
        </div>
    )
}

export default User;