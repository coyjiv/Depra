import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { i18n } from "../i18n";

const Login = () => {
    const navigation = useNavigation();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(i18n.t('login.incorrectEmail')).required(i18n.t('login.requiredEmail')),
        password: Yup.string().required(i18n.t('login.requiredPassword'))
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("Signed in as ", user);

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    Alert.alert(i18n.t('errors.error'), `${i18n.t(`errors.${errorCode}`)}: ${errorMessage}`);
                });
        },

    })

    useEffect(() => {
        console.log(formik.errors)
    }, [ formik.errors ])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}>
                <Text category="h1" style={{ fontWeight: '900', fontSize: 45 }}>Depra</Text>

                <Text category="h2" style={{ fontWeight: '300' }} >{i18n.t('login.title')}</Text>
                <Layout style={{ marginTop: 50 }}>
                    <Input
                        label={evaProps => <Text {...evaProps} style={{ fontSize: 18, marginBottom: 10 }}>{i18n.t('login.email')}</Text>}
                        size="large"
                        placeholder={i18n.t('login.emailPlaceholder')}
                        value={formik.values.email}
                        onChangeText={nextValue => formik.setFieldValue('email', nextValue)}
                    />
                    {formik.errors.email ? <Text style={{ color: 'red', marginTop: 10 }}>{formik.errors.email}</Text> : null}

                    <Input
                        label={evaProps => <Text {...evaProps} style={{ fontSize: 18, marginBottom: 10, marginTop: 20 }}>{i18n.t('login.password')}</Text>}
                        size="large"
                        placeholder={i18n.t('login.passwordPlaceholder')}
                        secureTextEntry
                        value={formik.values.password}
                        onChangeText={nextValue => formik.setFieldValue('password', nextValue)}
                    />
                    {formik.errors.password ? <Text style={{ color: 'red', marginTop: 10 }}>{formik.errors.password}</Text> : null}
                    <Button
                        style={styles.button}
                        appearance='ghost'

                        status='primary'
                        onPress={() => navigation.navigate('Register' as never)}
                    >
                        {() => <Text>{i18n.t('login.dont_have_account')}</Text>}
                    </Button>
                    <Button style={{ marginTop: 50 }} onPress={formik.handleSubmit as any}>{i18n.t('login.button_login')}</Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        width: 260,
    }
})

export default Login