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