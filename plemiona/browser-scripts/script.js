if(premium) {
    let API_URL = 'https://backend.checinski.dev/';

    const fetchUnits = async () => {
        const result = await fetch(`game.php?${game_data.player.sitter == 0 ? "" : `t=${game_data.player.id}`}&screen=overview_villages&mode=units&group=0`);
        const html = await result.text();

        const doc = new DOMParser().parseFromString(html, 'text/html'); 
        const unitsTable = doc.querySelectorAll('#units_table tr');
        const villageCount = (unitsTable.length - 1) / 5;
        let villages = [];

        for(let i = 0; i < villageCount; i++) {
            let village = {
                id: unitsTable[i*5+1].cells[0].querySelector('span[data-id]').dataset.id,
                units: new Array(12).fill(0)
            };
            
            for(let j = 0; j < 12; j++) {
                village.units[j] += +unitsTable[i*5+1].cells[j+2].innerText;
                village.units[j] += +unitsTable[i*5+3].cells[j+1].innerText;
                village.units[j] += +unitsTable[i*5+4].cells[j+1].innerText;
            }
            villages.push(village);
        }
        console.log(villages);
        return villages;
    };

    const fetchSupport = async () => {
        const result = await fetch(`game.php?${game_data.player.sitter == 0 ? "" : `t=${game_data.player.id}`}&screen=overview_villages&mode=units&type=away_detail&group=0`)
        const html = await result.text();
    
        const doc = new DOMParser().parseFromString(html, 'text/html'); 
        const units = doc.querySelectorAll('#units_table tr.row_a, #units_table tr.row_b');
        let support = [];

        for(const unit of units) {
            let village = {
                id: unit.querySelector('span.village_anchor').dataset.id,
                units: []
            }
            for(let i = 0; i < 12; i++) {
                village.units[i] = unit.cells[i+1].innerText;
            }
            support.push(village);
        }

        return support;
    };

    const fetchPremiumLog = async () => {
        const result = await fetch(`game.php?${game_data.player.sitter == 0 ? "" : `t=${game_data.player.id}`}&screen=premium&mode=log`)
        const html = await result.text();

        const doc = new DOMParser().parseFromString(html, 'text/html'); 
        const premiumTable = doc.querySelectorAll('table.vis')[1];
        let premiumLog = [];
        
        if(premiumTable !== undefined) {
            const maxRows = Math.min(20, premiumTable.rows.length - 1);

            for(let i = 1; i <= maxRows; i++) {
                let entry = {
                    date: premiumTable.rows[i].cells[0].innerText.trim(),
                    transaction: premiumTable.rows[i].cells[1].innerText.trim(),
                    change: premiumTable.rows[i].cells[2].innerText.trim(),
                    newBalance: premiumTable.rows[i].cells[3].innerText.trim(),
                    notes: premiumTable.rows[i].cells[4].innerText.trim()
                }
                premiumLog.push(entry);
            }
        }
        
        return premiumLog;
    };

    const fetchStats = async () => {
        const result = await fetch(`game.php?${game_data.player.sitter == 0 ? "" : `t=${game_data.player.id}`}&screen=info_player&mode=stats_own`)
        const html = await result.text();

        const doc = new DOMParser().parseFromString(html, 'text/html');

        for(const js of doc.scripts) {

            console.log(js);

            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                document.body.appendChild(script);
                script.onload = resolve;
                script.onerror = reject;
                script.async = true;
                script.innerHTML = js.innerHTML;
            });
        }
    }


    Promise.all([
        fetchUnits(), fetchSupport(), fetchPremiumLog()
    ])
    .then(([villages, support, premium]) => {
        const data = {
            'name': game_data.player.name,
            'villages': villages,
            'support': support,
            'premium': premium,
            'date': Date.now()
        };
            
        fetch(API_URL, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data)
        })
        .then(res => res.text())
        .then(UI.SuccessMessage(`Dane gracza ${game_data.player.name} wyeksportowane poprawnie.`))    
    })
    .catch(e => {
        console.error(e);
        UI.ErrorMessage('Błąd, sprawdź konsolę przeglądarki.')
    });
}
else {
    UI.ErrorMessage('Skrypt wymaga konta premium, zapisz dane ręcznie.')
}