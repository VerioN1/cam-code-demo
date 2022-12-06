import useCustomTheme from '@/hooks/useCustomTheme';
import useFetchTheme from '@/hooks/useFetchTheme';
import Layout from '@/layout/Layout';
import TempBarcodeScanner2 from '@/pages/ScanCode/TempBarcodeScanner2';
import { sendBarcode, validateBarcode } from '@/services/barcode.service';
import { Button, Center, Input, Text } from '@mantine/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const getHexColor = (number: string) => {
	const strToNum = Number(number);
	if (!strToNum) return '#989a81';
	return '#' + ('000000' + (strToNum >>> 0).toString(16)).slice(-6);
};

const replaceAt = (str: string, index: number, char: string) => {
	const a = str.split('');
	a[index] = char;
	return a.join('');
};

const ScanCode = () => {
	useFetchTheme();
	const {setCustomStyle} = useCustomTheme();
	const {state} = useLocation();
	const [cordinates, setCordinates] = useState({latitude: 0, longitude: 0});
	const [code, setCode] = useState<string>('');
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [firstQcLimit, setFirstQcLimit] = useState(15);
	const [secondQcLimit, setSecondQcLimit] = useState(60);
	const [thirdQcLimit, setThirdQcLimit] = useState(240);

	const handleSendBarcode = useMutation(sendBarcode, {
		onError: (e) => {
			console.log(e);
			debugger;
			location.reload();
		},
		onSuccess: (res) => {
			setCustomStyle((prev: any) => ({...prev, iScanID: res.message.scid}));
			navigate('/ReviewScan', {
				state: {
					miniCodeState: res.miniCodeState,
					textColor: res.message.nColor,
					scannedBarcode: code.slice(0, 10),
					currentScannedQC: code.slice(-2)[0],
					scannedBarcodeSCID: res.message.scid,
					codeFromCamera: code,
					cardBg: getHexColor(res.message.nBColor),
					result: res.message.sConfirmationText,
					sQuality: res.message.sQuality
				}
			});
		}
	});

	useEffect(() => {
		const sendRequest = async () => {
			try{
				const res = await axios.get('https://geolocation-db.com/json/')
				console.log(res.data);
				setCordinates({latitude: res.data.latitude, longitude: res.data.longitude});
			}catch (e) {
				console.log(e);
			}
		};
		sendRequest();
	}, []);

	const onSkip = () => {
		const scannedCode = 'P00011005352';
		setCode(scannedCode);
		handleSendBarcode.mutate({
			barcode: scannedCode.slice(0, 12),
			//@ts-ignore
			long: state?.longitude || 0,
			//@ts-ignore
			lat: state?.latitude || 0
		});
		validateBarcode({
			scannedBarcode: scannedCode.slice(0, 10),
			currentScannedQC: scannedCode.slice(-2)[0]
		});
		// navigate('/ReviewScan', {
		// 	state: {
		// 		cardBg: '#ab2929',
		// 		result: 'You Meal is out of date'
		// 	}
		// });
	};
	const onMiniCodeScan = (code: string | undefined) => {
		let scannedCode = '1271033';
		if(typeof code === 'string') {
			scannedCode = code;
		}
		console.log(scannedCode);
		const scanId = `${scannedCode.slice(0,2)}`
		const below0TempTime = Number(`${scannedCode[2]}`);
		const temp = `${scannedCode.slice(3,5)}`
		const above0TempTime =  Number(`${scannedCode.slice(5,7)}`);
		let qc = 1;
		if(Number(above0TempTime) < firstQcLimit){
			qc = 1;
		}
		else if(Number(above0TempTime) >= firstQcLimit && Number(above0TempTime) < secondQcLimit) {
			qc = 2;
		}else if (Number(above0TempTime) >= secondQcLimit && Number(above0TempTime) < thirdQcLimit) {
			qc = 3;
		}else if (Number(above0TempTime) >= thirdQcLimit) {
			qc = 4;
		}
		if(Number(below0TempTime) >= 1){
			qc = 5;
		}
		const miniCodeState =  {
			above0TempTime,
			below0TempTime,
			temp,
			qc,
			scanId
		}
		const codeToSend = `90000000${scanId}${qc}9`

		handleSendBarcode.mutateAsync({
			barcode: codeToSend,
			//@ts-ignore
			long: state?.longitude || cordinates.longitude,
			//@ts-ignore
			lat: state?.latitude || cordinates.latitude,
			miniCodeState
		});
	};

	return (
		<Layout>
			<Center sx={{flexDirection: 'column', paddingInline: '2rem'}}>
				<Text>Set QC limits</Text>
				<Input value={firstQcLimit} type="number" placeholder="set first qc limit" mt="1rem"  onChange={(e: any) => setFirstQcLimit(e.target.value)}/>
				<Input value={secondQcLimit} type="number" placeholder="set second qc limit" mt="1rem" onChange={(e: any) => setSecondQcLimit(e.target.value)}/>
				<Input value={thirdQcLimit} type="number" placeholder="set third qc limit" mt="1rem" onChange={(e: any) => setThirdQcLimit(e.target.value)}/>
				{/*<TempBarcodeScanner onDetected={(resp: string): void => {*/}
				{/*	console.log(resp);*/}
				{/*}} />*/}
				<TempBarcodeScanner2 onDetected={(resp: string): void => {
					setCode(resp);
				}}
				onDetectedMini={onMiniCodeScan}/>
				{/*{!code && (*/}
				{/*	<div style={{width: '90vw'}}>*/}
				{/*		<Text>*/}
				{/*			If you are having trouble scanning the tag, change the barcode’s distance from the*/}
				{/*			camera.*/}
				{/*		</Text>*/}
				{/*		<BarcodeScanner*/}
				{/*			onUpdate={(resp: BarcodeScannerResult): boolean => {*/}
				{/*				if (resp) {*/}
				{/*					if (resp.text.length > 9) setCode(resp.text);*/}
				{/*					return true;*/}
				{/*				}*/}
				{/*				return false;*/}
				{/*			}}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*)}*/}
				{isLoading && <p>loading...</p>}
				{/*@ts-ignore*/}
				{import.meta.env.DEV && <Button onClick={onMiniCodeScan}>Skip</Button>}
			</Center>
		</Layout>
	);
};

export default ScanCode;

