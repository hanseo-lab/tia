// src/components/common.jsx
import React from 'react';
import * as S from '../styles/Common.styled';

export const Container = (props) => (
  <S.Container {...props} />
);

export const Card = (props) => (
  <S.Card {...props} />
);

export const Button = (props) => (
  <S.Button {...props} />
);

export const Input = ({ label, ...props }) => (
  <S.InputWrapper style={props.style}>
    {label && <S.Label>{label}</S.Label>}
    <S.StyledInput {...props} />
  </S.InputWrapper>
);

export const Textarea = ({ label, ...props }) => (
  <S.InputWrapper>
    {label && <S.Label>{label}</S.Label>}
    <S.StyledTextarea {...props} />
  </S.InputWrapper>
);