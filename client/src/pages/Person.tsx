import { useSearchParams, useNavigate } from "react-router-dom";
import { trpc } from "../App";
import { effect, signal } from "@preact/signals-react";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import ReviewInfo from "../components/ReviewInfo";
import {
  Owned,
  PhoneBasic,
  ValidationError,
  buySchema,
} from "../../../common/validation";
import { FiSave } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import PurchaseTable from "../components/PurchaseTable";

const showDialog = signal<boolean>(false);
const owned = signal<Partial<Owned>>({});

function Person() {
  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate } = trpc.addPhoneBuy.useMutation();

  const name = params.get("name");
  const surname = params.get("surname");

  effect(() => {
    if (!name || !surname) {
      navigate("/");
    }
  });

  const { data, isLoading } = trpc.getAllReviews.useQuery({
    name: name!,
    surname: surname!,
  });

  const onClick = (ph: PhoneBasic) => {
    owned.value = {
      ...owned.value,
      person: {
        name: name ?? "",
        surname: surname ?? "",
      },
    };

    owned.value = {
      ...owned.value,
      phone: ph,
    };

    showDialog.value = true;
  };

  const onSave = async () => {
    let res = false;

    try {
      const buyValidate = await buySchema.validate(owned.value);
      await mutate(buyValidate);

      await queryClient.refetchQueries();

      //bypass
      window.location.reload();

      showDialog.value = false;
      res = true;
    } catch (err: unknown) {
      const validationErr = err as ValidationError;

      toast({
        status: "error",
        variant: "solid",
        title: "Buy item",
        description: validationErr.message,
        isClosable: true,
        duration: 2000,
      });
    }

    if (res) {
      toast({
        status: "success",
        variant: "solid",
        title: "Buy item",
        description: "Succesfully bought new phone",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <Drawer
        isOpen={showDialog.value}
        placement="right"
        onClose={() => {
          showDialog.value = false;
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Text>Buy item</Text>
          <Input
            placeholder="Price *"
            type="number"
            min="0"
            onChange={(e) => {
              owned.value = {
                ...owned.value,
                owned: {
                  price: parseFloat(e.target.value),
                },
              };
            }}
          />
          <Button rightIcon={<FiSave />} onClick={onSave} colorScheme="green">
            Save
          </Button>
        </DrawerContent>
      </Drawer>
      <Box display="flex" flexDirection="column">
        <Text>Person' reviews</Text>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" flexWrap="wrap" flex={1}>
            {isLoading ? (
              <Spinner />
            ) : data ? (
              <ReviewInfo
                reviews={data.r!}
                phones={data.s!}
                onClick={onClick}
              />
            ) : (
              <>An error has occured</>
            )}
          </Box>
          {name && surname ? (
            <>
              <Text>Person' purchases</Text>
              <Box display="flex" flexDirection="row" flexWrap="wrap" flex={1}>
                <PurchaseTable name={name} surname={surname} />
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Person;
