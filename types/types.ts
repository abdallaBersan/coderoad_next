export type User = {
  id: string;
  username: string;
  Roadmap: Roadmap[];
};

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  status: string;
  github: string | null;
  type: string;
  group: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoadmapInputs = {
  title: string;
  description: string;
  status: string;
  github: string;
  type: string;
  group: string;
  createdAt: string;
};
