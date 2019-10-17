export type State = {
    pageTitle: string,
    showAddButton: boolean,
    tab: string,
    title: string,
    content: string,
    errorTypeList: string[],
}

export const initialState: State = {
    pageTitle: "添加",
    showAddButton: false,
    tab: 'share',
    title: '',
    content: '',
    errorTypeList: [],
}
