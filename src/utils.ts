import { Game } from './models'

export const getColor = (name: string) => {
    switch (name) {
        case 'Frigi': return 'gray'
        case 'Mates': return 'blue'
        case 'Matyld': return 'red'
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
