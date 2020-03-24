import React from 'react';
import moment from 'moment';

import spear from '../img/unit_spear.png';
import sword from '../img/unit_sword.png';
import axe from '../img/unit_axe.png';
import archer from '../img/unit_archer.png';
import spy from '../img/unit_spy.png';
import light from '../img/unit_light.png';
import marcher from '../img/unit_marcher.png';
import heavy from '../img/unit_heavy.png';
import ram from '../img/unit_ram.png';
import catapult from '../img/unit_catapult.png';
import knight from '../img/unit_knight.png';
import snob from '../img/unit_snob.png';
import farm from '../img/farm.png';

import Village from './Village';
import Support from './Support';
import Premium from './Premium';

import './player.css';

const Player = ({player, villagesList}) => {

    const villages = player.villages.map((village, index) => {
        return <Village key={index} village={village} villagesList={villagesList} />
    });

    const support = player.support.map((village, index) => {
        return <Support key={index} village={village} villagesList={villagesList} />
    })

    const time = moment(player.date).fromNow();

    return (
        <div id='player'>
            <table id='units'>
                <thead>
                    <tr>
                        <th>Wioski {player.name} <small>({time})</small></th>
                        <th><img src={spear} alt='Pikinier' /></th>
                        <th><img src={sword} alt='Miecznik' /></th>
                        <th><img src={axe} alt='Topornik' /></th>
                        <th><img src={archer} alt='Łucznik' /></th>
                        <th><img src={spy} alt='Zwiadowca' /></th>
                        <th><img src={light} alt='Lekki kawalerzysta' /></th>
                        <th><img src={marcher} alt='Łucznik na koniu' /></th>
                        <th><img src={heavy} alt='Ciężki kawalerzysta' /></th>
                        <th><img src={ram} alt='Taran' /></th>
                        <th><img src={catapult} alt='Katapulta' /></th>
                        <th><img src={knight} alt='Rycerz' /></th>
                        <th><img src={snob} alt='Szlachcic' /></th>
                        <th><img src={farm} alt='Ludność' /></th>
                    </tr>
                </thead>
                <tbody>
                    {villages}
                </tbody> 
            </table>
            <table id='support'>
                <thead>
                    <tr>
                        <th>Wsparcie {player.name} <small></small></th>
                        <th><img src={spear} alt='Pikinier' /></th>
                        <th><img src={sword} alt='Miecznik' /></th>
                        <th><img src={axe} alt='Topornik' /></th>
                        <th><img src={archer} alt='Łucznik' /></th>
                        <th><img src={spy} alt='Zwiadowca' /></th>
                        <th><img src={light} alt='Lekki kawalerzysta' /></th>
                        <th><img src={marcher} alt='Łucznik na koniu' /></th>
                        <th><img src={heavy} alt='Ciężki kawalerzysta' /></th>
                        <th><img src={ram} alt='Taran' /></th>
                        <th><img src={catapult} alt='Katapulta' /></th>
                        <th><img src={knight} alt='Rycerz' /></th>
                        <th><img src={snob} alt='Szlachcic' /></th>
                    </tr>
                </thead>
                <tbody>
                    {support}
                </tbody> 
            </table>
            <table id='premium'>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Transakcja</th>
                        <th>Zmiana</th>
                        <th>Nowe saldo PP</th>
                        <th>Dalsze informacje</th>
                    </tr>
                </thead>
                <tbody>
                    <Premium premium={player.premium}/>
                </tbody> 
            </table>
        </div>
    );
}

export default Player;