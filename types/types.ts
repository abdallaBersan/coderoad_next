export type User = {
  id: string;
  username: string;
  Roadmap: Roadmap[];
};

export type Roadmap = {
  id: string;
  title: string;
  status: string;
  type: string;
  group: string;
};
