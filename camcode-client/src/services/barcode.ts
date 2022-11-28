import {BarcodeFormat, ChecksumException, DecodeHintType, FormatException, NotFoundException} from '@zxing/library';
import {deserializeError} from 'serialize-error';

import HybridBinarizer from '@zxing/library/cjs/core/common/HybridBinarizer';
import BinaryBitmap from '@zxing/library/cjs/core/BinaryBitmap';
import {HTMLCanvasElementLuminanceSource} from '@zxing/library/cjs/browser/HTMLCanvasElementLuminanceSource';

import MultiFormatUPCEANReader from '@zxing/library/cjs/core/oned/MultiFormatUPCEANReader';
import {videoService} from '@/services/index';
import {BarcodeScannerResult} from '@/types/barcodeScanner';


const hints = new Map();
const formats = [BarcodeFormat.UPC_EAN_EXTENSION, BarcodeFormat];
const codeReader = new MultiFormatUPCEANReader();
hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

function updateDecodeResult(qrVal: any) {
	debugger;
	if (qrVal.text.length < 10) {
		return null;
	}
	return qrVal.text;
}

function zxingDecodeCanvas(canvas: HTMLCanvasElement) {
	const luminanceSource = new HTMLCanvasElementLuminanceSource(canvas);
	const hybridBinarizer = new HybridBinarizer(luminanceSource);
	let binBitmap = new BinaryBitmap(hybridBinarizer);
	let error = null;
	let result = null;

	try {
		result = codeReader.decode(binBitmap, hints);
		if (!result) error = 'decoder returns null';
	} catch (err) {
		if (err instanceof NotFoundException) error = 'No BarCode found.';
		else if (err instanceof ChecksumException) error = 'BarCode found, checksum failed';
		else if (err instanceof FormatException) error = 'BarCode found, invalid format';
		else error = deserializeError(err);
	}

	return {...result, error};
}

async function decodeCanvas(canvas: HTMLCanvasElement) {
	let result = zxingDecodeCanvas(canvas);
	let cw = canvas.width, ch = canvas.height;
	if (result?.error) return result;
	let [sx, sy, swidth, sheight] = [cw * .20, ch * .35, cw * .6, ch * .3];
	let canvas2 = <HTMLCanvasElement>document.getElementById('qrCanvas');
	canvas2.setAttribute('width', '' + swidth);
	canvas2.setAttribute('height', '' + sheight);
	const ctx = canvas2.getContext('2d');
	if (!ctx) throw 'no context';
	ctx.drawImage(canvas, sx, sy, swidth, sheight, 0, 0, swidth, sheight);

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'blue';
	ctx.rect(swidth / 2, sheight / 2, 4, 4);
	ctx.stroke();

	return {...result, img: canvas2.toDataURL(), height: canvas2.height, width: canvas2.width};
}

async function runDecoder(updateResult: Function) {
	const overlay = document.getElementById('overlay');
	const capture = document.getElementById('capture');
	const videoElement = <HTMLVideoElement>document.getElementById('video');
	const canvas = videoService.getCaptureCanvas(videoElement);
	if (!canvas || !videoElement || !capture || !overlay) return;
	const ctx = canvas.getContext('2d');
	if (!ctx) return;
	const width = ctx.canvas.width, height = ctx.canvas.height;
	overlay.hidden = false;
	capture.hidden = true;

	await videoService.setupVideoElement(videoElement);
	if (width === 0 || height === 0) {
		setTimeout(() => runDecoder(updateResult), 1000);
		return;
	}
	ctx.beginPath();
	ctx.fillStyle = 'rgba(80,80,80,0.5)';
	ctx.fillRect(0, 0, width, height);
	ctx.clearRect(width * .15, height * (1 - .3) / 2, width * .7, canvas.height * .3);
	ctx.fillStyle = 'rgba(255,80,80,0.9)';
	ctx.fillRect(width * .1, canvas.height / 2 - 2, width * .8, 4);

	ctx.stroke();
	overlay.setAttribute('src', canvas.toDataURL('image/png'));
	let shouldScan = true;
	while (shouldScan) {
		ctx.drawImage(videoElement, 0, 0);
		let barcodeScannerResult = <BarcodeScannerResult>await decodeCanvas(canvas);
		if (!barcodeScannerResult.error) {
			capture.setAttribute('src', canvas.toDataURL());
			capture.hidden = false;
			const decodedBarcode = updateResult(barcodeScannerResult);
			if (!decodedBarcode) {
				await new Promise(res => setTimeout(res, 1000));
				capture.hidden = true;
				continue;
			} else {
				shouldScan = false;
				break;
			}
		}
		await new Promise(res => setTimeout(res, 125));
	}
	videoService.stopStreamedVideo(videoElement);
}

export default {
	codeReader,
	runDecoder
};
