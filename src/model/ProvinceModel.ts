export default interface ProvinceModel {
    ProvinceID: number,
    DesignationLao: string,
    DesignationEng: string
}


export const DefaultValue: ProvinceModel = {
    DesignationEng: "",
    DesignationLao: "",
    ProvinceID: 0
}
