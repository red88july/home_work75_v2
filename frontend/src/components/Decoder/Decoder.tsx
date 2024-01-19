'use client';
import React, {useState} from 'react';
import { useMutation } from "@tanstack/react-query";
import { Encryption } from "@/types";
import axiosApi from "@/axiosApi";
import {Button, Grid, TextField, Typography} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Decoder = () => {
    const [encodedMessage, setEncodedMessage] = useState<string>('');
    const [decodedMessage, setDecodedMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const encodeMutation = useMutation({
        mutationFn: async (encode: Encryption) => {
            const response = await axiosApi.post('/encode', encode);
            return response.data.encoded;
        }
    });

    const decodeMutation = useMutation({
        mutationFn: async (decode: Encryption) => {
            const response = await axiosApi.post('/decode', decode);
            return response.data.decoded;
        }
    });

    const handleEncode = async () => {
                const result = await encodeMutation.mutateAsync({ message: encodedMessage, password });
                setEncodedMessage(result);
    };

    const handleDecode = async () => {
                const result = await decodeMutation.mutateAsync({ message: decodedMessage, password });
                setDecodedMessage(result);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container gap={2} justifyContent="start" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Encoded Messsage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={encodedMessage}
                        onChange={(e) => setEncodedMessage(e.target.value)} />
                </Grid>
            </Grid>
            <Grid item container gap={10} justifyContent="start" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Password
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/*<TextField*/}
                    {/*    value={password}*/}
                    {/*    onChange={(e) => setPassword(e.target.value)} />*/}
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleEncode}
                        // disabled={isEncoding}
                    >
                        {/*{isEncoding ? 'Encoding...' : <ArrowCircleUpIcon />}*/}
                        {<ArrowCircleUpIcon/>}
                    </Button>
                    <Button
                        sx={{marginLeft: 2}}
                        variant="contained"
                        onClick={handleDecode}
                        // disabled={isDecoding}
                    >
                        {/*{isDecoding ? 'Decoding...' : <ArrowCircleDownIcon />}*/}
                        {<ArrowCircleDownIcon/>}
                    </Button>
                </Grid>
            </Grid>
            <Grid item gap={2} container justifyContent="start" alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Decoded Messsage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={decodedMessage}
                        onChange={(e) => setDecodedMessage(e.target.value)} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Decoder;