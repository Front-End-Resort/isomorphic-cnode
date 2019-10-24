import { ExtraState } from '../../shared/sharedInitialState'

export type State = ExtraState & {
    pageTitle: string,
    showAddButton: boolean,
    tab: string,
    title: string,
    content: string,
    errorTypeList: string[],
}

export const initialState = {
    pageTitle: "添加",
    showAddButton: false,
    tab: 'share',
    title: '',
    content: '',
    errorTypeList: [],
}
