import React, {SetStateAction, useEffect, useState} from 'react';
import Layout from '@/layout/Layout';
import {Center, Text, Title} from '@mantine/core';
import {useNavigate, useParams} from 'react-router-dom';
import Button from '@/lib/Button/Button';
import useFetchTheme from '@/hooks/useFetchTheme';

const askLocationAccessPermission = (setter: React.Dispatch<SetStateAction<any>>) => {
	function error(err: any) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}

	navigator.geolocation.getCurrentPosition(
		(position) => {
			const {latitude, longitude} = position.coords;
			setter({latitude, longitude});
		},
		error,
		{
			enableHighAccuracy: true,
			timeout: 15000,
			maximumAge: 0
		}
	);
};
const LandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const params: any = useParams();
	const navigate = useNavigate();
	useFetchTheme(params, setIsLoading);
	const [coordinates, setCoordinates] = useState({latitude: 0, longitude: 0});
	useEffect(() => {
		askLocationAccessPermission(setCoordinates);
	}, []);
	return (
		<>
			{isLoading ? (
				<Center>
					<Text>Loading...</Text>
				</Center>
			) : (
				<Layout>
					<Center sx={{flexDirection: 'column', textAlign: 'center'}}>
						<Title mt="1rem" sx={{fontFamily: 'Poppins'}}>
							Smart Scanner PRO | MINI
						</Title>
						<Text mt="2rem">Please allow camera and location access to continue scanning</Text>
						<Text mt="2rem">If you blocked your camera by mistake, simply refresh the page!</Text>
						<Button
							mt="5rem"
							onClick={() => navigate('/ScanCode', {state: {...coordinates}})}
							state={coordinates}
						>
							Scan Barcode
						</Button>
					</Center>
				</Layout>
			)}
		</>
	);
};

export default LandingPage;
