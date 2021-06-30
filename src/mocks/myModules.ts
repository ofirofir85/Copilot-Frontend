import {Module} from "./module";
export interface Configurion {
    hotkey: string,
    enabled : boolean,
    [key:string] : any

}
export type MyModule = Module & {configurion : Configurion}
const myModules: MyModule[] = [{
    moduleName: 'ip_info',
    moduleDiscription: 'bla bla bla. this guy is the King of Co-Pilot',
    likes: 173,
    hashtags: ['cyber', '7190'],
    configurion: {hotkey: 'alt+z', enabled: true, number:32492},
},
{
    moduleName: 'Orit',
    moduleDiscription: 'bla bla bla. this guy is the King of Co-Pilot',
    likes: 173,
    hashtags: ['cyber', '7190'],
    configurion: {hotkey: 'alt+k', enabled: true},
},
{
    moduleName: 'Ron',
    moduleDiscription: 'bla bla bla. this guy is the King of Co-Pilot',
    likes: 173,
    hashtags: ['cyber', '7190'],
    configurion: {hotkey: 'alt+yasdad', enabled: true},
},
{
    moduleName: 'Dana',
    moduleDiscription: 'bla bla bla. this guy is the King of Co-Pilot',
    likes: 173,
    hashtags: ['cyber', '7190'],
    configurion: {hotkey: 'alt+xcy', enabled: true},
},
]
export default myModules;