import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ZaloPayStyle from "./style";
import AddAdressStyle from "../AddAdress/style";
import PayMethodStyle from "../PayMethod/style";
const ZaloPay = () => {
    const [orderURL, setOrderURL] = useState('');

  const createOrder = async () => {
    try {
      const response = await fetch(' ', {  //Link API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 50000 }), 
      });

      const data = await response.json();
      setOrderURL(data.orderURL);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
    return (
        <View style={ZaloPayStyle.container}> 
             <View style={AddAdressStyle.header}>
                <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
                <Text style={AddAdressStyle.title}>Quét mã zalo pay</Text>
                <Text/>
            </View>
            <View style={ZaloPayStyle.body}>
                <Image style={ZaloPayStyle.imgQR} source={require("../../../assets/notifi/MyQR.png")}/>
            </View>
            <View style={PayMethodStyle.ViewSuss}>
                <TouchableOpacity style={PayMethodStyle.BtnSuss}>
                    <Text style={PayMethodStyle.txtSuss}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ZaloPay