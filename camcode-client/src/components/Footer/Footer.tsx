import React from 'react';
import { Footer as FooterM, Image } from '@mantine/core';
import useCustomTheme from '@/hooks/useCustomTheme';

const Footer = () => {
	const {customStyle} = useCustomTheme();
	return (
		<FooterM
			height="13vh"
			sx={{
				display: 'flex',
				minHeight: '200px',
				background: customStyle.notchBG,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			{/*{customStyle.footerIcon && <Image height="13vh" src={customStyle.footerIcon}/>}*/}
		</FooterM>
	);
};

export default Footer;
