import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Courses Section */}
      <section className="w-full py-12 md:py-24 bg-gray-950">
        <div className="container px-4 md:px:6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Explore Our Courses
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Discover a wide range of courses to help you grow personally and
                professionally.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden bg-gray-900 border-gray-800 hover:border-blue-600 transition-all">
      <div className="aspect-video w-full relative bg-gray-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-gray-600" />
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className="bg-blue-900/30 text-blue-400 border-blue-800 mb-2"
          >
            {course.category}
          </Badge>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < course.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-xl text-white">{course.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            {course.students} students
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4">
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Link href={`/courses/${course.id}`}>Start Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Introduction to Community Building",
    description:
      "Learn the fundamentals of building an engaged online community.",
    category: "Community",
    duration: "4 weeks",
    students: 1245,
    rating: 4.8,
  },
  {
    id: "2",
    title: "Content Creation Masterclass",
    description: "Create compelling content that resonates with your audience.",
    category: "Content",
    duration: "6 weeks",
    students: 873,
    rating: 4.7,
  },
  {
    id: "3",
    title: "Monetization Strategies",
    description:
      "Discover effective ways to monetize your community and content.",
    category: "Business",
    duration: "5 weeks",
    students: 1032,
    rating: 4.9,
  },
  {
    id: "4",
    title: "Community Engagement Tactics",
    description: "Practical strategies to boost engagement in your community.",
    category: "Community",
    duration: "3 weeks",
    students: 756,
    rating: 4.6,
  },
  {
    id: "5",
    title: "Building Your Personal Brand",
    description: "Establish a strong personal brand to grow your influence.",
    category: "Marketing",
    duration: "4 weeks",
    students: 912,
    rating: 4.7,
  },
  {
    id: "6",
    title: "Community Analytics & Growth",
    description: "Use data to understand and grow your community effectively.",
    category: "Analytics",
    duration: "4 weeks",
    students: 645,
    rating: 4.5,
  },
];
