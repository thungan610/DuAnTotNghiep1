import React from "react";
import { View, Text, Image } from "react-native";
import wellcomeStyle from "./style";
const Wellcome = () => {
    return (
        <View style={wellcomeStyle.container}>
            <Image style={wellcomeStyle.goctren} source={require("../../../src/assets/goctren.png")} />
            <Image style={wellcomeStyle.anhgiua}  source={require("../../../src/assets/anhgiua.png")} />
            <Image style={wellcomeStyle.gocduoi} source={require("../../../src/assets/gocduoi.png")} />
        </View>
    );
};
export default Wellcome