import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wellcome from "../src/Page/Wellcome";
import Login from "../src/Page/Login/index.js";
import BottomNav from "../router/BottomNav.js";
import Register from "../src/Page/Register/Register";
import AddProduct from "../src/Page/Cart/AddProduct.js";
import HomeScreen from "../src/Page/HomeScreen/index.js";
import NextPayment from "../src/Page/Payment/Next/index.js";
import AddAdress from "../src/Page/Payment/AddAdress";
import SubmitTrue from "../src/Page/Payment/SubmitTrue";
import Payment from "../src/Page/Payment/Payment/index.js";
import PayMethod from "../src/Page/Payment/PayMethod/index.js";
import Voucher from "../src/Page/Payment/Voucher/index.js";
import AddTranfer from "../src/Page/Payment/AddTranfer/index.js";
import Login_required from "../src/Page/Login/Login_required/index.js";
import ForgotPassword from "../src/Page/ForgotPassword/index.js";
import ResetPassword from "../src/Page/ForgotPassword/ResetPassword.js/index.js";
import SMS from "../src/Page/SMS/index.js";
import Registration_successful from "../src/Page/SMS/Registration_successful.js";
import ProductCancel from "../src/Page/ProductCancel/index.js";
import CancelTrue from "../src/Page/ProductCancel/CancelTrue/index.js";
import InsertPro5 from "../src/Page/Profile/InsertPro5.js";
import InsertAddress from "../src/Page/Profile/InsertAddress.js";
import TabAddress from "../src/Page/Profile/TabAddress.js";
import ProductReview from "../src/Page/ProductReview/index.js";
import Search from "../src/Page/Search/Search.js";
import ProfileDetail from "../src/Page/Profile/ProfileDetail.js";
import Order from "../src/Page/Order/Order.js";
import Processing1 from "../src/Page/Order/Processing1.js";
import Delivering from "../src/Page/Order/Delivering.js";
import Canceled from "../src/Page/Order/Canceled.js";
import BotChat from "../src/Page/BotChat/index.js";
import ZaloPay from "../src/Page/Payment/ZaloPay/index.js";
import Policy from "../src/Page/Policy/Policy.js";
import Information from "../src/Page/Policy/Information.js";
import Preservation from "../src/Page/Policy/Preservation.js";
import Detail from "../src/Page/Detail/Detail.js";
import DetailDiscout from "../src/Page/Detail/DetailDiscout.js";
import Detailbottle from "../src/Page/Detail/Detailbottle.js";
import UpdateProfile from "../src/Page/Profile/UpdateProfile.js";
import Payos from "../src/Page/Payment/Payos/Payos.js";
import PaySusses from "../src/Page/Payment/PaySusses/index.js";
import Done from "../src/Page/Order/Done.js";
import OrderSuccess from "../src/Page/Payment/PaySusses/index.js"
import Promotion from "../src/Page/Promotion/index.js";
import PaySussesScreen from "../src/Page/Payment/PaySusses/index.js";
const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Wellcome"
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
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Processing1" component={Processing1} />
            <Stack.Screen name="Delivering" component={Delivering} />
            <Stack.Screen name="Canceled" component={Canceled} />
            <Stack.Screen name="BotChat" component={BotChat} />
            <Stack.Screen name="ZaloPay" component={ZaloPay}/>
            <Stack.Screen name="Policy" component={Policy}/>
            <Stack.Screen name="Information" component={Information}/>
            <Stack.Screen name="Preservation" component={Preservation}/>
            <Stack.Screen name="Detail" component={Detail}/>
            <Stack.Screen name="DetailDiscout" component={DetailDiscout}/>
            <Stack.Screen name="Detailbottle" component={Detailbottle}/>
            <Stack.Screen name="UpdateProfile" component={UpdateProfile}/>
            <Stack.Screen name="Payos" component={Payos}/>
            <Stack.Screen name="PaySussesScreen" component={PaySussesScreen}/>
            <Stack.Screen name="Done" component={Done}/>

            <Stack.Screen name="Promotion" component={Promotion}/>
            <Stack.Screen name="OrderSuccess" component={OrderSuccess} />

        </Stack.Navigator >
    );
};
export default MainStack;