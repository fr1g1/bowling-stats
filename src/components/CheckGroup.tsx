import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'

import { toggleName } from '../utils'

type CheckGroupProps = {
    checkedPlayers: string[]
    onToggle: (state: string[]) => void
    players: string[]
}

export const CheckGroup: React.FC<CheckGroupProps> = ({ checkedPlayers, onToggle, players }) => {
    return (
        <FormGroup>
            {players.map((name, i) => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checkedPlayers.includes(name)}
                            onChange={(_, checked) => {
                                onToggle(toggleName(checkedPlayers, name, checked))
                            }}
                            size='medium'
                        />
                    }
                    key={i}
                    label={name}
                />
            ))}
        </FormGroup>
    )
}
