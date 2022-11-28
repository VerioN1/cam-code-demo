export interface ICustomStyle {
	notchBG: string;
	headerIcon: string;
	footerIcon: string;
	headerIconURL: string; //not used anymore
	contentBG: string;
	scanBarcodeInfoText: string;
	fontColor: string;
	surveyLink: string;
	surveyMetaData: boolean;
	editInProgress: boolean;
	surveyQueryParams: string[];
	removeContactButton: boolean;
}

export interface ICustomThemeMetadata {
	_id?: string;
	companyName: string;
	phone: string;
	email: string;
	websiteLink: string;
}
