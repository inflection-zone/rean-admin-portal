import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';
import { getThemeColors } from './lib/themes/theme.selector';
import { PUBLIC_SYSTEM_ID } from '$env/static/public';

export const customTheme: CustomThemeConfig = {
	name: 'customTheme',
    properties: getThemeColors(PUBLIC_SYSTEM_ID),
}
