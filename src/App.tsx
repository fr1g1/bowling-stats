import { createTheme, ThemeProvider } from '@mui/material'
import React from 'react'

import { MainScreen } from './screens/MainScreen'

const App: React.FC = () => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <MainScreen />
        </ThemeProvider>
    )
}

export default App

