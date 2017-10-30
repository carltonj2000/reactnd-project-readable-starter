import { ACTIVE_FILTER } from './filterActionTypes';

const initialState = {
  filters: [
    {name: 'votes', ascending: true},
    {name: 'date', ascending: false}
  ],
  activeFilter: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_FILTER:
      let index = action.filter;
      let filter = state.filters.slice(index,index + 1)[0];
      let filters = [
        ...state.filters.slice(0, index),
        {...filter, ascending: !filter.ascending},
        ...state.filters.slice(index + 1),
      ];
      return {...state, activeFilter: index, filters: filters};
    default: return state;
  }
}
