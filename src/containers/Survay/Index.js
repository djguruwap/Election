import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { COLORS, FONT_FAMILY, FONT_SIZE, SCREEN } from '../../utils/constants'
import { SurvayFrom } from './SurvayFrom'

//constant color
export const TakeSurvay = () => {
	const { navigate } = useNavigation()
	return (
		<ScrollView style={styles.continer}>
			<View style={styles.box}>
				<Text style={styles.title}>Survay</Text>
			</View>
			<View>
				<SurvayFrom />
			</View>
			<View>
			</View>

		</ScrollView>
	)
}

const styles = StyleSheet.create({
	continer: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: COLORS.WHITE
	},
	box: {
		marginVertical: 25
	},
	title: {
		fontFamily: FONT_FAMILY.BOLD,
		fontSize: FONT_SIZE.BIG,
		color: COLORS.BLACK,
		alignSelf: 'center'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	line: {
		width: SCREEN.WIDTH * 0.35,
		height: 1,
		backgroundColor: '#E2E2E2'
	},

	text: {
		fontFamily: FONT_FAMILY.LIGHT,
		fontSize: FONT_SIZE.MICRO,
		color: COLORS.BLACK,
		textAlign: 'center',
		marginTop: SCREEN.HEIGHT * 0.15,
	},
	termsBox: {
		marginHorizontal: 14
	},
	loginUpText: {
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SMALL,
		color: COLORS.TEXT_PURPLE,
		alignSelf: 'center',
	},
	login: {
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SMALL,
		color: COLORS.GRAY,
		alignSelf: 'center'
	},
})