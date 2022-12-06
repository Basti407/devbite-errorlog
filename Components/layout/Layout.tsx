import { Fragment, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Fragment>
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
