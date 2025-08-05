import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  Clock,
  MessageSquare,
  Users,
  TrendingUp,
  Bell,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">
              Welcome back, Alex! Here's what's happening in your learning
              journey.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative bg-transparent"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                3
              </span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <BookOpen className="mr-2 h-4 w-4" />
              Resume Learning
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Courses in Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">3</div>
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">7</div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">2</div>
                <Calendar className="h-5 w-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {inProgressCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-800"
                  >
                    <div className="sm:w-1/4 aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-500" />
                    </div>
                    <div className="sm:w-3/4 space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-white">
                          {course.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="bg-blue-900/30 text-blue-400 border-blue-800"
                        >
                          {course.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.lastAccessed}
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-4 w-4" />
                          {course.currentModule}
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">
                            Progress
                          </span>
                          <span className="text-sm text-blue-400">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress
                          value={course.progress}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                      <div className="pt-2">
                        <Button
                          asChild
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Link href={`/courses/${course.id}`}>Continue</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="/courses">View All Courses</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>Your recent interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`p-2 rounded-full ${getActivityIconBg(activity.type)}`}
                      >
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant="outline"
                          className="bg-red-900/30 text-red-400 border-red-800"
                        >
                          {event.date}
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {event.time}
                        </span>
                      </div>
                      <h4 className="font-medium text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <Avatar
                              key={i}
                              className="border-2 border-gray-800 h-6 w-6"
                            >
                              <AvatarImage
                                src={`/placeholder.svg?height=24&width=24&text=${i + 1}`}
                              />
                              <AvatarFallback>U{i + 1}</AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-700 text-[10px] text-gray-400">
                            +{event.attendees - 3}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  <Link href="/events">View All Events</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function getActivityIcon(type: string) {
  switch (type) {
    case "course":
      return <BookOpen className="h-4 w-4 text-blue-400" />;
    case "community":
      return <MessageSquare className="h-4 w-4 text-purple-400" />;
    case "event":
      return <Calendar className="h-4 w-4 text-red-400" />;
    default:
      return <Users className="h-4 w-4 text-green-400" />;
  }
}

function getActivityIconBg(type: string) {
  switch (type) {
    case "course":
      return "bg-blue-900/30";
    case "community":
      return "bg-purple-900/30";
    case "event":
      return "bg-red-900/30";
    default:
      return "bg-green-900/30";
  }
}

const inProgressCourses = [
  {
    id: "1",
    title: "Introduction to Community Building",
    category: "Community",
    lastAccessed: "2 hours ago",
    currentModule: "Module 3: Engagement Tactics",
    progress: 65,
  },
  {
    id: "2",
    title: "Content Creation Masterclass",
    category: "Content",
    lastAccessed: "Yesterday",
    currentModule: "Module 2: Content Strategy",
    progress: 35,
  },
  {
    id: "3",
    title: "Monetization Strategies",
    category: "Business",
    lastAccessed: "3 days ago",
    currentModule: "Module 1: Business Models",
    progress: 15,
  },
];

const activities = [
  {
    type: "course",
    description:
      "Completed lesson 'Creating Your Community Guidelines' in Introduction to Community Building",
    time: "2 hours ago",
  },
  {
    type: "event",
    description: "Registered for 'Community Building Workshop' on July 15",
    time: "Yesterday",
  },
  {
    type: "course",
    description: "Started new course 'Monetization Strategies'",
    time: "3 days ago",
  },
];

const events = [
  {
    title: "Community Building Workshop",
    description: "Learn practical strategies for growing your community",
    date: "Jul 15",
    time: "2:00 PM - 4:00 PM",
    attendees: 42,
  },
  {
    title: "Q&A with Community Experts",
    description: "Live session with experienced community builders",
    date: "Jul 22",
    time: "1:00 PM - 2:30 PM",
    attendees: 78,
  },
];
