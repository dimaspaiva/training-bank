import React from 'react';
import { Container } from '../Board/styles';
import Profile from '../Profile';

export default function Board() {
  return (
    <Container>
      <Profile />
      <Profile />
      <Profile />
      <Profile />
    </Container>
  );
}
