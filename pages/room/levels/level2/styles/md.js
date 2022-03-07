export const md = ({answersQty, optionsQty}) => ({
    level: {
        paddingHorizontal: 20
    },
    question: {
        maxHeight: 180,
        padding: 10,
    },
    questionText: {
        fontSize: 15,
    },
    optionWrapper: {
        width: optionsQty === 3 ? 95 : 135,
        height: 60,
    },
    options: {
        marginVertical: 10,
    },
    button: {
        width: answersQty === 4 ? 150 : 95,
        height: 53,
        borderRadius: 5,
    },
    buttonShadow: {
        marginHorizontal: 7,
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 15,
    },
    buttonTextBigFontSize: {
        fontSize: 16,
        lineHeight: 17,
    },
    optionText: {
        fontSize: 15,
    },
    arrow: {
        position: 'absolute',
        top: 14,
        left: -20,
        fontSize: 20,
        color: '#d1ae52',
    },
    conformity: {
        height: 46,
        width: optionsQty === 3 ? 95 : 135,
    },
    conformityText: {
        fontSize: 14,
    },
    confirmBtn: {
        width: 200,
        height: 44,
    },
    confirmBtnText: {
        fontSize: 22
    }
});
