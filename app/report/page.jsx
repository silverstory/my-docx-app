'use client';

import { useEffect, useState } from 'react';

export default function ReportPage() {
  const [reportContent, setReportContent] = useState('');

  useEffect(() => {
    fetch('/api/convert')
      .then((res) => res.text())
      .then((html) => setReportContent(html));
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Generated Report</h1>
      <div dangerouslySetInnerHTML={{ __html: reportContent }} />
    </div>
  );
}
