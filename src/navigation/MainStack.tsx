import { createStackNavigator } from '@react-navigation/stack';
import AllTranscripts from '../screens/Main/AllTranscripts';
import NewTranscription from '../screens/Main/NewTranscription';

const MainStack = createStackNavigator();

export default function MainNavigation() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='AllTranscriptions'
        component={AllTranscripts}
      />
      <MainStack.Screen
        name='NewTranscription'
        component={NewTranscription}
      />
    </MainStack.Navigator>
  )
}
