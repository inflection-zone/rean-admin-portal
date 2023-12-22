import fs from 'fs';
import path from 'path';
// import {
//     PUBLIC_THEME_CONFIG_FILE
// } from '$env/static/public';

// export const getCustomThemeConfiguration = () => {
//     try{
//         const filePath = './custom.theme.aha.json';
//         // console.log(process.cwd())
//         if (!fs.existsSync(path.join(process.cwd(),"src",filePath))) {
//             throw Error('Custom theme setting not found.');
//         }
//         const theme:string = fs.readFileSync(path.join(process.cwd(),"src",filePath), 'utf-8')
//         // console.log('HII')
//         const themeSetting = JSON.parse(theme);
//         return themeSetting;
//     }catch(error) {
//         console.log(`Error in loading custom setting: ${error}`)
//     }
// }

const getCustomThemeConfiguration = () => {
    try{
        const filePath = './custom.theme.rean.json';
        if (!fs.existsSync(path.join(process.cwd(),"src",filePath))) {
            throw Error('Custom theme setting not found.');
        }
        const theme:string = fs.readFileSync(path.join(process.cwd(),"src",filePath), 'utf-8')
        const themeSetting = JSON.parse(theme);
        return themeSetting;
    }catch(error) {
        console.log(`Error in loading custom setting: ${error}`)
    }
}

const themeSetting = getCustomThemeConfiguration();

export default themeSetting
