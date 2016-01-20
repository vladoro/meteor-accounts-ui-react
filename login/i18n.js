i18n.setDefaultLanguage('en')

accountsUIReactBootstrap3 = {
	setLanguage(lang) {
		return i18n.setLanguage(lang)
	},
	getLanguage() {
		return i18n.getLanguage()
	},
	map(lang, obj) {
		return i18n.map(lang, obj)
	}
}
