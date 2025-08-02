import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import CodeAnalysis from "@/pages/CodeAnalysis";
import AnalysisReport from "@/pages/AnalysisReport";
import History from "@/pages/History";
import KnowledgeBase from "@/pages/KnowledgeBase";
import Layout from "@/components/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<CodeAnalysis />} />
          <Route path="/report/:id?" element={<AnalysisReport />} />
          <Route path="/history" element={<History />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
