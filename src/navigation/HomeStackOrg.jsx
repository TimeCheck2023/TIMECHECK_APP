import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigatorOrg from "./BottomTabNavigatorOrg";
import FormSubOrg from "../screens/Org/FormSubOrg/FormSubOrg";
import ProfileOrg from "../screens/Org/ProfileOrg/ProfileOrg";


const Home = createNativeStackNavigator()

const HomeStackOrg = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
       <Home.Screen name="HomeStack" component={BottomTabNavigatorOrg} />
       <Home.Screen name="FormSubOrg" component={FormSubOrg} />
       <Home.Screen name="ProfileOrg" component={ProfileOrg} />
    </Home.Navigator>
  )
}

export default HomeStackOrg