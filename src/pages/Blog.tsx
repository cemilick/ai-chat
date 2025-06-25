import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, Edit, Trash2, Plus, Menu, X, LogOut, Save } from 'lucide-react';

// Types
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  views: number;
  image?: string;
}

interface User {
  username: string;
  isAuthenticated: boolean;
}

// Sample blog data
const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    content: "Web development continues to evolve at a rapid pace. In this comprehensive guide, we explore the latest trends that are shaping the future of web development, from AI integration to progressive web apps...",
    excerpt: "Discover the cutting-edge trends that will define web development in 2025 and beyond.",
    author: "Alex Johnson",
    date: "2025-06-15",
    category: "Technology",
    readTime: "8 min read",
    views: 1234,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Building Scalable React Applications: Best Practices",
    content: "Creating maintainable and scalable React applications requires following established patterns and best practices. This article covers everything from component architecture to state management...",
    excerpt: "Learn the essential patterns and practices for building robust React applications that scale.",
    author: "Sarah Chen",
    date: "2025-06-12",
    category: "Development",
    readTime: "12 min read",
    views: 856,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Design Systems: Creating Consistency at Scale",
    content: "A well-crafted design system is the backbone of any successful digital product. It ensures consistency, improves efficiency, and creates a cohesive user experience across all touchpoints...",
    excerpt: "Explore how design systems can transform your development workflow and user experience.",
    author: "Mike Rodriguez",
    date: "2025-06-10",
    category: "Design",
    readTime: "6 min read",
    views: 642,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400&fit=crop"
  }
];

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'blog' | 'login' | 'dashboard'>('blog');
  const [user, setUser] = useState<User>({ username: '', isAuthenticated: false });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Login state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  // Edit post state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'password') {
      setUser({ username: loginForm.username, isAuthenticated: true });
      setCurrentPage('dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setUser({ username: '', isAuthenticated: false });
    setCurrentPage('blog');
  };

  // CRUD Operations
  const handleCreatePost = () => {
    setIsCreating(true);
    setEditingPost({
      id: Date.now(),
      title: '',
      content: '',
      excerpt: '',
      author: user.username,
      date: new Date().toISOString().split('T')[0],
      category: 'Technology',
      readTime: '5 min read',
      views: 0
    });
  };

  const handleSavePost = () => {
    if (!editingPost) return;
    
    if (isCreating) {
      setBlogPosts([editingPost, ...blogPosts]);
    } else {
      setBlogPosts(blogPosts.map(post => post.id === editingPost.id ? editingPost : post));
    }
    
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    }
  };

  // Blog Header Component
  const BlogHeader: React.FC = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">Wazzi</h1>
            <span className="ml-2 text-sm text-gray-500">Blog</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
            <button 
              onClick={() => setCurrentPage('login')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin
            </button>
          </nav>
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Home</a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">About</a>
            <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Contact</a>
            <button 
              onClick={() => setCurrentPage('login')}
              className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );

  // Blog Post Card Component
  const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <article className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-300">
      {post.image && (
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mr-3">
            {post.category}
          </span>
          <Calendar size={16} className="mr-1" />
          <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
          <Eye size={16} className="mr-1" />
          <span>{post.views} views</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{post.author}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-600">{post.readTime}</span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Read More →
          </button>
        </div>
      </div>
    </article>
  );

  // Login Page Component
  const LoginPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to manage your blog content</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={(e) => handleLogin(e)}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setCurrentPage('blog')}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Blog
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600">Demo credentials:</p>
            <p className="text-xs text-gray-600">Username: admin</p>
            <p className="text-xs text-gray-600">Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Blog Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <button
                onClick={() => setCurrentPage('blog')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Blog
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Actions */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Blog Posts</h2>
              <p className="text-gray-600">Manage your blog content</p>
            </div>
            <button
              onClick={handleCreatePost}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" />
              New Post
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.excerpt.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingPost(post)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Create Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {isCreating ? 'Create New Post' : 'Edit Post'}
                </h3>
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                  <input
                    type="url"
                    value={editingPost.image || ''}
                    onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsCreating(false);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Save Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Blog Page Component
  const BlogPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Wazzi Blog
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover insights, tutorials, and trends in web development, design, and technology
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Wazzi Blog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Main App Render
  return (
    <div className="App">
      {currentPage === 'blog' && <BlogPage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'dashboard' && user.isAuthenticated && <Dashboard />}
    </div>
  );
};

export default Blog;