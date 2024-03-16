const base = () => new Map([
  ['cursor', 'cursor-pointer'],
  ['width', 'w-fit'],
  ['height', 'h-fit'],
  ['display', 'inline-block'],
  ['font-weight', 'font-semibold'],
  ['border', 'border-0'],
  ['background-color', 'bg-transparent'],

  // hover state
  ['hover-underline', 'hover:underline'],
]);

const primary = () => new Map([
  ['text-color', 'text-primary-50'],
  ['hover-text-color', 'hover:text-primary-50'],
]);

const secondary = () => new Map([
  ['text-color', 'text-primary-500'],
  ['hover-text-color', 'hover:text-grey-50'],
  ['underline', 'underline'],
  ['underline-color', 'decoration-primary-500'],
]);

const contrastPrimary = () => new Map([
  ['text-color', 'text-white-100'],
  ['hover-text-color', 'hover:text-white-100'],
]);

export default {
  base,
  primary,
  secondary,
  contrastPrimary,
};
