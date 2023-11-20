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
