import React from 'react';
import { Button as MButton, ButtonProps } from '@mantine/core';
const Button = ({ children, ...props }: any) => {
  return (
    <MButton variant="outline" radius="xl" {...props}>
      {children}
    </MButton>
  );
};

export default Button;
