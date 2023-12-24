
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

export enum ThemeFlavor {
    REAN   = 'REAN',
    AHA    = 'AHA',
    Sneha  = 'Sneha',
    Custom = 'Custom'
}

export const getThemeColors = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANThemeColors;
        case ThemeFlavor.AHA:
            return AHAThemeColors;
        default:
            return REANThemeColors;
    }
};

export const getChartColors = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANChartColors;
        case ThemeFlavor.AHA:
            return AHAChartColors;
        default:
            return REANChartColors;
    }
};

export const getHoverChartColors = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANHoverChartColors;
        case ThemeFlavor.AHA:
            return AHAHoverChartColors;
        default:
            return REANHoverChartColors;
    }
};

export const getTickColorLight = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANTickColorLight;
        case ThemeFlavor.AHA:
            return AHATickColorLight;
        default:
            return REANTickColorLight;
    }
};

export const getTickColorDark = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANTickColorDark;
        case ThemeFlavor.AHA:
            return AHATickColorDark;
        default:
            return REANTickColorDark;
    }
};

export const getThemeDarkColor = () => {
    const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;
    switch (themeFlavor as ThemeFlavor) {
        case ThemeFlavor.REAN:
            return REANThemeDarkColor;
        case ThemeFlavor.AHA:
            return AHAThemeDarkColor;
        default:
            return REANThemeDarkColor;
    }
};


// export const getThemeDarkColor = (themeFlavor: string) => {
    // const themeFlavor: ThemeFlavor = SYSTEM_ID as ThemeFlavor;