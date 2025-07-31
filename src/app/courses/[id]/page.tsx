import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  FileText,
  MessageSquare,
  PlayCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  ThumbsUp,
  Share2,
} from "lucide-react";
import Link from "next/link";
import CourseVideoPlayer from "@/components/course-video-player";
import CourseChecklist from "@/components/course-checklist";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  // In a real app, you would fetch the course data based on the ID
  const course = {
    id: awaitedParams.id,
    title: "Introduction to Community Building",
    description:
      "Learn the fundamentals of building an engaged online community. This comprehensive course covers everything from community strategy to engagement tactics and growth techniques.",
    instructor: {
      name: "Alex Johnson",
      role: "Community Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    progress: 0, // Starting fresh
    welcomeLesson: {
      id: "1-1",
      title: "Welcome to the Course",
      videoUrl: "https://example.com/video.mp4",
      duration: "5 min",
      description:
        "Get started with your community building journey. Learn what to expect from this course.",
      completed: false,
      transcript:
        "Welcome to this comprehensive course on community building! Over the next few weeks, you'll learn everything you need to know to build, grow, and manage thriving online communities...",
      checklistItems: [
        { id: "check-1", text: "Watch the welcome video", completed: false },
        {
          id: "check-2",
          text: "Set up your learning environment",
          completed: false,
        },
        { id: "check-3", text: "Join the course community", completed: false },
      ],
      resources: [
        { id: "res-1", title: "Course Syllabus", type: "PDF", url: "#" },
        { id: "res-2", title: "Community Guidelines", type: "PDF", url: "#" },
      ],
    },
    modules: [
      {
        id: "1",
        title: "Getting Started",
        lessons: [
          {
            id: "1-1",
            title: "Welcome to the Course",
            duration: "5 min",
            completed: false,
            current: true,
          },
          {
            id: "1-2",
            title: "What is Community Building?",
            duration: "12 min",
            completed: false,
          },
          {
            id: "1-3",
            title: "Setting Your Community Goals",
            duration: "15 min",
            completed: false,
          },
        ],
      },
      {
        id: "2",
        title: "Community Strategy",
        lessons: [
          {
            id: "2-1",
            title: "Defining Your Target Audience",
            duration: "18 min",
            completed: false,
          },
          {
            id: "2-2",
            title: "Creating Your Community Guidelines",
            duration: "14 min",
            completed: false,
          },
          {
            id: "2-3",
            title: "Choosing the Right Platform",
            duration: "20 min",
            completed: false,
          },
        ],
      },
      {
        id: "3",
        title: "Engagement Tactics",
        lessons: [
          {
            id: "3-1",
            title: "Creating Engaging Content",
            duration: "22 min",
            completed: false,
          },
          {
            id: "3-2",
            title: "Facilitating Discussions",
            duration: "16 min",
            completed: false,
          },
          {
            id: "3-3",
            title: "Handling Difficult Situations",
            duration: "18 min",
            completed: false,
          },
        ],
      },
      {
        id: "4",
        title: "Growth and Scaling",
        lessons: [
          {
            id: "4-1",
            title: "Attracting New Members",
            duration: "17 min",
            completed: false,
          },
          {
            id: "4-2",
            title: "Retention Strategies",
            duration: "19 min",
            completed: false,
          },
          {
            id: "4-3",
            title: "Measuring Community Success",
            duration: "21 min",
            completed: false,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="container px-4 py-8 mx-auto">
        {/* Course Header with Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back to courses</span>
            </Link>
            <h1 className="text-xl font-bold text-white">{course.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Video Player */}
            <div className="rounded-lg overflow-hidden bg-black aspect-video relative">
              <CourseVideoPlayer />
            </div>

            {/* Welcome Lesson Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {course.welcomeLesson.title}
              </h2>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.welcomeLesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Module 1: Getting Started
                </div>
              </div>
              <p className="text-gray-300">
                {course.welcomeLesson.description}
              </p>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900">
                <TabsTrigger value="overview">Course Overview</TabsTrigger>
                <TabsTrigger value="checklist">Get Started</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">
                        What You'll Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-gray-300">
                        <p>
                          This comprehensive course will take you through the
                          complete journey of building and managing successful
                          online communities. You'll learn proven strategies,
                          practical tactics, and real-world applications.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Fundamentals of community building and strategy
                          </li>
                          <li>
                            How to define and attract your target audience
                          </li>
                          <li>
                            Creating engaging content and facilitating
                            discussions
                          </li>
                          <li>Growth tactics and retention strategies</li>
                          <li>Measuring success and scaling your community</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Course Modules */}
                  {course.modules.map((module) => (
                    <Card
                      key={module.id}
                      className="bg-gray-900 border-gray-800"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white">
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href={`/courses/${course.id}/${lesson.id}`}
                              className="flex items-center justify-between p-3 rounded-md hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                ) : lesson.current ? (
                                  <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                ) : (
                                  <PlayCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                                <div>
                                  <span
                                    className={`${
                                      lesson.completed
                                        ? "text-gray-400"
                                        : lesson.current
                                          ? "text-white font-medium"
                                          : "text-white"
                                    } block`}
                                  >
                                    {lesson.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {lesson.current
                                      ? "Currently viewing"
                                      : "Click to view lesson"}
                                  </span>
                                </div>
                              </div>
                              <span className="text-gray-500 text-sm">
                                {lesson.duration}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="checklist" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Get Started Checklist
                    </CardTitle>
                    <CardDescription>
                      Complete these tasks to begin your learning journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CourseChecklist
                      items={course.welcomeLesson.checklistItems}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Course Resources
                    </CardTitle>
                    <CardDescription>
                      Download materials to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.welcomeLesson.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="p-4 rounded-lg bg-gray-800 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <span className="text-white block">
                                {resource.title}
                              </span>
                              <span className="text-gray-400 text-sm">
                                {resource.type}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcript" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Welcome Video Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-gray-800 text-gray-300 max-h-[400px] overflow-y-auto">
                      <p>{course.welcomeLesson.transcript}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Start Learning Section */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-blue-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white">
                    Ready to Start Learning?
                  </h3>
                  <p className="text-gray-300">
                    Begin with the first lesson and work your way through the
                    course at your own pace.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Link href={`/courses/${course.id}/1-2`}>
                        Start First Lesson
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join Discussion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Course Progress */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Course Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Your progress</span>
                    <span className="text-blue-400">{course.progress}%</span>
                  </div>
                  <Progress
                    value={course.progress}
                    className="h-2 bg-gray-800"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>0 completed</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>15 lessons</span>
                  </div>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Link href={`/courses/${course.id}/1-2`}>Start Learning</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Course Content Navigation */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {course.modules.map((module) => (
                    <div
                      key={module.id}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <div className="p-4 font-medium text-white bg-gray-800/50">
                        {module.title}
                      </div>
                      <div>
                        {module.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={`/courses/${course.id}/${lesson.id}`}
                            className={`p-4 flex items-center justify-between border-t border-gray-800 hover:bg-gray-800/30 transition-colors ${lesson.current ? "bg-gray-800/70" : ""}`}
                          >
                            <div className="flex items-center gap-3">
                              {lesson.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              ) : lesson.current ? (
                                <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />
                              )}
                              <span
                                className={`${lesson.completed ? "text-gray-400" : lesson.current ? "text-white font-medium" : "text-gray-300"}`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {lesson.duration}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                    />
                    <AvatarFallback>
                      {course.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">
                      {course.instructor.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {course.instructor.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Community building expert with over 10 years of experience
                  helping brands and creators build engaged online communities.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
