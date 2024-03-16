const large = () => new Map([
  ['font-size', 'text-bodyLarge'], // font-size: 1rem (16px) & line-height: 1.5rem (24px)
  ['padding-vertical', 'py-0'], //  padding-top: 0 & padding-bottom: 0
  ['padding-horizontal', 'px-0'], // padding-left:0 & padding-right: 0
  ['underline-offset', 'underline-offset-4'],
]);

const medium = () => new Map([
  ['font-size', 'text-bodyMedium'], // font-size: 0.875rem (14px) & line-height: 1.25rem (20px)
  ['padding-vertical', 'py-0'], // padding-top: 0 & padding-bottom: 0
  ['padding-horizontal', 'px-0'], // padding-left: 0 & padding-right: 0
  ['underline-offset', 'underline-offset-2'],
]);

const small = () => new Map([
  ['font-size', 'text-bodySmall'], // font-size: 0.75rem (12px) & line-height: 1rem (16px)
  ['padding-vertical', 'py-0'], // padding-top: 0 & padding-bottom: 0
  ['padding-horizontal', 'px-0'], // padding-left: 0 & padding-right: 0
  ['underline-offset', 'underline-offset-2'],
]);

export default {
  large,
  medium,
  small,
};
