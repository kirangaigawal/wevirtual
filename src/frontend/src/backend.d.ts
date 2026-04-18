import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    id: string;
    title: string;
    tags: Array<string>;
    year: bigint;
    description: string;
    imageUrl: string;
    category: string;
    awardsCount: bigint;
    fullDescription: string;
}
export interface backendInterface {
    getProject(id: string): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    getProjectsByCategory(category: string): Promise<Array<Project>>;
}
