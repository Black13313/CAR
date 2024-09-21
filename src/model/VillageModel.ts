export default interface VillageModel {
    VillageId: number,
    DistrictId: number,
    ProvinceId: number,
    DistrictName: string,
    ProvinceName: string,
    VillCode: number,
    LaDesc: string,
    EnDesc: string
}


export const DefaultValue: VillageModel = {
    DistrictId: 0,
    DistrictName: "",
    EnDesc: "",
    LaDesc: "",
    ProvinceId: 0,
    ProvinceName: "",
    VillCode: 0,
    VillageId: 0

}
