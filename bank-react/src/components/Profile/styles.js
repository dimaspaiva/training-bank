import styled from 'styled-components';

export const Container = styled.div`
  height: 75vh;
  width: 20vw;
  margin: 9vw 3vw 0 3vw;
  background: #333333;
  display: flex;
  border-radius: 0.21vw;
  background: linear-gradient(180deg, #d3d3d3 0%, rgba(255, 255, 255, 0) 100%),
    #8e8e8e;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.12);
  justify-content: center;
`;

export const ProfilePhoto = styled.div`
  margin-top: 4.5vh;
  height: 7.5vw;
  width: 7.5vw;
  border-radius: 100vw;
  background: #545454;
  overflow: hidden;
`;

export const Photo = styled.img`
  width: 100%;
`;
