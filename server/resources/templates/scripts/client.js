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
const policiesDescription = document.getElementById('policiesDescription')
const policies = [document.getElementById('policy0'),
                  document.getElementById('policy1'),
                  document.getElementById('policy2')]

const rulesURL = 'https://secrethitler.com/assets/Secret_Hitler_Rules.pdf'
const policyLiberal = '/resources/sprites/cards/policyLiberal.png'
const policyFascist = '/resources/sprites/cards/policyFascist.png'


let roomName = ''
let roomPwd = ''
let playerName = ''


btnFormStatus.addEventListener('click', () => {
    formStatus.classList.remove('hidden')
    formRole.classList.add('hidden')
    formVote.classList.add('hidden')
    formPolicies.classList.add('hidden')
    console.log(formRole.classList)
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
                btnConfirm.classList.add('hidden')
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
    if(btnVote[i].classList.contains(`btn--vote${i}--chosen`)) {
        btnVote[i].classList.remove(`btn--vote${i}--chosen`)
        btnVote[1-i].classList.remove('opaque')
    } else {
        btnVote[i].classList.add(`btn--vote${i}--chosen`)
        btnVote[1-i].classList.remove(`btn--vote${1-i}--chosen`)
        btnVote[1-i].classList.add('opaque')
        btnVote[i].classList.remove('opaque')
    }
})


btnFormPolicies.addEventListener('click', () => {
    policiesDescription.innerHTML = "Checking your policies…"
    for(let i=0; i<3; ++i)
        policies[i].classList.add('hidden')
    fetch(`/client/getpolicies?nick=${playerName}`)
        .then( (response) => {
            return response.json()
        })
        .then( (response) => {
            if(response['hasPolicies']) {
                for(let i=0; i<3; ++i)
                {
                    if(i < response['liberalAmount']) {
                        policies[i].src=policyLiberal
                        policies[i].classList.remove('hidden')
                    } else if(i < response['amount']) {
                        policies[i].src=policyFascist
                        policies[i].classList.remove('hidden')
                    } else {
                        policies[i].classList.add('hidden')
                    }
                }
                policiesDescription.innerHTML="Select 1 policy to remove."
            } else {
                policiesDescription.innerHTML="You have no policies to work with."
            }
        })
        .catch( (e) => policiesDescription.innerHTML="Cannot retrieve your policies data." ) //TODO
    formStatus.classList.add('hidden')
    formRole.classList.add('hidden')
    formVote.classList.add('hidden')
    formPolicies.classList.remove('hidden')
})


btnSeeRules.addEventListener('click', () => {
    window.open(rulesURL, '_blank')
})
