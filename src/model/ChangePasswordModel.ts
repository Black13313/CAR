export default interface ChangePasswordModel {
    PassKey? : string,
    DigitalSignature? : string
    UserId? : number
    User_OTP? : string
    OldPass : string
    NewPass : string
}

export const ChangePasswordValue: ChangePasswordModel = {
    OldPass : '',
    NewPass : ''
}