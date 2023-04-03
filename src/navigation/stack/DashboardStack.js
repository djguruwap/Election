import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../../containers/Dashboard/Dashboard';
// import {TermsAndCondition} from '../../containers/Dashboard/TermsAndCondition';
import {PrivacyPolicy} from '../../containers/Privacyandpolicies';
import {MyAccount} from '../../containers/Dashboard/MyAccout/MyAccount';
import { AdvanceSearch } from '../../containers/Dashboard/AdvanceSearch/AdvanceSearch';

const Stack = createStackNavigator();
export const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'red',
        },
      }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AdvanceSearch"
        component={MyAccount}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyAccount"
        component={MyAccount}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="TermsAndCondition"
        component={TermsAndCondition}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="PrivicyPolicy"
        component={PrivacyPolicy}
      />
    </Stack.Navigator>
  );
};
