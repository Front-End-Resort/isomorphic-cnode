import React from "react"
import connect from 'react-imvc/hoc/connect'

export interface WithDataProps {
  state: {
    loadingText: string
  }
}

const withData = connect(({ state }: WithDataProps) => {
  return {
    content: state.loadingText
  }
})

export default withData(Loading)

export interface LoadingProps {
  content: string
}

function Loading(props: LoadingProps) {
  if (!props.content) {
    return null
  }
  return (
    <div id="wxloading" className="wx_loading">
      <div className="wx_loading_inner">
        <i className="wx_loading_icon" />
        {props.content}
      </div>
    </div>
  )
}
