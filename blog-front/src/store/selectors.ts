import { RootState } from './index';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// специальный хук для useSelector для typescript
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
