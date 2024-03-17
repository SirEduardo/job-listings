export interface User {
    id: number;
    logo: string;
    company: string ,
    new: boolean,
    featured: boolean,
    position: string ,
    role: string,
    level: string,
    postedAt: string,
    contract: string,
    location: string,
    languages: string [],
    tools: string[];
    [key:string]: string | string[] | boolean | number | undefined
}