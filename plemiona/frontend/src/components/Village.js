import React from 'react';

const unitsWeight = [1,1,1,1,2,4,5,6,5,8,10,100];
const Village = ({village, villagesList}) => {
    const units = village.units.map((unit, index) => {
        return <td key={index}>{unit}</td>
    });

    const unitsCount = village.units.reduce((prev, curr, index) => {
        return prev + curr * unitsWeight[index];
    });

    const villageInfo = villagesList.find(el => el.village_id === village.id);

    return (
        <tr>
            <td>
                {villageInfo.name} ({villageInfo.x}|{villageInfo.y}) [{villageInfo.points}]
            </td>
            {units}
            <td>
                {unitsCount}
            </td>
        </tr>
    )
}

export default Village;