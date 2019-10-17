import React from 'react'

export let purify = () => <P>(InputComponent: React.ComponentType<P>) => {
    return class Pure extends React.PureComponent<P> {
        render() {
            return React.createElement(InputComponent, this.props)
        }
    }
}

export let staticify = () => <P>(InputComponent: React.ComponentType<P>) => {
    return class Static extends React.Component<P> {
        shouldComponentUpdate() {
            return false // always false to make sure just rendering once
        }
        render() {
            return React.createElement(InputComponent, this.props)
        }
    }
}