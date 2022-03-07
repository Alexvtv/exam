import React from 'react';

/*const Type1 = React.lazy(() => import('./level1'));
const Type2 = React.lazy(() => import('./level2'));
const Type3 = React.lazy(() => import('./level3'));

export const typeResolver = (props) => {
    const {type} = props.currentTask;

    if ([1].includes(type)) return <Type1 props={props}/>;
    if ([2, 3].includes(type)) return <Type2 props={props}/>;
    if ([4, 5].includes(type)) return <Type3 props={props}/>;
};*/

export {Type1} from './level1';
export {Type2} from './level2';
export {Type3} from './level3';
