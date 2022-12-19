//@ts-nocheck
import useFetchTheme from '@/hooks/useFetchTheme';
import Layout from '@/layout/Layout';
import Button from '@/lib/Button/Button';
import { Card, Center, Text, Title } from '@mantine/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewScanResult = () => {
	const {state} = useLocation();
	const navigate = useNavigate();
	const textColor = () => {
		const strToNum = Number(state.textColor);
		return '#' + ('000000' + (strToNum >>> 0).toString(16)).slice(-6);
	};
	useFetchTheme();
	const isProScan = !!state.proCodeState;

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
				{isProScan ? (
					<>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>ID</Text> <Text>{state.proCodeState?.scanId}</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Temp one</Text> <Text>{Number(state.proCodeState?.temp) > 50 ? `${ 50 - Number(state.proCodeState?.temp)}`: state.proCodeState?.temp }</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Duration Above Temp one </Text>
							<Text>{state.proCodeState?.counterForQC >= 99 ? 'above 99 minutes' : `${state.proCodeState?.counterForQC} minutes`}</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Temp two</Text> <Text>{Number(state.proCodeState?.temp2) > 50 ? `${50 - Number(state.proCodeState?.temp2)}`: state.proCodeState?.temp2 }</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Duration Above Temp two </Text>
							<Text>{state.proCodeState?.counter2 >= 9 ? 'above 9 minutes' : `${state.proCodeState?.counter2} minutes`}</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Minutes below zero </Text>
							<Text>{state.proCodeState?.frozen >= 9 ? 'above 9 minutes' : `${state.proCodeState?.frozen} minutes`}</Text>
						</div>
						<Button mt="4rem" sx={{width: '50%'}} color="red" onClick={() => navigate('/ScanCode')}>
							Scan Again
						</Button>
					</>
				) : (
					<>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>ID</Text> <Text>{state.miniCodeState?.scanId}</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Temp</Text> <Text>{Number(state.miniCodeState?.temp) > 70 ? `-${Number(state.miniCodeState?.temp) - 70}`: state.miniCodeState?.temp }</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Duration Above Threshold </Text>
							<Text>{state.miniCodeState?.above0TempTime >= 99 ? 'above 99 minutes' : `${state.miniCodeState?.above0TempTime} minutes`}</Text>
						</div>
						<div style={{display: 'flex', width: "90%", justifyContent: 'space-between', alignItems: 'center'}}>
							<Text>Duration Below Threshold</Text>
							<Text>{state.miniCodeState?.below0TempTime >= 9 ? 'above 10 minutes' : `${state.miniCodeState?.below0TempTime} minutes`}</Text>
						</div>

						<Button mt="4rem" sx={{width: '50%'}} color="red" onClick={() => navigate('/ScanCode')}>
							Scan Again
						</Button>
					</>
				)}
			</Center>
		</Layout>
	);
};

export default ReviewScanResult;
