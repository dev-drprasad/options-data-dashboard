import classNames from "classnames";

import styles from "./OptionStats.module.scss";

function PutCallRatio({ value }: { value: number }) {
  const classnames = classNames(styles.ratio, {
    [styles.ratio__active]: value >= 1,
  });

  const icon = value >= 1 ? "↑" : "↓";

  return (
    <span className={classnames}>
      {value} {icon}
    </span>
  );
}

export default PutCallRatio;
