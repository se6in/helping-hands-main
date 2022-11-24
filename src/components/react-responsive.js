import React from "react"
import { useMediaQuery } from "react-responsive"

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(min-width:280px)",
    query: "(max-width:1050px)"
  });
  return <>{isMobile && children}</>
}

export const Pc = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:554px)",
    query: "(max-width:1050px)"
  });
  return <>{isPc && children}</>
}

export default Mobile;
