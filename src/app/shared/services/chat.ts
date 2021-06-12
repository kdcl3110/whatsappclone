export interface Chat {
    cid?: string,
    nom: string,
    users: string[],
    photo: string,
    message: Sms[],
    type: string,
    dataModif: any
}

export interface Sms {
    message: any,
    sendUser: string,
    dateEnv: any,
    status: boolean,
    asset: any
}