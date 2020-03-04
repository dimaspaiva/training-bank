import React from 'react';

import { Container } from './styles';

import User from '../User';
import Infos from '../Infos';

export default function Profile() {
  return (
    <Container>
      <User />
      <Infos />
    </Container>
  );
}
