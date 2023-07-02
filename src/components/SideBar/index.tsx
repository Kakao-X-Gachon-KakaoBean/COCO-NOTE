import {Circle, HorizontalLine, Wrapper} from "@components/SideBar/styles.tsx";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {projectListState} from "../../states/ProjectState.ts";
import {IProjectList} from "@components/SideBar/type.ts";

const SideBar = () => {
    const [projectList , setProjectList] = useRecoilState(projectListState);


    const addCircle = () => {
        const newProject: IProjectList = { title: "새로운 프로젝트" };
        setProjectList((prevProjectList) => [...prevProjectList, newProject]);
    };


    return (
      <Wrapper>
          <Circle>
              <text>이미지</text>
          </Circle>
        <HorizontalLine/>
          {projectList.map((project) => (
              <Circle>
                  <text>{project.title}</text>
              </Circle>
          ))}
          <Circle onClick={addCircle}>
              <text style={{fontSize:"2rem"}}>+</text>
          </Circle>
      </Wrapper>
  );
};

export default SideBar;
