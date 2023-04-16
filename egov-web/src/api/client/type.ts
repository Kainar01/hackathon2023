export interface PostVerification {
    iin: string
}

export interface PostConfirmation{
    verificationCode:string,
    verificationId: number,
}
