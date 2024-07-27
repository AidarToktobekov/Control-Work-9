export interface Category{
    name: string;
    type: string;
    id: string;
}

export type ApiCategory = Omit<Category, 'id'>;

export interface ApiCategories {
    [id: string]: ApiCategory;
  }