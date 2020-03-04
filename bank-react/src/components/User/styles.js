import styled from 'styled-components';

export const Container = styled.div``;

export const ProfilePhoto = styled.div`
  height: 7.5vw;
  width: 7.5vw;
  border-radius: 100vw;
  background: #545454;
  overflow: hidden;
  margin: 3vh auto 1vh auto;
  border: solid 0.3em #eaeaea;
  box-shadow: 0.6vh 0.3vh 1em rgba(0, 0, 0, 0.45);
`;

export const Photo = styled.img`
  width: 100%;
`;

export const Cpf = styled.p`
  color: #1e1e1e;
  font-size: 1em;
  text-align: center;
  margin-bottom: 2vh;
  letter-spacing: 0.03em;
`;

export const Name = styled.h1`
  box-shadow: 0.5vw 1vh 0.3em rgba(0, 0, 0, 0.1);
  background: rgba(210, 210, 210, 0.6);
  color: #1e1e1e;
  margin-left: 1.5vw;
  width: 75%;
  padding: 0.3vw 0.3vw 0.3vw 0.6vw;
  letter-spacing: 0.03em;
  font-size: 1.5em;
  border-radius: 0.12vw;
`;
