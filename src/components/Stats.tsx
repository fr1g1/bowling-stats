import React from 'react'

import { Card } from './Card'
import { Graphs } from './Graphs'
import { Table } from './Table'

import { Game } from '../models'

type StatsProps = {
    game: Game
}

export const Stats: React.FC<StatsProps> = ({ game }) => {
    const { date } = game
    return (
        <Card title={`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`}>
            <Table data={game} />
            <Graphs data={game} />
        </Card>
    )
}