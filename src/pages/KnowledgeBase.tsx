import { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Code, 
  Shield, 
  Zap, 
  Users, 
  Star, 
  Clock, 
  Tag,
  ExternalLink,
  ChevronRight,
  Play,
  Download,
  Heart,
  Eye
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  views: number;
  likes: number;
  lastUpdated: string;
  content?: string;
  author: string;
  type: 'article' | 'tutorial' | 'video' | 'example';
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 'best-practices',
    name: '最佳实践',
    description: '编程规范和代码质量指南',
    icon: Star,
    color: 'bg-yellow-100 text-yellow-600',
    count: 24
  },
  {
    id: 'security',
    name: '安全编程',
    description: '安全漏洞防护和安全编码',
    icon: Shield,
    color: 'bg-red-100 text-red-600',
    count: 18
  },
  {
    id: 'performance',
    name: '性能优化',
    description: '代码性能提升技巧',
    icon: Zap,
    color: 'bg-green-100 text-green-600',
    count: 15
  },
  {
    id: 'code-review',
    name: '代码审查',
    description: '代码审查流程和技巧',
    icon: Eye,
    color: 'bg-blue-100 text-blue-600',
    count: 12
  },
  {
    id: 'testing',
    name: '测试策略',
    description: '单元测试和集成测试',
    icon: Code,
    color: 'bg-purple-100 text-purple-600',
    count: 20
  },
  {
    id: 'collaboration',
    name: '团队协作',
    description: '团队开发和协作工具',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-600',
    count: 10
  }
];

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'JavaScript 代码质量最佳实践',
    description: '学习如何编写高质量、可维护的 JavaScript 代码，包括命名规范、函数设计和错误处理。',
    category: 'best-practices',
    tags: ['JavaScript', '代码规范', '最佳实践'],
    readTime: 8,
    difficulty: 'intermediate',
    rating: 4.8,
    views: 1250,
    likes: 89,
    lastUpdated: '2024-01-15',
    author: '张前端',
    type: 'article'
  },
  {
    id: '2',
    title: '防范 XSS 攻击的完整指南',
    description: '深入了解跨站脚本攻击的原理，学习如何在前端和后端代码中有效防范 XSS 攻击。',
    category: 'security',
    tags: ['安全', 'XSS', 'Web安全'],
    readTime: 12,
    difficulty: 'advanced',
    rating: 4.9,
    views: 2100,
    likes: 156,
    lastUpdated: '2024-01-14',
    author: '李安全',
    type: 'tutorial'
  },
  {
    id: '3',
    title: 'React 性能优化实战',
    description: '通过实际案例学习 React 应用的性能优化技巧，包括组件优化、状态管理和渲染优化。',
    category: 'performance',
    tags: ['React', '性能优化', '前端'],
    readTime: 15,
    difficulty: 'intermediate',
    rating: 4.7,
    views: 1800,
    likes: 124,
    lastUpdated: '2024-01-13',
    author: '王性能',
    type: 'video'
  },
  {
    id: '4',
    title: '代码审查清单和流程',
    description: '建立有效的代码审查流程，提供详细的审查清单，提升团队代码质量。',
    category: 'code-review',
    tags: ['代码审查', '团队协作', '流程'],
    readTime: 10,
    difficulty: 'beginner',
    rating: 4.6,
    views: 950,
    likes: 67,
    lastUpdated: '2024-01-12',
    author: '陈架构',
    type: 'article'
  },
  {
    id: '5',
    title: 'Python 单元测试最佳实践',
    description: '掌握 Python 单元测试的编写技巧，学习使用 pytest 和 mock 进行有效测试。',
    category: 'testing',
    tags: ['Python', '单元测试', 'pytest'],
    readTime: 20,
    difficulty: 'intermediate',
    rating: 4.8,
    views: 1400,
    likes: 98,
    lastUpdated: '2024-01-11',
    author: '刘测试',
    type: 'tutorial'
  },
  {
    id: '6',
    title: 'Git 工作流和团队协作',
    description: '学习 Git 分支策略、代码合并和团队协作的最佳实践，提升开发效率。',
    category: 'collaboration',
    tags: ['Git', '团队协作', '版本控制'],
    readTime: 12,
    difficulty: 'beginner',
    rating: 4.5,
    views: 1100,
    likes: 78,
    lastUpdated: '2024-01-10',
    author: '赵协作',
    type: 'example'
  }
];

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const difficultyLabels = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级'
};

const typeIcons = {
  article: BookOpen,
  tutorial: Code,
  video: Play,
  example: Download
};

export default function KnowledgeBase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = mockArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty;
    
    return matchesCategory && matchesSearch && matchesDifficulty;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">知识库</h1>
          <p className="text-gray-600">学习编程最佳实践，提升代码质量和开发技能</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">分类浏览</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="font-medium text-gray-900">全部</h3>
                <p className="text-sm text-gray-500">{mockArticles.length} 篇</p>
              </div>
            </button>
            
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${category.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} 篇</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索文章、教程..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">所有难度</option>
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="popular">最受欢迎</option>
                <option value="rating">评分最高</option>
                <option value="recent">最新更新</option>
                <option value="title">按标题排序</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              找到 {filteredArticles.length} 篇文章
            </div>
          </div>
        </div>

        {/* Category Description */}
        {selectedCategoryData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${selectedCategoryData.color}`}>
                <selectedCategoryData.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedCategoryData.name}</h3>
                <p className="text-gray-600">{selectedCategoryData.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const TypeIcon = typeIcons[article.type];
            return (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[article.difficulty]}`}>
                        {difficultyLabels[article.difficulty]}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime} 分钟
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {article.rating}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {article.likes}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {article.author}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到相关内容</h3>
            <p className="text-gray-600">尝试调整搜索条件或浏览其他分类</p>
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedArticle.title}</h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${difficultyColors[selectedArticle.difficulty]}`}>
                    {difficultyLabels[selectedArticle.difficulty]}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedArticle.readTime} 分钟阅读
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {selectedArticle.rating} 评分
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {selectedArticle.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArticle.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">文章内容</h3>
                  <p className="text-gray-600 mb-4">
                    这里是文章的详细内容。在实际应用中，这里会显示完整的文章内容，包括代码示例、图片和详细的说明。
                  </p>
                  <div className="bg-gray-800 text-gray-100 p-4 rounded text-sm font-mono">
                    <code>
                      {`// 示例代码
function validateInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }
  return input.trim();
}`}
                    </code>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                      <Heart className="w-4 h-4 mr-2" />
                      点赞 ({selectedArticle.likes})
                    </button>
                    <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      分享
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    作者: {selectedArticle.author} • 更新于 {selectedArticle.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}