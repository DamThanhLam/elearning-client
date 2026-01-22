import { TextStyle } from 'react-native';
import { fonts } from './fonts';

export const typography : Record<string, TextStyle> = {
  h1: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: fonts.subheading,
    fontSize: 24,
    lineHeight: 32,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
  },
  bodyMedium: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fonts.caption,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    fontFamily: fonts.button,
    fontSize: 16,
    lineHeight: 20,
  },
};