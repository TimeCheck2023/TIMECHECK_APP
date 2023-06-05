import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/User/Details/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/User/Profile/Profile";
import FormUpdateUSer from "../screens/User/FormUpdateUSer";
import FromEvents from "../screens/User/FromEvent/FromEvents";
import DetailsEvent from "../screens/User/Details/DetailsEvent";
import Notifications from "../screens/User/Notification/Notifications";


const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
      <Home.Screen name="HomeStack" component={BottomTabNavigator} />
      <Home.Screen name="Notifications" component={Notifications} />
      <Home.Screen name="Details" component={DetailsEvent} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
      <Home.Screen name="FromEvents" component={FromEvents} />
    </Home.Navigator>
  )
}

export default HomeStack