export default interface BranchUserModel {
    userid: number,
    userName: string,
    branchid: number,
    branchName: string
}


export const DefaultValue: BranchUserModel = {
    branchName: "",
    branchid: 0,
    userName: "",
    userid: 0
}
