import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../carousel';
import { Button } from '../button';

const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Artificial Intelligence Engineer",
    "Cybersecurity Engineer",
    "Product Manager",
    "UX/UI Designer",
    "Graphics Engineer",
    "Graphics Designer",
    "Video Editor"
];

const Categories = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center text-blue-600">
                Categories
            </h1>
            <p className="text-center text-gray-600">
                Explore our extensive job market.
            </p>
            <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                    
                       {Category.map((category, index) => {
                            return (
                                <CarouselItem
                                key={index}
                                 className="md:basis-1/2 lg-basis-1/3">
                                    <Button className="bg-black text-white hover:bg-gray-800">{category}</Button>
                                    </CarouselItem>
                            );     
                        })}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default Categories;