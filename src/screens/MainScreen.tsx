import { Box, Card, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

import { CheckGroup } from '../components/CheckGroup'
import { Stats } from '../components/Stats'
import { Table } from '../components/Table'
import rawData from '../data/data.json'
import { Game, Player } from '../models'
import { getPlayersNames, checker } from '../utils'

export const MainScreen: React.FC = () => {
    const data: Game[] = rawData.map(value => ({
        date: new Date(value.date),
        players: value.players,
    }))
    const playersNames = getPlayersNames(data)
    const theme = useTheme()
    const [checkedPlayers, setState] = React.useState(playersNames)
    const filterData = data.filter(game => checker(game.players.map(({ name }) => name), checkedPlayers))

    const sumPlayersStats = [
        ...filterData.reduce((map, game) => {
            game.players.forEach(player => {
                if (map.has(player.name)) {
                    const data = map.get(player.name)!
                    data.rounds.push(...player.rounds)
                    data.spares = data.spares + player.spares
                    data.strikes = data.strikes + player.strikes
                    map.set(player.name, data)
                }
            })
            return map
        }, new Map<string, Player>(
            checkedPlayers.map(player => [player, { name: player, rounds: [], spares: 0, strikes: 0 }])
        )).values()
    ]

    return (
        <Box
            alignItems='center'
            bgcolor={theme.palette.background.default}
            display='flex'
            flexDirection='column'
            minHeight='100vh'
        >
            <Stack alignItems={'center'} spacing={2}>
                <CheckGroup checkedPlayers={checkedPlayers} onToggle={state => setState(state)} players={playersNames} />
                {filterData.map((game, i) => (
                    <Card
                        key={i}
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                        }}
                    >
                        <Table data={game} />
                        <Stats data={game} />
                    </Card>
                ))}
                {sumPlayersStats.length > 2 &&
                    <Card
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 20,
                        }}
                    >
                        <Typography variant='h5' fontWeight='bold' gutterBottom>
                            {'Total'}
                        </Typography>
                        <Stats data={{ players: sumPlayersStats }} />
                    </Card>
                }
            </Stack>
        </Box>
    )
}