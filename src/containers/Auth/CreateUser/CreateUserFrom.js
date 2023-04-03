import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { CommonButton } from '../../../components/Buttons/CommonButton'
import DropdownComponent from '../../../components/Dropdown/DropDown'
// import CustomDropdown from '../../../components/Dropdown/DropDown'
import { Input } from '../../../components/Inputs/Input'
import Apis from '../../../services/apis'
import { COLORS } from '../../../utils/constants'
import { resgistrationSchema } from '../validate'


const election_type_Data = [
	{ label: '0', value: 0 },
	{ label: '1', value: 1 },
	{ label: '2', value: 2 },
	{ label: '3', value: 3 },
];

export const CreateUserFrom = () => {
	const { goBack } = useNavigation()
	const [roles, setRoles] = useState([])
	const [states, setStates] = useState([])
	const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false);
	


	useEffect(() => {
		fetchDefaultsValues()
	}, [])

	const onSubmitHandler = async (values) => {
		const token = await AsyncStorage.getItem('token')
    setLoading(true);
		const body = {
			email: values?.email,
			password: values?.password,
			name: values?.name,
			scheme_type: 'production',
			type: 'role_prepaid',
			one_time_comission: 0,
			country: 1,
			state: values?.state,
			city: values?.city,
			role: values?.role,
			election_type: 6,
			token
		}
		Apis.AddUser(body).then(res => {
			setLoading(false)
			if(res.errorCode) {
				showMessage({ message: res?.message, type: 'info' })
			}
			if (res.data) {
				showMessage({
					type: 'success',
					message: res?.message
				})
				setTimeout(() => {
					goBack()
				}, 1500)
			}
		}).catch(err => {
			setLoading(false)
				showMessage({ message: 'Something went wrong!', type: 'danger' })
		})
	}
	const fetchDefaultsValues = async () => {
		const token = await AsyncStorage.getItem("token")
		Apis.GetRoles({token}).then(res => {
			const roles = res?.data.map(item => {
				return {
					label: item.role_name,
					value: item.id
				}
			})
			setRoles(roles)
		})
		Apis.GetStates({token}).then(res => {
			const stateData = res?.data.map(item => {
				return {
					label: item.state_name,
					value: item.id
				}
			})
			setStates(stateData)
		})
	}

	const getCities = async (selectedState) => {
		setLoading(true)
		const token = await AsyncStorage.getItem("token")
		Apis.GetCities({token, stateId: selectedState}).then(res => {
			setLoading(false)
			const cities = res?.data.map(item => {
				return {
					label: item.city,
					value: item.id
				}
			})
			setCities(cities)
		}).catch(err => {
			setLoading(false)
		})
	}
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				role: '',
				state: '',
				city: '',
				password: '',
				confirmPassword: ''
			}}
			validationSchema={resgistrationSchema}
			onSubmit={onSubmitHandler}
		>
			{({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
				<>
          <Spinner visible={loading} textContent={'Loading...'} />
					<Input
						value={values.email}
						onChange={handleChange('email')}
						onBlur={() => setFieldTouched('email')}
						error={errors.email}
						touched={touched.email}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="email"
						placeholder="Email" />
					<Input
						value={values.name}
						onChange={handleChange('name')}
						onBlur={() => setFieldTouched('name')}
						error={errors.fullName}
						touched={touched.fullName}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="account"
						placeholder="Name" />
					<Input
						value={values.password}
						onChange={handleChange('password')}
						onBlur={() => setFieldTouched('password')}
						error={errors.password}
						touched={touched.password}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="lock"
						isSecure
						placeholder="Password" />
					<Input
						value={values.confirmPassword}
						onChange={handleChange('confirmPassword')}
						onBlur={() => setFieldTouched('confirmPassword')}
						error={errors.confirmPassword}
						touched={touched.confirmPassword}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="lock"
						placeholder="Confirm Password" />
						<DropdownComponent
							data={roles}
						 	value={values?.role}
						  onChange={handleChange('role')}
							onBlur={() => setFieldTouched('role')}
							placeholder="Select Role" 
						/>
						<DropdownComponent
							data={states}
						 	value={values?.state}
						  onChange={handleChange('state')}
							hitOnChange={(val) => {
									getCities(val)
							}}
							onBlur={() => setFieldTouched('state')}
							placeholder="Select State" 
						/>
						{
							cities.length > 0 &&
							<DropdownComponent
								data={cities}
								value={values?.city}
								onChange={handleChange('city')}
								onBlur={() => setFieldTouched('city')}
								placeholder="Select City"
							/>
						}
						{/*
						 <DropdownComponent onChangeVal={(item) => {
							setFieldTouched('state', item.value)
							getCities(item?.value)
						}} placeholder="State" data={states}/>
						<DropdownComponent placeholder="Select City" data={cities}/>
						 */}

					<View style={styles.buttonBox}>
						<CommonButton onPress={handleSubmit} width={'80%'} text="Register" />
					</View>
				</>
			)}

		</Formik>
	)
}

const styles = StyleSheet.create({
	buttonBox: { justifyContent: 'center', alignItems: 'center', marginVertical: 30 },
})