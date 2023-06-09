import { FunctionComponent, ReactNode } from "react";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

import styles from "./Layout.module.css";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components";
import { MovingObject } from "../components/MovingObject/MovingObject";

interface LayoutProps {
  children: ReactNode;
}
const isBrouser = typeof window !== undefined;
const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      {!isBrouser && /Mobi|Android/i.test(navigator.userAgent) ? null : (
        <MovingObject />
      )}
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
