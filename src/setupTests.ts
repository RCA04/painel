// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Necessário para o react-router no ambiente do Jest (Node 20 + jsdom).
import { TextDecoder, TextEncoder } from 'util';

// @ts-expect-error - polyfill global para testes
global.TextEncoder = TextEncoder;
// @ts-expect-error - polyfill global para testes
global.TextDecoder = TextDecoder;
