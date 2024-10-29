import { rem, Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/SliceTheme';

const ToggleTheme = () => {

    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const themeMode = useSelector(state => state.sliceTheme.mode)

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );
    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );

    return (
        <div>
            <Switch
                size="md"
                color="dark.4"
                onLabel={sunIcon}
                offLabel={moonIcon}
                onChange={() => dispatch(toggleTheme())}
            />
        </div>
    )
}

export default ToggleTheme