async function getVideoInputDevices() {
	const devices = await navigator.mediaDevices.enumerateDevices();

	const videoDevices = [];
	for (const device of devices) {
		const kind = device.kind;
		if (kind !== 'videoinput') continue;
		//alert(`videoDevice: ${JSON.stringify(device)}`)
		let deviceId = device.deviceId;
		let label = device.label;
		if (label.match(/front/i)) continue; //assume FRONT
		if (label.match(/camera2 (.+)/i)) label = 'Camera ' + RegExp.$1;
		label = label.replace(/trás|rear|traseira|environment|ambiente/, 'back'); //ugly 'back' for sort

		let groupId = device.groupId;
		let videoDevice = {deviceId, label, kind, groupId};
		videoDevices.push(videoDevice);
	}
	if (videoDevices.length >= 1 && videoDevices[0].label) {    //null label indicate no perm, do not sort
		videoDevices.sort((a: any, b: any) => +b.label.includes('back') - +a.label.includes('back') ||
		a.label > b.label ? 1 : a.label < b.label ? -1 : 0);
	}
	return videoDevices;
}


function stopStreamedVideo(videoElem: HTMLVideoElement) {
	const stream = <MediaStream>videoElem.srcObject;
	if (!stream) return;
	const tracks = stream.getTracks();

	tracks.forEach(function (track) {
		track.stop();
	});

	videoElem.srcObject = null;
	console.log('video stopped');

}

async function setupVideoElement(videoElement: HTMLVideoElement) {
	if (!videoElement) throw 'no source';
	if (!(videoElement instanceof HTMLVideoElement)) throw 'bad source';
	// Needed for iOS 11
	videoElement.setAttribute('autoplay', 'true');
	videoElement.setAttribute('muted', 'true');

	const videoDevices = await getVideoInputDevices();
	const id = videoDevices[0].deviceId;
	navigator.mediaDevices.getUserMedia({
		video: {
			deviceId: id
		}, audio: false
	}).then(stream => {
		videoElement.srcObject = stream;
		videoElement.play();
	});
}


function getCaptureCanvas(mediaElement: HTMLVideoElement) {
	const canvasElement = <HTMLCanvasElement>document.getElementById('captureCanvas');
	if (!canvasElement) {
		console.log('no canvas');
		return null;
	}
	let width = mediaElement.videoWidth;
	let height = mediaElement.videoHeight;
	canvasElement.style.width = width + 'px';
	canvasElement.style.borderRadius = '20px';
	canvasElement.style.height = height + 'px';
	canvasElement.width = width;
	canvasElement.height = height;
	return canvasElement;
}


export default {
	getCaptureCanvas,
	stopStreamedVideo,
	setupVideoElement,
	getVideoInputDevices
};
