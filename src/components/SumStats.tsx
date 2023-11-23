import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'
import React from 'react'

import { Card } from './Card'

import { Game, Player } from '../models'
import { getChartsData, getColor, getRoundsArray } from '../utils'

type SumStatsProps = {
    data: Game[]
    players: string[]
}

export const SumStats: React.FC<SumStatsProps> = ({ data, players }) => {
    const chartsData = getChartsData(data, players)

    return (
        <Card title='Total'>
            <TableContainer variant='outlined' component={Paper} style={{ marginBottom: 10 }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            {players.map((player, i) => (
                                <TableCell
                                    align='center'
                                    key={i}
                                    style={{ backgroundColor: getColor(player), width: `${100 / players.length}%` }}
                                >
                                    {player}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table >
            </TableContainer>
            <Grid container>
                <Grid alignItems='center' display='flex' flexDirection='column' item xl={8}>
                    <LineChart
                        height={500}
                        series={chartsData.map(player => ({
                            color: getColor(player.name),
                            data: player.rounds,
                            label: player.name,
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        xAxis={[{
                            data: getRoundsArray(chartsData as Player[]),
                            label: 'By rounds',
                            scaleType: 'point',
                        }]}
                    />
                    <LineChart
                        height={500}
                        series={chartsData.map(player => ({
                            color: getColor(player.name),
                            data: player.points,
                            label: player.name,
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        xAxis={[{
                            data: data.map(({ date }) => new Date(date)),
                            label: 'By date',
                            scaleType: 'point',
                            valueFormatter(date) {
                                return date.toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                });
                            },
                        }]}
                    />
                </Grid>
                <Grid item xl={4} display='flex'>
                    <BarChart
                        height={1000}
                        series={chartsData.map(player => ({
                            color: getColor(player.name),
                            data: [player.total],
                            label: player.name,
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        xAxis={[{ scaleType: 'band', data: ['Total'] }]}
                    />
                    <BarChart
                        height={1000}
                        series={chartsData.map(player => ({
                            color: getColor(player.name),
                            data: [player.strikes, player.spares],
                            label: player.name,
                        }))}
                        slotProps={{ legend: { hidden: true } }}
                        xAxis={[{ scaleType: 'band', data: ['Strikes', 'Spares'] }]}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}
