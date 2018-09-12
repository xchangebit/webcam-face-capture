const videoInput = document.getElementById('inputVideo');
const canvasInput = document.getElementById('inputCanvas');
const htracker = new headtrackr.Tracker();

let state = null

htracker.init(videoInput, canvasInput);

function takePhoto() {
    const image = document.getElementById('inputCanvas').toDataURL("image/png")
    const form = new FormData()
    form.append('data', image)
    fetch('/', {
        method: 'POST',
        body: form
    })
    .then( response => {
        return response.json()
    })
    .then( json => {
        document.getElementById('console').innerHTML = json.result
    })
}
            
function handleStatusChange (event) {
    switch(event.status) {
        case 'found': 
            if(state != 'posted') {
                takePhoto()
                state = 'posted'
            }
            break
    }
}

document.addEventListener("headtrackrStatus", handleStatusChange, true);

var getState = function() {
    if(!state && htracker.status == 'tracking') {
        state = 'found'
    } else if(htracker.status != 'tracking') {
        state = null
    } else if (htracker.status == 'tracking') {
        takePhoto()
    }
}

getState()
setTimeout(getState, 3000)
setInterval(getState, 5000)
htracker.start();