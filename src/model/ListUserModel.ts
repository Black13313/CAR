export default interface listUser {
    UserID? : number ,
    UserName : string,
    UserPassword : string,
    UserFirstName : string,
    UserLastName : string,
    userType? : number,
    companyId? : number,
    userTypeName?: string,
    mail : string,
    sex : string,
    phone : string,
    user_otp? : string,
    Delected? : string,
    MachineCode? : string,
    userstatus? : number,
    lang? : string,
    roleID? : number,
    roleName? : string,
    createdById? : number,
    dateofbirth? : Date,
    createdDateTime? : Date
    UpdatedDateTime? : Date
    connectionid? : number
    lat? : number
    lng? : number
    branchs? : []
}

export const listUserValue:listUser = {

    UserName : '',
    UserPassword : '',
    UserFirstName : '',
    UserLastName : '',
    roleName : '',
    mail : '',
    phone : '',
    sex : '',
    branchs : undefined
}