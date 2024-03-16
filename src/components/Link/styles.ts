import type {
  GSizeEnum,
  LinkAdditionalClassesPropTypes,
  LinkComponentsEnum,
  LinkConstructorPropTypes,
  LinkThemesEnum,
} from './types';
import Sizes from './sizes';
import Themes from './themes';

/**
 * @param size          controls the font-size, line-height and padding
 * @param theme         controls the color, border and background color
 * @return              string with all tailwind classes to be used by the component
 * @see                 Link
 */

export interface ILinkStyle {
  buildStyleRules: () => Record<`${LinkComponentsEnum}Class`, string>;
}

export class LinkStyles implements ILinkStyle {
  private additionalClasses: LinkAdditionalClassesPropTypes;

  private size: GSizeEnum;

  private sizes: Record<GSizeEnum, Map<string, string>> = {
    large: Sizes.large(),
    medium: Sizes.medium(),
    small: Sizes.small(),
  };

  private theme: LinkThemesEnum;

  private themes: Record<LinkThemesEnum, Map<string, string>> = {
    primary: Themes.primary(),
    secondary: Themes.secondary(),
    contrastPrimary: Themes.contrastPrimary(),
  };

  constructor({
    additionalClasses = {
      link: [],
    },
    theme,
    size,
  }: LinkConstructorPropTypes) {
    this.additionalClasses = additionalClasses;
    this.theme = theme;
    this.size = size;
  }

  private getThemeRules() {
    return this.themes[this.theme];
  }

  private getSizeRules() {
    return this.sizes[this.size];
  }

  buildStyleRules() {
    const classes = {
      linkClass: [
        ...Themes.base().values(),
        ...this.getSizeRules().values(),
        ...this.getThemeRules().values(),
        ...this.additionalClasses.link,
      ].join(' '),
    };

    return classes;
  }
}
