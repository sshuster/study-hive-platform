
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { allUsers, subjects } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserX, Search, Users, BookOpen, HelpCircle, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState(allUsers);
  
  if (!user || user.role !== "admin") return null;

  const handleRemoveUser = (userId: number) => {
    const updatedUsers = userList.filter(u => u.id !== userId);
    setUserList(updatedUsers);
    toast.success("User removed successfully");
  };

  const filteredUsers = userList.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Manage users, content, and platform settings</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <div className="text-3xl font-bold">{userList.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
            <div className="text-3xl font-bold">{subjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Questions</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <HelpCircle className="h-5 w-5 text-gray-400 mr-2" />
            <div className="text-3xl font-bold">
              {userList.reduce((sum, user) => sum + user.questions, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Users (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>{user.questions}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRemoveUser(user.id)}>
                              <UserX className="h-4 w-4 mr-2" />
                              <span>Remove User</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
