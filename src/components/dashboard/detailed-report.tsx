import ProgressBarWithLabel from "common/components/progress-bar/progress-bar-with-label";
import styles from "./detailed-report.module.scss";
import { useDashboardStorage } from "common/state-management/dashboard-storage";
import { useMemo } from "react";
import { formatter } from "common/formatters/formatters";
import dayjs from "dayjs";
import ReleaseChart from "./release-chart";

const DetailedReport = () => {
  const releaseResume = useDashboardStorage((state) => state.releaseResume);

  const cicle = useMemo(() => {
    if (releaseResume?.cicle) {
      const date = formatter.dateReverseFormat(releaseResume.cicle.replace(/\//g, ""));
      return dayjs(date).format("MMM-d YYYY");
    } else {
      return "";
    }
  }, [releaseResume?.cicle]);

  const GetProgressBarColorStatus = (
    isNC: boolean,
    isDelay: boolean,
    isDeliver: boolean
  ): string => {
    const colorStatus =
      isDeliver && !isDelay && !isNC
        ? "isDeliver"
        : isDelay
          ? "isDelay"
          : isNC
            ? "isNC"
            : "defaultStaus";
    return colorStatus;
  };

  return (
    <div className={styles.detailedReport}>
      <div className={styles.header}>
        <p className={styles.title}>{"Entregas"}</p>
        <h1 className={styles.value}>
          {releaseResume?.porcentaje}
          {"%"}
        </h1>
        <h3 className={styles.subTitle}>
          {"Proximo Ciclo: "}
          {cicle}
        </h3>
        <p className={styles.description}>
          {
            "El ciclo de entrega se calcula usando las fechas estimadas de los Sprints en cada proyecto."
          }
        </p>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={`${styles.projectsStatus} ${styles.borderRight}`}>
            <div className={styles.projectResposiveProgress}>
              {releaseResume?.topProjects.map((project, index) => {
                return (
                  <div
                    key={`${project.name}-${index}`}
                    className={`${
                      styles[
                        GetProgressBarColorStatus(project.isNc, project.isDelay, project.isDeliver)
                      ]
                    }`}
                  >
                    <ProgressBarWithLabel
                      currentValue={Number(project.porcentaje)}
                      label={project.name}
                      maxValue={100}
                      unit={"%"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.releaseChart}>
            {releaseResume?.ncState && (
              <ReleaseChart
                data={[
                  { name: "detectadas", value: releaseResume.ncState.detected, fill: "#FF4747" },
                  { name: "en proceso", value: releaseResume.ncState.process, fill: "#FFC100" },
                  { name: "resueltas", value: releaseResume.ncState.solved, fill: "#248AFD" },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;
