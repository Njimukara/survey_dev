import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { arrowStyles } from "../theme/components/ArrowStyles";
import Card from "./Card";

// This carousel is meant to be used by the home page only 
// We can make it dynamic in future if need be 
const MyCarousel = () => {
    const slides = [
      {
        id: "1",
        name: "Multibeam Echosounder",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      },
      {
        id: "2",
        name: "2D Acoustic Sonar",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      },
      {
        id: "3",
        name: "Echo sounder",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      },
      {
        id: "4",
        name: "Dynamic Lydar",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      },
    ];
  
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const slidesCount = slides.length;
  
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };
    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
  
    const carouselStyle = {
      transition: "all .5s",
      ml: `-${currentSlide * 100}%`,
    };
  
    return (
      <Flex
        w="full"
        _dark={{ bg: "#3e3e3e" }}
        bgSize="cover"
        mb="10px"
        mt="22px"
        alignItems="center"
        justifyContent="center"
        borderRadius="16px"
        fontFamily="Skia"
      >
        <Flex borderRadius="16px" w="full" overflow="hidden" pos="relative" bg="red">
          <Flex  w="900px" {...carouselStyle} >
            {slides.map((slide, sid) => (
              <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none" bg="pink">
                <Card variant="bordered" fontSize="18px" w="300px">
                    <Text fontWeight="bold">{slide.name}</Text>
                    <Text>
                        {slide.description}
                    </Text>
                </Card>
              </Box>
            ))}
          </Flex>
          <Text {...arrowStyles} left="0" onClick={prevSlide}>
            &#10094; YOO
          </Text>
          <Text {...arrowStyles} right="0" onClick={nextSlide}>
            &#10095;
          </Text>
        </Flex>
      </Flex>
    );
  };

  export default MyCarousel;