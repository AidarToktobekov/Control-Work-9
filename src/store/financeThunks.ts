import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import { ApiCategories, ApiCategory, Category } from '../types';

export const fetchCategory = createAsyncThunk<
  Category[],
  undefined
>('category/fetchCategory', async () => {
  const categoryResponse = await axiosApi.get<ApiCategories>('/categories.json');
  const categories:ApiCategories = categoryResponse.data;

  let newCategories: Category[] = [];

  if (categories) {
    newCategories = Object.keys(categories).map((key: string) => {
      const category = categories[key];
      return {
        id: key,
        ...category,
      };
    });
  }

  return newCategories;
});

export const deleteCategory = createAsyncThunk<void, string>(
  'category/deleteCategory',
  async (categoryId) => {
    await axiosApi.delete('/categories/' + categoryId + '.json');
  },
);

export const createCategory = createAsyncThunk<void, ApiCategory>(
  'category/create',
  async (apiCategory) => {
    await axiosApi.post('/categories.json', apiCategory);
  },
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'category/fetchOne',
  async (id) => {
    const { data: category } = await axiosApi.get<ApiCategory | null>(
      `/categories/${id}.json`,
    );

    if (category === null) {
      throw new Error('Not found');
    }

    return category;
  },
);

export interface UpdateCategoryArg {
  id: string;
  apiCategory: ApiCategory;
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryArg>(
  'category/update',
  async ({ id, apiCategory }) => {
    await axiosApi.put(`/categories/${id}.json`, apiCategory);
  },
);
