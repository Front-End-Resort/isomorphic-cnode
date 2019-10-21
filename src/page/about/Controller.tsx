import Controller from "../../shared/BaseController"
import { ExtraState } from '../../shared/sharedInitialState'
import React from "react"
import Layout from "../../component/Layout"

export type State = ExtraState &  {
  pageTitle: string
}
const initialState = {
  pageTitle: "关于"
}

export default class About extends Controller<State, {}> {
  View = View
  initialState = initialState
}

function View() {
  return (
    <Layout>
      <dl className="about-info">
        <dt>关于项目</dt>
        <dd>基于 cnodejs 的 api，采用 react-imvc 编写的 web app</dd>
        <dt>isomorphic-cnode 源码地址</dt>
        <dd>
          <a href="https://github.com/Lucifier129/isomorphic-cnode">
            https://github.com/Lucifier129/isomorphic-cnode
          </a>
        </dd>
        <dt>react-imvc 源码地址</dt>
        <dd>
          <a href="https://github.com/Lucifier129/react-imvc">
            https://github.com/Lucifier129/react-imvc
          </a>
        </dd>
        <dt>意见反馈</dt>
        <dd>
          <a href="https://github.com/Lucifier129/isomorphic-cnode/issues">
            发表意见或者提需求
          </a>
        </dd>
        <dt>当前版本</dt>
        <dd>V2.0</dd>
      </dl>
    </Layout>
  )
}
