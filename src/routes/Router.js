import { createStackNavigator } from "react-navigation";
import SplashScreen from "../screens/Splash/SplashContainer";
import SearchLocationScreen from "../screens/SearchLocation/SearchLocationContainer";
import SavedLocationScreen from "../screens/SavedLocation/SavedLocationContainer";
import HomeScreen from "../screens/Home/HomeContainer";
import LoginScreen from "../screens/Login/LoginContainer";
import FindRoadScreen from "../screens/FindRoad/FindRoadContainer";
import AccountScreen from "../screens/Menu/AccountContainer";

const SearchLocationScreenStack = createStackNavigator(
  {
    SearchLocation: {
      screen: SearchLocationScreen
    },
    SavedLocation: {
      screen: SavedLocationScreen
    }
  },
  {
    initialRouteName: "SearchLocation",
    navigationOptions: {
      header: null
    }
  }
);

const Router = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen
    },
    Home: {
      screen: HomeScreen
    },
    Login: {
      screen: LoginScreen
    },
    FindRoad: {
      screen: FindRoadScreen
    },
    SearchLocation: {
      screen: SearchLocationScreen
    },
    SavedLocation: {
      screen: SavedLocationScreen
    }
  },
  {
    initialRouteName: "Splash",
    navigationOptions: {
      header: null
    }
  }
);

export default Router;
