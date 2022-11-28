import React from 'react';
import Layout from '@/layout/Layout';
import useCustomTheme from '@/hooks/useCustomTheme';
import {Anchor, Center, Text} from '@mantine/core';
import useFetchTheme from '@/hooks/useFetchTheme';

const ContactUs = () => {
	const {customStyle} = useCustomTheme();
	useFetchTheme();
	return (
		<Layout>
			<Center sx={{flexDirection: 'column', height: '100%'}}>
				<Text>Email: {customStyle.email}</Text>
				<Text>Phone: {customStyle.phone}</Text>
				<Anchor href={customStyle.websiteLink}>Link to Website</Anchor>
			</Center>
		</Layout>
	);
};

export default ContactUs;
