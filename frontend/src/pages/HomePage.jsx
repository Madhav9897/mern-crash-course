import {
  Container,
  SimpleGrid,
  Text,
  textDecoration,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [fetchProducts]);
  console.log(products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgClip={"text"}
          fontSize={{ base: "22", sm: "28" }}
        >
          Current Products 🛒
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.map((product) => (
            <ProductCard key={products._id} product={product}></ProductCard>
          ))}
        </SimpleGrid>
        {products.length == 0 ? (
          <Text
            textAlign="center"
            color="gray.500"
            fontWeight={"bold"}
            fontSize="xl"
          >
            No Products found 🥲{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        ) : null}
      </VStack>
    </Container>
  );
};

export default HomePage;
