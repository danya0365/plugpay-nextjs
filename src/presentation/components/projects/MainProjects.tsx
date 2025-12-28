"use client";

import { Button } from "@/src/presentation/components/main/Button";
import { Input } from "@/src/presentation/components/main/Input";
import { Modal } from "@/src/presentation/components/main/Modal";
import type {
    ProjectsPresenterActions,
    ProjectsPresenterState,
} from "@/src/presentation/presenters/projects/useProjectsPresenter";
import { animated, config, useSpring } from "@react-spring/web";
import { useState } from "react";

interface MainProjectsProps {
  state: ProjectsPresenterState;
  actions: ProjectsPresenterActions;
}

/**
 * Modern Projects list component
 */
export function MainProjects({ state, actions }: MainProjectsProps) {
  const { viewModel, loading, isCreateModalOpen, isDeleteModalOpen, selectedProject } =
    state;

  // Form state for create modal
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    websiteUrl: "",
    donateEnabled: true,
  });

  const headerSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await actions.createProject(formData);
    setFormData({
      name: "",
      slug: "",
      description: "",
      websiteUrl: "",
      donateEnabled: true,
    });
  };

  const handleDelete = async () => {
    if (selectedProject) {
      await actions.deleteProject(selectedProject.id);
    }
  };

  if (loading && !viewModel) {
    return (
      <div className="projects-loading">
        <div className="animate-pulse text-6xl mb-4">📁</div>
        <p className="text-gray-500">กำลังโหลดโปรเจค...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="projects-container">
      {/* Header */}
      <animated.div style={headerSpring} className="projects-header">
        <div>
          <h1 className="projects-title">โปรเจค</h1>
          <p className="projects-subtitle">จัดการโปรเจคและเว็บไซต์ของคุณ</p>
        </div>
        <Button
          variant="primary"
          leftIcon={<span>➕</span>}
          onClick={actions.openCreateModal}
        >
          สร้างโปรเจคใหม่
        </Button>
      </animated.div>

      {/* Stats */}
      <div className="projects-stats">
        <div className="projects-stat">
          <span className="projects-stat-value">{viewModel.stats.total}</span>
          <span className="projects-stat-label">ทั้งหมด</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-value">{viewModel.stats.active}</span>
          <span className="projects-stat-label">Active</span>
        </div>
        <div className="projects-stat">
          <span className="projects-stat-value">{viewModel.stats.inactive}</span>
          <span className="projects-stat-label">Inactive</span>
        </div>
      </div>

      {/* Projects Grid */}
      {viewModel.projects.length === 0 ? (
        <div className="projects-empty">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-gray-500 mb-4">ยังไม่มีโปรเจค</p>
          <Button variant="primary" onClick={actions.openCreateModal}>
            สร้างโปรเจคแรก
          </Button>
        </div>
      ) : (
        <div className="projects-grid">
          {viewModel.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => actions.openEditModal(project)}
              onDelete={() => actions.openDeleteModal(project)}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="สร้างโปรเจคใหม่"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={actions.closeCreateModal}>
              ยกเลิก
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateSubmit}
              loading={loading}
            >
              สร้างโปรเจค
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            label="ชื่อโปรเจค"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
                slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
              })
            }
            required
          />
          <Input
            label="Slug (URL)"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            required
          />
          <Input
            label="คำอธิบาย"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="Website URL"
            type="url"
            value={formData.websiteUrl}
            onChange={(e) =>
              setFormData({ ...formData, websiteUrl: e.target.value })
            }
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={actions.closeDeleteModal}
        title="ยืนยันการลบ"
        size="sm"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={actions.closeDeleteModal}>
              ยกเลิก
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={loading}>
              ลบโปรเจค
            </Button>
          </div>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          คุณแน่ใจหรือไม่ที่จะลบโปรเจค{" "}
          <strong className="text-gray-900 dark:text-white">
            {selectedProject?.name}
          </strong>
          ? การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
      </Modal>
    </div>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    websiteUrl?: string;
    donateEnabled: boolean;
    isActive: boolean;
  };
  onEdit: () => void;
  onDelete: () => void;
}

function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardSpring = useSpring({
    transform: isHovered ? "scale(1.02)" : "scale(1)",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0, 0, 0, 0.08)"
      : "0 4px 6px rgba(0, 0, 0, 0.02)",
    config: config.wobbly,
  });

  return (
    <animated.div
      style={cardSpring}
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-card-header">
        <div className="project-card-icon">📁</div>
        <h3 className="project-card-name">{project.name}</h3>
        <span
          className={`project-card-status ${
            project.isActive ? "project-card-active" : "project-card-inactive"
          }`}
        >
          {project.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="project-card-slug">/{project.slug}</p>

      {project.description && (
        <p className="project-card-desc">{project.description}</p>
      )}

      <div className="project-card-badges">
        {project.donateEnabled && (
          <span className="project-card-badge project-card-badge-donate">
            💰 Donate
          </span>
        )}
        {project.websiteUrl && (
          <span className="project-card-badge">🌐 Website</span>
        )}
      </div>

      <div className="project-card-actions">
        <a href={`/projects/${project.slug}`} className="project-card-link">
          ดูรายละเอียด →
        </a>
        <div className="project-card-buttons">
          <button onClick={onEdit} className="project-card-btn">
            ✏️
          </button>
          <button onClick={onDelete} className="project-card-btn project-card-btn-delete">
            🗑️
          </button>
        </div>
      </div>
    </animated.div>
  );
}
