import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigatorOrg from "./BottomTabNavigatorOrg";
import FormSubOrg from "../screens/Org/FormSubOrg/FormSubOrg";
import ProfileOrg from "../screens/Org/ProfileOrg/ProfileOrg";
import Graphics from "../screens/Org/Graphics";


const Home = createNativeStackNavigator()

const HomeStackOrg = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
       <Home.Screen name="HomeStack" component={BottomTabNavigatorOrg} />
       <Home.Screen name="FormSubOrg" component={FormSubOrg} />
       <Home.Screen name="ProfileOrg" component={ProfileOrg} />
       <Home.Screen name="Graphics" component={Graphics} />
    </Home.Navigator>
  )
}

export default HomeStackOrg