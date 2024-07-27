import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from '../store/categoriesSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    // dishes: dishesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;