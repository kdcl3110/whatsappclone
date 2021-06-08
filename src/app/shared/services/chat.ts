export interface Chat {
    cid?: string,
    nom: string,
    users: string[],
    photo: string,
    message: Sms[],
    type: string
}

export interface Sms {
    message: any,
    sendUser: string,
    dateEnv: any,
    status: boolean,
    asset: any
}