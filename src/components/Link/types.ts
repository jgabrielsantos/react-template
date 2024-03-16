import type React from 'react';

export type LinkThemesEnum = 'primary' | 'secondary' | 'contrastPrimary';
export type GSizeEnum = 'large' | 'medium' | 'small';

export type LinkAdditionalClassesPropTypes = {
  link: string[];
};

export type LinkComponentPropTypes = {
  children: React.ReactNode;
  href: string;
  size: GSizeEnum;
  theme: LinkThemesEnum;
  additionalClasses?: LinkAdditionalClassesPropTypes;
};

export type LinkConstructorPropTypes = Pick<
LinkComponentPropTypes,
'additionalClasses' | 'theme' | 'size'
>;

export type LinkComponentsEnum = 'link';
