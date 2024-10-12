import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wellcome from "../src/Page/Wellcome";
import Login from "../src/Page/Login/index.js";
import BottomNav from "./BottomNav.js";
import Register from "../src/Page/Register/Register";
import AddProduct from "../src/Page/Cart/AddProduct.js";
import HomeScreen from "../src/Page/HomeScreen/index.js";
import NextPayment from "../src/Page/Payment/Next/index.js";
import AddAdress from "../src/Page/Payment/AddAdress";
import SubmitTrue from "../src/Page/Payment/SubmitTrue";
import Payment from "../src/Page/Payment/Payment";
import PayMethod from "../src/Page/Payment/PayMethod/index.js";
import Voucher from "../src/Page/Payment/Voucher/index.js";
import AddTranfer from "../src/Page/Payment/AddTranfer/index.js";
import PaySusses from "../src/Page/Payment/PaySusses/index.js";
import Login_required from "../src/Page/Login/Login_required/index.js";
import ForgotPassword from "../src/Page/ForgotPassword/index.js";
import ResetPassword from "../src/Page/ForgotPassword/ResetPassword.js/index.js";
import SMS from "../src/Page/SMS/index.js";
import Registration_successful from "../src/Page/SMS/Registration_successful.js";
import ProductCancel from "../src/Page/ProductCancel/index.js";
import CancelTrue from "../src/Page/ProductCancel/CancelTrue/index.js";
import NewNotifi from "../src/Page/NotifiScreen/NewNotifi.js";
import InsertPro5 from "../src/Page/Profile/InsertPro5.js";
import InsertAddress from "../src/Page/Profile/InsertAddress.js";
import TabAddress from "../src/Page/Profile/TabAddress.js";
import ProductReview from "../src/Page/ProductReview/index.js";
import Search from "../src/Page/Search/Search.js";
import ProfileDetail from "../src/Page/Profile/ProfileDetail.js";
import Order from "../src/Page/Order/Order.js";
import Processing1 from "../src/Page/Order/Processing1.js";
import Cart from "../src/Page/Cart/Cart.js";


const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Wellcome" component={Wellcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="BottomNav" component={BottomNav} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="NextPayment" component={NextPayment} />
            <Stack.Screen name="AddAdress" component={AddAdress} />
            <Stack.Screen name="SubmitTrue" component={SubmitTrue} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="PayMethod" component={PayMethod} />
            <Stack.Screen name="Voucher" component={Voucher} />
            <Stack.Screen name="AddTranfer" component={AddTranfer} />
            <Stack.Screen name="PaySusses" component={PaySusses} />
            <Stack.Screen name="Login_required" component={Login_required} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SMS" component={SMS} />
            <Stack.Screen name="Registration_successful" component={Registration_successful} />
            <Stack.Screen name="ProductCancel" component={ProductCancel} />
            <Stack.Screen name="CancelTrue" component={CancelTrue} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="InsertPro5" component={InsertPro5} />
            <Stack.Screen name="InsertAddress" component={InsertAddress} />
            <Stack.Screen name="TabAddress" component={TabAddress} />
            <Stack.Screen name="ProductReview" component={ProductReview} />
            <Stack.Screen name="NewNotifi" component={NewNotifi} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Processing1" component={Processing1} />
            <Stack.Screen name="Cart" component={Cart} />

        </Stack.Navigator>
    );
};
export default MainStack