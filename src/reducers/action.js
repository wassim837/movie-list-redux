export const types = {
    CREATE: 'app/todo/CREATE',
    UPDATE: 'app/todo/UPDATE',
    DELETE: 'app/todo/DELETE'
}
export const initialState = {
    items: []
}

export default (state = initialState, action) => {

    switch (action.type) {
        case types.CREATE:
            return {
                ...state,
                items: [
                    action.payload.item,
                    ...state.items
                ]
            };
        case types.UPDATE:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.payload.item.id) {
                        return {
                            ...item,
                            ...action.payload.item
                        }

                    }
                    return item;
                })
            };
        case types.DELETE:
            const deleteIndex = state.items.findIndex((item) => (item.id === action.payload.item.id));

            if (deleteIndex > -1) {
                const deletedItems = [
                    ...state.items.slice(0, deleteIndex),
                    ...state.items.slice(deleteIndex + 1)
                ];
                return {
                    ...state,
                    items: deletedItems
                };
            }
            return state;
        default:
            return state;
    }
};
export const actions = {
    create: (item) => ({ type: types.CREATE, payload: { item } }),
    update: (item) => ({ type: types.UPDATE, payload: { item } }),
    delete: (item) => ({ type: types.DELETE, payload: { item } })
}
