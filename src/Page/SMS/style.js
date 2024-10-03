const SmsStyle = {
    container: {
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        position: 'relative',
    },
    goctren: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    txtdau: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#27AAE1',
        marginBottom: 10,
    },
    txtgiua: {
        fontSize: 18,
        color: '#8B8B8B',
        marginBottom: 5,
    },
    alltxtcuoi:{
        flexDirection:'row',
    },
    txtchusdt: {
        fontSize: 18,
        color: '#8B8B8B',
    },
    txtsdt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    oinput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 10
    },
    button: {
        backgroundColor: '#27AAE1',
        paddingVertical: 10,
        paddingHorizontal: 130,
        borderRadius: 20,
        marginTop: 50
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    gocduoi: {
        position:'absolute',
        bottom: 0,
        right: 0,
    }
};

export default SmsStyle;
