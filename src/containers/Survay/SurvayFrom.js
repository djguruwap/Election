import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import { CommonButton } from '../../components/Buttons/CommonButton'
import DropdownComponent from '../../components/Dropdown/DropDown'
// import CustomDropdown from '../../../components/Dropdown/DropDown'
import { Input } from '../../components/Inputs/Input'
import { COLORS } from '../../utils/constants'
import Apis from '../../services/apis'
// import { resgistrationSchema } from '../validate'


const castsArr = [
	{ label: 'Hinduism', value: 'Hinduism' },
	{ label: 'Buddhism', value: 'Buddhism' },
	{ label: 'Jainism', value: 'Jainism' },
	{ label: 'Islam', value: 'Islam' },
	{ label: 'Christianity', value: 'Christianity' },
	{ label: 'Other', value: 'Other' },
];

export const SurvayFrom = () => {
	const { goBack } = useNavigation()
  const [loading, setLoading] = useState(false);
	const params = useRoute()?.params
	

	const onSubmitHandler = async (values) => {
		const token = await AsyncStorage.getItem('token')
		const body = {
			...values,
			token,
			card_no: params?.card_no,
			voting_done: 1
		}
		setLoading(true);
		Apis.AddOneSurvay(body).then(res => {
			console.log('testsese', res)
			setLoading(false)
			if(res.errorCode === 1) {
				showMessage({ message: res?.message, type: 'info' })
			}

			if(res?.errorCode === 0){
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
			console.log(err);
				showMessage({ message: 'Something went wrong!', type: 'danger' })
		})
	}

	return (
		<Formik
			initialValues={{
				card_no: params?.card_no,
				dob: '',
				mob1: '',
				mob2: '',
				whatsapp_no: '',
				note: '',
				profession: '',
				cast: null
			}}
			// validationSchema={resgistrationSchema}
			onSubmit={onSubmitHandler}
		>
			{({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
				<>
          <Spinner visible={loading} textContent={'Loading...'} />
					<Input
						value={values.card_no}
						onChange={handleChange('card_no')}
						onBlur={() => setFieldTouched('card_no')}
						error={errors.card_no}
						touched={touched.card_no}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="account"
						editable={false}
						placeholder="card_no" />
					<Input
						value={values.dob}
						onChange={handleChange('dob')}
						onBlur={() => setFieldTouched('dob')}
						error={errors.dob}
						touched={touched.dob}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="account"
						placeholder="YYYY/11/02" />
					<Input
						value={values.mob1}
						onChange={handleChange('mob1')}
						onBlur={() => setFieldTouched('mob1')}
						error={errors.mob1}
						touched={touched.mob1}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="phone"
						placeholder="Mobile 1" />
					<Input
						value={values.mob2}
						onChange={handleChange('mob2')}
						onBlur={() => setFieldTouched('mob2')}
						error={errors.mob2}
						touched={touched.mob2}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="phone"
						placeholder="Mobile 2" />
					<Input
						value={values.whatsapp_no}
						onChange={handleChange('whatsapp_no')}
						onBlur={() => setFieldTouched('whatsapp_no')}
						error={errors.whatsapp_no}
						touched={touched.whatsapp_no}
						backgroundColor={COLORS.INPUT_GRAY}
						borderColor={COLORS.INPUT_GRAY_BORDER}
						icon="whatsapp"
						placeholder="Whatsapp number" />
						<Input
							value={values.note}
							onChange={handleChange('note')}
							onBlur={() => setFieldTouched('note')}
							error={errors.note}
							touched={touched.note}
							backgroundColor={COLORS.INPUT_GRAY}
							borderColor={COLORS.INPUT_GRAY_BORDER}
							icon="fountain-pen-tip"
							placeholder="Add a note" />
						<Input
							value={values.profession}
							onChange={handleChange('profession')}
							onBlur={() => setFieldTouched('profession')}
							error={errors.profession}
							touched={touched.profession}
							backgroundColor={COLORS.INPUT_GRAY}
							borderColor={COLORS.INPUT_GRAY_BORDER}
							icon="doctor"
							placeholder="Add your profession" />

						<DropdownComponent
							data={castsArr}
						 	value={values?.cast}
						  onChange={handleChange('cast')}
							onBlur={() => setFieldTouched('cast')}
							placeholder="Select Cast" 
						/>

						{/* <DropdownComponent
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
						} */}
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