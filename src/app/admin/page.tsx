"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Search,
  Download,
  Eye,
  Award,
  BarChart3,
  GraduationCap,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const dashboardStats = {
  totalStudents: 1247,
  activeStudents: 892,
  totalCourses: 12,
  completionRate: 73,
  avgProgress: 68,
  newStudentsThisWeek: 45,
};

const students = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalProgress: 85,
    currentCourse: "Introduction to Community Building",
    currentProgress: 75,
    status: "active",
    points: 450,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-02-01",
    lastActive: "1 day ago",
    coursesEnrolled: 2,
    coursesCompleted: 2,
    totalProgress: 100,
    currentCourse: "Content Creation Masterclass",
    currentProgress: 45,
    status: "active",
    points: 680,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-20",
    lastActive: "3 days ago",
    coursesEnrolled: 4,
    coursesCompleted: 0,
    totalProgress: 25,
    currentCourse: "Monetization Strategies",
    currentProgress: 15,
    status: "inactive",
    points: 120,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-02-10",
    lastActive: "5 hours ago",
    coursesEnrolled: 1,
    coursesCompleted: 0,
    totalProgress: 90,
    currentCourse: "Introduction to Community Building",
    currentProgress: 90,
    status: "active",
    points: 380,
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-01-05",
    lastActive: "1 week ago",
    coursesEnrolled: 2,
    coursesCompleted: 1,
    totalProgress: 60,
    currentCourse: "Building Your Personal Brand",
    currentProgress: 30,
    status: "at-risk",
    points: 290,
  },
];

const courseStats = [
  {
    id: "1",
    title: "Introduction to Community Building",
    enrollments: 456,
    completions: 342,
    avgProgress: 78,
    avgRating: 4.8,
    completionRate: 75,
  },
  {
    id: "2",
    title: "Content Creation Masterclass",
    enrollments: 298,
    completions: 189,
    avgProgress: 65,
    avgRating: 4.7,
    completionRate: 63,
  },
  {
    id: "3",
    title: "Monetization Strategies",
    enrollments: 234,
    completions: 156,
    avgProgress: 72,
    avgRating: 4.9,
    completionRate: 67,
  },
];

const recentActivity = [
  {
    id: "1",
    student: "Alex Johnson",
    action: "Completed lesson",
    course: "Introduction to Community Building",
    lesson: "Setting Your Community Goals",
    timestamp: "2 hours ago",
    type: "completion",
  },
  {
    id: "2",
    student: "Emily Davis",
    action: "Started course",
    course: "Introduction to Community Building",
    lesson: null,
    timestamp: "3 hours ago",
    type: "enrollment",
  },
  {
    id: "3",
    student: "Sarah Chen",
    action: "Submitted assignment",
    course: "Content Creation Masterclass",
    lesson: "Creating Your Content Strategy",
    timestamp: "5 hours ago",
    type: "submission",
  },
  {
    id: "4",
    student: "Mike Rodriguez",
    action: "Missed deadline",
    course: "Monetization Strategies",
    lesson: "Business Model Canvas",
    timestamp: "1 day ago",
    type: "alert",
  },
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || student.currentCourse === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-900/30 text-green-400 border-green-800">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-900/30 text-gray-400 border-gray-800">
            Inactive
          </Badge>
        );
      case "at-risk":
        return (
          <Badge className="bg-red-900/30 text-red-400 border-red-800">
            At Risk
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <Award className="h-4 w-4 text-green-400" />;
      case "enrollment":
        return <UserCheck className="h-4 w-4 text-blue-400" />;
      case "submission":
        return <BookOpen className="h-4 w-4 text-purple-400" />;
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">
              Monitor student progress and course performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/admin/courses/new">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <Users className="mr-2 h-4 w-4 text-blue-500" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardStats.totalStudents.toLocaleString()}
              </div>
              <p className="text-xs text-green-400">
                +{dashboardStats.newStudentsThisWeek} this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardStats.activeStudents.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">
                {Math.round(
                  (dashboardStats.activeStudents /
                    dashboardStats.totalStudents) *
                    100,
                )}
                % of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-purple-500" />
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardStats.totalCourses}
              </div>
              <p className="text-xs text-gray-400">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm font-medium flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-yellow-500" />
                Avg Completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardStats.completionRate}%
              </div>
              <p className="text-xs text-gray-400">Course completion rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-white">
                      Student Progress
                    </CardTitle>
                    <CardDescription>
                      Monitor individual student performance and engagement
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-800 border-gray-700 text-white w-full sm:w-64"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="at-risk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={courseFilter}
                      onValueChange={setCourseFilter}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full sm:w-48">
                        <SelectValue placeholder="Course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="Introduction to Community Building">
                          Community Building
                        </SelectItem>
                        <SelectItem value="Content Creation Masterclass">
                          Content Creation
                        </SelectItem>
                        <SelectItem value="Monetization Strategies">
                          Monetization
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 rounded-lg bg-gray-800 border border-gray-700"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                            />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-white">
                              {student.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {student.email}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {getStatusBadge(student.status)}
                              <span className="text-xs text-gray-500">
                                Last active: {student.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-400">Courses</p>
                            <p className="text-sm font-medium text-white">
                              {student.coursesCompleted}/
                              {student.coursesEnrolled}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Points</p>
                            <p className="text-sm font-medium text-white">
                              {student.points}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              Overall Progress
                            </p>
                            <p className="text-sm font-medium text-white">
                              {student.totalProgress}%
                            </p>
                          </div>
                          <div className="col-span-2 lg:col-span-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">
                            Current: {student.currentCourse}
                          </span>
                          <span className="text-sm text-blue-400">
                            {student.currentProgress}%
                          </span>
                        </div>
                        <Progress
                          value={student.currentProgress}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Course Performance</CardTitle>
                <CardDescription>
                  Overview of course enrollment and completion statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseStats.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-lg bg-gray-800 border border-gray-700"
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                          <h3 className="font-medium text-white mb-2">
                            {course.title}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Enrollments</p>
                              <p className="text-white font-medium">
                                {course.enrollments}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Completions</p>
                              <p className="text-white font-medium">
                                {course.completions}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Avg Progress</p>
                              <p className="text-white font-medium">
                                {course.avgProgress}%
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Rating</p>
                              <p className="text-white font-medium">
                                {course.avgRating}/5.0
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            Analytics
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Course
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">
                            Completion Rate
                          </span>
                          <span className="text-sm text-blue-400">
                            {course.completionRate}%
                          </span>
                        </div>
                        <Progress
                          value={course.completionRate}
                          className="h-2 bg-gray-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>
                  Latest student actions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-800"
                    >
                      <div className="p-2 rounded-full bg-gray-700">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-white">
                            <span className="font-medium">
                              {activity.student}
                            </span>{" "}
                            {activity.action}
                          </p>
                          <span className="text-xs text-gray-400">
                            {activity.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {activity.course}
                          {activity.lesson && ` - ${activity.lesson}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Engagement Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Daily Active Users</span>
                      <span className="text-white font-medium">342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Weekly Active Users</span>
                      <span className="text-white font-medium">892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">
                        Avg Session Duration
                      </span>
                      <span className="text-white font-medium">24 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">
                        Course Completion Rate
                      </span>
                      <span className="text-white font-medium">73%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-green-900/20 border border-green-800">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">
                          High Engagement
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        Introduction to Community Building has 95% completion
                        rate
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-800">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">
                          Needs Attention
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        15 students haven't logged in for over a week
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-800">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400 font-medium">
                          Achievement
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        23 students completed courses this week
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
