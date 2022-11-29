import React, { Component } from 'react';
import Quagga from 'quagga';
import './temp-barcode.css';

class TempBarcodeScanner extends Component {
	componentDidMount() {
		Quagga.init(
			{
				inputStream: {
					type: 'LiveStream',
					constraints: {
						// width: window.innerWidth - 150,
						// height: 200,
						facingMode: 'environment',
						aspectRatio: {min: 1, max: 2}
					}
					//   area: { // defines rectangle of the detection/localization area
					//     top: "10%",    // top offset
					//     right: "10%",  // right offset
					//     left: "10%",   // left offset
					//     bottom: "10%"  // bottom offset
					//   },
				},
				locator: {
					halfSample: true,
					patchSize: 'large', // x-small, small, medium, large, x-large
				},
				numOfWorkers: 4,
				frequency: 10,
				decoder: {
					readers: ['code_128_reader'],
					debug: {
						showFrequency: true,
						drawScanline: true,
						showPattern: true
					}
				},
				locate: true
			},
			function (err) {
				if (err) {
					return console.log(err);
				}
				Quagga.start();
			}
		);
		Quagga.onProcessed(function(result) {
			var drawingCtx = Quagga.canvas.ctx.overlay,
				drawingCanvas = Quagga.canvas.dom.overlay;

			if (result) {
				if (result.boxes) {
					drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
					result.boxes.filter(function (box) {
						return box !== result.box;
					}).forEach(function (box) {
						Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
					});
				}

				if (result.box) {
					Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
				}

				if (result.codeResult && result.codeResult.code) {
					Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
				}
			}
		});
		Quagga.onDetected(this._onDetected);
	}

	componentWillUnmount() {
		Quagga.offDetected(this._onDetected);
	}

	_onDetected = ({codeResult: {code: codeRead}}) => {
		if (codeRead) {
			console.log(codeRead);
			if (codeRead.length === 12 && codeRead.includes('P') && !Number.isNaN(codeRead.slice(1))) {
				Quagga.stop();
				return this.props.onDetected(codeRead);
			}
			return true;
		}
		return false;
	};

	render() {
		return (
				<div id="interactive" className="viewport">
			</div>
		);
	}
}

export default TempBarcodeScanner;
