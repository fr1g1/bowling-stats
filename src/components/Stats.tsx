import { BarChart, LineChart } from '@mui/x-charts'
import { Optional } from 'utility-types'

import { Game } from '../models'
import { getColor } from '../utils'

type StatsProps = {
    data: Optional<Game, 'date'>
}

export const Stats: React.FC<StatsProps> = ({ data }) => {
    return (
        <div style={{ alignItems: 'flex-end', display: 'flex' }}>
            <LineChart
                height={500}
                series={data.players.map(player => ({
                    color: getColor(player.name),
                    data: player.rounds,
                    label: player.name,
                }))}
                width={800}
            />
            <BarChart
                height={500}
                series={data.players.map(player => ({
                    color: getColor(player.name),
                    data: [player.rounds.reduce((sum, round) => sum + round, 0)],
                    label: player.name,
                }))}
                width={400}
                xAxis={[{ scaleType: 'band', data: ['Total'] }]}
            />
            <BarChart
                height={500}
                series={data.players.map(player => ({
                    color: getColor(player.name),
                    data: [player.strikes, player.spares],
                    label: player.name,
                }))}
                width={400}
                xAxis={[{ scaleType: 'band', data: ['Strikes', 'Spares'] }]}
            />
        </div>
    )
}
