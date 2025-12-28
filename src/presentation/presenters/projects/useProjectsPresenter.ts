"use client";

import type { CreateProjectData, Project, UpdateProjectData } from "@/src/domain/types";
import { useCallback, useEffect, useState } from "react";
import {
    ProjectsPresenterFactory,
    ProjectsViewModel,
} from "./ProjectsPresenter";

const presenter = ProjectsPresenterFactory.createClient();

export interface ProjectsPresenterState {
  viewModel: ProjectsViewModel | null;
  loading: boolean;
  error: string | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedProject: Project | null;
}

export interface ProjectsPresenterActions {
  loadData: () => Promise<void>;
  createProject: (data: CreateProjectData) => Promise<void>;
  updateProject: (data: UpdateProjectData & { id: string }) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (project: Project) => void;
  closeEditModal: () => void;
  openDeleteModal: (project: Project) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
}

export function useProjectsPresenter(
  userId: string,
  initialViewModel?: ProjectsViewModel
): [ProjectsPresenterState, ProjectsPresenterActions] {
  const [viewModel, setViewModel] = useState<ProjectsViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newViewModel = await presenter.getViewModel(userId);
      setViewModel(newViewModel);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createProject = useCallback(
    async (data: CreateProjectData) => {
      setLoading(true);
      try {
        await presenter.createProject(userId, data);
        setIsCreateModalOpen(false);
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [userId, loadData]
  );

  const updateProject = useCallback(
    async (data: UpdateProjectData & { id: string }) => {
      setLoading(true);
      try {
        await presenter.updateProject(data.id, data);
        setIsEditModalOpen(false);
        setSelectedProject(null);
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await presenter.deleteProject(id);
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
        await loadData();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [loadData]
  );

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [userId, initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading,
      error,
      isCreateModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      selectedProject,
    },
    {
      loadData,
      createProject,
      updateProject,
      deleteProject,
      openCreateModal: () => setIsCreateModalOpen(true),
      closeCreateModal: () => setIsCreateModalOpen(false),
      openEditModal: (project) => {
        setSelectedProject(project);
        setIsEditModalOpen(true);
      },
      closeEditModal: () => {
        setIsEditModalOpen(false);
        setSelectedProject(null);
      },
      openDeleteModal: (project) => {
        setSelectedProject(project);
        setIsDeleteModalOpen(true);
      },
      closeDeleteModal: () => {
        setIsDeleteModalOpen(false);
        setSelectedProject(null);
      },
      setError,
    },
  ];
}
