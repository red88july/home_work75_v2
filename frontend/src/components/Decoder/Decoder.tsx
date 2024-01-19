'use client';
import React, {useState} from 'react';
// import {useMutation} from "@tanstack/react-query";
import {Encryption} from "@/types";
import axiosApi from "@/axiosApi";
import {Button, Grid, TextField, Typography} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {useMutation} from "react-query";

const Decoder = () => {

    const [encodedMessage, setEncodedMessage] = useState<string>('');
    const [decodedMessage, setDecodedMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const encodeMutation = useMutation({
        mutationFn: async (encode: Encryption) => {
            const { message, password } = encode;
            if (!password) {
                throw new Error('Password is required for encoding.');
            }
            const response = await axiosApi.post('/encode', { message, password });
            return response.data.encoded;
        }
    });

    const decodeMutation = useMutation({
        mutationFn: async (decode: Encryption) => {
            const { message, password } = decode;
            if (!password) {
                throw new Error('Password is required for decoding.');
            }
            const response = await axiosApi.post('/decode', { message, password });
            return response.data.decoded;  // Make sure you are accessing the correct property
        }
    });

    // const decodeMutation = useMutation({
    //     mutationFn: async (decode: Encryption) => {
    //         const { message, password } = decode;
    //         if (!password) {
    //             throw new Error('Password is required for decoding.');
    //         }
    //         const response = await axiosApi.post('/decode', { message, password });
    //         return response.data.encoded;
    //     }
    // });

    const handleEncode = async () => {
                const result = await encodeMutation.mutateAsync({ message: encodedMessage, password });
                setEncodedMessage(result);
        // try {
        //     if (password) {
        //     } else {
        //         console.error('Password is required for encoding.');
        //     }
        // } catch (error) {
        //     console.error('Error encoding:', error);
        // }
    };

    const handleDecode = async () => {
                const result = await decodeMutation.mutateAsync({ message: decodedMessage, password });
                console.log('Decoded Result:', result);
                setDecodedMessage(result);
        // try {
        //     if (password) {
        //     } else {
        //         console.error('Password is required for decoding.');
        //     }
        // } catch (error) {
        //     console.error('Error decoding:', error.message);
        // }
    };

    // const handleDecode = async () => {
    //     try {
    //         if (password) {
    //             const result = await decodeMutation.mutateAsync({ message: decodedMessage, password });
    //             setDecodedMessage(result);
    //         } else {
    //             console.error('Password is required for decoding.');
    //         }
    //     } catch (error) {
    //         console.error('Error decoding:', error);
    //     }
    // };

    // const handleEncode = () => {
    //     if (password) {
    //         encodeMutation.mutate({ message: encodedMessage, password });
    //     } else {
    //         console.error('Password is required for encoding.');
    //     }
    // };
    //
    // const handleDecode = () => {
    //     if (password) {
    //         decodeMutation.mutate({ message: decodedMessage, password });
    //     } else {
    //         console.error('Password is required for decoding.');
    //     }
    // };
    // const [encodedMessage, setEncodedMessage] = useState('');
    // const [decodedMessage, setDecodedMessage] = useState('');
    // const [password, setPassword] = useState('');
    //
    // const encodeMutation = useMutation({
    //     mutationFn: async (encode: Encryption) => {
    //         const { message, password } = encode;
    //         await axiosApi.post('/encode', { message, password });
    //     }
    // });
    //
    // const { isLoading: isEncoding, isError: encodeError } = encodeMutation;
    //
    //
    // const decodeMutation = useMutation({
    //     mutationFn: async (decode: Encryption) => {
    //         const { message, password } = decode;
    //         await axiosApi.post('/decode', { message, password });
    //     }
    // });
    //
    // const { isLoading: isDecoding, isError: decodeError } = decodeMutation;
    //
    // const handleEncode = async () => {
    //     try {
    //         const result = await encodeMutation.mutateAsync({ message: encodedMessage, password });
    //         console.log('Encoded Nutation', result);
    //     } catch (error) {
    //         console.error('Error encoding:', error);
    //     }
    // };
    //
    // const handleDecode = async () => {
    //     try {
    //         const result = await decodeMutation.mutateAsync({ message: decodedMessage, password });
    //         console.log('Decoded Nutation', result);
    //     } catch (error) {
    //         console.error('Error decoding:', error);
    //     }
    // };



    // const handleEncode = async () => {
    //     const result = await encodeMutation.mutateAsync({ message: encodedMessage, password });
    //     console.log('Encoded Nutation', result);
    // };
    //
    // const handleDecode = async () => {
    //     const result = await decodeMutation.mutateAsync({ message: decodedMessage, password });
    //     console.log('Decoded Nutation', result);
    // };

    // const handleEncode = () => {
    //     encodeMutation.mutate({ message: encodedMessage, password });
    //     console.log(`Click to ${encodeMutation}`);
    // };
    //
    //
    // const handleDecode = () => {
    //     decodeMutation.mutate({ message: decodedMessage, password });
    // console.log(`Click to ${decodeMutation}`);
    // };


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