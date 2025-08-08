
import {closest} from "fastest-levenshtein";

type ActivePathProps = {
  active: string;
  activeIndex: number;
};
export const getActivePath = (path: string, paths: string [],ignorePath?: string []): ActivePathProps => {
  

  const closestPath = closest(path, paths.concat(ignorePath || []));
  const index = paths.indexOf(closestPath);
  return {active: closestPath, activeIndex: index};
};
