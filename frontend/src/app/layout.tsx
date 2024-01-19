'use client';
import React from 'react';
import theme from "@/theme";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <html lang="en">
                        <body>
                        <main>
                            <Container sx={{mt: 6}}>
                                {children}
                            </Container>
                        </main>
                        </body>
                        </html>
                    </CssBaseline>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}