import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  ${props => props.style}
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #f3f4f6;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  ${props => props.onClick && css`
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(234, 88, 12, 0.1);
      border-color: #fdba74;
    }
  `}
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background: white;
          color: #EA580C;
          border: 2px solid #EA580C;
        `;
      case 'danger':
        return css`
          background: #DC2626;
          color: white;
          border: none;
        `;
      case 'grey':
        return css`
          background: #374151;
          color: white;
          border: none;
        `;
      case 'primary':
      default:
        return css`
          background: linear-gradient(135deg, #EA580C 0%, #F97316 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 6px rgba(234, 88, 12, 0.2);
        `;
    }
  }}

  &:hover {
    opacity: 0.9;
    transform: scale(1.02);
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #F97316;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #F97316;
  }
`;