export type BarcodeScannerResult = {
	error?: string | null;
	height: number;
	format: number;
	img: string;
	text: string;
	width: number;
	timestamp: number;
}
