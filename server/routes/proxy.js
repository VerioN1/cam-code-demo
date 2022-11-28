import {Router} from "express";
import {parseXmlToJson, SendBarcode, sendFeedback} from "../services/barcode.service.js";
import {loginUser} from "../services/auth.service.js";
import axios from "axios";

const proxyRouter = Router();

proxyRouter.post("/barcode", async (req, res) => {
    const apiBarCodeResponse = await SendBarcode({
        barcode: req.body.barcode,
        lat: req.body.lat,
        long: req.body.long,
    });

    const result = JSON.parse(apiBarCodeResponse.d);

    if (result.scid == 0) {
        res.status(500).send({message: "barcode scan error"});
        return;
    }

    res.json({
        message: result,
        lat: Number(req.body.lat),
        long: Number(req.body.long),
    });
});

proxyRouter.post("/feedback", async (req, res) => {
    const feedbackRes = await sendFeedback({
        iScanID: req.body.iScanID,
        barcode: req.body.barcode,
        feedBack: req.body.feedback,
        img: req.body.img,
        img2: req.body.img2,
        img3: req.body.img3,
    });
    const result = feedbackRes;
    console.log(feedbackRes);
    if (result?.scid === 0) {
        res.status(500).send({message: "feedback properties error"});
        return;
    }
    if (result === null) {
        return res.status(501).send({message: "server didn't respond"});
    }
    res.json({
        message: result,
        lat: Number(req.body.lat),
        long: Number(req.body.long),
    });
});

proxyRouter.post("/auth", async (req, res) => {
    const cred = req.body;
    console.log("got auth request")
    try {
        const user = await loginUser(cred);
        return res.json(user);
    } catch (e) {
        console.log(e);
        return res.status(401).send({message: "invalid credentials"});
    }
});
proxyRouter.get("/", (req, res) => {
    res.send("healthy");
})

proxyRouter.post("/validate-scan", async (req, res) => {
    const {scannedBarcode, currentScannedQC} = req.body

    const {data: prevScanXml} = await axios.get('http://varcodeglobal.mymdfile.com/ws/Service.asmx/GetScansByBarcode', {
        params: {
            sAuthToken: "v3Tr#eus",
            sBarCode: scannedBarcode
        }
    })

    if (prevScanXml.indexOf("QualityCodeNo") === -1) {
        return res.status(200).send({newQC: currentScannedQC})
    }
    const {d: lastScans} = parseXmlToJson(prevScanXml)
    const latestScan = lastScans[0]
    console.log(currentScannedQC)
    const {QualityCodeNo} = latestScan;
    const newQC = Math.max(currentScannedQC, QualityCodeNo)
    res.status(200).send({newQC})

})
export default proxyRouter;
