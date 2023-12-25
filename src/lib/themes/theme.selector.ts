import { SystemTypes } from '../system.types';

// AHA Theme imports
import { ThemeColors as AHAThemeColors } from './aha.theme';
import { ThemeDarkColor as AHAThemeDarkColor } from './aha.theme';
import { ChartColors as AHAChartColors } from './aha.theme';
import { HoverChartColors as AHAHoverChartColors } from './aha.theme';
import { TickColorLight as AHATickColorLight } from './aha.theme';
import { TickColorDark as AHATickColorDark } from './aha.theme';

// REAN Theme imports
import { ThemeColors as REANThemeColors } from './rean.theme';
import { ChartColors as REANChartColors } from './rean.theme';
import { HoverChartColors as REANHoverChartColors } from './rean.theme';
import { TickColorLight as REANTickColorLight } from './rean.theme';
import { TickColorDark as REANTickColorDark } from './rean.theme';
import { ThemeDarkColor as REANThemeDarkColor } from './rean.theme';

import { SYSTEM_ID } from '../constants';

//////////////////////////////////////////////////////////////////////////////

export const getThemeColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANThemeColors;
        case SystemTypes.AHA:
            return AHAThemeColors;
        default:
            return REANThemeColors;
    }
};

export const getChartColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANChartColors;
        case SystemTypes.AHA:
            return AHAChartColors;
        default:
            return REANChartColors;
    }
};

export const getHoverChartColors = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANHoverChartColors;
        case SystemTypes.AHA:
            return AHAHoverChartColors;
        default:
            return REANHoverChartColors;
    }
};

export const getTickColorLight = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANTickColorLight;
        case SystemTypes.AHA:
            return AHATickColorLight;
        default:
            return REANTickColorLight;
    }
};

export const getTickColorDark = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANTickColorDark;
        case SystemTypes.AHA:
            return AHATickColorDark;
        default:
            return REANTickColorDark;
    }
};

export const getThemeDarkColor = () => {
    const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
    switch (systemType as SystemTypes) {
        case SystemTypes.REAN:
            return REANThemeDarkColor;
        case SystemTypes.AHA:
            return AHAThemeDarkColor;
        default:
            return REANThemeDarkColor;
    }
};


// export const getThemeDarkColor = (systemType: string) => {
    // const systemType: SystemTypes = SYSTEM_ID as SystemTypes;
