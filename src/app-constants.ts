 

import { SCRIPTS_ENUM } from "./types"

export const SCRIPTS: Record<SCRIPTS_ENUM, {name: string; script: string}> = {
    [SCRIPTS_ENUM.FACEBOOK]: {name: SCRIPTS_ENUM.FACEBOOK, script: 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v16.0'},
    [SCRIPTS_ENUM.TWITTER]: {name: SCRIPTS_ENUM.TWITTER, script: 'https://platform.twitter.com/widgets.js'},
}

// todo remove
export const FLUTTERWAVE_PUBLIC_KEY =  'FLWPUBK-97ac758db208f907a84420b4e3a5b17e-X';


export const Links = [
    {
        label: 'Privacy Policy',
        link: '#'
    },
    {
        label: 'Terms of Use',
        link: '#'
    },
    {
        label: 'About EDITOR_APP',
        link: '#'
    },
];