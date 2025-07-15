export interface IForm {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IFormInput {
  name: string;
  email: string;
  message: string;
}
