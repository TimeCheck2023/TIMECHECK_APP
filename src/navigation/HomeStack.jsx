import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeUser from "../screens/HomeUser";
import Details from "../screens/Details";
import BottomTabNavigator from "./BottomTabNavigator";


const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="HomeStack" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
    </Home.Navigator>
  )
}

export default HomeStack