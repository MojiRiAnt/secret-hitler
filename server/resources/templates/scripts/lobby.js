const btnConfirm = document.getElementById("btnSubmit")
const playersAmountText = document.getElementById("playersAmount")
var nicknames = [];
var btnDels = [];
for(let i = 0; i < 10; ++i) {
    nicknames.push(document.getElementById("nickname"+i.toString()))
    btnDels.push(document.getElementById("actionDel"+i.toString()))
}


let updatePlayers = function () {
    fetch(`/lobby/getplayers?name=${roomName}`)
        .then( (response) => {
            return response.json()
        })
        .then( (response) => {
            playersAmountText.innerHTML = `${response['amount']}/10`
            for(let i = 0; i<10; ++i) {
                if(i < response['amount']) {
                    nicknames[i].innerHTML = response['names'][i]
                    nicknames[i].classList.remove("grid__left--wide")
                    btnDels[i].classList.remove("grid__right--hidden")
                } else {
                    nicknames[i].innerHTML = 'Empty Slot'
                    nicknames[i].classList.add("grid__left--wide")
                    btnDels[i].classList.add("grid__right--hidden")
                }
            }
        })
}

window.setInterval(updatePlayers, 5000)


for(let i = 0; i < 10; ++i) {
    btnDels[i].addEventListener('click', () => {
        fetch(`/lobby/kick?name=${roomName}&nick=${nicknames[i].innerHTML}`)
            .then( (response) => {
                return response.text()
            })
            .then( (response) => {
                if(response === "OK") {
                    updatePlayers()
                }
            })
    })
}

btnConfirm.addEventListener('click', () => {
    fetch(`/lobby/confirm?name=${roomName}`)
        .then( (response) => {
            return response.text()
        })
        .then( (response) => {
            if(response === "OK") {
                window.location = `${window.location.protocol}//${window.location.host}/game?name=${roomName}`                
            }
        })
})

