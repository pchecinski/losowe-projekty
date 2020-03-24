import React from 'react';
import Player from './components/Player'

import zlib from 'zlib';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [], 
      villages: []
    };

    if(localStorage.getItem('villages_cache') !== null) {
      zlib.inflate(Buffer.from(localStorage.getItem('villages_cache'), 'base64'), (err, buf) => {
        this.state.villages = JSON.parse(buf);
      });
    }
  }

  componentDidMount() {
    fetch(`https://backend.checinski.dev`)
    .then(res => res.json())
    .then(result => {
    this.setState({ players: result });
    });

    if(Date.now() - localStorage.getItem('villages_cache_time') > 8.64e+7) {
      fetch('village.txt')
      .then(res => res.text())
      .then(data => {
        const villages = [];
  
        for(const row of data.split("\n")) {
          const villageData = row.replace(/\+/g, '%20').split(",");
          const village = {
              village_id: parseInt(villageData[0]),
              name: decodeURIComponent(villageData[1]),
              x: parseInt(villageData[2]),
              y: parseInt(villageData[3]),
              player_id: parseInt(villageData[4]),
              points: parseInt(villageData[5]),
              rank: parseInt(villageData[6])
          }
          villages.push(village);
        }
  
        const input = JSON.stringify(villages);
        zlib.deflate(input, (err, buffer) => {
          localStorage.setItem('villages_cache', buffer.toString('base64'));
          localStorage.setItem('villages_cache_time', Date.now().toString());
          console.log('imported now villages data');
        });
  
        this.setState({ villages: villages });
      });
    }
  }

  render() {
    if(this.state.players.length !== 0 && this.state.villages.length !== 0) {
      let data = this.state.players.map(player => {
        return <Player key={player.name} player={player} villagesList={this.state.villages} />
      });
      return <div>
        {data}
      </div>;
    }
    return <div>Loading...</div>;
  }
}

export default App;
