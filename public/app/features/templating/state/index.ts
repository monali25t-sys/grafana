import { initialQueryVariablesState, QueryVariablesState } from './queryVariable';
import { createSlice } from '@reduxjs/toolkit';
import { variableAdapter, VariableType } from '../variable';
import { addVariable } from './actions';

export interface TemplatingState extends Record<VariableType, any> {
  query: QueryVariablesState;
}

export const initialState = {
  query: initialQueryVariablesState,
};

const templatingSlice = createSlice({
  name: 'templating',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(addVariable, (state: TemplatingState, action) => {
      const { type } = action.payload.model;
      const reducer = variableAdapter[type].reducer;
      if (!reducer) {
        throw new Error(`Reducer for type ${type} could not be found.`);
      }
      state[type] = reducer(state[type], action);
    }),
});

export const templatingReducer = templatingSlice.reducer;

export default {
  templating: templatingReducer,
};
