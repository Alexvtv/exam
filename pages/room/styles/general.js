export const general = {
    main: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    panelWrapper: {
        width: '100%',
        paddingBottom: 8,
    },
    panel: {
        width: '100%',
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(245, 245, 245, 0.7)'
    },
    back: {
        position: 'relative',
        top: -3,
        paddingVertical: 4,
    },
    timer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        position: 'relative',
        borderWidth: 2,
        borderColor: '#00732e',
        borderRadius: 6,
        justifyContent: 'center',
    },
    timerText: {
        fontFamily: 'rubik',
        color: '#013b01',
        textAlign: 'center',
        width: '100%'
    },
    taskNum: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    taskNumText: {
        fontWeight: '500',
        color: '#013b01',
    },
    field: {
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
        flexWrap: 'wrap',
        height: 'auto',
        minHeight: '85%',
    },
    usersData: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(245, 245, 245, 0.7)',
        borderWidth: 2,
        borderColor: '#d1ae52',
        borderRadius: 8,
    },
    roundsRow: {
        flexDirection: 'row',
    },
    rotated: {
        transform: [{rotate: '180deg'}]
    },
    userName: {
        fontFamily: 'rubikItalic',
        textAlign: 'right',
        marginVertical: 2,
        paddingRight: 10
    },
    unsolved: {
        backgroundColor: '#595757',
    },
    current: {
        borderWidth: 2,
        borderColor: '#dede35',
    },
    correct: {
        backgroundColor: '#00a843',
    },
    wrong: {
        backgroundColor: '#d60000',
    }
};
