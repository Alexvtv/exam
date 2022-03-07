export const general = {
    level: {
        width: '100%',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    question: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginVertical: 6,
        backgroundColor: 'rgba(161, 189, 151, 0.9)',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#d1ae52',
    },
    questionText: {
        fontFamily: 'rubikItalic',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    container: {
        position: 'relative',
        zIndex: 100,
        marginVertical: 8,
        borderRadius: 9,
        overflow: 'hidden'
    },
    button: {
        overflow: 'hidden',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 30
    },
    active: {
        borderColor: '#5bbbeb',
        backgroundColor: '#8cd9ff',
    },
    inactive: {
        backgroundColor: '#d4d4d4',
        borderColor: '#adadad'
    },
    correct: {
        backgroundColor: '#8af2b5',
        borderColor: '#76e8a6',
    },
    prompt: {
        backgroundColor: '#e8f0a1',
        borderColor: '#dae675',
    },
    wrong: {
        borderColor: '#f28a8a',
        backgroundColor: '#f29b9b'
    },
    answer: {
        fontFamily: 'rubik',
        position: 'relative',
        top: 0,
        left: 0,
        paddingHorizontal: 5,
        flexWrap: 'wrap',
        textAlign: 'left',
    },
    confirmBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 6,
        marginBottom: 10,
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
