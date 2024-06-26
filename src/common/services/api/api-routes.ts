export const Login = {
  get: (): string => "/login",
};

export const Users = {
  get: (): string => `/users`,
};

export const WeatherFind = {
  get: (): string => `https://openweathermap.org/data/2.5/find?`,
};

export const Notification = {
  get: (): string => `/notification`,
};

export const DashboardCards = {
  get: (): string => "/dashboard_cards",
};

export const Todos = {
  get: (): string => "/todos",
};

export const DashboardCpuReport = {
  get: (): string => "/cpu_report",
};

export const DashboardReportCommits = {
  get: (): string => "/report_commits",
};

export const DashboardReleaseResume = {
  get: (): string => "/release_resume",
};
