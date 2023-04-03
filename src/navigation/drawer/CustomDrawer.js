import React, { useContext } from 'react';
import { Text, View, Button, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { COLORS, defaultImg, FONT_FAMILY, FONT_SIZE, SCREEN } from '../../utils/constants';
import { Navlink } from '../../components/Navlink/Navlink';
import Icon from 'react-native-vector-icons/Entypo'
import { AuthContext } from '../AuthProvider';
import { useSelector } from 'react-redux';

const IMG_SIZE = 60;

export const CustomDrawer = props => {
  const user = useSelector(state => state.profile.profile)
	const { logout } = useContext(AuthContext)
	const { navigation } = props;
	console.log('xx', user)


	const handleLogout = () => {
		Alert.alert(
			"Log out",
			"Are u sure?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => logout() }
			]
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<TouchableOpacity>
					<Icon name="circle-with-cross" size={28} color={COLORS.WHITE} />
				</TouchableOpacity>
			</View>
			<View style={styles.row}>
				<View>
					<Image
						style={styles.imgBox}
						resizeMode="cover"
						source={{ uri: defaultImg }}
					/>
				</View>
				<View style={{ marginLeft: 12 }}>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.text1}>
						{user?.name}
					</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.text2}>
						{user?.email}
					</Text>
				</View>
			</View>
			<View style={styles.line} />
			<DrawerContentScrollView style={styles.scroll} {...props}>
			<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="My Profile"
					onPress={() => {
						navigation.navigate('MyAccount');
					}}
				/>
				<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="Voter"
					onPress={() => {
						// navigation.navigate('MyAccount');
					}}
				/>
				<Text style={styles.title}>
						Users
					</Text>
				<View style={styles.hr}/>
				<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="User List"
					onPress={() => {
						navigation.navigate('UsersList');
					}}
				/>
					<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="Create User"
					onPress={() => {
						navigation.navigate('CreateUser');
					}}
				/>
				<View style={styles.hr}/>
				<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="Verification"
					onPress={() => {
						// navigation.navigate('MyAccount');
					}}
				/>
				<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="Transaction"
					onPress={() => {
						// navigation.navigate('MyAccount');
					}}
				/>
				<Navlink
					img={require('../../assets/imgs/account.png')}
					showIcon={true}
					title="Opposition"
					onPress={() => {
						// navigation.navigate('MyAccount');
					}}
				/>
				<Text style={styles.title}>Help & Supports</Text>
				<View style={styles.hr}/>
					<Navlink
						img={require('../../assets/imgs/account.png')}
						showIcon={true}
						title="Complaints"
						onPress={() => {
							// navigation.navigate('MyAccount');
						}}
					/>
				<Navlink
					// img={require('../../assets/imgs/policy.png')}
					showIcon={true}
					title="Privacy policy"
					onPress={() => {
						navigation.navigate('PrivicyPolicy');
					}}
				/>
				<Navlink
					img={require('../../assets/imgs/terms.png')}
					showIcon={true}
					title="Term & Condition"
					onPress={() => {
						navigation.navigate('TermsAndCondition');
					}}
				/>

				{/* <Navlink
					img={require('../../assets/imgs/help.png')}
					showIcon={true}
					title="Help & Support"
					onPress={() => {
						//     navigation.navigate('Profile');
					}}
				/> */}

				<View style={styles.logout}>
					<Navlink onPress={handleLogout} color={COLORS.RED}  title="Logout" />
				</View>
			</DrawerContentScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.PRIMARY
	},
	box: {
		alignSelf: 'flex-end',
		marginHorizontal: 16,
		marginTop: 16,
		backgroundColor: COLORS.PRIMARY
	},
	scroll: {
		paddingVertical: 8,
		paddingHorizontal: 22,
		backgroundColor: 'white',
	},
	row: {
		height: SCREEN.HEIGHT * 0.15,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 16,
		backgroundColor: COLORS.PRIMARY
	},
	imgBox: { height: IMG_SIZE, width: IMG_SIZE, borderRadius: IMG_SIZE / 2 },
	text1: {
		fontSize: FONT_SIZE.LARGE,
		fontFamily: FONT_FAMILY.BOLD,
		color: COLORS.WHITE,
		width: SCREEN.WIDTH / 3,
	},
	text2: {
		fontSize: FONT_SIZE.SMALL,
		fontFamily: FONT_FAMILY.REGULAR,
		color: COLORS.WHITE,
		// marginTop: 4,
		width: SCREEN.WIDTH / 3,
	},
	line: {
		height: 8,
		width: '100%',
		backgroundColor: '#E7E7E7',
		opacity: 0.6,
	},
	title:{
		fontSize: FONT_SIZE.SMALL - 2,
		fontFamily: FONT_FAMILY.MEDIUM,
	 },
	hr: {
		height: 1,
		width: '100%',
		backgroundColor: '#E7E7E7',
		opacity: 0.6,
		marginTop: 5
	},
	logout: {
		// marginHorizontal: 20,
		// marginVertical: 30,
		alignSelf: 'center',
		// marginTop: 30
	},
});
