import {
    Table as MuiTable,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'

import { Game } from '../models'
import { getColor } from '../utils'

type TableProps = {
    data: Game
}

export const Table: React.FC<TableProps> = ({ data }) => {
    const { date, players } = data
    const align = 'center'
    const headerCellStyle: React.CSSProperties = {
        fontWeight: 'bold',
    }

    const numOfRounds = players.length > 0 ? players[0].rounds.length : 0

    return (
        <TableContainer variant='outlined' component={Paper} style={{ marginBottom: 10 }}>
            <MuiTable>
                <TableHead>
                    <TableRow>
                        <TableCell align={align} style={headerCellStyle} colSpan={numOfRounds + 4}>
                            <Typography variant='h6' fontWeight='bold'>
                                {`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()}`}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align={align} style={headerCellStyle}>Player</TableCell>
                        {[...Array(numOfRounds).keys()].map((_, i) => (
                            <TableCell
                                align={align}
                                key={i}
                                style={headerCellStyle}
                            >
                                {i + 1}
                            </TableCell>
                        ))}
                        <TableCell align={align} style={headerCellStyle}>Total (⌀)</TableCell>
                        <TableCell align={align} style={headerCellStyle}>Strikes (⌀)</TableCell>
                        <TableCell align={align} style={headerCellStyle}>Spares (⌀)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player, i) => {
                        const total = player.rounds.reduce((sum, round) => sum + round, 0)
                        return (
                            <TableRow key={i} style={{ backgroundColor: getColor(player.name) }}>
                                <TableCell align={align}>{player.name}</TableCell>
                                {player.rounds.map((round, i) => (
                                    <TableCell align={align} key={i}>{round}</TableCell>
                                ))}
                                <TableCell align={align}>{total} ({(total / numOfRounds).toFixed(2)})</TableCell>
                                <TableCell align={align}>{player.strikes} ({(player.strikes / numOfRounds).toFixed(2)})</TableCell>
                                <TableCell align={align}>{player.spares} ({(player.spares / numOfRounds).toFixed(2)})</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MuiTable >
        </TableContainer>
    )
}