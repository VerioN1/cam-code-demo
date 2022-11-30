import varCodeDev from './axios.config';

export type SendBarcodeParams = { barcode: string; long: number; lat: number, miniCodeState?: object };

export const sendBarcode = async ({barcode, long, lat, miniCodeState}: SendBarcodeParams) => {
	const params = {barcode, long, lat};
	const {data} = await varCodeDev.post('/proxy/barcode', params);
	return {...data, miniCodeState};
};

export const sendFeedback = async (
	barcode: string,
	feedback: string,
	iScanID: string,
	img: string | undefined,
	img2: string | undefined,
	img3: string | undefined
) => {
	const params = {iScanID, barcode, feedback, img, img2, img3};
	const {data} = await varCodeDev.post('/proxy/feedback', params);
	return data;
};

export const validateBarcode = async ({
	scannedBarcode,
	currentScannedQC
}: { scannedBarcode: string, currentScannedQC: string }) => {
	const {data} = await varCodeDev.post('proxy/validate-scan', {scannedBarcode, currentScannedQC});
	return data.newQC;
};
