import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import ProductItem from '../components/ProductItem';

describe('ProductItem', () => {

  it('renderiza el producto y permite marcarlo', async () => {

    const onToggle = jest.fn();

    const { getByText } = await render(
      <ProductItem
        item={{
          nombre: 'Leche',
          comprado: false,
        }}
        onToggle={onToggle}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    fireEvent.press(getByText('Leche'));

    expect(getByText('Leche')).toBeTruthy();
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
