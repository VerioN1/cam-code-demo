import React, {useState} from "react";
import BarCodeScanner from 'barcode-react-scanner';
import './temp-barcode.css';

const TempBarcodeScanner2 = () => {
	const [code, setCode] = useState('')

	return (
		<>
			{ code && <p> {code} </p> }
			<BarCodeScanner onUpdate={ (err, resp) => {
				if(resp) {
				setCode(resp.getText())
			}}}
			/>
		</>
	);
}

export default TempBarcodeScanner2;
