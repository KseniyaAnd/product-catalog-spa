import { Provider } from 'react-redux';
import { store } from './store';

export default function AppProvider(props: any) {
  return <Provider store={store}>{props.children}</Provider>;
}
