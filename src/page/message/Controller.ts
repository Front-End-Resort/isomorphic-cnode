import Controller from "../../shared/BaseController";
import * as Model from "./Model";
import View from "./View";

export default class Message extends Controller<Model.State, Omit<typeof Model, 'initialState'>> {
  KeepAlive = true;
  NeedLogin = true;
  Model = Model;
  View = View;

  async componentWillCreate() {
    let accesstoken = this.cookie("accesstoken");
    let url = `/messages?accesstoken=${accesstoken}`;
    let { data } = await this.get(url);
    let { COMPONENT_WILL_CREATE } = this.store.actions;
    COMPONENT_WILL_CREATE({
      hasRead: data.has_read_messages,
      hasNotRead: data.hasnot_read_messages
    });
  }

  handleTabChange = ({ currentTarget }: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    let tab = currentTarget.getAttribute("data-tab");
    let { CHANGE_TAB } = this.store.actions;
    CHANGE_TAB(tab as Model.TAB);
  };

  handleMarkAll = async () => {
    try {
      let url = `/message/mark_all`;
      let accesstoken = this.cookie("accesstoken");
      await this.post(url, { accesstoken });
    } catch (error) {
      this.showAlert(error.message);
    }
  };
}
