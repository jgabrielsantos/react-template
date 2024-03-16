import React from 'react';
import { LinkStyles } from './styles';
import { LinkComponentPropTypes } from './types';

export const Link = ({
  children,
  href,
  theme,
  size,
  additionalClasses,
}: Readonly<LinkComponentPropTypes>) => {
  const styles = new LinkStyles({
    additionalClasses,
    theme,
    size,
  });
  const { linkClass } = styles.buildStyleRules();

  return (
    <a
      href={href}
      data-testid='link-component'
      className={linkClass}
    >
      {children}
    </a>
  );
};
