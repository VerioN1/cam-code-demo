import React from "react";
import BarCodeScanner from 'barcode-react-scanner';
import './temp-barcode.css';

const TempBarcodeScanner2 = ({onDetected, onDetectedMini}) => {
	return (
		<>
			<BarCodeScanner onUpdate={(err, resp) => {
				const codeRead = resp?.text;
				if (!codeRead) return;
				if (codeRead.length === 12 && codeRead.includes('P') && !Number.isNaN(codeRead.slice(1))) {
					onDetected(codeRead);
				}else if(codeRead.length === 7 && !Number.isNaN(codeRead)){
					onDetectedMini(codeRead);
				}
			}}
			/>
		</>
	);
}

export default TempBarcodeScanner2;
