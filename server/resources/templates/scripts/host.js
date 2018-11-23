const inpRoomName = document.getElementById('inputTextRoomName');
const inpRoomPwd  = document.getElementById('inputPasswordRoomPwd');
const inpUsePwd   = document.getElementById('inputCheckboxUsePwd');
const btnConfirm  = document.getElementById('submitBtn');

btnConfirm.addEventListener('click', () => {
    window.location = `${window.location.protocol}//${window.location.host}/test`
});
