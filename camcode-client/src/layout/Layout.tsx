import React from 'react';
import {Container} from '@mantine/core';
import {layoutStyle} from '@/layout/Layout.style';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import useCustomTheme from '@/hooks/useCustomTheme';

type Props = {
	children: React.ReactNode;
};
const Layout = ({children}: Props) => {
	const {classes} = layoutStyle();
	const {customStyle} = useCustomTheme();

	return (
		<Container classNames={classes} fluid>
			<Header/>
			<div style={{flex: '1', background: customStyle.contentBG, paddingInline: '1rem'}}>
				{children}
			</div>
			<Footer/>
		</Container>
	);
};

export default Layout;
