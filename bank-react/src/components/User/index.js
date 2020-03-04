import React from 'react';

import { Container, Cpf, Name, Photo, ProfilePhoto } from './styles';

export default function User() {
  return (
    <Container>
      <ProfilePhoto>
        <Photo src="https://api.adorable.io/avatars/285/abott@adorable.p" />
      </ProfilePhoto>
      <Cpf>#11655588431</Cpf>
      <Name>Dimas Paiva</Name>
    </Container>
  );
}
