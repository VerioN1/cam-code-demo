import React from 'react';
import { headerStyle } from '@/components/Header/Header.style';
import { Anchor, Center, Container, Image, Text } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';

const Header = () => {
  const { customStyle } = useCustomTheme();
  const { classes } = headerStyle(customStyle.notchBG)();
  return (
    <header>
      <meta name="theme-color" content={customStyle.notchBG} />
      <Container classNames={classes} fluid>
        {/*<Anchor m="1rem" href={customStyle.headerIconURL}>*/}
        {/*<Image src={customStyle.headerIcon} />*/}
        {/*</Anchor>*/}
      </Container>
    </header>
  );
};

export default Header;
