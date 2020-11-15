/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import React from 'react';
import Form from './Form';

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 645px;
  max-width: 100%;
`;
const Top = styled.div`
  border-top: solid 6px #fad312;
`;
const Header = styled.div`
  background-color: white;
  padding: 20px 40px;
`;
const H2 = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 28px;
`;
const H4 = styled.p`
  font-weight: normal;
  margin-bottom: 10px;
  font-size: 12px;
  letter-spacing: normal;
`;
const H5 = styled.p`
  font-weight: normal;
  font-size: 16px;
  letter-spacing: normal;
  color: #e74149;
`;
const Span = styled.span``;
function App() {
  return (
    <Container>
      <Top>
        <Header>
          <H2>新拖延運動報名表單</H2>
          <H4>活動日期：2020/12/10 ~ 2020/12/11</H4>
          <H4>活動地點：台北市大安區新生南路二段1號</H4>
          <H5>
            <Span>*</Span>
必填
          </H5>
        </Header>
      </Top>
      <Form />
    </Container>
  );
}

export default App;
