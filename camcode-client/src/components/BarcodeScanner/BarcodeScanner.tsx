import {barcodeService} from '@/services';
import {BarcodeScannerResult} from '@/types/barcodeScanner';
import React, {useEffect, useState} from 'react';

type BarcodeScannerProps = { onUpdate(result: BarcodeScannerResult): boolean }


const BarcodeScanner = (
	{onUpdate}: BarcodeScannerProps
) => {
	const [scannedBarcode, setScannedBarcode] = useState();

	useEffect(() => {
		(async () => {
			await barcodeService.runDecoder(setScannedBarcode);
		})();
		// @ts-ignore
		if (scannedBarcode && scannedBarcode?.text) {
			onUpdate(scannedBarcode);
		}
	}, [scannedBarcode]);

	return (
		<div id="scanner-container">
			<video id="video" className="dbrScanner-video" playsInline controls={false}/>
			<div style={{position: 'absolute', top: '0px'}}>
				<img id="overlay" style={{width: '90vw', height: '30vh'}} alt="loading"/>
			</div>
			<div style={{position: 'absolute', top: '0px'}}>
				<img id="capture" style={{width: '90vw', height: '30vh'}} alt="loading"/>
			</div>
			<canvas id="captureCanvas" hidden/>
			<canvas id="qrCanvas" hidden/>
		</div>
	);
};

export default BarcodeScanner;
