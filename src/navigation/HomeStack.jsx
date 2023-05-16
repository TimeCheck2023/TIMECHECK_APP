import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeUser from "../screens/HomeUser";
import Details from "../screens/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../screens/Profile";
import FormUpdateUSer from "../screens/FormUpdateUSer";



const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="HomeStack" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
      <Home.Screen name="Profile" component={Profile} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
    </Home.Navigator>
  )
}

export default HomeStack