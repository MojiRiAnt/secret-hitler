const formStatus      = document.getElementById('formStatus')
const formRole        = document.getElementById('formRole')
const formVote        = document.getElementById('formVote')
const formPolicies    = document.getElementById('formPolicies')

const btnFormStatus   = document.getElementById('btnFormStatus')
const btnFormRole     = document.getElementById('btnFormRole')
const btnFormVote     = document.getElementById('btnFormVote')
const btnFormPolicies = document.getElementById('btnFormPolicies')
const btnSeeRules     = document.getElementById('btnSeeRules')

const inputRoomName   = document.getElementById('inputTextRoomName')
const inputRoomPwd    = document.getElementById('inputTextPassword')
const inputPlayerName = document.getElementById('inputTextNickname')
const btnConfirm      = document.getElementById('btnConfirm')

const btnVote = [document.getElementById('btnVoteJa'),
                 document.getElementById('btnVoteNein')]
const rulesURL = 'https://secrethitler.com/assets/Secret_Hitler_Rules.pdf'

let roomName = ''
let roomPwd = ''
let playerName = ''


btnFormStatus.addEventListener('click', () => {
    formStatus.classList.remove('hidden')
    formRole.classList.add('hidden')
    formVote.classList.add('hidden')
    formPolicies.classList.add('hidden')
})

btnConfirm.addEventListener('click', () => {
    roomName = inputRoomName.value
    roomPwd  = inputRoomPwd.value
    playerName = inputPlayerName.value
    
    fetch(`/client/join?name=${roomName}&nick=${playerName}`)
        .then( (response) => {
            return response.text()
        })
        .then( (response) => {
            if(response === "OK") {
                inputRoomName.disabled=true
                inputRoomPwd.disabled=true
                inputPlayerName.disabled=true
                btnFormRole.click()
            } else {
                //TODO
                console.log(response)
            }
        })
})


btnFormRole.addEventListener('click', () => {
    fetch(`/client/getstatus?nick=${playerName}`)
        .then( (response) => {
            return response.text()
        })
        .then( (response) => {
            //TODO
            console.log(response)
        })

    formStatus.classList.add('hidden')
    formRole.classList.remove('hidden')
    formVote.classList.add('hidden')
    formPolicies.classList.add('hidden')
})


btnFormVote.addEventListener('click', () => {
    formStatus.classList.add('hidden')
    formRole.classList.add('hidden')
    formVote.classList.remove('hidden')
    formPolicies.classList.add('hidden')
})

for(let i=0; i<2; ++i)
btnVote[i].addEventListener('click', () => {
    if(btnVote[i].classList.contains('btn--vote--chosen')) {
        btnVote[i].classList.remove('btn--vote--chosen')
        btnVote[1-i].classList.remove('hidden')
    } else {
        btnVote[1-i].classList.add('hidden')
        btnVote[i].classList.add('btn--vote--chosen')
    }
})


btnFormPolicies.addEventListener('click', () => {
    formStatus.classList.add('hidden')
    formRole.classList.add('hidden')
    formVote.classList.add('hidden')
    formPolicies.classList.remove('hidden')
})


btnSeeRules.addEventListener('click', () => {
    window.open(rulesURL, '_blank')
})
