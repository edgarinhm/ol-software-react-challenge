import styles from "./avatar.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { LegacyRef } from "react";

interface AvatarProps {
  url: string;
  ref: LegacyRef<HTMLDivElement> | undefined;
}

const Avatar = ({ url, ref }: AvatarProps) => {
  return (
    <div className={styles.avatar} ref={ref}>
      {url ? <img src={url} alt={"User Avatar"} /> : <FontAwesomeIcon icon={faCircleUser} />}
    </div>
  );
};

export default Avatar;
