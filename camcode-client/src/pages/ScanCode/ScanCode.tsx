import useCustomTheme from '@/hooks/useCustomTheme';
import useFetchTheme from '@/hooks/useFetchTheme';
import Layout from '@/layout/Layout';
import TempBarcodeScanner2 from '@/pages/ScanCode/TempBarcodeScanner2';
import { sendBarcode, validateBarcode } from '@/services/barcode.service';
import { Button, Center } from '@mantine/core';
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
	const [code, setCode] = useState<string>('');
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const handleSendBarcode = useMutation(sendBarcode, {
		onError: (e) => {
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
			if (code.length > 10) {
				setIsLoading(true);
				// const preparedCode = code
				// const Qc = await validateScan.mutateAsync({
				// 	scannedBarcode: preparedCode.slice(0, 10),
				// 	currentScannedQC: code.slice(-2)[0]
				// });
				//
				// const barcodeToSend = replaceAt(preparedCode, 10, Qc);
				setCustomStyle((prev: any) => ({...prev, barcode: code}));
				handleSendBarcode.mutate({
					barcode: code,
					//@ts-ignore
					long: state?.longitude || 0,
					//@ts-ignore
					lat: state?.latitude || 0
				});
			}
		};
		sendRequest();
	}, [code]);

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
		let scannedCode = '1212033';
		if(typeof code === 'string') {
			scannedCode = code;
		}
		const scanId = `${scannedCode.slice(0,2)}`
		const temp = `${scannedCode.slice(2,4)}`
		const below0TempTime = `${scannedCode[4]}`;
		const above0TempTime = `${scannedCode.slice(5,7)}`;
		const qc = 2;
		const codeToSend = `90000000${scanId}${qc}9`

		handleSendBarcode.mutateAsync({
			barcode: codeToSend,
			//@ts-ignore
			long: state?.longitude || 0,
			//@ts-ignore
			lat: state?.latitude || 0,
			miniCodeState: {
				above0TempTime,
				below0TempTime,
				temp,
				qc,
				scanId
			}
		});
		// validateBarcode({
		// 	scannedBarcode: scannedCode.slice(0, 10),
		// 	currentScannedQC: scannedCode.slice(-2)[0]
		// });
	};

	return (
		<Layout>
			<Center sx={{flexDirection: 'column', paddingInline: '2rem'}}>
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

