import fs from 'fs';
import path from 'path';

export const getCustomThemeConfiguration = () => {
    try{
        const filePath = './custom.theme.aha.json';
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
