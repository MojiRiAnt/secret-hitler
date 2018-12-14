const btnConfirm = document.getElementById("btnSubmit")
var nicknames = [];
var btnDels = [];
for(let i = 0; i < 10; ++i) {
    nicknames.push(document.getElementById("nickname"+i.toString()))
    btnDels.push(document.getElementById("actionDel"+i.toString()))
}

for(let i = 0; i < 10; ++i) {
    btnDels[i].addEventListener('click', () => {
        console.log('Delete: '+i.toString())
    })
}

btnConfirm.addEventListener('click', () => {
    fetch(`/lobby/confirm?name=${roomName}`)
        .then( (response) => {
            return response.text()
        })
        .then( (response) => {
            console.log(response) 
        })
})

window.setInterval(() => {
    fetch(`/lobby/getplayers?name=${roomName}`)
        .then( (response) => {
            return response.json()
        })
        .then( (response) => {
            console.log(response['amount'])
            for(let i = 0; i<10; ++i) {
                if(i < response['amount']) {
                    nicknames[i].innerHTML = response['nicknames'][i]
                    nicknames[i].classList.remove("grid__left--wide")
                    btnDels[i].classList.remove("grid__right--hidden")
                } else {
                    nicknames[i].innerHTML = 'Empty Slot'
                    nicknames[i].classList.add("grid__left--wide")
                    btnDels[i].classList.add("grid__right--hidden")
                }
            }
        })
}, 10000)
