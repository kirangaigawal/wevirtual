import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Project } from "../types";

function useBackendActor() {
  return useActor(createActor as Parameters<typeof useActor>[0]);
}

export function useProjects() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getProjects();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        year: Number(p.year),
        tags: p.tags,
        description: p.description,
        fullDescription: p.fullDescription,
        imageUrl: p.imageUrl,
        awardsCount: Number(p.awardsCount),
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProjectsByCategory(category: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project[]>({
    queryKey: ["projects", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getProjectsByCategory(category);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return result.map((p: any) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        year: Number(p.year),
        tags: p.tags,
        description: p.description,
        fullDescription: p.fullDescription,
        imageUrl: p.imageUrl,
        awardsCount: Number(p.awardsCount),
      }));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Project | null>({
    queryKey: ["projects", id],
    queryFn: async () => {
      if (!actor) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (actor as any).getProject(id);
      if (!result || result.length === 0) return null;
      const p = result[0];
      return {
        id: p.id,
        title: p.title,
        category: p.category,
        year: Number(p.year),
        tags: p.tags,
        description: p.description,
        fullDescription: p.fullDescription,
        imageUrl: p.imageUrl,
        awardsCount: Number(p.awardsCount),
      };
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
