import type {
    CreateProjectData,
    Project,
    ProjectStats,
    UpdateProjectData,
} from "@/src/domain/types";
import { projectRepository } from "@/src/infrastructure/repositories/mock";

export interface ProjectsViewModel {
  projects: Project[];
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
}

export interface ProjectDetailViewModel {
  project: Project;
  stats: ProjectStats;
}

/**
 * Projects Presenter
 */
export class ProjectsPresenter {
  async getViewModel(userId: string): Promise<ProjectsViewModel> {
    const projects = await projectRepository.findAll(userId);

    const stats = {
      total: projects.length,
      active: projects.filter((p) => p.isActive).length,
      inactive: projects.filter((p) => !p.isActive).length,
    };

    return { projects, stats };
  }

  async getProjectDetail(slug: string): Promise<ProjectDetailViewModel | null> {
    const project = await projectRepository.findBySlug(slug);
    if (!project) return null;

    const stats = await projectRepository.getStats(project.id);
    return { project, stats };
  }

  async createProject(
    userId: string,
    data: CreateProjectData
  ): Promise<Project> {
    return projectRepository.create(userId, data);
  }

  async updateProject(
    projectId: string,
    data: UpdateProjectData
  ): Promise<Project | null> {
    return projectRepository.update(projectId, data);
  }

  async deleteProject(projectId: string): Promise<boolean> {
    return projectRepository.delete(projectId);
  }

  generateMetadata() {
    return {
      title: "โปรเจค | PlugPay",
      description: "จัดการโปรเจคและเว็บไซต์ของคุณ",
    };
  }
}

export class ProjectsPresenterFactory {
  static createServer(): ProjectsPresenter {
    return new ProjectsPresenter();
  }

  static createClient(): ProjectsPresenter {
    return new ProjectsPresenter();
  }
}
