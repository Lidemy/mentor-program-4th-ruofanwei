

/*
有鑒於原本的寫法無擴充性，若是新增欄位就無法支援需要重新更改，因此在看完檢討影片後重新寫了一次

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const tel = document.getElementById('tel');
const how = document.getElementById('how');
const radios = document.querySelectorAll('input[name="radios"]');
const errorRadio = document.querySelector(".errorRadio");
const advice = document.getElementById('advice');


form.addEventListener('submit', e => {
    e.preventDefault();
    checkInputs();
});

function checkInputs () {
    / trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();
    const howValue = how.value.trim();
    const adviceValue = advice.value;
    const rightEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    const rightTel = /^[09]{2}\d{8}$/;
    var check = false;
    let selectedValue = [];
    errorRadio.innerHTML = "";


    if (usernameValue === '') {
        setErrorFor(username, '此欄位為必填，請重新確認');
        check = false
    } else {
        setSuccessFor(username);
        check = true
        selectedValue += '\n' + usernameValue
    }

    if (emailValue === '') {
        setErrorFor(email, '此欄位為必填，請重新確認');
        check = false
    } else if (!rightEmail.test(emailValue)) {
        setErrorFor(email, '請輸入正確的電子信箱');
        check = false
    } else {
        setSuccessFor(email);
        check = true
        selectedValue += '\n' + emailValue
    }

    if (telValue === '') {
        setErrorFor(tel, '此欄位為必填，請重新確認');
        check = false
    } else if (!rightTel.test(telValue)) {
        setErrorFor(tel, '請正確填寫手機格式09XX000000(共10碼)');
        check = false
    } else {
        setSuccessFor(tel);
        check = true
        selectedValue += '\n' + telValue
    }
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            check = true;
            selectedValue += '\n' + radios[i].value
        }
    }
    if (!check) {
        errorRadio.innerHTML = "選項為必選，請重新確認";
        check = false;
    }
    if (howValue === '') {
        setErrorFor(how, '此欄位為必填，請重新確認');
        check = false
    } else {
        setSuccessFor(how);
        check = true
        selectedValue += '\n' + howValue
    }
    if (check == true && check !== false) {
        alert('請確認將送出的資料是否正確:' + selectedValue + '\n' + adviceValue)
    }

}

function setErrorFor (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
*/
document
  .querySelector('form')
  .addEventListener('submit', (e) => { // 按enter跟button都可以送出表單
    e.preventDefault(); // 阻止預設事件
    let hasError = false;
    const values = {};

    const elements = document.querySelectorAll('.required');
    // eslint-disable-next-line no-restricted-syntax
    for (const element of elements) {
      const radios = element.querySelectorAll('input[type=radio]');
      const input = element.querySelector('input[type=text]');
      let isValid = true;
      if (input) {
        values[input.name] = input.value;
        if (!input.value) { // 必填欄位不能沒有輸入資料
          isValid = false;
        }
        if (input.value.trim() === '') { // 輸入的資料不能為空白格
          isValid = false;
        }
      } else if (radios.length) {
        // querySelectorAll 回傳的是一個nodeList，使用[...radios]＝> 把回傳的資料打散再組裝回陣列
        // .some() 判斷有沒有任何radio是checked
        isValid = [...radios].some(radio => radio.checked);
        if (isValid) {
          const thRadio = element.querySelector('input[type=radio]:checked');
          values[thRadio.name] = thRadio.value;
        }
      } else {
        // eslint-disable-next-line no-continue
        continue;
      }
      if (!isValid) {
        element.classList.remove('hide-error');
        hasError = true;
      } else {
        element.classList.add('hide-error');
      }
    }
    if (!hasError) { // values 是物件
      const answer = JSON.stringify(values);
      // eslint-disable-next-line no-alert
      alert(answer);
    }
  });
