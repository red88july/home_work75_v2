export interface Encryption {
    password: string,
    message: string,
}

export interface EncodedFieldError {
    password: boolean,
    encoded: boolean,
}

export interface DecodedFieldError {
    password: boolean,
    decoded: boolean,
}