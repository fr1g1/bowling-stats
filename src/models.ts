export type Game = {
    date: Date
    players: Player[]
}

export type Player = {
    name: string
    rounds: number[]
    spares: number
    strikes: number
}

export type ChartsData = {
    name: string
    points: number[]
    rounds: number[]
    spares: number
    strikes: number
    total: number
}

export type TableData = {
    name: string
    rounds: {
        better: number
        equal: number
        worse: number
    }
}
