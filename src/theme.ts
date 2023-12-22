import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import themeSetting from '../src/lib/utils/custom.theme.setting'

export const customTheme: CustomThemeConfig = {
	name: 'customTheme',
    properties: themeSetting.ThemeColors,
}
