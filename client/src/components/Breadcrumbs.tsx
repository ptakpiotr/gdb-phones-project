import { useMemo } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import OptionalBreadCrumbButton from "./OptionalBreadCrumbButton";

function Breadcrumbs() {
  const location = useLocation();
  const locPath = [...new Set(location.pathname.split("/"))];

  const breadcrumbsPath = useMemo(() => {
    const paths: { path: string; page: string }[] = [];
    for (let i = 0; i < locPath.length; i++) {
      let path = "/";

      if (i - 1 >= 0) {
        path = locPath.slice(0, i + 1).join("/");
      }

      paths.push({
        path,
        page: locPath[i],
      });
    }

    return paths;
  }, [locPath]);

  return (
    <Box display="flex" flexDirection="row" padding="0.25rem" margin="0.25rem">
      <Breadcrumb flex="1">
        {breadcrumbsPath.map((p) => (
          <BreadcrumbItem key={p.path}>
            <BreadcrumbLink as={Link} to={p.path}>
              {p.page ? p.page : <FiHome />}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Box>
        <OptionalBreadCrumbButton />
      </Box>
    </Box>
  );
}

export default Breadcrumbs;
