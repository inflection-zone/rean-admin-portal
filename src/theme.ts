import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import {getCustomThemeConfiguration} from '../src/lib/utils/custom.theme.setting'
export const themeSetting = getCustomThemeConfiguration();

export const customTheme: CustomThemeConfig = {
	name: 'customTheme',
    properties: themeSetting.ThemeColors,
}
