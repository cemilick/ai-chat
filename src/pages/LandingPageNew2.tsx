import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Star, Check, ArrowRight, Zap, Shield, Users, Globe, Play, Award, TrendingUp, Bot, Brain, MessageCircle, Cpu, Database, Code, BookOpen, Calendar, User, Send, Mic, MicOff, Image, Slack } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPageNew2 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showChatDemo, setShowChatDemo] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      quote: "Their AI chatbot increased our customer satisfaction by 85% and reduced response time to seconds.",
      author: "Sarah Chen",
      role: "CEO, RetailTech",
      rating: 5
    },
    {
      quote: "The computer vision API revolutionized our quality control process. Defect detection improved by 300%.",
      author: "Marcus Rodriguez",
      role: "CTO, ManufacturePlus",
      rating: 5
    },
    {
      quote: "Best AI platform we've used. The natural language processing is incredibly accurate.",
      author: "Emily Watson",
      role: "Head of AI, DataCorp",
      rating: 5
    }
  ];

  const aiServices = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Chatbots",
      description: "Intelligent conversational AI that understands context and provides human-like responses",
      features: ["24/7 Customer Support", "Multi-language Support", "Custom Training", "Integration Ready"]
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning APIs",
      description: "Pre-trained models for classification, prediction, and pattern recognition",
      features: ["Image Recognition", "Text Analysis", "Predictive Analytics", "Custom Models"]
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Computer Vision",
      description: "Advanced image and video analysis for automated visual intelligence",
      features: ["Object Detection", "Facial Recognition", "OCR Technology", "Real-time Processing"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Intelligence",
      description: "Transform raw data into actionable insights with AI-powered analytics",
      features: ["Smart Analytics", "Automated Reports", "Trend Analysis", "Data Visualization"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "AI Development Platform",
      description: "Complete toolkit for building and deploying custom AI solutions",
      features: ["No-Code Builder", "API Management", "Model Training", "Cloud Deployment"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "AI Security & Ethics",
      description: "Ensure responsible AI implementation with built-in safety measures",
      features: ["Bias Detection", "Privacy Protection", "Audit Trails", "Compliance Tools"]
    }
  ];

  const blogPosts = [
    {
      title: "The Future of Conversational AI in Customer Service",
      excerpt: "Explore how AI chatbots are transforming customer interactions and driving business growth...",
      author: "Dr. Alex Thompson",
      date: "June 15, 2025",
      readTime: "8 min read",
      category: "AI Trends"
    },
    {
      title: "Computer Vision Applications in Healthcare",
      excerpt: "Discover how AI-powered image analysis is revolutionizing medical diagnosis and treatment...",
      author: "Sarah Mitchell",
      date: "June 12, 2025",
      readTime: "6 min read",
      category: "Healthcare AI"
    },
    {
      title: "Building Ethical AI: Best Practices for 2025",
      excerpt: "Learn essential guidelines for developing responsible AI systems that benefit everyone...",
      author: "Michael Chen",
      date: "June 10, 2025",
      readTime: "10 min read",
      category: "AI Ethics"
    }
  ];

  const stats = [
    { number: "500K+", label: "AI Interactions Daily" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "AI Support" },
    { number: "150+", label: "AI Models" }
  ];

  const pricingPlans = [
    {
      name: "Developer",
      price: "49",
      period: "month",
      description: "Perfect for developers and small projects",
      features: ["5 AI Services", "10K API calls/month", "Basic Analytics", "Email Support", "Documentation Access"],
      highlighted: false
    },
    {
      name: "Business",
      price: "149",
      period: "month",
      description: "Advanced AI capabilities for growing businesses",
      features: ["All AI Services", "100K API calls/month", "Advanced Analytics", "Priority Support", "Custom Training", "Webhook Integration"],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "499",
      period: "month",
      description: "Full-scale AI solutions for large organizations",
      features: ["Unlimited AI Services", "1M+ API calls/month", "Enterprise Analytics", "24/7 Phone Support", "Dedicated AI Engineer", "On-premise Deployment", "SLA Guarantee"],
      highlighted: false
    }
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { type: 'user', message: currentMessage },
      { type: 'bot', message: 'I understand your question. Our AI can help with various tasks including data analysis, content creation, and problem-solving. Would you like to know more about our specific AI services?' }
    ];
    
    setChatMessages(newMessages);
    setCurrentMessage('');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle voice recording
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Slack className="w-5 h-5 text-white" />
              </div>
                <span className="text-3xl font-bold text-indigo-600 shimmer-effect">WAZZI</span>
              </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#services" className="text-slate-300 hover:text-white transition-colors">AI Services</a>
              <a href="#blog" className="text-slate-300 hover:text-white transition-colors">Blog</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => setShowChatDemo(true)}
                className="text-slate-300 hover:text-white transition-colors flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Try Chat AI
              </button>
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
                Get Started
              </button>
            </div>

            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50">
            <div className="px-4 py-4 space-y-4">
              <a href="#services" className="block text-slate-300 hover:text-white transition-colors">AI Services</a>
              <a href="#blog" className="block text-slate-300 hover:text-white transition-colors">Blog</a>
              <a href="#pricing" className="block text-slate-300 hover:text-white transition-colors">Pricing</a>
              <button 
                onClick={() => setShowChatDemo(true)}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Try Chat AI
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50 mb-8 backdrop-blur-sm">
            <Award className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-slate-300">Leading AI Technology Provider 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock the Power of
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Artificial Intelligence</span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your business with cutting-edge AI services. From intelligent chatbots to computer vision, 
            we provide the tools to build the future today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 hover:shadow-2xl flex items-center">
              Start Building with AI
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/ai')}
              className="group flex items-center text-white px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 transition-all"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Try Live Chat Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Complete
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> AI Services Suite</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive artificial intelligence solutions for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map((service, index) => (
              <div key={index} className="group p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-slate-400">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Insights & Trends</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Stay updated with the latest developments in artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <article key={index} className="group bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all overflow-hidden backdrop-blur-sm">
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-blue-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-slate-400 mr-2" />
                      <span className="text-sm text-slate-400">{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> AI Innovators</span>
          </h2>
          <p className="text-xl text-slate-300 mb-16">See how businesses are transforming with our AI solutions</p>

          <div className="relative">
            <div className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-white font-light mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-white text-lg">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-slate-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Powered
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Pricing Plans</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose the perfect AI solution for your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl border transition-all hover:transform hover:scale-105 ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-blue-500/10 to-cyan-500/10 border-blue-500/50 shadow-2xl shadow-blue-500/25' 
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
              } backdrop-blur-sm`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-300 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl p-12 border border-blue-500/20 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Build the Future</span>
              with AI?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses already leveraging our AI platform to drive innovation and growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 hover:shadow-2xl">
                Start Your AI Journey
              </button>
              <button 
                onClick={() => setShowChatDemo(true)}
                className="text-white px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Try Chat Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 py-12 px-4 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI<span className="text-blue-400">Nexus</span></span>
              </div>
              <p className="text-slate-400">
                Empowering businesses with next-generation AI technology
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">AI Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Chatbots</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Computer Vision</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Intelligence</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">© 2025 Wazzi Team's. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">AI Ethics</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Demo Modal */}
      {showChatDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChatDemo(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={toggleRecording}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                      isRecording ? 'text-red-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-center mt-3">
                <p className="text-xs text-slate-400">Try asking: "What AI services do you offer?"</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPageNew2;