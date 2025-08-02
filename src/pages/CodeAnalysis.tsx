import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Play, Settings, FileText, Code, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import Editor from '@monaco-editor/react';

interface AnalysisConfig {
  language: string;
  analysisType: string[];
  severity: string;
  includeTests: boolean;
  includeComments: boolean;
}

interface UploadedFile {
  name: string;
  content: string;
  language: string;
  size: number;
}

const supportedLanguages = [
  { value: 'javascript', label: 'JavaScript', ext: ['.js', '.jsx'] },
  { value: 'typescript', label: 'TypeScript', ext: ['.ts', '.tsx'] },
  { value: 'python', label: 'Python', ext: ['.py'] },
  { value: 'java', label: 'Java', ext: ['.java'] },
  { value: 'cpp', label: 'C++', ext: ['.cpp', '.cc', '.cxx'] },
  { value: 'c', label: 'C', ext: ['.c'] },
  { value: 'php', label: 'PHP', ext: ['.php'] },
  { value: 'go', label: 'Go', ext: ['.go'] },
  { value: 'rust', label: 'Rust', ext: ['.rs'] }
];

const analysisTypes = [
  { value: 'quality', label: '代码质量', description: '检查代码规范、复杂度等' },
  { value: 'security', label: '安全检测', description: '扫描安全漏洞和风险' },
  { value: 'performance', label: '性能分析', description: '识别性能瓶颈和优化点' },
  { value: 'maintainability', label: '可维护性', description: '评估代码可读性和维护性' }
];

export default function CodeAnalysis() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  const [config, setConfig] = useState<AnalysisConfig>({
    language: 'auto',
    analysisType: ['quality', 'security'],
    severity: 'medium',
    includeTests: true,
    includeComments: false
  });

  const detectLanguage = (filename: string): string => {
    const ext = '.' + filename.split('.').pop()?.toLowerCase();
    const lang = supportedLanguages.find(lang => lang.ext.includes(ext));
    return lang?.value || 'plaintext';
  };

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
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = [];
    
    for (const file of files) {
      if (file.size > 1024 * 1024) { // 1MB limit
        toast.error(`文件 ${file.name} 过大，请选择小于 1MB 的文件`);
        continue;
      }
      
      try {
        const content = await file.text();
        const language = detectLanguage(file.name);
        
        newFiles.push({
          name: file.name,
          content,
          language,
          size: file.size
        });
      } catch (error) {
        toast.error(`读取文件 ${file.name} 失败`);
      }
    }
    
    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setSelectedFile(newFiles[0]);
      toast.success(`成功上传 ${newFiles.length} 个文件`);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    
    if (selectedFile && uploadedFiles[index].name === selectedFile.name) {
      setSelectedFile(newFiles[0] || null);
    }
  };

  const startAnalysis = async () => {
    if (uploadedFiles.length === 0) {
      toast.error('请先上传代码文件');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // 模拟分析过程
    const steps = [
      { progress: 20, message: '正在解析代码结构...' },
      { progress: 40, message: '执行静态代码分析...' },
      { progress: 60, message: '检测安全漏洞...' },
      { progress: 80, message: '生成优化建议...' },
      { progress: 100, message: '分析完成！' }
    ];
    
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(step.progress);
      toast.info(step.message);
    }
    
    setIsAnalyzing(false);
    toast.success('代码分析完成，正在跳转到报告页面...');
    
    setTimeout(() => {
      navigate('/report/latest');
    }, 1000);
  };

  const updateConfig = (key: keyof AnalysisConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleAnalysisType = (type: string) => {
    setConfig(prev => ({
      ...prev,
      analysisType: prev.analysisType.includes(type)
        ? prev.analysisType.filter(t => t !== type)
        : [...prev.analysisType, type]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">代码分析</h1>
          <p className="text-gray-600">上传代码文件，配置分析参数，开始智能代码审查</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - File Upload & Config */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                文件上传
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">拖拽文件到这里或</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  点击选择文件
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.php,.rb,.go,.rs"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
              
              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">已上传文件</h3>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded border cursor-pointer ${
                          selectedFile?.name === file.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedFile(file)}
                      >
                        <div className="flex items-center">
                          <Code className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.language} • {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Configuration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                分析配置
              </h2>
              
              {/* Analysis Types */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  分析类型
                </label>
                <div className="space-y-2">
                  {analysisTypes.map((type) => (
                    <label key={type.value} className="flex items-start">
                      <input
                        type="checkbox"
                        checked={config.analysisType.includes(type.value)}
                        onChange={() => toggleAnalysisType(type.value)}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{type.label}</p>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Severity Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  严重程度
                </label>
                <select
                  value={config.severity}
                  onChange={(e) => updateConfig('severity', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="low">低 - 仅显示严重问题</option>
                  <option value="medium">中 - 显示重要问题</option>
                  <option value="high">高 - 显示所有问题</option>
                </select>
              </div>
              
              {/* Additional Options */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.includeTests}
                    onChange={(e) => updateConfig('includeTests', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">包含测试文件</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={config.includeComments}
                    onChange={(e) => updateConfig('includeComments', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">分析注释质量</span>
                </label>
              </div>
            </div>

            {/* Start Analysis Button */}
            <button
              onClick={startAnalysis}
              disabled={isAnalyzing || uploadedFiles.length === 0}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  分析中... {analysisProgress}%
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  开始分析
                </>
              )}
            </button>
            
            {/* Progress Bar */}
            {isAnalyzing && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">分析进度</span>
                  <span className="text-sm text-gray-500">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedFile ? selectedFile.name : '代码预览'}
                </h2>
                {selectedFile && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedFile.language} • {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                )}
              </div>
              
              <div className="h-96">
                {selectedFile ? (
                  <Editor
                    height="100%"
                    language={selectedFile.language}
                    value={selectedFile.content}
                    theme="vs-light"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      lineNumbers: 'on',
                      wordWrap: 'on'
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>请选择一个文件查看代码</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}