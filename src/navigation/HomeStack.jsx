import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/User/Details/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/User/Profile/Profile";
import FormUpdateUSer from "../screens/User/FormUpdateUSer";
import FromEvents from "../screens/User/FromEvent/FromEvents";


const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }} initialRouteName="FromEvents">
      <Home.Screen name="HomeStack" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
      <Home.Screen name="Profile" component={Profile} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
      <Home.Screen name="FromEvents" component={FromEvents} />
    </Home.Navigator>
  )
}

export default HomeStack