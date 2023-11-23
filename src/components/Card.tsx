import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from '@mui/icons-material'
import { Card as MuiCard, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from '@mui/material'
import React, { PropsWithChildren } from 'react'

type CardProps = PropsWithChildren<{
    title: string
}>

export const Card: React.FC<CardProps> = ({ children, title }) => {
    const [open, setOpen] = React.useState(true)
    const toggle = () => {
        setOpen(value => !value)
    }

    const header = (
        <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <IconButton
                onClick={e => {
                    e.stopPropagation()
                    toggle()
                }}
                size='small'
                style={{
                    position: 'absolute',
                    left: 40,
                }}
            >
                {open ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
            </IconButton>
            <Typography variant='h6' paddingTop={1}>{title}</Typography>
        </div>
    )

    return (
        <MuiCard
            style={{
                alignSelf: 'stretch',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 20,
                marginRight: 20,
            }}
        >
            <CardHeader
                onClick={toggle}
                style={{ alignSelf: 'stretch', cursor: 'pointer' }}
                title={header}
            />
            <Collapse in={open} style={{ alignSelf: 'stretch' }} >
                <Divider style={{ alignSelf: 'stretch' }} />
                <CardContent
                    style={{
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </CardContent>
            </Collapse>
        </MuiCard>
    )
}
