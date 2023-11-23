import { BarChart, LineChart } from '@mui/x-charts'

import { Game } from '../models'
import { getColor, getRoundsArray } from '../utils'
import { Grid } from '@mui/material'

type GraphsProps = {
    data: Game
}

export const Graphs: React.FC<GraphsProps> = ({ data }) => {
    return (
        <Grid container>
            <Grid item xl={8}>
                <LineChart
                    height={500}
                    series={data.players.map(player => ({
                        color: getColor(player.name),
                        data: player.rounds,
                        label: player.name,
                    }))}
                    slotProps={{ legend: { hidden: true } }}
                    xAxis={[{ data: getRoundsArray(data.players), scaleType: 'point' }]}
                />
            </Grid>
            <Grid item xl={2}>
                <BarChart
                    height={500}
                    series={data.players.map(player => ({
                        color: getColor(player.name),
                        data: [player.rounds.reduce((sum, round) => sum + round, 0)],
                        label: player.name,
                    }))}
                    slotProps={{ legend: { hidden: true } }}
                    xAxis={[{ scaleType: 'band', data: ['Total'] }]}
                />
            </Grid>
            <Grid item xl={2}>
                <BarChart
                    height={500}
                    series={data.players.map(player => ({
                        color: getColor(player.name),
                        data: [player.strikes, player.spares],
                        label: player.name,
                    }))}
                    slotProps={{ legend: { hidden: true } }}
                    xAxis={[{ scaleType: 'band', data: ['Strikes', 'Spares'] }]}
                />
            </Grid>
        </Grid>
    )
}
