import useModalDom from "../helpers/hooks/useModalDOM";
import useScrollToTop from "../helpers/hooks/useScrollToTop";
import useScrollAnchor from "../helpers/hooks/useScrollAnchor";

export default function Documents({ children }) {
  useModalDom();
  useScrollAnchor();
  useScrollToTop();
  return children;
}
