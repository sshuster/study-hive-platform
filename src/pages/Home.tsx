
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { subjects } from "@/services/mockData";
import { CheckCircle, Book, GraduationCap, Clock, BrainCircuit, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-tutorBlue-500 to-tutorPurple-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Expert Help When You Need It Most</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get personalized tutoring and homework help from qualified experts in any subject, anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-tutorBlue-600 hover:bg-gray-100">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose StudyHive</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-100 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-tutorBlue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Tutors</h3>
              <p className="text-gray-600">
                Our tutors are field experts with advanced degrees and years of teaching experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-tutorBlue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Get help whenever you need it, day or night, with our around-the-clock service.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-100 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-tutorBlue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Receive customized help tailored to your learning style and specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Subjects We Cover</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Get expert help in any subject, from math to literature
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subjects.map((subject) => (
              <div 
                key={subject.id} 
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-lg font-medium">{subject.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-500 text-white text-xl font-bold flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and tell us what subjects you need help with.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-500 text-white text-xl font-bold flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit a Question</h3>
              <p className="text-gray-600">
                Upload your homework or ask a specific question about any topic.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-500 text-white text-xl font-bold flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Expert Help</h3>
              <p className="text-gray-600">
                Our qualified tutors will provide detailed explanations and step-by-step solutions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-tutorBlue-500 text-white text-xl font-bold flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Excel</h3>
              <p className="text-gray-600">
                Understand the concepts, improve your skills, and achieve better grades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold">Alex Johnson</h3>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "StudyHive helped me understand complex programming concepts that I was struggling with. The tutors are extremely knowledgeable and patient."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold">Sarah Williams</h3>
                  <p className="text-sm text-gray-500">Biology Major</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was falling behind in my biology class until I found StudyHive. Their explanations made difficult concepts so much clearer, and now I'm acing my exams!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h3 className="font-semibold">Michael Chen</h3>
                  <p className="text-sm text-gray-500">Engineering Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The help I received with my calculus homework was incredible. The tutor walked me through each step and made sure I understood the process."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-tutorPurple-600 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8">
            Join thousands of students who are achieving academic success with StudyHive.
          </p>
          <Button asChild size="lg" className="bg-white text-tutorPurple-600 hover:bg-gray-100">
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
