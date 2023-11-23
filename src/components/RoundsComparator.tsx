import { Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

import { Card } from './Card'

import { Game } from '../models'
import { getColor, getTableData } from '../utils'

type RoundsComparatorProps = {
    data: Game[]
    players: string[]
}

export const RoundsComparator: React.FC<RoundsComparatorProps> = ({ data, players }) => {
    const rounds = data.flatMap(game => game.players.flatMap(player => player.rounds))
    const sliderMax = Math.max(...rounds)
    const sliderMin = Math.min(...rounds)
    const sliderDefault = Math.floor((sliderMax - sliderMin) / 2 + sliderMin)
    const [sliderValue, setSliderValue] = React.useState(sliderDefault)
    const tableData = getTableData(data, players, sliderValue)

    React.useEffect(() => {
        setSliderValue(sliderDefault)
    }, [players])

    const align = 'center'
    const headerCellStyle: React.CSSProperties = {
        fontWeight: 'bold',
    }
    const cellStyle: React.CSSProperties = {
        width: '25%',
    }

    return (
        <Card title='Rounds comparator'>
            <Typography>Points</Typography>
            <Slider
                value={sliderValue}
                marks
                max={sliderMax}
                min={sliderMin}
                onChange={(_, value) => {
                    setSliderValue(value as number)
                }}
                step={1}
                valueLabelDisplay='auto'
            />
            <TableContainer variant='outlined' component={Paper} style={{ marginTop: 10 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={align} style={headerCellStyle}>Player</TableCell>
                            <TableCell align={align} style={headerCellStyle}>Better rounds</TableCell>
                            <TableCell align={align} style={headerCellStyle}>Equal rounds</TableCell>
                            <TableCell align={align} style={headerCellStyle}>Worse rounds</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((player, i) => (
                            <TableRow key={i} style={{ backgroundColor: getColor(player.name) }}>
                                <TableCell align={align} style={cellStyle}>
                                    {player.name}
                                </TableCell>
                                <TableCell align={align} style={cellStyle}>
                                    {player.rounds.better}
                                </TableCell>
                                <TableCell align={align} style={cellStyle}>
                                    {player.rounds.equal}
                                </TableCell>
                                <TableCell align={align} style={cellStyle}>
                                    {player.rounds.worse}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table >
            </TableContainer>
        </Card>
    )
}
