import React, { useState } from 'react';

import { Container, Info, InfoHeader } from './styles';

export default function Bills() {
  const [height, setHeight] = useState({ debit: '90%', salary: '12%' });

  const test = [
    { text: 'debit', value: 30.3 },
    { text: 'debit', value: 30.3 },
    { text: 'debit', value: 30.3 },
    { text: 'debit', value: 30.3 }
  ];

  function handleClick() {
    const c = height.salary;
    setHeight({ salary: height.debit, debit: c });
  }

  return (
    <Container>
      <Info bgColor={'#faa3a3'} height={height.debit} index={2}>
        <InfoHeader onClick={() => handleClick()}>
          <h2>Debits</h2>
          <h2>R$ 300,00</h2>
        </InfoHeader>
        <ul>
          {test.map(item => (
            <div>
              <h3>{item.text}</h3> <h3>item.value</h3>
            </div>
          ))}
        </ul>
      </Info>
      <Info bgColor={'#b1f5a6'} height={height.salary} index={0}>
        <InfoHeader onClick={() => handleClick()}>
          <h2>Salary</h2>
          <h2>R$ 2100,00</h2>
        </InfoHeader>
        <ul>
          {test.map(item => (
            <div>
              <h3>{item.text}</h3> <h3>item.value</h3>
            </div>
          ))}
        </ul>
      </Info>
    </Container>
  );
}
