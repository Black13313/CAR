export default interface DistrictModel {
    DistrictID: number,
    DesignationLao: string,
    DesignationEng: string,
    ProvinceID: number,
    ProvinceName: string
}


export const DefaultValue: DistrictModel = {
    DesignationEng: "",
    DesignationLao: "",
    DistrictID: 0,
    ProvinceID: 0,
    ProvinceName: ""
}
