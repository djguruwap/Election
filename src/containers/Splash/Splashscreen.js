import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../../utils/constants';
import * as Animatable from 'react-native-animatable';

export const SplashScreen = () => {
	const navigation = useNavigation();
	useEffect(() => {
		const timer = setTimeout(() => {
			navigation.replace('Login');
		}, 2500);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<View  style={styles.container}>
				<StatusBar translucent backgroundColor="transparent" />
				<View style={styles.logoBox}>
					<Animatable.Image animation='fadeInUp'  source={require('../../assets/imgs/splash.jpeg')} style={styles.logo}/>
				</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.WHITE
	},
	logoBox : {
		height: 100,
		width: '100%',
		paddingHorizontal: 10
	},
	logo: {
		height: 100,
		width: '100%',
		// marginHorizontal: 200
	}
});
