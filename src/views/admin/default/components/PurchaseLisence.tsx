import { Box, Button, Card } from "@chakra-ui/react";
import AdminLayout from "layouts/admin";
import { useRouter } from "next/router";
import React from "react";

export default function PurchaseLisence() {
  const router = useRouter();
  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Card py="10" px="5">
          You do not have lisence for this survey
          <Box w="50%" mt="5">
            <Button
              onClick={() => {
                router.push("/admin/transactions");
              }}
              w="50"
              py="4"
              variant="homePrimary"
            >
              Purchase lisence
            </Button>
          </Box>
        </Card>
      </Box>
    </AdminLayout>
  );
}
