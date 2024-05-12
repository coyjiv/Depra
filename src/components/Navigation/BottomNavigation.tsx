import React from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

export const BottomNavigator = (): React.ReactElement => {

    const [ selectedIndex, setSelectedIndex ] = React.useState(0);

    return (
        <BottomNavigation
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
        >
            <BottomNavigationTab title='Mood' />
            <BottomNavigationTab title='Schedule' />
            <BottomNavigationTab title='Stats' />
        </BottomNavigation>
    );
};