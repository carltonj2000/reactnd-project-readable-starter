import {Link} from 'react-router-dom';
import styled from 'styled-components';

const state = {
width: '300px',
height: '80px',
labelw: '90px'
};

export const LinkAdd = styled(Link)`
  background: #ff3311;
  `;
export const LinkEdit = styled(Link)`
  background: #00ffff;
  font-size: 12px;
  `;
export const LinkDelete = styled.a`
  background: #ff7700;
  font-size: 12px;
  `;
export const Input = styled.input`
  width: ${state.width};
  background: #eeeeee;
  margin-bottom: 2px;
  `;
export const Text = styled.textarea`
  width: ${state.width};
  background: #eeeeee;
  height: ${state.height};
  `;
export const Label = styled.label`
  display: inline-block;
  width: ${state.labelw};
  vertical-align: top;
  `;
