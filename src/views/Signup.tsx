import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useTranslation } from "react-i18next";

const Signup = () => {
    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('signup.incorrectEmail')).required(t('signup.requiredEmail')),
        password: Yup.string().min(8, t('signup.shortPassword')).required(t('signup.requiredPassword'))
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user);
                navigation.navigate('MoodDiary' as never)
                // ...
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert(t('errors.error'), `${t(`errors.${errorCode}`)}`);
                    // ..
                });
        },

    })

    useEffect(() => {
        console.log(formik.errors)
    }, [ formik.errors ])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}>
                <Text category="h1" style={{ fontSize: 45 }}>Depra</Text>

                <Text category="h2" >{t('signup.title')}</Text>
                <Layout style={{ marginTop: 50 }}>
                    <Input
                        label={evaProps => <Text {...evaProps} style={{ fontSize: 18, marginBottom: 10 }}>{t('signup.email')}</Text>}
                        size="large"
                        placeholder={t('signup.emailPlaceholder')}
                        value={formik.values.email}
                        onChangeText={nextValue => formik.setFieldValue('email', nextValue)}
                    />
                    {formik.errors.email ? <Text style={{ color: 'red', marginTop: 10 }}>{formik.errors.email}</Text> : null}

                    <Input
                        label={evaProps => <Text {...evaProps} style={{ fontSize: 18, marginBottom: 10, marginTop: 20 }}>{t('signup.password')}</Text>}
                        size="large"
                        placeholder={t('signup.passwordPlaceholder')}
                        secureTextEntry
                        value={formik.values.password}
                        onChangeText={nextValue => formik.setFieldValue('password', nextValue)}
                    />
                    {formik.errors.password ? <Text style={{ color: 'red', marginTop: 10 }}>{formik.errors.password}</Text> : null}
                    <Button
                        style={styles.button}
                        appearance='ghost'

                        status='primary'
                        onPress={() => navigation.navigate('Login' as never)}
                    >
                        {() => <Text>{t('signup.already_have_account')}</Text>}
                    </Button>
                    <Button style={{ marginTop: 50 }} onPress={formik.handleSubmit as any}>{t('signup.button_signup')}</Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        width: 280
    }
})

export default Signup