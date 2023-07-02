import {atom, RecoilState} from "recoil";

export interface IProjectList {
    title: string
}

export interface IProjectValue {
    projectName: string,
    projectExplain:string,
    noteList: string[],
    todoList: string[],
    issueList: string[],
}

const initialProjectList :IProjectList = {
    title: "프로젝트 1",
};

const initialProjectValue :IProjectValue = {
    projectName: "프로젝트 0",
    projectExplain: "initialProject",
    noteList: ["노트1", "노트2", "노트3"],
    todoList: ["할일1", "할일2", "할일3"],
    issueList: ["이슈1", "이슈2", "이슈3"],
};

export const projectListState: RecoilState<IProjectList[]> = atom({
    key: "ProjectListState",
    default: [initialProjectList], // 초기값을 배열로 변경
});


export const projectValueState:RecoilState<IProjectValue> = atom({
    key: "ProjectValueState",
    default: initialProjectValue,
});
