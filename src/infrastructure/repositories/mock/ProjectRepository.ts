import { mockProjects } from "@/src/data/mock";
import type {
    CreateProjectData,
    Project,
    UpdateProjectData,
} from "@/src/domain/types";

/**
 * Mock Project Repository
 * Simulates database operations with in-memory mock data
 */
export class MockProjectRepository {
  private projects: Project[] = [...mockProjects];

  async findAll(userId: string): Promise<Project[]> {
    return this.projects.filter((p) => p.userId === userId);
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.find((p) => p.id === id) || null;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.projects.find((p) => p.slug === slug) || null;
  }

  async create(userId: string, data: CreateProjectData): Promise<Project> {
    const now = new Date().toISOString();
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      userId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      websiteUrl: data.websiteUrl,
      donateEnabled: data.donateEnabled ?? false,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
    this.projects.push(newProject);
    return newProject;
  }

  async update(id: string, data: UpdateProjectData): Promise<Project | null> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.projects[index] = {
      ...this.projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.projects[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    return true;
  }

  async getStats(projectId: string) {
    // In a real implementation, this would aggregate from payments
    return {
      totalRevenue: 1399,
      totalPayments: 5,
      paidPayments: 3,
      pendingPayments: 1,
      totalInvoices: 2,
      paidInvoices: 1,
    };
  }
}

// Singleton instance
export const projectRepository = new MockProjectRepository();
