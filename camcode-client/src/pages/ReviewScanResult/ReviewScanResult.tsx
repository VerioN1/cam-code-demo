//@ts-nocheck
import useCustomTheme from '@/hooks/useCustomTheme';
import useFetchTheme from '@/hooks/useFetchTheme';
import Layout from '@/layout/Layout';
import Button from '@/lib/Button/Button';
import { Anchor, Card, Center, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewScanResult = () => {
	const {state} = useLocation();
	const navigate = useNavigate();
	const {customStyle} = useCustomTheme();
	const textColor = () => {
		const strToNum = Number(state.textColor);
		const retNumber = '#' + ('000000' + (strToNum >>> 0).toString(16)).slice(-6);
		console.log('retNumber', retNumber);
		return retNumber;
	};
	useFetchTheme();
	const generateSurveyLink = customStyle.surveyMetaData ?
		`${customStyle.surveyLink}${customStyle.surveyLink[customStyle.surveyLink.length - 1] === '/' ? '' : ''}?${customStyle.surveyQueryParams[0]}=${state?.codeFromCamera?.slice(0, -2) || state.scannedBarcode}&${customStyle?.surveyQueryParams[1]}=${state?.sQuality?.substring(0, 3)}&${customStyle?.surveyQueryParams[2]}=${state.scannedBarcodeSCID}` : customStyle.surveyLink;

	return (
		<Layout>
			<Center sx={{flexDirection: 'column', textAlign: 'center'}}>
				<Text>{state?.result}</Text>
				<Card
					my="2rem"
					radius="xl"
					sx={{background: state?.cardBg, width: '90%', height: '25vh'}}
				>
					<Center sx={{height: '100%', textAlign: 'center'}}>
						<Title order={3} style={{color: textColor()}}>{state.sQuality}</Title>
					</Center>
				</Card>
				{/*<Text>{JSON.stringify(state)}</Text>*/}
				<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>ID</Text> <Text>{state.miniCodeState?.scanId}</Text>
				</div>
				<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Temp</Text> <Text>{state.miniCodeState?.temp}</Text>
				</div>
				<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Duration Above 0 degrees</Text>
					<Text>{state.miniCodeState?.above0TempTime >= 99 ? 'above 99 minutes' : `${state.miniCodeState?.above0TempTime} minutes`}</Text>
				</div>
				<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
					<Text>Duration below 0 degrees</Text>
					<Text>{state.miniCodeState?.below0TempTime >= 9 ? 'above 10 minutes' : `${state.miniCodeState?.below0TempTime} minutes`}</Text>
				</div>
				{/*<Button mb="0.5rem" sx={{width: '50%'}} onClick={() => navigate('/Feedback')}>*/}
				{/*	FeedBack*/}
				{/*</Button>*/}
				{/*{!(customStyle?.removeContactButton) &&*/}
				{/*    <Button my="0.5rem" sx={{width: '50%'}} onClick={() => navigate('/ContactUs')}>*/}
				{/*        Contact Us*/}
				{/*    </Button>}*/}
				{/*{customStyle.surveyLink && (*/}
				{/*	<>*/}
				{/*		<Text mt="2rem">We Want Your Feedback!</Text>*/}
				{/*		<Anchor*/}
				{/*			my="0.5rem"*/}
				{/*			sx={{width: '50%', textDecoration: 'none !important', background: '#1c7ed6', color: '#fff', borderRadius: '20px'}}*/}
				{/*			href={generateSurveyLink}*/}
				{/*				target="_blank"*/}
				{/*		>*/}
				{/*			Survey*/}
				{/*		</Anchor>*/}
				{/*	</>*/}
				{/*)}*/}
				<Button mt="4rem" sx={{width: '50%'}} color="red" onClick={() => navigate('/ScanCode')}>
					Scan Again
				</Button>
			</Center>
		</Layout>
	);
};

export default ReviewScanResult;
