import type {AppState, AppDispatch} from "@/shared/store/store";
import {useDispatch, useSelector} from "react-redux";

// чтобы было видно какие типы у значений в стейте
export const useAppSelector = useSelector.withTypes<AppState>();

// без типизации заточен только под синхронные экшены
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();