import React from 'react';

const Premium = ({premium}) => {
    return premium.map((entry, index) => {
        return <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.transaction}</td>
            <td>{entry.change}</td>
            <td>.</td>
            {/* <td>{entry.newBalance}</td> */}
            <td>{entry.notes}</td>
        </tr>;
    });
}

export default Premium;