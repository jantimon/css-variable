// Linaria fails on the very first build 🤷‍♂️
// Therefore this script does it twice on error
import {$} from 'execa';

$({stdout: ['pipe', 'inherit']})
    `npm run build:next`
.catch(() => $({stdout: ['pipe', 'inherit']})
    `npm run build:next`
);
