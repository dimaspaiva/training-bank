import React from 'react';
import { Container, Photo, ProfilePhoto } from './styles';

export default function Profile() {
  return (
    <Container>
      <ProfilePhoto>
        <Photo src="https://api.adorable.io/avatars/285/abott@adorable.p" />
      </ProfilePhoto>
    </Container>
  );
}
