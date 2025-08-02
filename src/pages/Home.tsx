import { Link } from 'react-router-dom';
import { ArrowRight, Code, Shield, Zap, Users, Star, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const features = [
  {
    icon: Code,
    title: '智能代码分析',
    description: 'AI 驱动的代码质量检测，支持多种编程语言，快速识别潜在问题'
  },
  {
    icon: Shield,
    title: '安全漏洞检测',
    description: '深度扫描代码安全漏洞，提供详细的修复建议和最佳实践'
  },
  {
    icon: Zap,
    title: '性能优化建议',
    description: '分析代码性能瓶颈，提供针对性的优化方案和改进建议'
  }
];

const testimonials = [
  {
    name: '张开发',
    role: '前端工程师',
    content: '这个工具大大提升了我的代码质量，AI 分析非常准确！',
    rating: 5
  },
  {
    name: '李架构',
    role: '技术架构师',
    content: '团队代码审查效率提升了 80%，强烈推荐！',
    rating: 5
  },
  {
    name: '王全栈',
    role: '全栈开发者',
    content: '界面简洁易用，分析报告详细专业，是开发者的好帮手。',
    rating: 5
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      toast.success(`已选择 ${files.length} 个文件，正在跳转到分析页面...`);
      setTimeout(() => {
        navigate('/analysis');
      }, 1000);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      toast.success(`已选择 ${files.length} 个文件，正在跳转到分析页面...`);
      setTimeout(() => {
        navigate('/analysis');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              智能代码审查与
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                优化助手
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              基于 AI 技术的代码质量分析工具，帮助开发者快速发现问题、提升代码质量
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/analysis"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                开始分析
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/knowledge"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Upload Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">快速体验</h2>
            <p className="text-lg text-gray-600">拖拽文件或点击上传，立即开始代码分析</p>
          </div>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              拖拽代码文件到这里
            </h3>
            <p className="text-gray-500 mb-4">
              支持 .js, .ts, .py, .java, .cpp, .c, .php 等多种格式
            </p>
            <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200">
              <input
                type="file"
                multiple
                accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.php,.rb,.go,.rs"
                onChange={handleFileSelect}
                className="hidden"
              />
              选择文件
            </label>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-lg text-gray-600">全方位的代码质量保障</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">用户评价</h2>
            <p className="text-lg text-gray-600">来自开发者的真实反馈</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            准备好提升你的代码质量了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            立即开始使用智能代码审查助手，让 AI 帮你写出更好的代码
          </p>
          <Link
            to="/analysis"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            立即开始
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}