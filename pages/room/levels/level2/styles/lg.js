export const lg = ({answersQty, optionsQty}) => ({
    level: {
        paddingHorizontal: 40
    },
    question: {
        maxHeight: 200,
        paddingHorizontal: 20,
    },
    questionText: {
        fontSize: 17,
    },
    button: {
        width: answersQty === 4 ? 160 : 105,
        height: 56,
        borderRadius: 5,
    },
    buttonShadow: {
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 15,
        lineHeight: 16,
    },
    buttonTextBigFontSize: {
        fontSize: 19,
        lineHeight: 20,
    },
    optionWrapper: {
        width: optionsQty === 3 ? 125 : 175,
        height: 76,
    },
    options: {
        marginVertical: 15,
        width: 500,
    },
    optionText: {
        fontSize: 17,
    },
    arrow: {
        position: 'absolute',
        top: 16,
        left: -34,
        fontSize: 30,
        color: '#d1ae52',
    },
    conformity: {
        height: 52,
        width: optionsQty === 3 ? 125 : 175,
    },
    conformityText: {
        fontSize: 16,
    },
    confirmBtn: {
        width: 260,
        height: 55,
    },
    confirmBtnText: {
        fontSize: 25
    }
});
