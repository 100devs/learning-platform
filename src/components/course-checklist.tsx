"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, CheckCircle, Clock, FileText } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  type?: "text" | "url" | "file" | "checkbox";
  submission?: string;
  submittedAt?: string;
  points?: number;
}

interface CourseChecklistProps {
  items: ChecklistItem[];
}

export default function CourseChecklist({
  items: initialItems,
}: CourseChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [submissions, setSubmissions] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const handleSubmissionChange = (id: string, value: string) => {
    setSubmissions((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (id: string) => {
    setIsSubmitting((prev) => ({ ...prev, [id]: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: true,
              submission: submissions[id] || "",
              submittedAt: new Date().toLocaleString(),
            }
          : item,
      ),
    );

    setIsSubmitting((prev) => ({ ...prev, [id]: false }));
    setSubmissions((prev) => ({ ...prev, [id]: "" }));
  };

  const toggleSimpleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const completedCount = items.filter((item) => item.completed).length;
  const totalPoints = items.reduce((sum, item) => sum + (item.points || 1), 0);
  const earnedPoints = items
    .filter((item) => item.completed)
    .reduce((sum, item) => sum + (item.points || 1), 0);
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`bg-gray-800 border-gray-700 transition-all ${item.completed ? "border-green-600 bg-green-900/20" : ""}`}
          >
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {item.type === "checkbox" ? (
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleSimpleItem(item.id)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="space-y-2 flex-1">
                      <Label
                        htmlFor={item.id}
                        className={`text-base font-medium ${item.completed ? "text-green-400" : "text-white"}`}
                      >
                        {item.text}
                      </Label>
                      {item.points && (
                        <Badge
                          variant="outline"
                          className="bg-blue-900/30 text-blue-400 border-blue-800"
                        >
                          {item.points} points
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submission Area */}
                {item.type !== "checkbox" && !item.completed && (
                  <div className="ml-8 space-y-3">
                    {item.type === "text" && (
                      <Textarea
                        placeholder="Enter your response here..."
                        value={submissions[item.id] || ""}
                        onChange={(e) =>
                          handleSubmissionChange(item.id, e.target.value)
                        }
                        className="bg-gray-900 border-gray-600 text-white min-h-[100px]"
                      />
                    )}

                    {item.type === "url" && (
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={submissions[item.id] || ""}
                        onChange={(e) =>
                          handleSubmissionChange(item.id, e.target.value)
                        }
                        className="bg-gray-900 border-gray-600 text-white"
                      />
                    )}

                    {item.type === "file" && (
                      <div className="space-y-2">
                        <Input
                          type="file"
                          className="bg-gray-900 border-gray-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
                        />
                        <p className="text-xs text-gray-400">
                          Accepted formats: PDF, DOC, DOCX (Max 10MB)
                        </p>
                      </div>
                    )}

                    <Button
                      onClick={() => handleSubmit(item.id)}
                      disabled={
                        isSubmitting[item.id] || !submissions[item.id]?.trim()
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isSubmitting[item.id] ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          {item.type === "file" ? (
                            <Upload className="mr-2 h-4 w-4" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Submit
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Completed Submission Display */}
                {item.completed && item.submission && (
                  <div className="ml-8 p-3 bg-green-900/20 border border-green-600 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-400">
                        Submitted
                      </span>
                      {item.submittedAt && (
                        <span className="text-xs text-gray-400">
                          on {item.submittedAt}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-300">
                      {item.type === "url" ? (
                        <a
                          href={item.submission}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {item.submission}
                        </a>
                      ) : item.type === "file" ? (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>File uploaded successfully</span>
                        </div>
                      ) : (
                        <div className="bg-gray-800 p-2 rounded text-gray-300 max-h-20 overflow-y-auto">
                          {item.submission}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="pt-4 border-t border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-400">
            <span className="text-white font-medium">{completedCount}</span> of{" "}
            <span className="text-white font-medium">{items.length}</span> tasks
            completed
          </div>
          <div className="text-sm">
            <span className="text-blue-400 font-medium">{earnedPoints}</span>
            <span className="text-gray-400">/{totalPoints} points</span>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">
            {progress === 100 ? (
              <span className="text-green-400 font-medium">
                🎉 All tasks completed! Great work!
              </span>
            ) : (
              `${Math.round(progress)}% complete - Keep going!`
            )}
          </p>
          {progress === 100 && (
            <Badge className="bg-green-600 text-white">
              <CheckCircle className="mr-1 h-3 w-3" />
              Lesson Complete
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
