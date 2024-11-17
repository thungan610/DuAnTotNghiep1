import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AddAdressStyle from "./style";
import AxiosInstance from "../../api/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const AddAddress = (prop) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [city, setCity] = useState("TP. Hồ Chí Minh");
  const [district, setDistrict] = useState("");
  const [quarter, setQuarter] = useState("");
  const [alley, setAlley] = useState("");
  const [homenumber, setHomenumber] = useState("");

  const goBack = () => {
    prop.navigation.goBack();
  };

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        console.log("UserId:", userId);
        return userId;
      } else {
        console.log("Không tìm thấy userId trong AsyncStorage");
        return null;
      }
    } catch (error) {
      console.error("Lỗi khi lấy userId từ AsyncStorage:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    const userId = await getUserId();

    if (!userId) {
      Alert.alert("Lỗi", "Không tìm thấy userId");
      return;
    }

    const address = {
      name,
      phone,
      country,
      city,
      district,
      quarter,
      alley,
      homenumber,
    };

    try {
      const response = await AxiosInstance.post(`/users/${userId}/addressNew`, address);
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Thông báo",
          text2: "Thêm địa chỉ thành công",
          visibilityTime: 2000,
          position: "top",
        });
        goBack();
      } else {
        Alert.alert("Lỗi", "Thêm không thành công.");
      }
    } catch (error) {
      console.error("Lỗi API:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi thêm địa chỉ.");
    }
  };

  return (
    <ScrollView style={AddAdressStyle.container}>
      <View style={AddAdressStyle.header}>
        <TouchableOpacity onPress={goBack}>
          <Image
            style={AddAdressStyle.backright}
            source={require("../../../assets/notifi/backright.png")}
          />
        </TouchableOpacity>
        <Text style={AddAdressStyle.title}>Thêm địa chỉ mới</Text>
        <Text />
      </View>
      <View>
        <Text style={AddAdressStyle.txtLH}>Thông tin liên hệ</Text>
        <View style={AddAdressStyle.body}>
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Họ và tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>
      <View>
        <Text style={AddAdressStyle.txtLH}>Thông tin địa chỉ</Text>
        <View style={AddAdressStyle.body}>
          <TextInput
            style={AddAdressStyle.input}
            value={country}
            editable={false}
          />
          <TextInput
            style={AddAdressStyle.input}
            value={city}
            editable={false}
          />
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Nhập quận"
            value={district}
            onChangeText={setDistrict}
          />
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Nhập phường"
            value={quarter}
            onChangeText={setQuarter}
          />
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Nhập hẻm"
            value={alley}
            onChangeText={setAlley}
          />
          <TextInput
            style={AddAdressStyle.input}
            placeholder="Nhập số nhà"
            value={homenumber}
            onChangeText={setHomenumber}
          />
        </View>
      </View>
      <View style={AddAdressStyle.footer}>
        <TouchableOpacity style={AddAdressStyle.button} onPress={handleSubmit}>
          <Text style={AddAdressStyle.buttonText}>LƯU</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddress;
