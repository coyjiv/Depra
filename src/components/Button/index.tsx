import React from 'react'
import { Text, TextProps, Button as UIKittenButton, ButtonProps as UIKittenButtonProps, useTheme } from '@ui-kitten/components'

interface ButtonProps extends UIKittenButtonProps {
    title?: string
    textProps?: TextProps
}

const Button = ({ title, textProps, ...props }: ButtonProps) => {
    const theme = useTheme()
    return (
        <UIKittenButton {...props}>{() => <Text style={{
            color: theme[ 'color-basic-100' ],
        }} {...textProps}>{props.children}</Text>}</UIKittenButton>
    )
}

export default Button