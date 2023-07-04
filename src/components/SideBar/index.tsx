import {Circle, HorizontalLine, Wrapper} from "@components/SideBar/styles.tsx";
import {useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {AddProjectClickState, projectValueState} from "@states/ProjectState.ts";
import {Tooltip} from "antd";

const SideBar = () => {
    const projectList = useRecoilValue(projectValueState);
    const [isAddProject, setIsAddProject] = useRecoilState(AddProjectClickState);

    return (
      <Wrapper>
          <Circle>
              <text>메인으로</text>
          </Circle>
        <HorizontalLine/>
          {projectList.map((project) => (
              <Tooltip placement={"right"} title={project.projectTitle}>
                  <Circle>
                      <text>{project.projectTitle}</text>
                  </Circle>
              </Tooltip>
          ))}
          <Circle onClick={() => setIsAddProject(true)}>
              <text style={{fontSize:"2rem"}}>+</text>
          </Circle>
      </Wrapper>
  );
};

export default SideBar;
