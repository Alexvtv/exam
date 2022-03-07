export const general = {
    level: {
        width: '100%',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    question: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginVertical: 6,
        flex: 1,
        backgroundColor: 'rgba(161, 189, 151, 0.9)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#d1ae52',
    },
    questionText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'rubikItalic',
        width: '100%',
        textAlign: 'center',
    },
    buttons: {
        paddingVertical: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: 'rgba(161, 189, 151, 0.9)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 4,
        borderWidth: 2,
    },
    buttonNumberWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    },
    buttonNumber: {
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'rubik',
    },
    buttonText: {
        paddingTop: 3,
        zIndex: 10,
        fontFamily: 'rubik'
    },
    options: {
        paddingTop: 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        top: 0,
        borderWidth: 2,
        overflow: 'hidden'
    },
    optionTextWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    optionText: {
        zIndex: 10,
        paddingHorizontal: 2,
        textAlign: 'center',
        fontFamily: 'rubik',
    },
    optionNumberWrapper: {
        display: 'flex',
        zIndex: 10,
        paddingHorizontal: 2,
        width: 22,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    optionNumber: {
        fontFamily: 'rubikSemiBold',
        textAlign: 'center',
    },
    activeOption: {
        backgroundColor: 'blue'
    },
    wrongOption: {
        borderColor: 'red',
    },
    arrow: {
        position: 'absolute',
        left: -16,
        fontSize: 18
    },
    conformity: {
        position: 'absolute',
        top: 65,
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        width: '100%'
    },
    conformityText: {
        position: 'relative',
        zIndex: 100,
        textAlign: 'center',
        fontFamily: 'rubik',
        lineHeight: 16,
    },
    confirmBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 8,
        borderRadius: 7,
        borderWidth: 2,
        backgroundColor: '#4b8e66',
        borderColor: '#3a7852'
    },
    confirmBtnText: {
        fontFamily: 'rubikSemiBold',
        letterSpacing: 1,
        color: '#F5F5F5'
    },
    activeConfirmBtn: {
        backgroundColor: '#00a843',
        borderColor: '#008c38',
    },
};
