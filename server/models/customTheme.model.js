import pkg from "mongoose";

const {Schema, model} = pkg;
const commentsSchema = new Schema({
    notchBG: {
        type: String,
        required: true,
    },
    fontColor: {
        type: String,
        required: true,
    },
    contentBG: {
        type: String,
        required: true,
    },
    headerIcon: {
        type: String,
        required: true,
    },
    footerIcon: {
        type: String,
        required: true
    },
    scanBarcodeInfoText: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    websiteLink: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    surveyLink: {
        type: String,
    },
    surveyMetaData: {
        type: Boolean,
    },
    surveyQueryParams: {
        type: Array,
    },
    removeContactButton: {
        type: Boolean,
    }
});

export default model("Custom-Themes", commentsSchema);
