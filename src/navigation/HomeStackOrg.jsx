import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigatorOrg from "./BottomTabNavigatorOrg";
import FormSubOrg from "../screens/Org/FormSubOrg/FormSubOrg";
import ProfileOrg from "../screens/Org/ProfileOrg/ProfileOrg";
import Graphics from "../screens/Org/Home/Graphics";
import Search from "../screens/Org/Search/Search";
import HomeEventSuborg from "../screens/Org/HomeEventSuborg/HomeEventSuborg";
import JuegoMemoria from "../components/JuegoMemoria/JuegoMemoria";
import BottomTabNavigator from "./BottomEventListOrg/BottomEventListOrg";
import FormUpdateOrg from "../screens/Org/FormUpdateOrg/FormUpdateOrg";
import ChangePassword from "../screens/Org/ChangePassword";
import FormSubOrgUpdate from "../screens/Org/FormSubOrg/FormSubOrgUpdate";


const Home = createNativeStackNavigator()

const HomeStackOrg = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
       <Home.Screen name="HomeStack" component={BottomTabNavigatorOrg} />
       <Home.Screen name="JuegoMemoria" component={JuegoMemoria} />
       <Home.Screen name="FormUpdateOrg" component={FormUpdateOrg} />
       <Home.Screen name="Search" component={Search} />
       <Home.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
       <Home.Screen name="FormSubOrg" component={FormSubOrg} />
       <Home.Screen name="ProfileOrg" component={ProfileOrg} />
       <Home.Screen name="Graphics" component={Graphics} />
       <Home.Screen name="ChangePassword" component={ChangePassword} />
       <Home.Screen name="FormSubOrgUpdate" component={FormSubOrgUpdate} />
    </Home.Navigator>
  )
}

export default HomeStackOrg