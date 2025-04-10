
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { performanceData, userQuestions } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { PlusCircle, Clock, CheckCircle, HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const userData = performanceData[user.id as keyof typeof performanceData];
  const questions = userQuestions[user.id as keyof typeof userQuestions] || [];

  // Transform data for the grade chart
  const gradeData = userData.subjects.map((subject, index) => ({
    subject,
    grade: userData.grades[index],
    improvement: userData.improvement[index],
  }));

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
          <p className="text-gray-500">Here's an overview of your academic progress</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Question
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{questions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Answered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {questions.filter(q => q.status === "answered").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {questions.filter(q => q.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {questions.filter(q => q.status === "in-progress").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your grades across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gradeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="grade" fill="#3a86ff" name="Current Grade" />
                  <Bar dataKey="improvement" fill="#8b5cf6" name="Improvement" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Questions asked per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userData.weeklyActivity}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="questions"
                    stroke="#3a86ff"
                    activeDot={{ r: 8 }}
                    name="Questions Asked"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Questions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Questions</CardTitle>
              <CardDescription>Your recent tutoring questions</CardDescription>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Questions</SelectItem>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.length > 0 ? (
              questions.map((question) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{question.title}</h3>
                      <p className="text-sm text-gray-500">{question.subject} • {question.date}</p>
                    </div>
                    <div className="flex items-center">
                      {question.status === "answered" ? (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Answered
                        </span>
                      ) : question.status === "pending" ? (
                        <span className="flex items-center text-amber-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="flex items-center text-blue-600 text-sm">
                          <HelpCircle className="h-4 w-4 mr-1" />
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{question.content}</p>
                  {question.replies > 0 && (
                    <p className="text-xs text-gray-500 mt-2">{question.replies} replies</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No questions yet. Start by asking your first question!</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ask a Question
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        {questions.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full">View All Questions</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default UserDashboard;
