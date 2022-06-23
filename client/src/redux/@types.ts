import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export interface Product {
  id: string,
  name: string,
  quantity: number,
  price: number,
  category: string,
  imageUrl: string
}