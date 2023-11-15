export interface IProjectValue {
  projectId: number;
  projectTitle: string;
  projectContent: string;
}

export interface ProjectInfo {
  title: string;
  content: string;
}

export interface EditProject {
  newTitle: string;
  newContent: string;
}

export interface ProjectData {
  projectTitle: string;
  projectContent: string;
  projectMembers?: Array<ProjectMember<string>>;
}

export interface ProjectMember<T = string> {
  projectMemberId: number;
  projectMemberName: string;
  projectMemberEmail: string;
  projectMemberRole: T;
  memberThumbnailImg: string;
}

export interface MemberRole {
  modifyProjectMemberId: number;
  projectRole: string;
}

export interface ModifyMember {
  modifyProjectMemberRole: MemberRole[];
}
