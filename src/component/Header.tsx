import React from "react"
import classnames from "classnames"
import { Link } from "react-imvc/component"
import connect from 'react-imvc/hoc/connect'
import Menu from "./Menu"

export interface WithDataProps {
  state: {
    fixedHeader: boolean,
    showMenu: boolean,
    pageTitle: boolean,
    messageCount: number,
    showAddButton: boolean
  },
  ctrl: {
    handleCloseMenu: Function
    handleOpenMenu: Function
  }
}

const withData = connect(({ state, ctrl }: WithDataProps) => {
  return {
    fixedHeader: state.fixedHeader,
    showMenu: state.showMenu,
    pageTitle: state.pageTitle,
    messageCount: state.messageCount,
    showAddButton: state.showAddButton,
    onCloseMenu: ctrl.handleCloseMenu,
    onOpenMenu: ctrl.handleOpenMenu,
  }
})

export default withData(Header)

export interface HeaderProps {
  fixedHeader: boolean,
  showMenu: boolean,
  pageTitle: boolean,
  messageCount: number,
  showAddButton: boolean,
  onCloseMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  onOpenMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function Header(props: HeaderProps) {
  let {
    showMenu,
    fixedHeader,
    showAddButton,
    messageCount,
    pageTitle,
    onCloseMenu,
    onOpenMenu,
  } = props
  let headClassName = classnames({
    show: showMenu && fixedHeader,
    "fix-header": fixedHeader,
    "no-fix": !fixedHeader
  })
  
  return (
    <div>
      <PageCover if={showMenu && fixedHeader} onClick={onCloseMenu} />
      <header id="hd" className={headClassName}>
        <div className="nv-toolbar">
          <Toolbar if={fixedHeader} onClick={onOpenMenu} />
          <span>{pageTitle}</span>
          <Message messageCount={messageCount} showAddButton={showAddButton} />
        </div>
      </header>
      <Menu />
    </div>
  )
}

export interface PageCoverProps {
  if: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function PageCover(props: PageCoverProps) {
  if (!props.if) {
    return null
  }
  return <div className="page-cover" onClick={props.onClick} />
}

export interface ToolbarProps {
  if: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function Toolbar(props: ToolbarProps) {
  if (!props.if) {
    return null
  }
  return <div className="toolbar-nav" onClick={props.onClick} />
}

export interface MessageProps {
  messageCount: number,
  showAddButton: boolean
}

function Message({ messageCount, showAddButton }: MessageProps) {
  if (messageCount > 0) {
    return <i className="num">{messageCount}</i>
  }
  if (showAddButton) {
    return (
      <Link as="i" className="iconfont add-icon" to={`/add`}>
        &#xe60f
      </Link>
    )
  }

  return null
}
