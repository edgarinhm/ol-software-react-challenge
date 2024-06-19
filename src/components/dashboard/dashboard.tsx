import { useSharedStorage } from "common/state-management/shared-storage";
import styles from "./dashboard.module.scss";
import ActivityCard from "./activity-card";
import Weather from "./weather";
import Reports from "./reports";
import { useEffect, useState } from "react";
import { GetNotifications } from "common/services/notification-service";
import { useDashboardStorage } from "common/state-management/dashboard-storage";
import { shallow } from "zustand/shallow";
import { GetDashboardCards, GetDashboardServerReport } from "common/services/dashboard-service";
import { Spinner } from "common/components/spinner/spinner";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const name = useSharedStorage((state) => state.user?.name);
  const { setDashboardState, notifications, cards } = useDashboardStorage(
    (state) => ({
      notifications: state.notifications,
      cards: state.cards,
      setDashboardState: state.setState,
    }),
    shallow
  );
  const alertCount = notifications?.length;

  const projectsCardData = {
    title: "Proyectos Registrados",
    message: "Ultimo proyecto registrado hace 15 días",
    count: cards?.projects,
  };

  const projectsInDevCardData = {
    title: "Proyectos en Desarrollo",
    message: "Total de avance 22.00%",
    count: cards?.projectsDev,
  };

  const pendingNotificationsCardData = {
    title: "NC's sin resolver",
    message: "Última NC regisgtrada hace 1 día",
    count: 24,
  };

  const errorsDeployCardData = {
    title: "Cantidad de Errores",
    message: "Último error hace 2 horas",
    count: cards?.errorsDeploy,
  };

  useEffect(() => {
    const loadNotificationsData = async () => {
      setIsLoading(true);
      try {
        const notificacions = await GetNotifications();
        setDashboardState((state) => {
          state.notifications = notificacions;
        });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const loadDashboardCardsData = async () => {
      setIsLoading(true);
      try {
        const cards = await GetDashboardCards();
        setDashboardState((state) => {
          state.cards = cards;
        });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const loadServerReportData = async () => {
      setIsLoading(true);
      try {
        const serverReport = await GetDashboardServerReport();
        setDashboardState((state) => {
          state.serverReport = serverReport;
        });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    loadNotificationsData();
    loadDashboardCardsData();
    loadServerReportData();
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.title}>
          <h3>{`Bienvenido ${name}`}</h3>
          <h6>
            {"Verifica tus alertas, posees "}
            <span className={styles.alertNotification}>{`${alertCount} sin leer!`}</span>
          </h6>
        </div>
        {/* GRID & CHARTS */}
        <div className={styles.body}>
          {/* ROW 1 */}
          <div className={`${styles.row} ${styles.weatherRow}`}>
            <Weather />
          </div>
          <div className={`${styles.row} ${styles.activityPanelRow}`}>
            <div className={styles.activityPanelColumn}>
              <div className={styles.card}>
                <ActivityCard
                  title={projectsCardData.title}
                  bodyText={projectsCardData.message}
                  count={projectsCardData.count}
                  styleColor={styles.cardTale}
                />
              </div>
              <div className={styles.card}>
                <ActivityCard
                  title={pendingNotificationsCardData.title}
                  bodyText={pendingNotificationsCardData.message}
                  count={pendingNotificationsCardData.count}
                  styleColor={styles.cardLightBlue}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.row} ${styles.activityPanelRow}`}>
            <div className={styles.activityPanelColumn}>
              <div className={styles.card}>
                <ActivityCard
                  title={projectsInDevCardData.title}
                  bodyText={projectsInDevCardData.message}
                  count={projectsInDevCardData.count}
                  styleColor={styles.cardDarkBlue}
                />
              </div>
              <div className={styles.card}>
                <ActivityCard
                  title={errorsDeployCardData.title}
                  bodyText={errorsDeployCardData.message}
                  count={errorsDeployCardData.count}
                  styleColor={styles.cardLightDanger}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reports}>
          <Reports />
        </div>
      </div>
      <Spinner show={isLoading} text={"Loading Dashboard..."} />
    </>
  );
};

export default Dashboard;
