import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

import { CheckGroup } from '../components/CheckGroup'
import { RoundsComparator } from '../components/RoundsComparator'
import { Stats } from '../components/Stats'
import { SumStats } from '../components/SumStats'
import rawData from '../data/data.json'
import { Game } from '../models'
import { getPlayersNames, checker } from '../utils'

export const MainScreen: React.FC = () => {
    const theme = useTheme()
    const data: Game[] = rawData.map<Game>(value => ({ ...value, date: new Date(value.date) }))
    const playersNames = getPlayersNames(data)
    const [checkedPlayers, setState] = React.useState(playersNames)
    const filteredData = data.filter(game => checker(game.players.map(({ name }) => name), checkedPlayers))

    const Placeholder = (
        <div
            style={{
                alignItems: 'center',
                alignSelf: 'stretch',
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Typography fontWeight='bold' variant='h1'>{'No data'}</Typography>
        </div>
    )

    return (
        <Box
            alignItems='center'
            bgcolor={theme.palette.background.default}
            display='flex'
            flexDirection='column'
            minHeight='100vh'
        >
            <Stack alignItems='center' spacing={2} paddingBottom={2} paddingTop={2} width='100%' flex={1}>
                <CheckGroup checkedPlayers={checkedPlayers} onToggle={state => setState(state)} players={playersNames} />
                {filteredData.length > 0
                    ? (
                        <>
                            {filteredData.map((game, i) => <Stats game={game} key={i} />)}
                            <SumStats data={filteredData} players={checkedPlayers} />
                            <RoundsComparator data={filteredData} players={checkedPlayers} />
                        </>
                    ) : Placeholder
                }
            </Stack>
        </Box>
    )
}