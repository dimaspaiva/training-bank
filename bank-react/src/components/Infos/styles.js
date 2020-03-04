import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 57%;
  width: 93%;
  margin: 1.5vh auto 0 auto;
  overflow: hidden;
`;

export const Info = styled.div`
  padding: 1.2vh 0.6vw;
  height: ${props => props.height};
  background: ${props => props.bgColor};
  box-shadow: 0 1vw 2em rgba(0, 0, 0, 0.18);
  top-left-radius: 0.15vw;
  top-right-radius: 0.15vw;
  transition: 0.3s;
  transition: all 0.3s;
  index: ${props => props.index};

  ul div {
    width: 100%;
    display: flex;
    margin: 0.6vh 0;
    padding-top: 0.9vh;
    justify-content: space-between;
    border-top: solid 0.03em rgba(41, 41, 41, 0.3);
    transition: all 0.3s;
    opacity: 1;

    ${props =>
      props.height === '12%' &&
      css`
        margin: 0;
        padding: 0;
        border: none;
        opacity: 0;
        transition: all 0.3s ease;
      `}
  }
`;

export const InfoHeader = styled.div`
  cursor: pointer;
  justify-content: space-between;
  display: flex;

  :hover {
    text-shadow: 0 0.15vw 0.6em rgba(0, 0, 0, 0.12);
    color: rgb(30, 30, 30);
    transition: 0.3s;
  }
`;
