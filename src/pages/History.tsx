import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Download,
  Trash2,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { toast } from 'sonner';

interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  files: string[];
  qualityScore: number;
  issuesCount: {
    errors: number;
    warnings: number;
    info: number;
  };
  status: 'completed' | 'failed' | 'processing';
  size: number; // in KB
}

interface TrendData {
  date: string;
  score: number;
  issues: number;
}

// Mock data
const mockHistory: HistoryItem[] = [
  {
    id: '1',
    name: '电商项目前端代码',
    timestamp: '2024-01-15T10:30:00Z',
    files: ['App.tsx', 'components/ProductList.tsx', 'utils/api.js'],
    qualityScore: 85,
    issuesCount: { errors: 2, warnings: 5, info: 3 },
    status: 'completed',
    size: 1250
  },
  {
    id: '2',
    name: '用户管理模块',
    timestamp: '2024-01-14T15:45:00Z',
    files: ['UserService.java', 'UserController.java'],
    qualityScore: 92,
    issuesCount: { errors: 0, warnings: 2, info: 1 },
    status: 'completed',
    size: 890
  },
  {
    id: '3',
    name: '数据处理脚本',
    timestamp: '2024-01-13T09:15:00Z',
    files: ['data_processor.py', 'utils.py'],
    qualityScore: 78,
    issuesCount: { errors: 3, warnings: 8, info: 5 },
    status: 'completed',
    size: 2100
  },
  {
    id: '4',
    name: 'API 接口代码',
    timestamp: '2024-01-12T14:20:00Z',
    files: ['api.php', 'database.php'],
    qualityScore: 0,
    issuesCount: { errors: 0, warnings: 0, info: 0 },
    status: 'failed',
    size: 0
  },
  {
    id: '5',
    name: '移动端组件库',
    timestamp: '2024-01-11T11:00:00Z',
    files: ['Button.tsx', 'Input.tsx', 'Modal.tsx'],
    qualityScore: 88,
    issuesCount: { errors: 1, warnings: 3, info: 2 },
    status: 'completed',
    size: 1680
  }
];

const mockTrendData: TrendData[] = [
  { date: '01-11', score: 88, issues: 6 },
  { date: '01-12', score: 0, issues: 0 },
  { date: '01-13', score: 78, issues: 16 },
  { date: '01-14', score: 92, issues: 3 },
  { date: '01-15', score: 85, issues: 10 }
];

const statusConfig = {
  completed: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: '已完成'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    label: '失败'
  },
  processing: {
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    label: '处理中'
  }
};

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setHistory(mockHistory);
      setFilteredHistory(mockHistory);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = history.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.files.some(file => file.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const itemDate = new Date(item.timestamp);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            matchesDate = daysDiff === 0;
            break;
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score':
          return b.qualityScore - a.qualityScore;
        case 'issues':
          const aTotal = a.issuesCount.errors + a.issuesCount.warnings + a.issuesCount.info;
          const bTotal = b.issuesCount.errors + b.issuesCount.warnings + b.issuesCount.info;
          return aTotal - bTotal;
        default:
          return 0;
      }
    });

    setFilteredHistory(filtered);
  }, [history, searchTerm, statusFilter, dateFilter, sortBy]);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredHistory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredHistory.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    const newHistory = history.filter(item => !selectedItems.includes(item.id));
    setHistory(newHistory);
    setSelectedItems([]);
    toast.success(`已删除 ${selectedItems.length} 个分析记录`);
  };

  const handleExportSelected = () => {
    if (selectedItems.length === 0) return;
    
    toast.success(`正在导出 ${selectedItems.length} 个分析报告`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-50';
    if (score >= 80) return 'bg-blue-50';
    if (score >= 70) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const completedHistory = history.filter(item => item.status === 'completed');
  const avgScore = completedHistory.length > 0 
    ? Math.round(completedHistory.reduce((sum, item) => sum + item.qualityScore, 0) / completedHistory.length)
    : 0;
  const totalIssues = completedHistory.reduce((sum, item) => 
    sum + item.issuesCount.errors + item.issuesCount.warnings + item.issuesCount.info, 0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载历史记录...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">分析历史</h1>
          <p className="text-gray-600">查看和管理您的代码分析记录</p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
                <p className="text-sm text-gray-600">总分析次数</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
                <p className="text-sm text-gray-600">平均质量分</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalIssues}</p>
                <p className="text-sm text-gray-600">发现问题数</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedHistory.length}</p>
                <p className="text-sm text-gray-600">成功分析</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">质量趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="score" orientation="left" domain={[0, 100]} />
              <YAxis yAxisId="issues" orientation="right" />
              <Tooltip />
              <Area 
                yAxisId="score"
                type="monotone" 
                dataKey="score" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Line 
                yAxisId="issues"
                type="monotone" 
                dataKey="issues" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索项目名称或文件..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">所有状态</option>
                <option value="completed">已完成</option>
                <option value="failed">失败</option>
                <option value="processing">处理中</option>
              </select>
              
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">所有时间</option>
                <option value="today">今天</option>
                <option value="week">最近一周</option>
                <option value="month">最近一月</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="date">按时间排序</option>
                <option value="name">按名称排序</option>
                <option value="score">按评分排序</option>
                <option value="issues">按问题数排序</option>
              </select>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={handleExportSelected}
                  className="flex items-center px-3 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <Download className="w-4 h-4 mr-1" />
                  导出 ({selectedItems.length})
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center px-3 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  删除 ({selectedItems.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredHistory.length > 0 && (
            <div className="border-b border-gray-200 px-6 py-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredHistory.length}
                  onChange={handleSelectAll}
                  className="mr-3"
                />
                <span className="text-sm text-gray-600">
                  {selectedItems.length > 0 ? `已选择 ${selectedItems.length} 项` : '全选'}
                </span>
              </label>
            </div>
          )}
          
          <div className="divide-y divide-gray-200">
            {filteredHistory.map((item) => {
              const StatusIcon = statusConfig[item.status].icon;
              return (
                <div key={item.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="mr-4"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900 mr-3">{item.name}</h3>
                          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                            statusConfig[item.status].bg
                          } ${statusConfig[item.status].color} ${statusConfig[item.status].border}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[item.status].label}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {item.status === 'completed' && (
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              getScoreBg(item.qualityScore)
                            } ${getScoreColor(item.qualityScore)}`}>
                              {item.qualityScore} 分
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            {item.status === 'completed' && (
                              <Link
                                to={`/report/${item.id}`}
                                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            )}
                            <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">{new Date(item.timestamp).toLocaleString()}</span>
                        <FileText className="w-4 h-4 mr-1" />
                        <span className="mr-4">{item.files.length} 个文件</span>
                        <span>{(item.size / 1024).toFixed(1)} MB</span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.files.slice(0, 3).map((file, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {file}
                          </span>
                        ))}
                        {item.files.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{item.files.length - 3} 更多
                          </span>
                        )}
                      </div>
                      
                      {item.status === 'completed' && (
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            {item.issuesCount.errors} 错误
                          </div>
                          <div className="flex items-center text-yellow-600">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {item.issuesCount.warnings} 警告
                          </div>
                          <div className="flex items-center text-blue-600">
                            <FileText className="w-4 h-4 mr-1" />
                            {item.issuesCount.info} 信息
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredHistory.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到分析记录</h3>
              <p className="text-gray-600 mb-4">尝试调整搜索条件或开始新的代码分析</p>
              <Link
                to="/analysis"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                开始分析
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}