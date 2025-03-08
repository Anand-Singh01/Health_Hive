export interface ILoginPatient {
    email: string;
    password: string;
}

export interface IRegisterPatient {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
}