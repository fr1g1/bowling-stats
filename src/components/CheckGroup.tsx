import { Button, ButtonGroup, useTheme } from '@mui/material'
import React from 'react'

import { toggleName } from '../utils'

type CheckGroupProps = {
    checkedPlayers: string[]
    onToggle: (state: string[]) => void
    players: string[]
}

export const CheckGroup: React.FC<CheckGroupProps> = ({ checkedPlayers, onToggle, players }) => {
    const theme = useTheme()

    return (
        <ButtonGroup style={{ alignItems: 'center', justifyContent: 'center' }} variant='contained'>
            {players.map((name, i) => (
                <Button
                    color={checkedPlayers.includes(name) ? 'success' : 'error'}
                    key={i}
                    onClick={() => onToggle(toggleName(checkedPlayers, name, !checkedPlayers.includes(name)))}
                    style={{ borderColor: theme.palette.common.white }}
                    variant={checkedPlayers.includes(name) ? 'contained' : 'outlined'}
                >
                    {name}
                </Button>
            ))}
        </ButtonGroup>
    )
}
