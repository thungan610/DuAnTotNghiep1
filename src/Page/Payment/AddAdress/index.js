import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import AddAdressStyle from "./style";
import AxiosInstance from "../../api/AxiosInstance";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

const AddAddress = (prop) => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store
  const userId = user?.userData?._id;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Việt Nam");
  const [district, setDistrict] = useState("");
  const [quarter, setQuarter] = useState("");
  const [alley, setAlley] = useState("");
  const [homenumber, setHomenumber] = useState("");
  const [city, setCity] = useState("TP Hồ Chí Minh");

  const [districts, setDistricts] = useState([]); // Danh sách quận
  const [quarters, setQuarters] = useState([]); // Danh sách phường

  useEffect(() => {
    // Lấy danh sách quận của TP Hồ Chí Minh khi component mount
    fetchDistricts("79");  // Mã code của TP Hồ Chí Minh
  }, []);

  const fetchDistricts = async (cityCode) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${cityCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts);
      setDistrict("");
      setQuarters([]);
      setQuarter("");
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận:", error);
    }
  };

  const fetchQuarters = async (districtCode) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      setQuarters(data.wards);
      setQuarter("");
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phường:", error);
    }
  };

  const goBack = () => {
    prop.navigation.goBack();
  };

  const handleDistrictChange = (districtName) => {
    const selectedDistrict = districts.find((d) => d.name === districtName);
    setDistrict(districtName);
    setQuarters([]);
    setQuarter("");
    if (selectedDistrict) fetchQuarters(selectedDistrict.code);
  };

  const handleSubmit = async () => {
    // Kiểm tra validation
    if (!name || !phone || !district || !quarter || !alley || !homenumber) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tạo địa chỉ mới
    const address = {
      user: { name, phone },
      houseNumber: homenumber,
      alley,
      quarter,
      district,
      city,
      country,
    };

    try {
      const response = await AxiosInstance.post(`/users/${userId}/addressNew`, address);
      Toast.show({
        type: "success",
        text1: "Thông báo",
text2: "Thêm địa chỉ thành công.",
      });
      goBack();
    } catch (error) {
      console.error("Lỗi API:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi lưu địa chỉ.");
    }
  };

  return (
    <ScrollView style={AddAdressStyle.container}>
      {/* Header */}
      <View style={AddAdressStyle.header}>
        <TouchableOpacity onPress={goBack} style={{ position: "absolute", left: 0, top: 0 }}>
          <Image style={AddAdressStyle.backright} source={require("../../../assets/notifi/backright.png")} />
        </TouchableOpacity>
        <Text style={AddAdressStyle.title}>Thêm địa chỉ mới</Text>
      </View>

      {/* Thông tin liên hệ */}
      <Text style={AddAdressStyle.txtLH}>Thông tin liên hệ</Text>
      <View style={AddAdressStyle.body}>
        <TextInput style={AddAdressStyle.input} placeholder="Họ và tên" value={name} onChangeText={setName} />
        <TextInput style={AddAdressStyle.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} />
      </View>

      {/* Thông tin địa chỉ */}
      <Text style={AddAdressStyle.txtLH}>Thông tin địa chỉ</Text>
      <View style={AddAdressStyle.body}>
        <TextInput style={AddAdressStyle.input} value={country} editable={false} />
        
        {/* Cố định giá trị thành phố là TP Hồ Chí Minh */}
        <Picker selectedValue={city} style={AddAdressStyle.input} enabled={false}>
          <Picker.Item label="TP Hồ Chí Minh" value="TP Hồ Chí Minh" />
        </Picker>

        <Picker selectedValue={district} style={AddAdressStyle.input} onValueChange={handleDistrictChange}>
          <Picker.Item label="Chọn quận" value="" />
          {districts.map((districtItem) => (
            <Picker.Item key={districtItem.code} label={districtItem.name} value={districtItem.name} />
          ))}
        </Picker>

        <Picker selectedValue={quarter} style={AddAdressStyle.input} onValueChange={(value) => setQuarter(value)}>
          <Picker.Item label="Chọn phường" value="" />
          {quarters.map((wardItem) => (
            <Picker.Item key={wardItem.code} label={wardItem.name} value={wardItem.name} />
          ))}
        </Picker>

        <TextInput style={AddAdressStyle.input} placeholder="Nhập hẻm" value={alley} onChangeText={setAlley} />
        <TextInput style={AddAdressStyle.input} placeholder="Nhập số nhà" value={homenumber} onChangeText={setHomenumber} />
      </View>

      {/* Nút lưu */}
      <View style={AddAdressStyle.footer}>
        <TouchableOpacity style={AddAdressStyle.button} onPress={handleSubmit}>
          <Text style={AddAdressStyle.buttonText}>LƯU</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddAddress;