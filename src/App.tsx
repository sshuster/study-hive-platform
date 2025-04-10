
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Layout>
                  <Home />
                </Layout>
              } 
            />
            <Route 
              path="/login" 
              element={
                <Layout hideFooter>
                  <Login />
                </Layout>
              } 
            />
            <Route 
              path="/register" 
              element={
                <Layout hideFooter>
                  <Register />
                </Layout>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Layout hideFooter>
                  <Dashboard />
                </Layout>
              } 
            />
            <Route 
              path="/pricing" 
              element={
                <Layout>
                  <Pricing />
                </Layout>
              } 
            />
            <Route 
              path="*" 
              element={
                <Layout hideFooter>
                  <NotFound />
                </Layout>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
