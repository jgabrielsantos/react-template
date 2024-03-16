import homeIcon from '../assets/svg/homeIcon.svg';
import logOutIcon from '../assets/svg/logOutIcon.svg';
import companyLogo from '../assets/images/cctech-logo-black.webp';

export const IMAGES = new Map();
export const ICONS = new Map();

// IMAGES
IMAGES.set('COMPANY_ICON', {
  SRC: companyLogo,
  ALT: 'company logo',
});

// ICONS
ICONS.set('HOME_ICON', {
  SRC: homeIcon,
  ALT: 'house icon',
});

ICONS.set('LOGOUT_ICON', {
  SRC: logOutIcon,
  ALT: 'logout icon',
});
