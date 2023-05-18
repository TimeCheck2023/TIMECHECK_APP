import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/User/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/User/Profile";
import FormUpdateUSer from "../screens/User/FormUpdateUSer";



const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeStack">
      <Home.Screen name="HomeStack" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
      <Home.Screen name="Profile" component={Profile} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
    </Home.Navigator>
  )
}

export default HomeStack