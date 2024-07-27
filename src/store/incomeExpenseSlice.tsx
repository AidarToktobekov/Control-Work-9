import { ApiCategories, ApiCategory, ApiIncomeExpense, IncomeExpense } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import {createCategory, createincomeExpense, deleteCategory, fetchCategory, fetchIncomeExpense, fetchOneCategory, fetchOneIncomeExpense, updateCategory, updateIncomeExpense} from './financeThunks';

interface CategoriesState {
  items: IncomeExpense[];
  oneCategory:  ApiCategories;
  fetchLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
  oneIncomeExpenseLoading: boolean;
  categoryLoading: boolean;
  oneIncomeExpense: ApiIncomeExpense | null,
  createLoading: boolean;
}

  const initialState: CategoriesState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
    updateLoading: false,
    oneIncomeExpenseLoading: false,
    categoryLoading: false,
    oneIncomeExpense: null,
    oneCategory: {},
    createLoading: false,
  };

export const incomeExpenseSlice = createSlice({
  name: 'incomeExpense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomeExpense.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchIncomeExpense.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchIncomeExpense.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(fetchOneCategory.pending, (state) => {
        state.categoryLoading = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, { payload: apiCategory }) => {
        state.oneCategory[apiCategory.id] = apiCategory;
        state.categoryLoading = false;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.categoryLoading = false;
      });
    builder
      .addCase(fetchOneIncomeExpense.pending, (state) => {
        state.oneIncomeExpenseLoading = true;
      })
      .addCase(fetchOneIncomeExpense.fulfilled, (state, { payload: apiIncomeExpense }) => {
        state.oneIncomeExpense = apiIncomeExpense;
        state.oneIncomeExpenseLoading = false;
      })
      .addCase(fetchOneIncomeExpense.rejected, (state) => {
        state.oneIncomeExpenseLoading = false;
      });
    // builder
    //   .addCase(deleteCategory.pending, (state) => {
    //     state.deleteLoading = true;
    //   })
    //   .addCase(deleteCategory.fulfilled, (state) => {
    //     state.deleteLoading = false;
    //   })
    //   .addCase(deleteCategory.rejected, (state) => {
    //     state.deleteLoading = false;
    //   });
    builder
      .addCase(createincomeExpense.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createincomeExpense.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createincomeExpense.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(updateIncomeExpense.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateIncomeExpense.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateIncomeExpense.rejected, (state) => {
        state.updateLoading = false;
      });

  },
  selectors: {
    selectIncomesExpenses: (state) => state.items,
    selectIncomesExpensesLoading: (state) => state.fetchLoading,
    selectIncomeExpense: (state) => state.oneCategory,
    selectIncomeExpenseUpdate: (state) => state.updateLoading,
    selectIncomeExpenseCreateLoading: (state) => state.createLoading,
    selectOneIncomeExpenseCreate: (state) => state.oneIncomeExpense,
    selectOneIncomeExpenseCreateLoading: (state) => state.oneIncomeExpenseLoading,
  },
});

export const incomeExpenseReducer = incomeExpenseSlice.reducer;

export const {selectIncomesExpenses, selectIncomesExpensesLoading, selectIncomeExpense, selectIncomeExpenseUpdate,selectOneIncomeExpenseCreate, selectIncomeExpenseCreateLoading, selectOneIncomeExpenseCreateLoading} = incomeExpenseSlice.selectors;
