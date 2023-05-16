import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigatorOrg from "./BottomTabNavigatorOrg";



const Home = createNativeStackNavigator()

const HomeStackOrg = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
       <Home.Screen name="HomeStack" component={BottomTabNavigatorOrg} />
    </Home.Navigator>
  )
}

export default HomeStackOrg