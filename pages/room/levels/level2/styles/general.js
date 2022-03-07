export const general = {
    level: {
        width: '100%',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    question: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginVertical: 6,
        flex: 1,
        backgroundColor: 'rgba(161, 189, 151, 0.9)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#d1ae52',
    },
    questionInner: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    questionText: {
        fontFamily: 'rubikItalic',
        textAlign: 'center'
    },
    buttons: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 2,
    },
    buttonText: {
        zIndex: 1,
        textAlign: 'center',
        fontFamily: 'rubik',
    },
    options: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    correctOption: {
        borderColor: 'green',
    },
    optionWrapper: {
        padding: 4,
    },
    option: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 2,
    },
    optionText: {
        zIndex: 10,
        paddingHorizontal: 2,
        maxWidth: '100%',
        width: '100%',
        textAlign: 'center',
        lineHeight: 16,
        fontFamily: 'rubik',
    },
    activeOption: {
        backgroundColor: 'blue'
    },
    wrongOption: {
        borderColor: 'red',
    },
    conformity: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(161, 189, 151, 0.9)',
        borderRadius: 4,
        top: 15,
        left: 4
    },
    conformityText: {
        position: 'relative',
        zIndex: 100,
        textAlign: 'center',
        fontFamily: 'rubik',
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
