jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => {

  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name }) =>
      React.createElement(Text, null, name),
  };
});

jest.spyOn(global.console, 'warn').mockImplementation(() => {});
