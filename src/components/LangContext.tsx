import React from "react";
import { LanguageCodes, LanguageContext, PageTypes } from "../utils/enums";

const LangContext = React.createContext<LanguageContext>({
	lang: LanguageCodes.EN,
	type: PageTypes.HOME,
});

export default LangContext;
