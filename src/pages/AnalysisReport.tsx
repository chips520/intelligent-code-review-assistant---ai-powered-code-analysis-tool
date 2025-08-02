import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  TrendingUp,
  Code,
  Shield,
  Zap,
  FileText
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { toast } from 'sonner';

interface Issue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  file: string;
  line: number;
  column: number;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
  codeSnippet: string;
}

interface QualityScore {
  overall: number;
  maintainability: number;
  reliability: number;
  security: number;
  performance: number;
}

interface AnalysisResult {
  id: string;
  timestamp: string;
  files: string[];
  qualityScore: QualityScore;
  issues: Issue[];
  metrics: {
    linesOfCode: number;
    complexity: number;
    duplicateLines: number;
    testCoverage: number;
  };
}

// Mock data
const mockAnalysisResult: AnalysisResult = {
  id: 'latest',
  timestamp: new Date().toISOString(),
  files: ['App.tsx', 'components/Header.tsx', 'utils/helpers.js'],
  qualityScore: {
    overall: 85,
    maintainability: 88,
    reliability: 82,
    security: 90,
    performance: 80
  },
  issues: [
    {
      id: '1',
      type: 'error',
      category: 'Security',
      title: '潜在的 XSS 漏洞',
      description: '直接插入用户输入到 DOM 中可能导致跨站脚本攻击',
      file: 'components/Header.tsx',
      line: 42,
      column: 15,
      severity: 'high',
      suggestion: '使用 textContent 或进行输入验证和转义',
      codeSnippet: 'element.innerHTML = userInput;'
    },
    {
      id: '2',
      type: 'warning',
      category: 'Performance',
      title: '未优化的循环',
      description: '嵌套循环可能导致性能问题',
      file: 'utils/helpers.js',
      line: 28,
      column: 8,
      severity: 'medium',
      suggestion: '考虑使用 Map 或 Set 来优化查找操作',
      codeSnippet: 'for (let i = 0; i < arr1.length; i++) {\n  for (let j = 0; j < arr2.length; j++) {'
    },
    {
      id: '3',
      type: 'info',
      category: 'Code Style',
      title: '变量命名不规范',
      description: '变量名应该更具描述性',
      file: 'App.tsx',
      line: 15,
      column: 10,
      severity: 'low',
      suggestion: '使用更具描述性的变量名，如 userList 而不是 data',
      codeSnippet: 'const data = fetchUsers();'
    }
  ],
  metrics: {
    linesOfCode: 1250,
    complexity: 15,
    duplicateLines: 45,
    testCoverage: 78
  }
};

const severityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-blue-600 bg-blue-50 border-blue-200'
};

const typeIcons = {
  error: XCircle,
  warning: AlertTriangle,
  info: Info
};

const typeColors = {
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500'
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AnalysisReport() {
  const { id } = useParams();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setResult(mockAnalysisResult);
      setLoading(false);
    }, 1000);
  }, [id]);

  const filteredIssues = result?.issues.filter(issue => {
    const severityMatch = filterSeverity === 'all' || issue.severity === filterSeverity;
    const typeMatch = filterType === 'all' || issue.type === filterType;
    return severityMatch && typeMatch;
  }) || [];

  const issuesByType = result?.issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const pieData = Object.entries(issuesByType).map(([type, count]) => ({
    name: type === 'error' ? '错误' : type === 'warning' ? '警告' : '信息',
    value: count,
    color: type === 'error' ? '#EF4444' : type === 'warning' ? '#F59E0B' : '#3B82F6'
  }));

  const scoreData = result ? [
    { name: '可维护性', score: result.qualityScore.maintainability },
    { name: '可靠性', score: result.qualityScore.reliability },
    { name: '安全性', score: result.qualityScore.security },
    { name: '性能', score: result.qualityScore.performance }
  ] : [];

  const handleDownloadReport = () => {
    toast.success('报告下载已开始');
  };

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('报告链接已复制到剪贴板');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载分析报告...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">报告未找到</h2>
          <p className="text-gray-600 mb-4">请检查报告 ID 或重新进行代码分析</p>
          <Link
            to="/analysis"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重新分析
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/analysis"
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">分析报告</h1>
                <p className="text-gray-600 mt-1">
                  分析时间: {new Date(result.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleShareReport}
                className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </button>
              <button
                onClick={handleDownloadReport}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                下载报告
              </button>
            </div>
          </div>
        </div>

        {/* Quality Score Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3B82F6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(result.qualityScore.overall / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{result.qualityScore.overall}</div>
                    <div className="text-sm text-gray-500">总分</div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">代码质量评分</h3>
              <p className="text-sm text-gray-600">
                {result.qualityScore.overall >= 90 ? '优秀' : 
                 result.qualityScore.overall >= 80 ? '良好' : 
                 result.qualityScore.overall >= 70 ? '一般' : '需要改进'}
              </p>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">各维度评分</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Metrics and Issues Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">代码指标</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">代码行数</span>
                <span className="font-semibold">{result.metrics.linesOfCode.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">复杂度</span>
                <span className="font-semibold">{result.metrics.complexity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">重复行数</span>
                <span className="font-semibold">{result.metrics.duplicateLines}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">测试覆盖率</span>
                <span className="font-semibold">{result.metrics.testCoverage}%</span>
              </div>
            </div>
          </div>

          {/* Issues Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">问题分布</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">快速统计</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold">{result.issues.filter(i => i.type === 'error').length}</p>
                  <p className="text-sm text-gray-600">错误</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold">{result.issues.filter(i => i.type === 'warning').length}</p>
                  <p className="text-sm text-gray-600">警告</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">{result.issues.filter(i => i.type === 'info').length}</p>
                  <p className="text-sm text-gray-600">信息</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">问题详情</h3>
              <div className="flex space-x-4">
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">所有严重程度</option>
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">所有类型</option>
                  <option value="error">错误</option>
                  <option value="warning">警告</option>
                  <option value="info">信息</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredIssues.map((issue) => {
              const Icon = typeIcons[issue.type];
              return (
                <div
                  key={issue.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
                >
                  <div className="flex items-start">
                    <Icon className={`w-5 h-5 mt-1 mr-3 ${typeColors[issue.type]}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{issue.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${severityColors[issue.severity]}`}>
                          {issue.severity === 'high' ? '高' : issue.severity === 'medium' ? '中' : '低'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{issue.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>{issue.file}</span>
                        <span className="mx-2">•</span>
                        <span>第 {issue.line} 行</span>
                        <span className="mx-2">•</span>
                        <span>{issue.category}</span>
                      </div>
                      
                      {selectedIssue?.id === issue.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">代码片段:</h5>
                          <pre className="bg-gray-800 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                            <code>{issue.codeSnippet}</code>
                          </pre>
                          <h5 className="font-medium text-gray-900 mt-4 mb-2">修复建议:</h5>
                          <p className="text-gray-700">{issue.suggestion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredIssues.length === 0 && (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">没有发现问题</h3>
              <p className="text-gray-600">根据当前筛选条件，没有找到相关问题。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}