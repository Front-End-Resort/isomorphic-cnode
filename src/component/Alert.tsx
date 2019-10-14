import React from "react";
import connect from 'react-imvc/hoc/connect'

export type WithDataProps = {
  state: {
    alertText: string
  }
}

const withData = connect(({ state }: WithDataProps) => {
  return {
    content: state.alertText
  }
})

export default withData(Alert)

export type Props = {
  content: string
}

function Alert(props: Props) {
  if (!props.content) {
    return null;
  }
  return (
    <div id="wxAlert" className="wx_loading">
      <div id="wx_alert_inner" className="wx_alert_inner">
        {props.content}
      </div>
    </div>
  );
}
