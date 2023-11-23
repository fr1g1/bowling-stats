import { ChartsData, Game, Player, TableData } from './models'

export const getColor = (name: string) => {
    switch (name) {
        case 'Frigi': return 'gray'
        case 'Mates': return 'blue'
        case 'Matyld': return 'red'
        case 'Pavel': return 'green'
        case 'Kuba': return 'orange'
    }
}

export const checker = (arr: string[], target: string[]) => arr.length === target.length && target.every(v => arr.includes(v))

export const getPlayersNames = (data: Game[]) => data.flatMap(game => game.players).reduce((players, player) => {
    if (!players.includes(player.name)) {
        players.push(player.name)
    }
    return players
}, new Array<string>())

export const toggleName = (state: string[], name: string, checked: boolean) => {
    if (checked) {
        state.push(name)
        return state.slice()
    } else {
        return state.filter(n => n !== name).slice()
    }
}

export const getRoundsArray = (players: Player[]) => {
    const numOfRounds = players.length > 0 ? players[0].rounds.length : 0
    return [...Array(numOfRounds).keys()].map((_, i) => (i + 1))
}

export const getChartsData = (data: Game[], players: string[]): ChartsData[] => [
    ...data.reduce((map, game) => {
        game.players.forEach(player => {
            if (map.has(player.name)) {
                const data = map.get(player.name)!
                const roundsSum = player.rounds.reduce((sum, round) => sum + round, 0)
                data.points.push(roundsSum)
                data.rounds.push(...player.rounds)
                data.spares = data.spares + player.spares
                data.strikes = data.strikes + player.strikes
                data.total = data.total + roundsSum
                map.set(player.name, data)
            }
        })
        return map
    }, new Map<string, ChartsData>(players.map(player => [
        player, {
            name: player,
            points: [],
            rounds: [],
            spares: 0,
            strikes: 0,
            total: 0,
        }]))
    ).values()
]

export const getTableData = (data: Game[], players: string[], sliderValue: number): TableData[] => [
    ...data.reduce((map, game) => {
        game.players.forEach(player => {
            if (map.has(player.name)) {
                const data = map.get(player.name)!
                player.rounds.forEach(round => {
                    if (round > sliderValue) {
                        data.rounds.better++
                    } else if (round === sliderValue) {
                        data.rounds.equal++
                    } else {
                        data.rounds.worse++
                    }
                }, 0)
                map.set(player.name, data)
            }
        })
        return map
    }, new Map<string, TableData>(
        players.map(player => [
            player, {
                name: player,
                rounds: {
                    better: 0,
                    equal: 0,
                    worse: 0,
                }
            }]
        )
    )).values()
]
