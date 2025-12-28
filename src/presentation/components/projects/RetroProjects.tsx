"use client";

import { Button } from "@/src/presentation/components/retro/Button";
import { Input } from "@/src/presentation/components/retro/Input";
import { Modal } from "@/src/presentation/components/retro/Modal";
import type {
    ProjectsPresenterActions,
    ProjectsPresenterState,
} from "@/src/presentation/presenters/projects/useProjectsPresenter";
import { useState } from "react";

interface RetroProjectsProps {
  state: ProjectsPresenterState;
  actions: ProjectsPresenterActions;
}

/**
 * Windows 98 style Projects component
 */
export function RetroProjects({ state, actions }: RetroProjectsProps) {
  const {
    viewModel,
    loading,
    isCreateModalOpen,
    isDeleteModalOpen,
    selectedProject,
  } = state;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    websiteUrl: "",
    donateEnabled: true,
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
      <div className="retro-projects-loading">
        <p>⏳ Loading Projects...</p>
      </div>
    );
  }

  if (!viewModel) return null;

  return (
    <div className="retro-projects">
      {/* Title Banner */}
      <div className="retro-projects-banner">
        <span>📁</span>
        <h1>My Projects</h1>
        <span>📁</span>
      </div>

      {/* Actions */}
      <div className="retro-projects-actions">
        <Button onClick={actions.openCreateModal} icon="📁">
          New Project
        </Button>
        <Button onClick={actions.loadData} disabled={loading}>
          🔄 Refresh
        </Button>
      </div>

      {/* Stats GroupBox */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📊 Statistics</span>
        <div className="retro-projects-stats">
          <span>Total: {viewModel.stats.total}</span>
          <span>|</span>
          <span>✅ Active: {viewModel.stats.active}</span>
          <span>|</span>
          <span>❌ Inactive: {viewModel.stats.inactive}</span>
        </div>
      </div>

      {/* Projects Table */}
      <div className="retro-groupbox">
        <span className="retro-groupbox-title">📁 Project List</span>
        {viewModel.projects.length === 0 ? (
          <p className="retro-empty">No projects yet. Click "New Project" to create one.</p>
        ) : (
          <table className="retro-data-table">
            <thead>
              <tr>
                <th style={{ width: "30px" }}></th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Donate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {viewModel.projects.map((project) => (
                <tr key={project.id}>
                  <td>📁</td>
                  <td>
                    <a href={`/projects/${project.slug}`} className="retro-link">
                      {project.name}
                    </a>
                  </td>
                  <td>/{project.slug}</td>
                  <td>
                    {project.isActive ? (
                      <span className="retro-status retro-status-paid">✅ Active</span>
                    ) : (
                      <span className="retro-status retro-status-failed">❌ Inactive</span>
                    )}
                  </td>
                  <td>
                    {project.donateEnabled ? (
                      <span className="retro-status retro-status-paid">💰 Yes</span>
                    ) : (
                      <span className="retro-status">No</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="retro-btn retro-btn-sm"
                      onClick={() => actions.openEditModal(project)}
                    >
                      ✏️
                    </button>{" "}
                    <button
                      className="retro-btn retro-btn-sm"
                      onClick={() => actions.openDeleteModal(project)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={actions.closeCreateModal}
        title="New Project"
        icon="📁"
        footer={
          <div className="flex gap-2 justify-end">
            <Button onClick={actions.closeCreateModal}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateSubmit}>
              Create
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} className="retro-form">
          <Input
            label="Project Name:"
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
            label="Slug (URL):"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
            required
          />
          <Input
            label="Description:"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="Website URL:"
            type="url"
            value={formData.websiteUrl}
            onChange={(e) =>
              setFormData({ ...formData, websiteUrl: e.target.value })
            }
          />
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={actions.closeDeleteModal}
        title="Confirm Delete"
        icon="⚠️"
        footer={
          <div className="flex gap-2 justify-end">
            <Button onClick={actions.closeDeleteModal}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        }
      >
        <p>
          ⚠️ Are you sure you want to delete project "{selectedProject?.name}"?
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
