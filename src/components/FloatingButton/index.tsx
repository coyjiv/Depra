import { Button, ButtonProps, Text } from '@ui-kitten/components'
import React from 'react'

const FloatingButton = (props: ButtonProps) => {
    return (
        <Button {...props} style={{
            position: 'absolute',
            bottom: 100,
            right: 20,
            zIndex: 1,
            borderRadius: 50,
            width: 60,
            height: 60,
            elevation: 10,
        }}>{() => <Text style={{ fontSize: 20, color: 'white' }}>+</Text>}</Button>
    )
}

export default FloatingButton