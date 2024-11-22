import { StyleSheet } from "react-native";

    const AddProductStyle = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: 'white',
        },
        header: {
            alignItems:'center',
            justifyContent:'space-between',     
            flexDirection: 'row',
            paddingBottom: 20
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 8,
            padding: 15,
        },
        borderImage: {
            width: 72,
            height: 72,
            borderRadius: 10,
            borderColor: '#73D6E9',
            backgroundColor: '#73D6E9',
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 56,
            height: 56,
        },
        itemDetails: {
            flex: 1,
            marginLeft: 16,
        },
        itemName: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
        },
        itemCategory: {
            fontSize: 14,
            color: '#C7C7C7',
            marginVertical: 4,
        },
        itemPrice: {
            fontSize: 16,
            color: 'black',
            fontWeight: 'bold',
        },
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantityButton: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
        },
        quantityText: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        quantity: {
            marginHorizontal: 2,
            fontSize: 18,
        },
        checkbox: {
            width: 18,
            height: 18,
            marginRight: 10,
        },
        total: {
            borderColor: '#27AAE1',
            flexDirection: 'column',
            justifyContent: 'center',
            // alignItems: 'center',
        },
        totalPrice: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 10,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 20,
        },
        cancelButton: {
            flex: 1,
            backgroundColor: '#e0e0e0',
            padding: 10,
            borderRadius: 5,
            marginRight: 5,
            alignItems: 'center',
        },
        confirmButton: {
            flex: 1,
            backgroundColor: '#f44336',
            padding: 10,
            borderRadius: 5,
            marginLeft: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
    
    });

export default AddProductStyle;
