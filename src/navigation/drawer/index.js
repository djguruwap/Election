import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {DashboardStack} from '../stack/DashboardStack';
import {CustomDrawer} from './CustomDrawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../../containers/Dashboard/Dashboard';
// import {TermsAndCondition} from '../../containers/Dashboard/TermsAndCondition';
import {PrivacyPolicy} from '../../containers/Privacyandpolicies';
import {MyAccount} from '../../containers/Dashboard/MyAccout/MyAccount';
import { AdvanceSearch } from '../../containers/Dashboard/AdvanceSearch/AdvanceSearch';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../utils/constants';
import { FullView } from '../../containers/Dashboard/AdvanceSearch/FullView';
import { Text } from 'react-native';
import { CreateUser } from '../../containers/Auth/CreateUser/CreteUser';
import Apis from '../../services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { UsersList } from '../../containers/UserList';
import { SurvayList } from '../../containers/Survay/SurvayList';
import { TakeSurvay } from '../../containers/Survay/Index';
import { NoticeBoard } from '../../containers/NoticeBoard';

//Drawer
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  const balance = useSelector(state => state.profile?.profile?.wallet_amount)
  console.log('xx', balance)
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerType="back"
      drawerPosition="left"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen options={{
         headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTintColor: COLORS.WHITE,
        headerRight:  () => {
          return(
            <Text style={{
              fontFamily: FONT_FAMILY.MEDIUM,
              marginRight: 12,
              fontSize: FONT_SIZE.MEDIUM,
              color: COLORS.WHITE
            }}>
                Balance: {balance ? balance :  0}
               </Text>
          )
        }
      }} name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export const MainDrawer = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.PRIMARY,
      },
      headerTintColor: COLORS.WHITE
    }}>
      <Stack.Screen
        options={{headerShown: false,
        }}
        name="Dashboard"
        component={DrawerComponent}
      />
      <Stack.Screen name="MyAccount" component={MyAccount} />
      <Stack.Screen name="AdvanceSearch" component={AdvanceSearch} options={{title: 'Advance Search'}} />
      <Stack.Screen name="Survay" component={SurvayList} options={{title: 'Survay List'}} />
      <Stack.Screen name="TakeSurvay" component={TakeSurvay} options={{title: 'Survay'}} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoard} options={{title: 'Notice Board'}} />
      <Stack.Screen name="FullView" component={FullView} options={{title: 'Voter'}} />
      <Stack.Screen
				options={{ title: 'Create User'}}
				name="CreateUser"
				component={CreateUser}
			/>
      {/* <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} /> */}
      <Stack.Screen name="PrivicyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="UsersList" component={UsersList} />
    </Stack.Navigator>
  );
};
