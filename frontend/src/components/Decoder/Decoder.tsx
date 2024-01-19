'use client';
import axiosApi from "@/axiosApi";
import {useMutation} from "@tanstack/react-query";
import React, {useState} from 'react';
import {Button, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import {DecodedFieldError, EncodedFieldError, Encryption} from "@/types";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Decoder = () => {
    const [encoded, setEncoded] = useState<string>('');
    const [decoded, setDecoded] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loadingEncode, isLoadingEncode] = useState(false);
    const [loadingDecode, isLoadingDecode] = useState(false);

    const [errorEncoded, setErrorEncoded] = useState<EncodedFieldError>({
        password: false,
        encoded: false,
    });

    const [errorDecoded, setErrorDecoded] = useState<DecodedFieldError>({
        password: false,
        decoded: false,
    });

    const encodeMutation = useMutation({
        mutationFn: async (encode: Encryption) => {
            isLoadingEncode(true);
            try {
                const response = await axiosApi.post('/encode', encode);
                return response.data.encoded;
            } finally {
                isLoadingEncode(false);
            }
        }
    });

    const decodeMutation = useMutation({
        mutationFn: async (decode: Encryption) => {
            isLoadingDecode(true);
            try {
                const response = await axiosApi.post('/decode', decode);
                return response.data.decoded;
            } finally {
                isLoadingDecode(false);
            }
        }
    });

    const handleEncode = async () => {
        setErrorEncoded({password: !password, encoded: !encoded});
        const result = await encodeMutation.mutateAsync({message: encoded, password});
        setEncoded(result);
    };

    const handleDecode = async () => {
        setErrorDecoded({password: !password, decoded: !decoded});
        const result = await decodeMutation.mutateAsync({message: decoded, password});
        setDecoded(result);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item
                  container
                  gap={2}
                  justifyContent="start"
                  alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Encoded Messsage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={encoded}
                        error={errorEncoded.encoded}
                        sx={{borderColor: !errorEncoded.encoded ? 'green' : 'initial'}}
                        onChange={(e) => setEncoded(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid item
                  container
                  gap={10}
                  justifyContent="start"
                  alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Password
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        id="encodedField"
                        value={password}
                        error={errorEncoded.password || errorDecoded.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={handleEncode}
                        disabled={loadingEncode}
                    >
                        {loadingEncode && <CircularProgress size={16}/>}
                        {<ArrowCircleUpIcon/>}
                    </Button>
                    <Button
                        sx={{marginLeft: 2}}
                        variant="contained"
                        onClick={handleDecode}
                        disabled={loadingDecode}
                    >
                        {loadingDecode && <CircularProgress size={16}/>}
                        {<ArrowCircleDownIcon/>}
                    </Button>
                </Grid>
            </Grid>
            <Grid item
                  gap={2}
                  container
                  justifyContent="start"
                  alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1">
                        Decoded Messsage
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={decoded}
                        error={errorDecoded.decoded}
                        onChange={(e) => setDecoded(e.target.value)}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Decoder;