import {atom, RecoilState} from "recoil";

export interface IProjectValue {
    projectId : number,
    projectTitle : string,
    projectContent: string
}

const initialProjectValue :IProjectValue[] = [{
    "projectId" : 1,
    "projectTitle" : "Awesome project",
    "projectContent" : "으썸한 프로젝트 설명"
}, {
    "projectId" : 2,
    "projectTitle" : "kakaoBean Project",
    "projectContent" : "카카오빈 프로젝트에 대한 설명"
}]

export const projectValueState:RecoilState<IProjectValue[]> = atom({
    key: "ProjectValueState",
    default: initialProjectValue,
});

export const AddProjectClickState = atom({
    key: "AddProject",
    default: false,
})
