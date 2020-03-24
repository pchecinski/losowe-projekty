import React from 'react';

const Village = ({village, villagesList}) => {
    const units = village.units.map((unit, index) => {
        return <td key={index}>{unit}</td>
    });

    const villageInfo = villagesList.find(el => el.village_id === village.id);

    return (
        <tr>
            <td>
                {villageInfo.name} ({villageInfo.x}|{villageInfo.y}) [{villageInfo.points}]
            </td>
            {units}
        </tr>
    )
}

export default Village;