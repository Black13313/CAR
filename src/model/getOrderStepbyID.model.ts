export default interface getOrderByID {
  Stepid?: number;
  StepName: string;
  States: string;
  Status?: number;
  isCurrent?: boolean;
}

export const getOrderByIDValue: getOrderByID = {
  Stepid: undefined,
  StepName: "",
  States: "",
  Status: undefined,
  isCurrent: false,
};
