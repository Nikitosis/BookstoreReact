import React from "react";

const ClientItem=({client,deleteClient})=>{
    return (
        <tr>
            <td>{client.id}</td>
            <td>{client.fName}</td>
            <td>{client.lName}</td>
            <td><button className="btn btn-danger" onClick={()=>deleteClient(client.id)}>Delete</button></td>
        </tr>
    );
};

export default ClientItem;