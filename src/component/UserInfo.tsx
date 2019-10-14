import React from "react";
import { Link } from "react-imvc/component";
import connect from 'react-imvc/hoc/connect'

export type WithDataProps = {
  state: {
    location: {
      pattern: string,
      raw: string
    },
    userInfo: {
      loginname: string
    },
    user: {
      loginname: string
    }
  },
  handlers: {
    handleLogout: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
  }
}

const withData = connect(({ state, handlers }: WithDataProps) => {
  return {
    location: state.location,
    userInfo: state.userInfo,
    user: state.user,
    onLogout: handlers.handleLogout,
  }
})

export default withData(UserInfo)

export type UserInfoProps = {
  location: {
    pattern: string,
    raw: string
  },
  userInfo: {
    loginname: string
  },
  user: {
    loginname: string
  },
  onLogout: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

function UserInfo({ location, userInfo, user, onLogout }) {
  let showLogout =
    location.pattern === "/user/:loginname" &&
    userInfo &&
    user &&
    userInfo.loginname === user.loginname;
  return (
    <div className="user-info">
      <User if={!showLogout && userInfo} info={userInfo} />
      <Login if={!showLogout && !userInfo} redirect={location.raw} />
      <Logout if={showLogout} onLogout={onLogout} />
    </div>
  );
}

export type LoginProps = {
  if: boolean,
  redirect: string
}

function Login(props: LoginProps) {
  if (!props.if) {
    return null;
  }

  return (
    <ul className="login-no">
      <Link as="li" className="login" to={`/login?redirect=${props.redirect}`}>
        登录
      </Link>
    </ul>
  );
}

export type LogoutProps = {
  if: boolean,
  onLogout: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

function Logout(props: LogoutProps) {
  if (!props.if) {
    return null;
  }

  return (
    <ul className="login-no">
      <li className="login" onClick={props.onLogout}>
        退出
      </li>
    </ul>
  );
}

export type UserProps = {
  if: boolean
  info: {
    loginname: string,
    avatar_url: string
  }
}

function User(props: UserProps) {
  if (!props.if) {
    return null;
  }
  let { loginname, avatar_url } = props.info;
  return (
    <Link as="div" to={`/user/${loginname}`} className="login-yes">
      <div className="avertar">{avatar_url && <img src={avatar_url} />}</div>
      <div className="info">{loginname && <p>{loginname}</p>}</div>
    </Link>
  );
}
