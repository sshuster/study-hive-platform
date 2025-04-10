
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { pricingPlans } from "@/services/mockData";

const Pricing = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your academic needs. All plans include access to our community forum and study resources.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative card-hover ${
                plan.recommended ? "border-tutorBlue-500 shadow-lg" : "border"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                  <div className="bg-tutorBlue-500 text-white text-sm font-medium py-1 px-4 rounded-full inline-block">
                    Most Popular
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  {plan.recommended 
                    ? "Perfect for students who need regular help"
                    : plan.name === "Basic" 
                      ? "For students with occasional questions" 
                      : "For students preparing for important exams"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-tutorBlue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className={`w-full ${
                    plan.recommended 
                      ? "bg-tutorBlue-500 hover:bg-tutorBlue-600" 
                      : "bg-tutorBlue-500 hover:bg-tutorBlue-600"
                  }`}
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-xl max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Can I change my plan later?</h3>
              <p className="text-gray-600 mt-2">
                Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the beginning of your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Is there a satisfaction guarantee?</h3>
              <p className="text-gray-600 mt-2">
                We offer a 14-day money-back guarantee if you're not satisfied with our service for any reason.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Can I cancel my subscription anytime?</h3>
              <p className="text-gray-600 mt-2">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">Do you offer student discounts?</h3>
              <p className="text-gray-600 mt-2">
                Yes, we offer a 20% discount for students with a valid ID. Contact our support team to apply for the discount.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Need a custom solution for your school or organization?
          </p>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
