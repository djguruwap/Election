import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, FONT_FAMILY, FONT_SIZE, SCREEN } from '../../utils/constants'
import { TextInputError } from '../Error/InputError'

export const Input = ({
	value,
	onChange,
	placeholder,
	icon,
	keyboardType,
	backgroundColor,
	borderColor,
	borderWidth,
	maxLength,
	onBlur,
	error,
	touched,
	isSecure,
	editable
}) => {
	return (
		<>
			<View style={[styles.container, { backgroundColor}]}>
				<View style={styles.row}>
					<Icon name={icon} size={22} color={'black'} />
					<TextInput
						editable={editable}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						maxLength={maxLength}
						keyboardType={keyboardType}
						placeholderTextColor={'#C9C9C9'}
						placeholder={placeholder}
						style={[styles.input]}
						secureTextEntry={isSecure}
					/>
				</View>
			</View>
			<TextInputError error={error} touched={touched} />
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 0.5,
		width: '100%',
		borderRadius: 8,
		borderColor: COLORS.GRAY,
		height: 45,
		marginVertical: 8,
		backgroundColor: COLORS.WHITE
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		backgroundColor: COLORS.WHITE,
		borderRadius: 20
	},
	input: {
		flex: 1,
		fontFamily: FONT_FAMILY.REGULAR,
		fontSize: FONT_SIZE.SMALL,
		color: COLORS.BLACK,
		height: 80,
		marginLeft: 12,
	}
})