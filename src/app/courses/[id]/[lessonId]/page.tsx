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
import {
  Clock,
  FileText,
  PlayCircle,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import CourseVideoPlayer from "@/components/course-video-player";
import CourseChecklist from "@/components/course-checklist";

type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
  type: "checkbox" | "text" | "url" | "file";
  points: number;
};

type Resource = {
  id: string;
  title: string;
  type: string;
  url: string;
};

type Section = {
  title: string;
  content: string;
};

type Lesson = {
  title: string;
  duration: string;
  module: string;
  description: string;
  completed: boolean;
  checklistItems: ChecklistItem[];
  resources: Resource[];
  content: {
    sections: Section[];
  };
};

type CourseModule = {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
  }[];
};

// Enhanced lesson data with different types of checklist items
const lessonData: Record<string, Lesson> = {
  "1-1": {
    title: "Welcome to the Course",
    duration: "5 min",
    module: "Module 1: Getting Started",
    description:
      "Get started with your community building journey. Learn what to expect from this course.",
    completed: false,
    checklistItems: [
      {
        id: "check-1",
        text: "Watch the welcome video",
        completed: false,
        type: "checkbox",
        points: 5,
      },
      {
        id: "check-2",
        text: "Introduce yourself to the community",
        completed: false,
        type: "text",
        points: 10,
      },
      {
        id: "check-3",
        text: "Share a link to your current community or project",
        completed: false,
        type: "url",
        points: 10,
      },
    ],
    resources: [
      { id: "res-1", title: "Course Syllabus", type: "PDF", url: "#" },
      { id: "res-2", title: "Community Guidelines", type: "PDF", url: "#" },
    ],
    content: {
      sections: [
        {
          title: "Welcome to Community Building Mastery",
          content:
            "Welcome to this comprehensive course on community building! Over the next few weeks, you'll learn everything you need to know to build, grow, and manage thriving online communities.",
        },
        {
          title: "What You'll Learn",
          content:
            "This course covers the complete community building process from strategy to execution. You'll discover proven frameworks, practical tactics, and real-world case studies.",
        },
        {
          title: "Course Structure",
          content:
            "The course is divided into 4 modules, each building upon the previous one. We'll start with fundamentals and progress to advanced growth strategies.",
        },
      ],
    },
  },
  "1-2": {
    title: "What is Community Building?",
    duration: "12 min",
    module: "Module 1: Getting Started",
    description:
      "In this lesson, we'll explore the core concepts of community building and why it matters.",
    completed: false,
    checklistItems: [
      {
        id: "check-1",
        text: "Define your community purpose in one sentence",
        completed: false,
        type: "text",
        points: 15,
      },
      {
        id: "check-2",
        text: "List 5 potential community members",
        completed: false,
        type: "text",
        points: 10,
      },
      {
        id: "check-3",
        text: "Research 3 existing communities in your niche",
        completed: false,
        type: "text",
        points: 15,
      },
      {
        id: "check-4",
        text: "Upload your community research document",
        completed: false,
        type: "file",
        points: 20,
      },
    ],
    resources: [
      {
        id: "res-1",
        title: "Community Building Worksheet",
        type: "PDF",
        url: "#",
      },
      {
        id: "res-2",
        title: "Platform Comparison Guide",
        type: "Spreadsheet",
        url: "#",
      },
    ],
    content: {
      sections: [
        {
          title: "What is Community Building?",
          content:
            "Community building is the process of creating and nurturing a group of people who share common interests, goals, or values. In the digital age, communities can exist across various platforms and spaces, bringing together individuals from around the world.",
        },
        {
          title: "Key Elements of Successful Communities",
          content:
            "Every successful community has certain key elements: shared purpose, sense of belonging, clear guidelines, and active engagement. These elements create the foundation for a thriving community.",
        },
        {
          title: "Types of Communities",
          content:
            "Communities can be interest-based, practice-based, product-based, geographic, or identity-based. Understanding the type of community you want to build helps shape your strategy.",
        },
      ],
    },
  },
  "1-3": {
    title: "Setting Your Community Goals",
    duration: "15 min",
    module: "Module 1: Getting Started",
    description:
      "Learn how to set clear, measurable goals for your community that align with your overall vision.",
    completed: false,
    checklistItems: [
      {
        id: "check-1",
        text: "Write your community's mission statement",
        completed: false,
        type: "text",
        points: 20,
      },
      {
        id: "check-2",
        text: "Set 3 SMART goals for your community",
        completed: false,
        type: "text",
        points: 25,
      },
      {
        id: "check-3",
        text: "Create a 6-month timeline for your goals",
        completed: false,
        type: "file",
        points: 20,
      },
      {
        id: "check-4",
        text: "Share your goals in the course community for feedback",
        completed: false,
        type: "url",
        points: 15,
      },
    ],
    resources: [
      {
        id: "res-1",
        title: "Community Goals Worksheet",
        type: "PDF",
        url: "#",
      },
      {
        id: "res-2",
        title: "Community Metrics Template",
        type: "Spreadsheet",
        url: "#",
      },
      {
        id: "res-3",
        title: "Goal Setting Case Studies",
        type: "PDF",
        url: "#",
      },
    ],
    content: {
      sections: [
        {
          title: "Why Set Community Goals?",
          content:
            "Setting clear goals for your community is essential for providing direction, measuring success, guiding decision-making, and creating accountability.",
        },
        {
          title: "Types of Community Goals",
          content:
            "Community goals can focus on growth (member acquisition), engagement (activity levels), retention (keeping members), or value creation (benefits provided).",
        },
        {
          title: "The SMART Framework",
          content:
            "Use the SMART framework to ensure your goals are Specific, Measurable, Achievable, Relevant, and Time-bound.",
        },
      ],
    },
  },
};

// Course modules structure
const courseModules: CourseModule[] = [
  {
    id: "1",
    title: "Getting Started",
    lessons: [
      {
        id: "1-1",
        title: "Welcome to the Course",
        duration: "5 min",
        completed: false,
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
];

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const awaitedParams = await params;
  const lesson = lessonData[awaitedParams.lessonId];

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  type LessonWithModule = {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    moduleId: string;
    moduleTitle: string;
  };
  // Find current lesson index for navigation
  const allLessons: LessonWithModule[] = [];
  courseModules.forEach((module) => {
    module.lessons.forEach((lessonItem) => {
      allLessons.push({
        ...lessonItem,
        moduleId: module.id,
        moduleTitle: module.title,
      });
    });
  });

  const currentLessonIndex = allLessons.findIndex(
    (l) => l.id === awaitedParams.lessonId,
  );
  const prevLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="container px-4 py-8 mx-auto">
        {/* Course Header with Navigation */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back to home</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold text-white sm:mx-auto">
            Introduction to Community Building
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Community
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="rounded-lg overflow-hidden bg-black aspect-video relative">
              <CourseVideoPlayer />
            </div>

            {/* Lesson Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="bg-transparent"
                disabled={!prevLesson}
                asChild={!!prevLesson}
              >
                {prevLesson ? (
                  <Link href={`/courses/${awaitedParams.id}/${prevLesson.id}`}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Link>
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </>
                )}
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!nextLesson}
                asChild={!!nextLesson}
              >
                {nextLesson ? (
                  <Link href={`/courses/${awaitedParams.id}/${nextLesson.id}`}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                ) : (
                  <>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Lesson Title and Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {lesson.title}
              </h2>
              <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {lesson.module}
                </div>
              </div>
              <p className="text-gray-300">{lesson.description}</p>
            </div>

            {/* Lesson Content Tabs */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900">
                <TabsTrigger value="content">Lesson</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6">
                    <div className="space-y-8 text-gray-300">
                      {lesson.content.sections.map(
                        (section: Section, index: number) => (
                          <section key={index} className="space-y-4">
                            <h3 className="text-xl font-bold text-white">
                              {section.title}
                            </h3>
                            <p>{section.content}</p>
                          </section>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Lesson Assignments
                    </CardTitle>
                    <CardDescription>
                      Complete these assignments to demonstrate your
                      understanding and earn progress points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CourseChecklist items={lesson.checklistItems} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Lesson Resources
                    </CardTitle>
                    <CardDescription>
                      Download additional materials for this lesson
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lesson.resources.map((resource: Resource) => (
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
                      Video Transcript
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 rounded-lg bg-gray-800 text-gray-300 max-h-[400px] overflow-y-auto">
                      <p className="mb-4">
                        [This is where the video transcript would appear. In a
                        real implementation, this would be the actual transcript
                        of the video lesson.]
                      </p>
                      <p className="mb-4">
                        The transcript helps with accessibility and allows
                        students to follow along with the video content or
                        review specific points later.
                      </p>
                      <p>[Transcript continues...]</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
                    <span className="text-blue-400">35%</span>
                  </div>
                  <Progress value={35} className="h-2 bg-gray-800" />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>3 completed</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    <span>12 remaining</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-white">Course Content</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {courseModules.map((module) => (
                    <div
                      key={module.id}
                      className="border-b border-gray-800 last:border-0"
                    >
                      <div className="p-4 font-medium text-white bg-gray-800/50">
                        {module.title}
                      </div>
                      <div>
                        {module.lessons.map((lessonItem) => (
                          <Link
                            key={lessonItem.id}
                            href={`/courses/${awaitedParams.id}/${lessonItem.id}`}
                            className={`p-4 flex items-center justify-between border-t border-gray-800 hover:bg-gray-800/30 transition-colors ${
                              lessonItem.id === awaitedParams.lessonId
                                ? "bg-gray-800/70"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {lessonItem.completed ? (
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              ) : lessonItem.id === awaitedParams.lessonId ? (
                                <PlayCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />
                              )}
                              <span
                                className={`${
                                  lessonItem.completed
                                    ? "text-gray-400"
                                    : lessonItem.id === awaitedParams.lessonId
                                      ? "text-white font-medium"
                                      : "text-gray-300"
                                }`}
                              >
                                {lessonItem.title}
                              </span>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {lessonItem.duration}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
