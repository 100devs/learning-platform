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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Save,
  Eye,
  Upload,
  ChevronDown,
  ChevronRight,
  GripVertical,
  FileText,
  Video,
  CheckSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface ChecklistItem {
  id: string;
  text: string;
  type: "checkbox" | "text" | "url" | "file";
  points: number;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  checklistItems: ChecklistItem[];
  resources: Resource[];
  transcript: string;
  contentSections: ContentSection[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  title: string;
  description: string;
  category: string;
  duration: string;
  instructor: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  modules: Module[];
}

export default function CourseEditorPage() {
  const [course, setCourse] = useState<Course>({
    title: "",
    description: "",
    category: "",
    duration: "",
    instructor: {
      name: "",
      role: "",
      bio: "",
      avatar: "",
    },
    modules: [],
  });

  const [activeTab, setActiveTab] = useState("basics");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(),
  );
  const [selectedLesson, setSelectedLesson] = useState<{
    moduleId: string;
    lessonId: string;
  } | null>(null);

  const addModule = () => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title: "",
      lessons: [],
    };
    setCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));
  };

  const updateModule = (
    moduleId: string,
    field: keyof Module,
    value: unknown,
  ) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, [field]: value } : module,
      ),
    }));
  };

  const deleteModule = (moduleId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: "",
      duration: "",
      description: "",
      videoUrl: "",
      checklistItems: [],
      resources: [],
      transcript: "",
      contentSections: [],
    };

    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module,
      ),
    }));
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: unknown,
  ) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter(
                (lesson) => lesson.id !== lessonId,
              ),
            }
          : module,
      ),
    }));
  };

  const addChecklistItem = (moduleId: string, lessonId: string) => {
    const newItem: ChecklistItem = {
      id: `checklist-${Date.now()}`,
      text: "",
      type: "checkbox",
      points: 5,
    };

    updateLesson(moduleId, lessonId, "checklistItems", [
      ...(getLesson(moduleId, lessonId)?.checklistItems || []),
      newItem,
    ]);
  };

  const addResource = (moduleId: string, lessonId: string) => {
    const newResource: Resource = {
      id: `resource-${Date.now()}`,
      title: "",
      type: "PDF",
      url: "",
    };

    updateLesson(moduleId, lessonId, "resources", [
      ...(getLesson(moduleId, lessonId)?.resources || []),
      newResource,
    ]);
  };

  const addContentSection = (moduleId: string, lessonId: string) => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      title: "",
      content: "",
    };

    updateLesson(moduleId, lessonId, "contentSections", [
      ...(getLesson(moduleId, lessonId)?.contentSections || []),
      newSection,
    ]);
  };

  const getLesson = (moduleId: string, lessonId: string) => {
    const foundModule = course.modules.find((m) => m.id === moduleId);
    return foundModule?.lessons.find((l) => l.id === lessonId);
  };

  const toggleModuleExpanded = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const saveCourse = () => {
    console.log("Saving course:", course);
    // Here you would typically send the data to your backend
    alert("Course saved successfully!");
  };

  const previewCourse = () => {
    console.log("Previewing course:", course);
    // Here you would typically navigate to a preview page
    alert("Opening course preview...");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      <div className="container px-4 py-8 mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Course Editor</h1>
              <p className="text-gray-400">
                Create and manage your course content
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={previewCourse}
              className="bg-transparent"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button
              onClick={saveCourse}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Course
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900">
            <TabsTrigger value="basics">Course Basics</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="lesson-editor">Lesson Editor</TabsTrigger>
          </TabsList>

          {/* Course Basics Tab */}
          <TabsContent value="basics" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Course Information</CardTitle>
                <CardDescription>
                  Basic details about your course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Course Title
                    </Label>
                    <Input
                      id="title"
                      value={course.title}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Introduction to Community Building"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Select
                      value={course.category}
                      onValueChange={(value) =>
                        setCourse((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Community">Community</SelectItem>
                        <SelectItem value="Content">Content</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Course Description
                  </Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Learn the fundamentals of building an engaged online community..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">
                    Course Duration
                  </Label>
                  <Input
                    id="duration"
                    value={course.duration}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    placeholder="4 weeks"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Instructor Tab */}
          <TabsContent value="instructor" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Instructor Information
                </CardTitle>
                <CardDescription>
                  Details about the course instructor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="instructor-name" className="text-white">
                      Instructor Name
                    </Label>
                    <Input
                      id="instructor-name"
                      value={course.instructor.name}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          instructor: {
                            ...prev.instructor,
                            name: e.target.value,
                          },
                        }))
                      }
                      placeholder="Alex Johnson"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor-role" className="text-white">
                      Role/Title
                    </Label>
                    <Input
                      id="instructor-role"
                      value={course.instructor.role}
                      onChange={(e) =>
                        setCourse((prev) => ({
                          ...prev,
                          instructor: {
                            ...prev.instructor,
                            role: e.target.value,
                          },
                        }))
                      }
                      placeholder="Community Strategist"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-bio" className="text-white">
                    Instructor Bio
                  </Label>
                  <Textarea
                    id="instructor-bio"
                    value={course.instructor.bio}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        instructor: { ...prev.instructor, bio: e.target.value },
                      }))
                    }
                    placeholder="Community building expert with over 10 years of experience..."
                    className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-avatar" className="text-white">
                    Avatar URL
                  </Label>
                  <Input
                    id="instructor-avatar"
                    value={course.instructor.avatar}
                    onChange={(e) =>
                      setCourse((prev) => ({
                        ...prev,
                        instructor: {
                          ...prev.instructor,
                          avatar: e.target.value,
                        },
                      }))
                    }
                    placeholder="https://example.com/avatar.jpg"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Course Content Tab */}
          <TabsContent value="content" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">
                      Course Structure
                    </CardTitle>
                    <CardDescription>
                      Organize your course into modules and lessons
                    </CardDescription>
                  </div>
                  <Button
                    onClick={addModule}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Module
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <Card
                      key={module.id}
                      className="bg-gray-800 border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Module Header */}
                          <div className="flex items-center gap-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleModuleExpanded(module.id)}
                              className="p-1"
                            >
                              {expandedModules.has(module.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                            <GripVertical className="h-4 w-4 text-gray-500" />
                            <Input
                              value={module.title}
                              onChange={(e) =>
                                updateModule(module.id, "title", e.target.value)
                              }
                              placeholder={`Module ${moduleIndex + 1}: Getting Started`}
                              className="bg-gray-700 border-gray-600 text-white flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addLesson(module.id)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Lesson
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteModule(module.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Module Lessons */}
                          {expandedModules.has(module.id) && (
                            <div className="ml-8 space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-md"
                                >
                                  <GripVertical className="h-4 w-4 text-gray-500" />
                                  <Video className="h-4 w-4 text-blue-400" />
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) =>
                                      updateLesson(
                                        module.id,
                                        lesson.id,
                                        "title",
                                        e.target.value,
                                      )
                                    }
                                    placeholder={`Lesson ${lessonIndex + 1}: Welcome to the Course`}
                                    className="bg-gray-600 border-gray-500 text-white flex-1"
                                  />
                                  <Input
                                    value={lesson.duration}
                                    onChange={(e) =>
                                      updateLesson(
                                        module.id,
                                        lesson.id,
                                        "duration",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="5 min"
                                    className="bg-gray-600 border-gray-500 text-white w-20"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedLesson({
                                        moduleId: module.id,
                                        lessonId: lesson.id,
                                      });
                                      setActiveTab("lesson-editor");
                                    }}
                                    className="text-blue-400 hover:text-blue-300"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      deleteLesson(module.id, lesson.id)
                                    }
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lesson Editor Tab */}
          <TabsContent value="lesson-editor" className="mt-6">
            {selectedLesson ? (
              <LessonEditor
                course={course}
                moduleId={selectedLesson.moduleId}
                lessonId={selectedLesson.lessonId}
                updateLesson={updateLesson}
                addChecklistItem={addChecklistItem}
                addResource={addResource}
                addContentSection={addContentSection}
              />
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6">
                  <div className="text-center text-gray-400">
                    <Video className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                    <p>
                      Select a lesson from the Course Content tab to edit its
                      details
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function LessonEditor({
  course,
  moduleId,
  lessonId,
  updateLesson,
  addChecklistItem,
  addResource,
  addContentSection,
}: {
  course: Course;
  moduleId: string;
  lessonId: string;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    field: keyof Lesson,
    value: unknown,
  ) => void;
  addChecklistItem: (moduleId: string, lessonId: string) => void;
  addResource: (moduleId: string, lessonId: string) => void;
  addContentSection: (moduleId: string, lessonId: string) => void;
}) {
  const foundModule = course.modules.find((m) => m.id === moduleId);
  const lesson = foundModule?.lessons.find((l) => l.id === lessonId);

  if (!lesson) return null;

  const updateChecklistItem = (
    itemId: string,
    field: keyof ChecklistItem,
    value: unknown,
  ) => {
    const updatedItems = lesson.checklistItems.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item,
    );
    updateLesson(moduleId, lessonId, "checklistItems", updatedItems);
  };

  const deleteChecklistItem = (itemId: string) => {
    const updatedItems = lesson.checklistItems.filter(
      (item) => item.id !== itemId,
    );
    updateLesson(moduleId, lessonId, "checklistItems", updatedItems);
  };

  const updateResource = (
    resourceId: string,
    field: keyof Resource,
    value: unknown,
  ) => {
    const updatedResources = lesson.resources.map((resource) =>
      resource.id === resourceId ? { ...resource, [field]: value } : resource,
    );
    updateLesson(moduleId, lessonId, "resources", updatedResources);
  };

  const deleteResource = (resourceId: string) => {
    const updatedResources = lesson.resources.filter(
      (resource) => resource.id !== resourceId,
    );
    updateLesson(moduleId, lessonId, "resources", updatedResources);
  };

  const updateContentSection = (
    sectionId: string,
    field: keyof ContentSection,
    value: unknown,
  ) => {
    const updatedSections = lesson.contentSections.map((section) =>
      section.id === sectionId ? { ...section, [field]: value } : section,
    );
    updateLesson(moduleId, lessonId, "contentSections", updatedSections);
  };

  const deleteContentSection = (sectionId: string) => {
    const updatedSections = lesson.contentSections.filter(
      (section) => section.id !== sectionId,
    );
    updateLesson(moduleId, lessonId, "contentSections", updatedSections);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Basics */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Lesson Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Lesson Title</Label>
              <Input
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(moduleId, lessonId, "title", e.target.value)
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Duration</Label>
              <Input
                value={lesson.duration}
                onChange={(e) =>
                  updateLesson(moduleId, lessonId, "duration", e.target.value)
                }
                placeholder="5 min"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Description</Label>
            <Textarea
              value={lesson.description}
              onChange={(e) =>
                updateLesson(moduleId, lessonId, "description", e.target.value)
              }
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Video URL</Label>
            <Input
              value={lesson.videoUrl}
              onChange={(e) =>
                updateLesson(moduleId, lessonId, "videoUrl", e.target.value)
              }
              placeholder="https://example.com/video.mp4"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Lesson Content</CardTitle>
            <Button
              onClick={() => addContentSection(moduleId, lessonId)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.contentSections.map((section) => (
            <Card key={section.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateContentSection(section.id, "title", e.target.value)
                    }
                    placeholder="Section Title"
                    className="bg-gray-700 border-gray-600 text-white flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteContentSection(section.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={section.content}
                  onChange={(e) =>
                    updateContentSection(section.id, "content", e.target.value)
                  }
                  placeholder="Section content..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Assignment Checklist</CardTitle>
            <Button
              onClick={() => addChecklistItem(moduleId, lessonId)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.checklistItems.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-green-400" />
                  <Input
                    value={item.text}
                    onChange={(e) =>
                      updateChecklistItem(item.id, "text", e.target.value)
                    }
                    placeholder="Checklist item description"
                    className="bg-gray-700 border-gray-600 text-white flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteChecklistItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={item.type}
                    onValueChange={(value: unknown) =>
                      updateChecklistItem(item.id, "type", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkbox">Simple Checkbox</SelectItem>
                      <SelectItem value="text">Text Response</SelectItem>
                      <SelectItem value="url">URL Submission</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={item.points}
                    onChange={(e) =>
                      updateChecklistItem(
                        item.id,
                        "points",
                        Number.parseInt(e.target.value),
                      )
                    }
                    placeholder="Points"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Lesson Resources</CardTitle>
            <Button
              onClick={() => addResource(moduleId, lessonId)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.resources.map((resource) => (
            <Card key={resource.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-purple-400" />
                  <Input
                    value={resource.title}
                    onChange={(e) =>
                      updateResource(resource.id, "title", e.target.value)
                    }
                    placeholder="Resource title"
                    className="bg-gray-700 border-gray-600 text-white flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteResource(resource.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Select
                    value={resource.type}
                    onValueChange={(value) =>
                      updateResource(resource.id, "type", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF Document</SelectItem>
                      <SelectItem value="Video">Video File</SelectItem>
                      <SelectItem value="Audio">Audio File</SelectItem>
                      <SelectItem value="Image">Image</SelectItem>
                      <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                      <SelectItem value="Presentation">Presentation</SelectItem>
                      <SelectItem value="Archive">ZIP/Archive</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={resource.url}
                    onChange={(e) =>
                      updateResource(resource.id, "url", e.target.value)
                    }
                    placeholder="Resource URL (if external)"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // In a real implementation, you would upload the file to your storage service
                          // and get back a URL to store in the resource
                          const fakeUrl = `uploads/${file.name}`;
                          updateResource(resource.id, "url", fakeUrl);
                          if (!resource.title) {
                            updateResource(
                              resource.id,
                              "title",
                              file.name.split(".")[0],
                            );
                          }
                          // Auto-detect file type
                          const extension = file.name
                            .split(".")
                            .pop()
                            ?.toLowerCase();
                          let detectedType = "Other";
                          if (extension === "pdf") detectedType = "PDF";
                          else if (
                            ["mp4", "avi", "mov", "wmv"].includes(
                              extension || "",
                            )
                          )
                            detectedType = "Video";
                          else if (
                            ["mp3", "wav", "m4a"].includes(extension || "")
                          )
                            detectedType = "Audio";
                          else if (
                            ["jpg", "jpeg", "png", "gif", "svg"].includes(
                              extension || "",
                            )
                          )
                            detectedType = "Image";
                          else if (
                            ["xls", "xlsx", "csv"].includes(extension || "")
                          )
                            detectedType = "Spreadsheet";
                          else if (["ppt", "pptx"].includes(extension || ""))
                            detectedType = "Presentation";
                          else if (
                            ["zip", "rar", "7z"].includes(extension || "")
                          )
                            detectedType = "Archive";

                          updateResource(resource.id, "type", detectedType);
                        }
                      }}
                      className="bg-gray-700 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.mp3,.jpg,.jpeg,.png,.gif,.zip,.rar"
                    />
                  </div>
                </div>
                {resource.url && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FileText className="h-4 w-4" />
                    <span className="truncate">
                      {resource.url.startsWith("uploads/")
                        ? `📁 ${resource.url}`
                        : `🔗 ${resource.url}`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {lesson.resources.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p>No resources added yet</p>
              <p className="text-sm">
                Upload files or add external links for students to download
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Video Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={lesson.transcript}
            onChange={(e) =>
              updateLesson(moduleId, lessonId, "transcript", e.target.value)
            }
            placeholder="Enter the video transcript here..."
            className="bg-gray-800 border-gray-700 text-white min-h-[200px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
