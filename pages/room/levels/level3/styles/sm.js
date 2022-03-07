export const sm = ({type}) => ({
    level: {},
    question: {
        maxHeight: 180,
    },
    button: {
        width: 260,
        height: 32,
        borderRadius: 4,
    },
    buttonNumber: {
        fontSize: 17,
        lineHeight: 18,
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 14,
        maxWidth: 224
    },
    buttonTextBigFontSize: {
        fontSize: 18,
        lineHeight: 19,
    },
    buttonTextSmallFontSize: {
        fontSize: 12,
        lineHeight: 13,
    },
    option: {
        width: type === 5 ? 230 : 120,
        height: 32,
        borderRadius: 4,
    },
    optionTextWrap: {
        width: type === 5 ? 208 : 98,
        paddingHorizontal: 4
    },
    optionText: {
        fontSize: 15,
        lineHeight: 17,
    },
    optionTextSmallFontSize: {
        lineHeight: 14,
        fontSize: 13,
    },
    optionNumber: {
        fontSize: 17,
        lineHeight: 18,
    },
    confirmBtn: {
        width: 180,
        height: 40,
    },
    confirmBtnText: {
        fontSize: 20
    }
})
