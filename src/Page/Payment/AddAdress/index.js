import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AddAdressStyle from "./style";
import AxiosInstance from "../../api/AxiosInstance";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

const AddAddress = (prop) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [quarter, setQuarter] = useState("");
  const [alley, setAlley] = useState("");
  const [homenumber, setHomenumber] = useState("");
  const [cities, setCities] = useState([]);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thành phố:", error);
      }
    };

    fetchCities();
  }, []);

  const goBack = () => {
    prop.navigation.goBack();
  };

  const user = useSelector(state => state.user);
  const userId = user?.userData?._id;

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert("Lỗi", "Không tìm thấy userId");
      return;
    }

    if (!name || !phone || !district || !quarter || !alley || !homenumber) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const address = {
      user: {
        name,
        phone,
      },
      houseNumber: homenumber,
      alley,
      quarter,
      district,
      city,
      country,
    };

    try {
      const response = await AxiosInstance.post(`/users/${userId}/addressNew`, address);
      if (!response) {
        Alert.alert("Lỗi", "Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng.");
      } else {
        Toast.show({
          type: "success",
          text1: "Thông báo",
          text2: "Thêm địa chỉ thành công.",
          visibilityTime: 2000,
          position: "top",
        });
        goBack();
      }
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  return (
    <ScrollView style={AddAdressStyle.container}>
      <View style={AddAdressStyle.header}>
        <TouchableOpacity onPress={goBack}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }} >
          <Image
            style={AddAdressStyle.backright}
            source={require("../../../assets/notifi/backright.png")}
          />
        </TouchableOpacity>
        <Text style={AddAdressStyle.title}>Thêm địa chỉ mới</Text>
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
          <Picker
            selectedValue={city}
            style={[AddAdressStyle.input, { flex: 1 }]}
            onValueChange={(itemValue) => setCity(itemValue)}
          >
            <Picker.Item label="Chọn thành phố" value="" />
            {cities.map((cityItem) => (
              <Picker.Item
                key={cityItem.code}
                label={cityItem.name}
                value={cityItem.name}
              />
            ))}
          </Picker>

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
      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default AddAddress;
