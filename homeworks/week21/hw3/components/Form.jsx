/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import styled, { keyframes } from 'styled-components';
import React from 'react';
import { useState } from 'react';

const FadeInDown = keyframes`
  0% {
      opacity: 0;
      transform: translateY(-20px);
   }
   100% {
      opacity: 1;
      transform: translateY(0);
   }
`;
const FormWrapper = styled.form`
  padding: 0 40px;
  
`;
const FormControl = styled.form`
  margin-right: 20px;
`;
const Title = styled.p`
  display: inline-block;
  margin-bottom: 10px;
`;
const SubTile = styled.p`
  font-size: 14px;
  margin-top: 10px;
  
`;
const Span = styled.span`
  color: #e74149;
`;
const Input = styled.input`
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  &:focus {
    outline: 0;
    border-color: #a4d7e1;
  }
`;
const RadioControl = styled.div`
  margin: 25px 0px;
`;
const OptionGroup = styled.label`
  display: inline-block;
  margin-bottom: 5px;
`;
const Option = styled.input`
  margin-left: 40px;
`;
const SubmitButton = styled.button`
  background-color: #216583;
  border: 2px solid #216583;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-family: inherit;
  font-size: 16px;
  padding: 4px 20px;
  margin-top: 40px;
  margin-bottom: 20px;
  &:hover {
    background-color: #293462;
    border: 2px solid #293462;
  }
`;
const Notice = styled.div`
  font-size: 14px;
  font-weight: normal;
  margin-top: 21px;
  padding-bottom: 35px;
`;
const ErrorMessage = styled.p`
  color: #fa7f72;
  letter-spacing: 1px;
  animation: ${FadeInDown} 1s;
  text-shadow: 0 0 0.1em #ff4444, 0 1px 1px #b2deec;
`;
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');
  const [advice, setAdvice] = useState('');
  const [typeName, setTypeName] = useState();
  const [validEmail, setValidEmail] = useState();
  const [validPhone, setValidPhone] = useState();
  const [chooseRadio, setChooseRadio] = useState();
  const [typeReason, setTypeReason] = useState();

  const handleInputChange = setVlaue => (e) => {
    setVlaue(e.target.value);
  };
  // no errorMessage while Typing
  const handleInputFocus = (e) => {
    setTypeName(true)
      || setValidEmail(true)
      || setValidPhone(true)
      || setChooseRadio(true)
      || setTypeReason(true);
  };
  // check email is valid or not
  const isEmailValid = (email) => {
    const regexForEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!regexForEmail.test(email)) {
      notValid = true;
      return setValidEmail(false);
    }
    setValidEmail(true);
  };
  // check pnone number is valid or not
  const isPhoneValid = (phone) => {
    const regexForPhone = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (!regexForPhone.test(phone)) {
      notValid = true;
      return setValidPhone(false);
    }
    setValidPhone(true);
  };
  // alert all response while submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    isValidity();
    if (!notValid) {
      alert(
        `🙋‍♂ 請再次確認您輸入的資料：${
          JSON.stringify({
            name, email, phone, type, reason, advice,
          })
        } ， 🙇‍♂ 感謝您的填寫。`,
      );
    }
  };
  let notValid = false;

  const isValidity = () => {
    // verify nickname
    if (name === '') {
      notValid = true;
      setTypeName(false);
    } else {
      setTypeName(true);
    }
    // verify email
    isEmailValid(email);
    // verify phone nimber
    isPhoneValid(phone);
    // verify radio
    if (type === '') {
      notValid = true;
      setChooseRadio(false);
    } else {
      setChooseRadio(true);
    }
    // verify reason
    if (reason === '') {
      notValid = true;
      setTypeReason(false);
    } else {
      setTypeReason(true);
    }
  };

  return (
    <FormWrapper>
      <FormControl>
        <Title>
          暱稱
          <Span>*</Span>
        </Title>
        <Input
          name="nickname"
          type="text"
          placeholder="您的回答"
          value={name}
          onChange={handleInputChange(setName)}
          onFocus={handleInputFocus}
        />
        {typeName === false && <ErrorMessage>⚠ 請輸入暱稱 ⚠</ErrorMessage>}
      </FormControl>
      <FormControl>
        <Title>
          電子郵件
          <Span>*</Span>
        </Title>
        <Input
          name="email"
          type="text"
          placeholder="您的電子郵件"
          value={email}
          onChange={handleInputChange(setEmail)}
          onFocus={handleInputFocus}
        />
        {validEmail === false && (
          <ErrorMessage>⚠ 請輸入完整的電子郵件 ⚠</ErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <Title>
          手機號碼
          <Span>*</Span>
        </Title>
        <Input
          name="phone"
          type="text"
          placeholder="您的手機號碼"
          value={phone}
          onChange={handleInputChange(setPhone)}
          onFocus={handleInputFocus}
        />
        {validPhone === false && (
          <ErrorMessage>⚠ 請輸入完整的手機號碼 ⚠</ErrorMessage>
        )}
      </FormControl>

      <RadioControl>
        <Title>
          報名類型
          <Span>*</Span>
        </Title>
        <OptionGroup>
          <Option
            name="type"
            type="radio"
            placeholder="您的回答"
            value="躺在床上用想像力實作"
            onChange={handleInputChange(setType)}
            onFocus={handleInputFocus}
          />
          躺在床上用想像力實作
        </OptionGroup>
        <OptionGroup>
          <Option
            name="type"
            type="radio"
            placeholder="您的回答"
            value="趴在地上滑手機找現成的"
            onChange={handleInputChange(setType)}
            onFocus={handleInputFocus}
          />
          趴在地上滑手機找現成的
        </OptionGroup>
        {chooseRadio === false && (
          <ErrorMessage>⚠ 請選取您的報名類型 ⚠</ErrorMessage>
        )}
      </RadioControl>
      <FormControl>
        <Title>
          怎麼知道這個活動的？
          <Span>*</Span>
        </Title>
        <Input
          name="Reason"
          type="text"
          placeholder="您的回答"
          value={reason}
          onChange={handleInputChange(setReason)}
          onFocus={handleInputFocus}
        />
        {typeReason === false && (
          <ErrorMessage>⚠ 請告訴我們您是怎麼知道這個活動的 ⚠</ErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <Title>其他</Title>
        <SubTile>對活動的一些建議</SubTile>
        <Input
          name="advice"
          type="text"
          placeholder="您的回答"
          value={advice}
          onChange={handleInputChange(setAdvice)}
          onFocus={handleInputFocus}
        />
      </FormControl>
      <SubmitButton onClick={handleSubmitForm}>提交</SubmitButton>
      <Notice>請勿透過表單送出您的密碼。</Notice>
    </FormWrapper>
  );
}
export default Form;
