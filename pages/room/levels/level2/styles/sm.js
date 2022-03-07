export const sm = ({answersQty, optionsQty}) => ({
    level: {},
    question: {
        maxHeight: 180,
    },
    button: {
        width: answersQty === 4 ? 110 : 79,
        height: 48,
        borderRadius: 4,
    },
    buttonShadow: {
        marginHorizontal: 4,
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 15,
    },
    buttonTextBigFontSize: {
        fontSize: 16,
        lineHeight: 17,
    },
    optionWrapper: {
        width: optionsQty === 3 ? 78 : 115,
        height: 57,
    },
    options: {
        marginVertical: 10,
    },
    optionText: {
        fontSize: 14,
    },
    arrow: {
        position: 'absolute',
        top: 14,
        left: -16,
        fontSize: 18,
        color: '#d1ae52',
    },
    conformity: {
        height: 40,
        width: optionsQty === 3 ? 78 : 115,
    },
    conformityText: {
        wordBreak: 'break-word',
        fontSize: 15,
    },
    confirmBtn: {
        width: 180,
        height: 40,
    },
    confirmBtnText: {
        fontSize: 20
    }
})
