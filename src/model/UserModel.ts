export default interface UserModel {
    UserName: string,
    Password: string,
    RememberMe: boolean,
}

export const UserModelValue: UserModel = {
    UserName: '',
    Password: '',
    RememberMe: false
}