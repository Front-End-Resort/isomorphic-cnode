import Controller from "../../shared/BaseController";
import * as Model from "./Model";
import View from "./View";

export default class User extends Controller<Model.State, Omit<typeof Model, 'initialState'>> {
  KeepAlive = true
  View = View;
  Model = Model;

  async componentWillCreate() {
    let { COMPONENT_WILL_CREATE } = this.store.actions;
    let state = this.store.getState();
    let { loginname } = state.location.params;
    let { data: user } = await this.get(`/user/${loginname}`);
    COMPONENT_WILL_CREATE({ user });
  }

  handleTypeChange = ({ currentTarget }: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    let { CHANGE_TYPE } = this.store.actions;
    let type = currentTarget.getAttribute("data-type") as Model.TYPE
    CHANGE_TYPE(type);
  };
}
