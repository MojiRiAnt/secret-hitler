const inpRoomName = document.getElementById('inputTextRoomName')
const inpRoomPwd  = document.getElementById('inputPasswordRoomPwd')
const inpUsePwd   = document.getElementById('inputCheckboxUsePwd')
const btnConfirm  = document.getElementById('btnSubmit')

btnConfirm.addEventListener('click', () => {
    roomName = inpRoomName.value
    fetch(`/host/create?name=${roomName}`)
        .then( (response) => {
            return response.text()
        })
        .then( (response) => {
            console.log(response)
            if(response === "OK") {
                window.location = `${window.location.protocol}//${window.location.host}/lobby?name=${roomName}`
            }
        })
})
