import React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
} from 'react-live';

import {SharedElementTransitionGroup} from 'react-layout-transition';
import {codeString as demoCodeString} from './Demo';

const codeString = `${demoCodeString}

render(Demo);
`;

class SharedElementExample extends React.Component {
    render() {
        return (
            <div className='example-container'>
                <h2>Shared Element Transition</h2>
                <LiveProvider
                    noInline={true}
                    scope={{SharedElementTransitionGroup}}
                    code={codeString}
                >
                    <div className='example'>
                        <LiveEditor className='example__code'/>
                        <LivePreview className='example__display'/>
                    </div>
                </LiveProvider>
            </div>
        );
    }
}

export default SharedElementExample;
