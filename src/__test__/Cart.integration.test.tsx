import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import Cart from '../components/Cart';

function setupStore() {
  return configureStore({ reducer: { cart: cartReducer } });
}

test('Cart renders without crashing', () => {
  const store = setupStore();
  render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
});