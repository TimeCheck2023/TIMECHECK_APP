import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/User/Details/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profiles from "../screens/User/Profile/Profiles";
import FormUpdateUSer from "../screens/User/FormUpdateUSer";
import FromEvents from "../screens/User/FromEvent/FromEvents";
import Notifications from "../screens/User/Notification/Notifications";


const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTabNavigator">
      <Home.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
      <Home.Screen name="Notifications" component={Notifications} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
      <Home.Screen name="FromEvents" component={FromEvents} />
    </Home.Navigator>
  )
}

export default HomeStack