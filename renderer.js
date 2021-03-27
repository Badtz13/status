const { ipcRenderer } = require('electron');

(function () {

    // on form sumbit
    document.querySelector('form').addEventListener('submit', event => {

        // prevent page reload
        event.preventDefault();

        // construct data to send to main
        let data = {
            state: document.getElementById('state').value ? document.getElementById('state').value : '  ',
            details: document.getElementById('details').value ? document.getElementById('details').value : '  ',
            largeImageKey: 'eollgurxcaeuata',
            instance: true,
        }

        // handle time display radio
        let timeRadio = Array.from(document.getElementsByName("time")).find(r => r.checked).id;

        if(timeRadio == 'start'){
            data.startTimestamp = Date.now();
        } else if(timeRadio == 'end'){
            if(document.getElementById('endTime').value){
                const today = new Date();
                let endTime =  new Date(today.toDateString() + ' ' + document.getElementById('endTime').value);
                data.endTimestamp = endTime.getTime()/1000;
            }
        }
        
        ipcRenderer.send('update', data);
    });
}());