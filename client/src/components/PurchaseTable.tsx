import {
  Button,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { trpc } from "../App";
import ErrorData from "./ErrorData";
import { FiTrash } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  name: string;
  surname: string;
}

function PurchaseTable({ name, surname }: IProps) {
  const { data, error, isLoading } = trpc.getBoughtPhones.useQuery({
    name,
    surname,
  });

  const { mutate } = trpc.deleteBoughtPhone.useMutation();

  const queryClient = useQueryClient();
  const toast = useToast();

  const onClick = async (id: string) => {
    try {
      await mutate({
        name,
        surname,
        id,
      });

      toast({
        status: "success",
        variant: "solid",
        title: "Purchase deletion completed",
        description: "Succesfully removed bought item",
        isClosable: true,
        duration: 2000,
      });

      await queryClient.refetchQueries();

      //bypass
      window.location.reload();
    } catch (err) {
      toast({
        status: "error",
        variant: "solid",
        title: "Purchase deletion failure",
        description: JSON.stringify(err),
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="twitter">
        <TableCaption>Purchased phones</TableCaption>
        <Thead>
          <Tr>
            <Th>Phone</Th>
            <Th>Price</Th>
            <Th>Manage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <ErrorData />
          ) : data ? (
            data.map((dt) => {
              return (
                <tr>
                  <Td>
                    {dt.make} {dt.model}
                  </Td>
                  <Td>{dt.price}</Td>
                  <Td>
                    <Button
                      rightIcon={<FiTrash />}
                      colorScheme="red"
                      onClick={async () => {
                        await onClick(dt.id ?? "");
                      }}
                    ></Button>
                  </Td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PurchaseTable;
