import { FC } from "react";
import { Filters } from "./section-filters/Filters";
import { Gallery } from "./section-gallery/Gallery"
import { Rent } from "./section-rent/Rent";
import { Presentation } from "./section-presentation/Presentation";
import { About } from "./section-about/About";

export const Home: FC = () => {
  return (
    <>
      <Filters />
      <Gallery />
      <Rent />
      <Presentation />
      <About />
    </>
  )
}
