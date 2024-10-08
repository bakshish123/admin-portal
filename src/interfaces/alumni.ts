export interface IAlumni {
    firstName: string;
    lastName: string;
    email: string;
    graduationYear: number;
    degree: string;
    major: string;
    rollNumber: string;
    currentCompany?: string; // Optional field
    jobTitle?: string; // Optional field
    location?: string; // Optional field
    linkedInProfile?: string; // Optional field for LinkedIn profile URL
    bio?: string; // Optional field for short bio
    createdAt?: Date;
    updatedAt?: Date;
  }