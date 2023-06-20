import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/User/Details/Details";
import BottomTabNavigator from "./BottomTabNavigator";
import Profiles from "../screens/User/Profile/Profiles";
import FormUpdateUSer from "../screens/User/FormUpdateUSer";
import FromEvents from "../screens/User/FromEvent/FromEvents";
import Notifications from "../screens/User/Notification/Notifications";
import FormEvents from "../screens/User/FromEvent/FormEvents";
import ContainerImage from "../components/ContainerImage/ContainerImage";
import DetailsSub from "../screens/User/Details/DetailsSub";


const Home = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTabNavigator">
      <Home.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Home.Screen name="Details" component={Details} />
      <Home.Screen name="DetailsSub" component={DetailsSub} />
      <Home.Screen name="Notifications" component={Notifications} />
      <Home.Screen name="FormUpdateUSer" component={FormUpdateUSer} />
      <Home.Screen name="ContainerImage" component={ContainerImage} />
      <Home.Screen name="FromEvents" component={FormEvents} />
      <Home.Screen name="Profiles" component={Profiles} />
    </Home.Navigator>
  )
}

export default HomeStack