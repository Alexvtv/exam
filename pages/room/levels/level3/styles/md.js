export const md = ({type}) => ({
    level: {
        paddingHorizontal: 20
    },
    question: {
        maxHeight: 200,
        padding: 10,
    },
    questionText: {
        fontSize: 15,
    },
    button: {
        width: 310,
        height: 40,
        borderRadius: 5,
    },
    buttonNumber: {
        fontSize: 19,
        lineHeight: 20,
    },
    buttonText: {
        fontSize: 15,
        lineHeight: 16,
        maxWidth: 270
    },
    buttonTextBigFontSize: {
        fontSize: 19,
        lineHeight: 20,
    },
    buttonTextSmallFontSize: {
        fontSize: 13,
        lineHeight: 14,
    },
    option: {
        width: type === 5 ? 280 : 150,
        height: 39,
        borderRadius: 5,
    },
    optionTextWrap: {
        width: type === 5 ? 255 : 128,
        paddingHorizontal: 5,
    },
    optionText: {
        fontSize: 15,
        lineHeight: 17,
    },
    optionTextSmallFontSize: {
        lineHeight: 15,
        fontSize: 14,
    },
    optionNumber: {
        fontSize: 19,
        lineHeight: 20,
    },
    confirmBtn: {
        width: 200,
        height: 44,
    },
    confirmBtnText: {
        fontSize: 22
    }
})
